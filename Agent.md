0) Repository context
Purpose: Build and maintain a static portfolio site for a Game AI & Simulation Engineer.

Hosting: GitHub Pages from main branch, site root (/).

Status: Repo is activated (has a main branch). If not, create README.md first.

Tech: Plain HTML/CSS/JS. No frameworks. Optional light JS utilities only.

1) High-level goals
Minimal, fast, responsive portfolio.

Home (one-page) + Project details pages.

Korean/English toggle (default: KO).

Developer can edit text/images without touching layout or JS.

2) Non-goals
No bundlers, no server code, no external build steps.

No base64-inlined images, no heavy libs, no analytics trackers.

3) File layout (authoritative)
pgsql
복사
편집
/                 # site root
├─ index.html     # Home (hero, about, skills, projects grid, contact)
├─ project-template.html  # Case study layout, duplicated per project
├─ styles.css
├─ scripts.js
├─ /assets/       # images, pdf only (binary). do not inline
│   ├─ avatar.png
│   ├─ hero-slide1.png
│   ├─ hero-slide2.png
│   ├─ hero-slide3.png
│   └─ resume.pdf
└─ /i18n/
    ├─ ko.json
    └─ en.json
Rules

If a file exists, overwrite it atomically.

When creating binary files in automation, create empty placeholders; do not paste binary blobs.

Keep HTML semantic, accessible (proper landmarks, alt text, labels).

4) Phased tasks (run in order)
Phase 1 — Scaffold
Create/overwrite all files exactly as specified.

Implement sticky top nav, smooth anchor scroll, responsive grid.

Insert minimal hero with CTA buttons and static avatar (slides added later).

Phase 2 — i18n
Add data-i18n="key" to all textual nodes.

Load /i18n/ko.json and /i18n/en.json at runtime.

Implement language toggle button with persistence (localStorage.lang), and ?lang= override.

Provide complete key coverage; no missing keys allowed.

Phase 3 — Projects
In index.html, render project cards from an inline JSON array (or window.PROJECTS in scripts.js).

Clicking a card opens a dedicated case study page generated from project-template.html.

Case study sections: Overview / Role / Duration / Stack / Problem / Approach / Implementation / Results / Links.

Phase 4 — Polish
Add hero slideshow (3–4 static images) with pause/resume, no external libs.

Add skip-to-content link, focus outlines, reduced-motion respect.

5) Acceptance criteria (must pass)
Deploys on GitHub Pages without extra steps.

All text is i18n-driven and switchable at runtime (KO default).

Layout remains responsive (≤360px to ≥1440px).

Lighthouse Performance ≥ 95, Accessibility ≥ 90 (no ARIA violations).

No console errors; network requests limited to local assets.

One sample project wired end-to-end (card → case study page).

6) Editing guide (ship as /EDITING.md)
Text: update i18n/*.json.

Images: replace files in /assets/ (keep same names to avoid code edits).

Add project: duplicate project-template.html, add entry to window.PROJECTS.

Resume: drop a new assets/resume.pdf and link auto-works.

7) Coding standards
HTML: semantic sections (header, main, section, footer), one h1 per page.

CSS: single styles.css. Use CSS grid/flex, no frameworks. Keep variables minimal.

JS: plain ES modules or IIFE; no frameworks. Avoid global leaks.

Accessibility: visible focus, label buttons, aria-live for language change notice.

8) i18n keys (starter set)
/i18n/ko.json

json
복사
편집
{
  "nav.about": "About",
  "nav.projects": "Projects",
  "nav.skills": "Skills",
  "nav.contact": "Contact",
  "hero.title": "Game AI & Simulation Engineer",
  "hero.sub": "Unity · LLM · Real-time Systems",
  "cta.viewProjects": "View Projects",
  "cta.resume": "Resume",
  "about.h2": "About",
  "about.body": "LLM 기반 에이전트, 이벤트 시스템, 성능 최적화 중심의 게임 AI/시뮬레이션 개발자입니다.",
  "projects.h2": "Projects",
  "skills.h2": "Skills",
  "contact.h2": "Contact",
  "contact.email": "Email"
}
/i18n/en.json

json
복사
편집
{
  "nav.about": "About",
  "nav.projects": "Projects",
  "nav.skills": "Skills",
  "nav.contact": "Contact",
  "hero.title": "Game AI & Simulation Engineer",
  "hero.sub": "Unity · LLM · Real-time Systems",
  "cta.viewProjects": "View Projects",
  "cta.resume": "Resume",
  "about.h2": "About",
  "about.body": "Game AI/Simulation engineer focusing on LLM-driven agents, event systems, and performance.",
  "projects.h2": "Projects",
  "skills.h2": "Skills",
  "contact.h2": "Contact",
  "contact.email": "Email"
}
9) Sample projects data (inline in scripts.js)
js
복사
편집
window.PROJECTS = [
  {
    id: "crypto-sim",
    title: "Crypto Sim — Market Manipulation Strategy Game",
    tags: ["Unity","LLM","Simulation"],
    thumb: "assets/hero-slide2.png",
    href: "project-crypto-sim.html"
  },
  {
    id: "unity-ollama",
    title: "Unity ↔ Ollama Integration Package",
    tags: ["C#","LLM","Editor Tools"],
    thumb: "assets/hero-slide3.png",
    href: "project-unity-ollama.html"
  }
];
10) Nav & hero requirements
Nav: sticky at top, brand left, anchors right. On mobile ≤760px, collapse to hamburger.

Hero: left = title/sub/CTAs; right = media.

Phase 4 replaces hero image with a slideshow cycling every 6–8s, manual next/prev, pause on hover, and prefers-reduced-motion honored.

11) Error handling & idempotency
All tasks must be idempotent: running them twice should yield same tree.

Always create parent dirs before files.

Overwrite text files fully; no partial patches.

For binary placeholders, create zero-byte files if missing; never inline binary.

12) Branch & permissions assumptions
Target branch: main. If missing, create README.md to initialize.

If branch protection prevents direct writes, open a PR to main with the exact file diffs.

13) Commit conventions
Squash‐friendly messages, e.g.:

feat(scaffold): add initial pages & i18n

feat(projects): wire case study template

fix(a11y): improve focus outlines

docs: add EDITING.md

14) Do / Don’t (quick rules)
✅ Keep assets local under /assets/.

✅ Use semantic HTML and alt text.

✅ Keep CSS < 400 lines; avoid magic numbers.

❌ No external JS/CSS CDNs.

❌ No base64 images.

❌ No framework scaffolds (React/Vue/Next/etc.).

15) Verification checklist (agent should self-check)
 GitHub Pages loads /index.html on https://<user>.github.io.

 Language toggle switches every visible string; persists across reloads.

 Projects grid renders from window.PROJECTS.

 A sample project page opens and contains all required sections.

 Console clean; no 404s for assets.

 Tab/keyboard navigation reaches all interactive elements.

optional: “first task” block (you can paste under agent.md to kick off)
Task 1 — Phase 1 Scaffold

Create/overwrite the files listed in File layout, inserting minimal content that satisfies sections and anchors.

Add zero-byte placeholders for /assets/avatar.png and /assets/resume.pdf.

Include /EDITING.md summarizing how to edit text, images, projects, and translations.

Do not add slides yet (they come in Phase 4).
