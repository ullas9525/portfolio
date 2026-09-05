// ============================================================
// SKILLS SCENE — each category is a cluster of glowing nodes
// connected to a hub. Hovering a node reports the skill info.
// ============================================================
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { skillCategories } from '../../data/skills';
import { isMobileAgent, motionSafe } from '../../utils/helpers';
import { SceneLights, Particles, Rig, GlowDisc } from './common';

function Cluster({ cat, index, total, active, onHover, muted }) {
  const group = useRef();
  const angle = (index / total) * Math.PI * 1.7 - 1.4;
  const radius = 5;
  const center = [Math.sin(angle) * radius, 0, -Math.cos(angle) * radius];
  const simple = isMobileAgent();

  const nodes = useMemo(() => {
    return cat.skills.map((s, i) => {
      const a = (i / Math.max(1, cat.skills.length)) * Math.PI * 2;
      const r = simple ? 0.9 : 1.25;
      return { ...s, pos: [Math.cos(a) * r, Math.sin(a) * r * 0.8, 0] };
    });
  }, [cat, simple]);

  const lineVerts = useMemo(() => {
    const arr = [];
    nodes.forEach((n) => {
      arr.push(center[0], center[1], center[2], n.pos[0], n.pos[1], n.pos[2]);
    });
    return new Float32Array(arr);
  }, [nodes, center]);

  const nodeRefs = useRef([]);

  useFrame((state, delta) => {
    if (!group.current || !motionSafe) return;
    const t = state.clock.elapsedTime;
    const k = 1 - Math.exp(-5 * delta);
    // spotlight the active cluster with a gentle pulse
    const scale = active ? 1 + Math.sin(t * 2) * 0.04 : 1;
    group.current.scale.lerp(new THREE.Vector3(scale, scale, scale), k);
    nodeRefs.current.forEach((m, i) => {
      if (!m) return;
      const s = m.userData.hover ? 1.6 : 1;
      m.scale.lerp(new THREE.Vector3(s, s, s), k);
      m.material.emissiveIntensity = THREE.MathUtils.lerp(
        m.material.emissiveIntensity,
        m.userData.hover ? 1 : 0.35,
        k
      );
    });
  });

  return (
    <group position={center} ref={group}>
      {/* hub */}
      <mesh>
        <icosahedronGeometry args={[0.28, 0]} />
        <meshStandardMaterial color={cat.color} emissive={cat.color} emissiveIntensity={0.5} roughness={0.3} metalness={0.3} />
      </mesh>
      <pointLight intensity={8} distance={4} color={cat.color} />
      {/* connector lines */}
      <lineSegments frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lineVerts, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={cat.color} transparent opacity={active ? 0.5 : 0.22} />
      </lineSegments>
      {/* skill nodes */}
      {nodes.map((n, i) => (
        <mesh
          key={i}
          position={n.pos}
          ref={(el) => (nodeRefs.current[i] = el)}
          onPointerOver={(e) => { e.stopPropagation(); nodeRefs.current[i].userData.hover = true; onHover && onHover(n); }}
          onPointerOut={() => { if (nodeRefs.current[i]) nodeRefs.current[i].userData.hover = false; onHover && onHover(null); }}
          onClick={(e) => { e.stopPropagation(); nodeRefs.current[i].userData.hover = !nodeRefs.current[i].userData.hover; onHover && onHover(nodeRefs.current[i].userData.hover ? n : null); }}
        >
          <sphereGeometry args={[0.18, 20, 20]} />
          <meshStandardMaterial
            color={cat.color}
            emissive={cat.color}
            emissiveIntensity={0.35}
            roughness={0.25}
            metalness={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function SkillsScene({ activeCat = 0, onHover }) {
  const group = useRef();
  const simple = isMobileAgent();
  const total = skillCategories.length;
  const baseAngle = useRef(0);

  useFrame((state, delta) => {
    if (!group.current || !motionSafe) return;
    const k = 1 - Math.exp(-3 * delta);
    const targetAngle = (activeCat / total) * Math.PI * 1.7 - 1.4;
    baseAngle.current = THREE.MathUtils.lerp(baseAngle.current, targetAngle, k);
    const dot = Math.sin(targetAngle - baseAngle.current);
    group.current.rotation.y = baseAngle.current + state.clock.elapsedTime * 0.0;
  });

  return (
    <>
      <SceneLights intensity={0.7} />
      <Rig strength={0.25}>
        <group ref={group}>
          {skillCategories.map((cat, i) => (
            <Cluster
              key={cat.id}
              cat={cat}
              index={i}
              total={total}
              active={activeCat === i}
              onHover={onHover}
            />
          ))}
        </group>
        {!simple && (
          <>
            <Particles count={120} color="#818cf8" size={0.045} area={[9, 6, 7]} />
            <GlowDisc position={[0, -2.7, -3]} radius={5.5} color="#1e1b4b" opacity={0.4} />
          </>
        )}
      </Rig>
    </>
  );
}