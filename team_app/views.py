from django.shortcuts import render


def team_app(request):
    return render(request, 'team_app/team_app.html')