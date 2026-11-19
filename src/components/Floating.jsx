import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Icon from './Icon';
import { school, whatsappOptions, waLink } from '../data/content';

export function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [tip, setTip] = useState(false);
  const root = useRef(null);
  const panel = useRef(null);

  // Pop the button in, then show "Chat with us" for a few seconds
  useGSAP(
    () => {
      gsap.from('.wa__fab', { scale: 0, rotate: -120, duration: 0.9, delay: 1.2, ease: 'back.out(2.2)' });
      const show = gsap.delayedCall(3, () => setTip(true));
      const hide = gsap.delayedCall(9, () => setTip(false));
      return () => { show.kill(); hide.kill(); };
    },
    { scope: root }
  );

  useGSAP(
    () => {
      if (tip) gsap.from('.wa__tip', { x: 16, autoAlpha: 0, duration: 0.5, ease: 'power3.out' });
    },
    { scope: root, dependencies: [tip] }
  );

  useGSAP(
    () => {
      if (!open || !panel.current) return;
      gsap
        .timeline()
        .from(panel.current, { scale: 0.6, y: 30, autoAlpha: 0, duration: 0.45, ease: 'back.out(1.6)' })
        .from('.wa__bubble', { y: 10, autoAlpha: 0, duration: 0.35 }, '-=0.1')
        .from('.wa__opt', { x: 20, autoAlpha: 0, stagger: 0.06, duration: 0.35 }, '-=0.15');
    },
    { scope: root, dependencies: [open] }
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const time = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="wa" ref={root}>
      {open && (
        <div className="wa__panel" ref={panel} role="dialog" aria-label="Chat with Ideal School on WhatsApp">
          <div className="wa__head">
            <span className="wa__avatar"><img src={school.logo} alt="" /></span>
            <div>
              <div className="wa__title">Ideal School Office</div>
              <div className="wa__status">Replies during office hours</div>
            </div>
            <button type="button" className="wa__close" aria-label="Close chat" onClick={() => setOpen(false)}>
              <Icon name="close" size={18} stroke={2.4} />
            </button>
          </div>
          <div className="wa__chat">
            <div className="wa__bubble">
              Vanakkam! How can we help you today? Pick a topic and continue the chat on WhatsApp.
              <small>{time}</small>
            </div>
          </div>
          <div className="wa__opts">
            {whatsappOptions.map((o) => (
              <a key={o.label} className="wa__opt" href={waLink(o.message)} target="_blank" rel="noreferrer">
                {o.label}
                <Icon name="arrow" size={16} stroke={2.4} />
              </a>
            ))}
          </div>
        </div>
      )}

      <div style={{ position: 'relative' }}>
        {tip && !open && <div className="wa__tip">Chat with us on WhatsApp</div>}
        <button
          type="button"
          className="wa__fab"
          aria-label={open ? 'Close WhatsApp chat' : 'Chat with Ideal School on WhatsApp'}
          aria-expanded={open}
          onClick={() => { setOpen((o) => !o); setTip(false); }}
        >
          <Icon name={open ? 'close' : 'whatsapp'} size={open ? 26 : 34} stroke={2.4} />
        </button>
      </div>
    </div>
  );
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const circle = useRef(null);
  const R = 23;
  const C = 2 * Math.PI * R;

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setVisible(window.scrollY > 700);
      if (circle.current) circle.current.style.strokeDashoffset = String(C * (1 - p));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [C]);

  return (
    <button
      type="button"
      className={`to-top ${visible ? 'is-visible' : ''}`}
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <svg className="ring" viewBox="0 0 50 50" width="100%" height="100%" aria-hidden="true">
        <circle cx="25" cy="25" r={R} fill="none" stroke="var(--green)" strokeWidth="2.5" strokeDasharray={C} ref={circle} strokeLinecap="round" />
      </svg>
      <Icon name="arrowUp" size={20} stroke={2.4} />
    </button>
  );
}
