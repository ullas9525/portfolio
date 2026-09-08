// ============================================================
// IoTCircuit — an original, creative "circuit data-flow" visual
// that replaces the old IoTBoard. A central Arduino hub connects
// to sensor nodes via animated circuit traces, with data pulses
// flowing toward a cloud node. Purely decorative (aria-hidden).
//
// Positioning: chips and SVG traces share ONE coordinate source.
// Node centers are computed in a 500x500 space; chips are placed
// at that same point as percentages (1 unit = 0.2%) while the
// SVG stretches with preserveAspectRatio="none", so every trace
// lands exactly under its chip at any stage size.
// ============================================================
import Icon from './Icons';
import './IoTCircuit.css';

// Compass angles (deg): 0 = top, ±90 = sides, ±180 = bottom.
// Six nodes spaced 60° apart and offset 30°, so the top-center
// lane stays clear for the CLOUD chip (no overlap at any size).
const SENSORS = [
  { label: 'IR Sensor', icon: 'plug', angle: -30 },
  { label: 'LED Array', icon: 'flame', angle: 30 },
  { label: 'Wi-Fi', icon: 'wifi', angle: -90 },
  { label: 'BLE', icon: 'bluetooth', angle: 90 },
  { label: 'Firebase', icon: 'cloud', angle: 150 },
  { label: 'Buzzer', icon: 'spark', angle: -150 },
];

const CX = 250; // hub center, viewBox units
const CY = 250;
const R = 160; // hub-to-sensor distance

// compass angle -> point in the shared 500x500 space
const pointAt = (deg, r = R) => {
  const rad = (deg * Math.PI) / 180;
  return { x: CX + r * Math.sin(rad), y: CY - r * Math.cos(rad) };
};

const REDUCED_MOTION =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function IoTCircuit() {
  return (
    <div className="iocircuit" aria-hidden="true">
      {/* background grid */}
      <div className="iocircuit__grid" />

      {/* circuit traces from hub to each sensor + cloud uplink */}
      <svg className="iocircuit__traces" viewBox="0 0 500 500" preserveAspectRatio="none">
        {SENSORS.map((s, i) => {
          const p = pointAt(s.angle);
          const rad = (s.angle * Math.PI) / 180;
          // gently bend each trace sideways (alternating) — the
          // quadratic curve still ends exactly on the node center
          const bend = (i % 2 === 0 ? 1 : -1) * 12;
          const mx = (CX + p.x) / 2 + bend * Math.cos(rad);
          const my = (CY + p.y) / 2 + bend * Math.sin(rad);
          const d = `M ${CX} ${CY} Q ${mx} ${my} ${p.x} ${p.y}`;
          return (
            <g key={s.label}>
              <path
                d={d}
                className="iocircuit__trace"
                style={{ animationDelay: `${i * -0.4}s` }}
              />
              {!REDUCED_MOTION && (
                <circle r="2.5" className="iocircuit__flow" opacity="0">
                  <animateMotion dur="2.8s" begin={`${i * 0.45}s`} repeatCount="indefinite" path={d} />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.12;0.85;1"
                    dur="2.8s"
                    begin={`${i * 0.45}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </g>
          );
        })}

        {/* uplink: hub -> cloud (starts under the hub edge) */}
        <path d="M 250 215 L 250 58" className="iocircuit__uplink" />
        {!REDUCED_MOTION && (
          <circle r="2.5" className="iocircuit__flow" opacity="0">
            <animateMotion dur="3.2s" repeatCount="indefinite" path="M 250 215 L 250 58" />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.15;0.8;1"
              dur="3.2s"
              repeatCount="indefinite"
            />
          </circle>
        )}
      </svg>

      {/* central Arduino hub */}
      <div className="iocircuit__hub">
        <span className="iocircuit__hub-icon"><Icon name="cpu" size={30} /></span>
        <span className="iocircuit__hub-label">ARDUINO</span>
        <span className="iocircuit__hub-sub">UNO R3</span>
      </div>

      {/* sensor nodes — centered on the exact trace endpoints */}
      {SENSORS.map((s, i) => {
        const p = pointAt(s.angle);
        return (
          <div
            key={s.label}
            className="iocircuit__sensor"
            style={{
              left: `${(p.x / 500) * 100}%`,
              top: `${(p.y / 500) * 100}%`,
              '--d': `${i * -0.5}s`,
            }}
          >
            <span className="iocircuit__sensor-dot" />
            <span className="iocircuit__sensor-icon">
              <Icon name={s.icon} size={16} />
            </span>
            <span className="iocircuit__sensor-label">{s.label}</span>
          </div>
        );
      })}

      {/* cloud node at top */}
      <div className="iocircuit__cloud">
        <Icon name="cloud" size={22} />
        <span>CLOUD</span>
      </div>

      {/* data flow pulses */}
      <div className="iocircuit__pulse iocircuit__pulse--1" />
      <div className="iocircuit__pulse iocircuit__pulse--2" />
      <div className="iocircuit__pulse iocircuit__pulse--3" />

      {/* status strip */}
      <div className="iocircuit__status">
        <span className="iocircuit__led iocircuit__led--on" title="PWR" />
        <span className="iocircuit__led iocircuit__led--sync" title="SYNC" />
        <span className="iocircuit__led iocircuit__led--alert" title="ALERT" />
        <span className="iocircuit__led iocircuit__led--on" title="DATA" />
      </div>
    </div>
  );
}
