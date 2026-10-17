import { useState, useMemo, useEffect, useRef } from 'react'
import {
  Search,
  Sparkles,
  ArrowRight,
  Loader2,
  BookOpen,
  Compass,
  AlertCircle,
  Lightbulb,
} from 'lucide-react'
import {
  PYTHON_CURRICULUM_CATEGORIES,
  getAllCurriculumTopics,
} from '../../data/pythonCurriculum'
import { detectSearchIntent } from '../../services/searchIntent'

interface TopicPromptProps {
  onSubmit: (topic: string) => void
  isLoading: boolean
  isModal?: boolean
  onClose?: () => void
}

export interface SearchSuggestion {
  id: string
  title: string
  query: string
  category: string
  difficulty?: string
  score: number
}

// Curated list of primary curriculum pillars for instant matching
const PRIMARY_PILLARS: SearchSuggestion[] = [
  { id: 'sec-a', title: 'Section A: Python Fundamentals', query: 'Python Fundamentals', category: 'Curriculum Pillar', difficulty: 'Beginner', score: 0 },
  { id: 'sec-b', title: 'Section B: Control Flow & Loops', query: 'Python Control Flow', category: 'Curriculum Pillar', difficulty: 'Beginner', score: 0 },
  { id: 'sec-c', title: 'Section C: Data Structures', query: 'Python Data Structures', category: 'Curriculum Pillar', difficulty: 'Intermediate', score: 0 },
  { id: 'sec-d', title: 'Section D: Functions & Modules', query: 'Python Functions and Modules', category: 'Curriculum Pillar', difficulty: 'Intermediate', score: 0 },
  { id: 'sec-e', title: 'Section E: Errors & File I/O', query: 'Python Error Handling and Files', category: 'Curriculum Pillar', difficulty: 'Intermediate', score: 0 },
  { id: 'sec-f', title: 'Section F: Object-Oriented Programming (OOP)', query: 'Python OOP', category: 'Curriculum Pillar', difficulty: 'Advanced', score: 0 },
  { id: 'sec-g', title: 'Section G: Advanced Python & Concurrency', query: 'Advanced Python', category: 'Curriculum Pillar', difficulty: 'Advanced', score: 0 },
  { id: 'sec-h', title: 'Section H: Practical Python Projects', query: 'Practical Python Projects', category: 'Curriculum Pillar', difficulty: 'Advanced', score: 0 },
  { id: 'topic-loops', title: 'Python Loops (For & While Iteration)', query: 'Explain loops in Python', category: 'Control Flow', difficulty: 'Beginner', score: 0 },
  { id: 'topic-vars', title: 'Variables & Data Types', query: 'Explain Python variables', category: 'Fundamentals', difficulty: 'Beginner', score: 0 },
  { id: 'topic-lists', title: 'Lists, Indexing & Slicing', query: 'What are Python lists?', category: 'Data Structures', difficulty: 'Beginner', score: 0 },
  { id: 'topic-dicts', title: 'Dictionaries & Hash Maps', query: 'Python Dictionaries', category: 'Data Structures', difficulty: 'Intermediate', score: 0 },
  { id: 'topic-fn', title: 'Functions, Parameters & Return', query: 'Python Functions', category: 'Functions', difficulty: 'Beginner', score: 0 },
  { id: 'topic-rec', title: 'Recursion & Base Cases', query: 'Explain recursion', category: 'Algorithms', difficulty: 'Intermediate', score: 0 },
  { id: 'topic-bs', title: 'Binary Search Algorithm', query: 'Explain binary search', category: 'Algorithms', difficulty: 'Intermediate', score: 0 },
  { id: 'topic-flex', title: 'CSS & HTML Flexbox', query: 'Explain HTML flexbox', category: 'Web Architecture', difficulty: 'Intermediate', score: 0 },
  { id: 'topic-idx', title: 'Database B-Tree Indexes', query: 'Explain database indexes', category: 'Databases', difficulty: 'Intermediate', score: 0 },
]

const EXAMPLE_TOPICS = [
  'Python Control Flow',
  'Explain loops in Python',
  'Python Data Structures',
  'Python Functions',
  'Python OOP',
  'Explain recursion',
  'Explain binary search',
  'Database indexes',
]

