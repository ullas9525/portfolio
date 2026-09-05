import { profile } from '../../data/profile';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>
          © {new Date().getFullYear()} <strong style={{ color: 'var(--text)' }}>{profile.name}</strong> — crafted with{' '}
          <span className="heart">♥</span> and a little WebGL.
        </p>
        <p className="mono">
          React · Three.js · Flutter-inspired · built to ship
        </p>
      </div>
    </footer>
  );
}