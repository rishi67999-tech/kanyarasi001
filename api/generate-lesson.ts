type ApiRequest = {
  method?: string
  body?: any
}

type ApiResponse = {
  status: (statusCode: number) => {
    json: (payload: any) => void
  }
}

import { validateKnowledgeMap } from '../src/services/schema'
import { validateMapRelevance } from '../src/services/relevanceValidator'
import { detectSearchIntent } from '../src/services/searchIntent'
import { findPredefinedMap } from '../src/data/predefinedMaps'
import { findCurriculumTopicByQuery } from '../src/data/pythonCurriculum'
import { computeGraphLayout } from '../src/services/layoutEngine'
import { generateSemanticTopicMap } from '../src/services/semanticGraphGenerator'
import { searchWeb, type SearchWebResult } from './webSearchService'
import type { KnowledgeMap, SourceCitation } from '../src/types/knowledge'

/**
 * Serverless API Endpoint: /api/generate-lesson
 * Securely orchestrates Real LLM providers (Gemini, OpenAI, Groq) + Web Search (Tavily, Serper, Wikipedia, Docs).
 * Keeps all API keys strictly on the server and provides zero-config demo resilience.
 */
export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' })
  }

  const { topic, forceRefresh } = req.body || {}
  if (!topic || typeof topic !== 'string' || !topic.trim()) {
    return res.status(400).json({ error: 'Topic query is required.' })
  }

  const cleanTopic = topic.trim()

  // 1. Search Intent Detection: Validate against existing curriculum
  const intent = detectSearchIntent(cleanTopic)
  if (intent.type === 'unclear') {
    return res.status(400).json({
      error: intent.message,
      intent: 'unclear',
      suggestedTopics: intent.suggestedTopics,
    })
  }

  if (intent.type === 'unsupported') {
    return res.status(400).json({
      error: intent.message,
      intent: 'unsupported',
      suggestedTopics: intent.suggestedTopics,
    })
  }

  // 1. Perform Live Web Search to retrieve verified context & real sources
  let searchResult: SearchWebResult
  try {
    searchResult = await searchWeb(cleanTopic)
  } catch (err: any) {
    console.warn('Web search exception, proceeding with AI knowledge base:', err.message)
    searchResult = {
      sources: [],
      status: 'ai-knowledge',
      provider: 'Model Knowledge Base',
      summaryContext: `Topic: ${cleanTopic}. Web search was unavailable.`,
      searchNotice: 'Web search unavailable; answering using model knowledge base.',
    }
  }

  // 2. Check if predefined curated lesson matches and user did not request live force-refresh
  let predefined = findPredefinedMap(cleanTopic)
  if (!predefined) {
    const catalogTopic = findCurriculumTopicByQuery(cleanTopic)
    if (catalogTopic) {
      predefined = findPredefinedMap(catalogTopic.query) || findPredefinedMap(catalogTopic.title)
    }
  }

  if (predefined && !forceRefresh) {
    // Enrich curated map with verified sources if available
    const enrichedMap: KnowledgeMap = {
      ...predefined,
      sources: searchResult.sources.length > 0 ? searchResult.sources : predefined.sources,
      searchStatus: searchResult.sources.length > 0 ? 'verified-web' : (predefined.searchStatus || 'curated-demo'),
      searchSummary: searchResult.searchNotice || predefined.searchSummary,
    }
    return res.status(200).json(enrichedMap)
  }

  // 3. Inspect available Server-Side LLM API Keys
  const geminiKey = process.env.GEMINI_API_KEY
  const openAiKey = process.env.OPENAI_API_KEY
  const groqKey = process.env.GROQ_API_KEY

  const hasRealLlm = Boolean(
    (geminiKey && geminiKey !== 'YOUR_GEMINI_API_KEY_HERE') ||
    (openAiKey && openAiKey !== 'YOUR_OPENAI_API_KEY_HERE') ||
    (groqKey && groqKey !== 'YOUR_GROQ_API_KEY_HERE')
  )

  // 4. If no LLM key is configured, return rich Web-Grounded Domain Synthesizer
  if (!hasRealLlm) {
    try {
      const demoMap = generateSemanticTopicMap(
        cleanTopic,
        searchResult.sources,
        searchResult.status,
        searchResult.searchNotice
      )
      const relevance = validateMapRelevance(demoMap, cleanTopic)
      if (relevance.isValid) {
        return res.status(200).json(demoMap)
      } else {
        return res.status(422).json({
          error: `Relevance validation failed: ${relevance.reason || 'The generated map does not match the requested topic.'}`,
          retryable: true,
        })
      }
    } catch (err: any) {
      return res.status(422).json({
        error: err.message || `Unable to synthesize a relevant concept map for "${cleanTopic}". Please refine your query or configure an AI API key.`,
        retryable: true,
      })
    }
  }

  // 5. Build Grounded LLM Prompt with verified web context
  const systemPrompt = `
You are an expert computer science and STEM educator.
Generate an educational, 3D concept graph and curriculum for the topic: "${cleanTopic}".

VERIFIED WEB SEARCH GROUNDING:
${searchResult.summaryContext}

Return ONLY a valid, parseable JSON object matching this exact schema:
{
  "id": "map-${cleanTopic.toLowerCase().replace(/[^a-z0-9]+/g, '-')}",
  "topic": "${cleanTopic}",
  "title": "Concise Descriptive Title",
  "description": "2-3 sentence overview explaining what this concept is and why it matters.",
  "centralNodeId": "node-central",
  "sources": [
    { "title": "Source title", "url": "https://...", "snippet": "Brief citation excerpt", "sourceName": "Domain/Org" }
  ],
  "nodes": [
    {
      "id": "node-central",
      "title": "CORE CONCEPT NAME IN CAPS",
      "shortExplanation": "Concise, precise explanation (1-2 sentences)",
      "category": "core",
      "depth": 0,
      "beginnerExplanation": "Clear intuitive analogy or simple beginner explanation",
      "intermediateExplanation": "Mechanics, execution lifecycle, and practical details",
      "advancedDetails": "Memory layout, complexity limits, edge cases, or performance considerations",
      "whyItMatters": "Why professional developers care about this concept in production",
      "practicalUseCases": ["Use case 1", "Use case 2"],
      "commonMistakes": ["Mistake 1", "Mistake 2"],
      "lessonSteps": [
        { "stepNumber": 1, "title": "Foundation", "explanation": "Step 1 breakdown", "codeSnippet": "code snippet if applicable" },
        { "stepNumber": 2, "title": "Mechanics", "explanation": "Step 2 breakdown" }
      ],
      "concreteExample": {
        "code": "executable code example",
        "explanation": "how this example demonstrates the concept",
        "expectedOutput": "expected terminal or visual output"
      },
      "practiceQuestion": {
        "question": "Multiple choice question testing deep understanding",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctIndex": 0,
        "explanation": "Why this specific answer is correct"
      }
    },
    ... 4 to 6 related concept nodes (depth: 1 or 2, category: 'syntax' | 'control' | 'data' | 'foundation' | 'application' | 'advanced')
  ],
  "edges": [
    {
      "id": "edge-1",
      "source": "node-central",
      "target": "node-subconcept-1",
      "relationship": "implements",
      "description": "Explains how the two nodes relate"
    }
  ]
}

CRITICAL CONSTRAINTS:
1. Ground facts, syntax, and behaviors in the provided verified web search context.
2. Nodes array MUST have 1 central node (depth: 0, category: 'core') and 3 to 6 supporting nodes.
3. Every edge source and target MUST match existing node IDs.
4. No self-loops (source cannot equal target).
5. Output pure JSON without markdown code fences.
6. TOPIC RELEVANCE: Every single node title, explanation, example, and quiz question MUST be specifically and accurately about "${cleanTopic}".
7. NEVER include generic software architecture or cloud placeholders (such as "Scalability & Concurrency" or "Failure Modes & Recovery") unless "${cleanTopic}" is explicitly about distributed systems architecture.
`

  // 6. Execute Real LLM with fallback cascade
  let textOutput: string | null = null
  let modelName = 'LLM'

  try {
    if (geminiKey && geminiKey !== 'YOUR_GEMINI_API_KEY_HERE') {
      modelName = process.env.GEMINI_MODEL || 'gemini-1.5-flash'
      textOutput = await callGemini(systemPrompt, geminiKey, modelName)
    } else if (openAiKey && openAiKey !== 'YOUR_OPENAI_API_KEY_HERE') {
      modelName = process.env.OPENAI_MODEL || 'gpt-4o-mini'
      textOutput = await callOpenAI(systemPrompt, openAiKey, modelName)
    } else if (groqKey && groqKey !== 'YOUR_GROQ_API_KEY_HERE') {
      modelName = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile'
      textOutput = await callGroq(systemPrompt, groqKey, modelName)
    }
  } catch (err: any) {
    console.warn(`LLM call to ${modelName} encountered an error:`, err.message)
  }

  // 7. Parse and Validate LLM Response
  if (textOutput) {
    try {
      const cleaned = cleanJsonString(textOutput)
      const parsedJson = JSON.parse(cleaned)

      // Merge verified search citations with any returned sources
      const allSources: SourceCitation[] = [
        ...(parsedJson.sources || []),
        ...searchResult.sources,
      ]
      const uniqueSources = deduplicateSources(allSources)

      // Compute deterministic 3D layout coordinates for nodes
      const positionedNodes = computeGraphLayout(
        parsedJson.nodes,
        parsedJson.edges,
        parsedJson.centralNodeId
      )

      // Attach verified sources to central node if not present
      if (positionedNodes.length > 0 && uniqueSources.length > 0) {
        if (!positionedNodes[0].sources || positionedNodes[0].sources.length === 0) {
          positionedNodes[0].sources = uniqueSources.slice(0, 3)
        }
      }

      const finalMap: KnowledgeMap = {
        ...parsedJson,
        id: parsedJson.id || `map-${cleanTopic.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        topic: cleanTopic,
        nodes: positionedNodes,
        createdAt: new Date().toISOString(),
        isDemo: false,
        sources: uniqueSources.length > 0 ? uniqueSources : undefined,
        searchStatus: searchResult.status,
        searchSummary: searchResult.searchNotice || `Grounded with ${uniqueSources.length} verified sources`,
        demoNote: `Live AI generation powered by ${modelName} and grounded with ${searchResult.provider}.`,
      }

      const validation = validateKnowledgeMap(finalMap)
      const relevance = validateMapRelevance(finalMap, cleanTopic)

      if (validation.success && relevance.isValid) {
        return res.status(200).json(validation.data)
      } else {
        console.warn('AI Output failed validation or relevance check:', validation.error || relevance.reason)
      }
    } catch (parseErr: any) {
      console.warn('Failed to parse LLM JSON output, attempting grounded synthesizer:', parseErr.message)
    }
  }

  // 8. Grounded Synthesizer with Relevance Validation
  try {
    const fallbackMap = generateSemanticTopicMap(
      cleanTopic,
      searchResult.sources,
      searchResult.status,
      searchResult.searchNotice
    )
    const relevance = validateMapRelevance(fallbackMap, cleanTopic)
    if (relevance.isValid) {
      return res.status(200).json(fallbackMap)
    } else {
      return res.status(422).json({
        error: `Could not verify relevance for "${cleanTopic}": ${relevance.reason}`,
        retryable: true,
      })
    }
  } catch (synthErr: any) {
    return res.status(422).json({
      error: synthErr.message || `Unable to generate a relevant concept map for "${cleanTopic}". Please refine your topic or configure an AI API key.`,
      retryable: true,
    })
  }
}

/**
 * Calls Google Gemini REST API with JSON response format.
 */
async function callGemini(prompt: string, apiKey: string, model: string): Promise<string | null> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    }),
    signal: AbortSignal.timeout(18000),
  })

  if (!response.ok) {
    throw new Error(`Gemini API returned status ${response.status}`)
  }

  const data = await response.json()
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || null
}

/**
 * Calls OpenAI API with JSON object response format.
 */
async function callOpenAI(prompt: string, apiKey: string, model: string): Promise<string | null> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.2,
    }),
    signal: AbortSignal.timeout(18000),
  })

  if (!response.ok) {
    throw new Error(`OpenAI API returned status ${response.status}`)
  }

  const data = await response.json()
  return data?.choices?.[0]?.message?.content || null
}

/**
 * Calls Groq API with JSON object response format.
 */
async function callGroq(prompt: string, apiKey: string, model: string): Promise<string | null> {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.2,
    }),
    signal: AbortSignal.timeout(14000),
  })

  if (!response.ok) {
    throw new Error(`Groq API returned status ${response.status}`)
  }

  const data = await response.json()
  return data?.choices?.[0]?.message?.content || null
}

/**
 * Cleans markdown code fences from JSON output.
 */
function cleanJsonString(str: string): string {
  let cleaned = str.trim()
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '')
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '')
  }
  return cleaned
}

/**
 * Deduplicates citations by URL.
 */
function deduplicateSources(sources: SourceCitation[]): SourceCitation[] {
  const seen = new Set<string>()
  const result: SourceCitation[] = []

  for (const s of sources) {
    if (!s.url || seen.has(s.url)) continue
    seen.add(s.url)
    result.push(s)
  }

  return result
}
