const text = document.querySelector(".text");
const button = document.querySelector(".button");

const copyToClipboard = document.querySelector(".copy-to-clipboard");
const copyButton = document.querySelector(".copy-to-clipboard p");

let isListening = false;

const createRecognition = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition =
    SpeechRecognition !== undefined ? new SpeechRecognition() : null;
  if (!recognition) {
    text.textContent = "Speech Recognition is not found!";
    return false;
  }
  recognition.lang = "pt_BR";
  recognition.onstart = () => {
    button.classList.add("listening-animation");
    isListening = true;
  };
  recognition.onend = () => {
    isListening = false;
    button.classList.remove("listening-animation");
  };
  recognition.onerror = (error) => {
    console.log("error:", error);
  };
  recognition.onresult = (event) => {
    text.textContent = event.results[0][0].transcript;
  };
  return recognition;
};

const recognition = createRecognition();
button.addEventListener("click", (event) => {
  if (!recognition) {
    return false;
  }
  if (isListening) {
    recognition.stop();
  } else {
    recognition.start();
    text.textContent = "";
    text.style.color = "#fff";
  }
});

copyToClipboard.addEventListener("click", () => {
  navigator.clipboard.writeText(text.textContent);
  copyButton.textContent = "Copied!";
  setTimeout(() => {
    copyButton.textContent = '';
  }, 2000);
});