// ============================================================
// AIPulse — an original, 2D "neural core" visual that replaces
// the old 3D network. A glowing core radiates pulsing rings while
// the key ML concepts revolve around it as chips (text stays
// upright as they orbit). Purely decorative (aria-hidden).
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

      {concepts.map((c, i) => (
        <span key={c} className="aipulse__chip" style={{ '--chipi': i, '--chipc': color }}>
          {c}
        </span>
      ))}
    </div>
  );
}