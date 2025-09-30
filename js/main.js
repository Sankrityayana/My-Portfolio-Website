// main.js - site-wide dynamic content (skills preview pieces)

/** Raw skill labels for simple chip rendering */
const SKILLS = [
  'JavaScript',
  'HTML5',
  'CSS3',
  'Responsive Design',
  'Git',
  'Problem Solving',
  'Python',
  'Data Structures',
  'APIs',
  'Machine Learning Basics',
  'NLP',
  'Debugging',
  'Version Control',
  'Communication',
  'Adaptability'
];

/** Core skill data for icon + progress bar preview */
const CORE_SKILLS = [
  {
    key: 'html',
    label: 'HTML',
    level: 90,
    icon: `<svg viewBox='0 0 128 128' aria-hidden='true'><path fill='#e34f26' d='M19 114L9 1h110l-10 113-45 13'/><path fill='#ef652a' d='M64 117l36-10 8-94H64'/><path fill='#fff' d='M64 66H46l-1-12h19V43H33l3 38h28zm0 30l-.1.1-15.1-4-1-11H36l2 21 26 7 .1-.1z'/><path fill='#fff' d='M63.9 66h18l-2 21-16 4v13l26-7 3-38H64z'/></svg>`
  },
  {
    key: 'css',
    label: 'CSS',
    level: 85,
    icon: `<svg viewBox='0 0 128 128' aria-hidden='true'><path fill='#1572b6' d='M19 114L9 1h110l-10 113-45 13'/><path fill='#33a9dc' d='M64 117l36-10 8-94H64'/><path fill='#fff' d='M64 67H46l-1-12h19V43H33l3 38h28z'/><path fill='#ebebeb' d='M64 96l-.1.1-15.1-4-1-11H36l2 21 26 7 .1-.1z'/><path fill='#fff' d='M63.9 67h18l-2 21-16 4v13l26-7 3-38H64z'/></svg>`
  },
  {
    key: 'js',
    label: 'JavaScript',
    level: 88,
    icon: `<svg viewBox='0 0 630 630' aria-hidden='true'><rect width='630' height='630' fill='#f7df1e'/><path d='M423 492c13 21 29 36 58 36 24 0 39-12 39-29 0-20-16-27-43-39l-15-6c-43-18-71-41-71-90 0-45 34-79 87-79 38 0 65 13 84 47l-46 30c-10-18-21-25-38-25-17 0-28 11-28 25 0 18 11 25 37 36l15 6c51 22 79 44 79 94 0 54-42 83-98 83-55 0-90-26-107-60zm-209 5c10 18 21 33 44 33 22 0 36-8 36-42V289h58v203c0 60-35 88-86 88-46 0-73-24-87-53z' /></svg>`
  },
  {
    key: 'python',
    label: 'Python',
    level: 80,
    icon: `<svg viewBox='0 0 128 128' aria-hidden='true'><path fill='#3776ab' d='M63.6 12c-27.6 0-25.9 12-25.9 12l.1 12.4h26.4v3.7H26.9S12 38.7 12 66.3C12 93.9 24.7 92 24.7 92h14.8V79.2s-.8-14.8 14.4-14.8h26.3s13.6.2 13.6-13.1V25.3S96.9 12 63.6 12zm-14 8.5c2.6 0 4.8 2.1 4.8 4.8 0 2.6-2.1 4.8-4.8 4.8-2.6 0-4.8-2.1-4.8-4.8 0-2.6 2.1-4.8 4.8-4.8z'/><path fill='#ffe052' d='M64.4 116c27.6 0 25.9-12 25.9-12l-.1-12.4H63.8v-3.7h37.3S116 89.3 116 61.7c0-27.6-12.7-25.7-12.7-25.7H88.5v12.8s.8 14.8-14.4 14.8H47.8s-13.6-.2-13.6 13.1v26.1S31.1 116 64.4 116zm14-8.5c-2.6 0-4.8-2.1-4.8-4.8 0-2.6 2.1-4.8 4.8-4.8 2.6 0 4.8 2.1 4.8 4.8 0 2.6-2.2 4.8-4.8 4.8z'/></svg>`
  },
  {
    key: 'git',
    label: 'Git',
    level: 78,
    icon: `<svg viewBox='0 0 97 97' aria-hidden='true'><path fill='#f05133' d='M92.71 44.408 52.59 4.287a9.16 9.16 0 0 0-12.952 0l-8.63 8.63 11.54 11.54c3.12-1.05 6.68-.34 9.17 2.15 2.5 2.5 3.2 6.05 2.15 9.17l11.14 11.14c3.12-1.05 6.68-.34 9.17 2.15 3.58 3.58 3.58 9.4 0 12.98-3.58 3.58-9.4 3.58-12.98 0-2.64-2.64-3.35-6.49-2.11-9.74l-10.4-10.4-.01 27.34c.87.43 1.69 1 2.41 1.72 3.58 3.58 3.58 9.4 0 12.98-3.58 3.58-9.4 3.58-12.98 0-3.58-3.58-3.58-9.4 0-12.98 1.02-1.02 2.19-1.81 3.45-2.34V40.25c-1.26-.53-2.43-1.31-3.45-2.33-2.76-2.76-3.43-6.8-2.05-10.2L25.65 16.93 4.29 38.29a9.16 9.16 0 0 0 0 12.95L44.41 91.36a9.16 9.16 0 0 0 12.95 0l35.35-35.35a9.16 9.16 0 0 0 0-12.95Z'/></svg>`
  }
];

