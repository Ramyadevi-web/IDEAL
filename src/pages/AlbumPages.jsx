import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Page from '../components/Page';
import Icon from '../components/Icon';
import SplitWords from '../components/SplitWords';
import SmartLink from '../components/SmartLink';
import PhotoGrid, { EmptyAlbum } from '../components/PhotoGrid';
import { getAlbum } from '../data/albums';
import { galleryCategories, fieldTripYears, achievementYears, albumNotes } from '../data/content';

/** First year that actually has photos (falls back to the newest year) */
function pickYear(base, years) {
  return years.find((y) => getAlbum(`${base}/${y}`).length) || years[0];
}

function YearTabs({ base, years, current, label }) {
  return (
    <nav className="year-tabs" aria-label={`${label} — choose year`}>
      {years.map((y) => {
        const n = getAlbum(`${base}/${y}`).length;
        return (
          <SmartLink key={y} to={`/${base}/${y}`} className={y === current ? 'is-active' : ''} aria-current={y === current ? 'page' : undefined}>
            {y}{n ? <span style={{ opacity: 0.6, marginLeft: 6, fontSize: 12 }}>{n}</span> : null}
          </SmartLink>
        );
      })}
    </nav>
  );
}

function AlbumBody({ folder, title, label }) {
  const photos = getAlbum(folder, label);
  const note = albumNotes[folder];
  return (
    <>
      {note && <p className="album-note" data-reveal>{note}</p>}
      {photos.length ? <PhotoGrid photos={photos} animKey={folder} /> : <EmptyAlbum folder={folder} />}
    </>
  );
}

/* ─────────────  /gallery  ───────────── */
export function GalleryIndex() {
  return (
    <Page title="Gallery" hero={{ title: 'Photo Gallery', eyebrow: 'Life at Ideal', text: 'Celebrations, competitions, clubs and the little moments that make our school special.', crumbs: [] }}>
      <section className="section" style={{ paddingTop: 72 }}>
        <div className="wrap">
          <div className="album-cards" data-stagger>
            {galleryCategories.map((c) => {
              const year = pickYear(`gallery/${c.slug}`, c.years);
              const photos = getAlbum(`gallery/${c.slug}/${year}`);
              const total = c.years.reduce((s, y) => s + getAlbum(`gallery/${c.slug}/${y}`).length, 0);
              return (
                <SmartLink key={c.slug} to={`/gallery/${c.slug}`} className="album-card">
                  {photos[0] ? (
                    <div className="album-card__img"><img src={photos[0].src} alt="" loading="lazy" /></div>
                  ) : (
                    <div className="album-card__pattern" />
                  )}
                  <div className="album-card__shade" />
                  <div className="album-card__body">
                    <div className="album-card__name">{c.label}</div>
                    <div className="album-card__meta">{total ? `${total} photos` : 'Photos coming soon'}</div>
                    <div className="album-card__years">{c.years.map((y) => <span key={y}>{y}</span>)}</div>
                  </div>
                </SmartLink>
              );
            })}
          </div>

          <div className="meet" data-reveal style={{ marginTop: 40 }}>
            <span className="meet__icon"><Icon name="image" size={22} /></span>
            <p><strong>Looking for field trips or achievements?</strong> They have their own albums.</p>
            <SmartLink to={`/field-trip/${fieldTripYears[0]}`} className="btn btn--outline">Field trips</SmartLink>
            <SmartLink to={`/achievements/${achievementYears[0]}`} className="btn btn--navy">Achievements</SmartLink>
          </div>
        </div>
      </section>
    </Page>
  );
}

/* ─────────────  /gallery/:cat/:year  ───────────── */
export function GalleryAlbum() {
  const { cat, year } = useParams();
  const navigate = useNavigate();
  const category = galleryCategories.find((c) => c.slug === cat);
  if (!category) return <Navigate to="/gallery" replace />;
  const current = year && category.years.includes(year) ? year : null;
  if (!current) return <Navigate to={`/gallery/${cat}/${pickYear(`gallery/${cat}`, category.years)}`} replace />;
  const folder = `gallery/${cat}/${current}`;

  return (
    <Page title={`${category.label} ${current}`} hero={{ title: category.label, eyebrow: `Gallery · ${current}`, crumbs: [{ label: 'Gallery', to: '/gallery' }] }}>
      <section className="section" style={{ paddingTop: 64 }}>
        <div className="wrap album-layout">
          <aside className="album-side" aria-label="Albums">
            <div className="album-side__title">Albums</div>
            {galleryCategories.map((c) => (
              <SmartLink key={c.slug} to={`/gallery/${c.slug}`} className={c.slug === cat ? 'is-active' : ''}>
                {c.label}
                <small>{c.years.length} yrs</small>
              </SmartLink>
            ))}
          </aside>

          <div>
            <label className="album-select">
              Choose an album
              <select value={cat} onChange={(e) => navigate(`/gallery/${e.target.value}`)}>
                {galleryCategories.map((c) => <option key={c.slug} value={c.slug}>{c.label}</option>)}
              </select>
            </label>
            <div className="album-head">
              <h2>{category.label} <span style={{ color: 'var(--crimson)' }}>{current}</span></h2>
              <YearTabs base={`gallery/${cat}`} years={category.years} current={current} label={category.label} />
            </div>
            <AlbumBody folder={folder} title={category.label} label={`${category.label} ${current}`} />
          </div>
        </div>
      </section>
    </Page>
  );
}

/* ─────────────  /field-trip/:year and /achievements/:year  ───────────── */
function YearAlbumPage({ base, title, eyebrow, text, years }) {
  const { year } = useParams();
  if (!year || !years.includes(year)) return <Navigate to={`/${base}/${pickYear(base, years)}`} replace />;
  const folder = `${base}/${year}`;

  return (
    <Page title={`${title} ${year}`} hero={{ title, eyebrow: `${eyebrow} · ${year}`, text, crumbs: [] }}>
      <section className="section" style={{ paddingTop: 64 }}>
        <div className="wrap">
          <div className="album-head">
            <div>
              <div className="eyebrow" data-reveal>Academic year</div>
              <SplitWords text={`${title} ${year}`} className="h2" />
            </div>
            <YearTabs base={base} years={years} current={year} label={title} />
          </div>
          <AlbumBody folder={folder} title={title} label={`${title} ${year}`} />
        </div>
      </section>
    </Page>
  );
}

export function FieldTrip() {
  return (
    <YearAlbumPage
      base="field-trip"
      title="Field Trip"
      eyebrow="Learning outside the classroom"
      text="Real-world visits that turn lessons into lasting experiences."
      years={fieldTripYears}
    />
  );
}

export function Achievements() {
  return (
    <YearAlbumPage
      base="achievements"
      title="Achievements"
      eyebrow="Proud moments"
      text="Celebrating the awards, medals and milestones of our students."
      years={achievementYears}
    />
  );
}