export function TopicPrompt({
  onSubmit,
  isLoading,
  isModal = false,
  onClose,
}: TopicPromptProps) {
  const [inputVal, setInputVal] = useState('')
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1)
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const [intentNotice, setIntentNotice] = useState<{
    message: string
    suggestedTopics: string[]
  } | null>(null)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Build category title lookup map
  const categoryTitleMap = useMemo(() => {
    const map = new Map<string, string>()
    for (const cat of PYTHON_CURRICULUM_CATEGORIES) {
      map.set(cat.key, cat.title)
    }
    return map
  }, [])

  // Calculate real-time suggestions as user types
  const suggestions = useMemo<SearchSuggestion[]>(() => {
    const raw = inputVal.trim().toLowerCase()
    if (!raw) return []

    // Strip conversational prefixes for cleaner matching
    const query = raw
      .replace(/^(explain|what is|what are|how to|how do|teach me about|explore)\s+/i, '')
      .replace(/\s+in\s+python$/i, '')
      .trim()

    const results: SearchSuggestion[] = []
    const seenQueries = new Set<string>()

    const evaluateItem = (item: SearchSuggestion) => {
      const titleLower = item.title.toLowerCase()
      const queryLower = item.query.toLowerCase()
      let score = 0

      if (titleLower === raw || queryLower === raw) {
        score = 200
      } else if (titleLower === query || queryLower === query) {
        score = 180
      } else if (titleLower.startsWith(query)) {
        score = 150
      } else if (titleLower.includes(` ${query}`) || titleLower.includes(`: ${query}`)) {
        score = 120
      } else if (titleLower.includes(query)) {
        score = 90
      } else if (queryLower.includes(query)) {
        score = 70
      } else {
        // Multi-word token overlap
        const tokens = query.split(/\s+/).filter((t) => t.length > 1)
        let matches = 0
        for (const t of tokens) {
          if (titleLower.includes(t)) matches++
        }
        if (matches > 0) {
          score = matches * 25
        }
      }

      if (score > 0 && !seenQueries.has(item.query.toLowerCase())) {
        seenQueries.add(item.query.toLowerCase())
        results.push({ ...item, score })
      }
    }

    // 1. Evaluate primary pillars
    for (const pillar of PRIMARY_PILLARS) {
      evaluateItem(pillar)
    }

    // 2. Evaluate all 80+ curriculum catalog topics
    const allTopics = getAllCurriculumTopics()
    for (const t of allTopics) {
      const catTitle = categoryTitleMap.get(t.categoryKey) || 'Python Curriculum'
      evaluateItem({
        id: t.id,
        title: t.title,
        query: t.query,
        category: catTitle,
        difficulty: t.difficulty,
        score: 0,
      })
    }

    // Sort by relevance score descending, then return top 7
    return results.sort((a, b) => b.score - a.score).slice(0, 7)
  }, [inputVal, categoryTitleMap])

  // Reset active suggestion index when suggestions list changes
  useEffect(() => {
    setActiveSuggestionIndex(-1)
    if (suggestions.length > 0) {
      setIsDropdownVisible(true)
    }
  }, [suggestions])

  // Handle outside click to dismiss suggestion dropdown
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsDropdownVisible(false)
      }
    }
    window.addEventListener('mousedown', handleOutsideClick)
    return () => window.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  // Execute selection and intent check
  const handleSelectTopic = (topicQuery: string) => {
    if (isLoading) return
    setIntentNotice(null)
    setIsDropdownVisible(false)

    // Pre-validate search intent client-side to politely handle unclear or unsupported input
    const intent = detectSearchIntent(topicQuery)
    if (intent.type === 'unclear' || intent.type === 'unsupported') {
      setIntentNotice({
        message:
          intent.message ||
          'Please choose a topic from our supported Python & Computer Science curriculum.',
        suggestedTopics: intent.suggestedTopics || EXAMPLE_TOPICS.slice(0, 4),
      })
      return
    }

    onSubmit(topicQuery)
  }

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!inputVal.trim() || isLoading) return

    // If a suggestion was actively highlighted with keyboard arrows, submit it
    if (activeSuggestionIndex >= 0 && suggestions[activeSuggestionIndex]) {
      handleSelectTopic(suggestions[activeSuggestionIndex].query)
      return
    }

    // Otherwise submit typed value
    handleSelectTopic(inputVal.trim())
  }

  // Handle keyboard navigation: ArrowUp, ArrowDown, Enter, Escape
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) {
      if (e.key === 'Escape' && isModal && onClose) {
        e.preventDefault()
        onClose()
      }
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIsDropdownVisible(true)
      setActiveSuggestionIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIsDropdownVisible(true)
      setActiveSuggestionIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      )
    } else if (e.key === 'Enter') {
      if (activeSuggestionIndex >= 0 && suggestions[activeSuggestionIndex]) {
        e.preventDefault()
        handleSelectTopic(suggestions[activeSuggestionIndex].query)
      }
      // If none highlighted, default form submit will trigger
    } else if (e.key === 'Escape') {
      e.preventDefault()
      if (isDropdownVisible) {
        setIsDropdownVisible(false)
      } else if (isModal && onClose) {
        onClose()
      }
    }
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
            Search any Python concept. Watch its architectural relationships materialize in interactive 3D space.
          </p>
        </div>
      )}

      {/* Search Input Box */}
      <div className="w-full relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/40 via-blue-500/30 to-violet-500/40 rounded-2xl blur opacity-40 group-hover:opacity-75 transition duration-500" />

        <form
          onSubmit={handleSubmit}
          className="relative flex items-center bg-[#07090ecb] border border-slate-700/80 rounded-2xl p-2 backdrop-blur-xl shadow-2xl z-20"
        >
          <div className="pl-3 pr-2 text-cyan-400">
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </div>

          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value)
              setIntentNotice(null)
            }}
            onFocus={() => {
              if (suggestions.length > 0) setIsDropdownVisible(true)
            }}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder="Search supported Python topics, loops, functions, OOP..."
            className="w-full bg-transparent border-none text-white text-sm md:text-base placeholder-slate-500 focus:outline-none focus:ring-0 px-2 font-sans"
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />

          <button
            type="submit"
            disabled={!inputVal.trim() || isLoading}
            className="p-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-30 disabled:cursor-not-allowed text-white transition flex items-center justify-center shrink-0 shadow-lg shadow-cyan-900/40"
            title="Open 3D Knowledge Map"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
          </button>
        </form>

        {/* Real-Time Search Suggestions Dropdown */}
        {isDropdownVisible && suggestions.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute left-0 right-0 top-full mt-2 bg-[#090b12f6] border border-slate-700/80 rounded-2xl p-1.5 shadow-2xl backdrop-blur-2xl z-30 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150"
          >
            <div className="px-3 py-1.5 text-[10px] font-mono text-cyan-400 flex items-center justify-between border-b border-slate-800/80 mb-1">
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                <span>SUPPORTED CURRICULUM SUGGESTIONS</span>
              </span>
              <span className="text-slate-500 hidden sm:inline">Use ↑↓ arrows + Enter</span>
            </div>

            <div className="space-y-0.5 max-h-72 overflow-y-auto">
              {suggestions.map((item, index) => {
                const isSelected = index === activeSuggestionIndex

                return (
                  <button
                    key={item.id + item.query}
                    type="button"
                    onClick={() => handleSelectTopic(item.query)}
                    onMouseEnter={() => setActiveSuggestionIndex(index)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl transition flex items-center justify-between gap-3 font-sans ${
                      isSelected
                        ? 'bg-cyan-950/80 text-white border border-cyan-500/40 shadow-sm shadow-cyan-950'
                        : 'text-slate-200 hover:bg-slate-900/60 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-mono ${
                          isSelected
                            ? 'bg-cyan-500 text-black font-bold'
                            : 'bg-slate-800 text-cyan-300'
                        }`}
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                      </div>
                      <div className="truncate">
                        <div className="font-semibold text-xs md:text-sm text-white truncate">
                          {item.title}
                        </div>
                        <div className="text-[10px] font-mono text-slate-400 truncate flex items-center gap-2 mt-0.5">
                          <span className="text-cyan-400">{item.category}</span>
                          {item.difficulty && (
                            <>
                              <span>•</span>
                              <span
                                className={`px-1.5 py-0.2 rounded text-[9px] ${
                                  item.difficulty === 'Beginner'
                                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/50'
                                    : item.difficulty === 'Intermediate'
                                    ? 'bg-blue-950/80 text-blue-300 border border-blue-800/50'
                                    : 'bg-purple-950/80 text-purple-300 border border-purple-800/50'
                                }`}
                              >
                                {item.difficulty}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center text-xs font-mono text-cyan-400">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Polite Clarification Banner for Unclear / Unsupported Input */}
      {intentNotice && (
        <div className="w-full mt-3 p-3.5 rounded-2xl bg-amber-950/80 border border-amber-700/60 text-amber-200 text-xs backdrop-blur-xl animate-in fade-in duration-200">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="font-medium text-slate-100 leading-relaxed font-sans">
                {intentNotice.message}
              </p>

              {intentNotice.suggestedTopics && intentNotice.suggestedTopics.length > 0 && (
                <div>
                  <div className="text-[10px] font-mono text-amber-300 flex items-center gap-1 mb-1.5 font-semibold">
                    <Lightbulb className="w-3 h-3 text-amber-400" />
                    <span>CHOOSE FROM SUPPORTED CURRICULUM TOPICS:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {intentNotice.suggestedTopics.map((sug) => (
                      <button
                        key={sug}
                        type="button"
                        onClick={() => handleSelectTopic(sug)}
                        className="px-2.5 py-1 rounded-lg bg-amber-900/60 hover:bg-amber-800 border border-amber-700/70 text-amber-100 text-[11px] font-mono transition"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Example Prompt Chips */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <span className="text-[11px] font-mono text-slate-500 mr-1">EXAMPLE TOPICS:</span>
        {EXAMPLE_TOPICS.map((topic) => (
          <button
            key={topic}
            type="button"
            onClick={() => handleSelectTopic(topic)}
            disabled={isLoading}
            className="px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 text-xs font-mono transition backdrop-blur-md disabled:opacity-40"
          >
            {topic}
          </button>
        ))}
      </div>

      {isModal && onClose && (
        <button
          type="button"
          onClick={onClose}
          className="mt-5 text-xs font-mono text-slate-500 hover:text-slate-300 transition"
        >
          Press Esc or click to return to 3D canvas
        </button>
      )}
    </div>
  )
}
