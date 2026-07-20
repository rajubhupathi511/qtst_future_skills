import sponsorImg from '../../assets/focus/sponsor-education.png';
import Icon from '../ui/Icon';
import './SponsorEducation.css';

export default function SponsorEducation() {
  return (
    <section id="sponsor-education" className="sponsor section">
      <div className="sponsor__dotgrid" aria-hidden="true"></div>

      <div className="container sponsor__inner">
        <div className="sponsor__content" data-aos="fade-right" data-aos-duration="900">
          <span className="sponsor__eyebrow">Sponsor Education</span>
          <h2>
            Sponsor Education. <span className="sponsor__highlight">Change Lives.</span>
          </h2>
          <p className="sponsor__intro">Education has the power to transform generations.</p>
          <p>
            Through our sponsorship programmes, individuals and organizations can support
            deserving students by providing access to quality education, digital learning
            resources, skill development, scholarships, mentoring, and career guidance.
          </p>
          <p className="sponsor__tagline">Every sponsorship creates opportunities for brighter futures.</p>

          <a href="#contact" className="btn btn-primary sponsor__cta">
            Sponsor a Student Today <Icon name="arrow" size={16} />
          </a>
        </div>

        <div className="sponsor__visual" data-aos="fade-left" data-aos-delay="150">
          <div className="sponsor__orbit" aria-hidden="true"></div>
          <img src={sponsorImg} alt="A mentor handing a sponsored student their study materials in a library" />
        </div>
      </div>
    </section>
  );
}