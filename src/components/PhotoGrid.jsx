import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Icon from './Icon';

export function Lightbox({ photos, index, onClose, onMove }) {
  const box = useRef(null);
  const photo = photos[index];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onMove(1);
      if (e.key === 'ArrowLeft') onMove(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onMove]);

  useGSAP(() => {
    gsap.from(box.current, { autoAlpha: 0, duration: 0.35 });
  }, { scope: box });

  useGSAP(() => {
    gsap.from(box.current.querySelector('img'), { scale: 0.92, autoAlpha: 0, duration: 0.5, ease: 'power3.out' });
  }, { scope: box, dependencies: [index] });

  const navBtn = { position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: 52, height: 52, borderRadius: '50%', border: 0, background: 'rgba(255,255,255,.12)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' };

  return (
    <div className="lightbox" ref={box} role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={onClose}>
      <img
        key={photo.src}
        src={photo.src}
        alt={photo.alt}
        onClick={(e) => e.stopPropagation()}
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
      <button type="button" className="lightbox__close" aria-label="Close" onClick={onClose}><Icon name="close" size={22} /></button>
      {photos.length > 1 && (
        <>
          <button type="button" aria-label="Previous photo" style={{ ...navBtn, left: 16 }} onClick={(e) => { e.stopPropagation(); onMove(-1); }}>
            <span style={{ transform: 'rotate(180deg)', display: 'flex' }}><Icon name="arrow" size={22} /></span>
          </button>
          <button type="button" aria-label="Next photo" style={{ ...navBtn, right: 16 }} onClick={(e) => { e.stopPropagation(); onMove(1); }}>
            <Icon name="arrow" size={22} />
          </button>
        </>
      )}
      <div className="lightbox__cap">{photo.alt} · {index + 1} / {photos.length}</div>
    </div>
  );
}

/** Photo grid with entrance animation + lightbox. Re-animates when `animKey` changes. */
export default function PhotoGrid({ photos, animKey, wide = false }) {
  const [viewer, setViewer] = useState(-1);
  const grid = useRef(null);

  useGSAP(
    () => {
      if (!grid.current) return;
      gsap.fromTo(
        grid.current.children,
        { autoAlpha: 0, y: 40, scale: 0.95 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.05, ease: 'power3.out', clearProps: 'transform' }
      );
    },
    { scope: grid, dependencies: [animKey] }
  );

  const move = (d) => setViewer((v) => (v + d + photos.length) % photos.length);

  return (
    <>
      <div className={`photo-grid ${wide ? 'photo-grid--wide' : ''}`} ref={grid}>
        {photos.map((p, i) => (
          <button type="button" key={p.src} className="photo-grid__item" onClick={() => setViewer(i)} aria-label={`Open ${p.alt}`}>
            <img src={p.src} alt={p.alt} loading="lazy" decoding="async" />
          </button>
        ))}
      </div>
      {viewer > -1 && <Lightbox photos={photos} index={viewer} onClose={() => setViewer(-1)} onMove={move} />}
    </>
  );
}

export function EmptyAlbum({ folder }) {
  return (
    <div className="empty">
      <div className="empty__icon"><Icon name="image" size={30} /></div>
      <h3>Photos coming soon</h3>
      <p>We’re adding the photos for this album. Please check back shortly.</p>
      {import.meta.env.DEV && (
        <p style={{ marginTop: 12, fontSize: 13 }}>
          <strong>Developer note:</strong> add images to <code>src/assets/albums/{folder}/</code>
        </p>
      )}
    </div>
  );
}
