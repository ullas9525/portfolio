import { useState } from 'react';
import { skillCategories } from '../../data/skills';
import Icon from '../ui/Icons';
import SectionHeading, { Reveal } from '../ui/SectionHeading';
import SkillOrbit from '../ui/SkillOrbit';

export default function Skills() {
  const [activeCat, setActiveCat] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);

  const cat = skillCategories[activeCat];
  const info = cat ? cat.skills[activeIdx] : null;

  return (
    <section className="section section-dim" id="skills" aria-label="Skills and tech stack">
      <div className="wrap">
        <SectionHeading
          eyebrow="02 · Skills"
          title="The Stack I Build With"
          sub="Technologies organized as a living constellation — hover a node or browse the list. No fake percentage bars, just the tools I actually ship with."
        />

        <div className="skills-wrap">
          <Reveal>
            <div className="skills-stage">
              <SkillOrbit
                items={cat.skills}
                label={cat.id}
                color={cat.color}
                active={activeIdx}
                onSelect={setActiveIdx}
              />
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
                      setActiveIdx(0);
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
                    onClick={() => setActiveIdx(i)}
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