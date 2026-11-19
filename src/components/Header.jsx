import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Icon from './Icon';
import SmartLink from './SmartLink';
import { school, topLinks, menu, notices, galleryCategories } from '../data/content';

const isActive = (item, path) => {
  if (item.to === '/') return path === '/';
  const base = '/' + item.to.split('/')[1];
  return path.startsWith(base);
};

export function TopBar() {
  return (
    <div className="topbar">
      <div className="wrap">
        <div className="topbar__info">
          <a href={`tel:+${school.phoneRaw}`}><Icon name="phone" size={15} />{school.phone}</a>
          <a href={`mailto:${school.email}`} className="topbar__email"><Icon name="mail" size={15} />{school.email}</a>
          <span className="topbar__hours"><Icon name="clock" size={15} />{school.hours}</span>
        </div>
        <nav className="topbar__links" aria-label="Quick links">
          {topLinks.map((l) => (
            <SmartLink key={l.label} to={l.href} external={l.external} className="u-line">
              {l.label}
              {l.isNew && <span className="badge-new">NEW</span>}
            </SmartLink>
          ))}
        </nav>
      </div>
    </div>
  );
}

function GalleryMega({ onPick }) {
  return (
    <div className="mega" role="menu" onClick={(e) => e.target.closest('a') && onPick()}>
      <div className="mega__head">
        <div>
          <div className="mega__title">Photo gallery</div>
          <div className="mega__sub">Pick an album and a year</div>
        </div>
        <Link to="/gallery" className="link-arrow" role="menuitem">All albums <Icon name="arrow" size={16} /></Link>
      </div>
      <div className="mega__grid">
        {galleryCategories.map((c) => (
          <div className="mega__cat" key={c.slug}>
            <Link to={`/gallery/${c.slug}`} className="mega__cat-name" role="menuitem">{c.label}</Link>
            <div className="mega__years">
              {c.years.map((y) => (
                <Link key={y} to={`/gallery/${c.slug}/${y}`} role="menuitem">{y}</Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DesktopNav({ path }) {
  // Only ONE dropdown can be open; it closes when the mouse leaves,
  // after a link is clicked, on page change, or with the Esc key.
  const [open, setOpen] = useState(null);
  const timer = useRef(null);

  const show = (label) => { clearTimeout(timer.current); setOpen(label); };
  const hideSoon = () => { clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(null), 150); };
  const closeNow = () => {
    clearTimeout(timer.current);
    setOpen(null);
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  };

  useEffect(() => { closeNow(); }, [path]);
  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <nav className="nav" aria-label="Main" onKeyDown={(e) => e.key === 'Escape' && closeNow()}>
      {menu.filter((item) => item.to !== '/').map((item) => {
        const active = isActive(item, path);
        const hasMenu = item.children || item.mega;
        const isOpen = hasMenu && open === item.label;
        return (
          <div
            key={item.label}
            className={`nav__item ${hasMenu ? 'has-menu' : ''} ${item.mega ? 'is-mega' : ''} ${isOpen ? 'is-open' : ''}`}
            onMouseEnter={() => (hasMenu ? show(item.label) : setOpen(null))}
            onMouseLeave={hideSoon}
            onFocus={() => hasMenu && show(item.label)}
            onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) hideSoon(); }}
          >
            <Link
              to={item.to}
              onClick={closeNow}
              className={`nav__link ${item.cta ? 'nav__link--cta' : ''} ${active ? 'is-active' : ''}`}
              aria-haspopup={hasMenu ? 'true' : undefined}
              aria-expanded={hasMenu ? isOpen : undefined}
            >
              {item.label}
              {hasMenu && <Icon name="chevronDown" size={14} stroke={2.4} className="nav__caret" />}
            </Link>
            {item.children && (
              <div className="dropdown" role="menu">
                {item.children.map((c) => (
                  <Link key={c.to + c.label} to={c.to} role="menuitem" onClick={closeNow} className={path === c.to ? 'is-current' : ''}>
                    {c.label}
                    <Icon name="arrow" size={14} />
                  </Link>
                ))}
              </div>
            )}
            {item.mega && <GalleryMega onPick={closeNow} />}
          </div>
        );
      })}
    </nav>
  );
}

function MobileGroup({ item, path, onNavigate }) {
  const [open, setOpen] = useState(isActive(item, path));
  const panel = useRef(null);
  const children = item.mega
    ? [{ label: 'All albums', to: '/gallery' }, ...galleryCategories.map((c) => ({ label: c.label, to: `/gallery/${c.slug}` }))]
    : item.children;

  useGSAP(() => {
    gsap.to(panel.current, { height: open ? 'auto' : 0, duration: open ? 0.45 : 0.3, ease: 'power3.inOut' });
  }, { dependencies: [open] });

  const id = `m-${item.label.replace(/\W+/g, '')}`;
  return (
    <div className="m-group">
      <div className="m-group__row">
        <Link to={item.to} onClick={onNavigate} className={isActive(item, path) ? 'is-active' : ''}>{item.label}</Link>
        <button type="button" aria-label={`${open ? 'Hide' : 'Show'} ${item.label} pages`} aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
          <Icon name="chevronDown" size={18} className={open ? 'rot' : ''} />
        </button>
      </div>
      <div className="m-group__panel" id={id} ref={panel}>
        <div className="m-group__links">
          {children.map((c) => (
            <Link key={c.to + c.label} to={c.to} onClick={onNavigate} className={path === c.to ? 'is-current' : ''}>{c.label}</Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu after navigating
  useEffect(() => setOpen(false), [pathname]);

  useGSAP(() => {
    const el = menuRef.current;
    if (!el) return;
    if (open) {
      gsap.to(el, { height: 'auto', duration: 0.5, ease: 'power3.out' });
      gsap.fromTo(el.querySelectorAll('.mobile-menu__inner > *'), { y: -12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.04, duration: 0.4, delay: 0.1 });
    } else {
      gsap.to(el, { height: 0, duration: 0.35, ease: 'power3.in' });
    }
  }, { dependencies: [open] });

  const close = () => setOpen(false);

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="wrap">
        <Link to="/" className="brand" aria-label="Ideal School home">
          <img src={school.logo} alt="" width="58" height="58" />
          <span className="brand__text">
            <span className="brand__name">IDEAL SCHOOL</span>
            <span className="brand__sub">CBSE · No. {school.affiliationNo}</span>
          </span>
        </Link>

        <DesktopNav path={pathname} />

        <button
          type="button"
          className="burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name={open ? 'close' : 'menu'} size={22} />
        </button>
      </div>

      <div id="mobile-menu" ref={menuRef} className={`mobile-menu ${open ? 'is-open' : ''}`}>
        <div className="mobile-menu__inner">
          {menu.map((item) =>
            item.children || item.mega ? (
              <MobileGroup key={item.label} item={item} path={pathname} onNavigate={close} />
            ) : (
              <Link key={item.label} to={item.to} onClick={close} className={`m-single ${isActive(item, pathname) ? 'is-active' : ''}`}>{item.label}</Link>
            )
          )}
          <div className="mobile-menu__links">
            {topLinks.map((l) => (
              <SmartLink key={l.label} to={l.href} external={l.external} onClick={close}>{l.label}</SmartLink>
            ))}
          </div>
          <Link to="/admissions" className="btn btn--green" onClick={close}>Admissions Open</Link>
        </div>
      </div>
    </header>
  );
}

export function Ticker() {
  const items = [...notices, ...notices];
  return (
    <div className="ticker" role="region" aria-label="Notices">
      <div className="ticker__label"><Icon name="bell" size={15} />NOTICE</div>
      <div className="ticker__viewport">
        <div className="ticker__track">
          {items.map((n, i) => (
            <span key={i} aria-hidden={i >= notices.length}>{n}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
