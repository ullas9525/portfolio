import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { getDPRCap, motionSafe } from '../../utils/helpers';

/**
 * Shared <Canvas> scaffold used by every section.
 * - dpr capped for mobile performance
 * - alpha background (DOM gradient shows through)
 * - stops continuous rendering when "reduced motion" is on
 */
export default function CanvasScene({
  children,
  camera = { position: [0, 0, 9], fov: 45 },
  className = '',
  style,
  onCreated,
  gl,
}) {
  return (
    <div className={`scene-canvas ${className}`} style={style} aria-hidden="true">
      <Canvas
        dpr={getDPRCap()}
        camera={camera}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', ...gl }}
        frameloop={motionSafe ? 'always' : 'demand'}
        onCreated={onCreated}
        resize={{ scroll: false }}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}