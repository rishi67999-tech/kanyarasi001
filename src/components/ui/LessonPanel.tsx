import { useState, useEffect } from 'react'
import {
  X,
  BookOpen,
  AlertTriangle,
  Lightbulb,
  CheckCircle,
  Sparkles,
  ExternalLink,
  Layers,
  GraduationCap,
  Briefcase,
  Globe,
  Code2,
  HelpCircle,
  Minimize2,
  Maximize2,
} from 'lucide-react'
import type { ConceptNode, ConceptEdge, SourceCitation } from '../../types/knowledge'
import { CodeTraceViewer } from './CodeTraceViewer'
import { PracticeQuiz } from './PracticeQuiz'

interface LessonPanelProps {
  node: ConceptNode
  edges: ConceptEdge[]
  allNodes: ConceptNode[]
  isCompleted: boolean
  mapSources?: SourceCitation[]
  searchStatus?: string
  searchSummary?: string
  onClose: () => void
  onSelectNode: (nodeId: string) => void
  onMarkCompleted: (nodeId: string) => void
  onNavigateTopic?: (topic: string) => void
}

export function LessonPanel({
  node,
  edges,
  allNodes,
  isCompleted,
  mapSources = [],
  searchStatus,
  searchSummary,
  onClose,
  onSelectNode,
  onMarkCompleted,
  onNavigateTopic,
}: LessonPanelProps) {
  const [activeTab, setActiveTab] = useState<'explanation' | 'exercises' | 'trace' | 'quiz' | 'sources'>('explanation')
  const [explanationLevel, setExplanationLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner')
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({})
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({})
  const [isMinimized, setIsMinimized] = useState(false)

  // Combine node-specific and map-level verified citations
  const effectiveSources = node.sources && node.sources.length > 0 ? node.sources : mapSources
  const hasExercises = Boolean(node.practiceExercises && node.practiceExercises.length > 0)

  // Reset tab, level, and hints when selected node changes
  useEffect(() => {
    setActiveTab('explanation')
    setExplanationLevel('beginner')
    setRevealedHints({})
    setRevealedSolutions({})
    setIsMinimized(false)
  }, [node.id])

  // Find incoming and outgoing connections
  const connectedEdges = edges.filter((e) => e.source === node.id || e.target === node.id)
  const relatedNodeIds = connectedEdges.map((e) => (e.source === node.id ? e.target : e.source))
  const relatedNodes = allNodes.filter((n) => relatedNodeIds.includes(n.id))

  const hasTrace = Boolean(node.concreteExample?.trace)
  const practiceQuestionCount =
    (node.practiceQuestions && node.practiceQuestions.length > 0
      ? node.practiceQuestions.length
      : node.practiceQuestion
      ? 1
      : 0)
  const hasQuiz = practiceQuestionCount > 0

  if (isMinimized) {
    return (
      <div className="absolute bottom-6 right-6 z-50 pointer-events-auto max-w-sm w-full animate-in fade-in slide-in-from-bottom-2 duration-200">
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#080a10f6] border border-cyan-500/50 shadow-2xl backdrop-blur-2xl text-white">
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0">
              <BookOpen className="w-3.5 h-3.5" />
            </div>
            <div className="truncate">
              <h4 className="font-bold text-xs truncate">{node.title}</h4>
              <p className="text-[10px] font-mono text-cyan-400 capitalize">
                {node.category} • Depth {node.depth}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsMinimized(false)}
              className="px-2.5 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs transition flex items-center gap-1 shadow-md shadow-cyan-900/40"
              title="Expand Lesson Panel"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Expand</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
              title="Close Panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute top-0 right-0 h-full w-full max-w-md md:max-w-lg bg-[#07090ef2] backdrop-blur-2xl border-l border-slate-800/90 text-slate-200 z-50 pointer-events-auto flex flex-col shadow-2xl transition-all duration-300">
      {/* Header */}
      <div className="p-4 border-b border-slate-800/80 flex items-start justify-between bg-black/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
              {node.category}
            </span>
            <span className="text-xs font-mono text-slate-500">DEPTH {node.depth}</span>
            {searchStatus === 'verified-web' && (
              <span
                className="flex items-center gap-1 text-[10px] font-mono text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60"
                title={searchSummary || 'Verified with live web research'}
              >
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                WEB GROUNDED
              </span>
            )}
            {isCompleted && (
              <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/50">
                <CheckCircle className="w-3 h-3" />
                MASTERED
              </span>
            )}
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">{node.title}</h2>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1.5 rounded-lg bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white transition"
            title="Minimize Panel to 3D Canvas"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white transition"
            title="Return to 3D Map (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="flex border-b border-slate-800/80 px-4 bg-black/20 text-xs font-mono">
        <button
          onClick={() => setActiveTab('explanation')}
          className={`py-2.5 px-3 border-b-2 font-medium transition flex items-center gap-1.5 ${
            activeTab === 'explanation'
              ? 'border-cyan-400 text-cyan-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Curriculum</span>
        </button>

        {hasExercises && (
          <button
            onClick={() => setActiveTab('exercises')}
            className={`py-2.5 px-3 border-b-2 font-medium transition flex items-center gap-1.5 ${
              activeTab === 'exercises'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Exercises ({node.practiceExercises?.length})</span>
          </button>
        )}

        {hasTrace && (
          <button
            onClick={() => setActiveTab('trace')}
            className={`py-2.5 px-3 border-b-2 font-medium transition flex items-center gap-1.5 ${
              activeTab === 'trace'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Stepper</span>
          </button>
        )}

        {hasQuiz && (
          <button
            onClick={() => setActiveTab('quiz')}
            className={`py-2.5 px-3 border-b-2 font-medium transition flex items-center gap-1.5 ${
              activeTab === 'quiz'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Practice Quiz ({practiceQuestionCount})</span>
          </button>
        )}

        {effectiveSources.length > 0 && (
          <button
            onClick={() => setActiveTab('sources')}
            className={`py-2.5 px-3 border-b-2 font-medium transition flex items-center gap-1.5 ${
              activeTab === 'sources'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>Sources ({effectiveSources.length})</span>
          </button>
        )}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-sans leading-relaxed">
        {activeTab === 'explanation' && (
          <>
            {/* 3D Sub-Map Skeleton Navigation Banner */}
            {node.linkedMapTopic && onNavigateTopic && (
              <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border border-cyan-500/50 flex items-center justify-between gap-3 shadow-lg">
                <div>
                  <div className="text-[10px] uppercase font-mono tracking-wider text-cyan-300 font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>3D Sub-Topic Skeleton Available</span>
                  </div>
                  <p className="text-white text-xs font-semibold mt-0.5">
                    Explore {node.title} as a dedicated 3D Graph
                  </p>
                </div>
                <button
                  onClick={() => onNavigateTopic(node.linkedMapTopic!)}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold text-xs shrink-0 flex items-center gap-1.5 transition shadow-md shadow-cyan-500/30"
                >
                  <span>Expand 3D Skeleton</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Priority 4: Depth Level Segmented Control */}
            <div className="bg-black/50 p-1 rounded-xl border border-slate-800/80 flex items-center gap-1 font-mono text-[11px]">
              <button
                onClick={() => setExplanationLevel('beginner')}
                className={`flex-1 py-1 px-2 rounded-lg transition text-center ${
                  explanationLevel === 'beginner'
                    ? 'bg-cyan-950 text-cyan-200 border border-cyan-500/40 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Beginner
              </button>
              <button
                onClick={() => setExplanationLevel('intermediate')}
                className={`flex-1 py-1 px-2 rounded-lg transition text-center ${
                  explanationLevel === 'intermediate'
                    ? 'bg-cyan-950 text-cyan-200 border border-cyan-500/40 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Intermediate
              </button>
              <button
                onClick={() => setExplanationLevel('advanced')}
                className={`flex-1 py-1 px-2 rounded-lg transition text-center ${
                  explanationLevel === 'advanced'
                    ? 'bg-cyan-950 text-cyan-200 border border-cyan-500/40 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Deep Dive
              </button>
            </div>

            {/* 1. BEGINNER LEVEL */}
            {explanationLevel === 'beginner' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                {/* Level Explanation Card */}
                <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-cyan-200 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-wider text-cyan-400 font-semibold">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Simple Intuition & Definition</span>
                  </div>
                  <p className="leading-relaxed text-xs">
                    {node.beginnerExplanation || node.shortExplanation}
                  </p>
                </div>

                {/* Why It Matters */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-300 mb-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                    <span>WHY THIS MATTERS</span>
                  </div>
                  <p className="text-slate-300 bg-black/40 p-3 rounded-lg border border-slate-800/70 text-xs">
                    {node.whyItMatters}
                  </p>
                </div>

                {/* Basic / Foundational Code Example */}
                {node.concreteExample && (
                  <div>
                    <div className="text-xs font-mono font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>BASIC CODE EXAMPLE</span>
                    </div>
                    <div className="bg-black/50 p-3 rounded-lg border border-slate-800/70 space-y-2">
                      <p className="text-slate-300 text-xs">{node.concreteExample.explanation}</p>
                      {node.concreteExample.code && (
                        <pre className="bg-[#0b0d13] p-2.5 rounded border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto">
                          {node.concreteExample.code}
                        </pre>
                      )}
                      {node.concreteExample.expectedOutput && (
                        <div className="bg-black/60 p-2 rounded border border-slate-800/80 font-mono text-[11px]">
                          <span className="text-slate-500 font-semibold">Expected Output: </span>
                          <span className="text-cyan-300">{node.concreteExample.expectedOutput}</span>
                        </div>
                      )}
                      {hasTrace && (
                        <button
                          onClick={() => setActiveTab('trace')}
                          className="w-full py-2 rounded bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-600/40 text-cyan-300 font-mono text-[11px] transition flex items-center justify-center gap-1.5"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Launch Interactive Execution Stepper</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Step-by-Step Breakdown */}
                {node.lessonSteps && node.lessonSteps.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-300 mb-2">
                      <Layers className="w-3.5 h-3.5 text-cyan-400" />
                      <span>FOUNDATIONAL BREAKDOWN</span>
                    </div>
                    <div className="space-y-2.5">
                      {node.lessonSteps.map((step) => (
                        <div
                          key={step.stepNumber}
                          className="p-3 rounded-lg bg-black/40 border border-slate-800/70 space-y-2"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 flex items-center justify-center font-mono text-[10px] font-bold">
                              {step.stepNumber}
                            </span>
                            <span className="font-semibold text-white text-xs">{step.title}</span>
                          </div>
                          <p className="text-slate-300 text-xs">{step.explanation}</p>
                          {step.codeSnippet && (
                            <pre className="bg-[#0b0d13] p-2.5 rounded border border-slate-800 text-[11px] font-mono text-cyan-200 overflow-x-auto">
                              {step.codeSnippet}
                            </pre>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 2. INTERMEDIATE LEVEL */}
            {explanationLevel === 'intermediate' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                {/* Level Explanation Card */}
                <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-800/50 text-blue-200 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-wider text-blue-400 font-semibold">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Deeper Reasoning & Mechanics</span>
                  </div>
                  <p className="leading-relaxed text-xs">
                    {node.intermediateExplanation || `${node.shortExplanation} Under the hood, this construct manages references, scope frames, and data transformations following idiomatic Python conventions.`}
                  </p>
                </div>

                {/* Practical Real-World Example */}
                <div>
                  <div className="text-xs font-mono font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                    <span>PRACTICAL APPLICATION EXAMPLE</span>
                  </div>
                  <div className="bg-black/50 p-3 rounded-lg border border-slate-800/70 space-y-2">
                    {node.intermediateExample ? (
                      <>
                        <p className="text-slate-300 text-xs">{node.intermediateExample.explanation}</p>
                        {node.intermediateExample.code && (
                          <pre className="bg-[#0b0d13] p-2.5 rounded border border-slate-800 text-[11px] font-mono text-blue-300 overflow-x-auto">
                            {node.intermediateExample.code}
                          </pre>
                        )}
                        {node.intermediateExample.expectedOutput && (
                          <div className="bg-black/60 p-2 rounded border border-slate-800/80 font-mono text-[11px]">
                            <span className="text-slate-500 font-semibold">Expected Output: </span>
                            <span className="text-blue-300">{node.intermediateExample.expectedOutput}</span>
                          </div>
                        )}
                      </>
                    ) : node.practiceExercises && node.practiceExercises.length > 0 ? (
                      <>
                        <p className="text-slate-300 text-xs">{node.practiceExercises[0].prompt}</p>
                        {node.practiceExercises[0].solutionCode && (
                          <pre className="bg-[#0b0d13] p-2.5 rounded border border-slate-800 text-[11px] font-mono text-blue-300 overflow-x-auto">
                            {node.practiceExercises[0].solutionCode}
                          </pre>
                        )}
                      </>
                    ) : (
                      <>
                        <p className="text-slate-300 text-xs">{node.concreteExample?.explanation || 'Idiomatic pattern implementation.'}</p>
                        {node.concreteExample?.code && (
                          <pre className="bg-[#0b0d13] p-2.5 rounded border border-slate-800 text-[11px] font-mono text-blue-300 overflow-x-auto">
                            {node.concreteExample.code}
                          </pre>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Common Pitfalls & Mistakes */}
                {node.commonMistakes && node.commonMistakes.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-rose-400 mb-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>COMMON PITFALLS & HOW TO AVOID THEM</span>
                    </div>
                    <ul className="space-y-1.5 bg-black/40 p-3 rounded-lg border border-slate-800/70 list-disc list-inside text-slate-300 text-xs">
                      {node.commonMistakes.map((mistake, i) => (
                        <li key={i} className="leading-relaxed">
                          {mistake}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Practical Use Cases in Production */}
                {node.practicalUseCases && node.practicalUseCases.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-400 mb-1.5">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>PRODUCTION USE CASES</span>
                    </div>
                    <ul className="space-y-1.5 bg-black/40 p-3 rounded-lg border border-slate-800/70 list-disc list-inside text-slate-300 text-xs">
                      {node.practicalUseCases.map((uc, i) => (
                        <li key={i}>{uc}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* 3. DEEP DIVE LEVEL */}
            {explanationLevel === 'advanced' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                {/* Level Explanation Card */}
                <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-800/50 text-purple-200 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-wider text-purple-400 font-semibold">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Internal Architecture & Execution Mechanics</span>
                  </div>
                  <p className="leading-relaxed text-xs">
                    {node.advancedDetails || `CPython interprets and executes this construct via bytecode instructions evaluated in the virtual machine evaluation loop. Memory objects are allocated on the heap and managed via reference counting and cyclic garbage collection.`}
                  </p>
                </div>

                {/* Edge Cases & Subtle Traps */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-amber-400 mb-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>EDGE CASES & BOUNDARY CONDITIONS</span>
                  </div>
                  <ul className="space-y-1.5 bg-black/40 p-3 rounded-lg border border-slate-800/70 list-disc list-inside text-slate-300 text-xs">
                    {node.edgeCases && node.edgeCases.length > 0 ? (
                      node.edgeCases.map((ec, i) => (
                        <li key={i} className="leading-relaxed">{ec}</li>
                      ))
                    ) : (
                      <>
                        <li className="leading-relaxed">
                          <span className="font-semibold text-amber-200">Reference Binding:</span> Assignment copies object pointers, not the underlying heap memory buffers.
                        </li>
                        <li className="leading-relaxed">
                          <span className="font-semibold text-amber-200">Boundary Mutation:</span> Mutating data structures during active traversal triggers silent index skips or iteration anomalies.
                        </li>
                        <li className="leading-relaxed">
                          <span className="font-semibold text-amber-200">Scope Resolution:</span> In-place assignment within inner functions shadows enclosing variables unless explicitly marked global or nonlocal.
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Advanced Example */}
                <div>
                  <div className="text-xs font-mono font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>ADVANCED ARCHITECTURE EXAMPLE</span>
                  </div>
                  <div className="bg-black/50 p-3 rounded-lg border border-slate-800/70 space-y-2">
                    {node.advancedExample ? (
                      <>
                        <p className="text-slate-300 text-xs">{node.advancedExample.explanation}</p>
                        {node.advancedExample.code && (
                          <pre className="bg-[#0b0d13] p-2.5 rounded border border-slate-800 text-[11px] font-mono text-purple-300 overflow-x-auto">
                            {node.advancedExample.code}
                          </pre>
                        )}
                        {node.advancedExample.expectedOutput && (
                          <div className="bg-black/60 p-2 rounded border border-slate-800/80 font-mono text-[11px]">
                            <span className="text-slate-500 font-semibold">Expected Output: </span>
                            <span className="text-purple-300">{node.advancedExample.expectedOutput}</span>
                          </div>
                        )}
                      </>
                    ) : node.practiceExercises && node.practiceExercises.length > 1 ? (
                      <>
                        <p className="text-slate-300 text-xs">{node.practiceExercises[1].prompt}</p>
                        {node.practiceExercises[1].solutionCode && (
                          <pre className="bg-[#0b0d13] p-2.5 rounded border border-slate-800 text-[11px] font-mono text-purple-300 overflow-x-auto">
                            {node.practiceExercises[1].solutionCode}
                          </pre>
                        )}
                      </>
                    ) : (
                      <>
                        <p className="text-slate-300 text-xs">Under-the-hood bytecode disassembly and memory id inspection:</p>
                        <pre className="bg-[#0b0d13] p-2.5 rounded border border-slate-800 text-[11px] font-mono text-purple-300 overflow-x-auto">
                          {`import dis, sys\n# Inspect bytecode evaluation instructions\nprint(f"Memory overhead: {sys.getsizeof(${node.concreteExample?.code ? '42' : 'None'})} bytes")`}
                        </pre>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Related Concepts in 3D Skeleton */}
            {relatedNodes.length > 0 && (
              <div>
                <div className="text-xs font-mono font-semibold text-slate-400 mb-1.5">
                  CONNECTED CONCEPTS IN 3D GRAPH
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {relatedNodes.map((rel) => (
                    <button
                      key={rel.id}
                      onClick={() => onSelectNode(rel.id)}
                      className="px-2.5 py-1.5 rounded bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-cyan-300 text-[11px] font-mono transition flex items-center gap-1"
                    >
                      <span>{rel.title}</span>
                      <ExternalLink className="w-3 h-3 text-slate-500" />
                    </button>
                  ))}
                </div>
              </div>
            )}
            {/* Verified Sources & Citations Preview */}
            {effectiveSources.length > 0 && (
              <div>
                <div className="flex items-center justify-between text-xs font-mono font-semibold text-slate-300 mb-1.5">
                  <div className="flex items-center gap-1.5 text-cyan-300">
                    <Globe className="w-3.5 h-3.5 text-cyan-400" />
                    <span>VERIFIED WEB SOURCES</span>
                  </div>
                  <button
                    onClick={() => setActiveTab('sources')}
                    className="text-[11px] text-cyan-400 hover:underline"
                  >
                    View All ({effectiveSources.length}) &rarr;
                  </button>
                </div>
                <div className="space-y-1.5">
                  {effectiveSources.slice(0, 2).map((s, idx) => (
                    <a
                      key={idx}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-2.5 rounded-lg bg-black/40 hover:bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/50 transition group"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-slate-200 group-hover:text-cyan-300 truncate text-[11px]">
                          {s.title}
                        </span>
                        <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 shrink-0" />
                      </div>
                      {s.snippet && (
                        <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5 font-sans">
                          {s.snippet}
                        </p>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Suggested Next Lessons */}
            {node.nextSuggestedLessons && node.nextSuggestedLessons.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-300 mb-2">
                  <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                  <span>SUGGESTED NEXT LESSONS</span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {node.nextSuggestedLessons.map((sug) => (
                    <button
                      key={sug.id}
                      onClick={() => onNavigateTopic?.(sug.query)}
                      className="w-full text-left p-2.5 rounded-lg bg-black/40 hover:bg-cyan-950/40 border border-slate-800/80 hover:border-cyan-500/40 transition group flex items-center justify-between"
                    >
                      <div>
                        <div className="text-white group-hover:text-cyan-300 font-medium text-xs">
                          {sug.title}
                        </div>
                        {sug.reason && (
                          <p className="text-[10px] text-slate-400 mt-0.5">{sug.reason}</p>
                        )}
                      </div>
                      <span className="text-cyan-400 font-mono text-[11px] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                        Load &rarr;
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Tab: Hands-on Practice Exercises */}
        {activeTab === 'exercises' && node.practiceExercises && (
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-cyan-200">
              <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-wider text-cyan-400 font-semibold mb-1">
                <Code2 className="w-3.5 h-3.5" />
                <span>Hands-On Coding Practice</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Work through these exercises to reinforce your understanding of {node.title}. Test your solution or reveal hints if you get stuck.
              </p>
            </div>

            {node.practiceExercises.map((exercise, index) => {
              const isHintRevealed = revealedHints[exercise.id]
              const isSolutionRevealed = revealedSolutions[exercise.id]

              return (
                <div
                  key={exercise.id}
                  className="p-3.5 rounded-xl bg-black/40 border border-slate-800/80 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 font-semibold uppercase">
                        Challenge {index + 1}
                      </span>
                      <h4 className="font-bold text-white text-xs mt-0.5">{exercise.title}</h4>
                    </div>
                  </div>

                  <p className="text-slate-300 text-xs leading-relaxed">{exercise.prompt}</p>

                  {exercise.starterCode && (
                    <div>
                      <span className="text-[10px] font-mono text-slate-400">Starter Template:</span>
                      <pre className="mt-1 bg-[#0b0d13] p-2.5 rounded border border-slate-800 text-[11px] font-mono text-cyan-200 overflow-x-auto">
                        {exercise.starterCode}
                      </pre>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-1 font-mono text-xs">
                    {exercise.hint && (
                      <button
                        onClick={() =>
                          setRevealedHints((prev) => ({
                            ...prev,
                            [exercise.id]: !prev[exercise.id],
                          }))
                        }
                        className={`px-2.5 py-1 rounded border text-[11px] flex items-center gap-1 transition ${
                          isHintRevealed
                            ? 'bg-amber-950/50 border-amber-600/50 text-amber-300'
                            : 'bg-slate-900/80 border-slate-700/60 text-slate-400 hover:text-white'
                        }`}
                      >
                        <HelpCircle className="w-3 h-3 text-amber-400" />
                        <span>{isHintRevealed ? 'Hide Hint' : 'Show Hint'}</span>
                      </button>
                    )}

                    {exercise.solutionCode && (
                      <button
                        onClick={() =>
                          setRevealedSolutions((prev) => ({
                            ...prev,
                            [exercise.id]: !prev[exercise.id],
                          }))
                        }
                        className={`px-2.5 py-1 rounded border text-[11px] flex items-center gap-1 transition ${
                          isSolutionRevealed
                            ? 'bg-emerald-950/50 border-emerald-600/50 text-emerald-300'
                            : 'bg-slate-900/80 border-slate-700/60 text-slate-400 hover:text-white'
                        }`}
                      >
                        <CheckCircle className="w-3 h-3 text-emerald-400" />
                        <span>{isSolutionRevealed ? 'Hide Solution' : 'Reveal Solution'}</span>
                      </button>
                    )}
                  </div>

                  {isHintRevealed && exercise.hint && (
                    <div className="p-2.5 rounded bg-amber-950/20 border border-amber-800/40 text-amber-200 text-xs">
                      <span className="font-semibold font-mono text-[10px] text-amber-400 block mb-0.5">
                        HINT:
                      </span>
                      <p>{exercise.hint}</p>
                    </div>
                  )}

                  {isSolutionRevealed && exercise.solutionCode && (
                    <div className="space-y-1.5 pt-1">
                      <span className="font-semibold font-mono text-[10px] text-emerald-400 block">
                        REFERENCE SOLUTION:
                      </span>
                      <pre className="bg-[#070e0a] p-2.5 rounded border border-emerald-800/50 text-[11px] font-mono text-emerald-300 overflow-x-auto">
                        {exercise.solutionCode}
                      </pre>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Tab 2: Execution Stepper */}
        {activeTab === 'trace' && node.concreteExample?.trace && (
          <div className="space-y-3">
            <p className="text-slate-300">{node.concreteExample.trace.explanation}</p>
            <CodeTraceViewer trace={node.concreteExample.trace} />
          </div>
        )}

        {/* Tab 3: Practice Quiz (Keyed to node.id to guarantee no state leakage) */}
        {activeTab === 'quiz' && hasQuiz && (
          <PracticeQuiz
            key={node.id}
            question={node.practiceQuestion}
            questions={node.practiceQuestions}
            nodeTitle={node.title}
            onCompleted={() => onMarkCompleted(node.id)}
          />
        )}

        {/* Tab 4: Full Verified Sources & Documentation */}
        {activeTab === 'sources' && (
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-cyan-200">
              <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-wider text-cyan-400 font-semibold mb-1">
                <Globe className="w-3.5 h-3.5" />
                <span>Authoritative Reference Grounding</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {searchSummary || `Information for "${node.title}" is cross-referenced with live web research and official documentation.`}
              </p>
            </div>

            <div className="space-y-2">
              {effectiveSources.map((s, idx) => (
                <a
                  key={idx}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 rounded-lg bg-black/40 hover:bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/50 transition group space-y-1"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                          {s.sourceName || 'Web Source'}
                        </span>
                      </div>
                      <h4 className="font-semibold text-white group-hover:text-cyan-300 text-xs transition">
                        {s.title}
                      </h4>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 shrink-0 mt-1" />
                  </div>
                  {s.snippet && (
                    <p className="text-slate-400 text-[11px] leading-relaxed font-sans">
                      "{s.snippet}"
                    </p>
                  )}
                  <div className="text-[10px] font-mono text-cyan-500/80 truncate pt-0.5">
                    {s.url}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-3 border-t border-slate-800/80 bg-black/50 flex items-center justify-between text-xs font-mono">
        <button
          onClick={onClose}
          className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
        >
          Back to 3D Canvas
        </button>

        {!isCompleted ? (
          <button
            onClick={() => onMarkCompleted(node.id)}
            className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium flex items-center gap-1.5 transition"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Mark as Mastered</span>
          </button>
        ) : (
          <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            Concept Completed
          </span>
        )}
      </div>
    </div>
  )
}
