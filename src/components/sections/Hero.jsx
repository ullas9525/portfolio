import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../../data/profile';
import { scrollToId } from '../../utils/helpers';
import Icon, { SiGithub, FaLinkedin, SiLeetcode, TbMail } from '../ui/Icons';
import CanvasScene from '../three/CanvasScene';
import HeroScene from '../three/HeroScene';

/* typewriter that cycles sub-roles */
function useTypewriter(words, typeSpeed = 55, delSpeed = 28) {
  const [wordIdx, setWordIdx] = useState(0);
  const [sub, setSub] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx % words.length];
    let timeout;
    if (!deleting && sub === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1600);
    } else if (deleting && sub === 0) {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => setSub((s) => s + (deleting ? -1 : 1)),
        deleting ? delSpeed : typeSpeed
      );
    }
    return () => clearTimeout(timeout);
  }, [sub, deleting, wordIdx, words, typeSpeed, delSpeed]);

  return words[wordIdx % words.length].slice(0, sub);
}

const socials = [
  { label: 'GitHub', href: profile.links.github, icon: SiGithub },
  { label: 'LinkedIn', href: profile.links.linkedin, icon: FaLinkedin },
  { label: 'LeetCode', href: profile.links.leetcode, icon: SiLeetcode },
  { label: 'Email', href: `mailto:${profile.links.email}`, icon: TbMail },
];

export default function Hero() {
  const typed = useTypewriter(profile.heroKeywords);

  return (
    <section className="hero" id="home" aria-label="Introduction">
      <div className="hero-scene">
        <CanvasScene className="hero-canvas" camera={{ position: [0, 0.2, 8], fov: 42 }}>
          <HeroScene />
        </CanvasScene>
      </div>

      <div className="hero-grid wrap">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <span className="hero-kicker">
            <span className="live-dot" aria-hidden="true" /> Software Engineer
          </span>
          <h1 className="hero-name">
            {profile.nameFirst} <span className="grad">{profile.name.split(' ').slice(1).join(' ')}</span>
          </h1>

          <p className="hero-role" aria-label={`Roles: ${profile.titles.join(', ')}`}>
            {profile.titles.join('  |  ')} <span className="cursor" aria-hidden="true" />
          </p>

          <p className="hero-tagline">{profile.tagline}</p>

          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => scrollToId('projects')}>
              View Projects <Icon name="arrow" size={16} />
            </button>
            <button className="btn btn-ghost" onClick={() => scrollToId('contact')}>
              Contact Me
            </button>
            <a className="btn btn-ghost" href={profile.resumeUrl} download="Ullas_BR_Resume.pdf">
              <Icon name="download" size={15} /> Download Resume
            </a>
          </div>

          <div className="hero-socials">
            {socials.map(({ label, href, icon: Ic }) => (
              <a key={label} className="social-btn" href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}>
                <Ic size={18} />
              </a>
            ))}
            <span style={{ marginLeft: 6, fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-3)' }}>
              {typed}
              <span className="cursor" aria-hidden="true" />
            </span>
          </div>
        </motion.div>

        <motion.div
          className="hero-photo-wrap"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
        >
          <div className="hero-photo">
            <img src={profile.photo} alt={profile.photoAlt} width={340} height={453} loading="eager" />
            <div className="hero-photo-badge">
              <span>
                <span className="dot" aria-hidden="true" style={{ display: 'inline-block', marginRight: 7 }} /> open to work
              </span>
              <Icon name="code" size={14} />
            </div>
          </div>
        </motion.div>
      </div>

      <button className="hero-scroll" onClick={() => scrollToId('about')} aria-label="Scroll to About section">
        <Icon name="chevron" size={26} />
      </button>
    </section>
  );
}