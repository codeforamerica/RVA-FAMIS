from django.conf.urls import url, include, patterns

from rest_framework.routers import DefaultRouter

from .views import (
        ServiceViewSet,
        SearchViewSet,
        )

router = DefaultRouter()

router.register(r'services', ServiceViewSet)
router.register(r'search', SearchViewSet)

urlpatterns = patterns('',
    url(r'^', include(router.urls)),
    url(r'auth', include('rest_framework.urls', namespace='rest_framework')),
    )



