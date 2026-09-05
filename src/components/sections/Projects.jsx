import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../../data/projects';
import Icon from '../ui/Icons';
import SectionHeading, { Reveal } from '../ui/SectionHeading';
import CanvasScene from '../three/CanvasScene';
import ProjectsScene from '../three/ProjectsScene';

export default function Projects() {
  const [selected, setSelected] = useState(0);

  const project = projects[selected];
  const hasDemo = Boolean(project && project.demo);

  return (
    <section className="section" id="projects" aria-label="Projects">
      <div className="wrap">
        <SectionHeading
          eyebrow="03 · Projects"
          title="Things I've Built"
          sub="A 3D gallery of real, shipped work. Click a card to pull it toward you and read the full story — problem, features, stack and links."
        />

        <Reveal>
          <div className="projects-stage">
            <CanvasScene camera={{ position: [0, 0.2, 6.4], fov: 52 }}>
              <ProjectsScene projects={projects} selected={selected} onSelect={setSelected} />
            </CanvasScene>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="projects-reel" role="tablist" aria-label="Projects">
            {projects.map((p, i) => (
              <button
                key={p.id}
                role="tab"
                aria-selected={selected === i}
                className={`project-tab${selected === i ? ' active' : ''}`}
                onClick={() => setSelected(i)}
              >
                <span className="num">0{i + 1}</span>
                <span className="nm">{p.name}</span>
                <span className={`st ${p.status === 'Live' ? 'st-live' : 'st-soon'}`}>{p.status}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div
          key={project.id}
          className="glass project-detail"
          style={{ '--pd-accent': project.accent }}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="project-detail-title">
            {project.name}
            <span className="project-detail-type">{project.type}</span>
            {!hasDemo && <span className="st st-soon">Live demo · Coming Soon</span>}
          </div>

          <p className="project-summary">{project.description}</p>

          <div className="project-rows">
            <div>
              <h4>Problem solved</h4>
              <p>{project.problemSolved}</p>
            </div>
            <div>
              <h4>Key features</h4>
              <ul className="project-features">
                {project.keyFeatures.slice(0, 5).map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="project-rows" style={{ marginTop: 20 }}>
            <div>
              <h4>My contribution</h4>
              <p>{project.contribution}</p>
            </div>
            <div>
              <h4>Screenshots & docs</h4>
              <p>
                Grab screenshots, README and release assets from the GitHub repository — every project ships with docs and live links.
              </p>
            </div>
          </div>

          <div className="project-tech" aria-label="Technologies used">
            {project.tech.map((t) => (
              <span className="chip" key={t}>{t}</span>
            ))}
          </div>

          <div className="project-cta">
            <a className="btn btn-primary" href={project.github} target="_blank" rel="noreferrer">
              <Icon name="github" size={17} /> GitHub Repo
            </a>
            {hasDemo ? (
              <a className="btn btn-ghost" href={project.demo} target="_blank" rel="noreferrer">
                <Icon name="external" size={15} /> Live Demo
              </a>
            ) : (
              <span className="btn btn-ghost" style={{ cursor: 'default', opacity: 0.7 }}>
                <Icon name="external" size={15} /> Live demo soon
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}