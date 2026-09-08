// ============================================================
// AIPulse — an original, 2D "neural core" visual that replaces
// the old 3D network. A glowing core radiates pulsing rings
// while orbiting nodes circle it, and key ML concepts float as
// chips around the edges. Purely decorative (aria-hidden).
// ============================================================
import Icon from './Icons';
import './AIPulse.css';

export default function AIPulse({ concepts = [], color = '#f472b6' }) {
  return (
    <div className="aipulse" aria-hidden="true">
      <span className="aipulse__ring aipulse__ring--1" />
      <span className="aipulse__ring aipulse__ring--2" />
      <span className="aipulse__ring aipulse__ring--3" />

      <span className="aipulse__core">
        <Icon name="brain" size={48} />
      </span>

      <span className="aipulse__orb aipulse__orb--1" />
      <span className="aipulse__orb aipulse__orb--2" />
      <span className="aipulse__orb aipulse__orb--3" />
      <span className="aipulse__orb aipulse__orb--4" />
      <span className="aipulse__orb aipulse__orb--5" />

      {concepts.map((c, i) => (
        <span key={c} className="aipulse__chip" style={{ '--chipi': i, '--chipc': color }}>
          {c}
        </span>
      ))}
    </div>
  );
}