// ============================================================
// PROJECTS SCENE — floating project cards in an arc.
// Selecting a card eases it toward the camera while the
// detail panel appears in the DOM.
// ============================================================
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { makeProjectCoverTexture } from './textures';
import { isMobileAgent, motionSafe } from '../../utils/helpers';
import { SceneLights, Particles, Rig, GlowDisc } from './common';

const SPEEDS = [0.5, 0.62, 0.46, 0.7, 0.55];

function ProjectCard3D({ project, index, total, selected, onSelect, drag }) {
  const tex = useMemo(() => makeProjectCoverTexture(project, 640, 400), [project]);
  const group = useRef();
  const basePos = useMemo(() => {
    const a = (index / Math.max(1, total - 1)) * Math.PI - Math.PI * 0.62 + (isMobileAgent() ? 0.35 : 0);
    const r = isMobileAgent() ? 3.4 : 4.2;
    return new THREE.Vector3(Math.sin(a) * r * 1.1, Math.cos(a) * 0.6, -Math.cos(a) * r * 0.7);
  }, [index, total]);
  const baseRot = useMemo(() => [0, (index / Math.max(1, total - 1)) * 1.4 - 0.7, 0.04], [index, total]);
  const [hovered, setHovered] = useState(false);

  const target = useMemo(() => {
    const v = basePos.clone();
    if (selected) {
      v.multiplyScalar(0.22);
      v.z = 0.6;
      v.y = 0;
    } else if (hovered) {
      v.multiplyScalar(0.92);
      v.z += 0.2;
      v.y += 0.15;
    }
    return v;
  }, [basePos, selected, hovered]);

  useFrame((state, delta) => {
    if (!group.current || !motionSafe) return;
    const k = 1 - Math.exp(-6 * delta);
    group.current.position.lerp(target, k);
    const t = state.clock.elapsedTime;
    const wx = drag.current ? drag.current.x : 0;
    const ry = baseRot[1] + Math.sin(t * SPEEDS[index % SPEEDS.length]) * 0.05 + (selected ? 0.12 : 0);
    const rx = baseRot[0] + Math.cos(t * SPEEDS[(index + 2) % SPEEDS.length]) * 0.05;
    group.current.rotation.x += (rx - group.current.rotation.x) * k;
    group.current.rotation.y += (ry - group.current.rotation.y) * k;
    const targetS = selected ? 1.5 : hovered ? 1.12 : 1;
    group.current.scale.lerp(new THREE.Vector3(targetS, targetS, targetS), k);
  });

  return (
    <group
      ref={group}
      position={basePos}
      rotation={baseRot}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => { e.stopPropagation(); onSelect(index); }}
    >
      <mesh>
        <planeGeometry args={[2.3, 1.44]} />
        <meshStandardMaterial map={tex} roughness={0.35} metalness={0.15} />
      </mesh>
      {/* soft rim + accent edge */}
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[2.38, 1.52]} />
        <meshBasicMaterial color={project.accent} transparent opacity={selected ? 0.35 : hovered ? 0.2 : 0.07} depthWrite={false} />
      </mesh>
      <pointLight position={[0, 0, -1.4]} intensity={2.5} distance={3.5} color={project.accent} />
    </group>
  );
}

export default function ProjectsScene({ projects, selected, onSelect }) {
  const group = useRef();
  const drag = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!group.current || !motionSafe) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = Math.sin(t * 0.2) * 0.05 + drag.current.x * 0.02;
    group.current.rotation.x = Math.sin(t * 0.14) * 0.03;
  });

  return (
    <>
      <SceneLights intensity={0.9} />
      <Rig strength={0.16}>
        <group ref={group}>
          {projects.map((p, i) => (
            <ProjectCard3D
              key={p.id}
              project={p}
              index={i}
              total={projects.length}
              selected={selected === i}
              onSelect={onSelect}
              drag={drag}
            />
          ))}
        </group>
        <Particles count={isMobileAgent() ? 80 : 160} color="#a78bfa" size={0.05} area={[13, 7, 9]} />
        <GlowDisc position={[0, -2.8, -3]} radius={6.5} color="#312e81" opacity={0.35} />
      </Rig>
    </>
  );
}