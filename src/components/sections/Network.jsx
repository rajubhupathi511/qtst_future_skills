import meetingImg from '../../assets/images/meeting.png';
import Icon from '../ui/Icon';
import SectionHeading from '../ui/SectionHeading';
import { networkTeams, networkChapters } from '../../data/content';
import './Network.css';

const teamIcons = ['network', 'briefcase', 'building', 'globe', 'mic', 'flask', 'trophy', 'pin', 'check', 'calendar'];

export default function Network() {
  return (
    <section id="network" className="network section">
      <div className="container">
        <SectionHeading
          eyebrow="Global Future Skills Network"
          title="One Network,"
          highlight="Many Chapters"
          description="A structured network of teams and chapters working together —
            from the global secretariat down to university campuses — to deliver
            skilling at scale."
        />

        <div className="network__chapters">
          {networkChapters.map((chapter) => (
            <div className="chapter-card" key={chapter.title}>
              <div className="chapter-card__dot">
                <Icon name={chapter.icon} size={20} color="#fff" />
              </div>
              <h4>{chapter.title}</h4>
              <p>{chapter.desc}</p>
            </div>
          ))}
        </div>

        <div className="network__team">
          <div className="network__team-photo">
            <img src={meetingImg} alt="Team collaborating" />
          </div>

          <div className="network__team-body">
            <div className="network__team-head">
              <h3>Our Team</h3>
              <p className="network__team-sub">
                A multidisciplinary team driving every chapter of the network forward.
              </p>
            </div>

            <div className="network__team-grid">
              {networkTeams.map((team, i) => (
                <div className="team-card" key={team}>
                  <div className="team-card__icon">
                    <Icon name={teamIcons[i % teamIcons.length]} size={18} color="#fff" />
                  </div>
                  <span>{team}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
