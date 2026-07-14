import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo-full.jpeg';
import posterImg from '../assets/images/skilling/eventimage.jpeg';
import Icon from '../components/ui/Icon';
import Footer from '../components/layout/Footer';
import Event from '../components/sections/Event';
import Login from '../components/sections/Login';
import { eventStats, eventHighlights, contactInfo } from '../data/content';
import './EventSummit.css';

export default function EventSummit({ session, setSession }) {
  const [eventOpen, setEventOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenAuth = () => {
    if (!session) {
      setLoginOpen(true);
    } else {
      navigate('/dashboard');
    }
  };

  const handleLoginSuccess = (data) => {
    setSession(data);
    setLoginOpen(false);
    navigate('/dashboard');
  };

  const authLabel = !session ? 'Login' : session.role === 'admin' ? 'Admin' : 'My Ticket';

  return (
    <div className="esum">
      <header className="esum__topbar">
        <Link to="/" className="esum__brand">
          <img src={logo} alt="Quality Thought Future Skills Foundation" />
        </Link>
        <div className="esum__topbar-right">
          <Link to="/" className="esum__home-link">Back to site</Link>
          <button type="button" className="btn esum__login-btn" onClick={handleOpenAuth}>
            {authLabel}
          </button>
        </div>
      </header>

      <section className="esum__hero">
        <div className="container esum__hero-grid">
          <div className="esum__hero-content">
            <span className="esum__eyebrow">
              <Icon name="calendar" size={14} color="var(--orange-light)" /> 08 Aug, 2026
              <span className="esum__eyebrow-dot" />
              <Icon name="pin" size={14} color="var(--orange-light)" /> T-Works, Hyderabad
            </span>

            <h1 className="esum__title">
              The Future Skills <span>Summit &amp; Awards</span>
            </h1>
            <p className="esum__desc">
              Empowering tomorrow's leaders with the skills of the future. Where industry, academia
              and innovation connect, compete, and get recognized. Free entry · Limited passes.
            </p>

            <div className="esum__actions">
              <button type="button" className="btn btn-primary" onClick={() => setEventOpen(true)}>
                Register Now <Icon name="arrow" size={16} />
              </button>
              <a href={`tel:${contactInfo.phone.replace(/[^\d+]/g, '')}`} className="btn btn-outline">
                <Icon name="phone" size={16} /> Call: 8121318281
              </a>
            </div>

            <div className="esum__stats">
              {eventStats.map((s) => (
                <div className="esum__stat" key={s.label}>
                  <span className="esum__stat-value">{s.value}</span>
                  <span className="esum__stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="esum__poster">
            <div className="esum__poster-glow" />
            <div className="esum__poster-frame">
              <img src={posterImg} alt="The Future Skills Summit & Awards — official event poster" className="esum__poster-img" />
              <button
                type="button"
                className="esum__poster-register"
                onClick={() => setEventOpen(true)}
                aria-label="Register Now"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="esum__section container">
        <h2 className="esum__section-title">What to Expect</h2>
        <div className="esum__cards">
          {eventHighlights.map((h) => (
            <div className="esum__card" key={h.title}>
              <span className="esum__card-icon">
                <Icon name={h.icon} size={22} color="var(--orange)" />
              </span>
              <h3>{h.title}</h3>
              <p>{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="esum__cta">
        <div className="container esum__cta-inner">
          <div>
            <span className="esum__cta-eyebrow">Event by IKON Foundation</span>
            <h2>Secure your free pass before it's gone</h2>
            <p>International Knowledge and Opportunities Network · Quality Thought Future Skills Foundation</p>
          </div>
          <button type="button" className="btn btn-primary" onClick={() => setEventOpen(true)}>
            Get My Free Pass <Icon name="arrow" size={16} />
          </button>
        </div>
      </section>

      <Footer hideQuickLinks />

      <Event open={eventOpen} onClose={() => setEventOpen(false)} />
      <Login open={loginOpen} onClose={() => setLoginOpen(false)} onLoginSuccess={handleLoginSuccess} restrictToUser />
    </div>
  );
}
