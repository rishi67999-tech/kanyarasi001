import { Sparkles, Compass, CheckCircle2, Search, Database, BookOpen, Globe, ArrowLeft } from 'lucide-react'
import { isSupabaseConfigured } from '../../services/supabaseService'

interface NavbarProps {
  currentTopic: string
  completedCount: number
  totalNodes: number
  isDemo?: boolean
  demoNote?: string
  hasSources?: boolean
  searchStatus?: string
  parentMapTopic?: string
  parentMapTitle?: string
  onOpenNewTopic: () => void
  onOpenCurriculum?: () => void
  onNavigateTopic?: (topic: string) => void
}

export function Navbar({
  currentTopic,
  completedCount,
  totalNodes,
  isDemo,
  demoNote,
  hasSources,
  searchStatus: _searchStatus,
  parentMapTopic,
  parentMapTitle,
  onOpenNewTopic,
  onOpenCurriculum,
  onNavigateTopic,
}: NavbarProps) {
  return (
    <header className="absolute top-0 left-0 w-full z-20 px-4 py-3 flex items-center justify-between pointer-events-auto select-none bg-gradient-to-b from-black/80 via-black/40 to-transparent">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm tracking-wider text-white">
              KNOWLEDGE SKELETON
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
              3D SYNAPSE
            </span>
          </div>
          <p className="text-[10px] font-mono text-slate-400">
            AI-POWERED EDUCATIONAL ANATOMY
          </p>
        </div>
      </div>

      {/* Center Topic Pill & Parent Map Navigation */}
      <div className="hidden md:flex items-center gap-2">
        {parentMapTopic && onNavigateTopic && (
          <button
            onClick={() => onNavigateTopic(parentMapTopic)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-700/60 hover:border-cyan-400 text-cyan-200 text-xs font-mono backdrop-blur-xl shadow-lg transition group"
            title={`Return to ${parentMapTitle || 'Python Overview'}`}
          >
            <ArrowLeft className="w-3.5 h-3.5 text-cyan-400 group-hover:-translate-x-0.5 transition-transform" />
            <span className="font-semibold">{parentMapTitle || 'Python Overview'}</span>
          </button>
        )}

        {currentTopic && (
          <button
            onClick={onOpenNewTopic}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#08090ecc] border border-slate-800 hover:border-cyan-500/50 text-slate-200 text-xs font-mono backdrop-blur-xl shadow-lg transition group"
            title="Change Topic (Search)"
          >
            <Compass className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-45 transition-transform" />
            <span className="font-semibold text-white truncate max-w-xs">{currentTopic}</span>
            <span className="text-slate-500 text-[10px]">Change</span>
          </button>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5">
        {/* Concept Mastery Counter */}
        {totalNodes > 0 && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#08090ec7] border border-slate-800/80 text-[11px] font-mono text-slate-300 backdrop-blur-md">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {completedCount} / {totalNodes} Mastered
            </span>
          </div>
        )}

        {/* Database indicator */}
        <div
          title={isSupabaseConfigured ? 'Connected to Supabase PostgreSQL' : 'Local Storage Cache Active (Configure Supabase in .env)'}
          className="hidden sm:flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded bg-black/40 border border-slate-800 text-slate-400"
        >
          <Database className={`w-3 h-3 ${isSupabaseConfigured ? 'text-emerald-400' : 'text-slate-500'}`} />
          <span>{isSupabaseConfigured ? 'Cloud Sync' : 'Local'}</span>
        </div>

        {/* Demo Mode or Live AI Badge */}
        {isDemo ? (
          <span
            title={demoNote || 'Curated reference mode active'}
            className="text-[10px] font-mono px-2 py-1 rounded bg-amber-950/60 border border-amber-800/50 text-amber-300 backdrop-blur-md"
          >
            DEMO MODE
          </span>
        ) : (
          <span className="text-[10px] font-mono px-2 py-1 rounded bg-emerald-950/60 border border-emerald-800/50 text-emerald-300 backdrop-blur-md">
            LIVE AI
          </span>
        )}

        {/* Web Grounding Indicator */}
        {hasSources && (
          <span
            title="Grounded with verified live web research and official documentation"
            className="hidden lg:flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 backdrop-blur-md"
          >
            <Globe className="w-3 h-3 text-cyan-400" />
            WEB GROUNDED
          </span>
        )}

        {/* Python Master Map Quick Button */}
        {onNavigateTopic && currentTopic !== 'Python Programming Master Curriculum' && (
          <button
            onClick={() => onNavigateTopic('Python Programming Master Curriculum')}
            className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-800/60 text-cyan-300 font-mono text-xs transition"
            title="Open Complete Python 3D Master Architecture"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Python Overview</span>
          </button>
        )}

        {/* Curriculum Catalog Button */}
        {onOpenCurriculum && (
          <button
            onClick={onOpenCurriculum}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-cyan-300 font-mono text-xs shadow-md transition"
            title="Browse all 14 categories in the Python Curriculum Catalog"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Curriculum</span>
          </button>
        )}

        {/* Ask New Question Button */}
        <button
          onClick={onOpenNewTopic}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs shadow-md shadow-cyan-900/30 transition"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Ask Question</span>
        </button>
      </div>
    </header>
  )
}
