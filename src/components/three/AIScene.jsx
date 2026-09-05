// ============================================================
// AI SCENE — an elegant neural-style network: layered nodes with
// animated signal lines, gently pulsing.
// ============================================================
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { isMobileAgent, motionSafe } from '../../utils/helpers';
import { SceneLights, Particles, Rig, GlowDisc } from './common';

const LAYERS = [4, 6, 6, 4, 2];

export default function AIScene() {
  const group = useRef();
  const nodeRefs = useRef([]);
  const simple = isMobileAgent();
  const reduced = simple ? 1 : 1; // scale layer sizes

  const layout = useMemo(() => {
    const lists = [];
    const lx = -2.6;
    LAYERS.forEach((count, li) => {
      const x = lx + li * 1.6;
      const points = [];
      for (let i = 0; i < count; i++) {
        const y = (i - (count - 1) / 2) * 0.75;
        points.push(new THREE.Vector3(x, y, Math.sin(li * 1.7) * 0.2));
      }
      lists.push(points);
    });
    return lists;
  }, []);

  const lines = useMemo(() => {
    const verts = [];
    layout.forEach((layer, li) => {
      if (!layout[li + 1]) return;
      layer.forEach((a) => {
        layout[li + 1].forEach((b) => {
          verts.push(a.x, a.y, a.z, b.x, b.y, b.z);
        });
      });
    });
    return new Float32Array(verts);
  }, [layout]);

  const nodes = useMemo(() => {
    const out = [];
    layout.forEach((layer, li) => {
      layer.forEach((p) => {
        out.push({
          p,
          isOut: li === layout.length - 1,
        });
      });
    });
    return out;
  }, [layout]);

  // helper (kept so index math stays obvious): total node count
  const totalNodes = nodes.length;

  useFrame((state, delta) => {
    if (!group.current || !motionSafe) return;
    const t = state.clock.elapsedTime;
    const k = 1 - Math.exp(-5 * delta);
    group.current.rotation.y += (Math.sin(t * 0.2) * 0.12 - group.current.rotation.y) * k;
    group.current.rotation.x += (Math.cos(t * 0.15) * 0.05 - group.current.rotation.x) * k;
    // pulse nodes like propagating signals
    for (let i = 0; i < totalNodes; i++) {
      const m = nodeRefs.current[i];
      if (!m) continue;
      const phase = t * 1.4 + i * 0.7;
      const s = 0.78 + Math.abs(Math.sin(phase)) * 0.52;
      m.scale.setScalar(s);
      m.material.emissiveIntensity = 0.3 + Math.abs(Math.sin(phase)) * 0.8;
    }
  });

  return (
    <>
      <SceneLights intensity={0.75} />
      <Rig strength={0.3}>
        <group ref={group}>
          {/* connections */}
          <lineSegments frustumCulled={false}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[lines, 3]} />
            </bufferGeometry>
            <lineBasicMaterial color="#f472b6" transparent opacity={0.16} />
          </lineSegments>
          {/* nodes */}
          {nodes.map((n, i) => (
            <mesh key={i} position={n.p} ref={(el) => (nodeRefs.current[i] = el)}>
              <sphereGeometry args={[0.16, 16, 16]} />
              <meshStandardMaterial
                color={n.isOut ? '#f472b6' : '#c4b5fd'}
                emissive={n.isOut ? '#f472b6' : '#a78bfa'}
                emissiveIntensity={0.4}
                roughness={0.3}
                metalness={0.3}
              />
            </mesh>
          ))}
        </group>
        {!simple && (
          <>
            <Particles count={130} color="#f472b6" size={0.04} area={[8, 7, 8]} />
            <GlowDisc position={[0, -2.7, -2]} radius={5.5} color="#500724" opacity={0.4} />
          </>
        )}
      </Rig>
    </>
  );
}