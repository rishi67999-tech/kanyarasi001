import type { ConceptNode, ConceptEdge } from '../types/knowledge'

/**
 * Deterministically calculates 3D positions for nodes based on their graph hierarchy.
 * Uses golden spiral / spherical coordinates to spread primary nodes evenly around the central node,
 * and branches secondary nodes outward along their parent vector to avoid intersections.
 */
export function computeGraphLayout(
  nodes: Omit<ConceptNode, 'position'>[],
  edges: ConceptEdge[],
  centralNodeId: string
): ConceptNode[] {
  const centralNode = nodes.find((n) => n.id === centralNodeId)
  const otherNodes = nodes.filter((n) => n.id !== centralNodeId)

  // Primary children (directly connected to central node or depth 1)
  const directChildEdges = edges.filter((e) => e.source === centralNodeId)
  const directChildIds = new Set(directChildEdges.map((e) => e.target))

  const primaryNodes = otherNodes.filter(
    (n) => n.depth === 1 || directChildIds.has(n.id)
  )
  const secondaryNodes = otherNodes.filter(
    (n) => n.depth > 1 && !directChildIds.has(n.id)
  )

  const positionedNodes: ConceptNode[] = []

  // 1. Center node at origin
  if (centralNode) {
    positionedNodes.push({
      ...centralNode,
      position: [0, 0, 0],
      size: centralNode.size ?? 1.45,
      color: centralNode.color ?? '#38bdf8',
    })
  }

  // 2. Arrange primary nodes on an orbital sphere (radius ~4.0 to 4.5)
  const primaryRadius = 4.3
  const numPrimary = Math.max(1, primaryNodes.length)

  // Golden angle distribution for 3D sphere points
  const phi = Math.PI * (3 - Math.sqrt(5)) // ~2.39996 rad

  primaryNodes.forEach((node, idx) => {
    // Distribute y from 0.7 to -0.7 for comfortable viewing angle
    const y = 1 - (idx / (numPrimary - 1 || 1)) * 2 // from 1 to -1
    const radiusAtY = Math.sqrt(Math.max(0.1, 1 - y * y))
    const theta = phi * idx

    const x = Math.cos(theta) * radiusAtY * primaryRadius
    const finalY = y * (primaryRadius * 0.7) // slightly flattened vertically for better camera aspect
    const z = Math.sin(theta) * radiusAtY * primaryRadius

    positionedNodes.push({
      ...node,
      position: [
        Number(x.toFixed(2)),
        Number(finalY.toFixed(2)),
        Number(z.toFixed(2)),
      ],
      size: node.size ?? 0.95,
      color: node.color ?? getCategoryColor(node.category),
    })
  })

  // 3. Arrange secondary nodes branching outward from their parent nodes
  secondaryNodes.forEach((node, idx) => {
    // Find parent edge
    const parentEdge = edges.find((e) => e.target === node.id)
    const parentNode = parentEdge
      ? positionedNodes.find((n) => n.id === parentEdge.source)
      : positionedNodes[1] || positionedNodes[0]

    const parentPos = parentNode ? parentNode.position : [2, 0, 0]
    // Vector from center to parent
    const length = Math.hypot(parentPos[0], parentPos[1], parentPos[2]) || 1
    const dir = [
      parentPos[0] / length,
      parentPos[1] / length,
      parentPos[2] / length,
    ]

    // Branch outward with angular offset
    const branchDist = 2.4
    const angleOffset = ((idx % 3) - 1) * 0.6
    const bx = parentPos[0] + dir[0] * branchDist + Math.sin(angleOffset) * 1.5
    const by = parentPos[1] + dir[1] * branchDist + Math.cos(angleOffset) * 0.8
    const bz = parentPos[2] + dir[2] * branchDist + ((idx % 2 === 0 ? 1 : -1) * 1.2)

    positionedNodes.push({
      ...node,
      position: [
        Number(bx.toFixed(2)),
        Number(by.toFixed(2)),
        Number(bz.toFixed(2)),
      ],
      size: node.size ?? 0.8,
      color: node.color ?? getCategoryColor(node.category),
    })
  })

  return positionedNodes
}

export function getCategoryColor(category: string): string {
  switch (category) {
    case 'core':
      return '#38bdf8' // Electric cyan
    case 'syntax':
      return '#60a5fa' // Electric blue
    case 'control':
      return '#f472b6' // Rose pink
    case 'foundation':
      return '#34d399' // Emerald
    case 'advanced':
      return '#fbbf24' // Warm amber
    case 'data':
      return '#a78bfa' // Soft violet
    default:
      return '#818cf8' // Indigo
  }
}
