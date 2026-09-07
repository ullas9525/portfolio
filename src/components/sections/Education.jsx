import { educationList } from '../../data/education';
import SectionHeading, { Reveal } from '../ui/SectionHeading';
import JourneyTimeline from '../ui/JourneyTimeline';

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
            <JourneyTimeline items={educationList} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}