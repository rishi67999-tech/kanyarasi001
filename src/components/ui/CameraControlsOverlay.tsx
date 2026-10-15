import { Compass, RotateCcw } from 'lucide-react'

interface CameraControlsOverlayProps {
  onResetCamera: () => void
}

export function CameraControlsOverlay({ onResetCamera }: CameraControlsOverlayProps) {
  return (
    <div className="absolute top-20 right-4 z-20 flex flex-col gap-2 select-none pointer-events-auto">
      {/* Reset Camera Button */}
      <button
        onClick={onResetCamera}
        className="px-3 py-2 rounded-xl bg-[#08090ee0] border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 backdrop-blur-xl shadow-lg transition flex items-center gap-2 text-xs font-mono group"
        title="Reset 3D Camera to Standard Overview"
      >
        <RotateCcw className="w-3.5 h-3.5 group-hover:-rotate-90 transition-transform duration-300" />
        <span>Reset View</span>
      </button>

      {/* Navigation hints */}
      <div className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-black/40 border border-slate-800/60 text-[10px] font-mono text-slate-400 backdrop-blur-md">
        <Compass className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        <span>Orbit: Left Drag • Pan: Right Drag • Zoom: Scroll</span>
      </div>
    </div>
  )
}
