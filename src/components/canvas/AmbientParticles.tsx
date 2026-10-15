import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface AmbientParticlesProps {
  count?: number
}

export function AmbientParticles({ count = 300 }: AmbientParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const cols = new Float32Array(count * 3)

    const baseColor = new THREE.Color('#38bdf8') // cyan
    const violetColor = new THREE.Color('#818cf8') // indigo/violet
    const whiteColor = new THREE.Color('#ffffff')

    for (let i = 0; i < count; i++) {
      // Distribute in a spherical radius between 6 and 22 units
      const radius = 6 + Math.random() * 16
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = radius * Math.cos(phi)

      // Subdued colors
      const roll = Math.random()
      const c = roll < 0.5 ? baseColor : roll < 0.85 ? violetColor : whiteColor
      cols[i * 3] = c.r
      cols[i * 3 + 1] = c.g
      cols[i * 3 + 2] = c.b
    }

    return [pos, cols]
  }, [count])

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.015
      pointsRef.current.rotation.x += delta * 0.008
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        vertexColors
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
