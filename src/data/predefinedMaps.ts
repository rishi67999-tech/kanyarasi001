import type { KnowledgeMap } from '../types/knowledge'

export const PYTHON_LOOPS_MAP: KnowledgeMap = {
  id: 'map-python-loops',
  topic: 'Explain loops in Python',
  title: 'Python Loops & Iteration Anatomy',
  description:
    'A comprehensive 3D visual breakdown of loop mechanisms in Python, from fundamental iteration to nested constructs and conditional controls.',
  centralNodeId: 'node-loops',
  createdAt: '2026-10-14T10:00:00Z',
  isDemo: true,
  demoNote: 'Curated deterministic reference map',
  nodes: [
    {
      id: 'node-loops',
      title: 'LOOPS',
      shortExplanation:
        'A fundamental programming structure that repeats a block of code until a specific condition is met or a sequence is exhausted.',
      category: 'core',
      depth: 0,
      position: [0, 0, 0],
      color: '#38bdf8', // Electric Cyan
      size: 1.45,
      whyItMatters:
        'Loops eliminate manual repetition (DRY principle). Without loops, processing 10,000 database rows or drawing 60 frames per second would require millions of redundant lines of code.',
      commonMistakes: [
        'Writing repetitive code by copy-pasting instead of abstracting into a loop.',
        'Modifying a list while actively iterating over it.',
        'Assuming loop indices always start at 1 instead of 0.',
      ],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'What is a Loop?',
          explanation:
            'In computing, a loop is a control flow statement that allows code to be executed repeatedly based on a given boolean condition or sequence traversal.',
          codeSnippet: '# Concept: Execute block N times\nwhile True:\n    work()\n    if done(): break',
        },
        {
          stepNumber: 2,
          title: 'The Two Python Loop Archetypes',
          explanation:
            'Python provides two primary loop constructs: the "for" loop (for iterating over items of any sequence) and the "while" loop (for repeating as long as an expression evaluates to True).',
          codeSnippet: '# Definite vs Indefinite\nfor item in collection: ...\nwhile condition_is_true: ...',
        },
        {
          stepNumber: 3,
          title: 'Loop Lifecycle',
          explanation:
            'Every loop involves: Initialization -> Condition Check -> Body Execution -> Step/Increment -> Termination.',
        },
      ],
      concreteExample: {
        code: '# Loop over a sequence\nnames = ["Ada", "Alan", "Grace"]\nfor name in names:\n    print(f"Hello {name}!")',
        explanation:
          'The loop assigns each element from the list to the variable "name" one by one and executes the print block.',
      },
      practiceQuestion: {
        question: 'Which of the following best describes the core purpose of a loop?',
        options: [
          'To define reusable function parameters',
          'To repeat an operation automatically without duplicate code',
          'To allocate dynamic memory on the heap',
          'To convert strings into numerical values',
        ],
        correctIndex: 1,
        explanation:
          'Loops enable automated repetition of code blocks, preventing manual duplication and handling dynamic collections effortlessly.',
      },
      prerequisiteIds: [],
    },
    {
      id: 'node-for-loop',
      title: 'FOR LOOP',
      shortExplanation:
        'Iterates over elements of a sequence (like a list, tuple, string, or range) in the order they appear.',
      category: 'syntax',
      depth: 1,
      position: [4.2, 1.8, 1.2],
      color: '#60a5fa', // Blue
      size: 1.0,
      whyItMatters:
        'The `for` loop is Python’s most idiomatic and frequently used loop. It safely exhausts collections without needing manual pointer or index bookkeeping.',
      commonMistakes: [
        'Expecting `range(1, 4)` to include 4. In Python, range stops before the upper bound (1, 2, 3).',
        'Using `range(len(items))` instead of iterating directly over `items`.',
      ],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Syntax and Mechanics',
          explanation:
            'A `for` loop in Python uses the `in` operator to request items one at a time from an iterable object.',
          codeSnippet: 'for target_var in iterable:\n    # indented code block',
        },
        {
          stepNumber: 2,
          title: 'The range() Generator',
          explanation:
            '`range(start, stop, step)` generates integers starting from start up to (but not including) stop.',
          codeSnippet: 'for i in range(1, 4):\n    print(i)\n# Output: 1, 2, 3',
        },
        {
          stepNumber: 3,
          title: 'Tracing Execution',
          explanation:
            'Watch the live step-by-step trace below to see the loop variable `i` update during each iteration cycle.',
        },
      ],
      concreteExample: {
        code: 'for i in range(1, 4):\n    print(i)',
        explanation:
          'This classic loop counts from 1 to 3. Below is the exact step-by-step timeline of variables and stdout.',
        trace: {
          code: 'for i in range(1, 4):\n    print(i)',
          language: 'python',
          explanation:
            'Step through the execution of `for i in range(1, 4): print(i)` to see how the variable `i` is bound and printed on each pass.',
          steps: [
            {
              step: 1,
              line: 1,
              variables: { i: 'unbound', range: '[1, 2, 3]' },
              output: '',
              description: 'Loop initialization: `range(1, 4)` prepares the sequence [1, 2, 3].',
            },
            {
              step: 2,
              line: 1,
              variables: { i: 1 },
              output: '',
              description: 'Iteration 1 begins: Variable `i` is assigned the first item: 1.',
            },
            {
              step: 3,
              line: 2,
              variables: { i: 1 },
              output: '1\n',
              description: 'Line 2 executes: `print(i)` outputs "1" to stdout.',
            },
            {
              step: 4,
              line: 1,
              variables: { i: 2 },
              output: '1\n',
              description: 'Iteration 2 begins: Variable `i` is assigned the next item: 2.',
            },
            {
              step: 5,
              line: 2,
              variables: { i: 2 },
              output: '1\n2\n',
              description: 'Line 2 executes: `print(i)` outputs "2" to stdout.',
            },
            {
              step: 6,
              line: 1,
              variables: { i: 3 },
              output: '1\n2\n',
              description: 'Iteration 3 begins: Variable `i` is assigned the final item: 3.',
            },
            {
              step: 7,
              line: 2,
              variables: { i: 3 },
              output: '1\n2\n3\n',
              description: 'Line 2 executes: `print(i)` outputs "3" to stdout.',
            },
            {
              step: 8,
              line: 1,
              variables: { i: 3, 'range state': 'exhausted' },
              output: '1\n2\n3\n',
              description: 'Termination: No more items in range. Loop ends cleanly.',
            },
          ],
        },
      },
      practiceQuestion: {
        question: 'What numbers will `for x in range(2, 5): print(x)` output?',
        options: [
          '2, 3, 4, 5',
          '2, 3, 4',
          '3, 4, 5',
          '2, 5',
        ],
        correctIndex: 1,
        explanation:
          'Python range(start, stop) stops BEFORE the `stop` value, so range(2, 5) produces 2, 3, and 4.',
      },
      prerequisiteIds: ['node-loops', 'node-iteration'],
    },
    {
      id: 'node-while-loop',
      title: 'WHILE LOOP',
      shortExplanation:
        'Repeats a statement block as long as a specified boolean expression evaluates to True.',
      category: 'syntax',
      depth: 1,
      position: [-4.2, 1.8, -1.0],
      color: '#a78bfa', // Light Violet
      size: 1.0,
      whyItMatters:
        '`while` loops are essential when the number of iterations is not known in advance (e.g. waiting for user input, network packets, or game loops).',
      commonMistakes: [
        'Creating an infinite loop by forgetting to update the condition variable inside the loop body.',
        'Off-by-one errors with `<` versus `<=` in the condition check.',
      ],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Condition-Driven Execution',
          explanation:
            'Before each pass, Python tests the condition expression. If True, the body runs; if False, execution skips past the loop.',
          codeSnippet: 'count = 3\nwhile count > 0:\n    print(count)\n    count -= 1',
        },
        {
          stepNumber: 2,
          title: 'Guard Against Infinite Loops',
          explanation:
            'Always ensure that the condition will eventually evaluate to False, or provide an explicit `break` trigger.',
        },
      ],
      concreteExample: {
        code: 'energy = 3\nwhile energy > 0:\n    print(f"Energy: {energy}")\n    energy -= 1\nprint("Rest required")',
        explanation:
          'Energy decreases by 1 on each step until it hits 0, causing `energy > 0` to become False.',
      },
      practiceQuestion: {
        question: 'What happens if a while loop condition never becomes False and has no break statement?',
        options: [
          'Python throws a SyntaxError on compile',
          'The loop executes forever (infinite loop), hanging the program',
          'The loop automatically halts after 1000 iterations',
          'Python resets the variables to zero',
        ],
        correctIndex: 1,
        explanation:
          'Without a termination condition or break, the loop continues indefinitely until the process is forcefully killed or runs out of resources.',
      },
      prerequisiteIds: ['node-loops', 'node-conditions'],
    },
    {
      id: 'node-iteration',
      title: 'ITERATION',
      shortExplanation:
        'The process of retrieving and traversing each item in a container or data structure sequentially.',
      category: 'foundation',
      depth: 1,
      position: [0.2, 3.6, -2.2],
      color: '#34d399', // Emerald
      size: 0.95,
      whyItMatters:
        'Iteration powers the Python Iterator Protocol (`__iter__` and `__next__`), allowing any custom object or streaming generator to be smoothly looped over.',
      commonMistakes: [
        'Confusing an "iterable" (an object that can return an iterator) with an "iterator" (the cursor holding current position).',
      ],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'The Iterator Protocol',
          explanation:
            'When you write `for x in data:`, Python calls `iter(data)` to obtain an iterator, then repeatedly calls `next(iterator)` until `StopIteration` is raised.',
          codeSnippet: 'iterator = iter([10, 20])\nprint(next(iterator)) # 10\nprint(next(iterator)) # 20',
        },
      ],
      concreteExample: {
        code: 'text = "3D"\nfor char in text:\n    print(char.lower())',
        explanation: 'Strings are iterables. The loop steps character by character.',
      },
      practiceQuestion: {
        question: 'Which built-in Python exception signals that an iterator has reached the end?',
        options: ['IndexError', 'StopIteration', 'EOFError', 'KeyError'],
        correctIndex: 1,
        explanation:
          'The iterator protocol relies on raising `StopIteration` when there are no further elements.',
      },
      prerequisiteIds: ['node-loops'],
    },
    {
      id: 'node-conditions',
      title: 'LOOP CONDITIONS',
      shortExplanation:
        'Evaluation expressions and control directives (`break`, `continue`, `else`) that alter normal loop flow.',
      category: 'control',
      depth: 1,
      position: [-3.4, -2.6, 1.5],
      color: '#f472b6', // Rose
      size: 0.9,
      whyItMatters:
        'Control statements provide fine-grained steering: stopping early when a target is found (`break`) or skipping invalid entries (`continue`).',
      commonMistakes: [
        'Misunderstanding `for ... else`: The `else` block executes ONLY if the loop finishes naturally without hitting `break`.',
      ],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'break Statement',
          explanation: 'Immediately terminates the innermost loop.',
          codeSnippet: 'for n in range(10):\n    if n == 3:\n        break\n    print(n) # prints 0, 1, 2',
        },
        {
          stepNumber: 2,
          title: 'continue Statement',
          explanation: 'Skips the rest of the current iteration and jumps to the next cycle.',
          codeSnippet: 'for n in range(5):\n    if n % 2 == 0:\n        continue\n    print(n) # prints 1, 3',
        },
      ],
      concreteExample: {
        code: 'for target in [5, 12, 19]:\n    if target > 10:\n        print(f"Found first >10: {target}")\n        break',
        explanation: 'The loop immediately stops as soon as 12 is encountered.',
      },
      practiceQuestion: {
        question: 'What is the effect of the `continue` keyword inside a loop?',
        options: [
          'It terminates the entire loop immediately',
          'It restarts the loop from index 0',
          'It skips the remaining code in the current iteration and moves to the next',
          'It pauses the loop for one second',
        ],
        correctIndex: 2,
        explanation:
          '`continue` skips the remainder of the current iteration body and proceeds to the next iteration.',
      },
      prerequisiteIds: ['node-loops'],
    },
    {
      id: 'node-nested-loops',
      title: 'NESTED LOOPS',
      shortExplanation:
        'A loop situated inside the body of another loop, commonly used for multidimensional grids and matrices.',
      category: 'advanced',
      depth: 2,
      position: [3.2, -2.8, -1.8],
      color: '#fbbf24', // Amber
      size: 0.85,
      whyItMatters:
        'Nested loops are fundamental for processing 2D images (pixels across rows & cols), game boards (chess grids), and Cartesian coordinate spaces.',
      commonMistakes: [
        'Accidentally creating O(N^2) or O(N^3) time complexity bottlenecks with deep nesting.',
        'Using the same loop variable name for both outer and inner loops.',
      ],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Inner vs Outer Mechanics',
          explanation:
            'For every single pass of the outer loop, the inner loop completes all of its iterations from beginning to end.',
          codeSnippet: 'for row in range(2):\n    for col in range(2):\n        print(f"({row}, {col})")',
        },
      ],
      concreteExample: {
        code: 'for row in ["A", "B"]:\n    for col in [1, 2]:\n        print(f"{row}{col}", end=" ")\n# Output: A1 A2 B1 B2',
        explanation: 'Row A processes columns 1 and 2, then row B processes columns 1 and 2.',
      },
      practiceQuestion: {
        question: 'If the outer loop runs 3 times and the inner loop runs 4 times, how many total times does the inner body execute?',
        options: ['7 times', '12 times', '4 times', '3 times'],
        correctIndex: 1,
        explanation: 'Nested loops multiply iterations: 3 outer * 4 inner = 12 total executions.',
      },
      prerequisiteIds: ['node-for-loop'],
    },
  ],
  edges: [
    {
      id: 'edge-loops-to-for',
      source: 'node-loops',
      target: 'node-for-loop',
      relationship: 'implements',
      description: 'The for-loop implements definite iteration over collections.',
    },
    {
      id: 'edge-loops-to-while',
      source: 'node-loops',
      target: 'node-while-loop',
      relationship: 'implements',
      description: 'The while-loop implements indefinite condition-based iteration.',
    },
    {
      id: 'edge-loops-to-iteration',
      source: 'node-loops',
      target: 'node-iteration',
      relationship: 'relies_on',
      description: 'Looping relies on the foundational protocol of iteration.',
    },
    {
      id: 'edge-loops-to-conditions',
      source: 'node-loops',
      target: 'node-conditions',
      relationship: 'regulated_by',
      description: 'Loop execution is guarded and altered by loop conditions.',
    },
    {
      id: 'edge-for-to-nested',
      source: 'node-for-loop',
      target: 'node-nested-loops',
      relationship: 'composes',
      description: 'Multiple for-loops compose into nested multidimensional traversals.',
    },
    {
      id: 'edge-while-to-conditions',
      source: 'node-while-loop',
      target: 'node-conditions',
      relationship: 'evaluates',
      description: 'While loops directly evaluate boolean loop conditions on each cycle.',
    },
  ],
}

