import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Icon from './Icon';
import Img from './Img';
import SmartLink from './SmartLink';
import SplitWords from './SplitWords';
import { about, stats, school } from '../data/content';

export function About() {
  return (
    <section id="about" className="section">
      <div className="wrap grid-2">
        <div className="collage">
          <Img className="collage__big" src={about.images[0]} alt="Young students reading picture books together" data-clip />
          <Img src={about.images[1]} alt="A student working at a computer in the ICT lab" data-clip />
          <Img src={about.images[2]} alt="Two students playing chess" data-clip />
          <div className="collage__badge" data-reveal="zoom">
            <strong>{school.established}</strong>
            <span>Established</span>
          </div>
        </div>

        <div>
          <div className="eyebrow" data-reveal>{about.eyebrow}</div>
          <SplitWords text={about.title} className="h2" />
          <p className="lead" data-reveal>{about.text}</p>
          <div className="quote-box" data-reveal>
            <Icon name="quote" size={30} className="quote-icon" />
            <p>{about.quote}</p>
          </div>
          <div className="btn-row" data-reveal>
            <SmartLink to="/about" className="btn btn--navy">More about us</SmartLink>
            <SmartLink to="/academics/curriculum" className="btn btn--outline">Our curriculum</SmartLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Stats() {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.utils.toArray('[data-count]').forEach((el) => {
        const target = Number(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          onUpdate: () => { el.textContent = Math.round(obj.v) + suffix; },
        });
      });
      gsap.to('.stats__ring', { rotate: 360, duration: 60, repeat: -1, ease: 'none' });
    },
    { scope: root }
  );

  return (
    <section className="stats" ref={root} aria-label="School highlights">
      <div className="stats__ring" style={{ width: 520, height: 520, right: -160, top: -220 }} aria-hidden="true" />
      <div className="stats__ring" style={{ width: 320, height: 320, left: -120, bottom: -160 }} aria-hidden="true" />
      <div className="wrap" data-stagger>
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            {'count' in s ? (
              <div className="stat__value" data-count={s.count} data-suffix={s.suffix || ''}>
                {s.count}{s.suffix}
              </div>
            ) : (
              <div className="stat__value">{s.text}</div>
            )}
            <div className="stat__label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