function renderSkillChips() {
  const list = document.getElementById('skillsList');
  if (!list) return;
  // avoid duplicate renders if called again
  if (list.__rendered) return;
  list.__rendered = true;
  SKILLS.forEach((skill) => {
    const span = document.createElement('span');
    span.className = 'skill-pill';
    span.textContent = skill;
    list.appendChild(span);
  });
}

function renderSkillIcons() {
  const box = document.querySelector('.skills-icons');
  if (!box) return;
  if (box.__rendered) return;
  box.__rendered = true;
  CORE_SKILLS.forEach((s) => {
    const div = document.createElement('div');
    div.className = 'skill-icon';
    div.innerHTML = `${s.icon}<span>${s.label}</span>`;
    box.appendChild(div);
  });
}

function renderSkillBars() {
  const wrap = document.querySelector('.skills-bars');
  if (!wrap) return;
  if (wrap.__rendered) return;
  wrap.__rendered = true;
  CORE_SKILLS.forEach((s) => {
    const c = document.createElement('div');
    c.className = 'skill-bar';
    c.innerHTML = `
      <span>${s.label}</span>
      <div class="progress-track" role="progressbar" aria-label="${s.label} proficiency" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${s.level}">
        <div class="progress-fill" style="width:${s.level}%;"></div>
      </div>`;
    wrap.appendChild(c);
  });
  // Animate fills after small delay for reveal effect
  requestAnimationFrame(() => {
    document.querySelectorAll('.progress-fill').forEach((el) => {
      const w = el.style.width;
      el.style.width = '0';
      setTimeout(() => {
        el.style.width = w;
      }, 60);
    });
  });
}

// INIT -----------------------------------------------------------------------
/** Build the “stairs” styled top skills feature */
function renderSkillStairs() {
  const stairsRoot = document.getElementById('skillsStairs');
  if (!stairsRoot) return;
  if (stairsRoot.__rendered) return;
  stairsRoot.__rendered = true;
  const LOCAL_ICON_FILES = {
    GitHub: 'GitHub.svg',
    MySQL: 'MySQL.svg',
    SQL: 'SQL-Developer.svg',
    HTML: 'HTML5.svg',
    CSS: 'CSS3.svg',
    JavaScript: 'JavaScript.svg',
    React: 'React.svg',
    PHP: 'PHP.svg',
    Python: 'Python.svg',
    Java: 'Java.svg',
    Git: 'Git.svg',
    Vercel: 'Vercel.svg',
    AIML: 'TensorFlow.svg',
    API: 'Swagger.svg',
    'Data Analytics': 'Pandas.svg'
  };
  const ICON_URLS = Object.fromEntries(
    Object.entries(LOCAL_ICON_FILES).map(([k, file]) => [k, `assets/icons/${file}`])
  );
  const tiers = [
    { label: 'GitHub', skills: ['GitHub'] },
    { label: 'Databases', skills: ['SQL', 'MySQL'] },
    { label: 'AI & Analytics', skills: ['AIML', 'API', 'Data Analytics'] },
    { label: 'Dev & Deploy', skills: ['Java', 'Python', 'Git', 'Vercel'] },
    { label: 'Core Frontend', skills: ['HTML', 'CSS', 'JavaScript', 'PHP', 'React'] }
  ];
  tiers.forEach((tier, i) => {
    const div = document.createElement('div');
    div.className = 'stair-tier';
    div.dataset.depth = String(i + 1);
    div.dataset.count = String(tier.skills.length);
    div.setAttribute('data-label', tier.label);
    tier.skills.forEach((s) => {
      const card = document.createElement('div');
      card.className = 'skill-square';
      const iconHTML = ICON_URLS[s]
        ? `<img src="${ICON_URLS[s]}" alt="${s} logo" loading="lazy" decoding="async" width="48" height="48" />`
        : `<svg viewBox='0 0 24 24' role='img' aria-label='${s}'><circle cx='12' cy='12' r='11' fill='currentColor'/><text x='12' y='16' text-anchor='middle' font-size='10' fill='#000' font-family='system-ui,sans-serif'>${(s[0] || '?').toUpperCase()
        }</text></svg>`;
      card.innerHTML = `<div class="skill-square-icon">${iconHTML}</div><span>${s}</span>`;
      const img = card.querySelector('img');
      if (img) {
        img.addEventListener(
          'error',
          () => {
            const holder = card.querySelector('.skill-square-icon');
            if (holder) {
              holder.innerHTML = `<svg viewBox='0 0 24 24'><circle cx='12' cy='12' r='11' fill='currentColor'/><text x='12' y='16' text-anchor='middle' font-size='10' fill='#000'>${(s[0] || '?').toUpperCase()
                }</text></svg>`;
            }
          },
          { once: true }
        );
      }
      div.appendChild(card);
    });
    stairsRoot.appendChild(div);
  });
}

(function init() {
  renderSkillChips();
  renderSkillIcons();
  renderSkillBars();
  renderSkillStairs();
})();
