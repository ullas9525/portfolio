// ============================================================
// CONTACT SCENE — a calm final backdrop: soft glow and sparse
// particles. The drifting torus rings were removed on request — the
// wireframe shapes and glow remain. Content lives in the DOM above it.
// ============================================================
import { isMobileAgent } from '../../utils/helpers';
import { SceneLights, Particles, Rig, GlowDisc } from './common';

export default function ContactScene() {
  const simple = isMobileAgent();

  return (
    <>
      <SceneLights intensity={0.6} />
      <Rig strength={0.18}>
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