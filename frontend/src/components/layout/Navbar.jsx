import { useEffect, useState } from 'react';
import logo from '../../assets/images/logo-full.jpeg';
import Icon from '../ui/Icon';
import { navLinks, eventLink } from '../../data/content';
import './Navbar.css';

export default function Navbar({ onOpenAuth, authLabel = 'Join Us' }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = ['home', ...navLinks.map((link) => link.href.slice(1))];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveHref(id === 'home' ? null : `#${id}`);
          }
        });
      },
      { rootMargin: '-100px 0px -70% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__main">
        <div className="navbar__main-inner">
          <a href="#home" className="navbar__brand">
            <img src={logo} alt="Quality Thought Future Skills Foundation" className="navbar__brand-logo" />
          </a>

          <nav className={`navbar__links ${open ? 'navbar__links--open' : ''}`}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={activeHref === link.href ? 'active' : ''}
                onClick={() => {
                  setActiveHref(link.href);
                  setOpen(false);
                }}
              >
                {link.label}
              </a>
            ))}
            <div className="navbar__cta navbar__cta--mobile">
              <a
                href={eventLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="navbar__event-btn"
                onClick={() => setOpen(false)}
              >
                <span className="navbar__event-dot" />
                {eventLink.label}
              </a>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setOpen(false);
                  onOpenAuth?.();
                }}
              >
                {authLabel} <Icon name="arrow" size={16} />
              </button>
            </div>
          </nav>

          <div className="navbar__cta">
            <a href={eventLink.href} target="_blank" rel="noopener noreferrer" className="navbar__event-btn">
              <span className="navbar__event-dot" />
              {eventLink.label}
            </a>
            <button type="button" className="btn btn-primary" onClick={() => onOpenAuth?.()}>
              {authLabel} <Icon name="arrow" size={16} />
            </button>
          </div>

          <button
            className={`navbar__toggle ${open ? 'navbar__toggle--open' : ''}`}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
