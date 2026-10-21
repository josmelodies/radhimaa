// A Little Garden of Love — interactions and animations
"use strict";

const gardenPassword = "rosebud"; // Change this before sharing.
const passwordGate = document.getElementById("passwordGate");
const passwordForm = document.getElementById("passwordForm");
const passwordInput = document.getElementById("sitePassword");
const passwordError = document.getElementById("gateError");

passwordForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (passwordInput.value === gardenPassword) {
    passwordError.textContent = "";
    passwordGate.classList.add("unlocked");
    document.getElementById("openLetter").focus({ preventScroll: true });
  } else {
    passwordError.textContent = "Oops, that isn't the right password. Please try again. 💗";
    passwordInput.value = "";
    passwordInput.focus();
    passwordForm.animate(
      [{ transform: "translateX(0)" }, { transform: "translateX(-7px)" },
       { transform: "translateX(7px)" }, { transform: "translateX(0)" }],
      { duration: 260 }
    );
  }
});

const petalLayer = document.getElementById("petals");
const flowerSymbols = ["🌸", "🌹", "🌷", "✿", "❀", "♡"];

function createPetal(extra = false) {
  const petal = document.createElement("span");
  petal.className = "petal";
  petal.textContent = flowerSymbols[Math.floor(Math.random() * flowerSymbols.length)];
  petal.style.setProperty("--x", `${Math.random() * 100}%`);
  petal.style.setProperty("--size", `${extra ? 16 + Math.random() * 20 : 12 + Math.random() * 17}px`);
  petal.style.setProperty("--opacity", extra ? ".85" : (0.28 + Math.random() * 0.5).toFixed(2));
  petal.style.setProperty("--duration", `${extra ? 4 + Math.random() * 5 : 12 + Math.random() * 17}s`);
  petal.style.setProperty("--delay", extra ? `${Math.random() * 1.2}s` : `${-Math.random() * 26}s`);
  petalLayer.appendChild(petal);
  if (extra) window.setTimeout(() => petal.remove(), 11000);
}

for (let i = 0; i < 22; i++) createPetal();

function showLetter() {
  document.getElementById("letterText").classList.add("show");
  document.getElementById("revealPrompt").style.display = "none";
  document.getElementById("letter").scrollIntoView({ behavior: "smooth", block: "center" });
}
document.getElementById("openLetter").addEventListener("click", showLetter);
document.getElementById("revealBtn").addEventListener("click", showLetter);

let toastTimer;
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 3000);
}

document.getElementById("petalBtn").addEventListener("click", () => {
  for (let i = 0; i < 30; i++) createPetal(true);
  for (let i = 0; i < 18; i++) {
    const rose = document.createElement("span");
    rose.className = "rose-burst";
    rose.textContent = ["🌹", "🌹", "💗", "🌸"][Math.floor(Math.random() * 4)];
    rose.style.setProperty("--dx", `${Math.random() * 90 - 45}vw`);
    rose.style.setProperty("--dy", `${Math.random() * 80 - 40}vh`);
    document.body.appendChild(rose);
    window.setTimeout(() => rose.remove(), 2000);
  }
  const photo = document.getElementById("photoSurprise");
  photo.classList.remove("show");
  void photo.offsetWidth;
  photo.classList.add("show");
  window.setTimeout(() => photo.scrollIntoView({ behavior: "smooth", block: "center" }), 250);
  showToast("A rose shower just for you, Radhimaa 🌹");
});

// Animated envelope and typing letter
const note = "Hey Radhimaa, 🌷\n\nThis little garden is a reminder that you matter, your smile makes a difference, and you deserve gentle days, loud laughter, and beautiful surprises. Thank you for being you and for making friendship feel like a place to bloom.\n\nKeep blooming, okay? I am always cheering for you. 💗\n\nYour bestie, always ♡";
let typingTimer;
document.getElementById("envelopeButton").addEventListener("click", function () {
  this.classList.toggle("open");
  const isOpen = this.classList.contains("open");
  document.getElementById("envelopeHint").textContent = isOpen
    ? "A note, written just for you 💌" : "The letter is tucked safely inside ♡";
  const target = document.getElementById("typedLetter");
  window.clearInterval(typingTimer);
  target.textContent = "";
  if (isOpen) {
    let index = 0;
    typingTimer = window.setInterval(() => {
      target.textContent += note.charAt(index++);
      if (index >= note.length) window.clearInterval(typingTimer);
    }, 27);
  }
});

// Four blooming compliments
document.querySelectorAll(".bloom").forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("bloomed");
    const compliment = button.querySelector("small");
    compliment.hidden = !compliment.hidden;
    button.setAttribute("aria-expanded", String(!compliment.hidden));
  });
});

// Happy-message jar
const happyMessages = [
  "You make the world a little softer just by being in it. 🌷",
  "You do not have to be perfect to be wonderful. 💗",
  "Tiny steps still count. Be proud of yourself. ✨",
  "You deserve a friendship that feels safe and sunny. ☀️",
  "Rest is allowed. You are enough, even on quiet days. 🌸",
  "Your future has so many lovely little possibilities. 🦋",
  "Somewhere, someone is smiling because of you. 💌",
  "You are more loved and appreciated than you know. 🌹"
];
document.getElementById("drawMessage").addEventListener("click", () => {
  let message = happyMessages[Math.floor(Math.random() * happyMessages.length)];
  const current = document.getElementById("jarMessage").textContent;
  if (happyMessages.length > 1 && message === current) {
    message = happyMessages[(happyMessages.indexOf(message) + 1) % happyMessages.length];
  }
  document.getElementById("jarMessage").textContent = message;
  document.getElementById("jarEmoji").textContent = ["🫙", "💌", "🌷", "💗"][Math.floor(Math.random() * 4)];
});

// Final surprise
const finalScreen = document.getElementById("finalSurprise");
function openFinalSurprise() {
  finalScreen.classList.add("show");
  finalScreen.setAttribute("aria-hidden", "false");
  document.getElementById("closeFinal").focus({ preventScroll: true });
}
function closeFinalSurprise() {
  finalScreen.classList.remove("show");
  finalScreen.setAttribute("aria-hidden", "true");
  document.getElementById("finalSurpriseButton").focus({ preventScroll: true });
}
document.getElementById("finalSurpriseButton").addEventListener("click", openFinalSurprise);
document.getElementById("closeFinal").addEventListener("click", closeFinalSurprise);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && finalScreen.classList.contains("show")) closeFinalSurprise();
});
