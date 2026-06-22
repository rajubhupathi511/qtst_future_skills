import booksImg from '../../assets/images/books.png';
import gradcapImg from '../../assets/images/gradcap.png';
import Icon from '../ui/Icon';
import SectionHeading from '../ui/SectionHeading';
import { pillars } from '../../data/content';
import './About.css';

export default function About() {
  return (
    <section id="about" className="about section">
      <div className="container about__inner">
        <div className="about__visual">
          <div className="about__visual-ring" />
          <div className="about__visual-blob about__visual-blob--orange" />
          <div className="about__visual-blob about__visual-blob--teal" />

          <div className="about__visual-card about__visual-card--main">
            <img src={booksImg} alt="Stack of books representing curriculum" />
          </div>
          <div className="about__visual-card about__visual-card--small">
            <img src={gradcapImg} alt="Graduation cap" />
          </div>
          <div className="about__visual-tag">
            <Icon name="pin" size={18} color="var(--orange-light)" />
            <div>
              <strong>Pan-India</strong>
              <span>Network of Centers</span>
            </div>
          </div>
        </div>

        <div className="about__content">
          <SectionHeading
            align="left"
            eyebrow="About Our Foundation"
            title="Empowering Futures Through"
            highlight="Skills, Innovation & Excellence"
          />
          <p className="about__desc">
            Quality Thought Future Skills Foundation is dedicated to building
            tomorrow's workforce through innovative skill development, global
            partnerships, and industry-aligned certification programs.
          </p>

          <div className="about__mission">
            <h3>Our Mission</h3>
            <p>
              To bridge the skills gap by delivering world-class certification
              programs, global skilling initiatives, and industry-aligned
              training for the workforce of tomorrow. Join us in shaping a
              future-ready workforce through innovation, education, and
              strategic partnerships.
            </p>
          </div>

          <div className="about__pillars">
            {pillars.map((pillar) => (
              <div className={`about__pillar about__pillar--${pillar.color}`} key={pillar.title}>
                <h4>{pillar.title}</h4>
                <ul>
                  {pillar.items.map((item) => (
                    <li key={item}>
                      <Icon name="check" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
