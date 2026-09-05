// ============================================================
// FLUTTER SCENE — a 3D phone that responds to pointer tilt and
// cycles through app-style screens (procedural textures).
// ============================================================
import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { makePhoneTexture } from './textures';
import { isMobileAgent, motionSafe } from '../../utils/helpers';
import { SceneLights, Particles, Rig, FloatGroup, GlowDisc } from './common';

export default function FlutterScene() {
  const group = useRef();
  const screen = useRef();
  const [hover, setHover] = useState(false);
  const simple = isMobileAgent();

  const textures = useMemo(() => [0, 1, 2, 3].map(makePhoneTexture), []);

  useFrame(({ clock, pointer }, delta) => {
    if (!group.current || !motionSafe) return;
    const t = clock.elapsedTime;
    const k = 1 - Math.exp(-4 * delta);
    const targetY = hover ? 0.3 : 0.12;
    group.current.rotation.y += (Math.sin(t * 0.5) * 0.25 + pointer.x * 0.35 - group.current.rotation.y) * k;
    group.current.rotation.x += (Math.sin(t * 0.35) * 0.12 + pointer.y * 0.25 - group.current.rotation.x) * k;
    group.current.position.y += (targetY - group.current.position.y) * k;
    if (screen.current && screen.current.material) {
      const idx = Math.floor(t * 0.5) % textures.length;
      if (screen.current.material.map !== textures[idx]) screen.current.material.map = textures[idx];
    }
  });
  return (
    <>
      <SceneLights intensity={1} />
      <Rig strength={0.2}>
        <FloatGroup speed={0.45} height={0.12}>
          <group
            ref={group}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
          >
            <group rotation={[0.1, 0.15, 0]}>
              {/* body */}
              <mesh>
                <boxGeometry args={[1.05, 2.1, 0.12]} />
                <meshStandardMaterial color="#141d33" roughness={0.3} metalness={0.6} />
              </mesh>
              <mesh position={[0, 0, 0.07]} ref={screen}>
                <planeGeometry args={[0.93, 1.9]} />
                <meshStandardMaterial map={textures[0]} roughness={0.15} metalness={0.1} />
              </mesh>
              {/* notch + buttons */}
              <mesh position={[0, 0.92, 0.08]}>
                <boxGeometry args={[0.46, 0.05, 0.03]} />
                <meshBasicMaterial color="#05080f" />
              </mesh>
              <mesh position={[0.53, 0.35, 0]}>
                <boxGeometry args={[0.05, 0.35, 0.05]} />
                <meshStandardMaterial color="#1b2740" roughness={0.4} metalness={0.5} />
              </mesh>
              <mesh position={[0.53, -0.15, 0]}>
                <boxGeometry args={[0.05, 0.26, 0.05]} />
                <meshStandardMaterial color="#1b2740" roughness={0.4} metalness={0.5} />
              </mesh>
              <pointLight position={[0, 0, 1.4]} intensity={4} distance={4} color="#34d399" />
            </group>
          </group>
        </FloatGroup>
        {!simple && (
          <>
            <Particles count={120} color="#34d399" size={0.045} area={[7, 7, 7]} />
            <GlowDisc position={[0, -2.7, -1.5]} radius={5} color="#064e3b" opacity={0.4} />
          </>
        )}
      </Rig>
    </>
  );
}