
/* ==========================================
   A LITTLE GARDEN OF LOVE
   Complete updated script.js
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [
    ...root.querySelectorAll(selector)
  ];

  // Safely attach an event only when an element exists.
  function on(selector, eventName, callback) {
    const element = $(selector);
    if (element) element.addEventListener(eventName, callback);
    return element;
  }

  // ==========================================
  // 1. PASSWORD GATE
  // ==========================================

  const gardenPassword = "rosebud";
  const passwordGate = $("#passwordGate");
  const passwordForm = $("#passwordForm");
  const passwordInput = $("#sitePassword");
  const passwordError = $("#gateError");

  if (passwordForm && passwordInput && passwordGate && passwordError) {
    passwordForm.addEventListener("submit", event => {
      event.preventDefault();

      if (passwordInput.value.trim().toLowerCase() === gardenPassword) {
        passwordError.textContent = "";
        passwordGate.classList.add("unlocked");
        passwordGate.setAttribute("aria-hidden", "true");
        document.body.classList.add("garden-unlocked");

        window.setTimeout(() => {
          const envelope = $("#little-envelope");

          if (envelope) {
            envelope.scrollIntoView({
              behavior: "smooth",
              block: "center"
            });
          }
        }, 500);
      } else {
        passwordError.textContent =
          "That password didn't match. Try: rosebud 💗";

        passwordInput.value = "";
        passwordInput.focus();

        if (typeof passwordForm.animate === "function") {
          passwordForm.animate(
            [
              { transform: "translateX(0)" },
              { transform: "translateX(-7px)" },
              { transform: "translateX(7px)" },
              { transform: "translateX(0)" }
            ],
            { duration: 260 }
          );
        }
      }
    });
  }

  // ==========================================
  // 2. FALLING PETALS
  // ==========================================

  const petalLayer = $("#petals");
  const flowers = ["🌸", "🌹", "🌷", "✿", "❀", "♡"];

  function randomFlower() {
    return flowers[Math.floor(Math.random() * flowers.length)];
  }

  if (petalLayer) {
    for (let i = 0; i < 22; i++) {
      const petal = document.createElement("span");

      petal.className = "petal";
      petal.textContent = randomFlower();

      petal.style.setProperty("--x", Math.random() * 100 + "%");
      petal.style.setProperty("--size", 12 + Math.random() * 17 + "px");
      petal.style.setProperty(
        "--opacity",
        (0.28 + Math.random() * 0.5).toFixed(2)
      );
      petal.style.setProperty(
        "--duration",
        12 + Math.random() * 17 + "s"
      );
      petal.style.setProperty("--delay", -Math.random() * 26 + "s");

      petalLayer.appendChild(petal);
    }
  }

  // ==========================================
  // 3. LETTER REVEAL
  // ==========================================

  function showLetter() {
    const letter = $("#letterText");
    const prompt = $("#revealPrompt");
    const letterSection = $("#letter");

    if (!letter) return;

    letter.classList.add("show");
    letter.style.display = "block";

    if (prompt) prompt.style.display = "none";

    if (letterSection) {
      letterSection.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }

  on("#revealBtn", "click", showLetter);
  on("#openLetter", "click", showLetter);

  // ==========================================
  // 4. ROSE SHOWER AND PHOTO REVEAL
  // ==========================================

  let toastTimer;

  on("#petalBtn", "click", () => {
    if (petalLayer) {
      for (let i = 0; i < 30; i++) {
        const petal = document.createElement("span");

        petal.className = "petal";
        petal.textContent = randomFlower();

        petal.style.setProperty("--x", Math.random() * 100 + "%");
        petal.style.setProperty("--size", 16 + Math.random() * 20 + "px");
        petal.style.setProperty("--opacity", ".85");
        petal.style.setProperty(
          "--duration",
          4 + Math.random() * 5 + "s"
        );
        petal.style.setProperty(
          "--delay",
          Math.random() * 1.2 + "s"
        );

        petalLayer.appendChild(petal);
        window.setTimeout(() => petal.remove(), 11000);
      }
    }

    // Create a burst of roses and hearts.
    for (let i = 0; i < 18; i++) {
      const rose = document.createElement("span");

      rose.className = "rose-burst";
      rose.textContent = ["🌹", "🌹", "💗", "🌸"][
        Math.floor(Math.random() * 4)
      ];

      rose.style.setProperty("--dx", Math.random() * 90 - 45 + "vw");
      rose.style.setProperty("--dy", Math.random() * 80 - 40 + "vh");

      document.body.appendChild(rose);
      window.setTimeout(() => rose.remove(), 2000);
    }

    // Reveal the surprise photo.
    const photo = $("#photoSurprise");

    if (photo) {
      photo.classList.remove("show");
      photo.style.display = "block";

      void photo.offsetWidth;
      photo.classList.add("show");

      window.setTimeout(() => {
        photo.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }, 250);
    }

    // Show a temporary notification.
    const toast = $("#toast");

    if (toast) {
      toast.textContent = "A rose shower just for you, Radhimaa 🌹";
      toast.classList.add("show");

      window.clearTimeout(toastTimer);

      toastTimer = window.setTimeout(() => {
        toast.classList.remove("show");
      }, 3000);
    }
  });

  // ==========================================
  // 5. ANIMATED ENVELOPE AND TYPED NOTE
  // ==========================================

  const note =
    "Hey Radhimaa, 🌷\n\n" +
    "This little garden is a reminder that you matter, your smile " +
    "makes a difference, and you deserve gentle days, loud laughter, " +
    "and beautiful surprises. Thank you for being you and for making " +
    "friendship feel like a place to bloom.\n\n" +
    "Keep blooming, okay? I am always cheering for you. 💗\n\n" +
    "Your bestie, always ♡";

  let typingTimer;

  on("#envelopeButton", "click", function () {
    this.classList.toggle("open");

    const isOpen = this.classList.contains("open");
    const hint = $("#envelopeHint");
    const target = $("#typedLetter");

    if (!target) return;

    if (hint) {
      hint.textContent = isOpen
        ? "A note, written just for you 💌"
        : "The letter is tucked safely inside ♡";
    }

    window.clearInterval(typingTimer);
    target.textContent = "";

    if (isOpen) {
      let index = 0;

      typingTimer = window.setInterval(() => {
        target.textContent += note.charAt(index);
        index++;

        if (index >= note.length) {
          window.clearInterval(typingTimer);
        }
      }, 27);
    }
  });

  // ==========================================
  // 6. PICK A FLOWER, FIND A COMPLIMENT
  // FIXED: compliments always appear on click
  // ==========================================

  const flowerCompliments = [
    "You have a beautiful heart, Radhimaa. 🌷",
    "Your smile can brighten someone's darkest day. ☀️",
    "You deserve all the happiness in the world. 💗",
    "You make ordinary moments feel special. ✨",
    "You are stronger than you sometimes realize. 🦋",
    "Your kindness makes the world more beautiful. 🌸",
    "You are one of a kind. Never forget that. 💖",
    "You deserve love, laughter, and endless good memories. 🌹",
    "You make the people around you feel appreciated. 💐",
    "Never forget how special you are. 💌",
    "You bring a little sunshine wherever you go. 🌻",
    "You deserve all the wonderful things life has to offer. 💕"
  ];

  $$(".bloom").forEach((flower, index) => {
    // Find the compliment element inside this flower.
    let message = flower.querySelector("small");

    // Create a compliment element if the HTML doesn't contain one.
    if (!message) {
      message = document.createElement("small");
      flower.appendChild(message);
    }

    // Preserve an existing compliment, or provide a default one.
    if (!message.textContent.trim()) {
      message.textContent =
        flower.dataset.compliment ||
        flowerCompliments[index % flowerCompliments.length];
    }

    // Make sure every flower is an accessible button.
    if (flower.tagName !== "BUTTON") {
      flower.setAttribute("role", "button");
      flower.setAttribute("tabindex", "0");
    }

    if (flower.tagName === "BUTTON" && !flower.hasAttribute("type")) {
      flower.setAttribute("type", "button");
    }

    // Hide the compliment initially.
    message.hidden = true;
    message.style.display = "none";

    flower.setAttribute("aria-expanded", "false");

    // Show or hide the compliment.
    function toggleCompliment() {
      const isHidden =
        message.hidden ||
        window.getComputedStyle(message).display === "none";

      if (isHidden) {
        message.hidden = false;
        message.style.display = "block";
        message.style.visibility = "visible";
        message.style.opacity = "1";

        flower.classList.add("bloomed");
        flower.setAttribute("aria-expanded", "true");
      } else {
        message.hidden = true;
        message.style.display = "none";

        flower.classList.remove("bloomed");
        flower.setAttribute("aria-expanded", "false");
      }
    }

    flower.addEventListener("click", event => {
      // Don't let a click on a nested link activate the flower.
      if (event.target.closest("a")) return;

      toggleCompliment();
    });

    // Allow keyboard interaction for non-button flower elements.
    if (flower.tagName !== "BUTTON") {
      flower.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggleCompliment();
        }
      });
    }
  });

  // ==========================================
  // 7. HAPPY-MESSAGE JAR
  // ==========================================

  const messages = [
    "You make the world a little softer just by being in it. 🌷",
    "You do not have to be perfect to be wonderful. 💗",
    "Tiny steps still count. Be proud of yourself. ✨",
    "You deserve a friendship that feels safe and sunny. ☀️",
    "Rest is allowed. You are enough, even on quiet days. 🌸",
    "Your future has so many lovely little possibilities. 🦋",
    "Somewhere, someone is smiling because of you. 💌",
    "You are more loved and appreciated than you know. 🌹"
  ];

  const drawButton = $("#drawMessage");
  const jarMessage = $("#jarMessage");
  const jarEmoji = $("#jarEmoji");

  if (drawButton && jarMessage) {
    drawButton.addEventListener("click", () => {
      let pick;

      do {
        pick = messages[Math.floor(Math.random() * messages.length)];
      } while (
        messages.length > 1 &&
        pick === jarMessage.textContent
      );

      jarMessage.textContent = pick;

      if (jarEmoji) {
        jarEmoji.textContent = ["🫙", "💌", "🌷", "💗"][
          Math.floor(Math.random() * 4)
        ];
      }
    });
  }

  // ==========================================
  // 8. FINAL SURPRISE MODAL
  // ==========================================

  const finalScreen = $("#finalSurprise");
  const openFinalButton = $("#finalSurpriseButton");
  const closeFinalButton = $("#closeFinal");

  function openFinalSurprise() {
    if (!finalScreen) return;

    finalScreen.classList.add("show");
    finalScreen.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    if (closeFinalButton) closeFinalButton.focus();
  }

  function closeFinalSurprise() {
    if (!finalScreen) return;

    finalScreen.classList.remove("show");
    finalScreen.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (openFinalButton) {
      openFinalButton.focus({ preventScroll: true });
    }
  }

  if (openFinalButton) {
    openFinalButton.addEventListener("click", openFinalSurprise);
  }

  if (closeFinalButton) {
    closeFinalButton.addEventListener("click", closeFinalSurprise);
  }

  document.addEventListener("keydown", event => {
    if (
      event.key === "Escape" &&
      finalScreen &&
      finalScreen.classList.contains("show")
    ) {
      closeFinalSurprise();
    }
  });

  // ==========================================
  // 9. SORRY BUTTON AND APOLOGY MESSAGE
  // ==========================================

  const sorryButton = $("#sorryButton");
  const apologyMessage = $("#apologyMessage") || $("#sorryNote");

  if (sorryButton && apologyMessage) {
    sorryButton.setAttribute("aria-expanded", "false");

    sorryButton.addEventListener("click", event => {
      event.preventDefault();

      apologyMessage.hidden = false;
      apologyMessage.style.display = "block";
      apologyMessage.style.visibility = "visible";
      apologyMessage.style.opacity = "1";

      sorryButton.setAttribute("aria-expanded", "true");

      apologyMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    });
  }

  // ==========================================
  // 10. NAVIGATION LINKS
  // ==========================================

  $$(".garden-nav a").forEach(link => {
    link.addEventListener("click", event => {
      const href = link.getAttribute("href");

      if (!href || !href.startsWith("#")) return;

      let target;

      try {
        target = $(href);
      } catch {
        return;
      }

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        history.replaceState(null, "", href);
      }
    });
  });

  console.log("🌷 A Little Garden of Love initialized successfully.");
});