export const BINARY_LEFT_SHIFT_MAP: KnowledgeMap = {
  id: 'map-binary-left-shift',
  topic: 'Explain binary left shift',
  title: 'Binary Left Shift (`<<`) Mechanics',
  description:
    'Visual 3D model of bitwise operations, showing how bit positions shift leftward and multiply values by powers of two.',
  centralNodeId: 'node-left-shift',
  createdAt: '2026-10-14T10:00:00Z',
  isDemo: true,
  demoNote: 'Predefined bitwise architecture map',
  nodes: [
    {
      id: 'node-left-shift',
      title: 'LEFT SHIFT',
      shortExplanation:
        'The bitwise operator `<<` that moves all bits of an integer to the left by a specified number of positions, appending zeros on the right.',
      category: 'core',
      depth: 0,
      position: [0, 0, 0],
      color: '#38bdf8',
      size: 1.4,
      whyItMatters:
        'Left shifting is a high-speed hardware-level multiplication by 2^n. It is widely used in graphics shaders, cryptography, network protocols, and mask packing.',
      commonMistakes: [
        'Shifting by negative counts (raises ValueError in Python).',
        'Confusing logical left shift with circular rotation.',
      ],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'The Shift Operator',
          explanation: 'In Python, `x << n` takes the binary representation of `x` and pushes every bit `n` spots left.',
          codeSnippet: 'x = 3       # Binary: 0000 0011\nx_shifted = x << 1 # Binary: 0000 0110 (6)',
        },
      ],
      concreteExample: {
        code: 'val = 5        # 0000 0101 (5)\nresult = val << 2 # 0001 0100 (20)\nprint(result)     # 5 * 2^2 = 20',
        explanation: 'Each left shift by 1 position doubles the number. Shifting by 2 multiplies by 4 (5 * 4 = 20).',
      },
      practiceQuestion: {
        question: 'What is the decimal result of evaluating `2 << 3`?',
        options: ['6', '8', '16', '32'],
        correctIndex: 2,
        explanation: '2 << 3 equals 2 * 2^3 = 2 * 8 = 16.',
      },
      prerequisiteIds: [],
    },
    {
      id: 'node-binary-rep',
      title: 'BINARY REPRESENTATION',
      shortExplanation: 'How positive integers are stored as sequences of base-2 bits (0s and 1s).',
      category: 'foundation',
      depth: 1,
      position: [3.8, 1.6, 0.8],
      color: '#60a5fa',
      size: 0.95,
      whyItMatters: 'Every piece of digital data is physically stored and operated on as binary bits in CPU registers.',
      commonMistakes: ['Thinking binary bit 0 is on the left; bits read right-to-left in positional values: 1, 2, 4, 8, 16...'],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Base-2 Powers',
          explanation: 'Bit position k represents 2^k. For instance, binary 101 is 1*4 + 0*2 + 1*1 = 5.',
        },
      ],
      practiceQuestion: {
        question: 'What is the binary representation of decimal 7?',
        options: ['110', '111', '101', '1001'],
        correctIndex: 1,
        explanation: '4 + 2 + 1 = 7, which in 3-bit binary is 111.',
      },
      prerequisiteIds: ['node-left-shift'],
    },
    {
      id: 'node-arithmetic-mult',
      title: 'POWERS OF TWO MULTIPLICATION',
      shortExplanation: 'How shifting left by `k` is mathematically identical to multiplying by 2^k.',
      category: 'application',
      depth: 1,
      position: [-3.8, 1.4, -0.6],
      color: '#34d399',
      size: 0.9,
      whyItMatters: 'CPUs can perform a bit shift in a single clock cycle, making it faster than general arithmetic division/multiplication hardware.',
      commonMistakes: ['Applying left shift to non-integer floats without rounding.'],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Mathematical Equivalence',
          explanation: 'n << k == n * (2 ** k)',
        },
      ],
      practiceQuestion: {
        question: 'Which operation is equivalent to `x * 8`?',
        options: ['x << 2', 'x << 3', 'x >> 3', 'x << 8'],
        correctIndex: 1,
        explanation: '8 is 2^3, so `x << 3` is equivalent to multiplying by 8.',
      },
      prerequisiteIds: ['node-left-shift'],
    },
    {
      id: 'node-bitmasking',
      title: 'BITMASKS & FLAGS',
      shortExplanation: 'Using `1 << n` to create bit flags and test individual bit switches.',
      category: 'control',
      depth: 1,
      position: [0.5, -3.2, 1.4],
      color: '#f472b6',
      size: 0.9,
      whyItMatters: 'Permission systems (read/write/execute) pack multiple booleans into a single 32-bit integer using bit flags.',
      commonMistakes: ['Using bitwise OR `|` when bitwise AND `&` was required for checking flags.'],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Flag Creation',
          explanation: 'FLAG_A = 1 << 0 (1), FLAG_B = 1 << 1 (2), FLAG_C = 1 << 2 (4).',
        },
      ],
      practiceQuestion: {
        question: 'What is the value of `1 << 4`?',
        options: ['4', '8', '16', '32'],
        correctIndex: 2,
        explanation: '1 << 4 = 2^4 = 16.',
      },
      prerequisiteIds: ['node-left-shift'],
    },
  ],
  edges: [
    {
      id: 'edge-shift-to-binary',
      source: 'node-left-shift',
      target: 'node-binary-rep',
      relationship: 'operates_on',
      description: 'Shifting directly mutates the position of binary bits.',
    },
    {
      id: 'edge-shift-to-mult',
      source: 'node-left-shift',
      target: 'node-arithmetic-mult',
      relationship: 'mathematical_dual',
      description: 'Left shifting is the hardware equivalent of 2^k multiplication.',
    },
    {
      id: 'edge-shift-to-masking',
      source: 'node-left-shift',
      target: 'node-bitmasking',
      relationship: 'constructs',
      description: 'Bit flags are constructed using single-bit left shifts.',
    },
  ],
}

