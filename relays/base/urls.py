from django.urls import path
from . import views



urlpatterns = [
    path('', views.home, name="home"),
    path('relayroom/<str:pk>/', views.relayroom, name="relayroom"),
] 