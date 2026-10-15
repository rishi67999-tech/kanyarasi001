import { useState } from 'react'
import { Search, Sparkles, ArrowRight, Loader2 } from 'lucide-react'

interface TopicPromptProps {
  onSubmit: (topic: string) => void
  isLoading: boolean
  isModal?: boolean
  onClose?: () => void
}

const EXAMPLE_TOPICS = [
  'Explain logical operators in Python',
  'Explain Python functions',
  'Explain loops in Python',
  'Explain Python variables',
  'What are Python lists?',
  'Explain recursion',
  'Explain binary search',
  'Explain classes and objects',
  'Explain HTML flexbox',
  'Explain database indexes',
]

export function TopicPrompt({
  onSubmit,
  isLoading,
  isModal = false,
  onClose,
}: TopicPromptProps) {
  const [inputVal, setInputVal] = useState('')

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!inputVal.trim() || isLoading) return
    onSubmit(inputVal.trim())
  }

  const handleChipClick = (prompt: string) => {
    if (isLoading) return
    setInputVal(prompt)
    onSubmit(prompt)
  }

  return (
    <div
      className={`flex flex-col items-center select-none ${
        isModal
          ? 'w-full max-w-xl mx-auto'
          : 'w-full max-w-2xl px-4 z-20 pointer-events-auto'
      }`}
    >
      {!isModal && (
        <div className="text-center mb-6 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-[11px] font-mono text-cyan-300 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>AI-POWERED 3D KNOWLEDGE SKELETON</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
            Synthesize Connected Understanding
          </h1>
          <p className="text-sm md:text-base text-slate-400 max-w-lg mx-auto font-sans leading-relaxed">
            Ask any concept. Watch its architectural relationships materialize in interactive 3D space.
          </p>
        </div>
      )}

      {/* Search Input Box */}
      <form
        onSubmit={handleSubmit}
        className="w-full relative group transition-all duration-300"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/40 via-blue-500/30 to-violet-500/40 rounded-2xl blur opacity-40 group-hover:opacity-75 transition duration-500" />

        <div className="relative flex items-center bg-[#07090ecb] border border-slate-700/80 rounded-2xl p-2 backdrop-blur-xl shadow-2xl">
          <div className="pl-3 pr-2 text-cyan-400">
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </div>

          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            disabled={isLoading}
            placeholder="What would you like to understand?"
            className="w-full bg-transparent border-none text-white text-sm md:text-base placeholder-slate-500 focus:outline-none focus:ring-0 px-2 font-sans"
            autoFocus
          />

          <button
            type="submit"
            disabled={!inputVal.trim() || isLoading}
            className="p-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-30 disabled:cursor-not-allowed text-white transition flex items-center justify-center shrink-0 shadow-lg shadow-cyan-900/40"
            title="Generate 3D Knowledge Skeleton"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
          </button>
        </div>
      </form>

      {/* Example Prompt Chips */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <span className="text-[11px] font-mono text-slate-500 mr-1">EXAMPLE TOPICS:</span>
        {EXAMPLE_TOPICS.map((topic) => (
          <button
            key={topic}
            onClick={() => handleChipClick(topic)}
            disabled={isLoading}
            className="px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 text-xs font-mono transition backdrop-blur-md disabled:opacity-40"
          >
            {topic}
          </button>
        ))}
      </div>

      {isModal && onClose && (
        <button
          onClick={onClose}
          className="mt-6 text-xs font-mono text-slate-500 hover:text-slate-300 transition"
        >
          Cancel and return to canvas
        </button>
      )}
    </div>
  )
}
