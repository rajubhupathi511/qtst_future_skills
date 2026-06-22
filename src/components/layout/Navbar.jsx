import { useEffect, useState } from 'react';
import logo from '../../assets/images/logo.png';
import Icon from '../ui/Icon';
import { navLinks } from '../../data/content';
import './Navbar.css';

export default function Navbar() {
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
      { rootMargin: '-84px 0px -70% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__main">
        <div className="navbar__main-inner">
          <a href="#home" className="navbar__brand">
            <img src={logo} alt="Quality Thought Future Skills Foundation" />
            <span className="navbar__brand-text">
              Quality Thought
              <strong>Future Skills Foundation</strong>
            </span>
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
              <a href="#contact" className="btn btn-primary">Join Us <Icon name="arrow" size={16} /></a>
            </div>
          </nav>

          <div className="navbar__cta">
            <a href="#contact" className="btn btn-primary">Join Us <Icon name="arrow" size={16} /></a>
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
