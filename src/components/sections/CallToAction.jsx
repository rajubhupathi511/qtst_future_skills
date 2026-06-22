import { useState } from 'react';
import teamImg from '../../assets/images/team-discussion.png';
import Icon from '../ui/Icon';
import { contactInfo } from '../../data/content';
import './CallToAction.css';

export default function CallToAction() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent('Get in touch');
    const body = encodeURIComponent(`Please get in touch with me at: ${email}`);
    window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="cta">
      <div className="container cta__inner">
        <div className="cta__visual">
          <img src={teamImg} alt="Team reviewing a partnership proposal" />
        </div>

        <div className="cta__content">
          <div>
            <h2>Ready to Shape the Future of Skilling?</h2>
            <p>
              Partner with us, join a chapter, or enroll in a certification program —
              be part of a future-ready workforce movement.
            </p>
          </div>
          <form className="cta__form" onSubmit={handleSubmit}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@organization.org"
              className="cta__input"
            />
            <button type="submit" className="btn btn-primary">
              <Icon name="mail" size={16} /> Get in touch
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