export const HTML_BOX_MODEL_MAP: KnowledgeMap = {
  id: 'map-html-box-model',
  topic: 'Explain the HTML box model',
  title: 'CSS & HTML Box Model Architecture',
  description:
    'Visual 3D model of how browser layout engines treat every element as a rectangular box composed of content, padding, border, and margin.',
  centralNodeId: 'node-box-model',
  createdAt: '2026-10-14T10:00:00Z',
  isDemo: true,
  demoNote: 'Predefined layout architecture map',
  nodes: [
    {
      id: 'node-box-model',
      title: 'BOX MODEL',
      shortExplanation:
        'The foundational geometry of the web: every HTML element is rendered as a box with content, padding, border, and margin.',
      category: 'core',
      depth: 0,
      position: [0, 0, 0],
      color: '#38bdf8',
      size: 1.45,
      whyItMatters:
        'Understanding the box model is the single most critical concept in CSS to prevent unexpected sizing, overflow clipping, and broken page layouts.',
      commonMistakes: [
        'Forgetting `box-sizing: border-box`, leading to elements widening unexpectedly when padding is added.',
      ],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Concentric Layers',
          explanation: 'From the inside out: Content Area -> Padding -> Border -> Margin.',
        },
      ],
      concreteExample: {
        code: '.card {\n  width: 300px;\n  padding: 20px;\n  border: 2px solid cyan;\n  margin: 16px;\n  box-sizing: border-box;\n}',
        explanation: 'With border-box, the total visible width stays exactly 300px.',
      },
      practiceQuestion: {
        question: 'Which layer of the box model sits between the padding and the margin?',
        options: ['Content', 'Border', 'Outline', 'Transform'],
        correctIndex: 1,
        explanation: 'The Border encapsulates the padding and content, and sits inside the margin.',
      },
      prerequisiteIds: [],
    },
    {
      id: 'node-content',
      title: 'CONTENT',
      shortExplanation: 'The innermost area where text, images, or child elements actually render.',
      category: 'foundation',
      depth: 1,
      position: [0, 2.8, 1.4],
      color: '#60a5fa',
      size: 0.9,
      whyItMatters: 'Defined by `width` and `height`. Holds the actual payload of the element.',
      commonMistakes: ['Assuming width applies to inline elements like <span> without display: block or inline-block.'],
      lessonSteps: [
        { stepNumber: 1, title: 'Content Area', explanation: 'Sized by content itself or explicit width/height.' },
      ],
      practiceQuestion: {
        question: 'Which CSS property directly sets the inner width of the content area?',
        options: ['padding-width', 'width', 'box-width', 'inner-width'],
        correctIndex: 1,
        explanation: 'The standard `width` property controls this.',
      },
      prerequisiteIds: ['node-box-model'],
    },
    {
      id: 'node-padding',
      title: 'PADDING',
      shortExplanation: 'Translucent internal clearance between the content and the border.',
      category: 'syntax',
      depth: 1,
      position: [3.4, 0.4, -1.2],
      color: '#34d399',
      size: 0.9,
      whyItMatters: 'Gives content breathing room and receives background color/images.',
      commonMistakes: ['Adding padding and causing layout overflow when content-box is active.'],
      lessonSteps: [
        { stepNumber: 1, title: 'Padding Spacing', explanation: 'Controlled with padding: top right bottom left.' },
      ],
      practiceQuestion: {
        question: 'Does the element background color extend behind the padding?',
        options: ['Yes, padding displays the element background', 'No, padding is always transparent white', 'Only when border is 0px', 'Only in Firefox'],
        correctIndex: 0,
        explanation: 'Element backgrounds (color/image) fill the content and padding box.',
      },
      prerequisiteIds: ['node-box-model'],
    },
    {
      id: 'node-border',
      title: 'BORDER',
      shortExplanation: 'A visible or invisible boundary line that wraps the padding and content.',
      category: 'control',
      depth: 1,
      position: [-3.4, 0.2, 1.2],
      color: '#f472b6',
      size: 0.9,
      whyItMatters: 'Demarcates UI components, cards, buttons, and visual partitions.',
      commonMistakes: ['Specifying border-width without specifying border-style (defaults to none).'],
      lessonSteps: [
        { stepNumber: 1, title: 'Border Properties', explanation: 'Requires width, style, and color.' },
      ],
      practiceQuestion: {
        question: 'Which border property is mandatory for a border to show up?',
        options: ['border-color', 'border-style', 'border-radius', 'border-shadow'],
        correctIndex: 1,
        explanation: 'If border-style is "none" (default), no border renders regardless of width.',
      },
      prerequisiteIds: ['node-box-model'],
    },
    {
      id: 'node-margin',
      title: 'MARGIN',
      shortExplanation: 'External buffer area that pushes adjacent elements away.',
      category: 'advanced',
      depth: 1,
      position: [0.2, -3.2, -1.5],
      color: '#fbbf24',
      size: 0.9,
      whyItMatters: 'Separates components from their neighbors and handles centering via `margin: 0 auto`.',
      commonMistakes: ['Not knowing about vertical margin collapsing between sibling block elements.'],
      lessonSteps: [
        { stepNumber: 1, title: 'Margin Collapsing', explanation: 'Adjacent vertical margins merge into the maximum of the two.' },
      ],
      practiceQuestion: {
        question: 'What happens when two block siblings have bottom margin 20px and top margin 30px?',
        options: ['They are 50px apart', 'They are 30px apart due to margin collapse', 'They are 20px apart', 'The browser throws a CSS warning'],
        correctIndex: 1,
        explanation: 'Vertical margins collapse to the larger single value (30px).',
      },
      prerequisiteIds: ['node-box-model'],
    },
  ],
  edges: [
    { id: 'e1', source: 'node-box-model', target: 'node-content', relationship: 'encloses', description: 'Center core of the box' },
    { id: 'e2', source: 'node-box-model', target: 'node-padding', relationship: 'buffers', description: 'Internal buffer around content' },
    { id: 'e3', source: 'node-box-model', target: 'node-border', relationship: 'frames', description: 'Boundary line around padding' },
    { id: 'e4', source: 'node-box-model', target: 'node-margin', relationship: 'spaces', description: 'External spacing pushing outward' },
  ],
}

