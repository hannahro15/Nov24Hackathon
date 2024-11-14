from django.shortcuts import render


def text_to_speech(request):
    return render(request, 'text_to_speech/text_to_speech.html')