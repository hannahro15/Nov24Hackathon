import io

from django.http import HttpResponse
from django.shortcuts import render
from gtts import gTTS

from .forms import InputForm


def text_to_speech(request):
    # Renders the main page with the form
    context = {'form': InputForm()}
    return render(request, 'text_to_speech/text_to_speech.html', context)


def text_to_speech_api(request):
    text = request.GET.get('text', '')
    voice = request.GET.get('voice', 'en-uk')
    if not text.strip():
        return HttpResponse('No text provided.', status=400)

    # Define voice mappings for gTTS using standard voices
    voice_mappings = {
        'en-uk': 'en',
        'en-au': 'en',
        'en-in': 'en',
    }

    # Define TLD mappings for accents
    tld_mappings = {
        'en-uk': 'co.uk',
        'en-au': 'com.au',
        'en-in': 'co.in',
    }

    # Get the mapped voice and tld or default to 'en' and 'com'
    gtts_voice = voice_mappings.get(voice, 'en')
    gtts_tld = tld_mappings.get(voice, 'com')

    try:
        tts = gTTS(text=text, lang=gtts_voice, tld=gtts_tld)
        audio_data = io.BytesIO()
        tts.write_to_fp(audio_data)
        audio_data.seek(0)

        response = HttpResponse(audio_data.read(), content_type='audio/mpeg')
        response['Content-Length'] = audio_data.getbuffer().nbytes
        response['Content-Disposition'] = 'inline; filename="speech.mp3"'
        return response
    except Exception as e:
        return HttpResponse(f'Error: {str(e)}', status=500)
