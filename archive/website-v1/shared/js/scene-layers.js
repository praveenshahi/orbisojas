/* ============================================================
   ORBISOJAS — Scene Layers
   Reusable parallax + canvas stars + amber particle drift.
   Auto-detects elements with [data-scene] and initializes layers.

   Usage:
     <section class="scene" data-scene="stars,particles,parallax">
       <canvas class="scene-stars"></canvas>
       <canvas class="scene-particles"></canvas>
       ...content...
     </section>

   ============================================================ */
(function() {
  'use strict';
  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------------- PARALLAX ----------------
  // Sets --px / --py CSS variables on the section based on mouse position.
  function initParallax(section) {
    if (REDUCED || window.innerWidth < 769) return;
    section.addEventListener('mousemove', function(e) {
      var r = section.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      section.style.setProperty('--px', px.toFixed(3));
      section.style.setProperty('--py', py.toFixed(3));
    }, { passive: true });
  }

  // ---------------- STARS ----------------
  // Twinkling gold dots in the upper region of the canvas.
  function initStars(canvas, opts) {
    var ctx = canvas.getContext('2d');
    var stars = [];
    var COUNT = (opts && opts.count) || 120;
    function resize() {
      var rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      stars = [];
      for (var i = 0; i < COUNT; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.7,
          r: 0.4 + Math.random() * 1.2,
          a: 0.2 + Math.random() * 0.8,
          dir: Math.random() < 0.5 ? -1 : 1,
          speed: 0.003 + Math.random() * 0.008
        });
      }
    }
    resize();
    window.addEventListener('resize', resize);

    if (REDUCED) {
      // Draw once, no animation
      drawFrame();
      return;
    }

    function drawFrame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        s.a += s.dir * s.speed;
        if (s.a > 1) { s.a = 1; s.dir = -1; }
        if (s.a < 0.1) { s.a = 0.1; s.dir = 1; }
        ctx.globalAlpha = s.a;
        ctx.fillStyle = '#E8B547';
        ctx.shadowColor = '#C08A2C';
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      requestAnimationFrame(drawFrame);
    }
    requestAnimationFrame(drawFrame);
  }

  // ---------------- PARTICLES (amber dust drifting up) ----------------
  function initParticles(canvas, opts) {
    var ctx = canvas.getContext('2d');
    var particles = [];
    var SPAWN_RATE = (opts && opts.rate) || 0.6;   // 0-1 per frame
    var MAX = (opts && opts.max) || 80;

    function resize() {
      var rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    }
    resize();
    window.addEventListener('resize', resize);

    if (REDUCED) return;

    function spawn() {
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 4,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(0.4 + Math.random() * 0.8),
        life: 1,
        size: 0.6 + Math.random() * 1.5,
        hue: Math.random() < 0.3 ? '#F4D77A' : '#C08A2C'
      });
    }

    function drawFrame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (particles.length < MAX && Math.random() < SPAWN_RATE) spawn();
      for (var i = particles.length - 1; i >= 0; i--) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.004;
        if (p.life <= 0 || p.y < -10) {
          particles.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = p.life * 0.6;
        ctx.fillStyle = p.hue;
        ctx.shadowColor = p.hue;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      requestAnimationFrame(drawFrame);
    }
    requestAnimationFrame(drawFrame);
  }

  // ---------------- AUTO-INIT ----------------
  // Defer init until each section enters viewport (or immediately if no observer).
  function activate(section) {
    if (section.dataset.layersInit === '1') return;
    section.dataset.layersInit = '1';
    var layers = (section.dataset.scene || '').split(',').map(function(s) { return s.trim(); });
    if (layers.indexOf('parallax') !== -1) initParallax(section);
    if (layers.indexOf('stars') !== -1) {
      var starCanvas = section.querySelector('.scene-stars');
      if (starCanvas) initStars(starCanvas, { count: parseInt(section.dataset.stars, 10) || 120 });
    }
    if (layers.indexOf('particles') !== -1) {
      var pCanvas = section.querySelector('.scene-particles');
      if (pCanvas) initParticles(pCanvas, { rate: parseFloat(section.dataset.particleRate) || 0.6 });
    }
  }

  var sections = document.querySelectorAll('[data-scene]');
  if (!sections.length) return;

  if (!('IntersectionObserver' in window)) {
    sections.forEach(activate);
    return;
  }
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        activate(e.target);
        obs.unobserve(e.target);
      }
    });
  }, { rootMargin: '100px' });
  sections.forEach(function(s) { obs.observe(s); });
})();
