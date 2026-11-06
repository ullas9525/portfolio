import { motion } from 'framer-motion';

/** Scroll reveal motion wrapper */
export function Reveal({ children, delay = 0, y = 26, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function SectionHeading({ eyebrow, title, sub }) {
  return (
    <header className="section-head">
      <Reveal y={10}>
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <Reveal y={18} delay={0.06}>
        <h2 className="section-title">{title}</h2>
      </Reveal>
      {sub ? (
        <Reveal y={14} delay={0.12}>
          <p className="section-sub">{sub}</p>
        </Reveal>
      ) : null}
    </header>
  );
}