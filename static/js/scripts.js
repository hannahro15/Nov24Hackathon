document.addEventListener("DOMContentLoaded", () => {
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
    pauseButton: document.getElementById("pause-button"),
  };

  // Default settings
  let selectedVoice =
    (elements.languageSelect &&
      elements.languageSelect.dataset.preferredLanguage) ||
    "en";
  let playbackSpeed = 1.0;
  let isPlaying = false;
  let audio = null;

  // Initialize application
  function init() {
    setDefaultLanguage();
    updateSpeedDisplay();
    addEventListeners();
  }

  // Set default selected language
  function setDefaultLanguage() {
    if (elements.languageSelect) {
      elements.languageSelect.value = selectedVoice;
    }
  }

  // Update speed display
  function updateSpeedDisplay() {
    if (elements.speedValue) {
      elements.speedValue.textContent = `${playbackSpeed.toFixed(1)}x`;
    }
  }

  // Add event listeners
  function addEventListeners() {
    if (elements.languageSelect) {
      elements.languageSelect.addEventListener("change", handleLanguageChange);
    }
    if (elements.speedRange) {
      elements.speedRange.addEventListener("input", handleSpeedChange);
    }
    if (elements.sendButton) {
      elements.sendButton.addEventListener("click", handleSendButtonClick);
    }
    if (elements.clearButton) {
      elements.clearButton.addEventListener("click", handleClearButtonClick);
    }
    if (elements.pauseButton) {
      elements.pauseButton.addEventListener("click", handlePauseButtonClick);
    }
  }

  // Handle language selection change
  function handleLanguageChange() {
    if (elements.languageSelect) {
      selectedVoice = elements.languageSelect.value;
    }
  }

  // Handle speed range input
  function handleSpeedChange() {
    if (elements.speedRange) {
      playbackSpeed = parseFloat(elements.speedRange.value);
      updateSpeedDisplay();
    }
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
    const text = elements.textInput ? elements.textInput.value.trim() : "";
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

  // Pause/Resume audio playback
  function handlePauseButtonClick() {
    if (audio) {
      if (audio.paused) {
        // Resume playback if paused
        audio.play();
        if (elements.pauseButton) {
          elements.pauseButton.textContent = "Pause";
        }
      } else {
        // Pause playback if playing
        audio.pause();
        if (elements.pauseButton) {
          elements.pauseButton.textContent = "Resume";
        }
      }
    }
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
    if (elements.sendButton) {
      elements.sendButton.disabled = disable;
    }
    if (elements.sendSpinner) {
      if (disable) {
        elements.sendSpinner.classList.remove("d-none");
      } else {
        elements.sendSpinner.classList.add("d-none");
      }
    }
    if (elements.sendButtonText && disable) {
      elements.sendButtonText.textContent = "";
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
    if (elements.sendSpinner) {
      elements.sendSpinner.classList.add("d-none");
    }
    if (elements.sendButtonText) {
      elements.sendButtonText.textContent = "Stop";
    }
    if (elements.sendButton) {
      elements.sendButton.classList.remove("btn-primary");
      elements.sendButton.classList.add("btn-danger");
      elements.sendButton.disabled = false;
    }
  }

  // Reset send button to initial state
  function resetSendButton() {
    if (elements.sendButtonText) {
      elements.sendButtonText.textContent = "Send";
    }
    if (elements.sendButton) {
      elements.sendButton.classList.remove("btn-danger");
      elements.sendButton.classList.add("btn-primary");
      disableSendButton(false);
    }
  }

  // Handle clear button click
  function handleClearButtonClick() {
    if (elements.textInput) {
      elements.textInput.value = "";
    }
  }

  // Initialize the application
  init();

  // Handle clicks outside the navbar to collapse it
  const navbarCollapse = document.getElementById("navbar-base");
  const navbarToggler = document.querySelector(".navbar-toggler");

  document.addEventListener("click", function (event) {
    if (navbarCollapse && navbarCollapse.classList.contains("show")) {
      const isClickInsideNavbar =
        navbarCollapse.contains(event.target) ||
        navbarToggler.contains(event.target);

      if (!isClickInsideNavbar) {
        // Collapse the navbar
        const bsNavbar = new bootstrap.Collapse(navbarCollapse);
        bsNavbar.hide();
      }
    }
  });
});

// Change CSS variables on dropdown menu and persist palette during the session
document.addEventListener("DOMContentLoaded", () => {
  const paletteLinks = document.querySelectorAll(".dropdown-item");

  // Function to apply the palette
  const applyPalette = (paletteClass) => {
    document.body.className = paletteClass;

    // Handle grayscale-specific adjustments
    if (paletteClass === "palette4") {
      document.body.classList.add("grayscale-mode");
    } else {
      document.body.classList.remove("grayscale-mode");
    }

    // Save the selected palette to sessionStorage
    console.log("Saving palette:", paletteClass);
    sessionStorage.setItem("selectedPalette", paletteClass);
  };

  // Add event listeners for dropdown links
  paletteLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const palette = link.dataset.palette;
      applyPalette(palette);

      // Announce change for screen readers
      const alertDiv = document.getElementById("palette-alert");
      if (alertDiv) {
        alertDiv.textContent = `Palette changed to ${link.textContent}`;
      }
    });

    // Add keyboard support for "Enter" key
    link.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        link.click();
      }
    });
  });

  // Retrieve and apply the stored palette on page load
  const savedPalette = sessionStorage.getItem("selectedPalette");
  console.log("Retrieved palette:", savedPalette);
  if (savedPalette) {
    applyPalette(savedPalette);
  } else {
    applyPalette("palette6"); // Default palette
  }

  // Add alert div for screen readers
  const alertDiv = document.createElement("div");
  alertDiv.id = "palette-alert";
  alertDiv.setAttribute("role", "alert");
  alertDiv.setAttribute("aria-live", "assertive");
  alertDiv.style.position = "absolute";
  alertDiv.style.left = "-9999px"; // Visually hidden
  document.body.appendChild(alertDiv);
});

