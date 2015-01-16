# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Caveat',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('legalese', models.TextField()),
                ('plain', models.TextField(null=True, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Search',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('datetime', models.DateTimeField(auto_now_add=True)),
                ('text', models.CharField(max_length=200)),
                ('data_status', models.CharField(max_length=15, choices=[(b'matched', b'matched'), (b'not matched', b'not matched')])),
                ('user_status', models.CharField(max_length=15, choices=[(b'satisfied', b'satisfied'), (b'not satisfied', b'not satisfied')])),
                ('email', models.EmailField(max_length=254, null=True, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=200)),
                ('covered', models.CharField(default=b'no', max_length=3, choices=[(b'yes', b'Yes'), (b'no', b'No'), (b'may', b'Sometimes')])),
                ('search_terms', models.TextField(null=True, blank=True)),
                ('copay_high', models.IntegerField(null=True, blank=True)),
                ('copay_low', models.IntegerField(null=True, blank=True)),
                ('copay_extra', models.CharField(max_length=200, null=True, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='search',
            name='services',
            field=models.ManyToManyField(related_name='searches', to='api.Service', blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='caveat',
            name='service',
            field=models.ForeignKey(related_name='caveats', to='api.Service'),
            preserve_default=True,
        ),
    ]
