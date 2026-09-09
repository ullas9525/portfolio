// ============================================================
// HERO SCENE — a futuristic developer workstation
//   monitor + keyboard + phone
// ============================================================
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { isMobileAgent, motionSafe } from '../../utils/helpers';
import {
  makeMonitorTexture, makePhoneTexture, makeGridTexture,
} from './textures';
import { SceneLights, Rig, GlowDisc } from './common';

function Monitor() {
  const tex = useMemo(() => makeMonitorTexture(), []);
  return (
    <group position={[-1.6, 0, 0]}>
      <mesh position={[0, -1.34, 0]}>
        <boxGeometry args={[0.12, 0.9, 0.12]} />
        <meshStandardMaterial color="#1c2333" roughness={0.6} metalness={0.4} />
      </mesh>
      <mesh position={[0, -1.815, 0]}>
        <boxGeometry args={[0.9, 0.05, 0.5]} />
        <meshStandardMaterial color="#1c2333" roughness={0.6} metalness={0.4} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[3, 1.82, 0.09]} />
        <meshStandardMaterial color="#0b0f1a" roughness={0.5} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0.05, 0.062]}>
        <planeGeometry args={[2.8, 1.62]} />
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>
      <pointLight position={[0, 0.4, 1.5]} intensity={5} distance={5} color="#22d3ee" />
    </group>
  );
}

function Keyboard() {
  const keys = useMemo(() => new Array(26).fill(0).map((_, i) => i), []);
  return (
    <group position={[-1.5, -1.85, 0.7]} rotation={[0.02, 0, 0]}>
      <mesh>
        <boxGeometry args={[2.3, 0.07, 0.8]} />
        <meshStandardMaterial color="#161d2e" roughness={0.5} metalness={0.4} />
      </mesh>
      <group position={[-0.98, 0.065, -0.16]}>
        {keys.map((i) => (
          <mesh key={i} position={[(i % 13) * 0.16, 0, -Math.floor(i / 13) * 0.22]}>
            <boxGeometry args={[0.12, 0.05, 0.13]} />
            <meshStandardMaterial color="#2a3348" roughness={0.7} metalness={0.3} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Phone({ simple }) {
  const tex = useMemo(() => makePhoneTexture(0), []);
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current || !motionSafe) return;
    ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.5) * 0.02;
    ref.current.rotation.y = 0.45 + Math.sin(clock.elapsedTime * 0.35) * 0.18;
  });
  return (
    <group ref={ref} position={[0.95, -1.11, 0.55]} rotation={[0.12, 0.45, 0.06]}>
      <mesh>
        <boxGeometry args={[0.72, 1.46, 0.09]} />
        <meshStandardMaterial color="#1b2740" roughness={0.35} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[0.64, 1.34]} />
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>
      {!simple ? (
        <pointLight position={[0, 0, 1]} intensity={3} distance={4} color="#34d399" />
      ) : null}
    </group>
  );
}

export default function HeroScene() {
  const gridTex = useMemo(() => makeGridTexture(), []);
  const simple = isMobileAgent();

  return (
    <>
      <SceneLights intensity={0.9} />
      <Rig strength={0.22}>
        <group position={[1.6, -0.15, 0]}>
        {/* desk */}
        <mesh position={[-0.4, -1.92, 0]} receiveShadow>
          <boxGeometry args={[4.6, 0.16, 2.1]} />
          <meshStandardMaterial color="#121a2c" roughness={0.6} metalness={0.45} />
        </mesh>
        <mesh position={[-2.4, -2.6, 0.9]} rotation={[0, 0.4, 0]}>
          <boxGeometry args={[0.14, 1.3, 0.14]} />
          <meshStandardMaterial color="#1c2333" roughness={0.6} metalness={0.4} />
        </mesh>
        <mesh position={[0.9, -2.6, 0.9]} rotation={[0, -0.4, 0]}>
          <boxGeometry args={[0.14, 1.3, 0.14]} />
          <meshStandardMaterial color="#1c2333" roughness={0.6} metalness={0.4} />
        </mesh>

        {/* floor grid */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.3, -1.5]}>
          <planeGeometry args={[26, 20]} />
          <meshBasicMaterial map={gridTex} transparent opacity={0.6} depthWrite={false} />
        </mesh>

        <Monitor />
        <Keyboard />
        <Phone simple={simple} />

        <GlowDisc position={[0, -3.2, -2]} radius={7} opacity={0.4} color="#0b6aa8" />
        </group>
      </Rig>
    </>
  );
}