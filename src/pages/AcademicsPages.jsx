import Page from '../components/Page';
import Icon from '../components/Icon';
import Img from '../components/Img';
import SplitWords from '../components/SplitWords';
import SmartLink from '../components/SmartLink';
import { curriculum, schoolTimings, cca, downloads, faqs } from '../data/content';

const crumbs = [{ label: 'Academics', to: '/academics/curriculum' }];

function SubNav({ current }) {
  const items = [
    { to: '/academics/curriculum', label: 'Curriculum' },
    { to: '/academics/timings', label: 'Timings' },
    { to: '/academics/cca', label: 'CCA' },
    { to: '/academics/certificates', label: 'Certificates' },
  ];
  return (
    <div className="wrap" style={{ marginTop: 8 }}>
      <nav className="year-tabs" aria-label="Academics pages" data-reveal>
        {items.map((i) => (
          <SmartLink key={i.to} to={i.to} className={current === i.to ? 'is-active' : ''} aria-current={current === i.to ? 'page' : undefined}>
            {i.label}
          </SmartLink>
        ))}
      </nav>
    </div>
  );
}

export function Curriculum() {
  return (
    <Page title="Curriculum" hero={{ title: 'Curriculum', eyebrow: 'CBSE · Grades I to 10', text: 'A holistic school education that focuses on excellence.', crumbs }}>
      <SubNav current="/academics/curriculum" />
      <section className="section" style={{ paddingTop: 64 }}>
        <div className="wrap split">
          <div>
            <div className="eyebrow" data-reveal>Our approach</div>
            <SplitWords text="Learning beyond the mark sheet" className="h2" />
            <div className="prose" style={{ marginTop: 22 }} data-stagger>
              {curriculum.intro.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
          <div className="media-frame">
            <Img src={curriculum.image} alt="A student working with a learning aid in class" label="Curriculum photo (ideal26.jpg)" data-clip />
          </div>
        </div>

        <div className="wrap">
          <div className="section-head" style={{ marginTop: 96 }}>
            <div className="eyebrow" data-reveal>Subjects</div>
            <SplitWords text="What each grade studies" className="h2" />
          </div>
          <div className="grades" data-stagger>
            {curriculum.table.map((g) => (
              <div className="grade" key={g.grades}>
                <div className="grade__label"><small>Grades</small><strong>{g.grades}</strong></div>
                <div className="grade__subjects">
                  {g.subjects.map((s) => <span className="subject" key={s}>{s}</span>)}
                </div>
              </div>
            ))}
          </div>
          <div className="meet" data-reveal style={{ marginTop: 32 }}>
            <span className="meet__icon"><Icon name="monitor" size={22} /></span>
            <p><strong>Plus:</strong> {faqs[2].a} {faqs[3].a}</p>
          </div>
        </div>
      </section>
    </Page>
  );
}

export function Timings() {
  const tones = ['var(--green)', 'var(--navy)', 'var(--crimson)', 'var(--purple)', 'var(--muted)'];
  return (
    <Page title="Timings" hero={{ title: 'Structure & Timings', eyebrow: 'Academics', text: schoolTimings.intro, crumbs }}>
      <SubNav current="/academics/timings" />
      <section className="section" style={{ paddingTop: 64 }}>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow" data-reveal>At a glance</div>
            <SplitWords text="When we are open" className="h2" />
            <p className="lead" data-reveal>{schoolTimings.intro}</p>
          </div>
          <div className="time-grid" data-stagger>
            {schoolTimings.rows.map((r, i) => (
              <div className="time-card" key={r.label} style={{ '--tone': tones[i % tones.length] }}>
                <div className="time-card__label">{r.label}</div>
                <div className="time-card__value">{r.value}</div>
                {r.note && <div className="time-card__note">{r.note}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Page>
  );
}

export function CCA() {
  const tones = ['green', 'crimson', 'purple', 'navy'];
  return (
    <Page title="Co-Curricular Activities" hero={{ title: 'Co-Curricular Activities', eyebrow: 'CCA', text: cca.note, crumbs }}>
      <SubNav current="/academics/cca" />
      <section className="section" style={{ paddingTop: 64 }}>
        <div className="wrap split split--rev">
          <div className="media-frame">
            <Img src={cca.image} alt="Students during a co-curricular activity" label="CCA photo (ideal25.jpg)" data-clip />
          </div>
          <div>
            <div className="eyebrow" data-reveal>Beyond the classroom</div>
            <SplitWords text="Developing the whole child" className="h2" />
            <div className="prose" style={{ marginTop: 22 }} data-stagger>
              {cca.intro.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </div>
        <div className="wrap">
          <div className="cca-groups" data-stagger>
            {cca.groups.map((g, i) => (
              <div className={`cca-group tone-${tones[i % tones.length]}`} key={g.title}>
                <div className="cca-group__head">
                  <span className="cca-group__icon"><Icon name={g.icon} size={24} /></span>
                  <span className="cca-group__title">{g.title}</span>
                </div>
                <div className="chips">
                  {g.items.map((it) => <span className="chip" key={it}>{it}</span>)}
                </div>
              </div>
            ))}
          </div>
          <div className="center-actions" data-reveal>
            <SmartLink to="/gallery/cca" className="btn btn--navy">See CCA photos</SmartLink>
          </div>
        </div>
      </section>
    </Page>
  );
}

export function Certificates() {
  return (
    <Page title="Certificates" hero={{ title: 'Certificates & Disclosures', eyebrow: 'Transparency', text: 'Every CBSE-required document and certificate, ready to view or download.', crumbs }}>
      <SubNav current="/academics/certificates" />
      <section className="section" style={{ paddingTop: 64 }}>
        <div className="wrap">
          <div className="cert-grid" data-stagger>
            {downloads.map((d) => (
              <SmartLink key={d.label} to={d.href} className="cert">
                <span className="cert__icon"><Icon name="file" size={24} /></span>
                <span>
                  <span className="cert__name" style={{ display: 'block' }}>{d.label}</span>
                  <span className="cert__meta">PDF · opens in a new tab <Icon name="download" size={14} /></span>
                </span>
              </SmartLink>
            ))}
          </div>
        </div>
      </section>
    </Page>
  );
}
