import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Icon from './Icon';
import Img from './Img';
import SplitWords from './SplitWords';
import SmartLink from './SmartLink';
import { Lightbox } from './PhotoGrid';
import { getAlbum } from '../data/albums';
import { infrastructure, school, fieldTripYears } from '../data/content';

const campusLife = [
  { src: '/images/slider/slider3.jpg', alt: 'Students playing basketball on the school court' },
  { src: '/images/slider/slider2.jpg', alt: 'Kindergarten children with paper flower crafts at the play area' },
  { src: '/images/slider/slider1.jpg', alt: 'A young student reading in the library' },
  { src: '/images/about/ideal24.jpg', alt: 'Two students playing chess' },
  { src: '/images/about/ideal23.jpg', alt: 'A student working in the computer lab' },
];

function homeAlbums() {
  const trips = fieldTripYears
    .map((y) => ({ label: `Field Trip ${y}`, photos: getAlbum(`field-trip/${y}`, `Field trip ${y}`) }))
    .filter((a) => a.photos.length)
    .slice(0, 3);
  return [{ label: 'Campus Life', photos: campusLife }, ...trips];
}

export function Infrastructure() {
  const tourHref = school.campusTourUrl || school.social.youtube || '#tour';
  const external = tourHref.startsWith('http');

  return (
    <section id="infrastructure" className="section">
      <div className="wrap">
        <div className="section-head section-head--center">
          <div className="eyebrow" data-reveal>Our infrastructure</div>
          <SplitWords text="Spaces designed for curious minds" className="h2" />
        </div>

        <div className="infra" data-stagger>
          {infrastructure.map((it) => (
            <article className="infra__card" key={it.title}>
              <Img src={it.image} alt={it.title} label={`${it.title} photo`} />
              <div className="infra__body">
                <div className="infra__title">{it.title}</div>
                <p className="infra__text">{it.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="center-actions" data-reveal style={{ marginTop: 36 }}>
          <SmartLink to="/infrastructure" className="btn btn--outline">See all facilities</SmartLink>
        </div>

        <div id="tour" className="tour" data-reveal="zoom">
          <Img src="/images/slider/slider3.jpg" alt="" data-parallax="0.12" />
          <div className="tour__shade" />
          <div className="tour__content">
            <a
              href={tourHref}
              className="tour__play"
              aria-label="Watch the campus tour video"
              {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              <Icon name="play" size={32} />
            </a>
            <h3 className="tour__title">Take a virtual campus tour</h3>
            <div className="tour__sub">Walk through our classrooms, labs, library and play areas</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Gallery() {
  const gallery = homeAlbums();
  const [tab, setTab] = useState(0);
  const [viewer, setViewer] = useState(-1);
  const grid = useRef(null);
  const photos = gallery[tab].photos;
  const shown = photos.slice(0, 4);
  const extra = photos.length - shown.length;

  useGSAP(
    () => {
      gsap.fromTo(
        grid.current.children,
        { autoAlpha: 0, y: 40, scale: 0.96 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out' }
      );
    },
    { scope: grid, dependencies: [tab] }
  );

  const move = (d) => setViewer((v) => (v + d + photos.length) % photos.length);

  return (
    <section id="gallery" className="section section--alt">
      <div className="wrap">
        <div className="section-head section-head--row">
          <div style={{ maxWidth: 640 }}>
            <div className="eyebrow" data-reveal>Life at Ideal</div>
            <SplitWords text="Moments from our campus" className="h2" />
          </div>
          <div className="tabs" role="tablist" aria-label="Gallery albums" data-reveal>
            {gallery.map((g, i) => (
              <button
                key={g.label}
                type="button"
                role="tab"
                aria-selected={tab === i}
                className={`tab ${tab === i ? 'is-active' : ''}`}
                onClick={() => setTab(i)}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        <div className="gallery" ref={grid} role="tabpanel" aria-label={gallery[tab].label}>
          {shown.map((p, i) => (
            <button
              type="button"
              key={`${tab}-${p.src}`}
              className="gallery__item img-box"
              onClick={() => setViewer(i)}
              aria-label={`Open photo: ${p.alt}`}
              style={{ position: 'relative' }}
            >
              <Img src={p.src} alt={p.alt} label={`${gallery[tab].label} photo ${i + 1}`} style={{ position: 'absolute', inset: 0 }} />
              {i === shown.length - 1 && extra > 0 && (
                <span style={{ position: 'absolute', inset: 0, background: 'rgba(20,19,49,.55)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--serif)', fontSize: 30, fontWeight: 600 }}>
                  +{extra} more
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="gallery__more" data-reveal>
          <SmartLink to="/gallery" className="btn btn--navy">Open full gallery</SmartLink>
        </div>
      </div>

      {viewer > -1 && <Lightbox photos={photos} index={viewer} onClose={() => setViewer(-1)} onMove={move} />}
    </section>
  );
}
