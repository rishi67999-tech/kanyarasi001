import { PREDEFINED_TOPICS } from '../data/predefinedMaps'
import { PYTHON_CURRICULUM_CATEGORIES } from '../data/pythonCurriculum'

export type SearchIntentType = 'supported' | 'unsupported' | 'unclear'

export interface SearchIntentResult {
  type: SearchIntentType
  cleanQuery: string
  matchedSubject?: string
  message?: string
  suggestedTopics?: string[]
}

/**
 * Common conversational prefixes to strip when analyzing intent.
 */
const CONVERSATIONAL_PREFIXES = /^(explain|what is|what are|how do|how does|learn|teach me about|explore|tell me about|can you explain|show me|describe|definition of|concept of|guide to|introduction to)\s+/i

/**
 * Stop words that should not be used as standalone matches for curriculum subjects.
 */
const CURRICULUM_STOP_WORDS = new Set([
  'how',
  'to',
  'and',
  'or',
  'in',
  'of',
  'for',
  'a',
  'an',
  'the',
  'is',
  'are',
  'what',
  'can',
  'with',
  'by',
  'at',
  'from',
  'it',
  'its',
  'using',
  'on',
  'do',
  'does',
  'explain',
  'tell',
  'me',
  'show',
  'make',
  'all',
  'any',
  'get',
  'set',
  'run',
  'new',
  'use',
  'work',
  'works',
])

/**
 * Vague, greeting, or meaningless non-technical words that trigger clarification.
 */
const UNCLEAR_PATTERNS = new Set([
  'hi',
  'hello',
  'hey',
  'help',
  'test',
  'what',
  'why',
  'how',
  'explain',
  'tell me',
  'something',
  'anything',
  'code',
  'coding',
  'computer',
  'programming',
  'asdf',
  'qwerty',
  'abc',
  'xyz',
  'yes',
  'no',
  'ok',
  'okay',
])

/**
 * Curated list of explicitly supported computer science and Python concepts
 * present in the application's existing curriculum and predefined maps.
 */
const EXPLICIT_CURRICULUM_KEYWORDS = new Set([
  // Python Core Language & Fundamentals
  'python',
  'syntax',
  'indentation',
  'variable',
  'variables',
  'constant',
  'constants',
  'pep 8',
  'comment',
  'comments',
  'docstring',
  'docstrings',
  'input',
  'print',
  'type conversion',
  'type casting',
  'casting',
  'debugging',
  'traceback',
  'interpreter',
  'repl',

  // Data Types
  'integer',
  'integers',
  'float',
  'floats',
  'boolean',
  'booleans',
  'string',
  'strings',
  'complex number',
  'complex numbers',
  'none',
  'nonetype',
  'isinstance',

  // Operators
  'operator',
  'operators',
  'arithmetic',
  'comparison',
  'logical',
  'logical operator',
  'logical operators',
  'and',
  'not',
  'short circuit',
  'short-circuit',
  'bitwise',
  'assignment',
  'identity',
  'membership',
  'precedence',

  // Control Flow & Loops
  'conditional',
  'conditionals',
  'if',
  'elif',
  'else',
  'nested',
  'truthy',
  'falsy',
  'ternary',
  'match case',
  'loop',
  'loops',
  'for loop',
  'for loops',
  'while loop',
  'while loops',
  'range',
  'break',
  'continue',
  'pass',
  'iteration',
  'iterator',
  'iterators',

  // Collections & Data Structures
  'list',
  'lists',
  'tuple',
  'tuples',
  'set',
  'sets',
  'dict',
  'dicts',
  'dictionary',
  'dictionaries',
  'hash map',
  'hash maps',
  'indexing',
  'slicing',
  'slice',
  'mutable',
  'immutable',
  'comprehension',
  'comprehensions',

  // Functions
  'function',
  'functions',
  'def',
  'parameter',
  'parameters',
  'argument',
  'arguments',
  'args',
  'kwargs',
  'return',
  'scope',
  'legb',
  'recursion',
  'recursive',
  'lambda',
  'built-in',

  // Modules & Files
  'module',
  'modules',
  'package',
  'packages',
  'import',
  'pip',
  'venv',
  'virtual environment',
  'file',
  'files',
  'file handling',
  'open',
  'read',
  'write',
  'context manager',
  'json',

  // Errors
  'error',
  'errors',
  'exception',
  'exceptions',
  'try',
  'except',
  'finally',
  'raise',

  // OOP
  'class',
  'classes',
  'object',
  'objects',
  'oop',
  'init',
  'self',
  'inheritance',
  'polymorphism',
  'encapsulation',
  'dunder',
  'magic method',
  'magic methods',

  // Advanced & Algorithms
  'generator',
  'generators',
  'yield',
  'decorator',
  'decorators',
  'type hint',
  'type hints',
  'big o',
  'complexity',
  'binary search',
  'linear search',
  'sorting',
  'stack',
  'queue',

  // Web & DB from existing predefined maps
  'flexbox',
  'html flexbox',
  'css flexbox',
  'box model',
  'css box model',
  'html box model',
  'http',
  'http request',
  'http requests',
  'status code',
  'status codes',
  'rest api',
  'database index',
  'database indexes',
  'db index',
  'db indexes',
  'binary left shift',
  'left shift',
])

/**
 * Build canonical multi-word exact phrases from existing predefined maps and curriculum.
 */
