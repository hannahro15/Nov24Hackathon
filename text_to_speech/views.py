import io

from django.http import HttpResponse
from django.shortcuts import render
from gtts import gTTS
from gtts.lang import tts_langs

from .forms import InputForm


def text_to_speech(request):
    # Get the list of available languages
    languages = tts_langs()
    context = {'form': InputForm(), 'languages': languages}
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
