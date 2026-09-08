// ============================================================
// DSA SCENE — futuristic coding terminal with animated output
// plus floating "topic" chips (procedural textures).
// ============================================================
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { leetcode } from '../../data/leetcode';
import { makeTerminalFrame } from './textures';
import { isMobileAgent, motionSafe } from '../../utils/helpers';
import { SceneLights, Particles, GlowDisc } from './common';

const TOPICS = ['binary_search', 'dp', 'graphs', 'two_pointers', 'heaps'];

function TopicChip({ label, position, color = '#22d3ee' }) {
  const tex = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 300;
    c.height = 80;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#0a101d';
    ctx.beginPath();
    ctx.roundRect(4, 4, 292, 72, 22);
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.globalAlpha = 0.6;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(4, 4, 292, 72, 22);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = color;
    ctx.font = '700 26px "JetBrains Mono", monospace';
    ctx.fillText(label, 26, 50);
    return new THREE.CanvasTexture(c);
  }, [label, color]);
  return (
    <mesh position={position}>
      <planeGeometry args={[0.9, 0.26]} />
      <meshBasicMaterial map={tex} transparent toneMapped={false} depthWrite={false} />
    </mesh>
  );
}

function Terminal() {
  const frames = useMemo(() => {
    const list = [];
    const snippet = leetcode.terminalSnippet;
    for (let i = 0; i <= snippet.length; i++) {
      const c = makeTerminalFrame(snippet, i);
      const t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.SRGBColorSpace;
      list.push(t);
    }
    return list;
  }, []);
  const screen = useRef();
  useFrame(({ clock }) => {
    if (!screen.current || !screen.current.material || !motionSafe) return;
    const idx = Math.floor(clock.elapsedTime * 1.1) % frames.length;
    if (screen.current.material.map !== frames[idx]) screen.current.material.map = frames[idx];
  });
  return (
    <group position={[0, 0.6, 0]}>
      <mesh position={[0, -0.9, 0]}>
        <boxGeometry args={[0.1, 0.7, 0.12]} />
        <meshStandardMaterial color="#1c2333" roughness={0.6} metalness={0.4} />
      </mesh>
      <mesh position={[0, -0.55, 0]}>
        <boxGeometry args={[0.5, 0.06, 0.6]} />
        <meshStandardMaterial color="#1c2333" roughness={0.6} metalness={0.4} />
      </mesh>
      <mesh>
        <boxGeometry args={[2.6, 1.7, 0.1]} />
        <meshStandardMaterial color="#0b0f1a" roughness={0.5} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0, 0.06]} ref={screen}>
        <planeGeometry args={[2.4, 1.5]} />
        <meshBasicMaterial map={frames[0]} toneMapped={false} />
      </mesh>
      <pointLight position={[0, 1, 1.4]} intensity={5} distance={5} color="#22d3ee" />
    </group>
  );
}

export default function DSAScene() {
  const simple = isMobileAgent();
  return (
    <>
      <SceneLights intensity={0.55} />
      {/* Static stage: the terminal never spins/tilts — it always
          faces the user down +z (the 3D rig was removed). */}
      <Terminal />

      {!simple && (
        <>
          <TopicChip label="binary_search" position={[-2.6, 1.5, -1]} color="#22d3ee" />
          <TopicChip label="dp[k]" position={[2.6, 1.2, -1.4]} color="#818cf8" />
          <TopicChip label="graphs" position={[-2.2, -1.3, -0.5]} color="#34d399" />
          <TopicChip label="two_pointers" position={[2.5, -1.0, -0.8]} color="#f472b6" />
        </>
      )}

      <Particles count={simple ? 70 : 160} color="#22d3ee" size={0.045} area={[8, 6, 8]} />
      <GlowDisc position={[0, -2.3, -2]} radius={5.5} color="#0b3a52" opacity={0.4} />
    </>
  );
}