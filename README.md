# Coresight Digital — website

Static site. No build step, no dependencies, no framework. Every page is plain HTML that loads one stylesheet and one script.

```
site/
├── index.html                  Home
├── services.html               Services hub
├── service-*.html              5 service pages
├── work.html                   Work index (filterable)
├── case-*.html                 3 case studies
├── about.html
├── contact.html                3-field form + WhatsApp
├── thank-you.html              noindex
├── privacy.html
├── css/site.css                all styles (design-system tokens inlined)
├── js/site.js                  nav, scroll reveal, FAQ, filter — 2.5 KB
├── assets/                     logo lockups, textures, motif cutouts
├── vercel.json  robots.txt  sitemap.xml
```

## Run it locally

Open `index.html` in a browser. That's it. Or serve it:

```bash
cd site
python3 -m http.server 8000     # then open http://localhost:8000
```

## Deploy — GitHub + Vercel

1. **Push to GitHub**

```bash
cd site
git init
git add .
git commit -m "Coresight Digital website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/coresight-website.git
git push -u origin main
```

2. **Vercel** → *Add New Project* → import the repo. Leave everything at the defaults:
   - Framework Preset: **Other**
   - Build Command: *(empty)*
   - Output Directory: *(empty / leave as root)*

   Press Deploy. Live in about 20 seconds.

If you push the whole design-system project instead of just this folder, set Vercel's **Root Directory** to `site`.

3. **Custom domain** — Vercel → Project → Settings → Domains → add `coresightdigital.com`, then point the DNS records Vercel shows you at your registrar.

## Before you go live — checklist

- [ ] **Search & replace `YOUR-DOMAIN.com`** in `robots.txt` and `sitemap.xml`.
- [ ] **Wire the contact form.** Right now it redirects to `thank-you.html` without sending anything. Pick one:
  - **Formspree** — sign up, then add the endpoint to the form tag:
    `<form class="form" data-lead method="post" action="https://formspree.io/f/YOUR_ID">`
    The script detects the `action` and lets the browser post it normally.
  - **Vercel Forms / a serverless function** — same idea, different endpoint.
  - **Or delete the form** and lean on WhatsApp only. In Pakistan that converts better anyway.
- [ ] **Replace every "Figure pending export".** Case studies and result blocks are deliberately empty — only real Meta Ads Manager / Google Ads / GA4 exports go in. Grep for `pending export`.
- [ ] **Replace the placeholder client names** ("Karachi bakery chain", "Private dental clinic", "Independent apparel label") and the "Creative to be placed" / "Portrait" boxes with real work and team photos.
- [ ] **Confirm the email address** — `hello@coresightdigital.com` is a guess.
- [ ] **Convert the textures to WebP.** `assets/texture-paper.png` is full-bleed and is your biggest payload. Then update the two `url()` lines at the top of `css/site.css`.
- [ ] **Add analytics** — GA4 snippet in each `<head>`, plus the Meta pixel if you're running ads. Fire the conversion event on `thank-you.html`.
- [ ] **Fonts** are loaded from Google Fonts (Archivo, Playfair Display, Cormorant Garamond) as the nearest match to the brand. If you have the licensed originals, self-host them and swap the `@import` at the top of `css/site.css`.

## Logo files

| File | Where it's used |
|---|---|
| `assets/logo.png` | Header — horizontal lockup, mark + wordmark |
| `assets/logo-light.png` | Footer — the same lockup in white |
| `assets/logo-mark.png` | Favicon and the page-load animation |
| `assets/logo-wordmark.png` | Spare, for when the mark is already on screen |

## What's wired already

- Mobile-first, 320px up. Sticky header shrinks on scroll; burger menu with animated bars.
- Page-load animation: cream screen with the rotating brand mark and a sweeping maroon bar, cleared on `load` with a 420ms floor so it never flashes, plus a 3s hard safety net if an asset stalls.
- Scroll-reveal animations with stagger, honouring `prefers-reduced-motion`.
- FAQ accordions, work filter chips, services dropdown (hover + keyboard focus).
- Sticky WhatsApp button on every page — collapses to a circle under 520px, gentle pulse after 2s.
- 44px minimum tap targets, 16px form inputs (stops iOS zoom-on-focus), `env(safe-area-inset-bottom)` respected.
- Semantic headings, `aria-expanded` on every toggle, focus-visible rings.
