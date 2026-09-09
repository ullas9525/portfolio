// ============================================================
// HERO SCENE — a futuristic developer workstation
//   monitor + keyboard + phone + floating code & project cards
// ============================================================
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { projects } from '../../data/projects';
import { isMobileAgent, motionSafe } from '../../utils/helpers';
import {
  makeMonitorTexture, makePhoneTexture, makeProjectCoverTexture, makeGridTexture, makeCodeFrame,
} from './textures';
import { SceneLights, Rig, Particles, GlowDisc, FloatGroup } from './common';

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

// Floating translucent "code" plane — pre-rendered animation frames
function CodePlane({ position, size = [1.7, 1.1], speed = 0.35 }) {
  const mesh = useRef();
  const frames = useMemo(
    () => {
      const list = [];
      for (let i = 0; i < 8; i++) {
        const c = makeCodeFrame(384, 240, i * 3);
        const t = new THREE.CanvasTexture(c);
        t.colorSpace = THREE.SRGBColorSpace;
        list.push(t);
      }
      return list;
    },
    []
  );
  useFrame(({ clock }) => {
    if (!mesh.current || !motionSafe) return;
    const idx = Math.floor(clock.elapsedTime * speed) % frames.length;
    if (mesh.current.material.map !== frames[idx]) mesh.current.material.map = frames[idx];
  });
  return (
    <mesh ref={mesh} position={position}>
      <planeGeometry args={size} />
      <meshBasicMaterial
        map={frames[0]}
        transparent
        opacity={0.5}
        toneMapped={false}
        depthWrite={false}
      />
    </mesh>
  );
}

// Floating mini project cover cards
function ProjectCard({ project, position, scale = 1 }) {
  const tex = useMemo(() => makeProjectCoverTexture({ ...project }, 512, 320), [project]);
  return (
    <FloatGroup speed={0.6} height={0.14}>
      <mesh position={position} scale={scale}>
        <planeGeometry args={[1.7, 1.05]} />
        <meshStandardMaterial map={tex} roughness={0.4} metalness={0.2} />
      </mesh>
      <pointLight position={[position[0], position[1], position[2] - 1.2]} intensity={1.5} distance={3} color={project.accent} />
    </FloatGroup>
  );
}

export default function HeroScene() {
  const gridTex = useMemo(() => makeGridTexture(), []);
  const simple = isMobileAgent();
  const covers = useMemo(() => [projects[0], projects[1]], []);

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

        {/* floating code planes */}
        {!simple && (
          <>
            <CodePlane position={[3.2, 1.1, -1.2]} size={[2.2, 1.4]} speed={0.5} />
            <CodePlane position={[2.6, 2.3, -2.0]} size={[1.6, 1.0]} speed={0.3} />
          </>
        )}

        {/* floating project covers */}
        {covers.map((p, i) => (
          <ProjectCard
            key={p.id}
            project={p}
            position={[i === 0 ? 3.0 : -3.2, i === 0 ? 1.5 : 2.2, i === 0 ? -1.6 : -0.5]}
            scale={i === 0 ? 0.95 : 0.7}
          />
        ))}

        {/* small technical floating objects */}
        <FloatGroup speed={0.7} height={0.1}>
          <mesh position={[1.6, 1.9, -2.2]}>
            <icosahedronGeometry args={[0.3, 0]} />
            <meshStandardMaterial color="#22d3ee" wireframe transparent opacity={0.8} />
          </mesh>
          <mesh position={[-0.6, 2.3, -1.4]} rotation={[0.6, 0.3, 0]}>
            <torusGeometry args={[0.36, 0.08, 12, 24]} />
            <meshStandardMaterial color="#818cf8" roughness={0.4} metalness={0.4} />
          </mesh>
          <mesh position={[3.4, -0.4, -0.4]} rotation={[0.4, 0, 0.4]}>
            <boxGeometry args={[0.34, 0.34, 0.34]} />
            <meshStandardMaterial color="#34d399" wireframe transparent opacity={0.7} />
          </mesh>
        </FloatGroup>

        <Particles count={simple ? 120 : 260} color="#7dd3fc" size={0.04} />
        <GlowDisc position={[0, -3.2, -2]} radius={7} opacity={0.4} color="#0b6aa8" />
        </group>
      </Rig>
    </>
  );
}