
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // ==========================================
  // HELPERS
  // ==========================================

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    Array.from(parent.querySelectorAll(selector));

  function showElement(element) {
    if (element) element.hidden = false;
  }

  function hideElement(element) {
    if (element) element.hidden = true;
  }

  function randomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  // ==========================================
  // 1. PASSWORD GATE
  // Password: rosebud
  // ==========================================

  const passwordGate = $("#passwordGate");
  const passwordForm = $("#passwordForm");
  const passwordInput = $("#sitePassword");
  const gateError = $("#gateError");
  const app = $("#app");

  function unlockGarden() {
    if (passwordGate) passwordGate.style.display = "none";

    if (app) {
      app.style.display = "";
      app.classList.add("garden-unlocked");
    }

    document.body.classList.add("unlocked");

    // Redraw scratch coatings after the page becomes visible.
    window.dispatchEvent(new Event("resize"));
  }

  if (passwordGate) {
    if (app) app.style.display = "none";

    if (passwordForm) {
      passwordForm.addEventListener("submit", event => {
        event.preventDefault();

        const password = passwordInput
          ? passwordInput.value.trim()
          : "";

        if (password === "rosebud") {
          if (gateError) gateError.textContent = "";
          unlockGarden();
        } else {
          if (gateError) {
            gateError.textContent =
              "That isn't the password. Try again, lovely. 🌷";
          }

          if (passwordInput) {
            passwordInput.value = "";
            passwordInput.focus();
          }
        }
      });
    }
  } else if (app) {
    app.style.display = "";
  }

  // ==========================================
  // 2. FALLING PETALS
  // ==========================================

  const petalsContainer = $("#petals");

  function createPetal() {
    if (!petalsContainer) return;

    const petal = document.createElement("span");
    const symbols = ["🌸", "🌷", "🌹", "💗", "✿"];

    petal.className = "petal";
    petal.textContent = randomItem(symbols);

    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = 6 + Math.random() * 8 + "s";
    petal.style.animationDelay = Math.random() * 2 + "s";
    petal.style.fontSize = 12 + Math.random() * 16 + "px";
    petal.style.opacity = String(0.4 + Math.random() * 0.6);

    petalsContainer.appendChild(petal);

    const duration = parseFloat(petal.style.animationDuration) || 10;

    window.setTimeout(() => petal.remove(), (duration + 3) * 1000);
  }

  let petalInterval = null;

  function startPetals() {
    if (!petalsContainer || petalInterval) return;

    for (let i = 0; i < 12; i++) {
      window.setTimeout(createPetal, i * 180);
    }

    petalInterval = window.setInterval(createPetal, 850);
  }

  startPetals();

  // ==========================================
  // 3. REVEAL LETTER
  // ==========================================

  const revealButton = $("#revealBtn");
  const letterText = $("#letterText");
  const revealPrompt = $("#revealPrompt");

  if (revealButton && letterText) {
    revealButton.addEventListener("click", () => {
      const isVisible = letterText.style.display !== "none";

      if (isVisible) {
        letterText.style.display = "none";
        revealButton.textContent = "Open My Letter 💌";
      } else {
        letterText.style.display = "block";
        letterText.classList.remove("hidden-letter");
        letterText.classList.add("letter-open");
        revealButton.textContent = "Close My Letter ♡";

        if (revealPrompt) {
          revealPrompt.textContent =
            "A little message, written especially for you. 💗";
        }

        letterText.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }
    });
  }

  // ==========================================
  // 4. ROSE SHOWER
  // ==========================================

  const petalButton = $("#petalBtn");
  const photoSurprise = $("#photoSurprise");

  function launchRoseShower() {
    const symbols = ["🌹", "🌸", "🌷", "💗", "💐", "✨"];
    const count = 45;

    for (let i = 0; i < count; i++) {
      const rose = document.createElement("span");

      rose.textContent = randomItem(symbols);

      Object.assign(rose.style, {
        position: "fixed",
        zIndex: "9999",
        top: "-45px",
        left: Math.random() * 100 + "vw",
        fontSize: 18 + Math.random() * 20 + "px",
        pointerEvents: "none",
        willChange: "transform",
        transition: "transform 3s ease-in, opacity 3s ease-in",
        opacity: "1"
      });

      document.body.appendChild(rose);

      const drift = (Math.random() - 0.5) * 240;
      const fallTime = 2200 + Math.random() * 2200;

      window.setTimeout(() => {
        rose.style.transform =
          `translate(${drift}px, ${window.innerHeight + 100}px) rotate(${Math.random() * 700}deg)`;
        rose.style.opacity = "0";
      }, 50 + Math.random() * 300);

      window.setTimeout(() => rose.remove(), fallTime + 500);
    }

    if (photoSurprise) {
      photoSurprise.style.display = "block";
      photoSurprise.classList.add("surprise-visible");

      photoSurprise.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }

  if (petalButton) {
    petalButton.addEventListener("click", launchRoseShower);
  }

  // ==========================================
  // 5. ENVELOPE AND TYPING LETTER
  // ==========================================

  const envelopeButton = $("#envelopeButton");
  const typedLetter = $("#typedLetter");
  const envelopeHint = $("#envelopeHint");

  const envelopeMessage =
    "Dear Radhimaa, 💗\n\n" +
    "I hope you always remember how special you are. " +
    "May your days be filled with smiles, your heart with " +
    "peace, and your life with beautiful memories.\n\n" +
    "Whenever you need a little happiness, remember that " +
    "you deserve kindness, laughter, and all the lovely " +
    "things this world has to offer. 🌷\n\n" +
    "Keep blooming, keep smiling, and always be yourself.\n\n" +
    "Sending you a little hug. 🫂\n\n" +
    "With love ♡";

  let typingTimer = null;
  let envelopeOpen = false;

  function stopTyping() {
    if (typingTimer !== null) {
      window.clearTimeout(typingTimer);
      typingTimer = null;
    }
  }

  function typeMessage(message, element, index = 0) {
    if (!element) return;

    if (index === 0) element.textContent = "";

    if (index >= message.length) {
      typingTimer = null;
      return;
    }

    element.textContent += message[index];

    const delay = message[index] === "\n" ? 140 : 32;

    typingTimer = window.setTimeout(() => {
      typeMessage(message, element, index + 1);
    }, delay);
  }

  if (envelopeButton) {
    envelopeButton.addEventListener("click", () => {
      envelopeOpen = !envelopeOpen;

      envelopeButton.classList.toggle("open", envelopeOpen);
      envelopeButton.setAttribute(
        "aria-expanded",
        String(envelopeOpen)
      );

      if (envelopeHint) {
        envelopeHint.textContent = envelopeOpen
          ? "A little message, just for you ♡"
          : "The letter is tucked safely inside ♡";
      }

      if (typedLetter) {
        if (envelopeOpen) {
          typedLetter.style.display = "block";
          typedLetter.classList.add("typed-letter-open");

          stopTyping();
          typeMessage(envelopeMessage, typedLetter);

          typedLetter.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        } else {
          stopTyping();
          typedLetter.textContent = "";
          typedLetter.style.display = "none";
          typedLetter.classList.remove("typed-letter-open");
        }
      }
    });
  }

  // ==========================================
  // 6. PICK A FLOWER, FIND A COMPLIMENT
  // ==========================================

  $$(".bloom").forEach((flower, index) => {
    let compliment = $("small", flower);

    // Supply a fallback if a flower has no compliment.
    if (!compliment) {
      compliment = document.createElement("small");

      const compliments = [
        "You have a beautiful heart. 🌷",
        "Your smile makes the world brighter. ☀️",
        "You deserve all the happiness in the world. 💗",
        "You make ordinary moments feel special. ✨",
        "Your kindness is a beautiful gift. 🌸",
        "You are wonderfully unique. 🦋",
        "Keep blooming at your own pace. 🌻",
        "You deserve so many beautiful memories. 💐"
      ];

      compliment.textContent =
        compliments[index % compliments.length];

      flower.appendChild(compliment);
    }

    compliment.hidden = true;

    flower.addEventListener("click", () => {
      const wasOpen = !compliment.hidden;

      // Close the other flowers' compliments.
      $$(".bloom").forEach(otherFlower => {
        const otherText = $("small", otherFlower);

        if (otherText) {
          otherText.hidden = true;
          otherFlower.classList.remove("bloom-open");
        }

        otherFlower.setAttribute("aria-expanded", "false");
      });

      // Toggle the selected compliment.
      if (!wasOpen) {
        compliment.hidden = false;
        flower.classList.add("bloom-open");
        flower.setAttribute("aria-expanded", "true");
      }
    });

    flower.setAttribute("aria-expanded", "false");
  });

  // ==========================================
  // 7. HAPPY JAR
  // ==========================================

  const drawMessageButton = $("#drawMessage");
  const jarMessage = $("#jarMessage");
  const jarEmoji = $("#jarEmoji");

  const happyMessages = [
    "You are more appreciated than you realise. 💗",
    "You deserve a day filled with little joys. 🌸",
    "Take a breath. You are doing better than you think. 🦋",
    "Your smile is a little bit of sunshine. ☀️",
    "You don't have to be perfect to be wonderful. 🌷",
    "Good things take time. Keep believing in yourself. 🌱",
    "You are allowed to rest and begin again tomorrow. 💕",
    "Your kindness makes a difference, even when you don't see it. 🌹",
    "Some of the best memories are still waiting for you. ✨",
    "You deserve friendship that feels safe, warm, and genuine. 💐",
    "Never forget to celebrate your own little victories. 🎀",
    "The world is more beautiful with your unique light in it. 🌻",
    "A difficult moment does not define your whole story. 💖",
    "Be gentle with yourself. You are growing every day. 🌿",
    "Sending you a virtual hug whenever you need one. 🫂"
  ];

  if (drawMessageButton && jarMessage) {
    drawMessageButton.addEventListener("click", () => {
      let message = randomItem(happyMessages);

      if (
        happyMessages.length > 1 &&
        message === jarMessage.textContent
      ) {
        message = happyMessages.find(
          item => item !== jarMessage.textContent
        ) || message;
      }

      jarMessage.classList.remove("jar-pop");

      // Restart the animation.
      void jarMessage.offsetWidth;

      jarMessage.textContent = message;
      jarMessage.classList.add("jar-pop");

      if (jarEmoji) {
        jarEmoji.textContent = randomItem([
          "🫙", "💗", "🌷", "🌸", "💐", "🦋"
        ]);
      }
    });
  }

  // ==========================================
  // 8. APOLOGY MESSAGE
  // ==========================================

  const sorryButton = $("#sorryButton");
  const apologyMessage = $("#apologyMessage");

  if (sorryButton && apologyMessage) {
    apologyMessage.hidden = true;

    sorryButton.setAttribute("aria-expanded", "false");

    sorryButton.addEventListener("click", () => {
      const isOpening = apologyMessage.hidden;

      apologyMessage.hidden = !isOpening;
      apologyMessage.style.display = isOpening ? "block" : "none";

      sorryButton.setAttribute(
        "aria-expanded",
        String(isOpening)
      );

      sorryButton.textContent = isOpening
        ? "Close My Little Message ♡"
        : "Open My Little Message 💌";

      if (isOpening) {
        apologyMessage.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }
    });
  }

  // ==========================================
  // 9. FINAL SURPRISE
  // ==========================================

  const finalSurpriseButton = $("#finalSurpriseButton");
  const finalSurprise = $("#finalSurprise");
  const closeFinal = $("#closeFinal");

  let previouslyFocusedElement = null;

  function openFinalSurprise() {
    if (!finalSurprise) return;

    previouslyFocusedElement = document.activeElement;

    finalSurprise.classList.add("show");
    finalSurprise.style.display = "flex";
    finalSurprise.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

    if (closeFinal) closeFinal.focus();
  }

  function closeFinalSurprise() {
    if (!finalSurprise) return;

    finalSurprise.classList.remove("show");
    finalSurprise.style.display = "none";
    finalSurprise.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");

    if (
      previouslyFocusedElement &&
      typeof previouslyFocusedElement.focus === "function"
    ) {
      previouslyFocusedElement.focus();
    }
  }

  if (finalSurprise) {
    finalSurprise.style.display = "none";
    finalSurprise.setAttribute("aria-hidden", "true");
  }

  if (finalSurpriseButton) {
    finalSurpriseButton.addEventListener(
      "click",
      openFinalSurprise
    );
  }

  if (closeFinal) {
    closeFinal.addEventListener(
      "click",
      closeFinalSurprise
    );
  }

  if (finalSurprise) {
    finalSurprise.addEventListener("click", event => {
      if (event.target === finalSurprise) {
        closeFinalSurprise();
      }
    });
  }

  document.addEventListener("keydown", event => {
    if (
      event.key === "Escape" &&
      finalSurprise &&
      finalSurprise.classList.contains("show")
    ) {
      closeFinalSurprise();
    }
  });

  // ==========================================
  // 10. SCRATCH-TO-REVEAL PHOTO CARDS
  // ==========================================

  $$(".scratch-card").forEach(card => {
    const canvas = $(".scratch-overlay", card);
    const hint = $(".scratch-hint", card);

    if (!canvas || typeof canvas.getContext !== "function") {
      console.error("Scratch card canvas is missing.", card);
      return;
    }

    const ctx = canvas.getContext("2d", {
      willReadFrequently: true
    });

    if (!ctx) {
      console.error("Could not initialise scratch canvas.", card);
      return;
    }

    let scratching = false;
    let revealed = false;
    let lastPoint = null;
    let resizeObserver = null;

    // Keep the canvas on top of the image and make it visible.
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = "5";
    canvas.style.opacity = "1";
    canvas.style.visibility = "visible";
    canvas.style.pointerEvents = "auto";
    canvas.style.touchAction = "none";

    if (hint) {
      hint.style.pointerEvents = "none";
      hint.style.zIndex = "6";
    }

    function paintCover() {
      if (revealed) return;

      const rect = canvas.getBoundingClientRect();

      if (!rect.width || !rect.height) {
        requestAnimationFrame(paintCover);
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Pink and rose-gold coating.
      const gradient = ctx.createLinearGradient(
        0, 0, rect.width, rect.height
      );

      gradient.addColorStop(0, "#f9d8e3");
      gradient.addColorStop(0.45, "#d77f9c");
      gradient.addColorStop(1, "#994360");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Tiny decorative sparkles.
      for (let i = 0; i < 90; i++) {
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;

        ctx.beginPath();
        ctx.arc(x, y, Math.random() * 1.8 + 0.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.fill();
      }

      // Scratch instruction.
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#fffafc";
      ctx.font = "bold 17px Georgia";
      ctx.shadowColor = "rgba(70,15,40,0.5)";
      ctx.shadowBlur = 5;
      ctx.fillText(
        "♡ Scratch to reveal ♡",
        rect.width / 2,
        rect.height / 2
      );

      ctx.shadowBlur = 0;

      // Scratching removes the coating and exposes the photo.
      ctx.globalCompositeOperation = "destination-out";
    }

    function getPoint(event) {
      const rect = canvas.getBoundingClientRect();

      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    }

    function erase(point) {
      if (revealed) return;

      ctx.globalCompositeOperation = "destination-out";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = 38;

      if (!lastPoint) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 19, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
      }

      lastPoint = point;
    }

    function revealPhoto() {
      if (revealed) return;

      revealed = true;
      scratching = false;
      lastPoint = null;

      card.classList.add("scratched");

      canvas.style.transition = "opacity 0.5s ease";
      canvas.style.opacity = "0";
      canvas.style.pointerEvents = "none";

      if (hint) {
        hint.style.transition = "opacity 0.3s ease";
        hint.style.opacity = "0";
      }

      window.setTimeout(() => {
        canvas.style.display = "none";

        if (hint) hint.style.display = "none";

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (resizeObserver) resizeObserver.disconnect();
      }, 550);
    }

    function checkProgress() {
      if (revealed || !canvas.width || !canvas.height) return;

      try {
        const pixels = ctx.getImageData(
          0, 0, canvas.width, canvas.height
        ).data;

        const totalPixels = canvas.width * canvas.height;
        const step = 20;
        let sampled = 0;
        let transparent = 0;

        for (let pixel = 0; pixel < totalPixels; pixel += step) {
          sampled++;

          if (pixels[pixel * 4 + 3] < 100) {
            transparent++;
          }
        }

        if (sampled > 0 && transparent / sampled > 0.38) {
          revealPhoto();
        }
      } catch (error) {
        console.warn("Could not measure scratch progress.", error);
      }
    }

    canvas.addEventListener("pointerdown", event => {
      if (revealed) return;

      scratching = true;
      lastPoint = null;

      if (canvas.setPointerCapture) {
        try {
          canvas.setPointerCapture(event.pointerId);
        } catch (_) {
          // Continue scratching if pointer capture is unavailable.
        }
      }

      erase(getPoint(event));
      event.preventDefault();
    });

    canvas.addEventListener("pointermove", event => {
      if (!scratching || revealed) return;

      erase(getPoint(event));
      event.preventDefault();
    });

    function stopScratch() {
      if (!scratching) return;

      scratching = false;
      lastPoint = null;

      checkProgress();
    }

    canvas.addEventListener("pointerup", stopScratch);
    canvas.addEventListener("pointercancel", stopScratch);
    canvas.addEventListener("lostpointercapture", stopScratch);

    // Draw after layout is ready.
    requestAnimationFrame(paintCover);

    // Repaint if the page layout changes before scratching starts.
    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(() => {
        if (!revealed && !scratching) {
          paintCover();
        }
      });

      resizeObserver.observe(card);
    } else {
      window.addEventListener("resize", () => {
        if (!revealed && !scratching) paintCover();
      });
    }
  });

  // ==========================================
  // 11. PHOTO ERROR CHECK
  // ==========================================

  $$(".scratch-card img").forEach(img => {
    img.addEventListener("error", () => {
      console.error("Photo could not be loaded:", img.getAttribute("src"));
    });
  });

  // ==========================================
  // 12. FINISH
  // ==========================================

  console.log("🌷 A Little Garden of Love is ready!");
});
