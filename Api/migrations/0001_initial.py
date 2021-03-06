# Generated by Django 3.1.6 on 2021-02-07 07:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='IP',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ip', models.TextField(db_index=True, unique=True)),
                ('has_ping', models.BooleanField(default=False)),
                ('scanned', models.BooleanField(default=False)),
                ('country', models.TextField(blank=True, null=True)),
                ('city', models.TextField(blank=True, null=True)),
                ('isp', models.TextField(blank=True, null=True)),
                ('as_name', models.TextField(blank=True, null=True)),
                ('lat', models.CharField(blank=True, max_length=7, null=True)),
                ('lon', models.CharField(blank=True, max_length=7, null=True)),
                ('location_scan_status', models.TextField(blank=True, null=True)),
                ('ip_scan_type', models.PositiveSmallIntegerField(choices=[(0, 'Full Scan'), (1, 'Only If Ip Has Ping')], default=1)),
                ('port_scan_type', models.PositiveSmallIntegerField(choices=[(0, 'Full Scan'), (1, 'Known Ports'), (2, 'Custom')], default=2)),
                ('custom_ports', models.JSONField(default=list)),
                ('scan_state', models.PositiveSmallIntegerField(choices=[(0, 'Pending'), (1, 'Successful'), (2, 'Error'), (3, 'Cancelled')], default=0)),
                ('last_scanned_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='IpListFileTask',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('ip_scan_type', models.PositiveSmallIntegerField(choices=[(0, 'Full Scan'), (1, 'Only If Ip Has Ping')], default=1)),
                ('port_scan_type', models.PositiveSmallIntegerField(choices=[(0, 'Full Scan'), (1, 'Known Ports'), (2, 'Custom')], default=2)),
                ('custom_ports', models.JSONField(default=list)),
                ('file', models.FileField(upload_to='')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='IpRangeTask',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('ip_scan_type', models.PositiveSmallIntegerField(choices=[(0, 'Full Scan'), (1, 'Only If Ip Has Ping')], default=1)),
                ('port_scan_type', models.PositiveSmallIntegerField(choices=[(0, 'Full Scan'), (1, 'Known Ports'), (2, 'Custom')], default=2)),
                ('custom_ports', models.JSONField(default=list)),
                ('from_ip', models.TextField()),
                ('to_ip', models.TextField()),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='SingleIpTask',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('ip_scan_type', models.PositiveSmallIntegerField(choices=[(0, 'Full Scan'), (1, 'Only If Ip Has Ping')], default=1)),
                ('port_scan_type', models.PositiveSmallIntegerField(choices=[(0, 'Full Scan'), (1, 'Known Ports'), (2, 'Custom')], default=2)),
                ('custom_ports', models.JSONField(default=list)),
                ('ip', models.TextField()),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Port',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('port_number', models.PositiveSmallIntegerField()),
                ('is_open', models.BooleanField(default=True)),
                ('scan_state', models.PositiveSmallIntegerField(choices=[(0, 'Pending'), (1, 'Successful'), (2, 'Error'), (3, 'Cancelled')], default=0)),
                ('last_scanned_at', models.DateTimeField(auto_now=True)),
                ('ip', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Api.ip')),
            ],
        ),
    ]
