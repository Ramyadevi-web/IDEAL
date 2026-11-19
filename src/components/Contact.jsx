import { useState } from 'react';
import Icon from './Icon';
import SplitWords from './SplitWords';
import { Link } from 'react-router-dom';
import { school, schoolRules, menu, waLink, timings } from '../data/content';

export function Contact() {
  const [form, setForm] = useState({ parent: '', phone: '', grade: 'Kindergarten', msg: '' });
  const [sent, setSent] = useState(false);
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  // No server needed: the enquiry opens in WhatsApp, already typed out.
  const submit = (e) => {
    e.preventDefault();
    const text =
      `Hello Ideal School, I have an admission enquiry.\n` +
      `Parent: ${form.parent}\nPhone: ${form.phone}\nClass: ${form.grade}` +
      (form.msg ? `\nMessage: ${form.msg}` : '');
    window.open(waLink(text), '_blank', 'noopener');
    setSent(true);
  };

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(school.mapsQuery)}&z=15&output=embed`;

  return (
    <section id="contact" className="section section--alt">
      <div className="wrap contact">
        <div>
          <div className="eyebrow" data-reveal>Contact us</div>
          <SplitWords text="Visit us or say hello" className="h2" />

          <div className="contact__list" data-stagger>
            <div className="contact__row">
              <span className="contact__icon"><Icon name="pin" /></span>
              <span>{school.address.map((l) => <span key={l} style={{ display: 'block' }}>{l}</span>)}</span>
            </div>
            <div className="contact__row" style={{ alignItems: 'center' }}>
              <span className="contact__icon"><Icon name="phone" /></span>
              <a href={`tel:+${school.phoneRaw}`}>{school.phone}</a>
            </div>
            <div className="contact__row" style={{ alignItems: 'center' }}>
              <span className="contact__icon"><Icon name="mail" /></span>
              <a href={`mailto:${school.email}`}>{school.email}</a>
            </div>
            <div className="contact__row" style={{ alignItems: 'center' }}>
              <span className="contact__icon"><Icon name="clock" /></span>
              <span>{school.hours}</span>
            </div>
          </div>

          <div className="map" data-reveal>
            <iframe title="Map to Ideal School" src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            <a className="map__qr" href={school.directionsQr} target="_blank" rel="noreferrer">
              <img src="/images/brand/routemap-qr.jpg" alt="QR code for directions to the school" />
              Scan for directions
            </a>
          </div>
        </div>

        <form className="form" onSubmit={submit} data-reveal="right" aria-label="Admission enquiry">
          <h3 className="form__title">Admission enquiry</h3>
          <p className="form__sub">Share a few details — your enquiry opens in WhatsApp, ready to send to our office.</p>
          <label className="field">
            Parent’s name
            <input required value={form.parent} onChange={update('parent')} placeholder="Your full name" autoComplete="name" />
          </label>
          <div className="form__row">
            <label className="field">
              Phone number
              <input required type="tel" value={form.phone} onChange={update('phone')} placeholder="+91" autoComplete="tel" />
            </label>
            <label className="field">
              Class seeking admission
              <select value={form.grade} onChange={update('grade')}>
                <option>Kindergarten</option>
                <option>Primary</option>
                <option>Middle School</option>
                <option>Secondary</option>
              </select>
            </label>
          </div>
          <label className="field">
            Message (optional)
            <textarea rows={4} value={form.msg} onChange={update('msg')} placeholder="Anything you’d like us to know" />
          </label>
          <button type="submit" className="btn btn--wa" style={{ alignSelf: 'flex-start' }}>
            <Icon name="whatsapp" size={20} /> Send enquiry on WhatsApp
          </button>
          {sent && <div className="form__ok" role="status">WhatsApp opened with your enquiry — just tap send. You can also call us on {school.phone}.</div>}
        </form>
      </div>
    </section>
  );
}

export function Footer() {
  const [email, setEmail] = useState('');
  const subscribe = (e) => {
    e.preventDefault();
    window.location.href = `mailto:${school.email}?subject=${encodeURIComponent('Newsletter subscription')}&body=${encodeURIComponent(`Please add ${email} to the school newsletter.`)}`;
  };
  const social = [
    { name: 'facebook', href: school.social.facebook, label: 'Facebook' },
    { name: 'instagram', href: school.social.instagram, label: 'Instagram' },
    { name: 'youtube', href: school.social.youtube, label: 'YouTube' },
  ].filter((s) => s.href);

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid" data-stagger>
          <div>
            <div className="footer__brand">
              <span className="footer__brand-logo"><img src={school.logo} alt="" /></span>
              <div>
                <div className="footer__name">IDEAL SCHOOL</div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.14em' }}>CBSE · MAYILADUTHURAI</div>
              </div>
            </div>
            <p className="footer__about">Learn and lead with integrity. A CBSE school run by {school.trust} since {school.established}.</p>
            <div className="footer__social">
              {social.map((s) => (
                <a key={s.name} href={s.href} aria-label={s.label} target="_blank" rel="noreferrer"><Icon name={s.name} size={18} /></a>
              ))}
            </div>
          </div>

          <div>
            <div className="footer__head">Useful links</div>
            <div className="footer__links">
              {menu.slice(1).map((l) => <Link key={l.to} to={l.to} className="u-line">{l.label}</Link>)}
              <Link to="/academics/certificates" className="u-line">Certificates</Link>
              <Link to="/feedback" className="u-line">Feedback</Link>
              <Link to="/job-enquiry" className="u-line">Job Enquiry</Link>
            </div>
          </div>

          <div>
            <div className="footer__head">School rules</div>
            <div className="footer__rules">{schoolRules.map((r) => <span key={r}>{r}</span>)}</div>
          </div>

          <div>
            <div className="footer__head">Newsletter</div>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.7 }}>Get school news and event updates in your inbox.</p>
            <form className="footer__news" onSubmit={subscribe}>
              <label>
                Email address
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              </label>
              <button type="submit" className="btn btn--green">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} {school.fullName}. All rights reserved.</span>
          <span>CBSE Affiliation No. {school.affiliationNo}</span>
        </div>
      </div>
    </footer>
  );
}
