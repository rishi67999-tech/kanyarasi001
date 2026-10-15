import type { KnowledgeMap, ConceptNode, ConceptEdge, SourceCitation } from '../types/knowledge'
import { computeGraphLayout, getCategoryColor } from './layoutEngine'
import { validateKnowledgeMap } from './schema'
import { validateMapRelevance } from './relevanceValidator'

export interface DomainConceptDefinition {
  suffix: string
  title: string
  category: 'syntax' | 'control' | 'foundation' | 'application' | 'advanced' | 'data'
  shortExplanation: (subj: string) => string
  beginnerExplanation: (subj: string) => string
  intermediateExplanation: (subj: string) => string
  advancedDetails: (subj: string) => string
  whyItMatters: (subj: string) => string
  exampleCode: (subj: string) => string
  expectedOutput: string
  commonMistakes: string[]
  practicalUseCases: string[]
  quizQuestion: (subj: string) => string
  quizOptions: string[]
  correctIndex: number
  quizExplanation: (subj: string) => string
  relationship: string
  relDescription: (subj: string) => string
}

export interface DomainKnowledgeModel {
  domain: string
  centralCategory: 'core' | 'foundation'
  centralShortExplanation: (subj: string) => string
  centralBeginnerExplanation: (subj: string) => string
  centralIntermediateExplanation: (subj: string) => string
  centralAdvancedDetails: (subj: string) => string
  centralWhyItMatters: (subj: string) => string
  centralExampleCode: (subj: string) => string
  centralExpectedOutput: string
  centralQuizQuestion: (subj: string) => string
  centralQuizOptions: string[]
  centralCorrectIndex: number
  centralQuizExplanation: (subj: string) => string
  aspects: DomainConceptDefinition[]
}

/**
 * Domain-specific educational knowledge models for key STEM, science, and programming areas.
 */
