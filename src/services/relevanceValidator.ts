import type { KnowledgeMap, ConceptNode } from '../types/knowledge'

export interface RelevanceValidationResult {
  isValid: boolean
  reason?: string
  confidenceScore: number
  matchedTerms: string[]
}

/**
 * Known generic placeholder titles and snippets that indicate an unrelated template fallback.
 */
const BANNED_GENERIC_TITLES = [
  'SCALABILITY & CONCURRENCY',
  'FAILURE MODES & RECOVERY',
  'ARCHITECTURE & COMPONENTS',
  'PROTOCOL & SPECIFICATION',
]

const BANNED_BOILERPLATE_FRAGMENTS = [
  'worker_pool.scale_to',
  'circuit breaker pattern',
  'service initialized with fault tolerance',
  'exponential backoff with jitter',
  'opening more checkout lanes at the grocery store',
  'having a spare tire and a safety manual',
  'modular building blocks, configurations, and interfaces comprising',
]

const STOP_WORDS = new Set([
  'explain',
  'what',
  'is',
  'are',
  'the',
  'a',
  'an',
  'in',
  'of',
  'to',
  'for',
  'on',
  'with',
  'by',
  'at',
  'from',
  'about',
  'how',
  'does',
  'do',
  'learn',
  'please',
  'teach',
  'me',
  'using',
  'an',
  'and',
  'or',
  'simple',
  'terms',
  'beginner',
  'guide',
  'overview',
  'introduction',
])

/**
 * Extracts salient semantic keywords from a natural-language topic query.
 */
export function extractTopicKeywords(query: string): string[] {
  const normalized = query
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .trim()

  const words = normalized
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w))

  return Array.from(new Set(words))
}

/**
 * Validates that a generated or loaded knowledge map is specifically relevant
 * to the requested topic and does NOT contain generic placeholders or unrelated templates.
 */
