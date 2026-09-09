import { profile } from '../../data/profile';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>
          © {new Date().getFullYear()} <strong style={{ color: 'var(--text)' }}>{profile.name}</strong> — crafted with{' '}
          <span className="heart">♥</span>
        </p>
        <p className="mono">
          React · Flutter-inspired · built to ship
        </p>
      </div>
    </footer>
  );
}