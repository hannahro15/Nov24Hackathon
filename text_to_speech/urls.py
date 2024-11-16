from django.urls import path

from . import views

urlpatterns = [
    path('text_to_speech/', views.text_to_speech, name='text_to_speech'),
    path(
        'text_to_speech_api/',
        views.text_to_speech_api,
        name='text_to_speech_api',
    ),
    path('profile/', views.profile, name='profile'),
]
