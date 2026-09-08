// ============================================================
// SkillOrbit — an original, fully 2D "tech constellation" that
// replaces the old 3D node cluster. Skills are placed on an
// orbital ring around a glowing hub; hovering/focusing a node
// selects it (the parent drives the adjacent info panel).
// ============================================================
import Icon from './Icons';
import './SkillOrbit.css';

export default function SkillOrbit({ items = [], label = '', color = '#22d3ee', active = 0, onSelect }) {
  const n = items.length;
  const current = items[active];
  const step = n > 0 ? 360 / n : 0;

  return (
    <div className="orbit" style={{ '--orbit': color }} aria-label={`${label} skill constellation`}>
      {/* rings + crosshair backdrop */}
      <div className="orbit__halo" aria-hidden="true">
        <i className="orbit__ring orbit__ring--r1" />
        <i className="orbit__ring orbit__ring--r2" />
        <i className="orbit__ring orbit__ring--r3" />
        <span className="orbit__axis orbit__axis--x" />
        <span className="orbit__axis orbit__axis--y" />
      </div>

      {/* central hub — scales/glows with the active skill */}
      <div className="orbit__hub" aria-hidden="true">
        <span className="orbit__hub-icon">
          <Icon name={current ? current.icon : 'code'} size={30} />
        </span>
        <span className="orbit__hub-meta">{n} {label.toUpperCase()}</span>
      </div>

      {/* orbiting nodes */}
      {items.map((s, i) => (
        <button
          key={s.name}
          className={`orbit__node${i === active ? ' is-active' : ''}`}
          style={{ '--rot': `${step * i}deg` }}
          onMouseEnter={() => onSelect && onSelect(i)}
          onFocus={() => onSelect && onSelect(i)}
          onClick={() => onSelect && onSelect(i)}
          aria-pressed={i === active}
          aria-label={s.name}
          tabIndex={0}
        >
          <span className="orbit__node-core">
            <Icon name={s.icon} size={22} />
          </span>
          <span className="orbit__node-tip">{s.name}</span>
        </button>
      ))}
    </div>
  );
}