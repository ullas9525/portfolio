// ============================================================
// IoTBoard — an original, fully 2D "hardware lab" that replaces
// the old 3D board. A stylized breadboard centers the ESP32
// core with labelled component modules (IR sensors, LEDs, buzzer,
// Wi-Fi) and blinking status LEDs. Decorative (aria-hidden).
// ============================================================
import Icon from './Icons';
import './IoTBoard.css';

const MODULES = [
  { label: 'IR × 6 Sensors', icon: 'plug', color: '#fbbf24' },
  { label: 'LED Array', icon: 'flame', color: '#34d399' },
  { label: 'Buzzer', icon: 'spark', color: '#f472b6' },
  { label: 'Wi-Fi · BLE', icon: 'wifi', color: '#22d3ee' },
];

export default function IoTBoard() {
  return (
    <div className="iotboard" aria-hidden="true">
      <div className="iotboard__corners">
        <i /><i /><i /><i />
      </div>
      <span className="iotboard__title">PILLDOZE · HARDWARE LAB</span>

      {/* central chip */}
      <div className="iotboard__core">
        <span className="iotboard__core-ic"><Icon name="cpu" size={26} /></span>
        <span className="iotboard__core-t">ESP32</span>
      </div>

      {/* component modules */}
      {MODULES.map((m, i) => (
        <span key={m.label} className={`iotboard__mod iotboard__mod--${i + 1}`}>
          <Icon name={m.icon} size={16} />
          <span>{m.label}</span>
        </span>
      ))}

      {/* status LEDs */}
      <div className="iotboard__leds">
        <span className="iotboard__led iotboard__led--green" title="ON" />
        <span className="iotboard__led iotboard__led--cyan" title="SYNC" />
        <span className="iotboard__led iotboard__led--amber" title="ALERT" />
        <span className="iotboard__led iotboard__led--green" title="PWR" />
      </div>
    </div>
  );
}