from rest_framework import serializers

from .models import (
        Caveat,
        Service,
        Search,
        )


class CaveatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Caveat
        fields = (
                'legalese', 'plain'
                )

class ServiceSerializer(serializers.ModelSerializer):
    caveats = CaveatSerializer(many=True)
    class Meta:
        model = Service
        fields = (
                'id', 'name', 'covered',
                'search_terms', 'copay_low', 'copay_high',
                'caveats'
                )

class SearchSerializer(serializers.ModelSerializer):
    services = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = Search
        fields = (
                'text', 'datetime', 'services', 'data_status', 'user_status',
                'email'
                )


