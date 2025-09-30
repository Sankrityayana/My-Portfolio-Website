// projects.js - project data & rendering logic
// ----------------------------------------------------------------------------------
// HOW TO EDIT:
// - Add/remove objects in PROJECTS below. Keep id unique.
// - Replace placeholder images with real thumbnails when available.
// - category values should match filter buttons (ai, nlp, web, etc.).
// ----------------------------------------------------------------------------------
const PROJECTS = [
  {
    id: 'chat-with-pdf',
    title: 'Chat-with-PDF',
    description: 'Interactive system enabling conversational queries over PDF documents.',
    long: 'Upload PDFs then ask natural language questions. Uses (planned) embeddings + vector similarity retrieval and an answer synthesis pipeline. Designed for modular swapping of embedding providers and LLM endpoints.',
    tags: ['AI', 'NLP', 'Retrieval', 'Embedding', 'Vector'],
    category: 'ai',
    repo: 'https://github.com/Sankrityayana/Chat-with-PDF',
    live: '',
    highlights: [
      'Document chunking & semantic retrieval architecture prepared',
      'Extensible design for multiple embedding providers',
      'Cache layer concept for repeated queries'
    ],
    image: 'assets/placeholders/pdf-chat.jpg'
  },
  {
    id: 'sentiment-analysis',
    title: 'Sentiment Analysis',
    description: 'Pipeline to classify sentiment from text data accurately.',
    long: 'Modular polarity detection pipeline: cleaning, feature extraction (TF‑IDF / embeddings), classical vs modern model comparison & evaluation reporting.',
    tags: ['ML', 'Classification', 'Text', 'Pipeline', 'Evaluation'],
    category: 'nlp',
    repo: 'https://github.com/Sankrityayana/Sentiment-Analysis',
    live: '',
    highlights: [
      'Switchable preprocessing stages',
      'Comparative metrics across model families',
      'Reusable evaluation utilities'
    ],
    image: 'assets/placeholders/sentiment.jpg'
  },
  {
    id: 'ai-chatbot',
    title: 'AI Chatbot',
    description: 'Conversational assistant prototype with contextual follow-up support.',
    long: 'Demonstrates conversation state handling, intent categorisation stub, and streaming UI patterns ready for backend API integration.',
    tags: ['Chatbot', 'Frontend', 'JavaScript', 'State', 'UX'],
    category: 'web',
    repo: 'https://github.com/Sankrityayana/AI-based-Chatbot-in-ReactJS',
    live: '',
    highlights: [
      'Conversation buffer architecture',
      'Typing indicator simulation',
      'Message role styling'
    ],
    image: 'assets/placeholders/chatbot.jpg'
  },
  {
    id: 'portfolio-site',
    title: 'Portfolio Website',
    description: 'Fully responsive, accessible multi‑page personal portfolio site.',
    long: 'Design‑system driven build: semantic HTML, accessibility (ARIA, focus trapping), dark mode, modular JS for projects & testimonials, skill visualisations & scalable component tokens.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Accessibility', 'Design System', 'Dark Mode'],
    category: 'web',
    repo: 'https://github.com/Sankrityayana/My-Portfolio-Website',
    live: './index.html',
    highlights: [
      'Skills staircase & animated skill cloud',
      'Accessible modal & keyboard navigation',
      'Responsive grid system and tokenized theming'
    ],
    image: 'assets/placeholders/placeholder.jpg'
  },
  {
    id: 'nlp-preprocessor',
    title: 'NLP Preprocessor',
    description: 'Configurable text cleaning & feature pipeline for language tasks.',
    long: 'Toolkit for chaining tokenisation, normalization & vectorization with benchmarking capability. Encourages experimentation with modular replaceable steps.',
    tags: ['NLP', 'Pipeline', 'Preprocess', 'Text', 'Toolkit'],
    category: 'nlp',
    repo: 'https://github.com/Sankrityayana/NLP-Preprocessor',
    live: '',
    highlights: [
      'Pluggable stopword / stemming strategies',
      'n‑gram expansion toggle',
      'Vector output comparability'
    ],
    image: 'assets/placeholders/placeholder.jpg'
  },
  {
    id: 'task-tracker',
    title: 'Task Tracker',
    description: 'Lightweight productivity app focusing on clarity & minimal UI.',
    long: 'LocalStorage powered task manager emphasising accessibility & simplicity: keyboard shortcuts, live region updates, filterable tagging.',
    tags: ['Productivity', 'Frontend', 'UX', 'LocalStorage', 'Accessibility'],
    category: 'web',
    repo: 'https://github.com/Sankrityayana/Task-Tracker',
    live: '',
    highlights: [
      'Tag filtering & persistence',
      'No external dependencies',
      'Keyboard-friendly interactions'
    ],
    image: 'assets/placeholders/placeholder.jpg'
  }
];

// Utility to create an element with class list
function el(tag, className) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  return e;
}

function renderProjectCard(project) {
  const card = el('div', 'card project-card');
  card.dataset.category = project.category;
  card.setAttribute('data-reveal', '');
  card.innerHTML = `
    <img src="${project.image}" alt="${project.title}" loading="lazy" onerror="this.src='assets/placeholders/placeholder.jpg'" />
    <span class="project-meta">${project.category}</span>
    <h3>${project.title}</h3>
    <p>${project.description}</p>
    <div class="card-actions">
      <button class="btn outline" data-project="${project.id}">Details</button>
      <a href="${project.repo}" target="_blank" rel="noopener" class="btn secondary">Repo</a>
    </div>`;
  return card;
}

