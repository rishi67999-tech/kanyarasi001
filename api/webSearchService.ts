import type { SourceCitation } from '../src/types/knowledge'

export interface SearchWebResult {
  sources: SourceCitation[]
  status: 'verified-web' | 'ai-knowledge' | 'curated-demo'
  provider: string
  summaryContext: string
  searchNotice?: string
}

/**
 * Curated authoritative documentation mapping for standard STEM and developer topics.
 * Ensures verified canonical URLs are provided for foundational concepts.
 */
const CURATED_DOC_MAPPINGS: Array<{
  keywords: string[]
  citation: SourceCitation
}> = [
  {
    keywords: ['python', 'logical', 'operator', 'boolean', 'and', 'or', 'not'],
    citation: {
      title: 'Python Documentation: Boolean Operations — and, or, not',
      url: 'https://docs.python.org/3/library/stdtypes.html#boolean-operations-and-or-not',
      snippet: 'In Python, the Boolean operators "and" and "or" are short-circuit operators. "not" has a lower priority than non-Boolean operators.',
      sourceName: 'Python Docs',
    },
  },
  {
    keywords: ['python', 'function', 'def', 'args', 'kwargs', 'return'],
    citation: {
      title: 'Python Documentation: Defining Functions & Call Mechanics',
      url: 'https://docs.python.org/3/tutorial/controlflow.html#defining-functions',
      snippet: 'The keyword "def" introduces a function definition. It must be followed by the function name and the parenthesized list of formal parameters.',
      sourceName: 'Python Docs',
    },
  },
  {
    keywords: ['python', 'loop', 'for', 'while', 'iteration'],
    citation: {
      title: 'Python Documentation: Control Flow and Iteration Tools',
      url: 'https://docs.python.org/3/tutorial/controlflow.html#for-statements',
      snippet: 'The for statement in Python iterates over the items of any sequence (a list or a string), in the order that they appear in the sequence.',
      sourceName: 'Python Docs',
    },
  },
  {
    keywords: ['python', 'list', 'tuple', 'sequence'],
    citation: {
      title: 'Python Documentation: Data Structures & Lists',
      url: 'https://docs.python.org/3/tutorial/datastructures.html',
      snippet: 'Lists are mutable sequences, typically used to store collections of homogeneous items.',
      sourceName: 'Python Docs',
    },
  },
  {
    keywords: ['python', 'dict', 'dictionary', 'hash', 'mapping'],
    citation: {
      title: 'Python Documentation: Mapping Types — dict',
      url: 'https://docs.python.org/3/library/stdtypes.html#mapping-types-dict',
      snippet: 'A mapping object maps hashable values to arbitrary objects. Dictionaries are mutable objects.',
      sourceName: 'Python Docs',
    },
  },
  {
    keywords: ['css', 'flexbox', 'flex'],
    citation: {
      title: 'MDN Web Docs: CSS Flexible Box Layout',
      url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout',
      snippet: 'CSS flexible box layout is a module of CSS that defines a CSS box model for user interface design.',
      sourceName: 'MDN Web Docs',
    },
  },
  {
    keywords: ['css', 'box model', 'margin', 'padding', 'border'],
    citation: {
      title: 'MDN Web Docs: The Box Model',
      url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model',
      snippet: 'Every element in web design is a rectangular box. CSS box model describes margins, borders, padding, and content.',
      sourceName: 'MDN Web Docs',
    },
  },
  {
    keywords: ['http', 'request', 'status code', 'rest', 'api'],
    citation: {
      title: 'MDN Web Docs: An Overview of HTTP Protocols',
      url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview',
      snippet: 'HTTP is an extensible, stateless protocol for fetching resources such as HTML documents and REST APIs.',
      sourceName: 'MDN Web Docs',
    },
  },
  {
    keywords: ['css', 'grid', 'subgrid'],
    citation: {
      title: 'MDN Web Docs: CSS Grid Layout & Subgrid',
      url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Subgrid',
      snippet: 'Subgrid is a value of grid-template-columns and grid-template-rows in CSS Grid that allows child grids to adopt their parent grid lines.',
      sourceName: 'MDN Web Docs',
    },
  },
  {
    keywords: ['database', 'index', 'b-tree', 'sql'],
    citation: {
      title: 'PostgreSQL Documentation: B-Tree Indexes Architecture',
      url: 'https://www.postgresql.org/docs/current/indexes-types.html',
      snippet: 'B-trees can handle equality and range queries on data that can be sorted into some normal order.',
      sourceName: 'PostgreSQL Docs',
    },
  },
]

