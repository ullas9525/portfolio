// ============================================================
// AppPhone — an original, fully 2D phone mockup that replaces
// the old rotating 3D handset. A Material-style app screen shows
// a header, a few skeleton cards and a floating action button;
// stack chips drift around the device. Decorative (aria-hidden).
// ============================================================
import Icon from './Icons';
import './AppPhone.css';

const CHIPS = [
  { icon: 'api', label: 'AI APIs' },
  { icon: 'layers', label: 'Provider' },
  { icon: 'cloud', label: 'Firebase' },
  { icon: 'rocket', label: 'Releases' },
  { icon: 'palette', label: 'Material 3' },
];

export default function AppPhone() {
  return (
    <div className="appphone" aria-hidden="true">
      {CHIPS.map((c, i) => (
        <span key={c.label} className={`appphone__chip appphone__chip--${i + 1}`}>
          <Icon name={c.icon} size={13} />
          <span>{c.label}</span>
        </span>
      ))}

      <div className="appphone__device">
        <span className="appphone__notch" />
        <div className="appphone__screen">
          <div className="appphone__status">
            <span>9:41</span>
            <span className="appphone__icons">
              <i /><i /><i />
            </span>
          </div>
          <div className="appphone__appbar">
            <span className="appphone__avatar" />
            <span className="appphone__appbar-t">Hello, Ullas</span>
          </div>
          <div className="appphone__cards">
            <span className="appphone__card" style={{ '--d': 0 }}>
              <span className="appphone__bar appphone__bar--w1" />
              <span className="appphone__bar appphone__bar--w2" />
              <span className="appphone__bar appphone__bar--w3" />
            </span>
            <span className="appphone__card" style={{ '--d': 0.35 }}>
              <span className="appphone__pill appphone__pill--full" />
              <span className="appphone__pill appphone__pill--half" />
            </span>
            <span className="appphone__card" style={{ '--d': 0.7 }}>
              <span className="appphone__row" />
              <span className="appphone__row" />
            </span>
          </div>
          <div className="appphone__nav">
            <i className="appphone__nav-i" />
            <i className="appphone__nav-i appphone__nav-i--on" />
            <i className="appphone__nav-i" />
          </div>
        </div>
        <span className="appphone__fab">
          <Icon name="spark" size={18} />
        </span>
      </div>
    </div>
  );
}