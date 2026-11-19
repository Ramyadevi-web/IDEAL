import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Icon from './Icon';
import SmartLink from './SmartLink';
import { slides, school, quickFacts } from '../data/content';

const SLIDE_SECONDS = 6.5;
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const root = useRef(null);
  const slide = slides[index];

  // Runs on every slide change: Ken Burns zoom, text entrance, progress bar
  useGSAP(
    () => {
      const next = () => setIndex((i) => (i + 1) % slides.length);
      const activeImg = root.current.querySelector('.hero__img.is-active img');
      const bar = root.current.querySelectorAll('.hero__dot i')[index];

      gsap.set('.hero__dot i', { scaleX: 0 });

      if (reduced()) {
        gsap.delayedCall(SLIDE_SECONDS, next);
        return;
      }

      gsap.fromTo(activeImg, { scale: 1.18 }, { scale: 1.02, duration: SLIDE_SECONDS + 1.5, ease: 'power1.out' });

      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('.hero__kicker', { y: 20, autoAlpha: 0, duration: 0.7 })
        .from('.hero__title .word > span', { yPercent: 115, rotate: 5, duration: 1.1, stagger: 0.07, ease: 'power4.out' }, '-=0.4')
        .from('.hero__text', { y: 26, autoAlpha: 0, duration: 0.9 }, '-=0.7')
        .from('.hero__actions > *', { y: 22, autoAlpha: 0, duration: 0.7, stagger: 0.1 }, '-=0.6');

      gsap.to(bar, { scaleX: 1, duration: SLIDE_SECONDS, ease: 'none', onComplete: next });
    },
    { scope: root, dependencies: [index], revertOnUpdate: true }
  );

  // Runs once: badge float + scroll-out parallax
  useGSAP(
    () => {
      if (reduced()) return;
      gsap.to('.hero__badge', { y: -12, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      gsap.to('.wrap', {
        y: 140,
        autoAlpha: 0.2,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.hero__bg', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    },
    { scope: root }
  );

  return (
    <>
      <section id="home" className="hero" ref={root} aria-roledescription="carousel" aria-label="Highlights">
        <div className="hero__bg">
          {slides.map((s, i) => (
            <div key={s.image} className={`hero__img ${i === index ? 'is-active' : ''}`} style={{ transition: 'opacity 1.2s ease' }}>
              <img src={s.image} alt="" />
            </div>
          ))}
          <div className="hero__shade" />
        </div>

        <div className="wrap">
          <div className="hero__content" key={index} aria-live="polite">
            <div className="eyebrow hero__kicker">{slide.kicker}</div>
            <h1 className="hero__title" aria-label={slide.title}>
              {slide.title.split(' ').map((w, i, arr) => (
                <span className="word" aria-hidden="true" key={i}>
                  <span>{w}</span>
                  {i < arr.length - 1 ? ' ' : ''}
                </span>
              ))}
            </h1>
            <p className="hero__text">{slide.text}</p>
            <div className="hero__actions">
              <SmartLink to={slide.href} className="btn btn--green">
                {slide.cta} <Icon name="arrow" size={18} stroke={2.4} />
              </SmartLink>
              <a href="#tour" className="btn btn--ghost">
                <Icon name="play" size={16} /> Campus tour
              </a>
            </div>
          </div>
        </div>

        <div className="hero__controls">
          <div className="hero__dots" role="group" aria-label="Choose slide">
            {slides.map((s, i) => (
              <button
                key={s.title}
                type="button"
                className="hero__dot"
                aria-label={`Show slide ${i + 1}: ${s.title}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
              >
                <span><i /></span>
              </button>
            ))}
          </div>
          <span className="hero__count">
            {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
        </div>

        <div className="hero__badge">
          <div className="hero__badge-icon" style={{ color: 'var(--navy)' }}><Icon name="cap" size={24} /></div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 15 }}>CBSE Affiliated</div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>No. {school.affiliationNo}</div>
          </div>
        </div>
      </section>

      <div className="wrap">
        <div className="quick" data-stagger>
          {quickFacts.map((f) => {
            const Tag = f.href ? SmartLink : 'div';
            return (
              <Tag key={f.title} to={f.href} className={`quick__card ${f.highlight ? 'quick__card--hl' : ''}`}>
                <div className="quick__icon"><Icon name={f.icon} size={24} /></div>
                <div>
                  <div className="quick__title">{f.title}</div>
                  <div className="quick__text">{f.text}</div>
                </div>
              </Tag>
            );
          })}
        </div>
      </div>
    </>
  );
}
