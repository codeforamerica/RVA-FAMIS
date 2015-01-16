from django.contrib import admin
from .models import (
        Caveat,
        Service,
        Search
        )

class CaveatInline(admin.TabularInline):
    fieldsets = [
        (None,               {'fields': ['legalese', 'plain']}),
    ]
    model = Caveat
    extra = 1

class ServiceAdmin(admin.ModelAdmin):
    inlines = [CaveatInline]

admin.site.register(Service, ServiceAdmin)
admin.site.register(Search)