function buildSupportedExactPhrases(): Set<string> {
  const phrases = new Set<string>()

  // 1. All Predefined Map keys and topics
  for (const [key, map] of Object.entries(PREDEFINED_TOPICS)) {
    phrases.add(key.toLowerCase().trim())
    phrases.add(map.topic.toLowerCase().trim())
    phrases.add(map.title.toLowerCase().trim())
  }

  // 2. All 14 Python Curriculum Categories and their individual topics
  for (const cat of PYTHON_CURRICULUM_CATEGORIES) {
    phrases.add(cat.title.toLowerCase().trim())
    for (const t of cat.topics) {
      phrases.add(t.title.toLowerCase().trim())
      phrases.add(t.query.toLowerCase().trim())
    }
  }

  return phrases
}

const SUPPORTED_EXACT_PHRASES = buildSupportedExactPhrases()

/**
 * Standard suggested curriculum topics to show when prompting the user.
 */
export const RECOMMENDED_CURRICULUM_TOPICS = [
  'Explain loops in Python',
  'Explain logical operators in Python',
  'Explain Python functions',
  'What are Python lists?',
  'Explain recursion',
  'Explain classes and objects',
  'Explain binary search',
  'Explain HTML flexbox',
  'Explain database indexes',
]

/**
 * Inspects a natural language query and determines whether:
 * 1. The input is unclear / vague / gibberish -> asks for clarification.
 * 2. The input is an unsupported topic outside the platform's study content -> asks user to choose from curriculum.
 * 3. The input belongs to the platform's supported curriculum -> allowed to proceed.
 */
export function detectSearchIntent(query: string): SearchIntentResult {
  const trimmed = query.trim()
  const normalized = trimmed.toLowerCase()

  // 1. Check for Unclear Inputs (empty, too short, symbols only, or generic non-technical words)
  const strippedPunctuation = normalized.replace(/[^a-z0-9\s]/g, '').trim()

  if (!trimmed || strippedPunctuation.length < 3) {
    return {
      type: 'unclear',
      cleanQuery: trimmed,
      message:
        "Could you please clarify your question? Please enter a specific Python or Computer Science topic from the platform's curriculum (for example: 'loops in Python', 'recursion', or 'database indexes').",
      suggestedTopics: RECOMMENDED_CURRICULUM_TOPICS.slice(0, 4),
    }
  }

  // Strip conversational prefixes (e.g. "Explain", "What is", "How do")
  const strippedConversational = strippedPunctuation
    .replace(CONVERSATIONAL_PREFIXES, '')
    .trim()

  if (
    UNCLEAR_PATTERNS.has(strippedPunctuation) ||
    UNCLEAR_PATTERNS.has(strippedConversational) ||
    strippedConversational.length < 3
  ) {
    return {
      type: 'unclear',
      cleanQuery: trimmed,
      message:
        "Could you please clarify your question? Please enter a specific topic you'd like to explore in 3D (for example: 'loops in Python', 'logical operators in Python', or 'HTML flexbox').",
      suggestedTopics: RECOMMENDED_CURRICULUM_TOPICS.slice(0, 4),
    }
  }

  // 2. Check for Exact Matches in Supported Curriculum Titles/Queries
  if (
    SUPPORTED_EXACT_PHRASES.has(normalized) ||
    SUPPORTED_EXACT_PHRASES.has(strippedConversational)
  ) {
    return {
      type: 'supported',
      cleanQuery: trimmed,
      matchedSubject: strippedConversational || normalized,
    }
  }

  // 3. Extract Meaningful Content Words (excluding stop words)
  const contentWords = strippedConversational
    .split(/\s+/)
    .filter((w) => !CURRICULUM_STOP_WORDS.has(w) && w.length > 2)

  if (contentWords.length === 0) {
    return {
      type: 'unclear',
      cleanQuery: trimmed,
      message:
        "Could you please clarify your question? Please enter a specific topic from our Python or Computer Science curriculum.",
      suggestedTopics: RECOMMENDED_CURRICULUM_TOPICS.slice(0, 4),
    }
  }

  // 4. Check if ANY content word belongs to the supported curriculum keywords
  const matchedCurriculumWords = contentWords.filter((w) =>
    EXPLICIT_CURRICULUM_KEYWORDS.has(w)
  )

  // Also check two-word bigrams (e.g. "box model", "logical operators", "binary search", "data types")
  const bigrams: string[] = []
  for (let i = 0; i < contentWords.length - 1; i++) {
    bigrams.push(`${contentWords[i]} ${contentWords[i + 1]}`)
  }
  const matchedBigrams = bigrams.filter((bg) =>
    EXPLICIT_CURRICULUM_KEYWORDS.has(bg) || SUPPORTED_EXACT_PHRASES.has(bg)
  )

  if (matchedCurriculumWords.length > 0 || matchedBigrams.length > 0) {
    return {
      type: 'supported',
      cleanQuery: trimmed,
      matchedSubject: matchedBigrams[0] || matchedCurriculumWords[0] || strippedConversational,
    }
  }

  // 5. Outside Supported Study Content (Clear topic, but unsupported domain)
  const candidateTopic = strippedConversational || trimmed
  const capitalizedTopic =
    candidateTopic.charAt(0).toUpperCase() + candidateTopic.slice(1)

  return {
    type: 'unsupported',
    cleanQuery: trimmed,
    matchedSubject: candidateTopic,
    message: `"${capitalizedTopic}" is outside our supported study content. Please choose a topic from the platform's existing curriculum (such as Python Fundamentals, Control Flow, Data Structures, OOP, Web Architecture, or Algorithms), or explore the Curriculum Catalog.`,
    suggestedTopics: RECOMMENDED_CURRICULUM_TOPICS.slice(0, 4),
  }
}
