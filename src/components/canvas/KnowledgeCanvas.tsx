import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { AmbientParticles } from './AmbientParticles'
import { ConceptSphere } from './ConceptSphere'
import { ConnectionTube } from './ConnectionTube'
import { CameraController } from './CameraController'
import type { KnowledgeMap } from '../../types/knowledge'

interface KnowledgeCanvasProps {
  map: KnowledgeMap
  selectedNodeId: string | null
  hoveredNodeId: string | null
  completedNodeIds: string[]
  nodeProgress: Record<string, number>
  edgeProgress: Record<string, number>
  cameraResetTrigger: number
  isPanelOpen?: boolean
  onSelectNode: (nodeId: string | null) => void
  onHoverNode: (nodeId: string | null) => void
}

export function KnowledgeCanvas({
  map,
  selectedNodeId,
  hoveredNodeId,
  completedNodeIds,
  nodeProgress,
  edgeProgress,
  cameraResetTrigger,
  isPanelOpen = false,
  onSelectNode,
  onHoverNode,
}: KnowledgeCanvasProps) {
  // Map of node positions by ID for quick edge curve lookup
  const nodePositionMap = useMemo(() => {
    const dict = new Map<string, [number, number, number]>()
    for (const node of map.nodes) {
      dict.set(node.id, node.position)
    }
    return dict
  }, [map.nodes])

  // Get selected node coordinates for camera tracking
  const selectedPosition = useMemo(() => {
    if (!selectedNodeId) return null
    return nodePositionMap.get(selectedNodeId) || null
  }, [selectedNodeId, nodePositionMap])

  // Completed node IDs set for fast check
  const completedSet = useMemo(() => new Set(completedNodeIds), [completedNodeIds])

  return (
    <div className="relative w-full h-full bg-[#030305] overflow-hidden select-none">
      <Canvas
        camera={{ position: [0, 4, 14], fov: 48 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: false,
        }}
        dpr={[1, 2]}
        onPointerMissed={() => onSelectNode(null)}
      >
        <color attach="background" args={['#030305']} />

        {/* Ambient & scientific key lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 15, 10]} intensity={0.6} color="#e0f2fe" />
        <pointLight position={[0, 0, 0]} intensity={1.2} color="#38bdf8" distance={14} />

        <Suspense fallback={null}>
          {/* Subtle deep space particle field */}
          <AmbientParticles count={340} />

          {/* 3D Curved Connection Tubes */}
          {map.edges.map((edge) => {
            const sourcePos = nodePositionMap.get(edge.source)
            const targetPos = nodePositionMap.get(edge.target)
            if (!sourcePos || !targetPos) return null

            const isRelatedToSelected =
              selectedNodeId === edge.source || selectedNodeId === edge.target
            const isRelatedToHovered =
              hoveredNodeId === edge.source || hoveredNodeId === edge.target

            const progress = edgeProgress[edge.id] ?? 1.0

            return (
              <ConnectionTube
                key={edge.id}
                id={edge.id}
                sourcePos={sourcePos}
                targetPos={targetPos}
                progress={progress}
                isSelected={isRelatedToSelected}
                isHovered={isRelatedToHovered}
                relationship={edge.relationship}
              />
            )
          })}

          {/* Concept Spheres */}
          {map.nodes.map((node) => {
            const isSelected = selectedNodeId === node.id
            const isHovered = hoveredNodeId === node.id
            const isCompleted = completedSet.has(node.id)
            const progress = nodeProgress[node.id] ?? 1.0

            return (
              <ConceptSphere
                key={node.id}
                id={node.id}
                title={node.title}
                category={node.category}
                position={node.position}
                size={node.size}
                color={node.color}
                depth={node.depth}
                isSelected={isSelected}
                isCompleted={isCompleted}
                isHovered={isHovered}
                appearanceProgress={progress}
                isPanelOpen={isPanelOpen}
                onClick={onSelectNode}
                onHover={onHoverNode}
              />
            )
          })}

          {/* Camera movement and OrbitControls */}
          <CameraController
            selectedPosition={selectedPosition}
            resetTrigger={cameraResetTrigger}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
