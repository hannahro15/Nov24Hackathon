import io

from allauth.account.forms import ChangePasswordForm
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import redirect, render
from gtts import gTTS
from gtts.lang import tts_langs

from .forms import InputForm, ProfileForm


def text_to_speech(request):
    # Get the list of available languages
    languages = tts_langs()
    preferred_language = 'en'  # Default language

    if request.user.is_authenticated:
        preferred_language = request.user.profile.preferred_language

    context = {
        'form': InputForm(),
        'languages': languages,
        'preferred_language': preferred_language,
    }
    return render(request, 'text_to_speech/text_to_speech.html', context)


def text_to_speech_api(request):
    text = request.GET.get('text', '')
    voice = request.GET.get('voice', '')
    if not text.strip():
        return HttpResponse('No text provided.', status=400)

    # Get the list of available languages
    languages = tts_langs()
    if voice not in languages:
        return HttpResponse('Invalid language selected.', status=400)

    try:
        tts = gTTS(text=text, lang=voice)
        audio_data = io.BytesIO()
        tts.write_to_fp(audio_data)
        audio_data.seek(0)

        response = HttpResponse(audio_data.read(), content_type='audio/mpeg')
        response['Content-Length'] = audio_data.getbuffer().nbytes
        response['Content-Disposition'] = 'inline; filename="speech.mp3"'
        return response
    except Exception as e:
        return HttpResponse(f'Error: {str(e)}', status=500)


@login_required
def profile(request):
    profile = request.user.profile

    if request.method == 'POST':
        form = ProfileForm(request.POST, instance=profile)
        password_change_form = ChangePasswordForm(
            user=request.user, data=request.POST
        )

        if form.is_valid() and password_change_form.is_valid():
            form.save()
            password_change_form.save()
            messages.success(
                request,
                'Your profile and password have been updated successfully.',
            )
            return redirect('profile')
        else:
            messages.error(request, 'Please correct the error below.')
    else:
        form = ProfileForm(instance=profile)
        password_change_form = ChangePasswordForm(user=request.user)

    context = {
        'form': form,
        'password_change_form': password_change_form,
    }
    return render(request, 'text_to_speech/profile.html', context)
