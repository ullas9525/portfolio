import { aiMl } from '../../data/achievements';
import Icon from '../ui/Icons';
import SectionHeading, { Reveal } from '../ui/SectionHeading';
import CanvasScene from '../three/CanvasScene';
import AIScene from '../three/AIScene';

export default function AISection() {
  return (
    <section className="section" id="ai" aria-label="AI and machine learning">
      <div className="wrap">
        <SectionHeading
          eyebrow="05 · AI / Machine Learning"
          title={aiMl.heading}
          sub={aiMl.intro}
        />

        <Reveal>
          <div className="ai-stage">
            <CanvasScene camera={{ position: [0, 0, 5.4], fov: 55 }}>
              <AIScene />
            </CanvasScene>
          </div>
        </Reveal>

        <div className="ai-pipe">
          {aiMl.pipeline.map((step, i) => (
            <Reveal key={step.name} delay={0.06 * i} y={20}>
              <div className="ai-step">
                <span className="step-no">{step.step}</span>
                <Icon name={step.icon} size={26} />
                <h4>{step.name}</h4>
                <p>{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="ai-concepts" aria-label="AI concepts covered">
            {aiMl.concepts.map((c) => (
              <span className="chip" key={c}>{c}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}