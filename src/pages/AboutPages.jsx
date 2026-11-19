import { Navigate, useParams } from 'react-router-dom';
import Page from '../components/Page';
import Icon from '../components/Icon';
import Img from '../components/Img';
import SplitWords from '../components/SplitWords';
import SmartLink from '../components/SmartLink';
import Values from '../components/Values';
import { LeaderPhoto } from '../components/Leadership';
import { Stats } from '../components/About';
import { CtaBand } from '../components/Admissions';
import { about, leaders, school, timings, vision } from '../data/content';

const aboutCrumb = [{ label: 'About Us', to: '/about' }];

export function AboutUs() {
  return (
    <Page
      title="About Us"
      hero={{ title: 'About Ideal School', eyebrow: `Since ${school.established}`, text: about.text, crumbs: [], image: '/images/slider/slider1.jpg' }}
    >
      <section className="section">
        <div className="wrap split">
          <div>
            <div className="eyebrow" data-reveal>{about.eyebrow}</div>
            <SplitWords text={about.title} className="h2" />
            <div className="prose" style={{ marginTop: 22 }} data-reveal>
              <p>{about.text}</p>
              <p>
                Run by {school.trust}, Ideal School is affiliated to the Central Board of Secondary Education (CBSE),
                affiliation no. {school.affiliationNo}. Our motto — <em>“{vision.motto}”</em> — guides everything we do,
                from classroom learning to sports, clubs and the arts.
              </p>
            </div>
            <div className="quote-box" data-reveal>
              <Icon name="quote" size={30} className="quote-icon" />
              <p>{about.quote}</p>
            </div>
          </div>
          <div className="media-frame" data-reveal="right">
            <Img src="/images/slider/slider3.jpg" alt="Students playing basketball in front of the school building" data-clip />
          </div>
        </div>
      </section>

      <Stats />

      <section className="section">
        <div className="wrap">
          <div className="section-head section-head--center">
            <div className="eyebrow" data-reveal>Explore</div>
            <SplitWords text="Get to know us" className="h2" />
          </div>
          <div className="rules" data-stagger>
            {[
              { to: '/about/chairman', icon: 'quote', title: 'Chairman’s Message', text: leaders.find((l) => l.slug === 'chairman')?.name },
              { to: '/about/principal', icon: 'cap', title: 'Principal’s Message', text: leaders.find((l) => l.slug === 'principal')?.name },
              { to: '/about/vision-mission', icon: 'star', title: 'Vision & Mission', text: 'Our vision, mission, IDEAL core values and motto' },
            ].map((c) => (
              <SmartLink key={c.to} to={c.to} className="rule" style={{ textDecoration: 'none' }}>
                <span className="rule__icon"><Icon name={c.icon} size={22} /></span>
                <span className="rule__title">{c.title}</span>
                <span className="rule__text">{c.text}</span>
                <span className="link-arrow" style={{ minHeight: 0 }}>Read <Icon name="arrow" size={16} /></span>
              </SmartLink>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </Page>
  );
}

export function LeaderPage() {
  const { slug } = useParams();
  const leader = leaders.find((l) => l.slug === slug);
  if (!leader || !leader.name) return <Navigate to="/about" replace />;
  const other = leaders.find((l) => l.slug !== slug && l.name);

  return (
    <Page title={leader.role} hero={{ title: leader.role, eyebrow: leader.title, crumbs: aboutCrumb, image: '/images/slider/slider2.jpg' }}>
      <section className="section">
        <div className="wrap letter">
          <aside className="letter__card" data-reveal="left">
            <div className="letter__photo">
              <LeaderPhoto leader={leader} className="" initialsClass="letter__initials" />
            </div>
            <div className="letter__name">{leader.name}</div>
            {leader.qualification && <div className="letter__qual">{leader.qualification}</div>}
            <div className="letter__title">{leader.title}</div>
            {other && (
              <div className="letter__switch">
                <SmartLink to={`/about/${other.slug}`}>Read the {other.role} <Icon name="arrow" size={16} /></SmartLink>
              </div>
            )}
          </aside>

          <article>
            <blockquote className="letter__quote" data-reveal>“{leader.highlight}”</blockquote>
            <div className="letter__body" data-stagger>
              {leader.message.map((p, i) => <p key={i} className={i === 0 && p.length < 60 ? 'salutation' : undefined}>{p}</p>)}
            </div>
            <div className="letter__sign" data-reveal>
              {leader.name}
              <small>{leader.title}</small>
            </div>
          </article>
        </div>
      </section>
    </Page>
  );
}

export function VisionMission() {
  const rules = [
    { icon: 'calendar', title: 'Principal meeting', text: `${timings.principal}.` },
    { icon: 'users', title: 'Teacher meeting', text: `${timings.teacher}.` },
    { icon: 'clock', title: 'Office hours', text: `${timings.office}. Closed on Sundays.` },
  ];
  return (
    <Page title="Vision and Mission" hero={{ title: 'Vision and Mission', eyebrow: 'Who we are', text: vision.mission, crumbs: aboutCrumb }}>
      <Values />
      <section className="section section--alt">
        <div className="wrap">
          <div className="section-head section-head--center">
            <div className="eyebrow" data-reveal>For parents</div>
            <SplitWords text="School rules" className="h2" />
          </div>
          <div className="rules" data-stagger>
            {rules.map((r) => (
              <div className="rule" key={r.title}>
                <span className="rule__icon"><Icon name={r.icon} size={22} /></span>
                <span className="rule__title">{r.title}</span>
                <p className="rule__text">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Page>
  );
}
