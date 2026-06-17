/* ============================================================
   ORBISOJAS — Shared Core JS
   Word reveal, descent meter, nav toggle, smooth scroll
   ============================================================ */

/* --- Word-by-word reveal for [data-reveal] elements --- */
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

/* --- Descent meter --- */
(function() {
  var fill = document.querySelector('.descent-fill');
  if (!fill) return;
  window.addEventListener('scroll', function() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (h > 0) fill.style.height = (window.scrollY / h * 100) + '%';
  }, { passive: true });
})();

/* --- Lazy load scene backgrounds --- */
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

/* --- Mobile nav toggle --- */
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
