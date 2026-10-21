
const petalLayer = document.getElementById("petals");
const flowers = ["🌸", "🌹", "🌷", "✿", "❀", "♡"];

function createPetal(duration, delay = "0s") {
  const petal = document.createElement("span");
  petal.className = "petal";
  petal.textContent = flowers[Math.floor(Math.random() * flowers.length)];

  petal.style.setProperty("--x", Math.random() * 100 + "%");
  petal.style.setProperty("--size", 12 + Math.random() * 20 + "px");
  petal.style.setProperty("--opacity", 0.35 + Math.random() * 0.5);
  petal.style.setProperty("--duration", duration + "s");
  petal.style.setProperty("--delay", delay);

  petalLayer.appendChild(petal);
  return petal;
}

// Gentle floating flowers on page load
for (let i = 0; i < 22; i++) {
  createPetal(12 + Math.random() * 17, -Math.random() * 26 + "s");
}

function showLetter() {
  document.getElementById("letterText").classList.add("show");
  document.getElementById("revealPrompt").style.display = "none";
  document.getElementById("letter").scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}

document.getElementById("openLetter").addEventListener("click", showLetter);
document.getElementById("revealBtn").addEventListener("click", showLetter);

// Rose shower and photo reveal
let toastTimer;

document.getElementById("petalBtn").addEventListener("click", () => {
  // Shower of falling flowers
  for (let i = 0; i < 30; i++) {
    const petal = createPetal(4 + Math.random() * 5, Math.random() * 1.2 + "s");
    petal.style.setProperty("--size", 16 + Math.random() * 20 + "px");
    setTimeout(() => petal.remove(), 11000);
  }

  // Rose and heart burst
  for (let i = 0; i < 18; i++) {
    const rose = document.createElement("span");
    rose.className = "rose-burst";
    rose.textContent = ["🌹", "🌹", "💗", "🌸"][Math.floor(Math.random() * 4)];
    rose.style.setProperty("--dx", Math.random() * 90 - 45 + "vw");
    rose.style.setProperty("--dy", Math.random() * 80 - 40 + "vh");
    document.body.appendChild(rose);
    setTimeout(() => rose.remove(), 2000);
  }

  // Reveal Radhimaa's photo
  const photo = document.getElementById("photoSurprise");
  photo.classList.remove("show");
  void photo.offsetWidth;
  photo.classList.add("show");

  setTimeout(() => {
    photo.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 250);

  // Toast message
  const toast = document.getElementById("toast");
  toast.textContent = "A rose shower just for you, Radhimaa 🌹";
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
});
