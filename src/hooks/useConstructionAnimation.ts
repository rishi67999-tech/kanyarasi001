import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import type { KnowledgeMap } from '../types/knowledge'

interface AnimationStage {
  type: 'node' | 'edge'
  id: string
  startTime: number
  duration: number
}

export function useConstructionAnimation(map: KnowledgeMap | null) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  // Construct chronology of events
  const { stages, totalDuration } = useMemo(() => {
    if (!map) return { stages: [] as AnimationStage[], totalDuration: 0 }

    const stagesList: AnimationStage[] = []
    let cursor = 0.2 // small initial quiet pause

    // 1. Central node appears
    const centralNode = map.nodes.find((n) => n.id === map.centralNodeId) || map.nodes[0]
    stagesList.push({
      type: 'node',
      id: centralNode.id,
      startTime: cursor,
      duration: 1.0,
    })
    cursor += 0.8

    // 2. Direct edges from central node and their targets
    const directEdges = map.edges.filter((e) => e.source === centralNode.id)
    const processedNodes = new Set<string>([centralNode.id])

    for (const edge of directEdges) {
      stagesList.push({
        type: 'edge',
        id: edge.id,
        startTime: cursor,
        duration: 0.8,
      })
      cursor += 0.55

      if (!processedNodes.has(edge.target)) {
        stagesList.push({
          type: 'node',
          id: edge.target,
          startTime: cursor,
          duration: 0.65,
        })
        processedNodes.add(edge.target)
        cursor += 0.5
      }
    }

    // 3. Secondary edges and remaining nodes
    const remainingEdges = map.edges.filter((e) => !directEdges.includes(e))
    for (const edge of remainingEdges) {
      stagesList.push({
        type: 'edge',
        id: edge.id,
        startTime: cursor,
        duration: 0.75,
      })
      cursor += 0.5

      if (!processedNodes.has(edge.target)) {
        stagesList.push({
          type: 'node',
          id: edge.target,
          startTime: cursor,
          duration: 0.6,
        })
        processedNodes.add(edge.target)
        cursor += 0.45
      }
    }

    // Any orphaned nodes
    for (const node of map.nodes) {
      if (!processedNodes.has(node.id)) {
        stagesList.push({
          type: 'node',
          id: node.id,
          startTime: cursor,
          duration: 0.6,
        })
        processedNodes.add(node.id)
        cursor += 0.4
      }
    }

    cursor += 0.3 // final buffer
    return { stages: stagesList, totalDuration: cursor }
  }, [map])

  // Animation frame loop
  const lastTimestamp = useRef<number | null>(null)
  const reqId = useRef<number | null>(null)

  useEffect(() => {
    // Reset when map changes
    setCurrentTime(0)
    setIsPlaying(true)
    setIsCompleted(false)
    lastTimestamp.current = null
  }, [map?.id])

  useEffect(() => {
    if (!isPlaying || isCompleted || totalDuration === 0) return

    const tick = (timestamp: number) => {
      if (lastTimestamp.current === null) {
        lastTimestamp.current = timestamp
      }
      const delta = (timestamp - lastTimestamp.current) / 1000
      lastTimestamp.current = timestamp

      setCurrentTime((prev) => {
        const next = prev + delta
        if (next >= totalDuration) {
          setIsCompleted(true)
          setIsPlaying(false)
          return totalDuration
        }
        return next
      })

      reqId.current = requestAnimationFrame(tick)
    }

    reqId.current = requestAnimationFrame(tick)

    return () => {
      if (reqId.current) cancelAnimationFrame(reqId.current)
    }
  }, [isPlaying, isCompleted, totalDuration])

  // Compute progress for each node and edge
  const nodeProgress = useMemo(() => {
    const result: Record<string, number> = {}
    if (!map) return result

    for (const node of map.nodes) {
      const stage = stages.find((s) => s.type === 'node' && s.id === node.id)
      if (!stage) {
        result[node.id] = 1.0
      } else if (currentTime < stage.startTime) {
        result[node.id] = 0.0
      } else {
        const p = (currentTime - stage.startTime) / stage.duration
        result[node.id] = Math.min(1.0, Math.max(0.0, p))
      }
    }
    return result
  }, [map, stages, currentTime])

  const edgeProgress = useMemo(() => {
    const result: Record<string, number> = {}
    if (!map) return result

    for (const edge of map.edges) {
      const stage = stages.find((s) => s.type === 'edge' && s.id === edge.id)
      if (!stage) {
        result[edge.id] = 1.0
      } else if (currentTime < stage.startTime) {
        result[edge.id] = 0.0
      } else {
        const p = (currentTime - stage.startTime) / stage.duration
        result[edge.id] = Math.min(1.0, Math.max(0.0, p))
      }
    }
    return result
  }, [map, stages, currentTime])

  const play = useCallback(() => {
    if (isCompleted) {
      setCurrentTime(0)
      setIsCompleted(false)
    }
    lastTimestamp.current = null
    setIsPlaying(true)
  }, [isCompleted])

  const pause = useCallback(() => {
    setIsPlaying(false)
    lastTimestamp.current = null
  }, [])

  const replay = useCallback(() => {
    setCurrentTime(0)
    setIsCompleted(false)
    lastTimestamp.current = null
    setIsPlaying(true)
  }, [])

  const skipToEnd = useCallback(() => {
    setCurrentTime(totalDuration)
    setIsCompleted(true)
    setIsPlaying(false)
  }, [totalDuration])

  const progressFraction = totalDuration > 0 ? currentTime / totalDuration : 1

  return {
    isPlaying,
    isCompleted,
    currentTime,
    totalDuration,
    progressFraction,
    nodeProgress,
    edgeProgress,
    play,
    pause,
    replay,
    skipToEnd,
  }
}
