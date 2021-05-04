import ipaddress

from django.db import models
from django.dispatch import Signal
from Api.data import KNOWN_PORTS


class IpScanType(models.IntegerChoices):
    FULL_SCAN = 0
    ONLY_IF_IP_HAS_PING = 1


class PortScanType(models.IntegerChoices):
    FULL_SCAN = 0
    KNOWN_PORTS = 1
    CUSTOM = 2


class ScanState(models.IntegerChoices):
    PENDING = 0
    SUCCESSFUL = 1
    ERROR = 2
    CANCELLED = 3


class TaskBase(models.Model):
    class Meta:
        abstract = True

    created = models.DateTimeField(auto_now_add=True)
    ip_scan_type = models.PositiveSmallIntegerField(choices=IpScanType.choices, default=IpScanType.ONLY_IF_IP_HAS_PING)
    port_scan_type = models.PositiveSmallIntegerField(choices=PortScanType.choices, default=PortScanType.CUSTOM)
    custom_ports = models.JSONField(default=list, null=True, blank=True)


class SingleIpTask(TaskBase):
    ip = models.TextField()

    def save(self, *args, **kwargs):
        if not self.pk:
            instance, _ = IP.objects.update_or_create(
                defaults={'ip_scan_type': self.ip_scan_type, 'port_scan_type': self.port_scan_type,
                          'scan_state': ScanState.PENDING, 'custom_ports': self.custom_ports}, ip=self.ip)
            instance.start_scan()
        super().save()


class IpRangeTask(TaskBase):
    from_ip = models.TextField()
    to_ip = models.TextField()

    def save(self, *args, **kwargs):
        if not self.pk:
            from_ip = ipaddress.IPv4Address(self.from_ip)
            to_ip = ipaddress.IPv4Address(self.to_ip)
            for ip_int in range(int(from_ip), int(to_ip)):
                instance, _ = IP.objects.update_or_create(
                    defaults={'ip_scan_type': self.ip_scan_type, 'port_scan_type': self.port_scan_type,
                              'scan_state': ScanState.PENDING, 'custom_ports': self.custom_ports},
                    ip=ipaddress.IPv4Address(ip_int))
                instance.start_scan()
        super().save()


class IpListFileTask(TaskBase):
    file = models.FileField()

    def save(self, *args, **kwargs):
        if not self.pk:
            with self.file.open('r') as file:
                for ip_str in file.readlines():
                    ip_str = ip_str.replace(' ', '')
                    if len(ip_str) < 7:
                        continue
                    instance, _ = IP.objects.update_or_create(
                        defaults={'ip_scan_type': self.ip_scan_type, 'port_scan_type': self.port_scan_type,
                                  'scan_state': ScanState.PENDING, 'custom_ports': self.custom_ports}, ip=ip_str)
                    instance.start_scan()
        super().save()


class IP(models.Model):
    ip = models.TextField(db_index=True, unique=True)
    has_ping = models.BooleanField(default=False)
    scanned = models.BooleanField(default=False)
    country = models.TextField(null=True, blank=True)
    city = models.TextField(null=True, blank=True)
    isp = models.TextField(null=True, blank=True)
    as_name = models.TextField(null=True, blank=True)
    lat = models.CharField(max_length=10, null=True, blank=True)
    lon = models.CharField(max_length=10, null=True, blank=True)
    location_scan_status = models.TextField(null=True, blank=True)
    ip_scan_type = models.PositiveSmallIntegerField(choices=IpScanType.choices, default=IpScanType.ONLY_IF_IP_HAS_PING)
    port_scan_type = models.PositiveSmallIntegerField(choices=PortScanType.choices, default=PortScanType.CUSTOM)
    custom_ports = models.JSONField(default=list, null=True, blank=True)
    scan_state = models.PositiveSmallIntegerField(choices=ScanState.choices, default=ScanState.PENDING)
    last_scanned_at = models.DateTimeField(auto_now=True)

    start_scan_signal = Signal()

    def start_scan(self):
        self.start_scan_signal.send(IP, instance=self)

    def __str__(self):
        return self.ip


class Port(models.Model):
    ip = models.ForeignKey(IP, models.CASCADE)
    port_number = models.PositiveIntegerField()
    is_open = models.BooleanField(default=True)
    scan_state = models.PositiveSmallIntegerField(choices=ScanState.choices, default=ScanState.PENDING)
    last_scanned_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.ip.ip}:{self.port_number}"

    @property
    def common_usage(self):
        return KNOWN_PORTS.get(self.port_number, 'unknown')
