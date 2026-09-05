import { achievements, githubData } from '../../data/achievements';
import Icon from '../ui/Icons';
import SectionHeading, { Reveal } from '../ui/SectionHeading';

const glowByIcon = {
  code: 'rgba(34,211,238,0.16)',
  flame: 'rgba(249,115,22,0.16)',
  rocket: 'rgba(129,140,248,0.16)',
  cpu: 'rgba(52,211,153,0.16)',
};

export default function Achievements() {
  return (
    <section className="section" id="achievements" aria-label="Achievements">
      <div className="wrap">
        <SectionHeading
          eyebrow="11 · Achievements"
          title="Proof of Consistency"
          sub="The numbers behind the grind — problems solved, streaks held, and products shipped."
        />

        <div className="ach-grid">
          {achievements.map((a, i) => (
            <Reveal key={a.title} delay={0.05 * i} y={22}>
              <div className="glass ach-card" style={{ '--ach-glow': glowByIcon[a.icon] || glowByIcon.code }}>
                <span className="ach-tag">{a.tag}</span>
                <span className="ach-icon">
                  <Icon name={a.icon} size={22} />
                </span>
                <h4>{a.title}</h4>
                <p>{a.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="ach-github-link">
            <a className="btn btn-ghost" href={githubData.profileUrl} target="_blank" rel="noreferrer">
              <Icon name="github" size={17} /> See everything on GitHub
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}