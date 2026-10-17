import { PREDEFINED_TOPICS, findPredefinedMap } from '../src/data/predefinedMaps'
import { validateKnowledgeMap } from '../src/services/schema'
import { detectSearchIntent } from '../src/services/searchIntent'
import { getAllCurriculumTopics } from '../src/data/pythonCurriculum'

function runSuite() {
  console.log('====================================================')
  console.log('  RUNNING 3D KNOWLEDGE SKELETON VERIFICATION SUITE  ')
  console.log('====================================================\n')

  let totalTests = 0
  let passedTests = 0
  let failedTests = 0

  function assert(condition: boolean, testName: string, detail?: string) {
    totalTests++
    if (condition) {
      passedTests++
      console.log(`  ✓ ${testName}`)
    } else {
      failedTests++
      console.error(`  ✗ ${testName}`)
      if (detail) console.error(`    -> ${detail}`)
    }
  }

  // -----------------------------------------------------------------------------
  // Test 1: Validate all Predefined and Section Knowledge Maps
  // -----------------------------------------------------------------------------
  console.log('--- 1. Predefined & Section Map Schema Integrity ---')
  const uniqueMaps = Array.from(new Set(Object.values(PREDEFINED_TOPICS)))

  assert(
    uniqueMaps.length >= 15,
    `Registered map count should be >= 15 (found ${uniqueMaps.length})`
  )

  for (const map of uniqueMaps) {
    const valResult = validateKnowledgeMap(map)
    assert(
      valResult.success,
      `Map [${map.id}]: Schema validation passes`,
      valResult.success ? undefined : JSON.stringify(valResult.error)
    )

    // Central node check
    const centralNode = map.nodes.find((n) => n.id === map.centralNodeId)
    assert(
      Boolean(centralNode),
      `Map [${map.id}]: Central node (${map.centralNodeId}) exists in nodes list`
    )

    // Edges connectivity check
    const nodeIds = new Set(map.nodes.map((n) => n.id))
    let brokenEdges = 0
    for (const edge of map.edges) {
      if (!nodeIds.has(edge.source) || !nodeIds.has(edge.target)) {
        brokenEdges++
      }
    }
    assert(
      brokenEdges === 0,
      `Map [${map.id}]: All ${map.edges.length} edges connect valid existing nodes`
    )

    // Content completeness check: definitions, concrete examples, and practice questions
    for (const node of map.nodes) {
      assert(
        Boolean(node.title && node.shortExplanation && node.whyItMatters),
        `Node [${node.id} in ${map.id}]: Has title, explanation, and whyItMatters`
      )

      if (node.concreteExample) {
        assert(
          Boolean(node.concreteExample.code && node.concreteExample.explanation),
          `Node [${node.id}]: Concrete example has runnable code and explanation`
        )
      }

      const questions = [
        ...(node.practiceQuestion ? [node.practiceQuestion] : []),
        ...(node.practiceQuestions || []),
      ]

      for (const q of questions) {
        assert(
          q.options.length >= 3 &&
            q.correctIndex >= 0 &&
            q.correctIndex < q.options.length &&
            Boolean(q.explanation),
          `Question in [${node.id}]: Valid options (${q.options.length}), in-bounds correctIndex (${q.correctIndex}), explanation present`
        )
      }
    }
  }

  // -----------------------------------------------------------------------------
  // Test 2: Predefined Map Search Resolution
  // -----------------------------------------------------------------------------
  console.log('\n--- 2. Topic Matching & Predefined Map Routing ---')
  const routingTests = [
    { query: 'python', expectedId: 'map-python-master' },
    { query: 'python curriculum', expectedId: 'map-python-master' },
    { query: 'python fundamentals', expectedId: 'map-sec-fundamentals' },
    { query: 'python control flow', expectedId: 'map-sec-control-flow' },
    { query: 'control flow', expectedId: 'map-sec-control-flow' },
    { query: 'python data structures', expectedId: 'map-sec-data-structures' },
    { query: 'data structures', expectedId: 'map-sec-data-structures' },
    { query: 'functions and modules', expectedId: 'map-sec-functions-modules' },
    { query: 'python error handling and files', expectedId: 'map-sec-errors-files' },
    { query: 'python oop', expectedId: 'map-sec-oop' },
    { query: 'advanced python', expectedId: 'map-sec-advanced' },
    { query: 'practical python projects', expectedId: 'map-sec-projects' },
    { query: 'loops', expectedId: 'map-python-loops' },
    { query: 'loop', expectedId: 'map-python-loops' },
    { query: 'explain loops in python', expectedId: 'map-python-loops' },
    { query: 'variables', expectedId: 'map-python-variables' },
    { query: 'lists', expectedId: 'map-python-lists' },
    { query: 'dictionaries', expectedId: 'map-python-dicts' },
    { query: 'recursion', expectedId: 'map-recursion' },
    { query: 'binary search', expectedId: 'map-binary-search' },
    { query: 'database indexes', expectedId: 'map-db-indexes' },
  ]

  for (const test of routingTests) {
    const matched = findPredefinedMap(test.query)
    assert(
      matched?.id === test.expectedId,
      `Query "${test.query}" resolves to ${test.expectedId} (got: ${matched?.id})`
    )
  }

  // -----------------------------------------------------------------------------
  // Test 3: Search Intent Detection (Supported, Unclear, Unsupported)
  // -----------------------------------------------------------------------------
  console.log('\n--- 3. Search Intent Detection & Guardrails ---')
  const supportedQueries = [
    'explain loops in python',
    'what are variables in python',
    'python functions',
    'python control flow',
    'binary search algorithm',
  ]
  for (const q of supportedQueries) {
    const res = detectSearchIntent(q)
    assert(
      res.type === 'supported',
      `Intent for "${q}" should be supported (got ${res.type})`
    )
  }

  const unclearQueries = ['hi', 'help', 'test', 'asdf', 'code']
  for (const q of unclearQueries) {
    const res = detectSearchIntent(q)
    assert(
      res.type === 'unclear' && Boolean(res.message) && (res.suggestedTopics?.length || 0) > 0,
      `Intent for "${q}" is unclear and provides polite suggestions`
    )
  }

  const unsupportedQueries = ['quantum recipe', 'how to bake cake', 'crypto coin trading']
  for (const q of unsupportedQueries) {
    const res = detectSearchIntent(q)
    assert(
      res.type === 'unsupported' && Boolean(res.message) && (res.suggestedTopics?.length || 0) > 0,
      `Intent for "${q}" is unsupported and provides polite curriculum guidance`
    )
  }

  // -----------------------------------------------------------------------------
  // Test 4: Curriculum Catalog Topic Coverage
  // -----------------------------------------------------------------------------
  console.log('\n--- 4. Curriculum Catalog Integrity ---')
  const catalogTopics = getAllCurriculumTopics()
  assert(
    catalogTopics.length >= 70,
    `Curriculum catalog topic count >= 70 (found ${catalogTopics.length})`
  )

  const distinctIds = new Set(catalogTopics.map((t) => t.id))
  assert(
    distinctIds.size === catalogTopics.length,
    `All ${catalogTopics.length} curriculum topic IDs are unique without collision`
  )

  console.log('\n====================================================')
  console.log(`  VERIFICATION RESULTS: ${passedTests} PASSED, ${failedTests} FAILED (TOTAL: ${totalTests})`)
  console.log('====================================================\n')

  if (failedTests > 0) {
    process.exit(1)
  }
}

runSuite()
