export type ConceptCategory =
  | 'core'
  | 'syntax'
  | 'control'
  | 'data'
  | 'advanced'
  | 'foundation'
  | 'application'

export interface ExecutionStep {
  step: number
  line: number
  variables: Record<string, string | number | boolean | null>
  output: string
  description: string
}

export interface CodeTrace {
  code: string
  language: string
  explanation: string
  steps: ExecutionStep[]
}

export interface PracticeQuestion {
  id?: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  difficulty?: 'easy' | 'medium' | 'challenging'
  type?: 'mcq' | 'output_prediction' | 'debugging' | 'fill_blank'
  codeSnippet?: string
  hint?: string
}

export interface LessonStep {
  stepNumber: number
  title: string
  explanation: string
  codeSnippet?: string
  visualization?: string
}

export interface PracticeExercise {
  id: string
  title: string
  prompt: string
  hint?: string
  starterCode?: string
  solutionCode?: string
  type?: 'code' | 'debug' | 'fill_blank' | 'predict'
}

export interface SuggestedNextLesson {
  id: string
  title: string
  query: string
  reason?: string
}

export interface ConceptNode {
  id: string
  title: string
  shortExplanation: string
  category: ConceptCategory
  depth: number // 0 = central, 1 = primary, 2 = sub-concept
  position: [number, number, number]
  color?: string
  size?: number
  // Structured depth levels
  beginnerExplanation?: string
  intermediateExplanation?: string
  advancedDetails?: string
  edgeCases?: string[]
  intermediateExample?: {
    code?: string
    explanation: string
    expectedOutput?: string
  }
  advancedExample?: {
    code?: string
    explanation: string
    expectedOutput?: string
  }
  practicalUseCases?: string[]
  lessonSteps: LessonStep[]
  concreteExample?: {
    code?: string
    explanation: string
    expectedOutput?: string
    trace?: CodeTrace
  }
  whyItMatters: string
  commonMistakes: string[]
  practiceQuestion?: PracticeQuestion
  practiceQuestions?: PracticeQuestion[]
  prerequisiteIds?: string[]
  sources?: SourceCitation[]
  practiceExercises?: PracticeExercise[]
  nextSuggestedLessons?: SuggestedNextLesson[]
  linkedMapTopic?: string
  subjectKey?: string
}

export interface ConceptEdge {
  id: string
  source: string // node ID
  target: string // node ID
  relationship: string
  description: string
}

export interface SourceCitation {
  title: string
  url: string
  snippet?: string
  sourceName?: string
}

export interface KnowledgeMap {
  id: string
  topic: string
  title: string
  description: string
  centralNodeId: string
  nodes: ConceptNode[]
  edges: ConceptEdge[]
  createdAt: string
  isDemo?: boolean
  demoNote?: string
  sources?: SourceCitation[]
  searchStatus?: 'verified-web' | 'ai-knowledge' | 'curated-demo'
  searchSummary?: string
  parentMapId?: string
  parentMapTopic?: string
  parentMapTitle?: string
}

export type ConstructionState = 'idle' | 'building' | 'paused' | 'completed'

export interface UserProgress {
  mapId: string
  completedNodeIds: string[]
  quizScores: Record<string, number>
  lastVisitedNodeId?: string
}

export interface CurriculumTopic {
  id: string
  title: string
  query: string
  categoryKey: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
}

export interface CurriculumCategory {
  key: string
  letter: string
  title: string
  topics: CurriculumTopic[]
}