export function validateMapRelevance(
  map: KnowledgeMap,
  requestedTopic: string
): RelevanceValidationResult {
  if (!map || !Array.isArray(map.nodes) || map.nodes.length === 0) {
    return {
      isValid: false,
      reason: 'Concept map contains no nodes.',
      confidenceScore: 0,
      matchedTerms: [],
    }
  }

  if (map.nodes.length < 3) {
    return {
      isValid: false,
      reason: `Concept map is too sparse (${map.nodes.length} nodes). A comprehensive knowledge skeleton requires at least 3 nodes.`,
      confidenceScore: 0.1,
      matchedTerms: [],
    }
  }

  if (!Array.isArray(map.edges) || map.edges.length < 2) {
    return {
      isValid: false,
      reason: `Concept map has insufficient relational edges (${map.edges?.length || 0} edges).`,
      confidenceScore: 0.1,
      matchedTerms: [],
    }
  }

  const topicKeywords = extractTopicKeywords(requestedTopic)
  const isDistributedSystemsQuery = topicKeywords.some((w) =>
    ['concurrency', 'scalability', 'distributed', 'resilience', 'failover', 'circuit', 'microservice'].includes(w)
  )

  // 1. Detect Generic Placeholder Nodes and Snippets
  const textCorpus = [
    map.title,
    map.description,
    ...map.nodes.map(
      (n) =>
        `${n.title} ${n.shortExplanation} ${n.beginnerExplanation || ''} ${
          n.intermediateExplanation || ''
        } ${n.concreteExample?.code || ''} ${n.practiceQuestion?.question || ''}`
    ),
  ]
    .join(' ')
    .toLowerCase()

  for (const node of map.nodes) {
    const upperTitle = node.title.toUpperCase().trim()

    // If topic is not distributed systems/resilience, reject generic template node titles
    if (!isDistributedSystemsQuery && BANNED_GENERIC_TITLES.includes(upperTitle)) {
      return {
        isValid: false,
        reason: `Rejected generic template placeholder: "${node.title}". Concept map must be tailored specifically to "${requestedTopic}".`,
        confidenceScore: 0,
        matchedTerms: [],
      }
    }
  }

  if (!isDistributedSystemsQuery) {
    for (const fragment of BANNED_BOILERPLATE_FRAGMENTS) {
      if (textCorpus.includes(fragment.toLowerCase())) {
        return {
          isValid: false,
          reason: `Rejected boilerplate template snippet: "${fragment}". Map must contain authentic material for "${requestedTopic}".`,
          confidenceScore: 0,
          matchedTerms: [],
        }
      }
    }
  }

  // 2. Reject Duplicate Titles or Identical Node Placeholders
  const titleSet = new Set<string>()
  const idSet = new Set<string>()

  for (const node of map.nodes) {
    const normTitle = node.title.trim().toLowerCase()
    if (titleSet.has(normTitle)) {
      return {
        isValid: false,
        reason: `Concept map contains duplicate node title: "${node.title}". Every node must represent a distinct concept.`,
        confidenceScore: 0.2,
        matchedTerms: [],
      }
    }
    titleSet.add(normTitle)

    if (idSet.has(node.id)) {
      return {
        isValid: false,
        reason: `Concept map contains duplicate node ID: "${node.id}".`,
        confidenceScore: 0.2,
        matchedTerms: [],
      }
    }
    idSet.add(node.id)

    if (!node.shortExplanation || node.shortExplanation.length < 15) {
      return {
        isValid: false,
        reason: `Node "${node.title}" has an empty or uninformative explanation.`,
        confidenceScore: 0.3,
        matchedTerms: [],
      }
    }
  }

  // 3. Verify Edge Source and Target Integrity
  for (const edge of map.edges) {
    if (!idSet.has(edge.source) || !idSet.has(edge.target)) {
      return {
        isValid: false,
        reason: `Edge "${edge.id}" references non-existent node IDs (${edge.source} -> ${edge.target}).`,
        confidenceScore: 0.2,
        matchedTerms: [],
      }
    }
    if (edge.source === edge.target) {
      return {
        isValid: false,
        reason: `Edge "${edge.id}" is an invalid self-loop (${edge.source}).`,
        confidenceScore: 0.2,
        matchedTerms: [],
      }
    }
  }

  // 4. Topic Semantic Relevance Matching
  // Check if core terms or web search grounding appears in the central node and sub-nodes
  const matchedTerms = topicKeywords.filter((term) => textCorpus.includes(term.toLowerCase()))

  // For multi-word queries (e.g. "logical operators in python"), at least one primary topic keyword must match
  if (topicKeywords.length > 0 && matchedTerms.length === 0) {
    return {
      isValid: false,
      reason: `Concept map does not meaningfully address "${requestedTopic}". None of the primary topic keywords (${topicKeywords.join(
        ', '
      )}) were found in the generated map.`,
      confidenceScore: 0,
      matchedTerms: [],
    }
  }

  // Check central node relevance
  const centralNode = map.nodes.find((n) => n.id === map.centralNodeId) || map.nodes[0]
  const centralText = `${centralNode.title} ${centralNode.shortExplanation} ${map.title}`.toLowerCase()

  const centralMatches = topicKeywords.filter((term) => centralText.includes(term))
  if (topicKeywords.length > 1 && centralMatches.length === 0) {
    // If none of the topic terms are in the central node or map title, check if it's a known alias
    const hasAnyRelevantSubnode = map.nodes.some((n: ConceptNode) =>
      topicKeywords.some((k) => n.title.toLowerCase().includes(k))
    )
    if (!hasAnyRelevantSubnode) {
      return {
        isValid: false,
        reason: `Central concept "${centralNode.title}" does not relate to the requested topic "${requestedTopic}".`,
        confidenceScore: 0.2,
        matchedTerms,
      }
    }
  }

  // 5. Cross-domain mismatch protection:
  // Detect if sub-nodes belong to boolean logic operators ("AND", "OR", "NOT")
  // when the query is NOT about boolean logic or operators.
  const hasLogicalSubnodes = map.nodes.some((n) =>
    n.title.toUpperCase().includes("'AND' OPERATOR") ||
    n.title.toUpperCase().includes("'OR' OPERATOR") ||
    n.title.toUpperCase().includes("'NOT' OPERATOR") ||
    n.title.toUpperCase().includes("BOOLEAN TRUTH")
  )
  if (hasLogicalSubnodes) {
    const isActuallyLogicalQuery = topicKeywords.some((w) =>
      ['logical', 'boolean', 'operator', 'operators', 'truthiness', 'truthy', 'logic', 'precedence'].includes(w)
    )
    if (!isActuallyLogicalQuery) {
      return {
        isValid: false,
        reason: `Generated map contains boolean logical operator sub-nodes ("AND", "OR", "NOT") which do not match the requested topic "${requestedTopic}".`,
        confidenceScore: 0,
        matchedTerms: [],
      }
    }
  }

  const confidenceScore = Math.min(1.0, 0.4 + (matchedTerms.length / Math.max(1, topicKeywords.length)) * 0.6)

  return {
    isValid: true,
    confidenceScore,
    matchedTerms,
  }
}
