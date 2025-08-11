# Editing Guide

## Text
All copy is stored in the JSON files inside `/i18n/`. Edit both `ko.json` and `en.json` with matching keys.

## Images
Replace files in `/assets/` with new ones of the same name (e.g., `avatar.png`, `hero-slide1.png`). The layout will pick them up automatically.

## Projects
1. Duplicate `project-template.html` and rename (e.g., `project-new.html`).
2. Add translations for the new project's text in `/i18n/` files.
3. Add an entry to `window.PROJECTS` in `scripts.js` with the translation key, tags, thumbnail, and link.

## Resume
Replace `/assets/resume.pdf` with your PDF resume using the same filename.

## Translations
Each text element uses `data-i18n="key"`. Ensure the key exists in both JSON files. Language selection persists via `localStorage` and can be forced with a `?lang=` URL parameter.