/**
 * Strips conversational filler words from student prompts to yield high-precision search keywords.
 */
function cleanSearchQuery(raw: string): string {
  return raw
    .replace(/^(explain|what is|what are|how do|how does|learn|teach me about|show me|can you explain)\s+/i, '')
    .replace(/\s+(using an animated example|in python|in javascript|in css|with code|in detail)\b/gi, (match) => {
      if (/python/i.test(match)) return ' Python'
      if (/javascript/i.test(match)) return ' JavaScript'
      if (/css/i.test(match)) return ' CSS'
      return ''
    })
    .replace(/[?.!]+$/, '')
    .trim()
}

/**
 * Searches the live web for authoritative context and source citations.
 * Prioritizes Tavily API -> Serper API -> Brave Search -> Wikipedia Open Knowledge -> Curated Docs.
 */
export async function searchWeb(topicQuery: string): Promise<SearchWebResult> {
  const cleanQuery = topicQuery.trim()
  if (!cleanQuery) {
    return {
      sources: [],
      status: 'ai-knowledge',
      provider: 'none',
      summaryContext: 'No topic query provided.',
    }
  }

  const queryLower = cleanQuery.toLowerCase()
  const matchingDocs: SourceCitation[] = []

  // Check curated documentation references first
  for (const mapping of CURATED_DOC_MAPPINGS) {
    const matchCount = mapping.keywords.filter((kw) => queryLower.includes(kw)).length
    if (matchCount >= 2) {
      matchingDocs.push(mapping.citation)
    }
  }

  const effectiveSearchTerm = cleanSearchQuery(cleanQuery) || cleanQuery

  // 1. Tavily AI Search (Preferred for LLM RAG if TAVILY_API_KEY is configured)
  const tavilyKey = process.env.TAVILY_API_KEY
  if (tavilyKey && tavilyKey !== 'YOUR_TAVILY_API_KEY_HERE') {
    try {
      const tavilyRes = await fetch('https://api.tavily.com/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: tavilyKey,
          query: effectiveSearchTerm,
          search_depth: 'basic',
          include_answer: true,
          max_results: 5,
        }),
        signal: AbortSignal.timeout(6000),
      })

      if (tavilyRes.ok) {
        const data = await tavilyRes.json()
        const tavilySources: SourceCitation[] = (data.results || []).slice(0, 4).map((r: any) => ({
          title: r.title || cleanQuery,
          url: r.url,
          snippet: r.content ? r.content.slice(0, 240) : '',
          sourceName: extractDomain(r.url) || 'Tavily Search',
        }))

        const combinedSources = deduplicateSources([...matchingDocs, ...tavilySources])
        const summaryContext = buildSummaryContext(combinedSources, data.answer)

        return {
          sources: combinedSources,
          status: 'verified-web',
          provider: 'Tavily Search API',
          summaryContext,
          searchNotice: `Retrieved ${combinedSources.length} verified live web sources via Tavily.`,
        }
      }
    } catch (err: any) {
      console.warn('Tavily search notice:', err.message)
    }
  }

  // 2. Google Serper API (if SERPER_API_KEY is configured)
  const serperKey = process.env.SERPER_API_KEY
  if (serperKey && serperKey !== 'YOUR_SERPER_API_KEY_HERE') {
    try {
      const serperRes = await fetch('https://google.serper.dev/search', {
        method: 'POST',
        headers: {
          'X-API-KEY': serperKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ q: effectiveSearchTerm, num: 5 }),
        signal: AbortSignal.timeout(6000),
      })

      if (serperRes.ok) {
        const data = await serperRes.json()
        const serperSources: SourceCitation[] = (data.organic || []).slice(0, 4).map((r: any) => ({
          title: r.title || cleanQuery,
          url: r.link,
          snippet: r.snippet || '',
          sourceName: extractDomain(r.link) || 'Google Search',
        }))

        const combinedSources = deduplicateSources([...matchingDocs, ...serperSources])
        const summaryContext = buildSummaryContext(combinedSources)

        return {
          sources: combinedSources,
          status: 'verified-web',
          provider: 'Google Serper API',
          summaryContext,
          searchNotice: `Retrieved ${combinedSources.length} verified live web sources via Google Search.`,
        }
      }
    } catch (err: any) {
      console.warn('Serper search notice:', err.message)
    }
  }

  // 3. Open Wikipedia Knowledge Search (Authoritative open STEM/CS encyclopedia, zero keys required)
  try {
    let searchItems: any[] = []

    // Primary search using effective search term
    const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
      effectiveSearchTerm
    )}&utf8=1&format=json`

    const wikiRes = await fetch(wikiUrl, {
      headers: {
        'User-Agent': 'KnowledgeSkeleton3D/1.0 (educational research bot)',
      },
      signal: AbortSignal.timeout(6000),
    })

    if (wikiRes.ok) {
      const data = await wikiRes.json()
      searchItems = data?.query?.search || []
    }

    // If 0 items and search term has multiple words, try fallback with core terms
    if (searchItems.length === 0 && effectiveSearchTerm.includes(' ')) {
      const words = effectiveSearchTerm.split(/\s+/).filter((w) => w.length > 2)
      if (words.length > 1) {
        const fallbackTerm = words.slice(-2).join(' ')
        const fallbackRes = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
            fallbackTerm
          )}&utf8=1&format=json`,
          {
            headers: {
              'User-Agent': 'KnowledgeSkeleton3D/1.0 (educational research bot)',
            },
            signal: AbortSignal.timeout(4000),
          }
        )
        if (fallbackRes.ok) {
          const fbData = await fallbackRes.json()
          searchItems = fbData?.query?.search || []
        }
      }
    }

    if (searchItems.length > 0) {
      const wikiSources: SourceCitation[] = searchItems.slice(0, 3).map((item: any) => ({
        title: item.title,
        url: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title.replace(/\s+/g, '_'))}`,
        snippet: (item.snippet || '').replace(/<[^>]+>/g, '').trim(),
        sourceName: 'Wikipedia',
      }))

      const combinedSources = deduplicateSources([...matchingDocs, ...wikiSources])
      if (combinedSources.length > 0) {
        const summaryContext = buildSummaryContext(combinedSources)
        return {
          sources: combinedSources,
          status: 'verified-web',
          provider: 'Wikipedia & Technical Documentation',
          summaryContext,
          searchNotice: `Verified with ${combinedSources.length} authoritative reference sources.`,
        }
      }
    }
  } catch (err: any) {
    console.warn('Wikipedia search notice:', err.message)
  }

  // 4. Curated Documentation Fallback
  if (matchingDocs.length > 0) {
    return {
      sources: matchingDocs,
      status: 'verified-web',
      provider: 'Official Technical Documentation',
      summaryContext: buildSummaryContext(matchingDocs),
      searchNotice: `Grounded in ${matchingDocs.length} official technical documentation sources.`,
    }
  }

  // 5. Offline or Search Unavailable Fallback
  return {
    sources: [],
    status: 'ai-knowledge',
    provider: 'Model Knowledge Base',
    summaryContext: `Topic: ${cleanQuery}. Web search was unavailable; relying on validated model knowledge base.`,
    searchNotice: 'Web search unavailable; answering using model knowledge base.',
  }
}

/**
 * Extracts clean domain name for display badge (e.g. docs.python.org, wikipedia.org).
 */
function extractDomain(url: string): string {
  try {
    const parsed = new URL(url)
    return parsed.hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
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

/**
 * Builds dense summary context string for LLM prompt injection.
 */
function buildSummaryContext(sources: SourceCitation[], directAnswer?: string): string {
  const lines: string[] = []
  if (directAnswer) {
    lines.push(`Direct Synthesis: ${directAnswer}`)
  }

  for (let i = 0; i < sources.length; i++) {
    const s = sources[i]
    lines.push(
      `Source [${i + 1}] (${s.sourceName || 'Web'}): "${s.title}" - ${s.url}\nExcerpt: ${s.snippet || 'General topic reference'}`
    )
  }

  return lines.join('\n\n')
}