function populateProjectsGrid() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  if (grid.__rendered) return; // idempotent
  grid.__rendered = true;
  PROJECTS.forEach((p) => grid.appendChild(renderProjectCard(p)));
  requestAnimationFrame(() => {
    grid.classList.add('animate-in');
    if (window.__registerReveals) window.__registerReveals(grid);
  });
}

function populateFeatured() {
  const container = document.getElementById('featuredProjects');
  if (!container) return;
  if (container.__rendered) return;
  container.__rendered = true;
  PROJECTS.slice(0, 6).forEach((p, idx) => {
    const card = document.createElement('div');
    card.className = 'card project-card featured';
    card.dataset.category = p.category;
    card.setAttribute('data-reveal', '');
    card.setAttribute('data-reveal-order', String(idx));
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}" loading="lazy" onerror="this.src='assets/placeholders/placeholder.jpg'" />
      <span class="project-meta">${p.category}</span>
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <div class="project-tags" aria-label="Technologies used">${p.tags
        .map((t) => `<span>${t}</span>`)
        .join('')}</div>
      <div class="card-actions">
        <button class="btn secondary" data-project="${p.id}" aria-label="Read more details about ${p.title}">Details</button>
        <a href="${p.repo}" target="_blank" rel="noopener" class="btn outline" aria-label="Open repository for ${p.title}">Repo</a>
      </div>`;
    container.appendChild(card);
  });
  requestAnimationFrame(() => {
    container.classList.add('animate-in');
    if (window.__registerReveals) window.__registerReveals(container);
  });
}

function handleProjectFiltering() {
  const grid = document.getElementById('projectsGrid');
  const buttons = document.querySelectorAll('.filter-btn');
  if (!grid || !buttons.length) return;
  buttons.forEach((btn) =>
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      grid.querySelectorAll('.project-card').forEach((card) => {
        const show = filter === 'all' || card.getAttribute('data-category') === filter;
        card.style.display = show ? '' : 'none';
      });
    })
  );
}

function bindProjectModals() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-project]');
    if (!btn) return;
    const id = btn.getAttribute('data-project');
    const project = PROJECTS.find((p) => p.id === id);
    if (!project) return;
    const tagHTML = project.tags
      .map(
        (t) =>
          `<span class="skill-pill" style="font-size:.58rem; font-weight:600; background:var(--color-bg-alt); border:1px solid var(--color-border); padding:.25rem .5rem; border-radius:var(--radius-full); text-transform:uppercase; letter-spacing:.6px;">${t}</span>`
      )
      .join(' ');
    const highlights = (project.highlights || []).map((h) => `<li>${h}</li>`).join('');
    const actions = [];
    const repo = project.repo || '';
    const isGitHub = repo.includes('github.com/');
    if (repo)
      actions.push(
        `<a href="${repo}" target="_blank" rel="noopener" class="btn primary" aria-label="Open repository for ${project.title}">Repo</a>`
      );
    if (isGitHub)
      actions.push(
        `<a href="${repo}#readme" target="_blank" rel="noopener" class="btn outline" aria-label="Open README for ${project.title}">README</a>`
      );
    if (isGitHub)
      actions.push(
        `<a href="${repo}/archive/refs/heads/main.zip" target="_blank" rel="noopener" class="btn outline" aria-label="Download ZIP for ${project.title}">Download</a>`
      );
    if (project.live)
      actions.push(
        `<a href="${project.live}" target="_blank" rel="noopener" class="btn secondary" aria-label="Open live demo for ${project.title}">Live</a>`
      );
    const html = `
      <article class="project-detail" style="max-width:880px;">
        <header style="margin-bottom:1rem;">
          <h2 style="margin:.2rem 0 .6rem; font-size:1.65rem;">${project.title}</h2>
          <p style="margin:0; color:var(--color-text-alt); font-size:.9rem; letter-spacing:.5px; text-transform:uppercase; font-weight:600;">Category: ${project.category}</p>
        </header>
        <div class="project-detail-body" style="display:grid; gap:1.2rem;">
          <p style="margin:0 0 .4rem; font-size:.95rem; line-height:1.5;">${project.long}</p>
          ${highlights
        ? `<section><h3 style="font-size:1rem; margin:.2rem 0 .5rem;">Highlights</h3><ul style="margin:0 0 .8rem 1.1rem; padding:0; list-style:disc; display:grid; gap:.35rem;">${highlights}</ul></section>`
        : ''
      }
          <section>
            <h3 style="font-size:1rem; margin:.2rem 0 .5rem;">Stack & Tags</h3>
            <div style="display:flex; flex-wrap:wrap; gap:.4rem;">${tagHTML}</div>
          </section>
          <section>
            <h3 style="font-size:1rem; margin:.2rem 0 .6rem;">Resources</h3>
            <div style="display:flex; flex-wrap:wrap; gap:.6rem;">${actions.join('')}</div>
          </section>
        </div>
      </article>`;
    window.__portfolioModal.open(html);
  });
}

// INIT ---------------------------------------------------------------------
(function init() {
  populateProjectsGrid();
  populateFeatured();
  handleProjectFiltering();
  bindProjectModals();
})();
