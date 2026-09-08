import Icon from '../ui/Icons';
import SectionHeading, { Reveal } from '../ui/SectionHeading';
import IoTBoard from '../ui/IoTBoard';

const items = [
  { icon: 'cpu', name: 'Arduino' },
  { icon: 'memory', name: 'ESP32' },
  { icon: 'wifi', name: 'ESP8266' },
  { icon: 'stack', name: 'Raspberry Pi' },
  { icon: 'wifi', name: 'Wi-Fi & Bluetooth' },
  { icon: 'cloud', name: 'Firebase Sync' },
  { icon: 'plug', name: 'Sensors & Actuators' },
  { icon: 'server', name: 'Cloud Integration' },
];

export default function IoT() {
  return (
    <section className="section section-dim" id="iot" aria-label="IoT and hardware">
      <div className="wrap">
        <SectionHeading
          eyebrow="06 · IoT & Hardware"
          title="Code That Touches Reality"
          sub="A miniature hardware lab — where embedded systems meet the cloud. Sensors, microcontrollers, wireless links and real-world monitoring."
        />

        <div className="iot-wrap">
          <Reveal>
            <div className="iot-stage">
              <IoTBoard />
            </div>
          </Reveal>

          <div>
            <div className="iot-items">
              {items.map(({ icon, name }, i) => (
                <Reveal key={name} delay={0.04 * i} y={14}>
                  <div className="iot-item">
                    {icon === 'memory' ? <Icon name="MdMemory" size={18} /> : <Icon name={icon} size={18} />}
                    {name}
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.15}>
              <p className="iot-note">
                <strong style={{ color: 'var(--text)' }}>PillDoze</strong> — my Arduino-powered smart pill reminder: 6 IR sensors, LEDs and a buzzer that warns on wrong-compartment access, all scheduled from a Flutter app over Bluetooth.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}