export const HTTP_REQUEST_MAP: KnowledgeMap = {
  id: 'map-http-request',
  topic: 'Explain how an HTTP request works',
  title: 'Anatomy of an HTTP Request / Response Cycle',
  description:
    'Visual 3D model of client-server communication over the web, from DNS and TCP handshake to headers, body, and status codes.',
  centralNodeId: 'node-http-cycle',
  createdAt: '2026-10-14T10:00:00Z',
  isDemo: true,
  demoNote: 'Predefined network architecture map',
  nodes: [
    {
      id: 'node-http-cycle',
      title: 'HTTP REQUEST',
      shortExplanation:
        'A stateless application-layer communication protocol where a client requests resources from an origin server and receives a response.',
      category: 'core',
      depth: 0,
      position: [0, 0, 0],
      color: '#38bdf8',
      size: 1.45,
      whyItMatters:
        'Every webpage, REST API, GraphQL query, and mobile app download travels via HTTP/HTTPS. It is the fundamental communication pipe of the internet.',
      commonMistakes: ['Thinking HTTP maintains persistent state by default without cookies or tokens.'],
      lessonSteps: [
        { stepNumber: 1, title: 'Request-Response Cycle', explanation: 'Client initiates -> Network transports -> Server processes -> Server responds.' },
      ],
      concreteExample: {
        code: 'GET /api/v1/lessons HTTP/1.1\nHost: api.example.com\nAccept: application/json',
        explanation: 'A clean GET request asking the server for JSON data.',
      },
      practiceQuestion: {
        question: 'Which protocol layer does HTTP reside on in the OSI model?',
        options: ['Physical layer', 'Transport layer (TCP)', 'Network layer (IP)', 'Application layer'],
        correctIndex: 3,
        explanation: 'HTTP is an Application Layer (Layer 7) protocol running on top of TCP.',
      },
      prerequisiteIds: [],
    },
    {
      id: 'node-methods',
      title: 'HTTP METHODS',
      shortExplanation: 'The verbs indicating the desired action: GET, POST, PUT, PATCH, DELETE.',
      category: 'syntax',
      depth: 1,
      position: [3.8, 1.8, 0.5],
      color: '#60a5fa',
      size: 0.95,
      whyItMatters: 'Enforces RESTful semantics: GET for retrieval (safe/idempotent), POST for creation, DELETE for removal.',
      commonMistakes: ['Using GET requests to modify database state.'],
      lessonSteps: [
        { stepNumber: 1, title: 'Safe vs Unsafe Methods', explanation: 'GET and HEAD do not mutate state; POST/PUT/DELETE modify data.' },
      ],
      practiceQuestion: {
        question: 'Which HTTP method should be used to retrieve data without altering server state?',
        options: ['POST', 'DELETE', 'GET', 'PATCH'],
        correctIndex: 2,
        explanation: 'GET requests are safe and idempotent data retrieval operations.',
      },
      prerequisiteIds: ['node-http-cycle'],
    },
    {
      id: 'node-headers',
      title: 'HEADERS & METADATA',
      shortExplanation: 'Key-value pairs carrying authentication tokens, content-type, caching directives, and cookies.',
      category: 'control',
      depth: 1,
      position: [-3.8, 1.6, -0.8],
      color: '#a78bfa',
      size: 0.95,
      whyItMatters: 'Headers tell the recipient how to parse the payload (e.g. `Content-Type: application/json`) and verify authorization.',
      commonMistakes: ['Forgetting to specify Content-Type: application/json when sending JSON payloads in POST bodies.'],
      lessonSteps: [
        { stepNumber: 1, title: 'Essential Headers', explanation: 'Authorization, Content-Type, Accept, Cache-Control, User-Agent.' },
      ],
      practiceQuestion: {
        question: 'What header tells the server what data format the client is sending?',
        options: ['Accept', 'Content-Type', 'User-Agent', 'Cache-Control'],
        correctIndex: 1,
        explanation: '`Content-Type` describes the media type of the transmitted resource.',
      },
      prerequisiteIds: ['node-http-cycle'],
    },
    {
      id: 'node-status-codes',
      title: 'STATUS CODES',
      shortExplanation: '3-digit numerical answers from the server: 2xx Success, 3xx Redirect, 4xx Client Error, 5xx Server Error.',
      category: 'foundation',
      depth: 1,
      position: [0.5, -3.2, 1.4],
      color: '#34d399',
      size: 0.9,
      whyItMatters: 'Status codes allow client code to react immediately to outcomes (200 OK, 401 Unauthorized, 404 Not Found, 500 Crash).',
      commonMistakes: ['Returning 200 OK with an error message inside the body instead of using proper 4xx/5xx codes.'],
      lessonSteps: [
        { stepNumber: 1, title: 'Status Classes', explanation: '200 = Success, 404 = Not Found, 401 = Unauthorized, 500 = Server Error.' },
      ],
      practiceQuestion: {
        question: 'Which status code signifies an unauthenticated client?',
        options: ['200', '404', '401', '503'],
        correctIndex: 2,
        explanation: '401 Unauthorized means authentication credentials are required or invalid.',
      },
      prerequisiteIds: ['node-http-cycle'],
    },
  ],
  edges: [
    { id: 'h1', source: 'node-http-cycle', target: 'node-methods', relationship: 'initiated_with', description: 'Every request declares an HTTP method verb' },
    { id: 'h2', source: 'node-http-cycle', target: 'node-headers', relationship: 'carries', description: 'Requests transmit metadata via headers' },
    { id: 'h3', source: 'node-http-cycle', target: 'node-status-codes', relationship: 'responds_with', description: 'Server answers with an explicit status code' },
  ],
}

