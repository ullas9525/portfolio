// ============================================================
// ABOUT SCENE — floating gem cubes, one per profile block.
// The DOM cards drive `active`; hovering cubes highlights too.
// ============================================================
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { about } from '../../data/profile';
import { isMobileAgent, motionSafe } from '../../utils/helpers';
import { SceneLights, Particles, GlowDisc, Rig } from './common';

const BASE_COLORS = ['#22d3ee', '#818cf8', '#34d399', '#f472b6', '#fbbf24', '#a78bfa', '#38bdf8'];

export default function AboutScene({ active, onHover, onLeave }) {
  const simple = isMobileAgent();
  const refs = useRef([]);
  const group = useRef();

  const layout = useMemo(() => {
    const blocks = about.blocks;
    // Face-culling the extra blocks on mobile keeps the scene uncluttered
    const list = simple ? blocks.slice(0, 4) : blocks;
    const angle0 = simple ? -0.9 : -2.4;
    const spread = simple ? 0.5 : 0.66;
    return list.map((b, i) => {
      const a = angle0 + (i / Math.max(1, list.length - 1)) * (simple ? 1.8 : 4.8);
      const r = simple ? 1.7 : 3.1;
      return {
        id: b.id,
        pos: [Math.sin(a) * r, simple ? 0 : (i % 2 === 0 ? 0.9 : -0.6), -Math.cos(a) * r],
        color: BASE_COLORS[i % BASE_COLORS.length],
      };
    });
  }, [simple]);

  useFrame((state, delta) => {
    if (!group.current || !motionSafe) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = Math.sin(t * 0.14) * 0.12;
    const k = 1 - Math.exp(-8 * delta);
    refs.current.forEach((m, i) => {
      if (!m) return;
      const item = layout[i];
      if (!item) return;
      const hot = m.userData.hover || active === i;
      const targetS = hot ? 1.22 : 1;
      m.scale.lerp(new THREE.Vector3(targetS, targetS, targetS), k);
      m.material.emissiveIntensity = THREE.MathUtils.lerp(
        m.material.emissiveIntensity,
        hot ? 0.7 : 0.14,
        k
      );
      m.material.opacity = THREE.MathUtils.lerp(m.material.opacity, hot ? 1 : 0.92, k);
    });
  });

  return (
    <>
      <SceneLights intensity={0.8} />
      <Rig strength={0.3} tilt={0.004}>
        <group ref={group}>
          {layout.map((item, i) => (
            <group key={i}
              position={item.pos}
              rotation={[0.4 + i * 0.17, i * 0.6, 0.2 + (i % 3) * 0.12]}
            >
              <mesh
                ref={(el) => (refs.current[i] = el)}
                onPointerOver={(e) => { e.stopPropagation(); (refs.current[i].userData.hover = true); onHover && onHover(i); }}
                onPointerOut={() => { if (refs.current[i]) refs.current[i].userData.hover = false; onLeave && onLeave(); }}
                onClick={(e) => { e.stopPropagation(); onHover && onHover(i); }}
                castShadow
              >
                <boxGeometry args={[0.62, 0.62, 0.62]} />
                <meshStandardMaterial
                  color={item.color}
                  emissive={item.color}
                  emissiveIntensity={0.14}
                  transparent
                  opacity={0.92}
                  roughness={0.25}
                  metalness={0.4}
                />
              </mesh>
              <mesh scale={1.35}>
                <boxGeometry args={[0.62, 0.62, 0.62]} />
                <meshBasicMaterial color={item.color} wireframe transparent opacity={0.18} />
              </mesh>
            </group>
          ))}
        </group>
        {!simple && (
          <>
            <Particles count={150} color="#818cf8" size={0.05} area={[10, 8, 8]} />
            <GlowDisc position={[0, -2.6, -2]} radius={6} color="#312e81" opacity={0.35} />
          </>
        )}
      </Rig>
    </>
  )
}