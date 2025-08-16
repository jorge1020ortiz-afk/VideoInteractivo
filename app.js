const imgEl = document.getElementById('screen');
const btnWrap = document.getElementById('buttons');
const finalTextEl = document.getElementById('finalText');
const soundToggle = document.getElementById('soundToggle');
const countdownEl = document.getElementById('countdown');
const bgm = document.getElementById('bgm');

let current = 'start';
let soundOn = true;
let decisionTimeout;   // Timeout para reiniciar en pantallas de decisión
let countdownInterval; // Intervalo del contador

function ensureSound() {
  if (soundOn && bgm.paused) bgm.play();
}

soundToggle.addEventListener('click', () => {
  soundOn = !soundOn;
  bgm.muted = !soundOn;
  soundToggle.textContent = soundOn ? '🔈' : '🔇';
});

const IMAGES = {
  start: "assets/images/start.png",
  spec_tesla: "assets/images/spec_tesla.png",
  spec_hyundai: "assets/images/spec_hyundai.png",
  which_way: "assets/images/which_way.png",
  avoid_or_scenic: "assets/images/avoid_or_scenic.png",
  shortcut_or_safe: "assets/images/shortcut_or_safe.png",
  finish_message: "assets/images/finish_message.png",
  contact: "assets/images/contact.png"
};

const SCREENS = {
  start: {
    img: IMAGES.start,
    buttons: [
      { label: "TESLA", go: "spec_tesla" },
      { label: "HYUNDAI", go: "spec_hyundai" }
    ]
  },
  spec_tesla: {
    img: IMAGES.spec_tesla,
    buttons: [
      { label: "VER HYUNDAI", go: "spec_hyundai" },
      { label: "CONTINUAR", go: "which_way" }
    ]
  },
  spec_hyundai: {
    img: IMAGES.spec_hyundai,
    buttons: [
      { label: "VER TESLA", go: "spec_tesla" },
      { label: "CONTINUAR", go: "which_way" }
    ]
  },
  which_way: {
    img: IMAGES.which_way,
    buttons: [
      { label: "LEFT / IZQUIERDA", go: "avoid_or_scenic" },
      { label: "RIGHT / DERECHA", go: "avoid_or_scenic" }
    ]
  },
  avoid_or_scenic: {
    img: IMAGES.avoid_or_scenic,
    buttons: [
      { label: "AVOID TRAFFIC / EVADIR TRÁFICO", go: "shortcut_or_safe" },
      { label: "SCENIC ROUTE / RUTA PANORÁMICA", go: "shortcut_or_safe" }
    ]
  },
  shortcut_or_safe: {
    img: IMAGES.shortcut_or_safe,
    buttons: [
      { label: "SAFE ROUTE / RUTA SEGURA", go: "finish_message" },
      { label: "SHORTCUT / ATAJO", go: "finish_message" }
    ]
  },
  finish_message: {
    img: IMAGES.finish_message
  },
  contact: {
    img: IMAGES.contact,
    buttons: [
      { label: "REINICIAR", go: "start" }
    ]
  }
};

function startCountdown(seconds, onExpire) {
  clearInterval(countdownInterval);
  countdownEl.style.display = 'block';

  function updateDisplay() {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    countdownEl.textContent = `${min}:${sec}`;
  }

  updateDisplay();
  countdownInterval = setInterval(() => {
    seconds--;
    updateDisplay();
    if (seconds <= 0) {
      clearInterval(countdownInterval);
      countdownEl.style.display = 'none';
      onExpire();
    }
  }, 1000);
}

function render() {
  const s = SCREENS[current];
  if (!s) return;

  finalTextEl.style.display = 'none';
  countdownEl.style.display = 'none';
  imgEl.classList.remove('visible');

  clearTimeout(decisionTimeout);
  clearInterval(countdownInterval);

  setTimeout(() => {
    imgEl.src = s.img;
    btnWrap.innerHTML = '';

    const showImage = () => {
      imgEl.classList.add('visible');

      if (current === 'finish_message') {
        finalTextEl.style.display = 'block';
        finalTextEl.classList.add('animate');
        setTimeout(() => {
          current = 'contact';
          render();
        }, 3500);
      }

      // Si la pantalla tiene botones, activar cuenta regresiva de 2 min
      if (s.buttons && s.buttons.length > 0 && current !== 'contact') {
        startCountdown(120, () => {
          current = 'start';
          render();
        });
      }

      // En pantalla contact → timeout de 5s
      if (current === 'contact') {
        startCountdown(5, () => {
          current = 'start';
          render();
        });
      }
    };

    if (imgEl.complete) {
      showImage();
    } else {
      imgEl.onload = showImage;
    }

    (s.buttons || []).forEach(b => {
      const btn = document.createElement('button');
      btn.textContent = b.label;
      btn.addEventListener('click', () => {
        current = b.go;
        render();
        ensureSound();
      });
      btnWrap.appendChild(btn);
    });
  }, 200);
}

render();
