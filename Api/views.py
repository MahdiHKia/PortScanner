from django.dispatch import receiver
from rest_framework import serializers
from rest_framework import viewsets, mixins
from Api.tasks import *
from Api.models import *


class OpenPortsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Port
        fields = ['port_number', 'common_usage']


class IPSerializer(serializers.ModelSerializer):
    open_ports = serializers.SerializerMethodField()

    def get_open_ports(self, instance:IP):
        return OpenPortsSerializer(instance=instance.port_set.filter(is_open=True), many=True, context=self.context).data

    class Meta:
        model = IP
        fields = '__all__'


class IPViewSet(mixins.ListModelMixin,
                viewsets.GenericViewSet):
    serializer_class = IPSerializer
    permission_classes = []

    def get_queryset(self):
        return IP.objects.filter(ip__startswith=self.request.query_params.get('ip'))


@receiver(IP.start_scan_signal, sender=IP)
def start_scan_receiver(instance: IP, *args, **kwargs):
    print("hello sender and this is id ", instance.id)
    instance.scan_state = ScanState.PENDING
    instance.save()
    scan_ip.delay(instance.id)
