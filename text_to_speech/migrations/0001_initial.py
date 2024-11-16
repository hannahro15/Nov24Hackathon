# Generated by Django 4.2.9 on 2024-11-16 19:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('preferred_language', models.CharField(choices=[('af', 'Afrikaans'), ('am', 'Amharic'), ('ar', 'Arabic'), ('bg', 'Bulgarian'), ('bn', 'Bengali'), ('bs', 'Bosnian'), ('ca', 'Catalan'), ('cs', 'Czech'), ('cy', 'Welsh'), ('da', 'Danish'), ('de', 'German'), ('el', 'Greek'), ('en', 'English'), ('es', 'Spanish'), ('et', 'Estonian'), ('eu', 'Basque'), ('fi', 'Finnish'), ('fr', 'French'), ('fr-CA', 'French (Canada)'), ('gl', 'Galician'), ('gu', 'Gujarati'), ('ha', 'Hausa'), ('hi', 'Hindi'), ('hr', 'Croatian'), ('hu', 'Hungarian'), ('id', 'Indonesian'), ('is', 'Icelandic'), ('it', 'Italian'), ('iw', 'Hebrew'), ('ja', 'Japanese'), ('jw', 'Javanese'), ('km', 'Khmer'), ('kn', 'Kannada'), ('ko', 'Korean'), ('la', 'Latin'), ('lt', 'Lithuanian'), ('lv', 'Latvian'), ('ml', 'Malayalam'), ('mr', 'Marathi'), ('ms', 'Malay'), ('my', 'Myanmar (Burmese)'), ('ne', 'Nepali'), ('nl', 'Dutch'), ('no', 'Norwegian'), ('pa', 'Punjabi (Gurmukhi)'), ('pl', 'Polish'), ('pt', 'Portuguese (Brazil)'), ('pt-PT', 'Portuguese (Portugal)'), ('ro', 'Romanian'), ('ru', 'Russian'), ('si', 'Sinhala'), ('sk', 'Slovak'), ('sq', 'Albanian'), ('sr', 'Serbian'), ('su', 'Sundanese'), ('sv', 'Swedish'), ('sw', 'Swahili'), ('ta', 'Tamil'), ('te', 'Telugu'), ('th', 'Thai'), ('tl', 'Filipino'), ('tr', 'Turkish'), ('uk', 'Ukrainian'), ('ur', 'Urdu'), ('vi', 'Vietnamese'), ('yue', 'Cantonese'), ('zh-CN', 'Chinese (Simplified)'), ('zh-TW', 'Chinese (Mandarin/Taiwan)'), ('zh', 'Chinese (Mandarin)')], default='en', max_length=10)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]