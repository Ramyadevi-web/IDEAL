import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Icon from './Icon';
import SplitWords from './SplitWords';
import SmartLink from './SmartLink';
import { vision } from '../data/content';

/** Vision, Mission, I-D-E-A-L core values and motto. Used on Home and the Vision & Mission page. */
export default function Values({ showLink = false, alt = false }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Big letters drop in one by one to spell I-D-E-A-L
        gsap.from('.value__letter', {
          yPercent: -120,
          rotate: -25,
          autoAlpha: 0,
          duration: 0.9,
          ease: 'back.out(2)',
          stagger: 0.14,
          scrollTrigger: { trigger: '.values', start: 'top 82%' },
        });
        gsap.from('.value__word, .value__text', {
          y: 20,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.05,
          delay: 0.4,
          scrollTrigger: { trigger: '.values', start: 'top 82%' },
        });
        gsap.from('.motto__text', {
          letterSpacing: '0.3em',
          autoAlpha: 0,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.motto', start: 'top 88%' },
        });
      });
    },
    { scope: root }
  );

  return (
    <section className={`section ${alt ? 'section--alt' : ''}`} ref={root} id="vision">
      <div className="wrap">
        <div className="section-head section-head--center">
          <div className="eyebrow" data-reveal>Who we are</div>
          <SplitWords text="Our vision, mission & values" className="h2" />
        </div>

        <div className="vm">
          <div className="vm__card vm__card--vision" data-reveal="left">
            <div className="vm__label">Our vision</div>
            <p className="vm__text">
              {vision.vision[0]}
              <small>{vision.vision[1]}</small>
            </p>
            <Icon name="star" size={180} stroke={1} className="vm__icon" />
          </div>
          <div className="vm__card vm__card--mission" data-reveal="right">
            <div className="vm__label">Our mission</div>
            <p className="vm__text">{vision.mission}</p>
            <Icon name="cap" size={180} stroke={1} className="vm__icon" />
          </div>
        </div>

        <div className="values-title">
          <div className="eyebrow" data-reveal>Our core values</div>
          <SplitWords text="Every value spells IDEAL" className="h2" />
        </div>
        <div className="values">
          {vision.values.map((v) => (
            <div className={`value tone-${v.tone}`} key={v.word}>
              <span className="value__letter" aria-hidden="true">{v.letter}</span>
              <div className="value__word"><span>{v.word[0]}</span>{v.word.slice(1)}</div>
              <p className="value__text">{v.text}</p>
            </div>
          ))}
        </div>

        <div className="motto" data-reveal>
          <div className="motto__label">Our motto</div>
          <div className="motto__text">“{vision.motto}”</div>
          {showLink && (
            <div style={{ marginTop: 18 }}>
              <SmartLink to="/about/vision-mission" className="link-arrow">Read more about us <Icon name="arrow" size={18} /></SmartLink>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
