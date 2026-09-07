import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './JourneyTimeline.css';

/**
 * JourneyTimeline — an original vertical "learning path" component.
 * A glowing rail runs down the right side and fills as the section scrolls
 * into view; each milestone (degree / field / institution / highlights) is a
 * full-width card with a node on the right rail. Content is read from items.
 */
export default function JourneyTimeline({ items = [], railTop = 'var(--bg-2)', railBottom = 'var(--accent-2)' }) {
  const trackRef = useRef(null);
  const fillRef = useRef(null);

  // Drive the rail fill + node glow from scroll progress so the path
  // "builds" as you move down the page.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    let ticking = false;
    const compute = () => {
      ticking = false;
      const rect = track.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Progress = how far the track top has traveled from the bottom
      // of the viewport up to the top, normalized to [0, 1].
      const total = rect.height + vh * 0.6;
      const scrolled = vh - rect.top + vh * 0.15;
      const p = Math.min(1, Math.max(0, scrolled / total));

      if (fillRef.current) {
        fillRef.current.style.height = `${p * 100}%`;
      }
      // Dim nodes below the filled portion.
      const nodes = track.querySelectorAll('.journey__node');
      if (nodes) {
        nodes.forEach((n) => {
          const nr = n.getBoundingClientRect();
          const center = nr.top + nr.height / 2;
          const lit = center <= vh * 0.72;
          n.setAttribute('data-lit', lit ? 'true' : 'false');
        });
      }
    };
    const request = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(compute);
      }
    };

    request();
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
    };
  }, []);

  return (
    <div className="journey" ref={trackRef}>
      {/* continuous rail that fills */}
      <div className="journey__rail" aria-hidden="true">
        <span className="journey__rail-base" />
        <span
          ref={fillRef}
          className="journey__rail-fill"
          style={{
            background: `linear-gradient(180deg, ${railTop}, ${railBottom})`
          }}
        />
      </div>

      <div className="journey__grid">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            className="journey__milestone"
            initial={{ opacity: 0, y: 46 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="journey__card">
              <div className="journey__card-head">
                <span className="journey__badge">{item.year || 'Year'}</span>
                <span className="journey__type">{item.type || ''}</span>
              </div>
              <h3 className="journey__title">{item.degree}</h3>
              <div className="journey__meta">
                <span className="journey__meta-item">{item.field}</span>
                <span className="journey__meta-item">{item.institution}</span>
                <span className="journey__meta-item">{item.duration}</span>
              </div>
              <ul className="journey__highlights">
                {item.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>

            {/* node on the right rail */}
            <span className="journey__node" aria-hidden="true">
              <span className="journey__node-core" />
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}