// ============================================================
// CONTACT SCENE — a calm final backdrop: drifting rings, soft
// glow and sparse particles. Content lives in the DOM above it.
// ============================================================
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { isMobileAgent, motionSafe } from '../../utils/helpers';
import { SceneLights, Particles, Rig, GlowDisc } from './common';

export default function ContactScene() {
  const rings = useRef([]);
  const simple = isMobileAgent();

  useFrame((state, delta) => {
    if (!motionSafe) return;
    const t = state.clock.elapsedTime;
    rings.current.forEach((m, i) => {
      if (!m) return;
      m.rotation.z = t * (0.06 + i * 0.02);
      m.rotation.x = Math.PI / 2.6 + Math.sin(t * 0.15 + i) * 0.08;
      m.position.y = Math.sin(t * 0.3 + i * 2) * 0.4;
      m.scale.setScalar(1 + Math.sin(t * 0.4 + i) * 0.04);
    });
  });

  return (
    <>
      <SceneLights intensity={0.6} />
      <Rig strength={0.18}>
        {[0, 1, 2].map((i) => (
          <mesh
            key={i}
            ref={(el) => (rings.current[i] = el)}
            position={[i === 0 ? -2.4 : i === 1 ? 2.6 : 0, i === 2 ? 1.6 : -0.4, -3 - i * 0.8]}
          >
            <torusGeometry args={[1.1 + i * 0.35, 0.015, 8, 72]} />
            <meshBasicMaterial color={i === 1 ? '#818cf8' : '#22d3ee'} transparent opacity={0.4} toneMapped={false} />
          </mesh>
        ))}
        {!simple && (
          <>
            <mesh position={[-3.2, 2.4, -1.5]}>
              <icosahedronGeometry args={[0.5, 0]} />
              <meshStandardMaterial color="#22d3ee" wireframe transparent opacity={0.5} />
            </mesh>
            <mesh position={[3.4, -1.8, -1]} rotation={[0.4, 0.3, 0]}>
              <octahedronGeometry args={[0.45, 0]} />
              <meshStandardMaterial color="#34d399" wireframe transparent opacity={0.45} />
            </mesh>
          </>
        )}
        <Particles count={simple ? 50 : 110} color="#7dd3fc" size={0.04} area={[16, 8, 12]} />
        <GlowDisc position={[0, -2.9, -2]} radius={9} opacity={0.28} color="#0f3a52" />
      </Rig>
    </>
  );
}