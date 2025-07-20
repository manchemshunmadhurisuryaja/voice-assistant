const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";

const btn = document.querySelector("#listen-btn");
const transcriptDiv = document.querySelector("#transcript");

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}

function wishMe() {
  let hours = new Date().getHours();
  if (hours < 12) speak("Good Morning");
  else if (hours < 16) speak("Good Afternoon");
  else speak("Good Evening");
}

function greetUser() {
  const name = localStorage.getItem("username");
  if (name) speak(`Welcome back, ${name}`);
  else {
    const userName = prompt("What is your name?");
    if (userName) {
      localStorage.setItem("username", userName);
      speak(`Nice to meet you, ${userName}`);
    }
  }
  wishMe();
}

const jokes = [
  "I told my computer I needed a break… now it won’t stop sending me KitKat ads.",
  "I asked Siri why I'm still single… it activated the front camera.",
  "I'm not lazy, I'm on energy-saving mode.",
  "Why don’t programmers like nature? It has too many bugs.",
  "My internet went down for five minutes… so I had to talk to my family. They seem like nice people.",
  "Why did the JavaScript developer go broke? Because he kept using 'var' when he should’ve used 'let'.",
  "I told my boss three companies are after me. He said, 'Which ones?' I said, 'Gas, water, and electricity.'",
  "I changed my password to 'incorrect' so every time I forget it, the computer says 'Your password is incorrect.' Genius!",
  "Why do cows wear bells? Because their horns don’t work.",
  "Some people graduate with honors, I am just honored to graduate."
];

function handleCommands(command) {
  transcriptDiv.innerText = `You said: "${command}"`;

  if (command.includes("hello") || command.includes("hey")) {
    speak("Hello, how can I help you?");
  }
  else if (command.includes("open youtube")) {
    speak("Opening YouTube...");
    window.open("https://www.youtube.com", "_blank");
  }
  else if (command.includes("open facebook")) {
    speak("Opening Facebook...");
    window.open("https://www.facebook.com", "_blank");
  }
  else if (command.includes("open instagram")) {
    speak("Opening Instagram...");
    window.open("https://www.instagram.com", "_blank");
  }
  else if (command.includes("open whatsapp")) {
    speak("Opening WhatsApp...");
    window.open("https://www.whatsapp.com", "_blank");
  }
  else if (command.includes("open google")) {
    speak("Opening Google...");
    window.open("https://www.google.com", "_blank");
  }
  else if (command.includes("open github")) {
    speak("Opening GitHub...");
    window.open("https://github.com", "_blank");
  }
  else if (command.includes("what is time")) {
    let time = new Date().toLocaleTimeString();
    speak("The time is " + time);
  }
  else if (command.includes("what is today's date")) {
    let date = new Date().toDateString();
    speak("Today's date is " + date);
  }
  else if (command.startsWith("search for")) {
    const query = command.replace("search for", "").trim();
    speak("Searching Google for " + query);
    window.open(`https://www.google.com/search?q=${query}`, "_blank");
  }
  else if (command.startsWith("play")) {
    const query = command.replace("play", "").trim();
    speak("Playing " + query + " on YouTube");
    window.open(`https://www.youtube.com/results?search_query=${query}`, "_blank");
  }
  else if (command.includes("tell me a joke") || command.includes("joke") || command.includes("make me laugh")) {
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    speak(joke);
  }
  else {
    speak("Searching Google for " + command);
    window.open(`https://www.google.com/search?q=${command}`, "_blank");
  }
}

let greeted = false;

btn.addEventListener("click", () => {
  if (!greeted) {
    greetUser();
    greeted = true;
  }

  setTimeout(() => {
    btn.innerHTML = "Listening... 👂";
    btn.classList.add("listening");
    recognition.start();
  }, 1500);
});

recognition.onresult = (event) => {
  const command = event.results[0][0].transcript.toLowerCase();
  handleCommands(command);
};

recognition.onend = () => {
  btn.innerHTML = "Start Asking...";
  btn.classList.remove("listening");
};

recognition.onerror = (event) => {
  speak("Sorry, I didn't catch that. Please try again.");
  console.error("Speech recognition error: ", event.error);
};


