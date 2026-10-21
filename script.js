// A Little Garden of Love — interactions
document.addEventListener('DOMContentLoaded', () => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Secret password gate. Change this value before sharing the site.
  const gardenPassword = 'rosebud';
  const passwordGate = $('#passwordGate');
  const passwordForm = $('#passwordForm');
  const passwordInput = $('#sitePassword');
  const passwordError = $('#gateError');

  passwordForm.addEventListener('submit', event => {
    event.preventDefault();
    if (passwordInput.value === gardenPassword) {
      passwordError.textContent = '';
      passwordGate.classList.add('unlocked');
      window.setTimeout(() => {
        const envelope = $('#little-envelope');
        if (envelope) {
          envelope.scrollIntoView({ behavior: 'smooth', block: 'center' });
          $('#envelopeButton')?.focus({ preventScroll: true });
        }
      }, 500);
    } else {
      passwordError.textContent = "Oops, that isn't the right password. Please try again. 💗";
      passwordInput.value = '';
      passwordInput.focus();
      passwordForm.animate(
        [{ transform: 'translateX(0)' }, { transform: 'translateX(-7px)' },
         { transform: 'translateX(7px)' }, { transform: 'translateX(0)' }],
        { duration: 260 }
      );
    }
  });

  // Falling petals.
  const petalLayer = $('#petals');
  const flowers = ['🌸', '🌹', '🌷', '✿', '❀', '♡'];
  for (let i = 0; i < 22; i++) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.textContent = flowers[Math.floor(Math.random() * flowers.length)];
    petal.style.setProperty('--x', Math.random() * 100 + '%');
    petal.style.setProperty('--size', (12 + Math.random() * 17) + 'px');
    petal.style.setProperty('--opacity', (0.28 + Math.random() * 0.5).toFixed(2));
    petal.style.setProperty('--duration', (12 + Math.random() * 17) + 's');
    petal.style.setProperty('--delay', (-Math.random() * 26) + 's');
    petalLayer.appendChild(petal);
  }

  // Original letter reveal.
  function showLetter() {
    $('#letterText').classList.add('show');
    $('#revealPrompt').style.display = 'none';
    $('#letter').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  $('#openLetter').addEventListener('click', showLetter);
  $('#revealBtn').addEventListener('click', showLetter);

  // Rose shower and photo reveal.
  let toastTimer;
  $('#petalBtn').addEventListener('click', () => {
    for (let i = 0; i < 30; i++) {
      const petal = document.createElement('span');
      petal.className = 'petal';
      petal.textContent = flowers[Math.floor(Math.random() * flowers.length)];
      petal.style.setProperty('--x', Math.random() * 100 + '%');
      petal.style.setProperty('--size', (16 + Math.random() * 20) + 'px');
      petal.style.setProperty('--opacity', '.85');
      petal.style.setProperty('--duration', (4 + Math.random() * 5) + 's');
      petal.style.setProperty('--delay', (Math.random() * 1.2) + 's');
      petalLayer.appendChild(petal);
      window.setTimeout(() => petal.remove(), 11000);
    }
    for (let i = 0; i < 18; i++) {
      const rose = document.createElement('span');
      rose.className = 'rose-burst';
      rose.textContent = ['🌹', '🌹', '💗', '🌸'][Math.floor(Math.random() * 4)];
      rose.style.setProperty('--dx', (Math.random() * 90 - 45) + 'vw');
      rose.style.setProperty('--dy', (Math.random() * 80 - 40) + 'vh');
      document.body.appendChild(rose);
      window.setTimeout(() => rose.remove(), 2000);
    }
    const photo = $('#photoSurprise');
    photo.classList.remove('show');
    void photo.offsetWidth;
    photo.classList.add('show');
    window.setTimeout(() => photo.scrollIntoView({ behavior: 'smooth', block: 'center' }), 250);
    const toast = $('#toast');
    toast.textContent = 'A rose shower just for you, Radhimaa 🌹';
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 3000);
  });

  // Animated envelope and typed note.
  const note = 'Hey Radhimaa, 🌷\n\nThis little garden is a reminder that you matter, your smile makes a difference, and you deserve gentle days, loud laughter, and beautiful surprises. Thank you for being you and for making friendship feel like a place to bloom.\n\nKeep blooming, okay? I am always cheering for you. 💗\n\nYour bestie, always ♡';
  let typingTimer;
  $('#envelopeButton').addEventListener('click', function () {
    this.classList.toggle('open');
    const isOpen = this.classList.contains('open');
    $('#envelopeHint').textContent = isOpen ? 'A note, written just for you 💌' : 'The letter is tucked safely inside ♡';
    const target = $('#typedLetter');
    window.clearInterval(typingTimer);
    target.textContent = '';
    if (isOpen) {
      let index = 0;
      typingTimer = window.setInterval(() => {
        target.textContent += note.charAt(index++);
        if (index >= note.length) window.clearInterval(typingTimer);
      }, 27);
    }
  });

  // Compliment flowers.
  $$('.bloom').forEach(button => {
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', () => {
      button.classList.toggle('bloomed');
      const message = $('small', button);
      message.hidden = !message.hidden;
      button.setAttribute('aria-expanded', String(!message.hidden));
    });
  });

  // Happy-message jar.
  const messages = [
    'You make the world a little softer just by being in it. 🌷',
    'You do not have to be perfect to be wonderful. 💗',
    'Tiny steps still count. Be proud of yourself. ✨',
    'You deserve a friendship that feels safe and sunny. ☀️',
    'Rest is allowed. You are enough, even on quiet days. 🌸',
    'Your future has so many lovely little possibilities. 🦋',
    'Somewhere, someone is smiling because of you. 💌',
    'You are more loved and appreciated than you know. 🌹'
  ];
  $('#drawMessage').addEventListener('click', () => {
    let pick = messages[Math.floor(Math.random() * messages.length)];
    if (messages.length > 1 && pick === $('#jarMessage').textContent) {
      pick = messages[(messages.indexOf(pick) + 1) % messages.length];
    }
    $('#jarMessage').textContent = pick;
    $('#jarEmoji').textContent = ['🫙', '💌', '🌷', '💗'][Math.floor(Math.random() * 4)];
  });

  // Final surprise modal.
  const finalScreen = $('#finalSurprise');
  $('#finalSurpriseButton').addEventListener('click', () => finalScreen.classList.add('show'));
  $('#closeFinal').addEventListener('click', () => {
    finalScreen.classList.remove('show');
    $('#openLetter').focus({ preventScroll: true });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && finalScreen.classList.contains('show')) {
      finalScreen.classList.remove('show');
    }
  });
});
