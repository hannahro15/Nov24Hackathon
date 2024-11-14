document.addEventListener("DOMContentLoaded", () => {
  let selectedVoice = "en"; // Default voice

  const voiceOptions = document.querySelectorAll(".voice-option");
  const textInputElement = document.querySelector('[name="text_input"]');
  const sendButton = document.getElementById("app-buttons-send");
  const clearButton = document.getElementById("app-buttons-clear");

  // Highlight the default selected voice option
  const defaultVoiceOption = document.querySelector(
    `.voice-option[data-voice="${selectedVoice}"]`
  );
  if (defaultVoiceOption) {
    defaultVoiceOption.classList.add("selected");
  }

  // Handle voice option selection
  voiceOptions.forEach((option) => {
    option.addEventListener("click", () => {
      voiceOptions.forEach((opt) => opt.classList.remove("selected"));
      option.classList.add("selected");
      selectedVoice = option.getAttribute("data-voice");
    });
  });

  // Handle 'Send' button click
  sendButton.addEventListener("click", async () => {
    const textInput = textInputElement.value.trim();
    if (!textInput) {
      alert("Please enter some text.");
      return;
    }

    sendButton.disabled = true; // Prevent multiple clicks

    try {
      const response = await fetch(
        `/text_to_speech_api/?text=${encodeURIComponent(
          textInput
        )}&voice=${selectedVoice}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.play();
    } catch (error) {
      console.error("Error:", error);
      alert("Error generating speech.");
    } finally {
      sendButton.disabled = false;
    }
  });

  // Handle 'Clear' button click
  clearButton.addEventListener("click", () => {
    textInputElement.value = "";
  });
});
