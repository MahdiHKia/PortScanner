# Generated by Django 3.1.6 on 2021-02-07 08:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Api', '0002_auto_20210207_0821'),
    ]

    operations = [
        migrations.AlterField(
            model_name='iplistfiletask',
            name='custom_ports',
            field=models.JSONField(blank=True, default=list, null=True),
        ),
        migrations.AlterField(
            model_name='iprangetask',
            name='custom_ports',
            field=models.JSONField(blank=True, default=list, null=True),
        ),
        migrations.AlterField(
            model_name='singleiptask',
            name='custom_ports',
            field=models.JSONField(blank=True, default=list, null=True),
        ),
    ]