import {
  PYTHON_VARIABLES_MAP,
  PYTHON_LISTS_MAP,
  PYTHON_FUNCTIONS_MAP,
  RECURSION_MAP,
  BINARY_SEARCH_MAP,
} from './expandedMaps'
import {
  PYTHON_DICTS_MAP,
  CLASSES_OBJECTS_MAP,
  HTML_FLEXBOX_MAP,
  DATABASE_INDEXES_MAP,
} from './csAndWebMaps'
import { PYTHON_MASTER_OVERVIEW_MAP } from './pythonMasterMaps'
import {
  PYTHON_FUNDAMENTALS_MAP,
  PYTHON_CONTROL_FLOW_MAP,
  PYTHON_DATA_STRUCTURES_MAP,
  PYTHON_FUNCTIONS_MODULES_MAP,
  PYTHON_ERRORS_FILES_MAP,
  PYTHON_OOP_MAP,
  PYTHON_ADVANCED_MAP,
  PYTHON_PROJECTS_MAP,
} from './pythonSectionMaps'

export const PREDEFINED_TOPICS: Record<string, KnowledgeMap> = {
  // Python Master Overview
  'python': PYTHON_MASTER_OVERVIEW_MAP,
  'python master': PYTHON_MASTER_OVERVIEW_MAP,
  'python overview': PYTHON_MASTER_OVERVIEW_MAP,
  'python curriculum': PYTHON_MASTER_OVERVIEW_MAP,
  'python programming master curriculum': PYTHON_MASTER_OVERVIEW_MAP,
  'learn python': PYTHON_MASTER_OVERVIEW_MAP,

  // Section A: Python Fundamentals
  'python fundamentals': PYTHON_FUNDAMENTALS_MAP,
  'fundamentals of python': PYTHON_FUNDAMENTALS_MAP,
  'section a: python fundamentals': PYTHON_FUNDAMENTALS_MAP,

  // Section B: Control Flow
  'python control flow': PYTHON_CONTROL_FLOW_MAP,
  'control flow in python': PYTHON_CONTROL_FLOW_MAP,
  'control flow': PYTHON_CONTROL_FLOW_MAP,
  'section b: control flow': PYTHON_CONTROL_FLOW_MAP,

  // Section C: Data Structures
  'python data structures': PYTHON_DATA_STRUCTURES_MAP,
  'data structures in python': PYTHON_DATA_STRUCTURES_MAP,
  'data structures': PYTHON_DATA_STRUCTURES_MAP,
  'section c: data structures': PYTHON_DATA_STRUCTURES_MAP,

  // Section D: Functions & Modules
  'python functions and modules': PYTHON_FUNCTIONS_MODULES_MAP,
  'functions and modules': PYTHON_FUNCTIONS_MODULES_MAP,
  'functions and modules in python': PYTHON_FUNCTIONS_MODULES_MAP,
  'section d: functions and modules': PYTHON_FUNCTIONS_MODULES_MAP,

  // Section E: Errors & Files
  'python error handling and files': PYTHON_ERRORS_FILES_MAP,
  'error handling and files': PYTHON_ERRORS_FILES_MAP,
  'python error handling': PYTHON_ERRORS_FILES_MAP,
  'error handling in python': PYTHON_ERRORS_FILES_MAP,
  'section e: error handling and files': PYTHON_ERRORS_FILES_MAP,

  // Section F: Object-Oriented Programming (OOP)
  'python oop': PYTHON_OOP_MAP,
  'python oop architecture': PYTHON_OOP_MAP,
  'section f: object-oriented programming': PYTHON_OOP_MAP,

  // Section G: Advanced Python
  'advanced python': PYTHON_ADVANCED_MAP,
  'python advanced': PYTHON_ADVANCED_MAP,
  'intermediate and advanced python': PYTHON_ADVANCED_MAP,
  'section g: intermediate and advanced python': PYTHON_ADVANCED_MAP,

  // Section H: Practical Projects
  'practical python projects': PYTHON_PROJECTS_MAP,
  'python practical projects': PYTHON_PROJECTS_MAP,
  'python projects': PYTHON_PROJECTS_MAP,
  'projects in python': PYTHON_PROJECTS_MAP,
  'section h: practical python projects': PYTHON_PROJECTS_MAP,

  // Python Loops
  'explain loops in python': PYTHON_LOOPS_MAP,
  'explain what a loop is in python': PYTHON_LOOPS_MAP,
  'loops in python': PYTHON_LOOPS_MAP,
  'python loops': PYTHON_LOOPS_MAP,
  'loops': PYTHON_LOOPS_MAP,
  'loop': PYTHON_LOOPS_MAP,
  'python loop': PYTHON_LOOPS_MAP,
  'loop in python': PYTHON_LOOPS_MAP,
  'explain loop in python': PYTHON_LOOPS_MAP,
  'explain loop': PYTHON_LOOPS_MAP,
  'what is a loop': PYTHON_LOOPS_MAP,
  'what is a loop in python': PYTHON_LOOPS_MAP,

  // Python Variables
  'explain python variables': PYTHON_VARIABLES_MAP,
  'python variables': PYTHON_VARIABLES_MAP,
  'variables in python': PYTHON_VARIABLES_MAP,
  'variables': PYTHON_VARIABLES_MAP,
  'variable': PYTHON_VARIABLES_MAP,
  'python variable': PYTHON_VARIABLES_MAP,
  'variable in python': PYTHON_VARIABLES_MAP,
  'explain variable': PYTHON_VARIABLES_MAP,
  'explain variable in python': PYTHON_VARIABLES_MAP,
  'what is a variable': PYTHON_VARIABLES_MAP,
  'what is a variable in python': PYTHON_VARIABLES_MAP,

  // Python Lists
  'what are python lists': PYTHON_LISTS_MAP,
  'explain python lists': PYTHON_LISTS_MAP,
  'python lists': PYTHON_LISTS_MAP,
  'lists in python': PYTHON_LISTS_MAP,
  'lists': PYTHON_LISTS_MAP,
  'list': PYTHON_LISTS_MAP,
  'python list': PYTHON_LISTS_MAP,
  'list in python': PYTHON_LISTS_MAP,
  'explain list': PYTHON_LISTS_MAP,
  'explain lists': PYTHON_LISTS_MAP,
  'explain python list': PYTHON_LISTS_MAP,
  'what is a list': PYTHON_LISTS_MAP,
  'what is a python list': PYTHON_LISTS_MAP,
  'what is a list in python': PYTHON_LISTS_MAP,

  // Python Functions
  'explain functions in python': PYTHON_FUNCTIONS_MAP,
  'python functions': PYTHON_FUNCTIONS_MAP,
  'functions in python': PYTHON_FUNCTIONS_MAP,
  'functions': PYTHON_FUNCTIONS_MAP,
  'function': PYTHON_FUNCTIONS_MAP,
  'python function': PYTHON_FUNCTIONS_MAP,
  'function in python': PYTHON_FUNCTIONS_MAP,
  'explain function': PYTHON_FUNCTIONS_MAP,
  'explain function in python': PYTHON_FUNCTIONS_MAP,
  'what is a function': PYTHON_FUNCTIONS_MAP,
  'what is a function in python': PYTHON_FUNCTIONS_MAP,

  // Recursion
  'explain recursion': RECURSION_MAP,
  'explain recursion using an animated example': RECURSION_MAP,
  'recursion in python': RECURSION_MAP,
  'recursion': RECURSION_MAP,
  'what is recursion': RECURSION_MAP,

  // Dictionaries
  'what is a dictionary in python': PYTHON_DICTS_MAP,
  'explain python dictionaries': PYTHON_DICTS_MAP,
  'python dictionary': PYTHON_DICTS_MAP,
  'dictionaries': PYTHON_DICTS_MAP,
  'dictionary': PYTHON_DICTS_MAP,
  'dictionaries in python': PYTHON_DICTS_MAP,
  'python dict': PYTHON_DICTS_MAP,
  'python dicts': PYTHON_DICTS_MAP,
  'dict': PYTHON_DICTS_MAP,
  'dicts': PYTHON_DICTS_MAP,
  'dict in python': PYTHON_DICTS_MAP,
  'explain dictionary': PYTHON_DICTS_MAP,
  'explain dict': PYTHON_DICTS_MAP,
  'what is a dict in python': PYTHON_DICTS_MAP,
  'what is a dictionary': PYTHON_DICTS_MAP,

  // Classes and Objects (OOP)
  'explain classes and objects': CLASSES_OBJECTS_MAP,
  'classes and objects': CLASSES_OBJECTS_MAP,
  'python classes': CLASSES_OBJECTS_MAP,
  'oop in python': CLASSES_OBJECTS_MAP,
  'class': CLASSES_OBJECTS_MAP,
  'classes': CLASSES_OBJECTS_MAP,
  'object': CLASSES_OBJECTS_MAP,
  'objects': CLASSES_OBJECTS_MAP,
  'python object': CLASSES_OBJECTS_MAP,
  'python objects': CLASSES_OBJECTS_MAP,
  'oop': CLASSES_OBJECTS_MAP,
  'object oriented programming': CLASSES_OBJECTS_MAP,
  'explain oop': CLASSES_OBJECTS_MAP,

  // Binary Search
  'explain binary search': BINARY_SEARCH_MAP,
  'binary search': BINARY_SEARCH_MAP,

  // HTML Flexbox
  'explain html flexbox': HTML_FLEXBOX_MAP,
  'html flexbox': HTML_FLEXBOX_MAP,
  'flexbox': HTML_FLEXBOX_MAP,
  'css flexbox': HTML_FLEXBOX_MAP,

  // CSS Box Model
  'explain the html box model': HTML_BOX_MODEL_MAP,
  'explain the css box model': HTML_BOX_MODEL_MAP,
  'html box model': HTML_BOX_MODEL_MAP,
  'css box model': HTML_BOX_MODEL_MAP,
  'box model': HTML_BOX_MODEL_MAP,

  // HTTP Requests
  'explain how an http request works': HTTP_REQUEST_MAP,
  'explain http requests': HTTP_REQUEST_MAP,
  'http request': HTTP_REQUEST_MAP,
  'how http works': HTTP_REQUEST_MAP,

  // Database Indexes
  'explain database indexes': DATABASE_INDEXES_MAP,
  'database indexes': DATABASE_INDEXES_MAP,
  'db indexes': DATABASE_INDEXES_MAP,

  // Bitwise Left Shift
  'explain binary left shift': BINARY_LEFT_SHIFT_MAP,
  'binary left shift': BINARY_LEFT_SHIFT_MAP,
  'left shift': BINARY_LEFT_SHIFT_MAP,
}

