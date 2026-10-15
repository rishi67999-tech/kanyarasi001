import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ConnectionTubeProps {
  id: string
  sourcePos: [number, number, number]
  targetPos: [number, number, number]
  progress?: number // 0 to 1
  isSelected?: boolean
  isHovered?: boolean
  color?: string
  relationship?: string
  pulseSpeed?: number
}

export function ConnectionTube({
  sourcePos,
  targetPos,
  progress = 1.0,
  isSelected = false,
  isHovered = false,
  color = '#38bdf8',
  pulseSpeed = 0.5,
}: ConnectionTubeProps) {
  const pulseRef = useRef<THREE.Mesh>(null)
  const pulseProgress = useRef(0)

  // Compute full 3D curved trajectory between source and target
  const { fullCurve, currentCurve } = useMemo(() => {
    const p1 = new THREE.Vector3(...sourcePos)
    const p2 = new THREE.Vector3(...targetPos)
    const dist = p1.distanceTo(p2)

    // Midpoint with subtle anatomical curve offset
    const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5)

    // Perpendicular vector for natural arc
    const dir = new THREE.Vector3().subVectors(p2, p1).normalize()
    const up = new THREE.Vector3(0, 1, 0)
    let perp = new THREE.Vector3().crossVectors(dir, up).normalize()
    if (perp.lengthSq() < 0.01) {
      perp = new THREE.Vector3(1, 0, 0)
    }

    // Arc outward from origin
    const radial = mid.clone().normalize()
    const curveOffset = perp.multiplyScalar(dist * 0.14).add(radial.multiplyScalar(dist * 0.08))
    mid.add(curveOffset)

    const full = new THREE.CatmullRomCurve3([p1, mid, p2], false, 'centripetal')

    // If growing, compute points up to progress
    const effectiveProgress = Math.max(0.01, Math.min(1.0, progress))
    let current = full

    if (effectiveProgress < 0.999) {
      const sampledPoints: THREE.Vector3[] = []
      const samples = Math.max(4, Math.floor(24 * effectiveProgress))
      for (let i = 0; i <= samples; i++) {
        const t = (i / samples) * effectiveProgress
        sampledPoints.push(full.getPointAt(t))
      }
      current = new THREE.CatmullRomCurve3(sampledPoints, false, 'centripetal')
    }

    return { fullCurve: full, currentCurve: current }
  }, [sourcePos, targetPos, progress])

  // Generate tube geometry
  const tubeGeometry = useMemo(() => {
    if (progress <= 0.02) return null
    const tubularSegments = Math.max(8, Math.floor(36 * Math.max(0.2, progress)))
    const radius = isSelected ? 0.045 : isHovered ? 0.04 : 0.028
    return new THREE.TubeGeometry(currentCurve, tubularSegments, radius, 8, false)
  }, [currentCurve, progress, isSelected, isHovered])

  // Animate pulse along curve when visible
  useFrame((_, delta) => {
    if (progress < 0.95 || !pulseRef.current) return
    pulseProgress.current = (pulseProgress.current + delta * pulseSpeed) % 1
    const pt = fullCurve.getPointAt(pulseProgress.current)
    pulseRef.current.position.copy(pt)
  })

  if (!tubeGeometry || progress <= 0.02) return null

  const activeColor = new THREE.Color(color)
  const emissiveColor = isSelected
    ? new THREE.Color('#38bdf8')
    : isHovered
    ? new THREE.Color('#60a5fa')
    : activeColor

  const emissiveIntensity = isSelected ? 1.8 : isHovered ? 1.2 : 0.55
  const opacity = isSelected ? 0.95 : isHovered ? 0.85 : 0.65

  return (
    <group>
      {/* Main 3D curved tube */}
      <mesh geometry={tubeGeometry}>
        <meshStandardMaterial
          color={activeColor}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          roughness={0.2}
          metalness={0.7}
          transparent
          opacity={opacity}
          depthWrite={false}
        />
      </mesh>

      {/* Outer translucent glow envelope */}
      <mesh geometry={tubeGeometry}>
        <meshBasicMaterial
          color={emissiveColor}
          transparent
          opacity={isSelected ? 0.25 : 0.1}
          wireframe={false}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Traveling photon/pulse packet */}
      {progress >= 0.95 && (
        <mesh ref={pulseRef}>
          <sphereGeometry args={[isSelected ? 0.08 : 0.055, 12, 12]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.9}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}
    </group>
  )
}
