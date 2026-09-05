// ============================================================
// Reusable 3D building blocks: scene lights, pointer rig,
// particles, floating group, and lazy-in-view canvas mount.
// ============================================================
import { useMemo, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { motionSafe } from '../../utils/helpers';

/* ---------------- Lights ---------------- */
export function SceneLights({ intensity = 1 }) {
  return (
    <>
      <ambientLight intensity={0.35 * intensity} />
      <directionalLight position={[6, 10, 6]} intensity={0.9 * intensity} color="#dbeafe" />
      <pointLight position={[-7, 4, 3]} intensity={14 * intensity} color="#22d3ee" />
      <pointLight position={[6, -2, 5]} intensity={10 * intensity} color="#818cf8" />
      <spotLight position={[0, 8, 6]} angle={0.5} penumbra={1} intensity={30 * intensity} color="#ffffff" />
    </>
  );
}

/* ---------------- Mouse parallax rig (camera + group drift) ---------------- */
export function Rig({ children, strength = 0.35, tilt = 0.008 }) {
  const { camera, pointer } = useThree();
  const group = useRef();
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (!motionSafe) return;
    camera.position.x += (pointer.x * strength - camera.position.x) * 0.04;
    camera.position.y += (pointer.y * strength - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
    if (group.current) {
      group.current.rotation.y += (pointer.x * -0.12 + Math.sin(t * 0.1) * 0.02 - group.current.rotation.y) * 0.05;
      group.current.rotation.x += (pointer.y * 0.08 - group.current.rotation.x) * 0.05;
    }
  });
  return <group ref={group}>{children}</group>;
}

/* ---------------- Ambient floating particles ---------------- */
export function Particles({
  count = 260,
  color = '#7dd3fc',
  size = 0.035,
  area = [14, 8, 10],
  speed = 0.05,
}) {
  const pts = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * area[0];
      arr[i * 3 + 1] = (Math.random() - 0.5) * area[1];
      arr[i * 3 + 2] = (Math.random() - 0.5) * area[2];
    }
    return arr;
  }, [count, area]);
  const speeds = useMemo(
    () => new Float32Array(count).fill(0).map(() => 0.2 + Math.random() * 0.8),
    [count]
  );
  useFrame((state) => {
    if (!pts.current || !motionSafe) return;
    const t = state.clock.elapsedTime * speed;
    const pos = pts.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += Math.sin(t + i * 0.7) * 0.0008;
      pos[i * 3] += Math.cos(t * 0.6 + i) * 0.0005;
    }
    pts.current.geometry.attributes.position.needsUpdate = true;
  });
  return (
    <points ref={pts}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ---------------- Soft floating wrapper ---------------- */
export function FloatGroup({ children, speed = 0.5, height = 0.25, rotSpeed = 0.12, ...rest }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current || !motionSafe) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = Math.sin(t * speed) * height;
    ref.current.rotation.y += rotSpeed * 0.003;
  });
  return (
    <group {...rest}>
      <group ref={ref}>{children}</group>
    </group>
  );
}

/* ---------------- Gradient shader plane (soft glow disc) ---------------- */
export function GlowDisc({ position = [0, -2.4, -1], radius = 6, opacity = 0.5, color = '#22d3ee' }) {
  const mat = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uColor: { value: new THREE.Color(color) }, uOpacity: { value: opacity } },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uOpacity;
        varying vec2 vUv;
        void main() {
          float d = distance(vUv, vec2(0.5));
          float a = smoothstep(0.5, 0.0, d) * uOpacity;
          gl_FragColor = vec4(uColor, a);
        }
      `,
    });
  }, [color, opacity]);
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[radius * 2, radius * 2, 1, 1]} />
      <primitive object={mat} attach="material" />
    </mesh>
  );
}

/* ---------------- Lazy-mount wrapper: only render scene near viewport ---------------- */
export function Lazy3D({ children, rootMargin = '600px', className, style }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window) || !motionSafe) {
      setOn(true);
      return undefined;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          obs.disconnect();
        }
      },
      { rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);
  if (!motionSafe) {
    // still allow scene but static — actually skip heavy 3D for reduced motion
    return null;
  }
  return (
    <div ref={ref} className={className} style={{ position: 'absolute', inset: 0, ...style }}>
      {on ? children : null}
    </div>
  );
}