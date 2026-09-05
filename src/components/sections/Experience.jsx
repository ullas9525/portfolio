import { experienceList } from '../../data/education';
import SectionHeading, { Reveal } from '../ui/SectionHeading';

export default function Experience() {
  return (
    <section className="section section-dim" id="experience" aria-label="Experience">
      <div className="wrap">
        <SectionHeading
          eyebrow="10 · Experience"
          title="Built by Shipping"
          sub="Experience earned the honest way — independent end-to-end product building, plus an open seat for the right internship."
        />

        <div className="exp-timeline">
          {experienceList.map((exp, i) => (
            <Reveal key={exp.id} delay={0.06 * i}>
              <div className="glass exp-item">
                <h3>{exp.role}</h3>
                <div className="exp-org">{exp.org}</div>
                <div className="exp-meta">
                  <span>{exp.period}</span>
                  <span>{exp.type}</span>
                </div>
                <p>{exp.desc}</p>
                <div className="exp-tags">
                  {exp.tags.map((t) => (
                    <span className="chip" key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}