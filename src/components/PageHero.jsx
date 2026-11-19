import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom';
import Icon from './Icon';

/** Banner at the top of every inner page */
export default function PageHero({ title, eyebrow, text, crumbs = [], image = '/images/slider/slider3.jpg' }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from('.page-hero__bg img', { scale: 1.2, duration: 1.8 })
          .from('.page-hero__crumbs', { y: 16, autoAlpha: 0, duration: 0.6 }, 0.1)
          .from('.page-hero__eyebrow', { y: 16, autoAlpha: 0, duration: 0.6 }, 0.2)
          .from('.page-hero__title .word > span', { yPercent: 115, rotate: 4, stagger: 0.07, duration: 1, ease: 'power4.out' }, 0.25)
          .from('.page-hero__text', { y: 20, autoAlpha: 0, duration: 0.8 }, 0.5);
        gsap.to('.page-hero__bg', {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section className="page-hero" ref={root}>
      <div className="page-hero__bg"><img src={image} alt="" /></div>
      <div className="page-hero__shade" />
      <div className="wrap page-hero__inner">
        <nav className="page-hero__crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} style={{ display: 'contents' }}>
              <Icon name="chevron" size={14} />
              {c.to ? <Link to={c.to}>{c.label}</Link> : <span>{c.label}</span>}
            </span>
          ))}
          <Icon name="chevron" size={14} />
          <span aria-current="page">{title}</span>
        </nav>
        {eyebrow && <div className="eyebrow page-hero__eyebrow">{eyebrow}</div>}
        <h1 className="page-hero__title" aria-label={title}>
          {title.split(' ').map((w, i, a) => (
            <span className="word" aria-hidden="true" key={i}>
              <span>{w}</span>
              {i < a.length - 1 ? ' ' : ''}
            </span>
          ))}
        </h1>
        {text && <p className="page-hero__text">{text}</p>}
      </div>
    </section>
  );
}
