import { useState } from 'react';
import { about } from '../../data/profile';
import Icon from '../ui/Icons';
import SectionHeading, { Reveal } from '../ui/SectionHeading';
import CanvasScene from '../three/CanvasScene';
import AboutScene from '../three/AboutScene';

export default function About() {
  const [active, setActive] = useState(0);

  return (
    <section className="section" id="about" aria-label="About Ullas B R">
      <div className="wrap">
        <SectionHeading
          eyebrow="01 · About"
          title={about.heading}
          sub={about.intro}
        />

        <div className="about-grid">
          <Reveal>
            <div className="about-stage">
              <CanvasScene camera={{ position: [0, 0, 6.4], fov: 50 }}>
                <AboutScene active={active} onHover={setActive} onLeave={() => {}} />
              </CanvasScene>
              <p className="about-hint">hover a cube — or pick a card →</p>
            </div>
          </Reveal>

          <div className="about-body">
            {about.blocks.map((block, i) => (
              <Reveal key={block.id} delay={0.05 * i} y={16}>
                <button
                  className={`about-card${active === i ? ' active' : ''}`}
                  onClick={() => setActive(active === i ? -1 : i)}
                  onMouseEnter={() => setActive(i)}
                  aria-expanded={active === i}
                >
                  <span className="about-card-icon">
                    <Icon name={block.icon} size={20} />
                  </span>
                  <span style={{ width: '100%' }}>
                    <span className="about-card-title">
                      {block.title}
                      <Icon name={active === i ? 'chevron' : 'arrow'} size={14} style={{ marginLeft: 'auto', opacity: 0.7 }} />
                    </span>
                    <span className="about-card-text">{block.text}</span>
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}