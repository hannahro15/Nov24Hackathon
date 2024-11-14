from django import forms


class InputForm(forms.Form):
    # Class to create a text field for a user to enter text.
    text_input = forms.CharField(
        label='Text Input', max_length=100, widget=forms.Textarea
    )
