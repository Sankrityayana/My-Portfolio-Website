# Suraj Shanbhag Portfolio

A fast, lightweight, offline-friendly multi‑page portfolio built with only **HTML, CSS, and vanilla JavaScript** (no frameworks). Just open `index.html` in a browser.

## Features
- Responsive design (mobile-first) with accessible semantic HTML5
- Light/Dark mode with persistent preference (localStorage)
- Scroll reveal animations, staged reveal & motion-safe fallbacks
- Projects filter + modal details + featured showcase
- Certification page with client-side category filtering
- Contact form with validation + `mailto:` fallback
- Lazy-loaded images, optimized structure, no external runtime deps

## Structure
```
index.html
about.html
projects.html
certification.html
contact.html
css/styles.css
css/utils.css
js/main.js
js/projects.js
js/ui.js
assets/
  Suraj_Laxman_Shanbhag_Myntra_Resume.pdf (add your real file)
  avatar.svg
  favicon.ico
  placeholders/*.jpg
LICENSE
README.md
```

## Customization Guide
Edit the following sections (search these markers in the code):
- BIO: `<!-- BIO CONTENT -->` in `index.html` and `about.html`
- SKILLS: `// EDIT SKILLS` in `main.js` & `<section id="skills">` in `about.html`
- PROJECTS DATA: `// PROJECTS DATA` in `projects.js`
- CERTIFICATION: Edit dataset inside `certification.html` (search `CERTIFICATIONS =`)
- TIMELINE: `<!-- TIMELINE ITEMS -->` in `about.html`

## Running Locally
No build step – simply open `index.html` in any modern browser. Everything works offline.

## Adding a New Project
1. Add an object to the `projects` array in `js/projects.js`.
2. Include an image in `assets/placeholders/` (or keep using placeholder).
3. Category must match one of the filter buttons or add a new filter button dynamically.

## Accessibility
- Landmarks (`header`, `nav`, `main`, `footer`)
- ARIA labels for nav, buttons, carousel controls, modals
- Sufficient color contrast in both themes

## Deployment
You can deploy the folder as-is using GitHub Pages, Netlify, Vercel, or any static host.

## License
MIT – see `LICENSE`.

---
Feel free to reach out: **surajshanbhag143@gmail.com**
