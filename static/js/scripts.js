document.addEventListener("DOMContentLoaded", () => {
  // Default settings
  let selectedVoice = "en";
  let playbackSpeed = 1.0;
  let isPlaying = false;
  let audio = null;

  // DOM elements
  const elements = {
    languageSelect: document.getElementById("language-select"),
    textInput: document.querySelector('[name="text_input"]'),
    sendButton: document.getElementById("send-button"),
    clearButton: document.getElementById("clear-button"),
    speedRange: document.getElementById("speed-range"),
    speedValue: document.getElementById("speed-value"),
    sendSpinner: document.getElementById("send-spinner"),
    sendButtonText: document.getElementById("send-button-text"),
  };

  // Initialize application
  function init() {
    setDefaultLanguage();
    updateSpeedDisplay();
    addEventListeners();
  }

  // Set default selected language
  function setDefaultLanguage() {
    elements.languageSelect.value = selectedVoice;
  }

  // Update speed display
  function updateSpeedDisplay() {
    elements.speedValue.textContent = `${playbackSpeed.toFixed(1)}x`;
  }

  // Add event listeners
  function addEventListeners() {
    elements.languageSelect.addEventListener("change", handleLanguageChange);
    elements.speedRange.addEventListener("input", handleSpeedChange);
    elements.sendButton.addEventListener("click", handleSendButtonClick);
    elements.clearButton.addEventListener("click", handleClearButtonClick);
  }

  // Handle language selection change
  function handleLanguageChange() {
    selectedVoice = elements.languageSelect.value;
  }

  // Handle speed range input
  function handleSpeedChange() {
    playbackSpeed = parseFloat(elements.speedRange.value);
    updateSpeedDisplay();
  }

  // Handle send/stop button click
  async function handleSendButtonClick() {
    if (!isPlaying) {
      await startAudioPlayback();
    } else {
      stopAudioPlayback();
    }
  }

  // Start audio playback
  async function startAudioPlayback() {
    const text = elements.textInput.value.trim();
    if (!validateInput(text)) return;
    disableSendButton(true);
    try {
      const audioUrl = await fetchAudioUrl(text, selectedVoice);
      playAudio(audioUrl);
      updateButtonToStop();
    } catch (error) {
      console.error("Error:", error);
      alert("Error generating speech.");
      resetSendButton();
    }
  }

  // Stop audio playback
  function stopAudioPlayback() {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio = null;
    }
    isPlaying = false;
    resetSendButton();
  }

  // Validate user input
  function validateInput(text) {
    if (!text) {
      alert("Please enter some text.");
      return false;
    }
    if (!selectedVoice) {
      alert("Please select a language.");
      return false;
    }
    return true;
  }

  // Disable or enable send button
  function disableSendButton(disable) {
    elements.sendButton.disabled = disable;
    if (disable) {
      elements.sendSpinner.classList.remove("d-none");
      elements.sendButtonText.textContent = "";
    } else {
      elements.sendSpinner.classList.add("d-none");
    }
  }

  // Fetch audio URL from API
  async function fetchAudioUrl(text, voice) {
    const response = await fetch(
      `/text_to_speech_api/?text=${encodeURIComponent(text)}&voice=${voice}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  }

  // Play audio
  function playAudio(url) {
    audio = new Audio(url);
    audio.playbackRate = playbackSpeed;
    audio.play();
    isPlaying = true;
    audio.addEventListener("ended", handleAudioEnded);
  }

  // Handle audio ended
  function handleAudioEnded() {
    isPlaying = false;
    resetSendButton();
    audio = null;
  }

  // Update button to 'Stop' state
  function updateButtonToStop() {
    elements.sendSpinner.classList.add("d-none");
    elements.sendButtonText.textContent = "Stop";
    elements.sendButton.classList.remove("btn-primary");
    elements.sendButton.classList.add("btn-danger");
    elements.sendButton.disabled = false;
  }

  // Reset send button to initial state
  function resetSendButton() {
    elements.sendButtonText.textContent = "Send";
    elements.sendButton.classList.remove("btn-danger");
    elements.sendButton.classList.add("btn-primary");
    disableSendButton(false);
  }

  // Handle clear button click
  function handleClearButtonClick() {
    elements.textInput.value = "";
  }

  // Initialize the application
  init();
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
