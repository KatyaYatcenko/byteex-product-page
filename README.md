# Byteex — product page (React + Vite + Contentful)

```bash
npm install
npm run dev        # http://localhost:5173
npm run build
```

## Headless CMS (Contentful)
1. Create a space and a content type with API id `productPage` (JSON fields: `hero`, `features`, `story`, `comfort`, `fans`, `faq`, `impact`, `find`, plus `promo`, `cta`, `badges`).
2. Paste the structure from `src/content.json` into one entry and publish it.
3. Copy `.env.example` to `.env`, fill `VITE_CF_SPACE_ID` and `VITE_CF_TOKEN` (Content Delivery API token).
Without env vars the page falls back to `src/content.json`.

## Git
```bash
git init && git checkout -b main
git add package.json vite.config.js index.html .gitignore && git commit -m "chore: scaffold Vite + React"
git add src/styles.css public && git commit -m "style: base styles and optimized images"
git add src/cms.js src/content.json .env.example && git commit -m "feat: Contentful data layer with local fallback"
git add src/App.jsx src/main.jsx && git commit -m "feat: build product page sections"
git add README.md && git commit -m "docs: add README"
git remote add origin <your-repo-url> && git push -u origin main
```
