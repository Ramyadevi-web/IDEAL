import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Icon from './Icon';
import Img from './Img';
import SmartLink from './SmartLink';
import SplitWords from './SplitWords';
import { admissionSteps, news, noticeBoard, testimonials, downloads, school, waLink } from '../data/content';

export function Admissions({ onPage = false }) {
  const root = useRef(null);

  useGSAP(
    () => {
      // Progress line draws as you scroll through the steps
      gsap.to('.steps__line i', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: '.steps', start: 'top 75%', end: 'bottom 55%', scrub: 0.6 },
      });
      gsap.from('.step__num', {
        scale: 0,
        rotate: -90,
        duration: 0.8,
        ease: 'back.out(2)',
        stagger: 0.18,
        scrollTrigger: { trigger: '.steps', start: 'top 80%' },
      });
    },
    { scope: root }
  );

  return (
    <section id="admissions" className="section" ref={root}>
      <div className="wrap">
        <div className="section-head section-head--center">
          <div className="eyebrow" data-reveal>Admissions</div>
          <SplitWords text="Joining Ideal is simple" className="h2" />
          <p className="lead" data-reveal>Four easy steps from your first enquiry to your child’s first day.</p>
        </div>

        <div className="steps">
          <div className="steps__line" aria-hidden="true"><i /></div>
          {admissionSteps.map((s, i) => (
            <div className="step" key={s.title} data-reveal>
              <div className="step__num">{i + 1}</div>
              <div className="step__title">{s.title}</div>
              <p className="step__text">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="center-actions" data-reveal>
          {onPage ? (
            <SmartLink to="#contact" className="btn btn--green">Send an enquiry</SmartLink>
          ) : (
            <SmartLink to="/admissions" className="btn btn--green">Admission procedure</SmartLink>
          )}
          <a href={waLink('Hello Ideal School, I would like to enquire about admissions.')} className="btn btn--wa" target="_blank" rel="noreferrer">
            <Icon name="whatsapp" size={20} /> Enquire on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

export function News() {
  return (
    <section id="news" className="section section--alt">
      <div className="wrap">
        <div className="section-head section-head--row">
          <div style={{ maxWidth: 640 }}>
            <div className="eyebrow" data-reveal>News &amp; events</div>
            <SplitWords text="What’s happening at Ideal" className="h2" />
          </div>
          <SmartLink to="/gallery" className="link-arrow" data-reveal>Photo gallery <Icon name="arrow" size={18} /></SmartLink>
        </div>

        <div className="news">
          <div className="news__cards" data-stagger>
            {news.map((n) => (
              <article className="news__card" key={n.title}>
                <Img src={n.image} alt="" />
                <div className="news__body">
                  <div className="news__date">{n.date}</div>
                  <h3 className="news__title" style={{ margin: 0 }}>{n.title}</h3>
                  <p className="news__text">{n.text}</p>
                  <SmartLink to={n.href} className="link-arrow" style={{ fontSize: 14 }}>View photos <Icon name="arrow" size={16} /></SmartLink>
                </div>
              </article>
            ))}
          </div>

          <aside className="board" data-reveal="right">
            <div className="board__head"><Icon name="bell" size={22} className="board__bell" /> Notice board</div>
            <div style={{ marginTop: 14 }}>
              {noticeBoard.map((n) => (
                <div className="board__item" key={n.tag}>
                  <div className="board__tag">{n.tag}</div>
                  <div className="board__text">{n.text}</div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

// Hidden until real testimonials are added in content.js
export function Testimonials() {
  if (!testimonials.length) return null;
  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head section-head--center">
          <div className="eyebrow" data-reveal>Parent voices</div>
          <SplitWords text="What our families say" className="h2" />
        </div>
        <div className="voices" data-stagger>
          {testimonials.map((t) => (
            <figure className="voice" key={t.name} style={{ margin: 0 }}>
              <Icon name="quote" size={34} className="quote-icon" />
              <p>{t.quote}</p>
              <figcaption className="voice__who">
                <span className="voice__avatar">{t.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}</span>
                <span>
                  <span style={{ display: 'block', fontWeight: 800 }}>{t.name}</span>
                  <span style={{ fontSize: 13, color: 'var(--muted)' }}>{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Downloads() {
  return (
    <section className="section section--alt" style={{ paddingTop: 88, paddingBottom: 88 }}>
      <div className="wrap grid-2">
        <div>
          <div className="eyebrow" data-reveal>Transparency</div>
          <SplitWords text="Mandatory disclosure & downloads" className="h2" />
          <p className="lead" data-reveal>All CBSE-required documents and certificates, in one place.</p>
          <div className="btn-row" data-reveal>
            <SmartLink to="/academics/certificates" className="btn btn--navy">All {downloads.length} certificates</SmartLink>
          </div>
        </div>
        <div className="docs" data-stagger>
          {downloads.filter((d) => d.key).map((d) => (
            <SmartLink to={d.href} className="doc" key={d.label}>
              <span className="doc__icon"><Icon name="download" size={20} /></span>
              {d.label}
            </SmartLink>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBand() {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.to('.cta__blob--a', { x: 60, y: 40, duration: 8, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      gsap.to('.cta__blob--b', { x: -50, y: -30, duration: 9, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    },
    { scope: root }
  );

  return (
    <section className="section" style={{ paddingTop: 100, paddingBottom: 100 }} ref={root}>
      <div className="wrap">
        <div className="cta" data-reveal="zoom">
          <span className="cta__blob cta__blob--a" style={{ width: 380, height: 380, right: -100, top: -160, background: 'var(--green)' }} aria-hidden="true" />
          <span className="cta__blob cta__blob--b" style={{ width: 280, height: 280, left: -90, bottom: -150, background: 'var(--crimson)' }} aria-hidden="true" />
          <div className="cta__content">
            <div className="eyebrow">CBSE Affiliation No. {school.affiliationNo}</div>
            <SplitWords text="Give your child the Ideal start. Admissions are open." className="h2" />
          </div>
          <div className="cta__actions">
            <SmartLink to="/admissions" className="btn btn--green">Join now</SmartLink>
            <a href={waLink('Hello Ideal School, I would like to know more about the school.')} className="btn btn--wa" target="_blank" rel="noreferrer">
              <Icon name="whatsapp" size={20} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
