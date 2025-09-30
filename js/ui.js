// ui.js - navigation, theme toggle, scroll reveal, modal, carousel, form handling base

(function(){
  'use strict';

  // THEME TOGGLE ------------------------------------------------------------
  const root = document.documentElement;
  const storedTheme = localStorage.getItem('theme');
  if(storedTheme){ root.setAttribute('data-theme', storedTheme); }
  const themeBtn = document.getElementById('themeToggle');
  if(themeBtn){
    themeBtn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  // MOBILE NAV --------------------------------------------------------------
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if(navToggle && navMenu){
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('show');
    });
    navMenu.addEventListener('click', e => {
      if(e.target.matches('a')){
        navToggle.setAttribute('aria-expanded','false');
        navMenu.classList.remove('show');
      }
    });
  }

  // SCROLL REVEAL ----------------------------------------------------------
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let revealObserver = null;
  function applyReveal(el){
    if(el.classList.contains('revealed')) return;
    el.classList.add('revealed');
    if(el.hasAttribute('data-reveal-pop')){
      void el.offsetWidth; // force reflow to ensure animation restart
      el.classList.add('pop-seq');
    }
  }
  function observe(el){
    if(!revealObserver){ return; }
    if(el.__observed) return;
    el.__observed = true;
    revealObserver.observe(el);
  }
  function registerReveals(scope=document){
    const els = Array.from(scope.querySelectorAll('[data-reveal]:not(.revealed)'));
    if(prefersReduced){ els.forEach(applyReveal); return; }
    if(!('IntersectionObserver' in window)) { els.forEach(applyReveal); return; }
    els.forEach(observe);
  }
  if(prefersReduced){
    registerReveals();
  } else if('IntersectionObserver' in window){
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          const el = entry.target;
          const order = parseInt(el.getAttribute('data-reveal-order')||'0',10);
          const base = 70;
          setTimeout(()=> applyReveal(el), order * base);
          revealObserver.unobserve(el);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    registerReveals();
  } else {
    registerReveals();
  }
  window.__registerReveals = registerReveals;

  // MODAL -------------------------------------------------------------------
  const modal = document.getElementById('modal');
  const modalBody = modal ? modal.querySelector('#modalBody') : null;
  let lastFocused = null;
  function getFocusable(){
    return modal.querySelectorAll('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])');
  }
  function openModal(html){
    if(!modal) return;
    if(html) modalBody.innerHTML = html;
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
    lastFocused = document.activeElement;
    const focusables = getFocusable();
    if(focusables.length) focusables[0].focus();
  }
  function closeModal(){
    if(!modal) return;
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
    if(lastFocused) lastFocused.focus();
  }
  if(modal){
    modal.addEventListener('click', e => {
      if(e.target.hasAttribute('data-modal-close')) closeModal();
    });
    window.addEventListener('keydown', e => { 
      if(e.key === 'Escape') closeModal();
      if(e.key === 'Tab' && modal.getAttribute('aria-hidden') === 'false'){
        const focusables = Array.from(getFocusable());
        if(!focusables.length) return; 
        const index = focusables.indexOf(document.activeElement);
        if(e.shiftKey){
          if(index <= 0){
            e.preventDefault();
            focusables[focusables.length -1].focus();
          }
        } else {
          if(index === focusables.length -1){
            e.preventDefault();
            focusables[0].focus();
          }
        }
      }
    });
  }
  window.__portfolioModal = { open: openModal, close: closeModal };

  // (Removed testimonial carousel & associated markup/styles during cleanup)

  // CONTACT FORM -----------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    const status = document.getElementById('formStatus');
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();
      let valid = true;
      function setError(field, msg){
        const el = document.getElementById('error-' + field);
        if(el){ el.textContent = msg; }
      }
      ['name','email','message'].forEach(f => setError(f, ''));

      if(!name){ setError('name', 'Name is required'); valid = false; }
      if(!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){ setError('email', 'Valid email required'); valid = false; }
      if(!message || message.length < 10){ setError('message', 'Message should be at least 10 characters'); valid = false; }

      if(!valid) return;

      // MAILTO fallback ----------------------------------------------------
      const mailto = `mailto:surajshanbhag143@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' <'+ email +'>')}`;
      status.textContent = 'Opening your email client...';
      window.location.href = mailto;
      setTimeout(()=> { status.textContent = 'If your mail client did not open, please email directly.'; }, 2000);
      contactForm.reset();
    });
  }

  // FOOTER YEAR & BACK TO TOP ----------------------------------------------
  const yearEl = document.getElementById('footerYear') || document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();
  const backTop = document.getElementById('backToTop');
  if(backTop){
    backTop.addEventListener('click', () => {
      window.scrollTo({ top:0, behavior:'smooth' });
    });
  }
})();