// Close dropdown menu when clicking outside of it
document.addEventListener("DOMContentLoaded", () => {
  const dropdownToggle = document.getElementById("paletteDropdown");
  const dropdownMenu = document.querySelector(".dropdown-menu");

  // Add event listener for clicks outside the dropdown
  document.addEventListener("click", (event) => {
    const isClickInside =
      (dropdownMenu && dropdownMenu.contains(event.target)) ||
      (dropdownToggle && dropdownToggle.contains(event.target));

    // If the click is outside, hide the dropdown
    if (!isClickInside) {
      const dropdown = bootstrap.Dropdown.getInstance(dropdownToggle);
      if (dropdown && dropdownMenu && dropdownMenu.classList.contains("show")) {
        dropdown.hide();
      }
    }
  });
});

// Handle contact form submission
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const submitButton = document.getElementById("submitButton");
  const successModalElement = document.getElementById("successModal");
  const successModal = successModalElement
    ? new bootstrap.Modal(successModalElement)
    : null;

  // Handle form submission
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      // Validate form fields
      const firstName = document.getElementById("firstName")
        ? document.getElementById("firstName").value.trim()
        : "";
      const lastName = document.getElementById("lastName")
        ? document.getElementById("lastName").value.trim()
        : "";
      const email = document.getElementById("email")
        ? document.getElementById("email").value.trim()
        : "";
      const textArea = document.getElementById("text-area")
        ? document.getElementById("text-area").value.trim()
        : "";
      if (firstName && lastName && email && textArea) {
        // Change button color on successful form validation
        if (submitButton) {
          submitButton.style.backgroundColor = "green";
        }
        // Show success modal
        if (successModal) {
          successModal.show();
        }
        // Reset form fields after submission
        contactForm.reset();
      } else {
        alert("Please fill in all the required fields.");
      }
    });
  }
});
