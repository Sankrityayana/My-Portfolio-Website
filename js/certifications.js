// certifications.js - renders certification cards & modal
 (function(){
  'use strict';

  /**
   * Dataset: Add real certificate previews by placing PNG/JPG files in assets/certificates/ and updating 'img'.
   * 'issued' / 'expires' use ISO date (YYYY-MM-DD) or null.
   */
  const CERTIFICATIONS = [
    // Only include certificates that have an actual image in assets/certificates
    {
      id:'python-ds',
      title:'Introduction to Python',
      org:'DataCamp',
      provider:'datacamp',
      year:'2025',
      issued:'2025-09-15',
      expires:null,
      category:'python',
      summary:'Core Python fundamentals: variables, data types, lists, slicing, functions, packages & basic NumPy with applied exercises.',
      img:'assets/certificates/Introduction_to_Python_Datacamp.png',
      // credential removed because PDF not found in folder; add back when available
      topics:['Variables','Lists','Functions','Packages','NumPy']
    }
  ];

  // Provider logos (simple inline SVG marks) - extend as needed
  const PROVIDER_LOGOS = {
    aws: '<svg viewBox="0 0 100 60" width="24" height="24" aria-hidden="true"><path fill="#FF9900" d="M24 12h10l7 24h-9l-1-5h-5l-1 5h-9l8-24Zm6 6-1.6 8h3.2L30 18Zm32.5-6c8.9 0 15.5 6.6 15.5 15.3 0 10.2-7.5 16.7-16.3 16.7-8.9 0-15.5-6.6-15.5-15.3C46.2 18.5 53.6 12 62.5 12Zm-.3 8.1c-4.3 0-7.3 3.2-7.3 7.5 0 4.6 3.3 7.6 7.4 7.6 4.3 0 7.3-3.2 7.3-7.5-.1-4.6-3.3-7.6-7.4-7.6Z"/></svg>',
    datacamp: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="#03EF62" d="M12 0 1 6v12l11 6 11-6V6L12 0Zm0 3.1 8.9 4.9v8L12 21.1 3.1 16V8Z"/></svg>',
    generic: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="url(#g)"/><defs><linearGradient id="g" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse"><stop stop-color="#0ea5a4"/><stop offset="1" stop-color="#7c3aed"/></linearGradient></defs></svg>'
  };

  /* ------------------ Utility + Formatting ------------------ */
  function providerLogoHTML(provider){
    return `<span class="cert-provider-logo" aria-hidden="true">${PROVIDER_LOGOS[provider] || PROVIDER_LOGOS.generic}</span>`;
  }

  function parseIssued(cert){
    if(cert.issued) return Date.parse(cert.issued);
    if(/^[0-9]{4}$/.test(cert.year)) return Date.parse(cert.year + '-01-01');
    if(/progress/i.test(cert.year)) return Date.parse('9999-12-31');
    return 0;
  }

  function isInProgress(cert){
    return /progress/i.test(cert.year) || (!cert.issued && /progress/i.test(cert.year));
  }

  function formatDate(iso){
    if(!iso) return null;
    const d = new Date(iso);
    if(Number.isNaN(d.getTime())) return null;
    return d.toLocaleDateString(undefined,{year:'numeric', month:'short', day:'numeric'});
  }

  /* ------------------ Modal Builder ------------------ */
  function buildModal(cert){
    const issued = formatDate(cert.issued) || (isInProgress(cert) ? 'In Progress' : cert.year);
    const expires = formatDate(cert.expires);
    const badge = isInProgress(cert) ? '<span class="badge badge-progress" aria-label="In Progress">In&nbsp;Progress</span>' : '';
    return `
      <article class="cert-modal">
        <figure class="cert-modal-media">
          <img class="cert-modal-img" src="${cert.img}" alt="Certificate image for ${cert.title}" loading="lazy" onerror="if(!this.dataset.fallback){this.dataset.fallback='1';this.classList.add('cert-img-error');this.alt='Certificate image not found';this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 480 320\'><rect width=\'480\' height=\'320\' fill=\'%23f5f7fa\' stroke=\'%23cbd5e1\'/><text x=\'50%25\' y=\'50%25\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-family=\'Arial,sans-serif\' font-size=\'22\' fill=\'%2363748b\'>Image Missing</text></svg>'; }"/>
        </figure>
        <h3 class="cert-modal-title">${cert.title} ${badge}</h3>
        <div class="cert-fields">
          <p class="cert-meta-line"><span class="field-label">Issued by:</span><span>${cert.org}</span></p>
          <p class="cert-meta-line"><span class="field-label">Issued on:</span><span>${issued}</span></p>
          ${expires ? `<p class="cert-meta-line"><span class="field-label">Expires:</span><span>${expires}</span></p>`:''}
        </div>
        <section class="cert-description"><p>${cert.summary}</p></section>
        ${cert.topics && cert.topics.length ? `<section class="cert-skills"><h4 class="cert-skills-heading">Skills / Things Learned</h4><ul class="cert-skills-list">${cert.topics.map(t=>`<li>${t}</li>`).join('')}</ul></section>`:''}
        <div class="cert-actions">${cert.credential ? `<a href="${cert.credential}" target="_blank" rel="noopener" class="btn primary btn-credential">View Credential</a>`:''}<button class="btn outline" data-modal-close>Close</button></div>
      </article>`;
  }

  /* ------------------ Card Builder ------------------ */
  function buildCard(cert){
    const card = document.createElement('article');
    card.className = 'card project-card cert-card';
    card.dataset.category = cert.category;
    card.dataset.certId = cert.id;
    const issuedYear = cert.issued ? new Date(cert.issued).getFullYear() : (/^[0-9]{4}$/.test(cert.year)? cert.year : cert.year);
    const tagClass = 'tag-' + cert.category;
    card.innerHTML = `
      <figure class="cert-card-media"><img src="${cert.img}" alt="${cert.title} certificate" loading="lazy" onerror="if(!this.dataset.fallback){this.dataset.fallback='1';this.classList.add('cert-img-error');this.alt='Certificate image not found';this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 360 200\'><rect width=\'360\' height=\'200\' fill=\'%23f5f7fa\' stroke=\'%23cbd5e1\'/><text x=\'50%25\' y=\'50%25\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-family=\'Arial,sans-serif\' font-size=\'18\' fill=\'%2363748b\'>No Image</text></svg>'; }"/></figure>
      <div class="cert-card-header">${providerLogoHTML(cert.provider)}<h3 class="cert-card-title">${cert.title}</h3></div>
      <p class="cert-card-meta">${cert.org} • <span>${issuedYear}</span></p>
      <p class="cert-card-summary">${cert.summary}</p>
      <div class="project-tags" aria-label="Category"><span class="${tagClass}" data-cat="${cert.category}">${cert.category}</span></div>
      <div class="card-actions">
        <button class="btn secondary btn-details" data-cert-id="${cert.id}" aria-label="View details for ${cert.title}">Details</button>
      </div>`;
    return card;
  }

  /* ------------------ State + Filtering ------------------ */
  let SORTED = [];

  function renderAll(){
    const grid = document.getElementById('certGrid');
    if(!grid) return;
    grid.innerHTML = '';
    SORTED.forEach(c => grid.appendChild(buildCard(c)));
  }

  function updateStatus(visible, total){
    const s = document.getElementById('certStatus');
    if(!s) return;
    if(total === 0){ s.textContent = 'No certifications available yet.'; return; }
    if(visible === 0) s.textContent = 'No certifications match this filter.';
    else if(visible === total) s.textContent = `${visible} certifications shown.`;
    else s.textContent = `${visible} of ${total} certifications shown.`;
  }

  function updateHeading(filterKey){
    const h = document.getElementById('cert-list-heading');
    if(!h) return;
    const map = { all:'All Certifications', ai:'AI / ML Certifications', python:'Python Certifications', data:'Data Certifications', cloud:'Cloud Certifications', dev:'Development Certifications' };
    h.textContent = map[filterKey] || 'Certifications';
  }

  function applyFilter(filterKey){
    const grid = document.getElementById('certGrid');
    if(!grid) return;
    const cards = Array.from(grid.querySelectorAll('.cert-card'));
    let visible = 0;
    cards.forEach(card => {
      const match = (filterKey === 'all') || card.dataset.category === filterKey;
      card.style.display = match ? '' : 'none';
      if(match) visible++;
    });
    updateStatus(visible, cards.length);
    updateHeading(filterKey);
    // focus first visible card for keyboard users
    const first = cards.find(c=> c.style.display !== 'none');
    if(first){ first.querySelector('.btn-details')?.setAttribute('tabindex','0'); }
  }

  /* ------------------ Event Wiring ------------------ */
  function wireFilterButtons(){
    const buttons = document.querySelectorAll('.filters .filter-btn');
    buttons.forEach(btn => btn.addEventListener('click', () => {
      buttons.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.getAttribute('data-filter'));
    }));
  }

  function wireCardClicks(){
    const grid = document.getElementById('certGrid');
    if(!grid) return;
    grid.addEventListener('click', e => {
      const trigger = e.target.closest('[data-cert-id]');
      if(!trigger) return;
      openCertModal(trigger.getAttribute('data-cert-id'));
    });
    // keyboard accessibility for entire card (Enter on focused Details button already works)
  }

  function openCertModal(id){
    const cert = SORTED.find(c=>c.id === id);
    if(cert && window.__portfolioModal){
      window.__portfolioModal.open(buildModal(cert));
    }
  }

  /* ------------------ Initialization ------------------ */
  function init(){
    const grid = document.getElementById('certGrid');
    if(!grid) return;
    // Ensure a status element exists for user feedback & debugging
    let statusEl = document.getElementById('certStatus');
    if(!statusEl){
      const filterSection = document.querySelector('.cert-filters');
      statusEl = document.createElement('p');
      statusEl.id = 'certStatus';
      statusEl.setAttribute('aria-live','polite');
      statusEl.style.margin = '.25rem 0 .25rem';
      statusEl.style.fontSize = '.65rem';
      statusEl.style.letterSpacing = '.5px';
      statusEl.style.opacity = '.6';
      if(filterSection) filterSection.appendChild(statusEl); else grid.before(statusEl);
    }
    if(!CERTIFICATIONS.length){
      grid.innerHTML = '<p class="cert-empty">No certifications available yet.</p>';
      updateStatus(0,0);
      return;
    }
    SORTED = CERTIFICATIONS.slice().sort((a,b)=> parseIssued(b) - parseIssued(a));
    renderAll();
    updateStatus(SORTED.length, SORTED.length);
    updateHeading('all');
    // Debug log to verify categories and presence of python cert
    try { console.info('[Certifications] Rendered items:', SORTED.map(c=>({id:c.id, category:c.category}))); } catch(e) {}
    wireFilterButtons();
    wireCardClicks();
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
 })();
