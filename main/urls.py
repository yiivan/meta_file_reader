from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^json/$', views.ajax),
    url(r'^$', views.index),
    url(r'^watch/$', views.watch),
    url(r'^watch_modified/$', views.watch_modified),
]
