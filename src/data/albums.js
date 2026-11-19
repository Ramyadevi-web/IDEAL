// ─────────────────────────────────────────────────────────────
//  PHOTO ALBUMS — loaded automatically.
//  Just drop photos into:
//     src/assets/albums/gallery/<category-slug>/<year>/      e.g. gallery/cultural-feat/2024-25/
//     src/assets/albums/field-trip/<year>/                   e.g. field-trip/2025-26/
//     src/assets/albums/achievements/<year>/                 e.g. achievements/2024-25/
//  Files are shown in name order (01.jpg, 02.jpg …). No code changes needed.
//  Tip: `npm run import-old-site` copies everything from the old site for you.
// ─────────────────────────────────────────────────────────────

const files = import.meta.glob('/src/assets/albums/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const ROOT = '/src/assets/albums/';

const all = Object.entries(files)
  .map(([path, url]) => ({ path: path.slice(ROOT.length), url }))
  .sort((a, b) => a.path.localeCompare(b.path, undefined, { numeric: true }));

/** Photos inside one album folder, e.g. getAlbum('field-trip/2025-26') */
export function getAlbum(folder, label = 'Photo') {
  const prefix = folder.replace(/\/$/, '') + '/';
  return all
    .filter((f) => f.path.startsWith(prefix) && !f.path.slice(prefix.length).includes('/'))
    .map((f, i) => ({ src: f.url, alt: `${label} — photo ${i + 1}` }));
}

export function countAlbum(folder) {
  return getAlbum(folder).length;
}
