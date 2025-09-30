// ui.js - navigation, theme toggle, scroll reveal, modal, contact form helpers

(function () {
  'use strict';

  /**
   * Helper: safe query selector
   * @param {string} sel
   * @param {ParentNode} [scope=document]
   * @returns {Element|null}
   */
  const $ = (sel, scope = document) => scope.querySelector(sel);

  /** THEME TOGGLE --------------------------------------------------------- */
  (function initTheme() {
    const root = document.documentElement;
    const stored = localStorage.getItem('theme');
    if (stored) root.setAttribute('data-theme', stored);
    const btn = $('#themeToggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  })();

  /** MOBILE NAV ----------------------------------------------------------- */
  (function initMobileNav() {
    const toggle = $('.nav-toggle');
    const menu = $('#nav-menu');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('show');
    });
    menu.addEventListener('click', (e) => {
      if (e.target.matches('a')) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('show');
      }
    });
  })();

  /** SCROLL REVEAL -------------------------------------------------------- */
  (function initReveal() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let observer = null;

    /** Apply reveal styles immediately */
    function apply(el) {
      if (el.classList.contains('revealed')) return;
      el.classList.add('revealed');
      // data-reveal-pop handled via CSS keyframes; forced reflow ensures restart if reused
      if (el.hasAttribute('data-reveal-pop')) void el.offsetWidth;
    }

    function collect(scope = document) {
      return Array.from(scope.querySelectorAll('[data-reveal]:not(.revealed)'));
    }

    function register(scope = document) {
      const elements = collect(scope);
      if (prefersReduced || !('IntersectionObserver' in window)) {
        elements.forEach(apply);
        return;
      }
      elements.forEach((el) => {
        if (el.__observed) return; // idempotent
        el.__observed = true;
        observer.observe(el);
      });
    }

    if (prefersReduced) {
      register();
    } else if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const order = parseInt(el.getAttribute('data-reveal-order') || '0', 10);
            const baseDelay = 70; // ms per order step
            setTimeout(() => apply(el), order * baseDelay);
            observer.unobserve(el);
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      );
      register();
    } else {
      register();
    }

    // expose for dynamically injected content (projects, modal content, etc.)
    window.__registerReveals = register;
  })();

  /** MODAL (accessible focus trap) --------------------------------------- */
  (function initModal() {
    const modal = $('#modal');
    if (!modal) return;
    const body = $('#modalBody', modal);
    let lastFocused = null;

    const getFocusable = () =>
      modal.querySelectorAll(
        'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );

    function open(html) {
      if (html) body.innerHTML = html;
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      lastFocused = document.activeElement;
      const focusables = getFocusable();
      if (focusables.length) focusables[0].focus();
    }

    function close() {
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    }

    modal.addEventListener('click', (e) => {
      if (e.target.hasAttribute('data-modal-close')) close();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
      if (e.key !== 'Tab' || modal.getAttribute('aria-hidden') === 'true') return;
      const focusables = Array.from(getFocusable());
      if (!focusables.length) return;
      const index = focusables.indexOf(document.activeElement);
      if (e.shiftKey && index <= 0) {
        e.preventDefault();
        focusables[focusables.length - 1].focus();
      } else if (!e.shiftKey && index === focusables.length - 1) {
        e.preventDefault();
        focusables[0].focus();
      }
    });

    window.__portfolioModal = { open, close };
  })();

  /** CONTACT FORM (simple client-side validation + mailto) --------------- */
  (function initContactForm() {
    const form = $('#contactForm');
    if (!form) return;
    const status = $('#formStatus');

    function setError(id, msg) {
      const el = $('#error-' + id);
      if (el) el.textContent = msg;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      ['name', 'email', 'message'].forEach((f) => setError(f, ''));
      let valid = true;
      if (!name) {
        setError('name', 'Name is required');
        valid = false;
      }
      if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        setError('email', 'Valid email required');
        valid = false;
      }
      if (!message || message.length < 10) {
        setError('message', 'Message should be at least 10 characters');
        valid = false;
      }
      if (!valid) return;

      const mailto = `mailto:surajshanbhag143@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(
        name
      )}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' <' + email + '>')}`;
      if (status) status.textContent = 'Opening your email client...';
      window.location.href = mailto;
      setTimeout(() => {
        if (status)
          status.textContent = 'If your mail client did not open, please email directly.';
      }, 2000);
      form.reset();
    });
  })();

  /** FOOTER UTILS --------------------------------------------------------- */
  (function initFooter() {
    const yearEl = document.getElementById('footerYear') || document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    const backTop = document.getElementById('backToTop');
    if (backTop) {
      backTop.addEventListener('click', () =>
        window.scrollTo({ top: 0, behavior: 'smooth' })
      );
    }
  })();
})();
