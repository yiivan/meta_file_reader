from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^json/$', views.ajax),
    url(r'^$', views.index),
]
