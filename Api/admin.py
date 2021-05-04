from django.contrib import admin
from Api.models import *
from Api.tasks import scan_ip, scan_port


# Register your models here.

@admin.register(SingleIpTask)
class SingleIpTaskAdmin(admin.ModelAdmin):
    pass


@admin.register(IpRangeTask)
class IpRangeTaskAdmin(admin.ModelAdmin):
    pass


@admin.register(IpListFileTask)
class IpListFileTaskAdmin(admin.ModelAdmin):
    pass


@admin.register(IP)
class IPAdmin(admin.ModelAdmin):
    search_fields = ['ip']
    list_filter = ['has_ping', 'scanned', 'country', 'city', 'isp', 'as_name', 'location_scan_status', 'ip_scan_type',
                   'port_scan_type', 'scan_state', 'last_scanned_at', ]

    actions = ['scan']

    def scan(self, request, queryset):
        for i in queryset:
            scan_ip.delay(i.id)


@admin.register(Port)
class PortAdmin(admin.ModelAdmin):
    search_fields = ['ip__ip', 'port_number']
    list_filter = ['is_open', 'scan_state', 'last_scanned_at']
    list_display = ['ip', 'port_number', 'common_usage', 'is_open', 'scan_state', 'last_scanned_at']

    actions = ['scan']

    def scan(self, request, queryset):
        for i in queryset:
            scan_port.delay(i.id)
