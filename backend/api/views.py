from rest_framework import viewsets, permissions

from .models import (
        Caveat,
        Service,
        Search,
        )

from .serializers import (
        CaveatSerializer,
        ServiceSerializer,
        SearchSerializer
        )


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class SearchViewSet(viewsets.ModelViewSet):
    queryset = Search.objects.all()
    serializer_class = SearchSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
