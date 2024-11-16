from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from gtts.lang import tts_langs

# Get the list of available languages for choices
LANGUAGE_CHOICES = [(code, name) for code, name in tts_langs().items()]


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    preferred_language = models.CharField(
        max_length=10,
        choices=LANGUAGE_CHOICES,
        default='en',
    )

    def __str__(self):
        return f"{self.user.username}'s Profile"


# Signal to create or update Profile whenever User is saved
@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    instance.profile.save()
