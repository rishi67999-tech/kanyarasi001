import { Play, Pause, RotateCcw, FastForward, Activity } from 'lucide-react'

interface ConstructionControlsProps {
  isPlaying: boolean
  isCompleted: boolean
  progressFraction: number
  currentTime: number
  totalDuration: number
  onPlay: () => void
  onPause: () => void
  onReplay: () => void
  onSkip: () => void
}

export function ConstructionControls({
  isPlaying,
  isCompleted,
  progressFraction,
  currentTime,
  totalDuration,
  onPlay,
  onPause,
  onReplay,
  onSkip,
}: ConstructionControlsProps) {
  const percent = Math.min(100, Math.round(progressFraction * 100))

  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-auto select-none">
      <div className="flex items-center gap-3 bg-[#08090ee0] border border-slate-800/90 rounded-2xl px-4 py-2.5 backdrop-blur-xl shadow-2xl">
        {/* Play / Pause */}
        <button
          onClick={isPlaying ? onPause : onPlay}
          className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-500/50 hover:bg-cyan-900 text-cyan-300 transition"
          title={isPlaying ? 'Pause Construction' : 'Resume Construction'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        {/* Replay */}
        <button
          onClick={onReplay}
          className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white transition"
          title="Replay Construction Animation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Skip to complete layout */}
        {!isCompleted && (
          <button
            onClick={onSkip}
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white transition"
            title="Skip to Completed Skeleton"
          >
            <FastForward className="w-4 h-4" />
          </button>
        )}

        {/* Timeline Progress Bar */}
        <div className="flex flex-col w-32 md:w-48 gap-1">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span className="flex items-center gap-1">
              <Activity className="w-3 h-3 text-cyan-400" />
              <span>{isCompleted ? 'STABLE' : 'GROWING'}</span>
            </span>
            <span>
              {currentTime.toFixed(1)}s / {totalDuration.toFixed(1)}s ({percent}%)
            </span>
          </div>

          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-100 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
