import type { KnowledgeMap } from '../types/knowledge'
import { validateKnowledgeMap } from './schema'
import { validateMapRelevance } from './relevanceValidator'
import { detectSearchIntent } from './searchIntent'
import { findPredefinedMap } from '../data/predefinedMaps'
import { generateSemanticTopicMap } from './semanticGraphGenerator'
import { findCurriculumTopicByQuery } from '../data/pythonCurriculum'

export interface GenerationResult {
  map: KnowledgeMap
  source: 'predefined' | 'ai-live' | 'synthesized-demo'
  statusMessage?: string
}

/**
 * AI Lesson Generation Service Abstraction.
 * Connects to the secure server endpoint or synthesizes authentic STEM knowledge with strict relevance validation.
 */
export async function generateKnowledgeMap(topic: string): Promise<GenerationResult> {
  const trimmed = topic.trim()
  if (!trimmed) {
    throw new Error('Please enter a topic or question to explore.')
  }

  // 0. Search Intent Detection: Validate against existing curriculum
  const intent = detectSearchIntent(trimmed)
  if (intent.type === 'unclear') {
    throw new Error(intent.message)
  }
  if (intent.type === 'unsupported') {
    throw new Error(intent.message)
  }

  // 1. Check if user matched a predefined lesson directly
  const predefined = findPredefinedMap(trimmed)
  if (predefined) {
    const relevance = validateMapRelevance(predefined, trimmed)
    if (relevance.isValid) {
      return {
        map: predefined,
        source: 'predefined',
        statusMessage: `Loaded prepared curriculum: ${predefined.title}`,
      }
    }
  }

  // 1b. Check if user matched a Python Curriculum catalog topic
  const catalogMatch = findCurriculumTopicByQuery(trimmed)
  if (catalogMatch) {
    const catalogPredefined = findPredefinedMap(catalogMatch.query) || findPredefinedMap(catalogMatch.title)
    if (catalogPredefined) {
      const relevance = validateMapRelevance(catalogPredefined, trimmed)
      if (relevance.isValid) {
        return {
          map: catalogPredefined,
          source: 'predefined',
          statusMessage: `Curated Python Curriculum: ${catalogMatch.title}`,
        }
      }
    }
  }

  // 2. Call server-side AI & Web Search endpoint
  let serverError: string | null = null
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 20000)

    const response = await fetch('/api/generate-lesson', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic: trimmed }),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (response.ok) {
      const data = await response.json()
      const schemaVal = validateKnowledgeMap(data)
      if (!schemaVal.success) {
        throw new Error(`Generated map failed schema validation: ${JSON.stringify(schemaVal.error)}`)
      }

      const relevanceVal = validateMapRelevance(schemaVal.data as KnowledgeMap, trimmed)
      if (!relevanceVal.isValid) {
        throw new Error(relevanceVal.reason || `Generated map failed topic relevance check for "${trimmed}".`)
      }

      return {
        map: schemaVal.data as KnowledgeMap,
        source: data.isDemo ? 'synthesized-demo' : 'ai-live',
        statusMessage:
          data.demoNote || (data.isDemo ? 'Web-Grounded Reference Generation' : 'Live AI Generation Complete'),
      }
    } else {
      const errorJson = await response.json().catch(() => ({}))
      serverError = errorJson.error || `Server generation returned status ${response.status}`
    }
  } catch (err: any) {
    if (err.name === 'AbortError') {
      serverError = 'Generation request timed out after 20 seconds.'
    } else {
      serverError = err.message || 'Server connection error.'
    }
  }

  // 3. Client-side fallback if server was unreachable:
  // Generate authentic knowledge with local semantic model and strict relevance check
  try {
    const localMap = generateSemanticTopicMap(trimmed)
    const schemaVal = validateKnowledgeMap(localMap)
    const relevanceVal = validateMapRelevance(localMap, trimmed)

    if (schemaVal.success && relevanceVal.isValid) {
      return {
        map: localMap,
        source: 'synthesized-demo',
        statusMessage: `Grounded Reference Model: ${localMap.title}`,
      }
    }
  } catch {
    // If local synthesis fails, proceed to report the real error
  }

  // 4. Never silently substitute an unrelated map! Throw clear error for user.
  throw new Error(
    serverError ||
      `Could not generate a relevant knowledge skeleton for "${trimmed}". Please refine your question or configure an AI API key.`
  )
}
