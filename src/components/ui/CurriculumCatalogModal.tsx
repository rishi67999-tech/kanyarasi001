import { useState, useRef } from 'react'
import {
  X,
  BookOpen,
  Search,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from 'lucide-react'
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
  const categoryScrollRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  const isSearching = searchTerm.trim().length > 0

  const filteredCategories = PYTHON_CURRICULUM_CATEGORIES.map((cat) => {
    const matchingTopics = cat.topics.filter((t) => {
      if (!isSearching) return true
      const term = searchTerm.toLowerCase().trim()
      return (
        t.title.toLowerCase().includes(term) ||
        t.description.toLowerCase().includes(term) ||
        t.query.toLowerCase().includes(term)
      )
    })
    return { ...cat, topics: matchingTopics }
  }).filter((cat) => {
    if (!isSearching && activeCategory !== 'all' && cat.key !== activeCategory) {
      return false
    }
    if (isSearching && activeCategory !== 'all' && cat.key !== activeCategory) {
      return false
    }
    return cat.topics.length > 0
  })

  const totalMatchingTopics = filteredCategories.reduce(
    (acc, cat) => acc + cat.topics.length,
    0
  )

  const totalCatalogTopics = PYTHON_CURRICULUM_CATEGORIES.reduce(
    (acc, cat) => acc + cat.topics.length,
    0
  )

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoryScrollRef.current) {
      const scrollAmount = direction === 'left' ? -240 : 240
      categoryScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const handleClearSearch = () => {
    setSearchTerm('')
    searchInputRef.current?.focus()
  }

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
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 hidden sm:inline">
                  {totalCatalogTopics} TOPICS
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Explore structured topics from fundamentals to advanced algorithms in 3D.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => searchInputRef.current?.focus()}
              className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 border border-slate-800 transition flex items-center gap-1.5 text-xs font-mono"
              title="Focus Search"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Row */}
        <div className="p-3 md:px-5 md:py-3.5 border-b border-slate-800/80 bg-black/25 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search topics across all 14 categories (e.g. lists, recursion, decorators, slicing)..."
              className="w-full pl-9 pr-9 py-2 rounded-xl bg-[#090b12] border border-slate-800 text-slate-200 placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500/60 transition"
              autoFocus
            />
            {isSearching && (
              <button
                onClick={handleClearSearch}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white transition"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {isSearching && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 text-[11px] font-mono whitespace-nowrap">
              <span>{totalMatchingTopics} found</span>
            </div>
          )}

          {isSearching && activeCategory !== 'all' && (
            <button
              onClick={() => setActiveCategory('all')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-[11px] font-mono whitespace-nowrap transition"
              title="Show results from all categories"
            >
              Search All Categories
            </button>
          )}
        </div>

        {/* Horizontal Category Scrolling Navigation (A, B, C, D... up to N) */}
        <div className="px-3 md:px-5 py-2.5 border-b border-slate-800/80 bg-black/40 flex items-center gap-1.5">
          {/* Scroll Left Button */}
          <button
            onClick={() => scrollCategories('left')}
            className="p-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-cyan-300 transition shrink-0 shadow-sm"
            title="Scroll categories left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Scrollable Category Pills Track */}
          <div
            ref={categoryScrollRef}
            onWheel={(e) => {
              if (e.deltaY !== 0 && categoryScrollRef.current) {
                categoryScrollRef.current.scrollLeft += e.deltaY
              }
            }}
            className="flex items-center gap-1.5 overflow-x-auto scroll-smooth py-1 px-0.5 scrollbar-none no-scrollbar flex-1 font-mono text-[11px]"
          >
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeCategory === 'all'
                  ? 'bg-cyan-950 text-cyan-200 border border-cyan-500/50 font-semibold shadow-sm shadow-cyan-900/20'
                  : 'bg-[#090b12] text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <span>All Topics</span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-black/40 text-slate-400">
                {totalCatalogTopics}
              </span>
            </button>

            {PYTHON_CURRICULUM_CATEGORIES.map((c) => {
              const isActive = activeCategory === c.key
              return (
                <button
                  key={c.key}
                  onClick={() => setActiveCategory(c.key)}
                  className={`px-2.5 py-1.5 rounded-lg transition whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-cyan-950 text-cyan-200 border border-cyan-500/50 font-semibold shadow-sm shadow-cyan-900/20'
                      : 'bg-[#090b12] text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                  title={`${c.letter}. ${c.title}`}
                >
                  <span
                    className={`w-4 h-4 rounded text-[9px] flex items-center justify-center font-bold ${
                      isActive ? 'bg-cyan-800 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {c.letter}
                  </span>
                  <span>{c.title}</span>
                  <span className="text-[9px] px-1 py-0.2 rounded bg-black/40 text-slate-400">
                    {c.topics.length}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Scroll Right Button */}
          <button
            onClick={() => scrollCategories('right')}
            className="p-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-cyan-300 transition shrink-0 shadow-sm"
            title="Scroll categories right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Topics List Container */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-14 px-4 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
                <Search className="w-6 h-6" />
              </div>
              <p className="text-slate-300 font-medium text-sm">
                No matching curriculum topics found for &ldquo;{searchTerm}&rdquo;
              </p>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Try searching for a different keyword or click below to view all topics across the 14 categories.
              </p>
              <button
                onClick={handleClearSearch}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-800/80 text-cyan-300 text-xs font-mono transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Search Filter</span>
              </button>
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
                      className="p-3 rounded-xl bg-[#090b12] hover:bg-slate-900/90 border border-slate-800/80 hover:border-cyan-500/60 text-left transition group flex items-start justify-between gap-3 shadow-sm hover:shadow-cyan-950/20"
                    >
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-slate-100 group-hover:text-cyan-200 transition truncate">
                            {topic.title}
                          </span>
                          <span
                            className={`text-[9px] font-mono px-1.5 py-0.2 rounded border shrink-0 ${
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
        <div className="p-3 md:px-5 border-t border-slate-800/80 bg-black/40 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">Select any topic to materialize its 3D knowledge skeleton</span>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition text-[11px] shrink-0"
          >
            Close Catalog
          </button>
        </div>
      </div>
    </div>
  )
}