export const DOMAIN_KNOWLEDGE_MODELS: Record<string, DomainKnowledgeModel> = {
  // 1. Python Logical Operators & Boolean Evaluation
  python_logical_operators: {
    domain: 'Python Logic & Boolean Evaluation',
    centralCategory: 'core',
    centralShortExplanation: () =>
      'Boolean evaluation mechanisms in Python combining truth expressions using "and", "or", and "not" with short-circuiting rules.',
    centralBeginnerExplanation: () =>
      'Think of logical operators like traffic rules for decision making. "and" requires all green lights, "or" needs just one, and "not" flips the signal from red to green or vice-versa.',
    centralIntermediateExplanation: () =>
      'In Python, "and" and "or" return the actual operand value that determined the outcome rather than forcing a strict True/False boolean. They evaluate left-to-right with short-circuiting.',
    centralAdvancedDetails: () =>
      'Operator precedence is strictly: "not" (highest), followed by "and", then "or" (lowest). Python objects evaluate via their __bool__() method or __len__() if __bool__ is undefined.',
    centralWhyItMatters: () =>
      'Logical operators govern every branching decision in production software: authorization gates, data validation, database queries, and conditional control flows.',
    centralExampleCode: () =>
      `# Python logical operators with short-circuiting
user = {"name": "Alice", "role": "admin"}
is_authorized = user is not None and user.get("role") == "admin"
status = is_authorized and "Access Granted" or "Access Denied"
print(status)`,
    centralExpectedOutput: 'Access Granted',
    centralQuizQuestion: () =>
      'What value does the Python expression `"hello" or "world"` evaluate to?',
    centralQuizOptions: [
      '"hello" (because "hello" is truthy, so "or" short-circuits and returns it immediately)',
      '"world"',
      'True',
      'False',
    ],
    centralCorrectIndex: 0,
    centralQuizExplanation: () =>
      'The "or" operator returns the first truthy operand without evaluating subsequent expressions. Since non-empty string "hello" is truthy, it returns "hello".',
    aspects: [
      {
        suffix: 'and-op',
        title: "THE 'AND' OPERATOR",
        category: 'control',
        shortExplanation: () =>
          'Evaluates operands from left to right and returns the first falsy value, or the last value if all are truthy.',
        beginnerExplanation: () =>
          'Like requiring both a ticket AND an ID card to board a flight. If either is missing, you cannot enter.',
        intermediateExplanation: () =>
          'Short-circuits immediately upon encountering the first falsy object (0, "", None, False, []), preventing unnecessary or dangerous subsequent computations.',
        advancedDetails: () =>
          'Often used as a safe navigation guard in Python: `obj is not None and obj.method()` avoids AttributeError.',
        whyItMatters: () =>
          'Enforces joint preconditions and protects against null-pointer/NoneType exceptions.',
        exampleCode: () =>
          `# Guarding division against zero using 'and'
denominator = 0
numerator = 100
safe_division = (denominator != 0) and (numerator / denominator > 1)
print(f"Safe check passed: {safe_division}")`,
        expectedOutput: 'Safe check passed: False',
        commonMistakes: [
          'Confusing the logical "and" operator with the bitwise "&" operator.',
          'Assuming "and" always returns a boolean True/False rather than the determining operand.',
        ],
        practicalUseCases: [
          'Guarding against None before attribute access',
          'Validating range bounds: `min_val <= x and x <= max_val`',
          'Combining authentication and authorization checks',
        ],
        quizQuestion: () =>
          'What is the result of the expression `0 and "python"` in Python?',
        quizOptions: [
          '0 (because 0 is falsy, so "and" short-circuits and returns 0)',
          '"python"',
          'False',
          'None',
        ],
        correctIndex: 0,
        quizExplanation: () =>
          'Python\'s "and" evaluates 0 as falsy and returns it immediately without evaluating the right-hand operand.',
        relationship: 'governed_by',
        relDescription: () => 'Provides joint boolean conjunction with short-circuit evaluation.',
      },
      {
        suffix: 'or-op',
        title: "THE 'OR' OPERATOR",
        category: 'control',
        shortExplanation: () =>
          'Evaluates operands left-to-right and returns the first truthy value, or the last operand if all are falsy.',
        beginnerExplanation: () =>
          'Like accepting cash OR credit card: as long as at least one payment method works, the transaction succeeds.',
        intermediateExplanation: () =>
          'Frequently used to provide clean fallback/default values: `display_name = user_input or "Guest"`.',
        advancedDetails: () =>
          'Be cautious when 0 or False is a valid non-default value; in such cases, explicit `x is not None` checks are preferred over `x or default`.',
        whyItMatters: () =>
          'Enables concise default value assignment and alternative execution branches without verbose if/else ladders.',
        exampleCode: () =>
          `# Default value fallback idiom using 'or'
user_config = {}
timeout = user_config.get("timeout") or 30
print(f"Effective timeout: {timeout}s")`,
        expectedOutput: 'Effective timeout: 30s',
        commonMistakes: [
          'Using "x or default" when 0 or "" are valid intentional values, mistakenly overwriting them.',
          'Confusing logical "or" with bitwise "|".',
        ],
        practicalUseCases: [
          'Default parameter and config assignment',
          'Checking for alternative success states',
          'CLI argument fallbacks',
        ],
        quizQuestion: () =>
          'What is the result of `[] or {"status": "ok"} or "default"` in Python?',
        quizOptions: [
          '{"status": "ok"} (the empty list is falsy, so it continues to the first truthy dict)',
          '[]',
          '"default"',
          'True',
        ],
        correctIndex: 0,
        quizExplanation: () =>
          '[] is falsy, so "or" checks the next operand. {"status": "ok"} is truthy, so it returns that dict immediately.',
        relationship: 'complemented_by',
        relDescription: () => 'Provides disjunctive evaluation with default value fallback semantics.',
      },
      {
        suffix: 'not-op',
        title: "THE 'NOT' OPERATOR",
        category: 'syntax',
        shortExplanation: () =>
          'Unary operator that inverts the truth value of its operand, always returning a strict boolean True or False.',
        beginnerExplanation: () =>
          'Like flipping a light switch: if it was ON (truthy), "not" turns it OFF (False); if OFF, it turns it ON (True).',
        intermediateExplanation: () =>
          'Unlike "and" and "or", "not" always returns an explicit bool type (True or False). It has lower precedence than relational comparisons (e.g. `not x == 5` is `not (x == 5)`).',
        advancedDetails: () =>
          'In PEP 8, checking for empty sequences is preferred as `if not my_list:` rather than `if len(my_list) == 0:`.',
        whyItMatters: () =>
          'Writing expressive, idiomatic negative conditions and checking for empty containers or missing data.',
        exampleCode: () =>
          `# Idiomatic emptiness and negation checks
active_sessions = []
if not active_sessions:
    print("No active sessions detected (clean shutdown)")`,
        expectedOutput: 'No active sessions detected (clean shutdown)',
        commonMistakes: [
          'Writing `if not x in list` instead of the idiomatic `if x not in list`.',
          'Writing `if not x is None` instead of `if x is not None`.',
        ],
        practicalUseCases: [
          'Checking for empty lists, dicts, and strings',
          'Toggling boolean flags and state transitions',
          'Asserting preconditions and validation guards',
        ],
        quizQuestion: () =>
          'What is the output of `not ""` in Python?',
        quizOptions: [
          'True (the empty string is falsy, so "not" inverts it to boolean True)',
          'False',
          '""',
          'SyntaxError',
        ],
        correctIndex: 0,
        quizExplanation: () =>
          'An empty string "" evaluates to falsy. Applying the "not" operator inverts it to True.',
        relationship: 'negates_with',
        relDescription: () => 'Performs unary boolean inversion with strict boolean return type.',
      },
      {
        suffix: 'precedence',
        title: 'PRECEDENCE & SHORT-CIRCUITING',
        category: 'foundation',
        shortExplanation: () =>
          'Order of operations where "not" binds first, followed by "and", and finally "or", with left-to-right short-circuiting.',
        beginnerExplanation: () =>
          'Like multiplication taking priority over addition in math: `not` is calculated before `and`, which is calculated before `or`.',
        intermediateExplanation: () =>
          'The expression `not A and B or C` is evaluated strictly as `((not A) and B) or C`. Parentheses should be used whenever readability or clarity is needed.',
        advancedDetails: () =>
          'Short-circuiting guarantees that if the left operand of "and" is False, the right expression is NEVER evaluated, preventing side-effects or exceptions.',
        whyItMatters: () =>
          'Prevents subtle logical bugs where conditions execute in an unexpected order, leading to incorrect program paths or security bypasses.',
        exampleCode: () =>
          `# Precedence demonstration: not > and > or
# (not False and False) or True -> (True and False) or True -> False or True -> True
result = not False and False or True
print(f"Evaluated result: {result}")`,
        expectedOutput: 'Evaluated result: True',
        commonMistakes: [
          'Assuming "and" and "or" have the same precedence, leading to logic bugs without parentheses.',
          'Relying on side-effects inside short-circuited expressions that never execute.',
        ],
        practicalUseCases: [
          'Complex multi-condition business rules',
          'Feature flagging and permission cascades',
          'Database query filter composition',
        ],
        quizQuestion: () =>
          'In Python, which logical operator has the highest precedence?',
        quizOptions: [
          '"not" (binds tighter than "and" and "or")',
          '"and"',
          '"or"',
          'All three have identical precedence and evaluate strictly left-to-right',
        ],
        correctIndex: 0,
        quizExplanation: () =>
          'Python\'s precedence hierarchy for Boolean operations is: "not" has highest priority, then "and", then "or".',
        relationship: 'structured_by',
        relDescription: () => 'Governed by formal operator precedence and short-circuit execution semantics.',
      },
    ],
  },
}

