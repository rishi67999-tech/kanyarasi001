import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import type { ConceptCategory } from '../../types/knowledge'

interface ConceptSphereProps {
  id: string
  title: string
  category: ConceptCategory
  position: [number, number, number]
  size?: number
  color?: string
  depth: number
  isSelected: boolean
  isCompleted?: boolean
  isHovered: boolean
  appearanceProgress?: number // 0 to 1 (for construction animation)
  isPanelOpen?: boolean
  onClick: (id: string) => void
  onHover: (id: string | null) => void
}

export function ConceptSphere({
  id,
  title,
  category,
  position,
  size = 1.0,
  color = '#38bdf8',
  depth,
  isSelected,
  isCompleted = false,
  isHovered,
  appearanceProgress = 1.0,
  isPanelOpen = false,
  onClick,
  onHover,
}: ConceptSphereProps) {
  const groupRef = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  const haloRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const tempVec = useRef(new THREE.Vector3())

  const [localHover, setLocalHover] = useState(false)
  const [isBehindPanel, setIsBehindPanel] = useState(false)
  const hovered = isHovered || localHover

  const isCentral = depth === 0
  const radius = isCentral ? size * 0.72 : size * 0.52

  // Frame animation loop: scaling, rotations, breathing, and panel occlusion check
  useFrame(({ camera, size: canvasSize, clock }, delta) => {
    if (!groupRef.current) return

    // Scale during construction animation
    const targetScale = appearanceProgress * (hovered ? 1.12 : isSelected ? 1.08 : 1.0)
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 8)

    // Slow rotation of halo/rings for scientific feel
    if (haloRef.current) {
      haloRef.current.rotation.y += delta * 0.4
      haloRef.current.rotation.x += delta * 0.2
    }

    if (ringRef.current && isSelected) {
      ringRef.current.rotation.z += delta * 1.2
    }

    // Gentle floating breathing for central node
    if (depth === 0 && coreRef.current) {
      const breath = Math.sin(clock.elapsedTime * 1.8) * 0.04
      coreRef.current.scale.set(1 + breath, 1 + breath, 1 + breath)
    }

    // PRIORITY 1: Dynamic 3D Label Occlusion against Open Lesson Panel
    if (isPanelOpen) {
      groupRef.current.getWorldPosition(tempVec.current)
      // Account for the vertical position of the label above the sphere
      tempVec.current.y += radius + 0.55
      tempVec.current.project(camera)

      const isBehindCamera = tempVec.current.z > 1.0

      // Calculate panel boundary in Normalized Device Coordinates (NDC: -1 to +1)
      const isMobile = canvasSize.width < 768
      const panelWidthPx = isMobile
        ? canvasSize.width
        : Math.min(520, Math.max(380, canvasSize.width * 0.38))

      // Give 24px safety margin to avoid partial label collision with panel border
      const panelLeftNdc = 1.0 - (2 * (panelWidthPx + 24)) / canvasSize.width

      const occluded = isBehindCamera || tempVec.current.x >= panelLeftNdc
      if (occluded !== isBehindPanel) {
        setIsBehindPanel(occluded)
      }
    } else {
      if (isBehindPanel) {
        setIsBehindPanel(false)
      }
    }
  })

  if (appearanceProgress <= 0.01) {
    return null
  }

  const baseColor = new THREE.Color(color)

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation()
        onClick(id)
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        setLocalHover(true)
        onHover(id)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setLocalHover(false)
        onHover(null)
        document.body.style.cursor = 'default'
      }}
    >
      {/* Selection orbit ring */}
      {isSelected && (
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius * 1.45, radius * 1.55, 36]} />
          <meshBasicMaterial
            color="#38bdf8"
            side={THREE.DoubleSide}
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* Atmospheric outer glow envelope */}
      <mesh ref={haloRef}>
        <sphereGeometry args={[radius * 1.25, 24, 24]} />
        <meshBasicMaterial
          color={baseColor}
          transparent
          opacity={isSelected ? 0.35 : hovered ? 0.25 : 0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          wireframe={false}
        />
      </mesh>

      {/* Subtle geometric wireframe shell */}
      <mesh>
        <sphereGeometry args={[radius * 1.08, 16, 16]} />
        <meshBasicMaterial
          color={baseColor}
          wireframe
          transparent
          opacity={isSelected ? 0.35 : 0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Solid emissive core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
          color={baseColor}
          emissive={baseColor}
          emissiveIntensity={isSelected ? 1.4 : hovered ? 1.0 : isCentral ? 0.8 : 0.55}
          roughness={0.25}
          metalness={0.8}
        />
      </mesh>

      {/* Crisp 3D HTML Label with Panel Occlusion Guard */}
      {appearanceProgress > 0.4 && (
        <Html
          position={[0, radius + 0.55, 0]}
          center
          distanceFactor={14}
          zIndexRange={[10, 0]}
          style={{
            pointerEvents: 'none',
            opacity: isBehindPanel ? 0 : 1,
            visibility: isBehindPanel ? 'hidden' : 'visible',
            transition: 'opacity 0.2s ease, visibility 0.2s ease',
          }}
        >
          <div
            className={`flex flex-col items-center transition-all duration-300 select-none ${
              isSelected ? 'scale-110' : hovered ? 'scale-105' : 'scale-100'
            }`}
          >
            {/* Category tag */}
            <span
              className={`text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded border mb-0.5 backdrop-blur-md font-mono ${
                isSelected
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50'
                  : 'bg-black/60 text-slate-400 border-white/10'
              }`}
            >
              {category}
            </span>

            {/* Node Title */}
            <div
              className={`px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide whitespace-nowrap border transition-colors backdrop-blur-md shadow-lg flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-cyan-950/80 text-white border-cyan-400 shadow-cyan-500/20'
                  : hovered
                  ? 'bg-slate-900/90 text-cyan-200 border-slate-600'
                  : 'bg-black/75 text-slate-200 border-white/10'
              }`}
            >
              {isCompleted && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
              )}
              <span>{title}</span>
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}
