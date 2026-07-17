import { useState } from 'react';
import Icon from '../ui/Icon';
import Modal from '../ui/Modal';
import './Event.css';

const interestOptions = [
  { key: 'speaker', label: 'Nominate as Speaker', icon: 'mic' },
  { key: 'award', label: 'Nominate for Award', icon: 'trophy' },
  { key: 'sponsor', label: 'Sponsor the Event', icon: 'briefcase' },
  { key: 'presenter', label: 'Represent your organization at event', icon: 'flask' },
];

const initialForm = {
  name: '',
  mobile: '',
  email: '',
  org: '',
  designation: '',
  city: '',
  bio: '',
  speaker: false,
  award: false,
  sponsor: false,
  presenter: false,
};

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4177';

export default function Event({ open, onClose }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [passData, setPassData] = useState(null);

  const setField = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));
  const toggleInterest = (key) => setForm((f) => ({ ...f, [key]: !f[key] }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!/^\d{10}$/.test(form.mobile)) e.mobile = 'Enter a valid 10-digit number';
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.org.trim()) e.org = 'Required';
    if (!form.designation.trim()) e.designation = 'Required';
    if (!form.city.trim()) e.city = 'Required';
    if (!form.bio.trim()) e.bio = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitError('');
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/event-registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.error || 'Registration failed. Please try again.');
      }
      setPassData({ passId: data.passId, email: form.email, mobile: form.mobile, name: form.name });
      setSubmitted(true);
      setForm(initialForm);
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setSubmitError('');
    setErrors({});
    setPassData(null);
    onClose?.();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      eyebrow="Future Skills Summit"
      title="Register for the"
      highlight="Summit"
      description="Free entry · QR pass sent instantly · 08 Aug 2026, T-Works Hyderabad"
    >
      {submitted && passData ? (
        <div className="event__success-screen">
          <div className="event__success-icon">✅</div>
          <h3 className="event__success-title">Registration Successful!</h3>
          <p className="event__success-sub">
            Your pass has been confirmed. Login details have been sent to your email.
          </p>

          <button type="button" className="btn btn-primary event__success-close" onClick={handleClose}>
            Done <Icon name="arrow" size={16} />
          </button>
        </div>
      ) : (
      <form className="event__form" onSubmit={handleSubmit}>
        <div className="event__field">
          <label>Full Name <span>*</span></label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setField('name')(e.target.value)}
            placeholder="Your full name"
          />
          {errors.name && <span className="event__error">{errors.name}</span>}
        </div>

        <div className="event__row">
          <div className="event__field">
            <label>Mobile Number <span>*</span></label>
            <input
              type="tel"
              value={form.mobile}
              onChange={(e) => setField('mobile')(e.target.value)}
              placeholder="10-digit number"
            />
            {errors.mobile && <span className="event__error">{errors.mobile}</span>}
          </div>
          <div className="event__field">
            <label>Email <span>*</span></label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setField('email')(e.target.value)}
              placeholder="you@email.com"
            />
            {errors.email && <span className="event__error">{errors.email}</span>}
          </div>
        </div>

        <div className="event__row">
          <div className="event__field">
            <label>Organization <span>*</span></label>
            <input
              type="text"
              value={form.org}
              onChange={(e) => setField('org')(e.target.value)}
              placeholder="Company / Institution"
            />
            {errors.org && <span className="event__error">{errors.org}</span>}
          </div>
          <div className="event__field">
            <label>Designation <span>*</span></label>
            <input
              type="text"
              value={form.designation}
              onChange={(e) => setField('designation')(e.target.value)}
              placeholder="Your role"
            />
            {errors.designation && <span className="event__error">{errors.designation}</span>}
          </div>
        </div>

        <div className="event__field">
          <label>City <span>*</span></label>
          <input
            type="text"
            value={form.city}
            onChange={(e) => setField('city')(e.target.value)}
            placeholder="Your city"
          />
          {errors.city && <span className="event__error">{errors.city}</span>}
        </div>

        <div className="event__field">
          <label>Bio / Social Media Links <span>*</span></label>
          <input
            type="text"
            value={form.bio}
            onChange={(e) => setField('bio')(e.target.value)}
            placeholder="linkedin.com/in/you or @handle"
          />
          {errors.bio && <span className="event__error">{errors.bio}</span>}
        </div>

        <div className="event__interests">
          <span className="event__interests-title">Optional Interests</span>
          <div className="event__interests-grid">
            {interestOptions.map(({ key, label, icon }) => (
              <label key={key} className="event__checkbox">
                <input
                  type="checkbox"
                  checked={form[key]}
                  onChange={() => toggleInterest(key)}
                />
                <span className="event__checkbox-box">
                  <Icon name="check" size={12} color="#fff" />
                </span>
                <Icon name={icon} size={16} color="var(--orange)" />
                {label}
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary event__submit" disabled={submitting}>
          {submitting ? 'Submitting…' : <>Get My Free Pass <Icon name="arrow" size={16} /></>}
        </button>

        {submitError && (
          <p className="event__error event__error--banner">{submitError}</p>
        )}
      </form>
      )}
    </Modal>
  );
}
