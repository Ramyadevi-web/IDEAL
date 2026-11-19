import { useState } from 'react';
import Page from '../components/Page';
import Icon from '../components/Icon';
import Img from '../components/Img';
import SplitWords from '../components/SplitWords';
import SmartLink from '../components/SmartLink';
import { Admissions as AdmissionSteps, CtaBand } from '../components/Admissions';
import { Contact } from '../components/Contact';
import { facilities, facilityPhotos, admissions, downloads, school, timings, jobPosts, waLink } from '../data/content';

/* ─────────────  Infrastructure  ───────────── */
export function InfrastructurePage() {
  return (
    <Page title="Infrastructure" hero={{ title: 'Infrastructure', eyebrow: 'Our campus', text: 'Smart classrooms, air-conditioned labs and library, a 200 m track and courts for every sport.', crumbs: [], image: '/images/slider/slider3.jpg' }}>
      <section className="section" style={{ paddingTop: 72 }}>
        <div className="wrap">
          <div className="section-head section-head--center">
            <div className="eyebrow" data-reveal>Facilities</div>
            <SplitWords text="Everything a growing mind needs" className="h2" />
          </div>
          <div className="fac-grid" data-stagger>
            {facilities.map((f) => (
              <div className="fac" key={f.title}>
                <span className="fac__icon"><Icon name={f.icon} size={24} /></span>
                <div className="fac__title">{f.title}</div>
                <p className="fac__text">{f.text}</p>
              </div>
            ))}
          </div>

          <div className="section-head" style={{ marginTop: 104 }}>
            <div className="eyebrow" data-reveal>Take a look</div>
            <SplitWords text="Around the campus" className="h2" />
          </div>
          <div className="fac-photos">
            {facilityPhotos.map((p, i) => (
              <div className="fac-photo" key={p.image + i}>
                <Img src={p.image} alt={p.title} label={`${p.title} photo`} data-clip />
                <span className="fac-photo__cap">{p.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </Page>
  );
}

/* ─────────────  Admissions  ───────────── */
export function AdmissionsPage() {
  const fee = downloads.find((d) => /fee/i.test(d.label));
  return (
    <Page title="Admissions" hero={{ title: 'Admissions', eyebrow: 'Admissions open', text: 'Everything you need to know to join the Ideal family.', crumbs: [], image: '/images/slider/slider2.jpg' }}>
      <AdmissionSteps onPage />

      <section className="section section--alt">
        <div className="wrap split">
          <div>
            <div className="eyebrow" data-reveal>Procedure</div>
            <SplitWords text="How admission works" className="h2" />
            <ol className="num-list" style={{ marginTop: 28 }} data-stagger>
              {admissions.procedure.map((p) => <li key={p}>{p}</li>)}
            </ol>
          </div>
          <div className="media-frame" data-reveal="right">
            <Img src={admissions.image} alt="Ideal School admissions" label="Admission photo (Admission.jpg)" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 28 }}>
          <div className="panel" data-reveal="left">
            <div className="eyebrow">Checklist</div>
            <h2 className="h2" style={{ fontSize: 32 }}>Documents required</h2>
            <ul className="check-list" style={{ marginTop: 24 }}>
              {admissions.documents.map((d) => (
                <li key={d}><span><Icon name="check" size={16} stroke={2.6} /></span><span>{d}</span></li>
              ))}
            </ul>
            {fee && (
              <div className="btn-row">
                <SmartLink to={fee.href} className="btn btn--navy"><Icon name="download" size={18} /> Fee structure (PDF)</SmartLink>
              </div>
            )}
          </div>
          <div className="panel" data-reveal="right" style={{ background: 'var(--navy)', color: '#fff' }}>
            <div className="eyebrow" style={{ color: 'var(--green)' }}>Our promise</div>
            <h2 className="h2" style={{ fontSize: 32, color: '#fff' }}>Desired outcomes of education</h2>
            <p style={{ color: '#cfd1ea', margin: '14px 0 0', lineHeight: 1.7 }}>{admissions.outcomesIntro}</p>
            <ul className="check-list" style={{ marginTop: 20 }}>
              {admissions.outcomes.map((o) => (
                <li key={o} style={{ color: '#e3e4f4' }}><span style={{ background: 'var(--green)' }}><Icon name="check" size={16} stroke={2.6} /></span><span>{o}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Contact />
    </Page>
  );
}

/* ─────────────  Contact  ───────────── */
export function ContactPage() {
  return (
    <Page title="Contact" hero={{ title: 'Contact Us', eyebrow: 'We’d love to hear from you', text: `${school.address.join(' ')} · ${school.phone}`, crumbs: [] }}>
      <Contact />
    </Page>
  );
}

/* ─────────────  Feedback  ───────────── */
export function FeedbackPage() {
  const [f, setF] = useState({ name: '', relation: 'Parent', phone: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const up = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));
  const body = `Name: ${f.name}\nI am a: ${f.relation}\nPhone: ${f.phone}\nEmail: ${f.email}\n\nFeedback:\n${f.message}`;

  const submit = (e) => {
    e.preventDefault();
    window.location.href = `mailto:${school.email}?subject=${encodeURIComponent('Website feedback')}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <Page title="Feedback" hero={{ title: 'Feedback', eyebrow: 'Give us your valuable feedback', text: 'Your suggestions help us become a better school every day.', crumbs: [] }}>
      <section className="section" style={{ paddingTop: 72 }}>
        <div className="wrap form-page">
          <div className="info-card" data-reveal="left">
            <h3>We’re listening</h3>
            <p>Share what you love about Ideal School and what we can do better. Every message reaches the school office.</p>
            <p>Prefer to talk? Meet the Principal: {timings.principal}.</p>
            <a href={waLink('Hello Ideal School, I would like to share some feedback.')} className="btn btn--wa" target="_blank" rel="noreferrer" style={{ marginTop: 8 }}>
              <Icon name="whatsapp" size={20} /> Send on WhatsApp
            </a>
          </div>
          <form className="form" onSubmit={submit} data-reveal="right" aria-label="Feedback form">
            <h3 className="form__title">Feedback form</h3>
            <div className="form__row">
              <label className="field">Your name<input required value={f.name} onChange={up('name')} autoComplete="name" /></label>
              <label className="field">I am a
                <select value={f.relation} onChange={up('relation')}>
                  <option>Parent</option><option>Student</option><option>Alumni</option><option>Visitor</option>
                </select>
              </label>
            </div>
            <div className="form__row">
              <label className="field">Phone<input type="tel" value={f.phone} onChange={up('phone')} autoComplete="tel" placeholder="+91" /></label>
              <label className="field">Email<input type="email" value={f.email} onChange={up('email')} autoComplete="email" /></label>
            </div>
            <label className="field">Your feedback<textarea required rows={5} value={f.message} onChange={up('message')} /></label>
            <button type="submit" className="btn btn--green" style={{ alignSelf: 'flex-start' }}><Icon name="send" size={18} /> Submit feedback</button>
            {sent && <div className="form__ok" role="status">Your email app opened with your feedback — just press send.</div>}
          </form>
        </div>
      </section>
    </Page>
  );
}

/* ─────────────  Job Enquiry  ───────────── */
export function JobEnquiryPage() {
  const [f, setF] = useState({ name: '', email: '', phone: '', sex: '', post: jobPosts[0], message: '' });
  const [sent, setSent] = useState(false);
  const up = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const body = `Name: ${f.name}\nEmail: ${f.email}\nPhone: ${f.phone}\nSex: ${f.sex}\nPost applied for: ${f.post}\n\n${f.message}\n\n(CV attached)`;
    window.location.href = `mailto:${school.email}?subject=${encodeURIComponent(`Job application — ${f.post}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <Page title="Job Enquiry" hero={{ title: 'Careers at Ideal', eyebrow: 'Job enquiry', text: 'Passionate about teaching and learning? We’d love to meet you.', crumbs: [] }}>
      <section className="section" style={{ paddingTop: 72 }}>
        <div className="wrap form-page">
          <div className="info-card" data-reveal="left">
            <h3>Join our team</h3>
            <p>We are always looking for confident, competent, caring and committed teachers and staff.</p>
            <p>Open roles: <strong style={{ color: '#fff' }}>{jobPosts.join(', ')}</strong></p>
            <p style={{ fontSize: 14 }}>Submitting opens your email app with your details filled in — please attach your CV (max 12 MB) before sending to {school.email}.</p>
          </div>
          <form className="form" onSubmit={submit} data-reveal="right" aria-label="Job application form">
            <h3 className="form__title">Apply now</h3>
            <p className="form__sub">Fill in your correct information.</p>
            <div className="form__row">
              <label className="field">Name *<input required value={f.name} onChange={up('name')} autoComplete="name" /></label>
              <label className="field">Email *<input required type="email" value={f.email} onChange={up('email')} autoComplete="email" /></label>
            </div>
            <div className="form__row">
              <label className="field">Phone<input type="tel" value={f.phone} onChange={up('phone')} autoComplete="tel" placeholder="+91" /></label>
              <label className="field">Job post *
                <select value={f.post} onChange={up('post')}>{jobPosts.map((p) => <option key={p}>{p}</option>)}</select>
              </label>
            </div>
            <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
              <legend style={{ marginBottom: 8 }}>Sex *</legend>
              <div className="radio-row">
                {['Male', 'Female'].map((s) => (
                  <label className="radio" key={s}><input type="radio" name="sex" value={s} required checked={f.sex === s} onChange={up('sex')} /> {s}</label>
                ))}
              </div>
            </fieldset>
            <label className="field">Message *<textarea required rows={4} value={f.message} onChange={up('message')} placeholder="Qualification, experience, subjects…" /></label>
            <button type="submit" className="btn btn--green" style={{ alignSelf: 'flex-start' }}><Icon name="send" size={18} /> Apply now</button>
            {sent && <div className="form__ok" role="status">Your email app opened — attach your CV and press send.</div>}
          </form>
        </div>
      </section>
    </Page>
  );
}

/* ─────────────  404  ───────────── */
export function NotFound() {
  return (
    <Page title="Page not found">
      <section className="wrap notfound">
        <strong>404</strong>
        <h1 className="h2">This page has moved</h1>
        <p className="lead">The page you’re looking for isn’t here. Try the home page or the menu above.</p>
        <div className="center-actions">
          <SmartLink to="/" className="btn btn--navy">Go to home</SmartLink>
          <SmartLink to="/contact" className="btn btn--outline">Contact us</SmartLink>
        </div>
      </section>
    </Page>
  );
}
