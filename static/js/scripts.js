document.addEventListener("DOMContentLoaded", () => {
  let selectedVoice = "en-uk"; // Default voice

  // Get the voice options, text input element, and buttons
  const voiceOptions = document.querySelectorAll(".card-voice");
  const textInputElement = document.querySelector('[name="text_input"]');
  const sendButton = document.getElementById("send-button");
  const clearButton = document.getElementById("clear-button");

  // Function to update selected voice option styling
  function updateSelectedVoice(option) {
    voiceOptions.forEach((opt) => opt.classList.remove("selected"));
    option.classList.add("selected");
    selectedVoice = option.getAttribute("data-voice");
  }

  // Initialize the default selected voice
  const defaultVoiceOption = document.querySelector(
    `.card-voice[data-voice="${selectedVoice}"]`
  );
  if (defaultVoiceOption) {
    updateSelectedVoice(defaultVoiceOption);
  }

  // Add click event listeners to each voice option
  voiceOptions.forEach((option) => {
    option.addEventListener("click", () => updateSelectedVoice(option));
  });

  // Handle 'Send' button click
  sendButton.addEventListener("click", async () => {
    const textInput = textInputElement.value.trim();
    if (!textInput) {
      alert("Please enter some text.");
      return;
    }

    sendButton.disabled = true;

    try {
      // Fetch the text-to-speech API
      const response = await fetch(
        `/text_to_speech_api/?text=${encodeURIComponent(
          textInput
        )}&voice=${selectedVoice}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      // Play the audio response
      const blob = await response.blob();
      // Create a URL for the blob
      const url = URL.createObjectURL(blob);
      // Create an audio element and play the audio
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


// Change CSS variables on dropdown menu
document.addEventListener("DOMContentLoaded", () => {
  const paletteLinks = document.querySelectorAll(".dropdown-item");

  // Function to apply the palette
  const applyPalette = (paletteClass) => {
    document.body.className = paletteClass;
  };

  // Add event listeners to dropdown links
  paletteLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const palette = link.dataset.palette;
      applyPalette(palette);
    });
  });

  // Apply default palette (Palette 1)
  applyPalette("palette1");
});
