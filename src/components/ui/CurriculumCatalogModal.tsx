import { useState } from 'react'
import { X, BookOpen, Search, ArrowRight, Sparkles } from 'lucide-react'
import { PYTHON_CURRICULUM_CATEGORIES } from '../../data/pythonCurriculum'

interface CurriculumCatalogModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectTopic: (topicQuery: string) => void
}

export function CurriculumCatalogModal({
  isOpen,
  onClose,
  onSelectTopic,
}: CurriculumCatalogModalProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('all')

  if (!isOpen) return null

  const filteredCategories = PYTHON_CURRICULUM_CATEGORIES.map((cat) => {
    const matchingTopics = cat.topics.filter(
      (t) =>
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.query.toLowerCase().includes(searchTerm.toLowerCase())
    )
    return { ...cat, topics: matchingTopics }
  }).filter((cat) => {
    if (activeCategory !== 'all' && cat.key !== activeCategory) return false
    return cat.topics.length > 0
  })

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 md:p-6 select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#07090ef6] border border-slate-800/90 rounded-2xl flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 md:p-5 border-b border-slate-800/80 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base md:text-lg font-bold text-white tracking-tight">
                  Python Learning Curriculum Catalog
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  14 CATEGORIES
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Explore structured topics from fundamentals to advanced algorithms in 3D.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="p-4 border-b border-slate-800/80 bg-black/20 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search topics (e.g. lists, recursion, decorators, slicing)..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#090b12] border border-slate-800 text-slate-200 placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500/60 transition"
              autoFocus
            />
          </div>

          {/* Quick Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 font-mono text-[11px] shrink-0">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-2.5 py-1.5 rounded-lg transition whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-cyan-950 text-cyan-200 border border-cyan-500/40 font-semibold'
                  : 'bg-black/40 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              All Topics
            </button>
            {PYTHON_CURRICULUM_CATEGORIES.map((c) => (
              <button
                key={c.key}
                onClick={() => setActiveCategory(c.key)}
                className={`px-2 py-1.5 rounded-lg transition whitespace-nowrap ${
                  activeCategory === c.key
                    ? 'bg-cyan-950 text-cyan-200 border border-cyan-500/40 font-semibold'
                    : 'bg-black/40 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {c.letter}. {c.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Topics List Container */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12 text-slate-500 font-mono text-xs">
              No matching curriculum topics found. Try searching for a different keyword or enter any custom question in the main search bar!
            </div>
          ) : (
            filteredCategories.map((category) => (
              <div key={category.key} className="space-y-2.5">
                <div className="flex items-center gap-2 border-b border-slate-800/80 pb-1.5">
                  <span className="w-5 h-5 rounded-md bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 flex items-center justify-center font-mono text-[10px] font-bold">
                    {category.letter}
                  </span>
                  <h3 className="text-sm font-bold text-white font-mono tracking-wide">
                    {category.title}
                  </h3>
                  <span className="text-[10px] font-mono text-slate-500">
                    ({category.topics.length} topics)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {category.topics.map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => {
                        onSelectTopic(topic.query)
                        onClose()
                      }}
                      className="p-3 rounded-xl bg-[#090b12] hover:bg-slate-900/90 border border-slate-800/80 hover:border-cyan-500/60 text-left transition group flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-slate-100 group-hover:text-cyan-200 transition">
                            {topic.title}
                          </span>
                          <span
                            className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${
                              topic.difficulty === 'Beginner'
                                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/50'
                                : topic.difficulty === 'Intermediate'
                                ? 'bg-blue-950/60 text-blue-300 border-blue-800/50'
                                : 'bg-purple-950/60 text-purple-300 border-purple-800/50'
                            }`}
                          >
                            {topic.difficulty}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-sans line-clamp-2">
                          {topic.description}
                        </p>
                      </div>

                      <div className="p-1.5 rounded-lg bg-slate-800/40 text-slate-500 group-hover:text-cyan-300 group-hover:bg-cyan-950 transition shrink-0 mt-0.5">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800/80 bg-black/40 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Select any topic to materialize its 3D knowledge skeleton</span>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition text-[11px]"
          >
            Close Catalog
          </button>
        </div>
      </div>
    </div>
  )
}
