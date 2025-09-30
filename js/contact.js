// contact.js - enhanced contact page interactions (validation + mailto)
(function () {
  'use strict';

  const form = document.getElementById('contactForm');
  if (!form) return; // only run on contact page

  const statusEl = document.getElementById('formStatus');
  const charCount = document.getElementById('charCount');
  const messageEl = document.getElementById('message');
  const resetBtn = document.getElementById('resetFormBtn');

  // Character counter ------------------------------------------------------
  if (messageEl && charCount) {
    const limit = parseInt(messageEl.getAttribute('maxlength') || '1000', 10);
    messageEl.addEventListener('input', () => {
      charCount.textContent = `${messageEl.value.length} / ${limit}`;
    });
  }

  function setError(id, msg) {
    const el = document.getElementById('error-' + id);
    if (el) el.textContent = msg || '';
  }

  function clearErrors() {
    ['name', 'email', 'subject', 'reason', 'message', 'consent'].forEach((f) => setError(f, ''));
  }

  function gather() {
    return {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      subject: form.subject.value.trim(),
      reason: form.reason.value.trim(),
      message: form.message.value.trim(),
      consent: form.consent.checked
    };
  }

  function validate(data) {
    let ok = true;
    if (!data.name) {
      setError('name', 'Name required');
      ok = false;
    }
    if (!data.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) {
      setError('email', 'Valid email required');
      ok = false;
    }
    if (!data.subject) {
      setError('subject', 'Subject required');
      ok = false;
    }
    if (!data.reason) {
      setError('reason', 'Pick a reason');
      ok = false;
    }
    if (!data.message || data.message.length < 10) {
      setError('message', 'Min 10 characters');
      ok = false;
    }
    if (!data.consent) {
      setError('consent', 'Please provide consent');
      ok = false;
    }
    return ok;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();
    const data = gather();
    if (!validate(data)) return;
    if (statusEl) statusEl.textContent = 'Preparing email…';
    const body = [
      data.message,
      '\n---',
      `Reason: ${data.reason}`,
      `From: ${data.name} <${data.email}>`
    ].join('\n');
    const mailto = `mailto:surajshanbhag143@gmail.com?subject=${encodeURIComponent(
      data.subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setTimeout(() => {
      if (statusEl)
        statusEl.textContent = 'If mail client did not open, copy the email and send manually.';
    }, 1500);
    form.reset();
    if (charCount) charCount.textContent = '0 / 1000';
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      clearErrors();
      if (statusEl) statusEl.textContent = '';
      if (charCount) charCount.textContent = '0 / 1000';
    });
  }
})();
