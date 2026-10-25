import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Scène 3D « topologie réseau » : nœuds lumineux reliés par des liens fins,
 * impulsions voyageant le long des liaisons, rotation lente + parallax souris.
 * ~3 draw calls (points, lignes, impulsions) — très léger.
 */

const NODE_COUNT = typeof window !== 'undefined' && window.innerWidth < 768 ? 30 : 44;
const RADIUS = 2.15;
const LINK_DISTANCE = 1.25;
const MAX_LINKS = 120;
const PULSE_COUNT = 7;

const BLUE = new THREE.Color('#3b82f6');
const CYAN = new THREE.Color('#22d3ee');
const GOLD = new THREE.Color('#f5a524');

function buildTopology() {
  const nodes = new Float32Array(NODE_COUNT * 3);
  for (let i = 0; i < NODE_COUNT; i++) {
    const y = 1 - (i / (NODE_COUNT - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = i * 2.39996323; // angle d'or
    const jitter = 0.82 + seeded(i * 3.7) * 0.36;
    nodes[i * 3] = Math.cos(theta) * r * RADIUS * jitter;
    nodes[i * 3 + 1] = y * RADIUS * jitter;
    nodes[i * 3 + 2] = Math.sin(theta) * r * RADIUS * jitter;
  }

  const edges: Array<[number, number]> = [];
  for (let i = 0; i < NODE_COUNT && edges.length < MAX_LINKS; i++) {
    for (let j = i + 1; j < NODE_COUNT && edges.length < MAX_LINKS; j++) {
      const dx = nodes[i * 3] - nodes[j * 3];
      const dy = nodes[i * 3 + 1] - nodes[j * 3 + 1];
      const dz = nodes[i * 3 + 2] - nodes[j * 3 + 2];
      if (Math.sqrt(dx * dx + dy * dy + dz * dz) < LINK_DISTANCE) {
        edges.push([i, j]);
      }
    }
  }
  return { nodes, edges };
}

/** Pseudo-aléatoire déterministe (pas de variation entre SSR/CSR, rendu stable). */
function seeded(n: number): number {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

function Topology() {
  const spinRef = useRef<THREE.Group>(null);
  const parallaxRef = useRef<THREE.Group>(null);
  const pulseGeomRef = useRef<THREE.BufferGeometry>(null);

  const { nodes, edges } = useMemo(buildTopology, []);

  const { linePositions, lineColors, nodeColors } = useMemo(() => {
    const linePositions = new Float32Array(edges.length * 6);
    const lineColors = new Float32Array(edges.length * 6);
    const nodeColors = new Float32Array(NODE_COUNT * 3);
    const tmp = new THREE.Color();

    edges.forEach(([a, b], e) => {
      linePositions.set([nodes[a * 3], nodes[a * 3 + 1], nodes[a * 3 + 2]], e * 6);
      linePositions.set([nodes[b * 3], nodes[b * 3 + 1], nodes[b * 3 + 2]], e * 6 + 3);
      tmp.copy(BLUE).lerp(CYAN, seeded(e * 1.3));
      lineColors.set([tmp.r, tmp.g, tmp.b], e * 6);
      lineColors.set([tmp.r, tmp.g, tmp.b], e * 6 + 3);
    });

    for (let i = 0; i < NODE_COUNT; i++) {
      const roll = seeded(i * 7.77);
      tmp.copy(roll > 0.9 ? GOLD : roll > 0.55 ? CYAN : BLUE);
      nodeColors.set([tmp.r, tmp.g, tmp.b], i * 3);
    }
    return { linePositions, lineColors, nodeColors };
  }, [edges, nodes]);

  // Impulsions : chacune voyage le long d'une liaison, puis saute sur une autre.
  const pulses = useMemo(
    () =>
      Array.from({ length: PULSE_COUNT }, (_, i) => ({
        edge: Math.floor(seeded(i * 9.1) * edges.length),
        t: seeded(i * 4.2),
        speed: 0.25 + seeded(i * 6.6) * 0.4,
      })),
    [edges.length]
  );
  const pulsePositions = useMemo(() => new Float32Array(PULSE_COUNT * 3), []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);

    // Rotation lente continue
    if (spinRef.current) spinRef.current.rotation.y += dt * 0.07;

    // Parallax souris (adouci)
    if (parallaxRef.current) {
      parallaxRef.current.rotation.x = THREE.MathUtils.lerp(
        parallaxRef.current.rotation.x,
        state.pointer.y * -0.16,
        0.04
      );
      parallaxRef.current.rotation.y = THREE.MathUtils.lerp(
        parallaxRef.current.rotation.y,
        state.pointer.x * 0.22,
        0.04
      );
    }

    // Déplacement des impulsions
    const geom = pulseGeomRef.current;
    if (geom && edges.length > 0) {
      pulses.forEach((pulse, i) => {
        pulse.t += pulse.speed * dt;
        if (pulse.t > 1) {
          pulse.t = 0;
          pulse.edge = Math.floor(Math.random() * edges.length);
        }
        const [a, b] = edges[pulse.edge];
        pulsePositions[i * 3] = THREE.MathUtils.lerp(nodes[a * 3], nodes[b * 3], pulse.t);
        pulsePositions[i * 3 + 1] = THREE.MathUtils.lerp(nodes[a * 3 + 1], nodes[b * 3 + 1], pulse.t);
        pulsePositions[i * 3 + 2] = THREE.MathUtils.lerp(nodes[a * 3 + 2], nodes[b * 3 + 2], pulse.t);
      });
      geom.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.45}>
      <group ref={parallaxRef}>
        <group ref={spinRef}>
          {/* Nœuds */}
          <points>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[nodes, 3]} />
              <bufferAttribute attach="attributes-color" args={[nodeColors, 3]} />
            </bufferGeometry>
            <pointsMaterial
              vertexColors
              size={0.055}
              sizeAttenuation
              transparent
              opacity={0.95}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </points>

          {/* Liens */}
          <lineSegments>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
              <bufferAttribute attach="attributes-color" args={[lineColors, 3]} />
            </bufferGeometry>
            <lineBasicMaterial
              vertexColors
              transparent
              opacity={0.28}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </lineSegments>

          {/* Impulsions */}
          <points>
            <bufferGeometry ref={pulseGeomRef}>
              <bufferAttribute attach="attributes-position" args={[pulsePositions, 3]} />
            </bufferGeometry>
            <pointsMaterial
              color={CYAN}
              size={0.11}
              sizeAttenuation
              transparent
              opacity={0.95}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </points>
        </group>
      </group>
    </Float>
  );
}

export default function NetworkScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.4], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <Topology />
    </Canvas>
  );
}
