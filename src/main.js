const text = document.querySelector(".text");
const button = document.querySelector(".button");
const copyIcon = document.querySelector(".copy-icon");

copyIcon.addEventListener("click", () => {
    navigator.clipboard.writeText(text.textContent);
})

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
    text.style.color = "#fff";
  }
});

