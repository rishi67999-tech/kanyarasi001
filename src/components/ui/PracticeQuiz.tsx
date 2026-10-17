import { useState, useMemo, useEffect } from 'react'
import confetti from 'canvas-confetti'
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  RefreshCw,
  Code2,
  Bug,
  Terminal,
  FileQuestion,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
} from 'lucide-react'
import type { PracticeQuestion } from '../../types/knowledge'

interface PracticeQuizProps {
  question?: PracticeQuestion
  questions?: PracticeQuestion[]
  nodeTitle: string
  onCompleted?: () => void
}

type DifficultyFilter = 'all' | 'easy' | 'medium' | 'challenging' | 'missed'

export function PracticeQuiz({
  question,
  questions,
  nodeTitle,
  onCompleted,
}: PracticeQuizProps) {
  // Normalize questions into array
  const rawQuestions = useMemo(() => {
    if (questions && questions.length > 0) return questions
    if (question) return [question]
    return []
  }, [questions, question])

  // Track state per question (by question id or index)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number | null>>({})
  const [submittedStatus, setSubmittedStatus] = useState<Record<number, boolean>>({})
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyFilter>('all')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  // Reset state when rawQuestions changes (e.g. node switches)
  useEffect(() => {
    setSelectedAnswers({})
    setSubmittedStatus({})
    setSelectedDifficulty('all')
    setCurrentQuestionIndex(0)
  }, [rawQuestions])

  // Filter questions based on selected difficulty
  const filteredQuestions = useMemo(() => {
    if (selectedDifficulty === 'all') return rawQuestions
    if (selectedDifficulty === 'missed') {
      return rawQuestions.filter((q, originalIdx) => {
        const isSubmitted = submittedStatus[originalIdx]
        const userChoice = selectedAnswers[originalIdx]
        return isSubmitted && userChoice !== q.correctIndex
      })
    }
    return rawQuestions.filter((q) => (q.difficulty || 'medium') === selectedDifficulty)
  }, [rawQuestions, selectedDifficulty, submittedStatus, selectedAnswers])

  // Counts for tabs
  const counts = useMemo(() => {
    let easy = 0
    let medium = 0
    let challenging = 0
    let missed = 0
    let correct = 0

    rawQuestions.forEach((q, originalIdx) => {
      const diff = q.difficulty || 'medium'
      if (diff === 'easy') easy++
      else if (diff === 'medium') medium++
      else if (diff === 'challenging') challenging++

      if (submittedStatus[originalIdx]) {
        if (selectedAnswers[originalIdx] === q.correctIndex) {
          correct++
        } else {
          missed++
        }
      }
    })

    return { easy, medium, challenging, missed, correct, total: rawQuestions.length }
  }, [rawQuestions, submittedStatus, selectedAnswers])

  // Ensure currentQuestionIndex is within bounds of filtered list
  const activeIndex = Math.min(
    Math.max(0, currentQuestionIndex),
    Math.max(0, filteredQuestions.length - 1)
  )
  const currentQuestion = filteredQuestions[activeIndex]
  const originalQuestionIndex = currentQuestion ? rawQuestions.indexOf(currentQuestion) : -1

  const currentSelectedChoice =
    originalQuestionIndex >= 0 ? selectedAnswers[originalQuestionIndex] ?? null : null
  const isCurrentSubmitted =
    originalQuestionIndex >= 0 ? Boolean(submittedStatus[originalQuestionIndex]) : false
  const isCurrentCorrect =
    isCurrentSubmitted &&
    currentQuestion &&
    currentSelectedChoice === currentQuestion.correctIndex

  // Handle option select
  const handleSelectOption = (choiceIdx: number) => {
    if (isCurrentSubmitted || originalQuestionIndex < 0) return
    setSelectedAnswers((prev) => ({
      ...prev,
      [originalQuestionIndex]: choiceIdx,
    }))
  }

  // Handle submit verification
  const handleVerify = () => {
    if (currentSelectedChoice === null || originalQuestionIndex < 0 || !currentQuestion) return

    setSubmittedStatus((prev) => ({
      ...prev,
      [originalQuestionIndex]: true,
    }))

    const isCorrect = currentSelectedChoice === currentQuestion.correctIndex
    if (isCorrect) {
      // Check if all questions are now correctly answered
      const newCorrectCount = counts.correct + 1
      if (newCorrectCount === rawQuestions.length) {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.65 },
          colors: ['#38bdf8', '#34d399', '#a78bfa', '#f59e0b'],
        })
        if (onCompleted) {
          onCompleted()
        }
      }
    }
  }

  // Retry the current question
  const handleRetry = () => {
    if (originalQuestionIndex < 0) return
    setSelectedAnswers((prev) => ({
      ...prev,
      [originalQuestionIndex]: null,
    }))
    setSubmittedStatus((prev) => ({
      ...prev,
      [originalQuestionIndex]: false,
    }))
  }

  // Question Type Icon & Label
  const getQuestionTypeBadge = (q: PracticeQuestion) => {
    const qType = q.type || 'mcq'
    if (qType === 'output_prediction') {
      return (
        <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-800/60">
          <Terminal className="w-3 h-3 text-blue-400" />
          <span>OUTPUT PREDICTION</span>
        </span>
      )
    }
    if (qType === 'debugging') {
      return (
        <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800/60">
          <Bug className="w-3 h-3 text-rose-400" />
          <span>DEBUGGING CHALLENGE</span>
        </span>
      )
    }
    if (qType === 'fill_blank') {
      return (
        <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-800/60">
          <Code2 className="w-3 h-3 text-purple-400" />
          <span>FILL IN THE BLANK</span>
        </span>
      )
    }
    return (
      <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
        <FileQuestion className="w-3 h-3 text-cyan-400" />
        <span>MULTIPLE CHOICE</span>
      </span>
    )
  }

  if (rawQuestions.length === 0) {
    return (
      <div className="bg-black/50 border border-slate-800 rounded-xl p-4 text-center text-slate-400 text-xs font-mono">
        No practice questions available for this node yet.
      </div>
    )
  }

  return (
    <div className="bg-black/60 border border-slate-800/90 rounded-2xl p-4 backdrop-blur-xl shadow-xl space-y-4">
      {/* Header and Mastery Score Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
            <HelpCircle className="w-4 h-4" />
            <span>KNOWLEDGE CHECK // {nodeTitle.toUpperCase()}</span>
          </div>
          <div className="text-[11px] font-mono text-slate-400 mt-0.5">
            Mastery Score:{' '}
            <span className="text-emerald-400 font-bold">{counts.correct}</span> /{' '}
            <span>{counts.total}</span> completed ({Math.round((counts.correct / counts.total) * 100)}%)
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full sm:w-32 bg-slate-800/80 rounded-full h-2 overflow-hidden border border-slate-700/60">
          <div
            className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-500 rounded-full"
            style={{ width: `${(counts.correct / counts.total) * 100}%` }}
          />
        </div>
      </div>

      {/* Difficulty Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1 text-[11px] font-mono bg-black/40 p-1 rounded-xl border border-slate-800/80">
        <button
          onClick={() => {
            setSelectedDifficulty('all')
            setCurrentQuestionIndex(0)
          }}
          className={`px-2.5 py-1 rounded-lg transition ${
            selectedDifficulty === 'all'
              ? 'bg-cyan-950 text-cyan-200 border border-cyan-500/50 font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          All ({counts.total})
        </button>

        {counts.easy > 0 && (
          <button
            onClick={() => {
              setSelectedDifficulty('easy')
              setCurrentQuestionIndex(0)
            }}
            className={`px-2.5 py-1 rounded-lg transition ${
              selectedDifficulty === 'easy'
                ? 'bg-emerald-950 text-emerald-200 border border-emerald-500/50 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Easy ({counts.easy})
          </button>
        )}

        {counts.medium > 0 && (
          <button
            onClick={() => {
              setSelectedDifficulty('medium')
              setCurrentQuestionIndex(0)
            }}
            className={`px-2.5 py-1 rounded-lg transition ${
              selectedDifficulty === 'medium'
                ? 'bg-blue-950 text-blue-200 border border-blue-500/50 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Medium ({counts.medium})
          </button>
        )}

        {counts.challenging > 0 && (
          <button
            onClick={() => {
              setSelectedDifficulty('challenging')
              setCurrentQuestionIndex(0)
            }}
            className={`px-2.5 py-1 rounded-lg transition ${
              selectedDifficulty === 'challenging'
                ? 'bg-purple-950 text-purple-200 border border-purple-500/50 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Challenging ({counts.challenging})
          </button>
        )}

        {counts.missed > 0 && (
          <button
            onClick={() => {
              setSelectedDifficulty('missed')
              setCurrentQuestionIndex(0)
            }}
            className={`px-2.5 py-1 rounded-lg transition ml-auto flex items-center gap-1 ${
              selectedDifficulty === 'missed'
                ? 'bg-rose-950 text-rose-200 border border-rose-500/50 font-semibold'
                : 'text-rose-400 hover:text-rose-200'
            }`}
          >
            <RotateCcw className="w-3 h-3" />
            <span>Review Missed ({counts.missed})</span>
          </button>
        )}
      </div>

      {/* Question Stepper Navigation Bar */}
      {filteredQuestions.length > 1 && (
        <div className="flex items-center justify-between gap-2 pt-1">
          <button
            onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
            disabled={activeIndex === 0}
            className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 transition"
            title="Previous question"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Stepper Dots / Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 px-1">
            {filteredQuestions.map((q, idx) => {
              const qOriginalIdx = rawQuestions.indexOf(q)
              const isSub = submittedStatus[qOriginalIdx]
              const userAns = selectedAnswers[qOriginalIdx]
              const isCorr = isSub && userAns === q.correctIndex
              const isWrong = isSub && userAns !== q.correctIndex
              const isCurrent = idx === activeIndex

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`w-6 h-6 rounded-full font-mono text-[10px] flex items-center justify-center transition shrink-0 ${
                    isCorr
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500'
                      : isWrong
                      ? 'bg-rose-950 text-rose-300 border border-rose-500'
                      : 'bg-slate-900 text-slate-400 border border-slate-700'
                  } ${isCurrent ? 'ring-2 ring-cyan-400 ring-offset-1 ring-offset-black font-bold' : ''}`}
                >
                  {idx + 1}
                </button>
              )
            })}
          </div>

          <button
            onClick={() =>
              setCurrentQuestionIndex((prev) =>
                Math.min(filteredQuestions.length - 1, prev + 1)
              )
            }
            disabled={activeIndex === filteredQuestions.length - 1}
            className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 transition"
            title="Next question"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Active Question Details */}
      {currentQuestion ? (
        <div className="space-y-3 pt-1">
          {/* Question Metadata */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase">
              Question {activeIndex + 1} of {filteredQuestions.length}
            </span>
            <div className="flex items-center gap-1.5">
              {getQuestionTypeBadge(currentQuestion)}
              <span
                className={`text-[9px] uppercase font-mono px-2 py-0.5 rounded border ${
                  (currentQuestion.difficulty || 'medium') === 'easy'
                    ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/50'
                    : (currentQuestion.difficulty || 'medium') === 'medium'
                    ? 'bg-blue-950/60 text-blue-300 border-blue-800/50'
                    : 'bg-purple-950/60 text-purple-300 border-purple-800/50'
                }`}
              >
                {currentQuestion.difficulty || 'medium'}
              </span>
            </div>
          </div>

          {/* Question Prompt */}
          <p className="text-xs md:text-sm font-semibold text-slate-100 leading-snug font-sans">
            {currentQuestion.question}
          </p>

          {/* Code Snippet (if output prediction or debugging) */}
          {currentQuestion.codeSnippet && (
            <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#07090f]">
              <div className="px-3 py-1 bg-black/50 text-[10px] font-mono text-slate-400 border-b border-slate-800 flex items-center justify-between">
                <span>python snippet</span>
                <span className="text-cyan-400">inspect code</span>
              </div>
              <pre className="p-3 text-[11px] font-mono text-cyan-200 overflow-x-auto leading-relaxed">
                {currentQuestion.codeSnippet}
              </pre>
            </div>
          )}

          {/* 4 Options List */}
          <div className="space-y-2 pt-1">
            {currentQuestion.options.map((option, idx) => {
              let stateStyle =
                'bg-slate-900/50 border-slate-800 hover:border-slate-700 text-slate-300'

              if (isCurrentSubmitted) {
                if (idx === currentQuestion.correctIndex) {
                  stateStyle = 'bg-emerald-950/70 border-emerald-500/80 text-emerald-200 font-semibold'
                } else if (idx === currentSelectedChoice) {
                  stateStyle = 'bg-rose-950/70 border-rose-500/80 text-rose-200'
                } else {
                  stateStyle = 'bg-slate-950/40 border-slate-900 text-slate-600 opacity-60'
                }
              } else if (currentSelectedChoice === idx) {
                stateStyle =
                  'bg-cyan-950/70 border-cyan-500/80 text-cyan-200 shadow-sm shadow-cyan-500/20'
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isCurrentSubmitted}
                  className={`w-full text-left p-2.5 md:p-3 rounded-xl border text-xs transition-all flex items-center justify-between font-sans ${stateStyle}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-mono shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-snug">{option}</span>
                  </div>

                  {isCurrentSubmitted && idx === currentQuestion.correctIndex && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                  {isCurrentSubmitted &&
                    idx === currentSelectedChoice &&
                    idx !== currentQuestion.correctIndex && (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                </button>
              )
            })}
          </div>

          {/* Action Footer */}
          {!isCurrentSubmitted ? (
            <button
              onClick={handleVerify}
              disabled={currentSelectedChoice === null}
              className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium text-xs transition flex items-center justify-center gap-1.5 shadow-md shadow-cyan-900/30"
            >
              <span>Verify Answer</span>
            </button>
          ) : (
            <div className="space-y-2 pt-1 animate-in fade-in duration-200">
              <div
                className={`p-3 rounded-xl border text-xs ${
                  isCurrentCorrect
                    ? 'bg-emerald-950/50 border-emerald-800/60 text-emerald-300'
                    : 'bg-rose-950/50 border-rose-800/60 text-rose-200'
                }`}
              >
                <div className="font-semibold flex items-center justify-between mb-1 font-mono">
                  <div className="flex items-center gap-1.5">
                    {isCurrentCorrect ? (
                      <>
                        <Award className="w-4 h-4 text-emerald-400" />
                        <span>CORRECT! ANSWER VERIFIED</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-400" />
                        <span>INCORRECT CHOICE</span>
                      </>
                    )}
                  </div>

                  {!isCurrentCorrect && (
                    <button
                      onClick={handleRetry}
                      className="px-2 py-0.5 rounded bg-rose-900/80 hover:bg-rose-800 text-rose-100 text-[10px] font-mono flex items-center gap-1 transition"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Retry</span>
                    </button>
                  )}
                </div>

                <p className="text-slate-300 leading-relaxed font-sans mt-1">
                  {currentQuestion.explanation}
                </p>
              </div>

              {/* Next Question Navigation Shortcut */}
              {activeIndex < filteredQuestions.length - 1 && (
                <button
                  onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                  className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/70 text-slate-200 text-xs font-mono transition flex items-center justify-center gap-1"
                >
                  <span>Next Question ({activeIndex + 2}/{filteredQuestions.length})</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-black/40 border border-slate-800 text-center text-xs font-mono text-slate-400">
          No questions matching filter.
        </div>
      )}
    </div>
  )
}
