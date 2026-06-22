import studyImg from '../../assets/images/study-illustration.png';
import Icon from '../ui/Icon';
import { stats } from '../../data/content';
import './Hero.css';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <span className="hero__badge">
            <span className="hero__badge-dot" /> Empowering Futures Through Skills
          </span>
          <h1 className="hero__title">
            Building Tomorrow's <span className="hero__title-highlight">Workforce</span>, Today
          </h1>
          <p className="hero__desc">
            Quality Thought Future Skills Foundation bridges the skills gap through
            world-class certification programs, global skilling initiatives, and
            industry-aligned training — shaping a future-ready workforce through
            innovation, education, and strategic partnerships.
          </p>
          <div className="hero__actions">
            <a href="#programs" className="btn btn-primary">
              Explore Programs <Icon name="arrow" size={16} />
            </a>
            <a href="#about" className="btn btn-outline">
              Learn More
            </a>
          </div>

          <div className="hero__stats">
            {stats.map((s) => (
              <div className="hero__stat" key={s.label}>
                <Icon name={s.icon} size={18} color="var(--orange-light)" />
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__visual-glow" />
          <img src={studyImg} alt="Student learning future skills" className="hero__visual-img" />
        </div>
      </div>
    </section>
  );
}