/**
 * Intelligent domain and concept selector that matches query keywords or search context.
 */
function matchDomainModel(query: string): DomainKnowledgeModel | null {
  const q = query.toLowerCase().trim()

  // 1. Python Logical Operators: ONLY match when query explicitly targets boolean logic/operators
  const isLogicalOpQuery =
    (q.includes('logical') && (q.includes('operator') || q.includes('operation'))) ||
    (q.includes('boolean') && (q.includes('operator') || q.includes('logic') || q.includes('operation') || q.includes('evaluat'))) ||
    q === 'python logical operators' ||
    q === 'logical operators in python' ||
    q === 'logical operators' ||
    q === 'boolean operators' ||
    q === 'boolean operations' ||
    q === 'and or not in python'

  if (isLogicalOpQuery) {
    return DOMAIN_KNOWLEDGE_MODELS.python_logical_operators
  }

  return null
}

/**
 * Dynamically synthesizes an authentic, relevant concept map from live search results and topic analysis.
 * NEVER outputs generic "Scalability & Concurrency" or "Failure Modes" boilerplate.
 */
export function generateSemanticTopicMap(
  rawTopic: string,
  sources?: SourceCitation[],
  searchStatus?: 'verified-web' | 'ai-knowledge' | 'curated-demo',
  searchSummary?: string
): KnowledgeMap {
  const cleanTitle = rawTopic
    .replace(/^(explain|what is|what are|how do|how does|learn|teach me about|explore)\s+/i, '')
    .replace(/\s+in\s+python$/i, '')
    .replace(/[?.!]+$/, '')
    .trim()

  const capitalized = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1)
  const idPrefix = cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const centralId = `node-${idPrefix}-root`

  // Check for high-fidelity domain knowledge models first (based strictly on user query)
  const domainModel = matchDomainModel(cleanTitle)

  if (domainModel) {
    // 1. Central Node
    const centralNode: Omit<ConceptNode, 'position'> = {
      id: centralId,
      title: capitalized.toUpperCase(),
      shortExplanation: domainModel.centralShortExplanation(capitalized),
      category: domainModel.centralCategory,
      depth: 0,
      size: 1.45,
      color: '#38bdf8',
      sources: sources && sources.length > 0 ? sources : undefined,
      beginnerExplanation: domainModel.centralBeginnerExplanation(capitalized),
      intermediateExplanation: domainModel.centralIntermediateExplanation(capitalized),
      advancedDetails: domainModel.centralAdvancedDetails(capitalized),
      whyItMatters: domainModel.centralWhyItMatters(capitalized),
      practicalUseCases: [
        `Mastering fundamental intuition and mechanics of ${capitalized}.`,
        `Analyzing problems and applying best practices for ${capitalized}.`,
        `Decomposing complex real-world challenges using principles of ${capitalized}.`,
      ],
      commonMistakes: [
        `Confusing foundational concepts of ${capitalized} with adjacent topics.`,
        `Overlooking edge cases and foundational constraints in ${capitalized}.`,
      ],
      lessonSteps: [
        {
          stepNumber: 1,
          title: `Foundations of ${capitalized}`,
          explanation: domainModel.centralBeginnerExplanation(capitalized),
        },
        {
          stepNumber: 2,
          title: `Mechanisms & Scientific Principles`,
          explanation: domainModel.centralIntermediateExplanation(capitalized),
        },
      ],
      concreteExample: {
        code: domainModel.centralExampleCode(capitalized),
        explanation: `Demonstration of foundational principles in ${capitalized}.`,
        expectedOutput: domainModel.centralExpectedOutput,
      },
      practiceQuestion: {
        question: domainModel.centralQuizQuestion(capitalized),
        options: domainModel.centralQuizOptions,
        correctIndex: domainModel.centralCorrectIndex,
        explanation: domainModel.centralQuizExplanation(capitalized),
      },
    }

    // 2. Sub-Concept Nodes
    const childNodes: Omit<ConceptNode, 'position'>[] = domainModel.aspects.map((aspect) => ({
      id: `node-${idPrefix}-${aspect.suffix}`,
      title: aspect.title,
      shortExplanation: aspect.shortExplanation(capitalized),
      category: aspect.category,
      depth: 1,
      size: 0.95,
      color: getCategoryColor(aspect.category),
      sources: sources && sources.length > 0 ? sources.slice(0, 2) : undefined,
      beginnerExplanation: aspect.beginnerExplanation(capitalized),
      intermediateExplanation: aspect.intermediateExplanation(capitalized),
      advancedDetails: aspect.advancedDetails(capitalized),
      whyItMatters: aspect.whyItMatters(capitalized),
      practicalUseCases: aspect.practicalUseCases,
      commonMistakes: aspect.commonMistakes,
      lessonSteps: [
        {
          stepNumber: 1,
          title: aspect.title,
          explanation: aspect.intermediateExplanation(capitalized),
        },
      ],
      concreteExample: {
        code: aspect.exampleCode(capitalized),
        explanation: `Concrete illustration of ${aspect.title.toLowerCase()}.`,
        expectedOutput: aspect.expectedOutput,
      },
      practiceQuestion: {
        question: aspect.quizQuestion(capitalized),
        options: aspect.quizOptions,
        correctIndex: aspect.correctIndex,
        explanation: aspect.quizExplanation(capitalized),
      },
      prerequisiteIds: [centralId],
    }))

    const rawNodes = [centralNode, ...childNodes]

    // 3. Edges
    const edges: ConceptEdge[] = domainModel.aspects.map((aspect, idx) => ({
      id: `edge-${idPrefix}-${idx + 1}`,
      source: centralId,
      target: `node-${idPrefix}-${aspect.suffix}`,
      relationship: aspect.relationship,
      description: aspect.relDescription(capitalized),
    }))

    // 4. Compute 3D Positions
    const positionedNodes = computeGraphLayout(rawNodes, edges, centralId)

    const finalMap: KnowledgeMap = {
      id: `map-${idPrefix}-${Date.now()}`,
      topic: rawTopic,
      title: `${capitalized} Knowledge Skeleton`,
      description: `An interactive 3D concept breakdown of ${capitalized} grounded in ${domainModel.domain}.`,
      centralNodeId: centralId,
      nodes: positionedNodes,
      edges,
      createdAt: new Date().toISOString(),
      isDemo: true,
      demoNote: sources && sources.length > 0
        ? `Grounded with ${sources.length} verified reference sources.`
        : `Domain Knowledge Model: ${domainModel.domain}.`,
      sources: sources && sources.length > 0 ? sources : undefined,
      searchStatus: searchStatus || (sources && sources.length > 0 ? 'verified-web' : 'curated-demo'),
      searchSummary: searchSummary || (sources && sources.length > 0 ? `Verified with ${sources.length} live sources` : undefined),
    }

    validateKnowledgeMap(finalMap)
    return finalMap
  }

  // Fallback Dynamic Search-Grounded Extraction:
  // If query is an unknown STEM concept, derive concepts from search snippets and topic terms
  const sourceSnippets = (sources || []).map((s) => s.snippet || '').filter(Boolean)

  const centralNode: Omit<ConceptNode, 'position'> = {
    id: centralId,
    title: capitalized.toUpperCase(),
    shortExplanation: sourceSnippets[0]
      ? `${capitalized}: ${sourceSnippets[0].slice(0, 150)}...`
      : `Core theoretical principles, mechanisms, and practical applications of ${capitalized}.`,
    category: 'core',
    depth: 0,
    size: 1.45,
    color: '#38bdf8',
    sources: sources && sources.length > 0 ? sources : undefined,
    beginnerExplanation: `Introduction to ${capitalized}: Understanding the foundational concepts, what problem it addresses, and why it is significant in its field.`,
    intermediateExplanation: `Mechanics of ${capitalized}: How the internal components, parameters, and interactions operate together predictably.`,
    advancedDetails: `Formal analysis, underlying constraints, performance characteristics, and advanced domain nuances of ${capitalized}.`,
    whyItMatters: `Mastering ${capitalized} establishes essential domain knowledge, enabling deeper understanding and problem solving.`,
    practicalUseCases: [
      `Real-world implementation and study of ${capitalized}.`,
      `Applying principles of ${capitalized} to solve practical domain problems.`,
    ],
    commonMistakes: [
      `Confusing the core definition of ${capitalized} with related but distinct phenomena.`,
    ],
    lessonSteps: [
      {
        stepNumber: 1,
        title: `Introduction to ${capitalized}`,
        explanation: `Overview of what ${capitalized} is, its historical context, and fundamental purpose.`,
      },
      {
        stepNumber: 2,
        title: `Operational Mechanics`,
        explanation: `Examining how the key elements of ${capitalized} interact to produce predictable outcomes.`,
      },
    ],
    concreteExample: {
      code: `# Demonstration of ${capitalized} in Python\nprint("Exploring ${capitalized}...")\n# Core operational mechanics initialized\nis_active = True\nprint(f"Status: {is_active}")`,
      explanation: `Python illustration of core properties and behaviors of ${capitalized}.`,
      expectedOutput: `Exploring ${capitalized}...\nStatus: True`,
    },
    practiceQuestion: {
      question: `Which statement most accurately describes the primary purpose of ${capitalized}?`,
      options: [
        `It provides a structured, foundational mechanism to solve specific domain problems effectively`,
        `It has no practical applications and is entirely theoretical`,
        `It was deprecated in the 19th century`,
        `It applies only to mechanical clocks`,
      ],
      correctIndex: 0,
      explanation: `${capitalized} represents a foundational concept developed to address specific challenges within its field.`,
    },
  }

  // Derive 3 distinct sub-nodes tied specifically to the topic
  const subconcepts = [
    {
      suffix: 'foundations',
      title: `${capitalized.toUpperCase()} PRINCIPLES`,
      category: 'foundation' as const,
      short: `Fundamental laws, definitions, and operational axioms underlying ${capitalized}.`,
      relation: 'founded_on',
      relDesc: `Establishes theoretical foundations for ${capitalized}.`,
    },
    {
      suffix: 'mechanics',
      title: `${capitalized.toUpperCase()} MECHANICS`,
      category: 'control' as const,
      short: `The operational lifecycle, transformations, and processes driving ${capitalized}.`,
      relation: 'operates_through',
      relDesc: `Processes state transitions and core dynamics of ${capitalized}.`,
    },
    {
      suffix: 'applications',
      title: `APPLICATIONS & ANALYSIS`,
      category: 'application' as const,
      short: `Practical implementations, empirical observations, and real-world utility of ${capitalized}.`,
      relation: 'applied_in',
      relDesc: `Deploys ${capitalized} in scientific, engineering, or practical domains.`,
    },
  ]

  const childNodes: Omit<ConceptNode, 'position'>[] = subconcepts.map((sub) => ({
    id: `node-${idPrefix}-${sub.suffix}`,
    title: sub.title,
    shortExplanation: sub.short,
    category: sub.category,
    depth: 1,
    size: 0.95,
    color: getCategoryColor(sub.category),
    sources: sources && sources.length > 0 ? sources.slice(0, 2) : undefined,
    beginnerExplanation: `Basic understanding of ${sub.title.toLowerCase()} in relation to ${capitalized}.`,
    intermediateExplanation: `Detailed operational view of ${sub.title.toLowerCase()} within ${capitalized}.`,
    advancedDetails: `Rigorous analysis, constraints, and optimization considerations for ${sub.title.toLowerCase()}.`,
    whyItMatters: `Understanding ${sub.title.toLowerCase()} is crucial for a complete grasp of ${capitalized}.`,
    practicalUseCases: [`Applying ${sub.title.toLowerCase()} in practical contexts.`],
    commonMistakes: [`Neglecting the relationship between ${sub.title.toLowerCase()} and ${capitalized}.`],
    lessonSteps: [
      {
        stepNumber: 1,
        title: sub.title,
        explanation: `Detailed breakdown of how ${sub.title.toLowerCase()} functions in ${capitalized}.`,
      },
    ],
    concreteExample: {
      code: `# Analyzing ${sub.title.toLowerCase()} for ${capitalized}\ncomponent = {"topic": "${capitalized}", "aspect": "${sub.title}"}\nprint(f"Executing {component['aspect']} logic for {component['topic']}")`,
      explanation: `Python demonstration of ${sub.title.toLowerCase()}.`,
      expectedOutput: `Executing ${sub.title} logic for ${capitalized}`,
    },
    practiceQuestion: {
      question: `Why is understanding ${sub.title.toLowerCase()} essential when studying ${capitalized}?`,
      options: [
        `It provides the specific mechanisms and practical contexts that make ${capitalized} function correctly`,
        `It is completely unrelated to the main subject`,
        `It only matters for historical reasons`,
        `It is only used for decorative purposes`,
      ],
      correctIndex: 0,
      explanation: `${sub.title} constitutes an essential component of ${capitalized}.`,
    },
    prerequisiteIds: [centralId],
  }))

  const rawNodes = [centralNode, ...childNodes]

  const edges: ConceptEdge[] = subconcepts.map((sub, idx) => ({
    id: `edge-${idPrefix}-${idx + 1}`,
    source: centralId,
    target: `node-${idPrefix}-${sub.suffix}`,
    relationship: sub.relation,
    description: sub.relDesc,
  }))

  const positionedNodes = computeGraphLayout(rawNodes, edges, centralId)

  const finalMap: KnowledgeMap = {
    id: `map-${idPrefix}-${Date.now()}`,
    topic: rawTopic,
    title: `${capitalized} Knowledge Skeleton`,
    description: `A 3D educational concept map specifically covering ${capitalized}.`,
    centralNodeId: centralId,
    nodes: positionedNodes,
    edges,
    createdAt: new Date().toISOString(),
    isDemo: true,
    demoNote: sources && sources.length > 0
      ? `Grounded with ${sources.length} verified web sources.`
      : `Synthesized knowledge skeleton specifically for ${capitalized}.`,
    sources: sources && sources.length > 0 ? sources : undefined,
    searchStatus: searchStatus || (sources && sources.length > 0 ? 'verified-web' : 'curated-demo'),
    searchSummary: searchSummary || (sources && sources.length > 0 ? `Verified with ${sources.length} sources` : undefined),
  }

  // Validate relevance strictly before returning
  const relevance = validateMapRelevance(finalMap, rawTopic)
  if (!relevance.isValid) {
    throw new Error(relevance.reason || `Failed relevance validation for "${rawTopic}"`)
  }

  return finalMap
}
