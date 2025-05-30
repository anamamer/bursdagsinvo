(() => {
    const settings = {
      count: 30,
      imageRatio: 0.5,
      images: [
        'img/background/taylor.png',
        'img/background/mariah.png',
        'img/background/hsm.png'
      ],
      emojis: ['🎤', '💃', '🔥', '🎶', '✨', '🌟'],
      prompts: [
        'Wiiii!',
        'Grab the Mic!',
        'Party All Night!',
        'Shake that!',
        'Voicecracks are allowed!',
        'Dancefloor On Fire!'
      ],
      size: { min: 80, max: 160 },
      dur: { min: 10, max: 20 },
      flicker: 2.5
    };
  
    const container    = document.getElementById('floating-container');
    const smsBtn       = document.getElementById('send-rsvp');
    const musicBtn     = document.getElementById('play-music');
    const audio        = document.getElementById('hamilton-audio');
    const countdownEl  = document.getElementById('countdown');
  
    window.addEventListener('DOMContentLoaded', () => {
      spawnAll();
      setupSMS();
      setupMusic();
      setupCountdown();
  
      // —— 1. Lag et fullscreen konfetti-canvas ——  
      const confettiCanvas = document.createElement('canvas');
      confettiCanvas.id = 'confetti-canvas';
      // Sett tegnebuffer lik innerWidth/Height
      confettiCanvas.width  = window.innerWidth;
      confettiCanvas.height = window.innerHeight;
      document.body.appendChild(confettiCanvas);
  
      // Inline-stil slik at det ligger foran alt
      Object.assign(confettiCanvas.style, {
        position:     'fixed',
        top:          '0',
        left:         '0',
        width:        '100%',
        height:       '100%',
        pointerEvents:'none',
        zIndex:       '9999',
        display:      'block'
      });
  
      // Hvis vinduet endrer størrelse, oppdater buffer-størrelse:
      window.addEventListener('resize', () => {
        confettiCanvas.width  = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
      });
  
      // —— 2. Init confetti uten worker ——  
      const myConfetti = confetti.create(confettiCanvas, {
        resize:      false,   // vi håndterer selv størrelsen
        useWorker:   false    // kjør på main thread for pålitelighet
      });
  
      // —— 3. Jevnlig konfetti-oppskyting ——  
      setInterval(() => {
        myConfetti({
          particleCount: 8,
          spread:        140,
          origin:        { x: Math.random(), y: 0 },
          gravity:       0.5
        });
      }, 300);
    });
  
    function spawnAll() {
      const frag = document.createDocumentFragment();
      for (let i = 0; i < settings.count; i++) 
        frag.appendChild(makeFloater());
      container.append(frag);
    }
  
    function makeFloater() {
      const el = document.createElement('div');
      el.className = 'floater';
  
      if (Math.random() < settings.imageRatio) {
        const img = new Image();
        img.src = settings.images[
          Math.floor(Math.random() * settings.images.length)
        ];
        img.width = settings.size.min +
          Math.random() * (settings.size.max - settings.size.min);
        el.append(img);
      } else {
        const span = document.createElement('span');
        span.textContent = settings.emojis[
          Math.floor(Math.random() * settings.emojis.length)
        ];
        el.append(span);
      }
  
      el.style.top               = `${Math.random() * 100}vh`;
      el.style.left              = `${Math.random() * 100}vw`;
      el.style.animationDuration = `${
        settings.dur.min +
        Math.random() * (settings.dur.max - settings.dur.min)
      }s`;
  
      return el;
    }
  
    function setupSMS() {
      smsBtn.addEventListener('click', () => {
        const navn = document.getElementById('navn').value.trim();
        if (!navn) return alert('Vennligst skriv inn navnet ditt 😊');
        window.location.href = `sms:40075061?body=${encodeURIComponent(
          `Hei! Jeg kommer 🎉 Navn: ${navn}`
        )}`;
      });
    }
  
    function setupMusic() {
      musicBtn.addEventListener('click', () =>
        audio.play().catch(() =>
          alert('Trykk én gang til for å aktivere lyd 🎶')
        )
      );
    }

    // —— Empirisk fade-in av tekst ——  
document.querySelectorAll(
    'h1, .panel, #countdown, .media-caption, .panel__label, .panel__text'
  ).forEach(el => el.classList.add('text-fade'));
  
  
    function setupCountdown() {
      const target = new Date("2025-07-01T00:00:00");
      const update = () => {
        const now  = new Date();
        const diff = target - now;
        if (diff <= 0) {
          countdownEl.textContent = "🎉 Det er bursdag i dag!!!";
          return;
        }
        const days  = Math.floor(diff / 86400000);
        const hours = Math.floor((diff / 3600000) % 24);
        const mins  = Math.floor((diff / 60000) % 60);
        const secs  = Math.floor((diff / 1000) % 60);
  
        countdownEl.textContent =
          `⏱️ ${days}d ${hours}t ${mins}m ${secs}s …til verdens kuleste dag`;
      };
      update();
      // —— Mer tilstedeværende, større konfetti ——  
        setInterval(() => {
            myConfetti({
            particleCount: 50,       // mange biter
            startVelocity: 45,       // kraftig oppskyting
            spread: 200,             // bred spredning
            ticks: 300,              // varer lenge
            scalar: 1.5,             // 50 % større
            gravity: 0.3,            // litt tyngre
            origin: { x: Math.random(), y: 0 },
            colors: [                // sterke, ugjennomsiktige farger
                '#FFD700', '#FF1493', '#00BFFF',
                '#7CFC00', '#FF4500', '#BA55D3'
            ]
            });
        }, 200);
  
    }
  
    // —— Sparkle rundt musa ——
    document.addEventListener('mousemove', (e) => {
      const sparkle = document.createElement('span');
      sparkle.className = 'sparkle';
      sparkle.textContent = '✨';
      sparkle.style.left = `${e.pageX}px`;
      sparkle.style.top  = `${e.pageY}px`;
      document.body.appendChild(sparkle);
      sparkle.addEventListener('animationend', () => sparkle.remove());
    });
  
  })();
  