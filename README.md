# Ideal School CBSE — React + GSAP website

Multi-page, fully responsive website for **Ideal School CBSE, Mayiladuthurai** — React 18, React Router, Vite and GSAP (ScrollTrigger).

## 1. Run it

```bash
npm install
npm run dev        # http://localhost:5173
```

## 2. Bring in the old site's photos & PDFs (one command)

Point the import script at your HTTrack copy of the old site:

```bash
npm run import-old-site -- "C:\Users\Lenovo\OneDrive\Documents\IDEAL\www.ideal-school.in"
```

It copies automatically:

| From the old site | Into this project |
|---|---|
| Every Gallery album page (Cultural Feat, Junior Olympics, … each year) | `src/assets/albums/gallery/<album>/<year>/` |
| Field Trip pages (2025-26 … 2017-18) | `src/assets/albums/field-trip/<year>/` |
| Achievements pages | `src/assets/albums/achievements/<year>/` |
| 12 certificate PDFs | `public/docs/` |
| Curriculum / CCA / Admission photos | `public/images/pages/` |
| Infrastructure photos | `public/images/infrastructure/`, `public/images/infra/` |

Albums that already have photos are skipped (add `--force` to replace, `--dry` to preview).
Photos that were broken links on the old site are reported and skipped.

**Adding photos later:** just drop images into the album folder (e.g. `src/assets/albums/gallery/celebrations/2025-26/`). They appear automatically, sorted by file name. An empty album shows a friendly "Photos coming soon" card.

**Leader photos:** `public/images/leaders/principal.jpg` and `chairman.jpg` (initials show until added).

## 3. Build & upload

```bash
npm run build      # creates /dist
```

Upload **everything inside `dist/`** to the hosting `public_html`. The included `.htaccess` makes page refreshes work on Apache/cPanel (e.g. `/gallery/cca/2023-24`). Old addresses like `/curriculum.php` redirect to the new pages.

## Pages

| Menu | Page | Route |
|---|---|---|
| About Us | About the school · Chairman’s Message · Principal’s Message · Vision and Mission | `/about`, `/about/chairman`, `/about/principal`, `/about/vision-mission` |
| Academics | Curriculum · Timings · CCA · Certificates (12 PDFs) | `/academics/...` |
| Achievements | 2024-25 · 2022-23 · 2017-18 | `/achievements/:year` |
| Infrastructure | Facilities + campus photos | `/infrastructure` |
| Gallery | Mega menu → 17 albums × years | `/gallery`, `/gallery/:album/:year` |
| Field Trip | 2025-26 · 2024-25 · 2023-24 · 2022-23 · 2017-18 | `/field-trip/:year` |
| Admissions | Steps, procedure, documents, outcomes, enquiry form | `/admissions` |
| Contact · Feedback · Job Enquiry | Forms (WhatsApp / email, no server needed) | `/contact`, `/feedback`, `/job-enquiry` |

## Where to edit

| What | File |
|---|---|
| **All text, timings, menus, album list, PDFs** | `src/data/content.js` |
| Meeting / office times (used everywhere) | `timings` in `content.js` |
| Colours, fonts | top of `src/index.css` |
| Menu, dropdown & page styles | `src/pages.css` |
| Scroll animations | `src/hooks/useScrollAnimations.js` |

Brand colours (from the logo): navy `#2f2e63`, green `#95c22b`, crimson `#d72056`, purple `#962983`.

## Animations (GSAP)

`data-reveal` (`left` / `right` / `zoom`), `data-stagger`, `data-clip`, `data-parallax`, `<SplitWords>` headings — plus the hero slider, page banners, I-D-E-A-L letters dropping in, counters, the admission progress line, dropdown/accordion motion, gallery transitions and the WhatsApp pop-up. All motion switches off for visitors who prefer reduced motion.

## Still to confirm

- Teacher meeting day — `timings.teacher` says *2nd & 4th Saturday* (old site said 1st & 2nd).
- Web Mail address — `school.webmail`.
- Campus tour YouTube link — `school.campusTourUrl`.
- Job Enquiry sends by email (the applicant attaches the CV). For direct uploads, connect a form service such as Formspree later.
- Real parent testimonials (section stays hidden until added).
