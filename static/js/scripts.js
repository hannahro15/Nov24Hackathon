document.addEventListener("DOMContentLoaded", () => {
  let selectedVoice = "en"; // Default voice is English
  let playbackSpeed = 1.0; // Default playback speed

  // Get the language select element, text input element, buttons, and speed elements
  const languageSelect = document.getElementById("language-select");
  const textInputElement = document.querySelector('[name="text_input"]');
  const sendButton = document.getElementById("send-button");
  const clearButton = document.getElementById("clear-button");
  const speedRange = document.getElementById("speed-range");
  const speedValue = document.getElementById("speed-value");
  const sendSpinner = document.getElementById("send-spinner");
  const sendButtonText = document.getElementById("send-button-text");

  // Set the default selected option in the select element
  languageSelect.value = selectedVoice;

  // Handle dropdown selection
  languageSelect.addEventListener("change", () => {
    selectedVoice = languageSelect.value;
  });

  // Update playback speed display
  speedRange.addEventListener("input", () => {
    playbackSpeed = parseFloat(speedRange.value);
    speedValue.textContent = playbackSpeed.toFixed(1) + "x";
  });

  // Initialize the speed display
  speedValue.textContent = playbackSpeed.toFixed(1) + "x";

  // Handle 'Send' button click
  sendButton.addEventListener("click", async () => {
    const textInput = textInputElement.value.trim();
    if (!textInput) {
      alert("Please enter some text.");
      return;
    }

    if (!selectedVoice) {
      alert("Please select a language.");
      return;
    }

    // Disable the button and show spinner
    sendButton.disabled = true;
    sendSpinner.classList.remove("d-none");
    sendButtonText.textContent = ""; // Only the spinner will be shown

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
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.playbackRate = playbackSpeed; // Set the playback speed
      audio.play();
    } catch (error) {
      console.error("Error:", error);
      alert("Error generating speech.");
    } finally {
      // Restore the button state
      sendSpinner.classList.add("d-none");
      sendButtonText.textContent = "Send";
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
