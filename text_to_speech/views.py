import io

from django.http import HttpResponse
from django.shortcuts import render
from gtts import gTTS

from .forms import InputForm


def text_to_speech(request):
    # Renders the main page with the form
    context = {}
    context['form'] = InputForm()
    return render(request, 'text_to_speech/text_to_speech.html', context)


def text_to_speech_api(request):
    # Handles the TTS generation and returns audio
    text = request.GET.get('text', '')
    voice = request.GET.get('voice', 'en')
    if not text.strip():
        return HttpResponse('No text provided.', status=400)

    # Validate voice
    supported_voices = ['en', 'en-au', 'en-uk']
    if voice not in supported_voices:
        return HttpResponse('Voice not supported.', status=400)

    try:
        # Generate TTS audio
        tts = gTTS(text=text, lang=voice)
        audio_data = io.BytesIO()
        tts.write_to_fp(audio_data)
        audio_data.seek(0)

        # Create HTTP response with audio data
        response = HttpResponse(audio_data.read(), content_type='audio/mpeg')
        response['Content-Length'] = audio_data.getbuffer().nbytes
        response['Content-Disposition'] = 'inline; filename="speech.mp3"'
        return response
    except Exception as e:
        return HttpResponse(f'Error: {str(e)}', status=500)
