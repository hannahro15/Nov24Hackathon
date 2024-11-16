from django.shortcuts import render


def contact(request):
    return render(request, 'contact/contact.html')

def faq(request):
    return render(request, 'contact/faq.html')