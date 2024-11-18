from django import forms

from .models import LANGUAGE_CHOICES, Profile


class InputForm(forms.Form):
    text_input = forms.CharField(
        label='Text Input',
        max_length=2000,
        widget=forms.Textarea(
            attrs={
                'placeholder': 'Paste your text here...',
                'class': 'form-control',
                'rows': 15,
            },
        ),
    )


class ProfileForm(forms.ModelForm):
    preferred_language = forms.ChoiceField(
        choices=LANGUAGE_CHOICES,
        label='Preferred Language',
        widget=forms.Select(
            attrs={
                'class': 'form-select',
            },
        ),
    )

    class Meta:
        model = Profile
        fields = ['preferred_language']
