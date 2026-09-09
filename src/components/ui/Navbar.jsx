import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { navLinks, profile } from '../../data/profile';
import { scrollToId } from '../../utils/helpers';
import Icon from './Icons';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        // active section detection
        let current = 'home';
        for (const link of navLinks) {
          const el = document.getElementById(link.id);
          if (el && el.getBoundingClientRect().top <= 120) current = link.id;
        }
        setActive(current);
        ticking.current = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <a className="logo" href="#home" aria-label="Back to top">
            <img className="logo-img" src={profile.logo} alt="Ullas B R logo" width={34} height={34} />
            <span style={{ display: active === 'home' ? 'inline' : 'inline' }}>{profile.name}</span>
          </a>

          <nav aria-label="Primary">
            <ul className="nav-links">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    className={`nav-link${active === l.id ? ' active' : ''}`}
                    href={`#${l.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(l.id);
                    }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            className="btn btn-ghost btn-sm nav-cta"
            href={profile.resumeUrl}
            download="Ullas_BR_Resume.pdf"
          >
            <Icon name="download" size={16} /> Resume
          </a>

          <button
            className="nav-burger"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
          >
            <Icon name={open ? 'close' : 'menu'} size={20} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="mobile-menu-backdrop"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            />
            <motion.nav
              className="mobile-menu"
              aria-label="Mobile"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
            {navLinks.map((l, i) => (
              <motion.a
                key={l.id}
                href={`#${l.id}`}
                className={active === l.id ? 'active' : ''}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.04 }}
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  setTimeout(() => scrollToId(l.id), 60);
                }}
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              className="btn btn-primary mobile-menu-cta"
              href={profile.resumeUrl}
              download="Ullas_BR_Resume.pdf"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Icon name="download" size={16} /> Download Resume
            </motion.a>
          </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}