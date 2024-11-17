from django.shortcuts import redirect, render


def home(request):
    # Redirect to the text_to_speech page if the user is authenticated
    if request.user.is_authenticated:
        return redirect('text_to_speech')
    return render(request, 'home/index.html')
