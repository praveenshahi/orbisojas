/* ============================================================
   ORBISOJAS — Cursor System
   Ojas-orb cursor + amber particle trail + hover-to-decode.
   Guards: touch devices and prefers-reduced-motion fall back to OS cursor.
   ============================================================ */
(function() {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasFinePointer = window.matchMedia('(pointer: fine)').matches;
  if (prefersReduced || !hasFinePointer) return;

  // -------- DOM ----------
  var orb = document.createElement('div');
  orb.className = 'oj-cursor';
  orb.innerHTML = '<span class="oj-cursor-dot"></span><span class="oj-cursor-ring"></span>';
  document.body.appendChild(orb);

  var trailCanvas = document.createElement('canvas');
  trailCanvas.className = 'oj-cursor-trail';
  trailCanvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(trailCanvas);

  document.documentElement.classList.add('oj-cursor-active');

  // -------- STATE ----------
  var mx = window.innerWidth / 2;
  var my = window.innerHeight / 2;
  var ox = mx, oy = my;       // orb position (eased)
  var particles = [];
  var lastEmit = 0;

  function resize() {
    trailCanvas.width = window.innerWidth;
    trailCanvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // -------- MOUSE TRACKING ----------
  window.addEventListener('mousemove', function(e) {
    mx = e.clientX;
    my = e.clientY;
  }, { passive: true });

  // -------- HOVER STATE ----------
  function isInteractive(el) {
    if (!el || !el.closest) return false;
    return !!el.closest('a, button, [role="button"], input, textarea, select, label, .sel-panel, .ftag, .metric-card');
  }
  window.addEventListener('mouseover', function(e) {
    orb.classList.toggle('oj-cursor--hover', isInteractive(e.target));
    orb.classList.toggle('oj-cursor--text', !!(e.target.closest && e.target.closest('h1, h2, h3, p, .scene-lead, .hero-title')));
  }, { passive: true });

  // Hide cursor when leaving window
  window.addEventListener('mouseleave', function() { orb.style.opacity = 0; });
  window.addEventListener('mouseenter', function() { orb.style.opacity = 1; });

  // -------- PARTICLE TRAIL ----------
  var ctx = trailCanvas.getContext('2d');

  function spawnParticle() {
    particles.push({
      x: ox + (Math.random() - 0.5) * 6,
      y: oy + (Math.random() - 0.5) * 6,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -0.3 - Math.random() * 0.5,
      life: 1,
      size: 1 + Math.random() * 1.8
    });
    if (particles.length > 60) particles.shift();
  }

  function step(t) {
    // Eased follow
    ox += (mx - ox) * 0.22;
    oy += (my - oy) * 0.22;
    orb.style.transform = 'translate3d(' + (ox - 12) + 'px,' + (oy - 12) + 'px,0)';

    // Emit ~60fps adjusted
    if (t - lastEmit > 22) {
      var moveDist = Math.hypot(mx - ox, my - oy);
      if (moveDist > 0.6) spawnParticle();
      lastEmit = t;
    }

    // Draw trail
    ctx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
    for (var i = particles.length - 1; i >= 0; i--) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.018;
      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }
      ctx.globalAlpha = p.life * 0.7;
      ctx.fillStyle = '#E8B547';
      ctx.shadowColor = '#C08A2C';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;

    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);

  // -------- HOVER-TO-DECODE ----------
  // Lightweight implementation: target elements with [data-decode] OR
  // text near cursor on .scene-title / .hero-title. On enter, scramble briefly.
  var GLYPHS = '!<>-_\\/[]{}—=+*^?#________';
  function scramble(el) {
    if (el.dataset.decoding === '1') return;
    var original = el.dataset.decodeOriginal || el.textContent;
    el.dataset.decodeOriginal = original;
    el.dataset.decoding = '1';
    var iters = 0;
    var maxIters = 8;
    function tick() {
      var out = '';
      for (var i = 0; i < original.length; i++) {
        var ch = original[i];
        if (ch === ' ' || ch === '\n') { out += ch; continue; }
        if (iters > i * 0.6) out += ch;
        else out += GLYPHS.charAt(Math.floor(Math.random() * GLYPHS.length));
      }
      el.textContent = out;
      iters++;
      if (iters < maxIters + original.length * 0.6) {
        setTimeout(tick, 28);
      } else {
        el.textContent = original;
        el.dataset.decoding = '0';
      }
    }
    tick();
  }
  document.querySelectorAll('[data-decode]').forEach(function(el) {
    el.addEventListener('mouseenter', function() { scramble(el); });
  });
})();
