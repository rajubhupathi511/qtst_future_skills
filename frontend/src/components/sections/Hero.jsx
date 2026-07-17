import Lottie from 'lottie-react';
import studyAnimation from '../../assets/lottie/study.json';
import Icon from '../ui/Icon';
import { stats } from '../../data/content';
import './Hero.css';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <span className="hero__badge" data-aos="fade-down" data-aos-delay="50">
            <span className="hero__badge-dot" /> Empowering Futures Through Skills
          </span>
          <h1 className="hero__title" data-aos="fade-up" data-aos-delay="150">
            Building Tomorrow's <span className="hero__title-highlight">Workforce</span>, Today
          </h1>
          <p className="hero__desc" data-aos="fade-up" data-aos-delay="280">
            Quality Thought Future Skills Foundation bridges the skills gap through
            world-class certification programs, global skilling initiatives, and
            industry-aligned training — shaping a future-ready workforce through
            innovation, education, and strategic partnerships.
          </p>
          <div className="hero__actions" data-aos="fade-up" data-aos-delay="400">
            <a href="#programs" className="btn btn-primary">
              Explore Programs <Icon name="arrow" size={16} />
            </a>
            <a href="#about" className="btn btn-outline">
              Learn More
            </a>
          </div>

          <div className="hero__stats" data-aos="fade-up" data-aos-delay="520">
            {stats.map((s) => (
              <div className="hero__stat" key={s.label}>
                <Icon name={s.icon} size={18} color="var(--orange-light)" />
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__visual" data-aos="zoom-in-left" data-aos-delay="300" data-aos-duration="900">
          <div className="hero__visual-glow" />
          <Lottie
            animationData={studyAnimation}
            loop
            autoplay
            className="hero__visual-img"
            aria-label="Student learning future skills"
          />

          <div className="hero__float hero__float--labs" data-aos="zoom-in" data-aos-delay="700">
            <span className="hero__float-chip">
              <Icon name="flask" size={16} color="var(--orange-light)" /> Tech Experience Labs
            </span>
          </div>
          <div className="hero__float hero__float--cert" data-aos="zoom-in" data-aos-delay="850">
            <span className="hero__float-chip">
              <Icon name="trophy" size={16} color="var(--teal)" /> Global Certifications
            </span>
          </div>
          <div className="hero__float hero__float--jobs" data-aos="zoom-in" data-aos-delay="1000">
            <span className="hero__float-chip">
              <Icon name="briefcase" size={16} color="var(--orange-light)" /> 300+ Hiring Partners
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
