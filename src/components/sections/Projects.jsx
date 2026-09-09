import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../../data/projects';
import Icon from '../ui/Icons';
import SectionHeading, { Reveal } from '../ui/SectionHeading';
import AccordionGallery from '../ui/AccordionGallery';
import { makeProjectCoverTexture } from '../three/textures';

// Use the project's real screenshot when available, but fall back to the
// existing procedural cover (name / type / status) if the file is missing,
// so the gallery never shows a broken image.
const galleryItems = projects.map((p) => {
  const procedural = makeProjectCoverTexture(p, 900, 1200).image.toDataURL();
  return {
    image: p.image || procedural,
    fallback: procedural,
    label: p.name,
    alt: p.blurb
  };
});

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
          sub="An expandable gallery of real, shipped work. Hover a cover to expand it and read the full story — problem, features, stack and links."
        />

        <Reveal>
          <div className="projects-stage">
            <AccordionGallery
              items={galleryItems}
              defaultIndex={0}
              expandRatio={0.4}
              trigger="hover"
              onChange={setSelected}
              accentColor="#22d3ee"
              overlayColor="#060a12"
              textColor="#e8eef7"
              grayscale
              showLabels
              duration={0.6}
              ease="power3.out"
              parallax={0.5}
              tilt={8}
              stagger={0.06}
              height={440}
              gap={10}
              radius={16}
              orientation="horizontal"
            />
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
            <div style={{ gridColumn: '1 / -1' }}>
              <h4>My contribution</h4>
              <p>{project.contribution}</p>
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