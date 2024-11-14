from django import forms


class InputForm(forms.Form):
    #Class to create a text field for a user to enter text.
    form_input = forms.CharField(max_length = 1000)