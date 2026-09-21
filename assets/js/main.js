/* QUALICOM — Interactions globales */
(function () {
  'use strict';

  /* ---------- Header sticky ---------- */
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.bg-glowline');
  const toTop = document.querySelector('.to-top');

  function onScroll() {
    const y = window.scrollY;
    if (header) header.classList.toggle('scrolled', y > 24);
    if (toTop) toTop.classList.toggle('show', y > 600);
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTop) toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Menu mobile ---------- */
  const burger = document.querySelector('.burger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mClose = document.querySelector('.m-close');
  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  if (burger && mobileMenu) {
    burger.addEventListener('click', function () {
      const open = mobileMenu.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    if (mClose) mClose.addEventListener('click', closeMobileMenu);
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMobileMenu);
    });
  }

  /* ---------- Lien actif (souligné automatiquement) ---------- */
  (function markActive() {
    const page = (location.pathname.split('/').pop() || 'index.html').replace('.html', '');
    document.querySelectorAll('.nav-link, .m-link').forEach(function (a) {
      const href = (a.getAttribute('href') || '').split('?')[0].split('#')[0];
      if (href && href.replace('.html', '') === page && !href.includes('#')) a.classList.add('active');
    });
  })();

  /* ---------- Reveal au scroll ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          const el = e.target;
          const delay = el.getAttribute('data-delay');
          if (delay) el.style.transitionDelay = delay + 'ms';
          el.classList.add('revealed');
          io.unobserve(el);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('revealed'); });
  }

  /* ---------- Compteurs animés ---------- */
  const counters = document.querySelectorAll('[data-count]');
  function animateCount(el) {
    const target = parseFloat(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const dur = 1600;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if ('IntersectionObserver' in window && counters.length) {
    const cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { cio.observe(c); });
  } else {
    counters.forEach(function (c) { c.textContent = (c.getAttribute('data-count')) + (c.getAttribute('data-suffix') || ''); });
  }

  /* ---------- Galerie + lightbox ---------- */
  const lb = document.getElementById('lightbox');
  if (lb) {
    const lbImg = lb.querySelector('img');
    const items = Array.from(document.querySelectorAll('.g-item'));
    let current = 0;
    function openLb(i) {
      current = (i + items.length) % items.length;
      const img = items[current].querySelector('img');
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt;
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeLb() {
      lb.classList.remove('open');
      document.body.style.overflow = '';
    }
    items.forEach(function (it, i) {
      it.addEventListener('click', function () { openLb(i); });
    });
    lb.querySelector('.lb-close').addEventListener('click', closeLb);
    lb.querySelector('.lb-prev').addEventListener('click', function (e) { e.stopPropagation(); openLb(current - 1); });
    lb.querySelector('.lb-next').addEventListener('click', function (e) { e.stopPropagation(); openLb(current + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') openLb(current - 1);
      if (e.key === 'ArrowRight') openLb(current + 1);
    });
  }

  /* ---------- Formulaire de contact ---------- */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const ok = document.getElementById('form-success');
      if (ok) {
        ok.classList.add('show');
        ok.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      form.reset();
    });
  }

  /* ---------- Année courante ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
