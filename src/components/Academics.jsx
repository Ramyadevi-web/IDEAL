import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Icon from './Icon';
import Img from './Img';
import SmartLink from './SmartLink';
import SplitWords from './SplitWords';
import { stages, faqs } from '../data/content';

export function Academics() {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.from('.stage__bar', {
        scaleX: 0,
        duration: 1.2,
        ease: 'power3.inOut',
        stagger: 0.15,
        scrollTrigger: { trigger: '.stages', start: 'top 80%' },
      });
    },
    { scope: root }
  );

  return (
    <section id="academics" className="section" ref={root}>
      <div className="wrap">
        <div className="section-head section-head--row">
          <div style={{ maxWidth: 640 }}>
            <div className="eyebrow" data-reveal>Academics</div>
            <SplitWords text="A joyful CBSE journey, stage by stage" className="h2" />
          </div>
          <SmartLink to="/academics/curriculum" className="btn btn--outline" data-reveal>Full curriculum</SmartLink>
        </div>

        <div className="stages" data-stagger>
          {stages.map((s) => (
            <div key={s.title} className={`stage tone-${s.tone}`}>
              <div className="stage__mark">{s.mark}</div>
              <div className="stage__title">{s.title}</div>
              <p className="stage__text">{s.text}</p>
              <span className="stage__bar" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ item, index, open, onToggle }) {
  const ans = useRef(null);

  useGSAP(
    () => {
      gsap.to(ans.current, { height: open ? 'auto' : 0, duration: open ? 0.55 : 0.4, ease: 'power3.inOut' });
    },
    { dependencies: [open] }
  );

  return (
    <div className={`faq__item ${open ? 'is-open' : ''}`}>
      <button type="button" className="faq__q" aria-expanded={open} aria-controls={`faq-${index}`} onClick={onToggle}>
        <span><span className="faq__num">{String(index + 1).padStart(2, '0')}</span>{item.q}</span>
        <span className="faq__icon"><Icon name="plus" size={16} stroke={2.4} /></span>
      </button>
      <div className="faq__a" id={`faq-${index}`} ref={ans} role="region">
        <p>{item.a}</p>
      </div>
    </div>
  );
}

export function WhyChooseUs() {
  const [open, setOpen] = useState(0);

  return (
    <section id="why" className="section section--alt">
      <div className="wrap grid-2" style={{ alignItems: 'start' }}>
        <div>
          <div className="eyebrow" data-reveal>Why choose us</div>
          <SplitWords text="Questions parents ask us most" className="h2" />
          <p className="lead" data-reveal>
            Modern, well-ventilated classrooms, caring facilitators and a curriculum that helps every child find their potential.
          </p>
          <div className="why__media">
            <Img src="/images/slider/slider2.jpg" alt="Kindergarten children with their paper flower craft" data-clip />
            <div className="why__float" data-reveal="zoom">
              <span style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--green-soft)', color: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="star" size={20} />
              </span>
              Passion to strive and excel
            </div>
          </div>
        </div>

        <div className="faq" data-reveal="right">
          {faqs.map((f, i) => (
            <FaqItem key={f.q} item={f} index={i} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
