from django.shortcuts import render
from .forms import InputForm
import assemblyai as aai


def text_to_speech(request):
    context ={}
    context['form']= InputForm()
    return render(request, "text_to_speech/text_to_speech.html", context)