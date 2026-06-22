import Icon from '../ui/Icon';
import SectionHeading from '../ui/SectionHeading';
import { keyPrograms, programHighlights } from '../../data/content';
import './Programs.css';

export default function Programs() {
  return (
    <section id="programs" className="programs section">
      <div className="container">
        <SectionHeading
          eyebrow="Our Key Programs"
          title="Programs Built For"
          highlight="Tomorrow's Workforce"
          description="From certifications to franchising, our programs span the full
            skilling lifecycle — designed with industry and delivered with excellence."
        />

        <div className="programs__grid">
          {keyPrograms.map((program) => (
            <div className="program-card" key={program.title}>
              <div className="program-card__icon">
                <Icon name={program.icon} size={22} color="var(--orange)" />
              </div>
              <span>{program.title}</span>
            </div>
          ))}
        </div>

        <div className="programs__highlights">
          {programHighlights.map((item) => (
            <div className="highlight-card" key={item.title}>
              <div className="highlight-card__icon">
                <Icon name={item.icon} size={26} color="#fff" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
