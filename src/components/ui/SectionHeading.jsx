import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { formatNumber, motionSafe } from '../../utils/helpers';

/** Animated count-up for stats */
export function CountUp({ end, duration = 1.4, format = formatNumber }) {
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (!motionSafe) {
      if (ref.current) ref.current.textContent = format(end);
      return undefined;
    }
    const el = ref.current;
    if (!el) return undefined;
    let raf = 0;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        obs.disconnect();
        const t0 = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - t0) / (duration * 1000));
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = format(Math.round(end * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [end, duration, format]);

  return <b ref={ref}>0</b>;
}

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