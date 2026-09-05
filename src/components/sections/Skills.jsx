import { useState } from 'react';
import { skillCategories } from '../../data/skills';
import Icon from '../ui/Icons';
import SectionHeading, { Reveal } from '../ui/SectionHeading';
import CanvasScene from '../three/CanvasScene';
import SkillsScene from '../three/SkillsScene';

export default function Skills() {
  const [activeCat, setActiveCat] = useState(0);
  const [hoverSkill, setHoverSkill] = useState(null);

  const cat = skillCategories[activeCat];
  const info = hoverSkill || (cat ? cat.skills[0] : null);

  return (
    <section className="section section-dim" id="skills" aria-label="Skills and tech stack">
      <div className="wrap">
        <SectionHeading
          eyebrow="02 · Skills"
          title="The Stack I Build With"
          sub="Technologies organized as a living system — hover the 3D nodes or browse the list. No fake percentage bars, just the tools I actually ship with."
        />

        <div className="skills-wrap">
          <Reveal>
            <div className="skills-stage">
              <CanvasScene camera={{ position: [0, 0.2, 6.2], fov: 55 }}>
                <SkillsScene activeCat={activeCat} onHover={setHoverSkill} />
              </CanvasScene>
            </div>
          </Reveal>

          <div className="skills-panel">
            <Reveal>
              <div className="skill-cats" role="tablist" aria-label="Skill categories">
                {skillCategories.map((c, i) => (
                  <button
                    key={c.id}
                    role="tab"
                    aria-selected={activeCat === i}
                    className={`skill-cat${activeCat === i ? ' active' : ''}`}
                    onClick={() => {
                      setActiveCat(i);
                      setHoverSkill(null);
                    }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="glass skill-info" style={{ padding: 22 }}>
                <div className="skill-info-name">
                  {info && info.icon ? <Icon name={info.icon} size={24} /> : null}
                  <span style={{ background: 'var(--grad)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                    {info ? info.name : ''}
                  </span>
                </div>
                <p className="skill-info-note">{info ? info.note : ''}</p>
                <p className="skill-info-dots" style={{ marginTop: 12 }}>
                  {info ? `selected from · ${cat.label}` : ''} — {cat.skills.length} technologies
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="skill-cat-head">{cat.label}</div>
              <div className="skill-cat-sub">{cat.tagline}</div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="skill-list-mobile" role="list" aria-label={`${cat.label} skills`}>
                {cat.skills.map((s, i) => (
                  <button
                    key={s.name}
                    className={`skill-mobile-item${info && info.name === s.name ? ' active' : ''}`}
                    onClick={() => setHoverSkill(s)}
                  >
                    <Icon name={s.icon} size={16} />
                    {s.name}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}