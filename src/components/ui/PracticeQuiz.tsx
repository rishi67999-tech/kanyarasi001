import { useState } from 'react'
import confetti from 'canvas-confetti'
import { CheckCircle2, XCircle, HelpCircle, Award } from 'lucide-react'
import type { PracticeQuestion } from '../../types/knowledge'

interface PracticeQuizProps {
  question: PracticeQuestion
  nodeTitle: string
  onCompleted?: () => void
}

export function PracticeQuiz({ question, nodeTitle, onCompleted }: PracticeQuizProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSelect = (idx: number) => {
    if (submitted) return
    setSelectedIdx(idx)
  }

  const handleSubmit = () => {
    if (selectedIdx === null) return
    setSubmitted(true)

    if (selectedIdx === question.correctIndex) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#38bdf8', '#34d399', '#a78bfa'],
      })
      if (onCompleted) {
        onCompleted()
      }
    }
  }

  const isCorrect = submitted && selectedIdx === question.correctIndex

  return (
    <div className="bg-black/50 border border-slate-800 rounded-xl p-4 backdrop-blur-md mt-4">
      <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs mb-2">
        <HelpCircle className="w-4 h-4" />
        <span>KNOWLEDGE CHECK // {nodeTitle.toUpperCase()}</span>
      </div>

      <p className="text-sm font-medium text-slate-100 mb-3">{question.question}</p>

      {/* Options List */}
      <div className="space-y-2 mb-3">
        {question.options.map((option, idx) => {
          let stateStyle = 'bg-slate-900/50 border-slate-800 hover:border-slate-700 text-slate-300'

          if (submitted) {
            if (idx === question.correctIndex) {
              stateStyle = 'bg-emerald-950/70 border-emerald-500/70 text-emerald-200'
            } else if (idx === selectedIdx) {
              stateStyle = 'bg-rose-950/70 border-rose-500/70 text-rose-200'
            } else {
              stateStyle = 'bg-slate-950/40 border-slate-900 text-slate-600 opacity-60'
            }
          } else if (selectedIdx === idx) {
            stateStyle = 'bg-cyan-950/60 border-cyan-500/80 text-cyan-200 shadow-sm shadow-cyan-500/20'
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={submitted}
              className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex items-center justify-between font-sans ${stateStyle}`}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-mono shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{option}</span>
              </div>

              {submitted && idx === question.correctIndex && (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              )}
              {submitted && idx === selectedIdx && idx !== question.correctIndex && (
                <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
              )}
            </button>
          )
        })}
      </div>

      {/* Action and feedback */}
      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={selectedIdx === null}
          className="w-full py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium text-xs transition flex items-center justify-center gap-1.5 shadow-md shadow-cyan-900/30"
        >
          <span>Verify Answer</span>
        </button>
      ) : (
        <div
          className={`p-3 rounded-lg border text-xs ${
            isCorrect
              ? 'bg-emerald-950/50 border-emerald-800/60 text-emerald-300'
              : 'bg-amber-950/40 border-amber-800/60 text-amber-200'
          }`}
        >
          <div className="font-semibold flex items-center gap-1.5 mb-1 font-mono">
            {isCorrect ? (
              <>
                <Award className="w-4 h-4 text-emerald-400" />
                <span>EXCELLENT! MASTERY CONFIRMED</span>
              </>
            ) : (
              <span>CONCEPT REVIEW REQUIRED</span>
            )}
          </div>
          <p className="text-slate-300 leading-relaxed font-sans">{question.explanation}</p>
        </div>
      )}
    </div>
  )
}
