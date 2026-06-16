/* ============================================================
   ORBISOJAS — Main JS
   Cursor, nav, scroll reveals, page-specific animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     0. Grain Overlay (canvas-generated, CSS animated)
  ---------------------------------------------------------- */
  const grainEl = document.getElementById('grain-overlay');
  if (grainEl) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 128;
    canvas.height = 128;
    const imgData = ctx.createImageData(128, 128);
    for (let i = 0; i < imgData.data.length; i += 4) {
      const v = Math.random() * 255;
      imgData.data[i] = v;
      imgData.data[i + 1] = v;
      imgData.data[i + 2] = v;
      imgData.data[i + 3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);
    grainEl.style.backgroundImage = `url(${canvas.toDataURL('image/png')})`;
    grainEl.style.backgroundRepeat = 'repeat';
    grainEl.style.backgroundSize = '128px 128px';
  }

  /* ----------------------------------------------------------
     1. Custom Cursor
  ---------------------------------------------------------- */
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');

  if (cursor && ring && window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', e => {
      cursor.style.left = (e.clientX - 4) + 'px';
      cursor.style.top = (e.clientY - 4) + 'px';
      ring.style.left = (e.clientX - 18) + 'px';
      ring.style.top = (e.clientY - 18) + 'px';
    });

    // Hover expansion on interactive elements
    const hoverTargets = 'a, button, .btn, input, textarea, select, [role="button"]';

    document.addEventListener('mouseover', e => {
      if (e.target.closest(hoverTargets)) {
        document.body.classList.add('cursor-hover');
      }
    });
    document.addEventListener('mouseout', e => {
      if (e.target.closest(hoverTargets)) {
        document.body.classList.remove('cursor-hover');
      }
    });
  }

  /* ----------------------------------------------------------
     2. Nav Background on Scroll
  ---------------------------------------------------------- */
  const nav = document.querySelector('.site-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* ----------------------------------------------------------
     3. Mobile Nav Toggle
  ---------------------------------------------------------- */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ----------------------------------------------------------
     4. Scroll Reveal (IntersectionObserver)
  ---------------------------------------------------------- */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => revealObserver.observe(el));

  /* ----------------------------------------------------------
     5. Layer Diagram Animation (index.html)
  ---------------------------------------------------------- */
  const diagram = document.querySelector('.layer-diagram');
  if (diagram) {
    const diagramObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });
    diagramObserver.observe(diagram);
  }

  /* ----------------------------------------------------------
     6. Mirror Questions — Line Draw (index.html)
  ---------------------------------------------------------- */
  const mirrorQs = document.querySelectorAll('.mirror-q');
  if (mirrorQs.length) {
    const mqObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.3 });
    mirrorQs.forEach(q => mqObserver.observe(q));
  }

  /* ----------------------------------------------------------
     7. Mirror Page — Word-by-Word Reveal (mirror.html)
  ---------------------------------------------------------- */
  const wordSections = document.querySelectorAll('.mirror-question-section');
  if (wordSections.length) {
    // Wrap each word in a span
    wordSections.forEach(section => {
      const textEl = section.querySelector('.mirror-question-text');
      if (!textEl || textEl.querySelector('.word')) return; // already wrapped

      const text = textEl.textContent.trim();
      const words = text.split(/\s+/);
      textEl.innerHTML = words.map((w, i) =>
        `<span class="word" style="transition-delay: ${i * 0.06}s">${w}</span>`
      ).join(' ');
    });

    const wordObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.3 });

    wordSections.forEach(s => wordObserver.observe(s));
  }

  /* ----------------------------------------------------------
     8. Journey Page — Sticky Sidebar Active Tracking
  ---------------------------------------------------------- */
  const journeyLinks = document.querySelectorAll('.journey-sidebar a');
  const journeyLevels = document.querySelectorAll('.journey-level');

  if (journeyLinks.length && journeyLevels.length) {
    const levelObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          journeyLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' });

    journeyLevels.forEach(level => levelObserver.observe(level));
  }

  /* ----------------------------------------------------------
     9. Framework Page — Sticky Sidebar Active Tracking
  ---------------------------------------------------------- */
  const fwLinks = document.querySelectorAll('.framework-sidebar a');
  const fwSections = document.querySelectorAll('.fw-section');

  if (fwLinks.length && fwSections.length) {
    const fwObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          fwLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { threshold: 0.2, rootMargin: '-100px 0px -50% 0px' });

    fwSections.forEach(s => fwObserver.observe(s));
  }

  /* ----------------------------------------------------------
     10. Begin Page — Form Submit Handler
  ---------------------------------------------------------- */
  const beginForm = document.getElementById('mirror-entry');
  if (beginForm) {
    beginForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = beginForm.querySelector('button[type="submit"]');
      if (btn) {
        btn.innerHTML = '<span>The Mirror is opening…</span>';
        btn.disabled = true;
        btn.style.opacity = '0.6';
        btn.style.pointerEvents = 'none';
      }
    });
  }

  /* ----------------------------------------------------------
     11. Smooth Anchor Scroll
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
