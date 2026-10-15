import { z } from 'zod'

export const ExecutionStepSchema = z.object({
  step: z.number(),
  line: z.number(),
  variables: z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()])),
  output: z.string(),
  description: z.string(),
})

export const CodeTraceSchema = z.object({
  code: z.string(),
  language: z.string(),
  explanation: z.string(),
  steps: z.array(ExecutionStepSchema),
})

export const PracticeQuestionSchema = z.object({
  question: z.string().min(5),
  options: z.array(z.string()).min(2).max(6),
  correctIndex: z.number().int().min(0),
  explanation: z.string(),
})

export const LessonStepSchema = z.object({
  stepNumber: z.number().int().positive(),
  title: z.string().min(2),
  explanation: z.string().min(5),
  codeSnippet: z.string().optional(),
  visualization: z.string().optional(),
})

export const SourceCitationSchema = z.object({
  title: z.string().min(1),
  url: z.string().min(1),
  snippet: z.string().optional(),
  sourceName: z.string().optional(),
})

export const PracticeExerciseSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  prompt: z.string().min(5),
  hint: z.string().optional(),
  starterCode: z.string().optional(),
  solutionCode: z.string().optional(),
})

export const SuggestedNextLessonSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  query: z.string().min(1),
  reason: z.string().optional(),
})

export const ConceptNodeSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  shortExplanation: z.string().min(5),
  category: z.enum([
    'core',
    'syntax',
    'control',
    'data',
    'advanced',
    'foundation',
    'application',
  ]),
  depth: z.number().int().min(0).max(4),
  position: z.tuple([z.number(), z.number(), z.number()]),
  color: z.string().optional(),
  size: z.number().positive().optional(),
  beginnerExplanation: z.string().optional(),
  intermediateExplanation: z.string().optional(),
  advancedDetails: z.string().optional(),
  practicalUseCases: z.array(z.string()).optional(),
  lessonSteps: z.array(LessonStepSchema).min(1),
  concreteExample: z
    .object({
      code: z.string().optional(),
      explanation: z.string(),
      expectedOutput: z.string().optional(),
      trace: CodeTraceSchema.optional(),
    })
    .optional(),
  whyItMatters: z.string().min(5),
  commonMistakes: z.array(z.string()).default([]),
  practiceQuestion: PracticeQuestionSchema.optional(),
  prerequisiteIds: z.array(z.string()).optional(),
  sources: z.array(SourceCitationSchema).optional(),
  practiceExercises: z.array(PracticeExerciseSchema).optional(),
  nextSuggestedLessons: z.array(SuggestedNextLessonSchema).optional(),
  linkedMapTopic: z.string().optional(),
})

export const ConceptEdgeSchema = z.object({
  id: z.string().min(1),
  source: z.string().min(1),
  target: z.string().min(1),
  relationship: z.string().min(1),
  description: z.string().min(3),
})

export const KnowledgeMapSchema = z
  .object({
    id: z.string().min(1),
    topic: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(5),
    centralNodeId: z.string().min(1),
    nodes: z.array(ConceptNodeSchema).min(2).max(18),
    edges: z.array(ConceptEdgeSchema).min(1),
    createdAt: z.string(),
    isDemo: z.boolean().optional(),
    demoNote: z.string().optional(),
    sources: z.array(SourceCitationSchema).optional(),
    searchStatus: z.enum(['verified-web', 'ai-knowledge', 'curated-demo']).optional(),
    searchSummary: z.string().optional(),
    parentMapId: z.string().optional(),
    parentMapTopic: z.string().optional(),
    parentMapTitle: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Check 1: Ensure unique node IDs
    const nodeIds = new Set<string>()
    for (let i = 0; i < data.nodes.length; i++) {
      const node = data.nodes[i]
      if (nodeIds.has(node.id)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Duplicate node ID detected: "${node.id}" at index ${i}`,
          path: ['nodes', i, 'id'],
        })
      }
      nodeIds.add(node.id)
    }

    // Check 2: Ensure centralNodeId exists
    if (!nodeIds.has(data.centralNodeId)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `centralNodeId "${data.centralNodeId}" does not exist in nodes list`,
        path: ['centralNodeId'],
      })
    }

    // Check 3: Ensure each edge references existing nodes and is not a self-loop
    for (let i = 0; i < data.edges.length; i++) {
      const edge = data.edges[i]
      if (!nodeIds.has(edge.source)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Edge source "${edge.source}" does not reference an existing node`,
          path: ['edges', i, 'source'],
        })
      }
      if (!nodeIds.has(edge.target)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Edge target "${edge.target}" does not reference an existing node`,
          path: ['edges', i, 'target'],
        })
      }
      if (edge.source === edge.target) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Edge cannot connect a node to itself ("${edge.source}")`,
          path: ['edges', i],
        })
      }
    }
  })

export function validateKnowledgeMap(data: unknown) {
  return KnowledgeMapSchema.safeParse(data)
}