export function findPredefinedMap(query: string): KnowledgeMap | null {
  const normalized = query
    .trim()
    .toLowerCase()
    .replace(/[?.!]+$/, '')
    .trim()

  if (PREDEFINED_TOPICS[normalized]) {
    return PREDEFINED_TOPICS[normalized]
  }

  // Exact matching without common conversational prefixes
  const stripped = normalized
    .replace(/^(explain|what is|what are|how do|how does|learn|teach me about|explore)\s+/i, '')
    .replace(/^(a|an|the)\s+/i, '')
    .trim()

  if (PREDEFINED_TOPICS[stripped]) {
    return PREDEFINED_TOPICS[stripped]
  }

  // Singular and plural variants
  const singular = stripped.endsWith('ies')
    ? stripped.slice(0, -3) + 'y'
    : stripped.endsWith('s') && !stripped.endsWith('ss')
    ? stripped.slice(0, -1)
    : stripped
  const plural = stripped.endsWith('y')
    ? stripped.slice(0, -1) + 'ies'
    : stripped.endsWith('s')
    ? stripped
    : `${stripped}s`

  if (PREDEFINED_TOPICS[singular]) {
    return PREDEFINED_TOPICS[singular]
  }
  if (PREDEFINED_TOPICS[plural]) {
    return PREDEFINED_TOPICS[plural]
  }

  // Exact matching against map topics or titles
  for (const map of Object.values(PREDEFINED_TOPICS)) {
    const mapTopic = map.topic.toLowerCase().replace(/[?.!]+$/, '').trim()
    const mapTitle = map.title.toLowerCase().replace(/[?.!]+$/, '').trim()
    if (
      normalized === mapTopic ||
      stripped === mapTopic ||
      singular === mapTopic ||
      plural === mapTopic ||
      normalized === mapTitle ||
      stripped === mapTitle ||
      singular === mapTitle ||
      plural === mapTitle
    ) {
      return map
    }
  }

  return null
}
