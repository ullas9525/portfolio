// ============================================================
// EDUCATION SCENE — a vertical glowing timeline with milestone
// rings, rendered subtly behind the education cards.
// ============================================================
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { educationList } from '../../data/education';
import { isMobileAgent, motionSafe } from '../../utils/helpers';
import { SceneLights, Particles, Rig, GlowDisc } from './common';

export default function EducationScene() {
  const group = useRef();
  const ringRefs = useRef([]);
  const simple = isMobileAgent();

  const milestones = useMemo(() => {
    return educationList.map((e, i) => ({ e, i }));
  }, []);

  useFrame((state, delta) => {
    if (!group.current || !motionSafe) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y += (Math.sin(t * 0.2) * 0.15 - group.current.rotation.y) * (1 - Math.exp(-4 * delta));
    ringRefs.current.forEach((m, i) => {
      if (!m) return;
      m.rotation.z = t * (0.2 + i * 0.05);
      m.rotation.x = Math.sin(t * 0.4 + i) * 0.15;
      const s = 1 + Math.sin(t * 1.2 + i * 1.5) * 0.06;
      m.scale.setScalar(s);
    });
  });

  return (
    <>
      <SceneLights intensity={0.75} />
      <Rig strength={0.25}>
        <group ref={group}>
          {/* central light column */}
          <mesh position={[0, 0, -0.5]}>
            <cylinderGeometry args={[0.03, 0.03, 7, 10]} />
            <meshBasicMaterial color="#818cf8" transparent opacity={0.7} toneMapped={false} />
          </mesh>
          {/* milestone rings */}
          {milestones.map(({ e, i }, idx) => (
            <group key={idx}>
              <mesh
                ref={(el) => (ringRefs.current[idx] = el)}
                position={[0, 2.4 - i * 2.4, -0.5]}
                rotation={[Math.PI / 2.5, 0, 0]}
              >
                <torusGeometry args={[1.5 - i * 0.25, 0.012, 8, 64]} />
                <meshBasicMaterial color="#a78bfa" transparent opacity={0.55} toneMapped={false} />
              </mesh>
              <mesh position={[0, 2.4 - i * 2.4, -0.5]}>
                <icosahedronGeometry args={[0.16, 0]} />
                <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={0.6} />
              </mesh>
            </group>
          ))}
          {/* floating fragments near top */}
          {!simple && (
            <>
              <mesh position={[1.8, 2.6, -1.4]} rotation={[0.5, 0.4, 0]}>
                <boxGeometry args={[0.4, 0.4, 0.4]} />
                <meshStandardMaterial color="#22d3ee" wireframe transparent opacity={0.7} />
              </mesh>
              <mesh position={[-1.7, 1.0, -1.2]} rotation={[0.3, 0.6, 0.4]}>
                <octahedronGeometry args={[0.3, 0]} />
                <meshStandardMaterial color="#34d399" wireframe transparent opacity={0.6} />
              </mesh>
            </>
          )}
        </group>
        <Particles count={simple ? 60 : 130} color="#818cf8" size={0.045} area={[8, 8, 7]} />
        <GlowDisc position={[0, -2.8, -2]} radius={5} color="#1e1b4b" opacity={0.45} />
      </Rig>
    </>
  );
}