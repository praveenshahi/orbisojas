/* ============================================================
   ORBISOJAS — Motion System
   "Everything enters from depth — opacity 0→1, translateY"
   No bounce. No side-slide. No rotation. No loop except pulse.
   ============================================================ */
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* Word-reveal splitter, descent meter, lazy load, nav toggle:
   moved to shared/js/core.js (loaded before this file). */
(function() {
  var fill = document.querySelector('.descent-fill');
  if (!fill) return;
  window.addEventListener('scroll', function() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (h > 0) fill.style.height = (window.scrollY / h * 100) + '%';
  }, { passive: true });
})();

/* --- Nav scroll state --- */
ScrollTrigger.create({
  start: 60,
  onUpdate: function(self) {
    document.querySelector('.nav').classList.toggle('nav--scrolled', self.scroll() > 60);
  }
});

/* --- Mobile nav toggle --- */
(function() {
  var btn = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (!btn || !links) return;
  btn.addEventListener('click', function() {
    links.classList.toggle('open');
    btn.setAttribute('aria-expanded', links.classList.contains('open'));
  });
  links.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() { links.classList.remove('open'); });
  });
})();

/* --- Smooth anchor links --- */
document.querySelectorAll('a[href^="#"]').forEach(function(link) {
  link.addEventListener('click', function(e) {
    var t = document.querySelector(this.getAttribute('href'));
    if (t) {
      e.preventDefault();
      gsap.to(window, { scrollTo: { y: t, offsetY: 56 }, duration: 1.2, ease: 'power3.inOut' });
    }
  });
});

/* ============================================================
   UTILITY — Animated counter
   Counts from 0 to data-target, formatting with commas
   ============================================================ */
