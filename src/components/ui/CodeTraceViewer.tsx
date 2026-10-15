import { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Terminal } from 'lucide-react'
import type { CodeTrace } from '../../types/knowledge'

interface CodeTraceViewerProps {
  trace: CodeTrace
}

export function CodeTraceViewer({ trace }: CodeTraceViewerProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)

  const currentStep = trace.steps[currentStepIndex] || trace.steps[0]
  const totalSteps = trace.steps.length

  // Auto-play stepper
  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev >= totalSteps - 1) {
          setIsAutoPlaying(false)
          return prev
        }
        return prev + 1
      })
    }, 1500)

    return () => clearInterval(timer)
  }, [isAutoPlaying, totalSteps])

  const codeLines = trace.code.split('\n')

  return (
    <div className="flex flex-col gap-3 bg-black/60 border border-slate-800 rounded-xl p-4 backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
          <Terminal className="w-4 h-4" />
          <span>STEP-BY-STEP EXECUTION TRACE</span>
        </div>
        <div className="text-xs font-mono text-slate-400">
          Step <span className="text-cyan-300 font-semibold">{currentStepIndex + 1}</span> of{' '}
          {totalSteps}
        </div>
      </div>

      {/* Code Display with Active Line Indicator */}
      <div className="bg-[#0b0d13] rounded-lg border border-slate-800 p-3 font-mono text-sm overflow-x-auto">
        {codeLines.map((line, idx) => {
          const lineNumber = idx + 1
          const isActive = currentStep.line === lineNumber

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 px-2 py-0.5 rounded transition-colors ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-200 border-l-2 border-cyan-400 font-medium'
                  : 'text-slate-400 border-l-2 border-transparent'
              }`}
            >
              <span className="w-5 text-right text-xs text-slate-600 select-none">
                {lineNumber}
              </span>
              <pre className="m-0 font-mono text-xs leading-relaxed">{line}</pre>
            </div>
          )
        })}
      </div>

      {/* Step Description */}
      <div className="px-3 py-2 bg-slate-900/60 border border-slate-800/70 rounded-lg text-xs text-slate-300 font-mono">
        <span className="text-cyan-400 font-semibold">ACTION: </span>
        {currentStep.description}
      </div>

      {/* Variables Inspector & Terminal Output Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Variables Table */}
        <div className="bg-[#08090d] border border-slate-800/80 rounded-lg p-2.5 text-xs font-mono">
          <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1.5 font-semibold">
            Variable State Inspector
          </div>
          <div className="space-y-1">
            {Object.entries(currentStep.variables).length === 0 ? (
              <div className="text-slate-600 italic">No variables bound</div>
            ) : (
              Object.entries(currentStep.variables).map(([name, val]) => (
                <div
                  key={name}
                  className="flex items-center justify-between px-2 py-1 bg-black/40 rounded border border-slate-800/40"
                >
                  <span className="text-slate-400">{name}</span>
                  <span className="text-emerald-400 font-semibold">
                    {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Console Stdout Output */}
        <div className="bg-[#08090d] border border-slate-800/80 rounded-lg p-2.5 text-xs font-mono flex flex-col justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1.5 font-semibold flex items-center gap-1.5">
              <span>Stdout Terminal</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            </div>
            <pre className="bg-black/60 rounded p-2 text-cyan-300 min-h-[46px] m-0 text-xs font-mono whitespace-pre-wrap">
              {currentStep.output ? currentStep.output : <span className="text-slate-600 italic">(waiting for print...)</span>}
            </pre>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              setIsAutoPlaying(false)
              setCurrentStepIndex((prev) => Math.max(0, prev - 1))
            }}
            disabled={currentStepIndex === 0}
            className="px-2.5 py-1.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 text-xs transition"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>

          <button
            onClick={() => {
              setIsAutoPlaying(false)
              setCurrentStepIndex((prev) => Math.min(totalSteps - 1, prev + 1))
            }}
            disabled={currentStepIndex >= totalSteps - 1}
            className="px-2.5 py-1.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 text-xs transition"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="px-3 py-1.5 rounded bg-cyan-950/80 border border-cyan-500/40 hover:bg-cyan-900 text-cyan-300 flex items-center gap-1.5 text-xs transition font-mono"
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Auto-Step</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              setIsAutoPlaying(false)
              setCurrentStepIndex(0)
            }}
            title="Replay from start"
            className="p-1.5 rounded bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
