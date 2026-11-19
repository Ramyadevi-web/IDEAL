import { useState } from 'react';
import Icon from './Icon';
import SplitWords from './SplitWords';
import SmartLink from './SmartLink';
import { leaders, timings } from '../data/content';

export function initials(name) {
  return name
    .replace(/^(mr|mrs|ms|dr)\.?\s+/i, '')
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(-2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();
}

export function LeaderPhoto({ leader, className = 'leader__photo', initialsClass = 'leader__initials' }) {
  const [ok, setOk] = useState(Boolean(leader.photo));
  return ok ? (
    <img className={className} src={leader.photo} alt={leader.name} onError={() => setOk(false)} style={{ objectFit: 'cover' }} />
  ) : (
    <div className={initialsClass} aria-hidden="true">{initials(leader.name)}</div>
  );
}

/** Home page: short leader messages linking to their full pages */
export default function Leadership() {
  const ordered = ['chairman', 'principal'].map((s) => leaders.find((l) => l.slug === s)).filter((l) => l && l.name);

  return (
    <section id="leaders" className="section section--alt">
      <div className="wrap">
        <div className="section-head section-head--center">
          <div className="eyebrow" data-reveal>From our leadership</div>
          <SplitWords text="Words from our Chairman & Principal" className="h2" />
        </div>

        <div className="leaders leaders--two" data-stagger>
          {ordered.map((l) => (
            <article className="leader" key={l.slug}>
              <div className="leader__top">
                <LeaderPhoto leader={l} />
                <div>
                  <div className="leader__role">{l.role}</div>
                  <div className="leader__name">{l.name}</div>
                  {l.qualification && <div className="leader__qual">{l.qualification}</div>}
                  <div className="leader__title">{l.title}</div>
                </div>
              </div>
              <blockquote className="leader__quote">“{l.highlight}”</blockquote>
              <SmartLink to={`/about/${l.slug}`} className="link-arrow" style={{ marginTop: 14 }}>
                Read full message <Icon name="arrow" size={18} />
              </SmartLink>
            </article>
          ))}
        </div>

        <div className="meet" data-reveal>
          <span className="meet__icon"><Icon name="calendar" size={22} /></span>
          <p>
            <strong>Meet the Principal:</strong> {timings.principal}. Teacher meetings: {timings.teacher}.
          </p>
          <SmartLink to="/contact" className="btn btn--green">Book a visit</SmartLink>
        </div>
      </div>
    </section>
  );
}
