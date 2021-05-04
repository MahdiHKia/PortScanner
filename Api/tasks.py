import socket

from icmplib import ping
from celery import shared_task
from requests import get


from Api.models import *


@shared_task
def scan_port(port_id):
    port = Port.objects.get(id=port_id)
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        socket.setdefaulttimeout(1)
        result = s.connect_ex((port.ip.ip, port.port_number))
        port.is_open = result == 0
        port.scan_state = ScanState.SUCCESSFUL
        s.close()
    except:
        port.scan_state = ScanState.ERROR
    port.save()


@shared_task
def scan_ip(ip_id):
    import time
    time.sleep(.5)
    ip = IP.objects.get(id=ip_id)
    if ip.scan_state == ScanState.CANCELLED:
        return
    try:
        location_data = get(f'http://ip-api.com/json/{ip.ip}').json()
        ip.country = location_data.get('country')
        ip.city = location_data.get('city')
        ip.isp = location_data.get('isp')
        ip.as_name = location_data.get('as')
        ip.lat = location_data.get('lat')
        ip.lon = location_data.get('lon')
        ip.location_scan_status = "success" if location_data.get(
            'status') == "success" else f"fail: {location_data.get('message')}"
        ip.save()
        p = ping(ip.ip, count=3)
        ip.has_ping = p.is_alive
        ip.scan_state = ScanState.SUCCESSFUL
        ip.save()
        if ip.ip_scan_type == IpScanType.ONLY_IF_IP_HAS_PING and not ip.has_ping:
            return
        if ip.port_scan_type == PortScanType.FULL_SCAN:
            ports = range(1, 65535)
        elif ip.port_scan_type == PortScanType.KNOWN_PORTS:
            ports = KNOWN_PORTS.keys()
        else:
            ports = ip.custom_ports
        for port in ports:
            p, _ = Port.objects.update_or_create({'scan_state': ScanState.PENDING}, ip=ip, port_number=int(port))
            scan_port.delay(p.id)
    except:
        ip.scan_state = ScanState.ERROR
        ip.save()