function animateCounter(el, duration) {
  var target = parseInt(el.getAttribute('data-target'), 10);
  if (!target) return;
  var start = 0;
  var startTime = null;
  function step(ts) {
    if (!startTime) startTime = ts;
    var progress = Math.min((ts - startTime) / (duration || 2000), 1);
    var eased = 1 - Math.pow(1 - progress, 3);
    var current = Math.floor(eased * target);
    el.textContent = current.toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ============================================================
   SCENE 01 — THE BOY
   Fade from deep. Slow. Intimate. Notification pops.
   ============================================================ */
(function() {
  var tl = gsap.timeline({
    scrollTrigger: { trigger: window.JOURNEY_ROOT, start: 'top 80%', once: true }
  });

  tl.to((window.JOURNEY_ROOT+' .scene-panel'), { opacity: 1, duration: 1.2, ease: 'power2.out' })
    .from((window.JOURNEY_ROOT+' .scene-num'), { opacity: 0, y: 16, duration: 0.8, ease: 'power2.out' }, '-=0.6')
    .from((window.JOURNEY_ROOT+' .scene-title'), { opacity: 0, y: 16, duration: 0.8, ease: 'power2.out' }, '-=0.4');

  ScrollTrigger.create({
    trigger: window.JOURNEY_ROOT,
    start: 'top 60%',
    once: true,
    onEnter: function() {
      gsap.to((window.JOURNEY_ROOT+' .scene-lead .word'), {
        opacity: 1, y: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: 'power2.out'
      });
    }
  });

  gsap.utils.toArray((window.JOURNEY_ROOT+' .scene-whisper')).forEach(function(el, i) {
    gsap.from(el, {
      opacity: 0, y: 12,
      duration: 1,
      delay: 0.3 * i,
      ease: 'power2.out',
      scrollTrigger: { trigger: window.JOURNEY_ROOT, start: 'top 45%', once: true }
    });
  });

  // Floating tags — pop in with notification style + ping dots
  gsap.utils.toArray('.ftag').forEach(function(tag, i) {
    ScrollTrigger.create({
      trigger: window.JOURNEY_ROOT,
      start: 'top 70%',
      once: true,
      onEnter: function() {
        gsap.delayedCall(1.5 + i * 0.35, function() {
          tag.classList.add('pop-in');
          var ping = tag.querySelector('.ftag-ping');
          if (ping) {
            gsap.delayedCall(0.4, function() { ping.classList.add('active'); });
          }
          // Gentle drift after pop
          gsap.delayedCall(0.5, function() {
            gsap.to(tag, {
              y: '-=5',
              duration: 3 + Math.random() * 2,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              delay: Math.random()
            });
          });
        });
      }
    });
  });

  // Clock
  gsap.to('.clock-label', {
    opacity: 0.7,
    duration: 2,
    delay: 3,
    ease: 'power2.out',
    scrollTrigger: { trigger: window.JOURNEY_ROOT, start: 'top 50%', once: true },
    onComplete: function() {
      gsap.to('.clock-label', {
        opacity: 0.3,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  });

  // Scroll hint
  gsap.to('.scroll-hint', {
    opacity: 1,
    duration: 1.5,
    delay: 3,
    ease: 'power2.out'
  });
  window.addEventListener('scroll', function handler() {
    if (window.scrollY > 80) {
      gsap.to('.scroll-hint', { opacity: 0, duration: 0.6 });
      window.removeEventListener('scroll', handler);
    }
  });
})();

/* ============================================================
   SCENE 02 — THE SYSTEM
   Metric cards with live counters, gauge, typewriter, hearts
   ============================================================ */
(function() {
  var tl = gsap.timeline({
    scrollTrigger: { trigger: '#system', start: 'top 70%', once: true }
  });

  tl.to('#system .scene-panel', { opacity: 1, duration: 1.2, ease: 'power2.out' })
    .from('#system .scene-num', { opacity: 0, y: 16, duration: 0.8, ease: 'power2.out' }, '-=0.6')
    .from('#system .scene-title', { opacity: 0, y: 16, duration: 0.8, ease: 'power2.out' }, '-=0.4');

  ScrollTrigger.create({
    trigger: '#system',
    start: 'top 55%',
    once: true,
    onEnter: function() {
      gsap.to('#system .scene-lead .word', {
        opacity: 1, y: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: 'power2.out'
      });
    }
  });

  gsap.utils.toArray('#system .scene-whisper').forEach(function(el, i) {
    gsap.from(el, {
      opacity: 0, y: 12,
      duration: 1,
      delay: 0.3 * i,
      ease: 'power2.out',
      scrollTrigger: { trigger: '#system', start: 'top 45%', once: true }
    });
  });

  // Metric cards — staggered from depth
  gsap.utils.toArray('.metric-card').forEach(function(card, i) {
    gsap.fromTo(card,
      { opacity: 0, y: 16 },
      {
        opacity: 1, y: 0,
        duration: 0.7,
        delay: i * 0.07,
        ease: 'power2.out',
        scrollTrigger: { trigger: '#system .metric-grid', start: 'top 80%', once: true }
      }
    );
  });

  // --- Micro-interactions triggered on scroll ---
  ScrollTrigger.create({
    trigger: '#system .metric-grid',
    start: 'top 75%',
    once: true,
    onEnter: function() {
      // Counters tick up
      document.querySelectorAll('.mc-counter').forEach(function(el) {
        gsap.delayedCall(0.5, function() { animateCounter(el, 2200); });
      });

      // Money counter
      var moneyEl = document.querySelector('.mc-money');
      if (moneyEl) {
        gsap.delayedCall(0.8, function() {
          var target = 42750;
          var startTime = null;
          function step(ts) {
            if (!startTime) startTime = ts;
            var progress = Math.min((ts - startTime) / 2500, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            moneyEl.textContent = '$' + Math.floor(eased * target).toLocaleString();
            if (progress < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        });
      }

      // Gauge fill
      var gaugeFill = document.querySelector('.mc-gauge-fill');
      if (gaugeFill) gsap.delayedCall(0.6, function() { gaugeFill.classList.add('animate'); });

      // Badge pop
      document.querySelectorAll('.mc-badge').forEach(function(b) {
        gsap.delayedCall(1.2, function() { b.classList.add('active'); });
      });

      // Heart pop on likes card
      var heartIcon = document.querySelector('.mc-likes .mc-icon--pop');
      if (heartIcon) {
        gsap.delayedCall(1, function() { heartIcon.classList.add('pop'); });
      }

      // Floating mini hearts
      var heartsContainer = document.querySelector('.mc-hearts');
      if (heartsContainer) {
        gsap.delayedCall(1.2, function() {
          for (var h = 0; h < 5; h++) {
            (function(delay) {
              gsap.delayedCall(delay * 0.3, function() {
                var heart = document.createElement('span');
                heart.className = 'mc-mini-heart';
                heart.textContent = '♥';
                heart.style.left = (15 + Math.random() * 50) + '%';
                heart.style.bottom = '5px';
                heartsContainer.appendChild(heart);
                gsap.delayedCall(1.5, function() { if (heart.parentNode) heart.parentNode.removeChild(heart); });
              });
            })(h);
          }
        });
      }

      // Trophy shake
      var trophy = document.querySelector('.mc-icon--trophy');
      if (trophy) gsap.delayedCall(1.5, function() { trophy.classList.add('shake'); });

      // Bar fill (never enough loop)
      document.querySelectorAll('.mc-bar-fill').forEach(function(b) {
        gsap.delayedCall(0.8, function() { b.classList.add('animate'); });
      });

      // Keep up pulse
      var keepup = document.querySelector('.mc-keepup');
      if (keepup) gsap.delayedCall(1.5, function() { keepup.classList.add('pulse'); });

      // Typewriter: WORK. EARN. REPEAT.
      var typeEl = document.querySelector('.mc-type-text');
      if (typeEl) {
        var phrases = ['WORK.', 'EARN.', 'REPEAT.', 'WORK.', 'EARN.', 'REPEAT.'];
        var phraseIdx = 0;
        var charIdx = 0;
        var current = '';
        function typeNext() {
          if (phraseIdx >= phrases.length) {
            typeEl.textContent = 'WORK. EARN. REPEAT.';
            return;
          }
          var phrase = phrases[phraseIdx];
          if (charIdx < phrase.length) {
            current += phrase[charIdx];
            typeEl.textContent = current;
            charIdx++;
            setTimeout(typeNext, 80);
          } else {
            current += ' ';
            typeEl.textContent = current;
            phraseIdx++;
            charIdx = 0;
            setTimeout(typeNext, 300);
          }
        }
        gsap.delayedCall(1, typeNext);
      }
    }
  });
})();

/* ============================================================
   SCENE 03 — THE TRUTH
   Columns emerge. Layer items activate one by one with pulse.
   ============================================================ */
(function() {
  var tl = gsap.timeline({
    scrollTrigger: { trigger: '#truth', start: 'top 70%', once: true }
  });

  tl.to('#truth .scene-panel', { opacity: 1, duration: 1.2, ease: 'power2.out' })
    .from('#truth .scene-num', { opacity: 0, y: 16, duration: 0.8, ease: 'power2.out' }, '-=0.6')
    .from('#truth .scene-title', { opacity: 0, y: 16, duration: 0.8, ease: 'power2.out' }, '-=0.4');

  ScrollTrigger.create({
    trigger: '#truth',
    start: 'top 55%',
    once: true,
    onEnter: function() {
      gsap.to('#truth .scene-lead .word', {
        opacity: 1, y: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: 'power2.out'
      });
    }
  });

  gsap.utils.toArray('.truth-col').forEach(function(col, i) {
    gsap.fromTo(col,
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0,
        duration: 1,
        delay: i * 0.25,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.truth-columns', start: 'top 80%', once: true }
      }
    );
  });

  gsap.utils.toArray('.truth-col').forEach(function(col) {
    gsap.from(col.querySelectorAll('li'), {
      opacity: 0, y: 8,
      duration: 0.5,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: { trigger: col, start: 'top 70%', once: true }
    });
  });

  // Layers diagram — fade in
  gsap.fromTo('.layers-diagram',
    { opacity: 0, y: 16 },
    {
      opacity: 1, y: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.layers-diagram', start: 'top 85%', once: true }
    }
  );

  // Layer items — emerge from depth, then activate with pulse one by one
  var layerItems = gsap.utils.toArray('.layer-item');
  layerItems.forEach(function(item, i) {
    gsap.fromTo(item,
      { opacity: 0, y: 10 },
      {
        opacity: 1, y: 0,
        duration: 0.7,
        delay: 0.5 + i * 0.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.layers-diagram', start: 'top 85%', once: true },
        onComplete: function() {
          gsap.delayedCall(0.3, function() {
            item.classList.add('active');
            // Deactivate after a moment, then cascade to next
            gsap.delayedCall(1.5, function() {
              item.classList.remove('active');
            });
          });
        }
      }
    );
  });

  // After all activate individually, light them all up together
  ScrollTrigger.create({
    trigger: '.layers-diagram',
    start: 'top 60%',
    once: true,
    onEnter: function() {
      gsap.delayedCall(4, function() {
        layerItems.forEach(function(item) { item.classList.add('active'); });
      });
    }
  });
})();

/* ============================================================
   SCENE 04 — THE JOURNEY
   Character select: stages light up sequentially
   ============================================================ */
(function() {
  var tl = gsap.timeline({
    scrollTrigger: { trigger: '#journey', start: 'top 70%', once: true }
  });

  tl.to('#journey .scene-panel', { opacity: 1, duration: 1.2, ease: 'power2.out' })
    .from('#journey .scene-num', { opacity: 0, y: 16, duration: 0.8, ease: 'power2.out' }, '-=0.6')
    .from('#journey .scene-title', { opacity: 0, y: 16, duration: 0.8, ease: 'power2.out' }, '-=0.4');

  ScrollTrigger.create({
    trigger: '#journey',
    start: 'top 55%',
    once: true,
    onEnter: function() {
      gsap.to('#journey .scene-lead .word', {
        opacity: 1, y: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: 'power2.out'
      });
    }
  });

  // Journey line
  ScrollTrigger.create({
    trigger: '.journey-path',
    start: 'top 80%',
    once: true,
    onEnter: function() {
      document.querySelector('.journey-path').style.setProperty('--line-opacity', '0.3');
    }
  });

  // Stages — emerge from depth, then light up sequentially
  var stages = gsap.utils.toArray('.jp-stage');
  stages.forEach(function(stage, i) {
    gsap.fromTo(stage,
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0,
        duration: 0.9,
        delay: 0.3 + i * 0.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.journey-path', start: 'top 80%', once: true },
        onComplete: function() {
          gsap.delayedCall(0.5 + i * 0.4, function() {
            stage.classList.add('lit');
          });
        }
      }
    );
  });

  // Connectors
  gsap.utils.toArray('.jp-connector').forEach(function(c, i) {
    gsap.fromTo(c,
      { opacity: 0 },
      {
        opacity: 0.5,
        duration: 0.6,
        delay: 0.5 + i * 0.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.journey-path', start: 'top 80%', once: true }
      }
    );
  });

  // CTA
  gsap.fromTo('.journey-cta',
    { opacity: 0, y: 20 },
    {
      opacity: 1, y: 0,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.journey-cta', start: 'top 90%', once: true }
    }
  );
})();

/* ============================================================
   GLOBAL — Parallax drift (desktop only)
   ============================================================ */
if (window.innerWidth > 900) {
  gsap.utils.toArray('.scene').forEach(function(section) {
    gsap.fromTo(section,
      { backgroundPositionY: '35%' },
      {
        backgroundPositionY: '65%',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2
        }
      }
    );
  });
}
