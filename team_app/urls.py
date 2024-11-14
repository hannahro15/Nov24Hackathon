from django.urls import path

from . import views

urlpatterns = [
    path('team_app/', views.team_app, name='team_app'),
    
]