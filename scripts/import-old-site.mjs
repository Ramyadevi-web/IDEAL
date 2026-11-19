#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────
//  Copies photos, PDFs and page images from the OLD website
//  (the HTTrack copy on your computer) into this project.
//
//  Usage (from the project folder):
//    npm run import-old-site -- "C:\Users\Lenovo\OneDrive\Documents\IDEAL\www.ideal-school.in"
//
//  Options:
//    --force   overwrite albums that already have photos
//    --dry     only show what would be copied
// ─────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const force = args.includes('--force');
const dry = args.includes('--dry');
let mirror = args.find((a) => !a.startsWith('--'));

if (!mirror) {
  console.error('\n  Please give the path to the old site folder, e.g.\n  npm run import-old-site -- "C:\\Users\\Lenovo\\OneDrive\\Documents\\IDEAL\\www.ideal-school.in"\n');
  process.exit(1);
}
if (fs.existsSync(path.join(mirror, 'www.ideal-school.in'))) mirror = path.join(mirror, 'www.ideal-school.in');
if (!fs.existsSync(mirror)) {
  console.error(`\n  Folder not found: ${mirror}\n`);
  process.exit(1);
}

const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const albumsDir = path.join(project, 'src', 'assets', 'albums');
const publicDir = path.join(project, 'public');

// Old page name prefix → new album folder
const galleryPages = {
  annual: 'gallery/cultural-feat',
  juniorolympics: 'gallery/junior-olympics',
  expo: 'gallery/edu-concrete-expo',
  club: 'gallery/club-activity',
  kid: 'gallery/kids-activities',
  comp: 'gallery/competition',
  fun: 'gallery/celebrations',
  house: 'gallery/house-activities',
  star: 'gallery/star-of-the-week',
  gp: 'gallery/grandparents-day',
  ind: 'gallery/independence-day',
  rep: 'gallery/republic-day',
  teacher: 'gallery/teachers-day',
  child: 'gallery/childrens-day',
  graduation: 'gallery/graduation-day',
  xmas: 'gallery/christmas',
  cca: 'gallery/cca',
  fieldtrip: 'field-trip',
  achieve: 'achievements',
};
const years = ['2025-26', '2024-25', '2023-24', '2022-23', '2021-22', '2020-21', '2019-20', '2018-19', '2017-18', '2016-17'];

const pdfs = [
  'MandatoryDisclosureDetails.pdf', 'ExtensionAffiliation.pdf', 'feestructure.pdf', 'AcademicCalendar.pdf',
  'BUILDINGSAFETYCERTIFICATE.pdf', 'fireandsafetycertificate.pdf', 'TrustRegistration.pdf', 'noc.pdf',
  'sanitarycertificate.pdf', 'DEOcertificate.pdf', 'CertificateofRecognition.pdf', 'smc.pdf',
];

const pageImages = [
  ['images/ideal25.jpg', 'images/pages/ideal25.jpg'],
  ['images/ideal26.jpg', 'images/pages/ideal26.jpg'],
  ['images/Admission.jpg', 'images/pages/Admission.jpg'],
  ['images/gallery/ideal01.jpg', 'images/infrastructure/ideal01.jpg'],
  ...['001', '002', '003', '004', '005', '006'].map((n) => [`images/gallery/ideal${n}.jpg`, `images/infrastructure/ideal${n}.jpg`]),
  ...[1, 2, 3, 4, 5].map((n) => [`images/infra/ideal${n}.jpg`, `images/infra/ideal${n}.jpg`]),
];

const stats = { albums: 0, photos: 0, skipped: 0, missing: 0, files: 0 };
const isImage = (p) => /\.(jpe?g|png|webp|gif)$/i.test(p);

function copy(src, dest) {
  if (dry) return;
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function resolveAsset(htmlFile, ref) {
  const clean = decodeURIComponent(ref.split('?')[0]).replace(/\\/g, '/');
  if (/^https?:/i.test(clean)) {
    const m = clean.match(/ideal-school\.in\/(.+)$/i);
    return m ? path.join(mirror, m[1]) : null;
  }
  return path.resolve(path.dirname(htmlFile), clean);
}

function photosInPage(htmlFile) {
  const html = fs.readFileSync(htmlFile, 'utf8');
  const found = [];
  const re = /<img\b[^>]*>/gi;
  let m;
  while ((m = re.exec(html))) {
    const tag = m[0];
    if (!/img-fullwidth|gallery|thumb/i.test(tag) && !/gallery-item|thumb/i.test(html.slice(Math.max(0, m.index - 300), m.index))) continue;
    const src = (tag.match(/\bsrc\s*=\s*["']([^"']+)["']/i) || [])[1];
    if (!src || !isImage(src) || /placehold|title-dots|logo|newgif/i.test(src)) continue;
    if (!found.includes(src)) found.push(src);
  }
  return found;
}

console.log(`\nOld site: ${mirror}\nProject : ${project}${dry ? '\n(dry run — nothing will be copied)' : ''}\n`);

// 1. Albums
for (const [prefix, folder] of Object.entries(galleryPages)) {
  for (const y of years) {
    const page = ['.html', '.php', '.htm'].map((ext) => path.join(mirror, `${prefix}${y}${ext}`)).find((p) => fs.existsSync(p));
    if (!page) continue;
    const dest = path.join(albumsDir, folder, y);
    const existing = fs.existsSync(dest) ? fs.readdirSync(dest).filter(isImage) : [];
    if (existing.length && !force) {
      console.log(`  • ${folder}/${y}: already has ${existing.length} photos — skipped (use --force to replace)`);
      stats.skipped++;
      continue;
    }
    const refs = photosInPage(page);
    let n = 0;
    refs.forEach((ref) => {
      const src = resolveAsset(page, ref);
      if (!src || !fs.existsSync(src) || fs.statSync(src).size < 2000) {
        stats.missing++;
        return;
      }
      n++;
      copy(src, path.join(dest, `${String(n).padStart(2, '0')}${path.extname(src).toLowerCase()}`));
    });
    if (n) {
      stats.albums++;
      stats.photos += n;
      console.log(`  ✓ ${folder}/${y}: ${n} photos`);
    } else {
      console.log(`  – ${folder}/${y}: no photos found in ${path.basename(page)}`);
    }
  }
}

// 2. PDFs → public/docs
console.log('');
for (const name of pdfs) {
  const candidates = [path.join(mirror, 'images', name), path.join(mirror, name)];
  const src = candidates.find((p) => fs.existsSync(p));
  if (src) {
    copy(src, path.join(publicDir, 'docs', name));
    stats.files++;
    console.log(`  ✓ docs/${name}`);
  } else console.log(`  ✗ ${name} not found`);
}

// 3. Page images
console.log('');
for (const [from, to] of pageImages) {
  const src = path.join(mirror, from);
  if (fs.existsSync(src) && fs.statSync(src).size > 2000) {
    copy(src, path.join(publicDir, to));
    stats.files++;
    console.log(`  ✓ public/${to}`);
  } else console.log(`  ✗ ${from} not found`);
}

console.log(`\nDone: ${stats.photos} photos in ${stats.albums} albums, ${stats.files} other files.` +
  (stats.skipped ? ` ${stats.skipped} albums skipped (already filled).` : '') +
  (stats.missing ? ` ${stats.missing} photos were missing on the old site (broken links).` : '') +
  '\nRun `npm run dev` to see them.\n');
