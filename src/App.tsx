import { useState, useEffect, useCallback, useMemo } from 'react'
import { KnowledgeCanvas } from './components/canvas/KnowledgeCanvas'
import { Navbar } from './components/ui/Navbar'
import { TopicPrompt } from './components/ui/TopicPrompt'
import { ConstructionControls } from './components/ui/ConstructionControls'
import { CameraControlsOverlay } from './components/ui/CameraControlsOverlay'
import { LessonPanel } from './components/ui/LessonPanel'
import { CurriculumCatalogModal } from './components/ui/CurriculumCatalogModal'
import { PYTHON_LOOPS_MAP } from './data/predefinedMaps'
import { generateKnowledgeMap } from './services/aiService'
import {
  saveKnowledgeMap,
  saveNodeProgress,
  getLocalMapProgress,
} from './services/supabaseService'
import { useConstructionAnimation } from './hooks/useConstructionAnimation'
import type { KnowledgeMap } from './types/knowledge'
import { X, AlertCircle } from 'lucide-react'

export function App() {
  const [currentMap, setCurrentMap] = useState<KnowledgeMap>(PYTHON_LOOPS_MAP)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCurriculumOpen, setIsCurriculumOpen] = useState(false)
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null)
  const [cameraResetTrigger, setCameraResetTrigger] = useState(0)
  const [completedNodeIds, setCompletedNodeIds] = useState<string[]>([])

  // Construction animation hook
  const construction = useConstructionAnimation(currentMap)

  // Load progress when currentMap changes
  const currentMapId = currentMap?.id
  useEffect(() => {
    if (currentMapId) {
      const progress = getLocalMapProgress(currentMapId)
      setCompletedNodeIds(progress.completedNodeIds || [])
    }
  }, [currentMapId])

  // Handle topic submission
  const handleTopicSubmit = useCallback(async (topic: string) => {
    setIsLoading(true)
    setErrorMsg(null)
    setSelectedNodeId(null)

    try {
      const result = await generateKnowledgeMap(topic)
      setCurrentMap(result.map)
      setIsSearchOpen(false)
      setIsCurriculumOpen(false)
      setCameraResetTrigger((prev) => prev + 1)

      // Persist to storage/Supabase in background
      saveKnowledgeMap(result.map).catch((e) => console.warn('Save map notice:', e))
    } catch (err: any) {
      console.error('Topic generation error:', err)
      setErrorMsg(err.message || 'Failed to generate knowledge map. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Handle marking a node as mastered
  const handleMarkCompleted = useCallback(
    (nodeId: string) => {
      setCompletedNodeIds((prev) => {
        if (prev.includes(nodeId)) return prev
        return [...prev, nodeId]
      })
      if (currentMap) {
        saveNodeProgress(currentMap.id, nodeId)
      }
    },
    [currentMap]
  )

  // Camera Reset
  const handleResetCamera = useCallback(() => {
    setCameraResetTrigger((prev) => prev + 1)
    setSelectedNodeId(null)
  }, [])

  // Selected node object
  const selectedNode = useMemo(() => {
    if (!selectedNodeId || !currentMap) return null
    return currentMap.nodes.find((n) => n.id === selectedNodeId) || null
  }, [selectedNodeId, currentMap])

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      if (e.key === 'Escape') {
        if (selectedNodeId) {
          setSelectedNodeId(null)
        } else if (isSearchOpen) {
          setIsSearchOpen(false)
        } else if (isCurriculumOpen) {
          setIsCurriculumOpen(false)
        }
      } else if (e.key === ' ' && !selectedNodeId && !isSearchOpen && !isCurriculumOpen) {
        // Space toggles play/pause
        e.preventDefault()
        if (construction.isPlaying) {
          construction.pause()
        } else {
          construction.play()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedNodeId, isSearchOpen, isCurriculumOpen, construction])

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#030305]">
      {/* Top Navigation Bar */}
      <Navbar
        currentTopic={currentMap.topic}
        completedCount={completedNodeIds.length}
        totalNodes={currentMap.nodes.length}
        isDemo={currentMap.isDemo}
        demoNote={currentMap.demoNote}
        hasSources={Boolean(currentMap.sources && currentMap.sources.length > 0)}
        searchStatus={currentMap.searchStatus}
        parentMapTopic={currentMap.parentMapTopic}
        parentMapTitle={currentMap.parentMapTitle}
        onNavigateTopic={handleTopicSubmit}
        onOpenNewTopic={() => setIsSearchOpen(true)}
        onOpenCurriculum={() => setIsCurriculumOpen(true)}
      />

      {/* Main 3D WebGL Canvas */}
      <KnowledgeCanvas
        map={currentMap}
        selectedNodeId={selectedNodeId}
        hoveredNodeId={hoveredNodeId}
        completedNodeIds={completedNodeIds}
        nodeProgress={construction.nodeProgress}
        edgeProgress={construction.edgeProgress}
        cameraResetTrigger={cameraResetTrigger}
        isPanelOpen={Boolean(selectedNodeId)}
        onSelectNode={setSelectedNodeId}
        onHoverNode={setHoveredNodeId}
      />

      {/* Camera Controls & Orientation */}
      <CameraControlsOverlay onResetCamera={handleResetCamera} />

      {/* Construction Animation Timeline Controls */}
      <ConstructionControls
        isPlaying={construction.isPlaying}
        isCompleted={construction.isCompleted}
        progressFraction={construction.progressFraction}
        currentTime={construction.currentTime}
        totalDuration={construction.totalDuration}
        onPlay={construction.play}
        onPause={construction.pause}
        onReplay={construction.replay}
        onSkip={construction.skipToEnd}
      />

      {/* Selected Concept Lesson & Code Trace Panel */}
      {selectedNode && (
        <LessonPanel
          node={selectedNode}
          edges={currentMap.edges}
          allNodes={currentMap.nodes}
          mapSources={currentMap.sources}
          searchStatus={currentMap.searchStatus}
          searchSummary={currentMap.searchSummary}
          isCompleted={completedNodeIds.includes(selectedNode.id)}
          onClose={() => setSelectedNodeId(null)}
          onSelectNode={setSelectedNodeId}
          onMarkCompleted={handleMarkCompleted}
          onNavigateTopic={handleTopicSubmit}
        />
      )}

      {/* Floating Error Notification Banner (Visible when modal is closed) */}
      {errorMsg && !isSearchOpen && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 max-w-lg w-full px-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="p-3.5 rounded-xl bg-rose-950/95 border border-rose-700/80 text-rose-200 text-xs font-mono shadow-2xl backdrop-blur-xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="px-2.5 py-1 rounded bg-rose-900 hover:bg-rose-800 text-white font-bold transition text-[11px]"
              >
                Try Again
              </button>
              <button
                onClick={() => setErrorMsg(null)}
                className="p-1 text-rose-400 hover:text-white"
                title="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search / Topic Prompt Modal */}
      {isSearchOpen && (
        <div className="absolute inset-0 z-40 bg-black/85 backdrop-blur-xl flex flex-col items-center justify-center p-4">
          <button
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          <TopicPrompt
            onSubmit={handleTopicSubmit}
            isLoading={isLoading}
            isModal={true}
            onClose={() => setIsSearchOpen(false)}
          />

          {errorMsg && (
            <div className="mt-4 flex items-center justify-between gap-3 p-3 rounded-xl bg-rose-950/80 border border-rose-800/80 text-rose-300 text-xs font-mono max-w-md w-full">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMsg}</span>
              </div>
              <button
                onClick={() => setErrorMsg(null)}
                className="text-xs text-rose-400 hover:text-white font-semibold underline shrink-0"
              >
                Dismiss
              </button>
            </div>
          )}
        </div>
      )}

      {/* Curriculum Catalog Modal */}
      <CurriculumCatalogModal
        isOpen={isCurriculumOpen}
        onClose={() => setIsCurriculumOpen(false)}
        onSelectTopic={handleTopicSubmit}
      />
    </main>
  )
}

export default App
