import { educationList } from '../../data/education';
import Icon from '../ui/Icons';
import SectionHeading, { Reveal } from '../ui/SectionHeading';
import CanvasScene from '../three/CanvasScene';
import EducationScene from '../three/EducationScene';

export default function Education() {
  return (
    <section className="section" id="education" aria-label="Education">
      <div className="wrap">
        <SectionHeading
          eyebrow="09 · Education"
          title="Where It's All Coming Together"
          sub="Bachelor of Engineering in Electronics and Communication Engineering — where theory meets the projects I build."
        />

        <Reveal>
          <div className="edu-stage">
            <CanvasScene camera={{ position: [0, 0.4, 6.4], fov: 50 }}>
              <EducationScene />
            </CanvasScene>
          </div>
        </Reveal>

        {educationList.map((edu, i) => (
          <Reveal key={edu.id} delay={0.08 * i}>
            <div className="glass edu-card">
              <span className="edu-card-icon">
                <Icon name="book2" size={26} />
              </span>
              <div>
                <h3>{edu.degree}</h3>
                <div className="edu-meta">
                  <span>{edu.field}</span>
                  <span>{edu.institution}</span>
                  <span>{edu.duration}</span>
                </div>
                <ul className="edu-highlights">
                  {edu.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}