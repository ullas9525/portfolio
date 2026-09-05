// ============================================================
// IOT SCENE — a miniature hardware lab: Arduino, breadboard,
// ESP32 module, blinking LEDs and jumper wires.
// ============================================================
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { isMobileAgent, motionSafe } from '../../utils/helpers';
import { SceneLights, Particles, Rig, FloatGroup, GlowDisc } from './common';

function LED({ position, color = '#f87171', phase = 0 }) {
  const bulb = useRef();
  useFrame(({ clock }) => {
    if (!bulb.current || !motionSafe) return;
    const on = Math.sin(clock.elapsedTime * 2.2 + phase) > 0;
    bulb.current.scale.setScalar(on ? 1 : 0.2);
    bulb.current.material.color.set(on ? color : '#3f1d1d');
  });
  return (
    <group position={position}>
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.03, 0.04, 0.1, 10]} />
        <meshStandardMaterial color="#334155" roughness={0.5} metalness={0.4} />
      </mesh>
      <mesh ref={bulb} position={[0, 0.12, 0]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} roughness={0.2} />
      </mesh>
    </group>
  );
}

function Wire({ from, to, color = '#e2e8f0' }) {
  const pos = useMemo(() => ({
    mid: [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2, (from[2] + to[2]) / 2],
    len: Math.sqrt((from[0] - to[0]) ** 2 + (from[1] - to[1]) ** 2 + (from[2] - to[2]) ** 2),
  }), [from, to]);
  const rotY = Math.atan2(to[0] - from[0], to[2] - from[2]);
  const rotX = Math.asin((to[1] - from[1]) / pos.len || 0);
  return (
    <mesh position={pos.mid} rotation={[rotX, rotY, 0]}>
      <cylinderGeometry args={[0.008, 0.008, pos.len, 6]} />
      <meshStandardMaterial color={color} roughness={0.5} metalness={0.2} />
    </mesh>
  );
}

function Breadboard() {
  const holes = useMemo(() => {
    const arr = [];
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 12; c++) {
        arr.push([(c - 5.5) * 0.13, r === 0 ? 0.05 : -0.05]);
      }
    }
    return arr;
  }, []);
  return (
    <group position={[0.1, 0.12, 0]} rotation={[0, 0.3, 0]}>
      <mesh>
        <boxGeometry args={[1.7, 0.1, 0.5]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} metalness={0.2} />
      </mesh>
      {holes.map(([x, z], i) => (
        <mesh key={i} position={[x, 0.07, z]}>
          <cylinderGeometry args={[0.02, 0.02, 0.04, 8]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function Arduino() {
  return (
    <group position={[-0.9, 0.2, 0.3]} rotation={[0, -0.2, 0]}>
      <mesh>
        <boxGeometry args={[1.1, 0.09, 0.72]} />
        <meshStandardMaterial color="#0f766e" roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0.25, 0.075, 0]}>
        <boxGeometry args={[0.42, 0.04, 0.3]} />
        <meshStandardMaterial color="#0b1220" roughness={0.3} />
      </mesh>
      <mesh position={[-0.35, 0.075, 0]}>
        <boxGeometry args={[0.1, 0.05, 0.1]} />
        <meshStandardMaterial color="#164e63" />
      </mesh>
      <mesh position={[0.4, 0.075, 0]}>
        <boxGeometry args={[0.28, 0.04, 0.14]} />
        <meshStandardMaterial color="#ec4899" />
      </mesh>
      <mesh position={[0.55, 0.07, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.05, 10]} />
        <meshStandardMaterial color="#1e293b" roughness={0.6} />
      </mesh>
    </group>
  );
}

function ESP32() {
  return (
    <group position={[-0.4, 0.16, -0.5]} rotation={[0, 0.7, 0]}>
      <mesh>
        <boxGeometry args={[0.6, 0.06, 0.9]} />
        <meshStandardMaterial color="#334155" roughness={0.5} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0.05, 0.22]}>
        <boxGeometry args={[0.3, 0.03, 0.2]} />
        <meshStandardMaterial color="#0b1220" />
      </mesh>
      {/* antenna */}
      <mesh position={[0, 0.35, -0.45]} rotation={[0.9, 0, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.55, 6]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
}

export default function IoTScene() {
  const simple = isMobileAgent();
  return (
    <>
      <SceneLights intensity={0.85} />
      <Rig strength={0.22}>
        {/* workbench */}
        <mesh position={[-0.2, 0.04, 0]} rotation={[0.05, 0, 0]}>
          <boxGeometry args={[4.4, 0.08, 2.2]} />
          <meshStandardMaterial color="#10182a" roughness={0.6} metalness={0.5} />
        </mesh>
        <mesh position={[-2.3, -0.55, 0]}>
          <boxGeometry args={[0.1, 1.1, 2.0]} />
          <meshStandardMaterial color="#1c2333" roughness={0.6} metalness={0.4} />
        </mesh>
        <mesh position={[1.9, -0.55, 0]}>
          <boxGeometry args={[0.1, 1.1, 2.0]} />
          <meshStandardMaterial color="#1c2333" roughness={0.6} metalness={0.4} />
        </mesh>

        <FloatGroup speed={0.5} height={0.05}>
          <Arduino />
          <Breadboard />
          <ESP32 />
          <LED position={[0.32, 0.25, 0.3]} color="#22d3ee" phase={0} />
          <LED position={[0.55, 0.25, 0.22]} color="#fbbf24" phase={2} />
          <LED position={[0.15, 0.42, -0.2]} color="#34d399" phase={4} />
          <Wire from={[0.52, 0.25, 0.62]} to={[0.5, 0.3, 0.22]} color="#fbbf24" />
          <Wire from={[-0.62, 0.26, 0.6]} to={[-0.1, 0.26, 0.1]} color="#22d3ee" />
        </FloatGroup>

        {!simple && (
          <>
            <Particles count={90} color="#fbbf24" size={0.04} area={[9, 5, 7]} />
            <GlowDisc position={[0, -1.4, -2]} radius={5} color="#78350f" opacity={0.4} />
          </>
        )}
      </Rig>
    </>
  );
}