/* ============================================================
   ORBISOJAS — Shared Core JS
   Typewriter system, word-reveal, descent meter, lazy load, nav.
   ============================================================ */

var REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------
   TYPEWRITER — data-typeon
   Char-by-char reveal with blinking cursor.
   Attrs: data-speed (ms/char, default 40), data-delay (ms, default 0)
   ------------------------------------------------------------ */
(function() {
  var els = document.querySelectorAll('[data-typeon]');
  if (!els.length) return;

  els.forEach(function(el) {
    // Preserve original HTML (<br>, <span class="accent">, etc.)
    el.dataset.typeonHtml = el.innerHTML;
    el.innerHTML = '<span class="typeon-out"></span><span class="typeon-cursor" aria-hidden="true">_</span>';
    el.classList.add('typeon-ready');
  });

  if (REDUCED_MOTION) {
    els.forEach(function(el) {
      var out = el.querySelector('.typeon-out');
      out.innerHTML = el.dataset.typeonHtml;
      el.classList.add('typeon-done');
    });
    return;
  }

  function typeChars(el) {
    if (el.dataset.typeonStarted === '1') return;
    el.dataset.typeonStarted = '1';

    var html = el.dataset.typeonHtml;
    var speed = parseInt(el.dataset.speed, 10) || 40;
    var delay = parseInt(el.dataset.delay, 10) || 0;
    var out = el.querySelector('.typeon-out');

    // Tokenize HTML so tags emit instantly while text reveals char-by-char.
    var tokens = [];
    var re = /(<[^>]+>)|([\s\S])/g;
    var m;
    while ((m = re.exec(html)) !== null) {
      tokens.push(m[1] || m[2]);
    }

    var i = 0;
    function step() {
      if (i >= tokens.length) {
        el.classList.add('typeon-done');
        return;
      }
      var t = tokens[i++];
      out.innerHTML += t;
      // Tags advance with zero delay; chars use --speed.
      var wait = t.charAt(0) === '<' ? 0 : speed;
      setTimeout(step, wait);
    }
    setTimeout(step, delay);
  }

  if (!('IntersectionObserver' in window)) {
    els.forEach(typeChars);
    return;
  }
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        typeChars(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  els.forEach(function(el) { observer.observe(el); });
})();

/* ------------------------------------------------------------
   WORD REVEAL — [data-reveal]
   Splits text into word spans for GSAP/CSS stagger.
   ------------------------------------------------------------ */
document.querySelectorAll('[data-reveal]').forEach(function(el) {
  var html = el.innerHTML;
  var parts = html.split(/(<br\s*\/?>|<span[^>]*>.*?<\/span>)/gi);
  var wrapped = parts.map(function(part) {
    if (/^<br/i.test(part)) return part;
    if (/^<span/i.test(part)) return '<span class="word">' + part + '</span>';
    return part.replace(/(\S+)/g, '<span class="word">$1</span>');
  }).join('');
  el.innerHTML = wrapped;
});

/* ------------------------------------------------------------
   DESCENT METER
   ------------------------------------------------------------ */
(function() {
  var fill = document.querySelector('.descent-fill');
  if (!fill) return;
  window.addEventListener('scroll', function() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (h > 0) fill.style.height = (window.scrollY / h * 100) + '%';
  }, { passive: true });
})();

/* ------------------------------------------------------------
   LAZY LOAD SCENE BACKGROUNDS
   ------------------------------------------------------------ */
(function() {
  var scenes = document.querySelectorAll('.scene-02, .scene-03, .scene-04');
  if (!scenes.length || !('IntersectionObserver' in window)) {
    scenes.forEach(function(s) { s.classList.add('loaded'); });
    return;
  }
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('loaded');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '200px 0px' });
  scenes.forEach(function(s) { observer.observe(s); });
})();

/* ------------------------------------------------------------
   MOBILE NAV TOGGLE
   ------------------------------------------------------------ */
(function() {
  var btn = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  var links = document.querySelector('.nav-links');
  if (!btn || !links) return;
  btn.addEventListener('click', function() {
    var isOpen = links.classList.toggle('open');
    if (nav) nav.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', isOpen);
  });
  links.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() {
      links.classList.remove('open');
      if (nav) nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();
