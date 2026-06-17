(function() {
  'use strict';

  /* ------------------------------------------------
     NAV — transparent → solid on scroll
     ------------------------------------------------ */
  var nav = document.querySelector('.nav');
  var scrollHint = document.querySelector('.scroll-hint');

  window.addEventListener('scroll', function() {
    var y = window.scrollY;
    if (y > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    if (scrollHint) {
      scrollHint.style.opacity = Math.max(0, 0.35 - y / 300);
    }
  }, { passive: true });

  /* ------------------------------------------------
     MOBILE NAV TOGGLE
     ------------------------------------------------ */
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function() {
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
    document.querySelectorAll('.nav-links a').forEach(function(a) {
      a.addEventListener('click', function() {
        nav.classList.remove('open');
      });
    });
  }

  /* ------------------------------------------------
     WORD REVEAL SETUP
     Splits text into word spans for stagger animation.
     Preserves <br> tags and <span> tags (like .accent).
     ------------------------------------------------ */
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

  /* ------------------------------------------------
     GSAP ANIMATIONS
     ------------------------------------------------ */
  gsap.registerPlugin(ScrollTrigger);

  // Hero — word-by-word reveal on load
  var titleWords = document.querySelectorAll('.hero-title .word');
  var subWords = document.querySelectorAll('.hero-sub .word');
  var divider = document.querySelector('.hero-divider');

  if (titleWords.length) {
    var tl = gsap.timeline({ delay: 0.4 });

    tl.to(titleWords, {
      opacity: 1,
      y: 0,
      stagger: 0.09,
      duration: 0.55,
      ease: 'power2.out'
    });

    tl.to(divider, {
      opacity: 1,
      duration: 0.7,
      ease: 'power2.out'
    }, '-=0.2');

    tl.to(subWords, {
      opacity: 1,
      y: 0,
      stagger: 0.04,
      duration: 0.45,
      ease: 'power2.out'
    }, '-=0.3');
  }

  // Selector — fade in on scroll
  gsap.from('.sel-header', {
    scrollTrigger: { trigger: '.selector', start: 'top 80%' },
    opacity: 0, y: -20, duration: 0.7, ease: 'power2.out'
  });
  gsap.from('.sel-panel', {
    scrollTrigger: { trigger: '.selector', start: 'top 75%' },
    opacity: 0, stagger: 0.15, duration: 0.9, ease: 'power2.out'
  });

  // Selector — mouse-driven divider shift on desktop
  (function() {
    var panels = document.querySelector('.sel-panels');
    var divider = document.querySelector('.sel-divider');
    var selector = document.querySelector('.selector');
    if (!panels || !divider || window.innerWidth < 769) return;

    panels.addEventListener('mousemove', function(e) {
      var rect = panels.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width;
      var pos = 30 + x * 40; // range: 30% to 70%
      divider.style.left = pos + '%';
    });
    panels.addEventListener('mouseleave', function() {
      divider.style.left = '50%';
    });
  })();

  // Selector — tap toggle on mobile
  (function() {
    if (window.innerWidth >= 769) return;
    var selector = document.querySelector('.selector');
    var panels = document.querySelectorAll('.sel-panel');
    if (!selector || !panels.length) return;

    panels.forEach(function(panel) {
      panel.addEventListener('click', function(e) {
        var isBoy = panel.classList.contains('sel-panel--boy');
        var activeClass = isBoy ? 'boy-active' : 'girl-active';
        var wasActive = selector.classList.contains(activeClass);
        selector.classList.remove('boy-active', 'girl-active');
        if (!wasActive) {
          selector.classList.add(activeClass);
          e.preventDefault();
        }
      });
    });
  })();

})();
