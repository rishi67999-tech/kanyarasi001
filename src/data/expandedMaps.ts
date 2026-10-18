import type { KnowledgeMap } from '../types/knowledge'

// 1. PYTHON VARIABLES KNOWLEDGE MAP
export const PYTHON_VARIABLES_MAP: KnowledgeMap = {
  id: 'map-python-variables',
  topic: 'Explain Python variables',
  title: 'Python Variables & Memory Binding',
  description:
    'A 3D spatial exploration of Python variables as named references pointing to dynamically allocated objects in heap memory.',
  centralNodeId: 'node-var-root',
  createdAt: '2026-10-15T00:00:00Z',
  isDemo: true,
  demoNote: 'Curated reference curriculum for Python variables',
  nodes: [
    {
      id: 'node-var-root',
      title: 'VARIABLES',
      shortExplanation: 'Named pointers or labels that reference data objects stored in computer memory.',
      category: 'core',
      depth: 0,
      position: [0, 0, 0],
      size: 1.45,
      color: '#38bdf8',
      beginnerExplanation:
        'Think of a variable as a sticky note or luggage tag attached to a box. The box holds the data (like a number or word), and the tag lets you find and use that data later.',
      intermediateExplanation:
        'Variables do not reserve static typed slots. Rather, names are bound in the current local or global symbol table dictionary (namespace), mapping identifier strings to PyObject pointers.',
      advancedDetails:
        'CPython optimizes local variable access using the fast-locals array (LOAD_FAST and STORE_FAST opcodes) indexed by integer offsets determined at compile time rather than performing dictionary lookups.',
      whyItMatters:
        'Variables allow programs to store, retrieve, and transform state dynamically. Without variables, programs could only compute static, hardcoded numbers.',
      practicalUseCases: [
        'Tracking game score and player health over time.',
        'Caching query results from an API.',
        'Storing user configuration parameters.',
      ],
      commonMistakes: [
        'Assuming variables hold the actual memory bytes directly instead of referencing objects.',
        'Starting variable names with numbers (e.g., `2count = 5` is invalid syntax).',
        'Confusing assignment (`=`) with mathematical equality check (`==`).',
      ],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Variable Binding',
          explanation: 'Assignment evaluates the right-hand side first, creates an object, and points the left-hand name to it.',
          codeSnippet: 'score = 100\nplayer_name = "Alice"',
        },
        {
          stepNumber: 2,
          title: 'Dynamic Re-binding',
          explanation: 'A variable can be rebound to an object of a completely different data type at any time.',
          codeSnippet: 'data = 42      # initially an integer\ndata = "forty" # rebound to a string',
        },
      ],
      concreteExample: {
        code: 'score = 10\nbonus = 5\ntotal = score + bonus\nprint(f"Total: {total}")',
        explanation: 'Variables score and bonus are added together, and the result is bound to total.',
        expectedOutput: 'Total: 15',
        trace: {
          code: 'score = 10\nbonus = 5\ntotal = score + bonus\nprint(f"Total: {total}")',
          language: 'python',
          explanation: 'Trace the creation and modification of variable bindings in memory.',
          steps: [
            {
              step: 1,
              line: 1,
              variables: { score: 10 },
              output: '',
              description: 'Variable `score` is created and bound to integer object 10.',
            },
            {
              step: 2,
              line: 2,
              variables: { score: 10, bonus: 5 },
              output: '',
              description: 'Variable `bonus` is created and bound to integer object 5.',
            },
            {
              step: 3,
              line: 3,
              variables: { score: 10, bonus: 5, total: 15 },
              output: '',
              description: 'Expression `score + bonus` evaluates to 15; variable `total` is bound to 15.',
            },
            {
              step: 4,
              line: 4,
              variables: { score: 10, bonus: 5, total: 15 },
              output: 'Total: 15\n',
              description: '`print()` outputs the formatted string containing total.',
            },
          ],
        },
      },
      edgeCases: [
        'Rebinding a variable creates a new reference; it does not overwrite the old object if other references point to it.',
        'CPython interns small integers (-5 to 256) and ASCII identifier strings, so `a is b` evaluates to True for those values.',
        'In-place modification of mutable objects (x += [1]) alters the underlying object in place, affecting all aliased variables.',
      ],
      intermediateExample: {
        code: `# Object aliasing vs independent copy
original = [1, 2, 3]
alias = original           # points to the SAME list
clone = original.copy()    # creates a NEW list in memory

alias.append(4)
print(f"Original: {original}")
print(f"Clone:    {clone}")`,
        explanation: 'Mutating via `alias` changes `original`, but `clone` remains completely isolated.',
        expectedOutput: 'Original: [1, 2, 3, 4]\nClone:    [1, 2, 3]',
      },
      advancedExample: {
        code: `import sys

# Inspect reference counts and memory addresses
x = "antigravity_unique_string"
print(f"Memory address: {hex(id(x))}")
print(f"Refcount: {sys.getrefcount(x) - 1}") # subtract getrefcount temporary ref`,
        explanation: 'Every Python variable references a PyObject containing refcount and ob_type pointers.',
        expectedOutput: 'Memory address: 0x..., Refcount: 1',
      },
      practiceQuestion: {
        question: 'In Python, what happens when you write `x = 5` then `x = "hello"`?',
        options: [
          'Python throws a TypeError because x already has an integer type',
          'The variable x is rebound to a new string object "hello"',
          'The number 5 is converted into the string "5"',
          'The program creates two separate variables named x',
        ],
        correctIndex: 1,
        explanation:
          'Python is dynamically typed: variable names are simply references, and can be freely rebound to objects of different types.',
        difficulty: 'easy',
        type: 'mcq',
        hint: 'Python variables are name tags, not typed memory boxes.',
      },
      practiceQuestions: [
        {
          id: 'q-var-1',
          question: 'In Python, what happens when you write `x = 5` then `x = "hello"`?',
          options: [
            'Python throws a TypeError because x already has an integer type',
            'The variable x is rebound to a new string object "hello"',
            'The number 5 is converted into the string "5"',
            'The program creates two separate variables named x',
          ],
          correctIndex: 1,
          explanation:
            'Python is dynamically typed: variable names are simply references, and can be freely rebound to objects of different types.',
          difficulty: 'easy',
          type: 'mcq',
          hint: 'Python variables are name tags, not typed memory boxes.',
        },
        {
          id: 'q-var-2',
          question: 'What is the output of this Python simultaneous assignment?',
          codeSnippet: `a, b = 1, 2\na, b = b, a\nprint(f"{a} {b}")`,
          options: ['2 1', '1 2', '2 2', '1 1'],
          correctIndex: 0,
          explanation:
            'Python evaluates all right-hand side expressions first into a temporary tuple (2, 1) before unpacking and assigning to a and b, enabling swap without a temp variable.',
          difficulty: 'easy',
          type: 'output_prediction',
          hint: 'Right side evaluates completely into a temporary tuple before assignment occurs.',
        },
        {
          id: 'q-var-3',
          question: 'What will be printed by the following code demonstrating aliasing?',
          codeSnippet: `a = [10, 20]\nb = a\nb.append(30)\nprint(a)`,
          options: [
            '[10, 20, 30]',
            '[10, 20]',
            '[30]',
            'TypeError: list aliasing forbidden',
          ],
          correctIndex: 0,
          explanation:
            'Both `a` and `b` reference the exact same list in heap memory (`a is b` is True). Mutating the list via `b` reflects when inspecting `a`.',
          difficulty: 'medium',
          type: 'output_prediction',
          hint: 'Remember: assignment copies the object reference, not the list contents.',
        },
        {
          id: 'q-var-4',
          question: 'Identify the error that occurs when running this function:',
          codeSnippet: `total = 100\ndef add_tax():\n    total += 10\n    return total\nadd_tax()`,
          options: [
            'UnboundLocalError: local variable "total" referenced before assignment',
            'NameError: global total is read-only',
            'TypeError: unsupported operand for integer and function',
            'The code runs cleanly and returns 110',
          ],
          correctIndex: 0,
          explanation:
            'Because `total` is assigned within `add_tax` (`+=`), Python marks `total` as a local variable. Trying to read it before local assignment triggers UnboundLocalError unless `global total` is declared.',
          difficulty: 'medium',
          type: 'debugging',
          hint: 'In-place assignment inside a function causes Python to treat the variable as local.',
        },
        {
          id: 'q-var-5',
          question: 'What is the output of this conditional using the walrus operator `:=`?',
          codeSnippet: `text = "Knowledge"\nif (n := len(text)) > 5:\n    print(f"Length is {n}")`,
          options: [
            'Length is 9',
            'Length is 5',
            'True',
            'SyntaxError',
          ],
          correctIndex: 0,
          explanation:
            'The walrus operator `:=` assigns `len("Knowledge")` (which is 9) to `n` within the expression and returns 9. Since 9 > 5 is True, the body prints "Length is 9".',
          difficulty: 'challenging',
          type: 'output_prediction',
          hint: 'The walrus operator assigns and returns the value in a single expression.',
        },
        {
          id: 'q-var-6',
          question: 'Why does `a = 256; b = 256; a is b` evaluate to True in CPython, but `a = 9999; b = 9999; a is b` may evaluate to False?',
          options: [
            'CPython pre-allocates and interns small integer objects from -5 to 256',
            'Numbers above 1000 are allocated on the GPU rather than the CPU heap',
            'Large integers use 128-bit IEEE arithmetic which disables pointer comparisons',
            'The `is` operator is deprecated for integers above 256 in Python 3.10+',
          ],
          correctIndex: 0,
          explanation:
            'CPython caches small integers in the range [-5, 256] at startup. Any reference to these values shares the same pre-allocated singleton PyObject in memory.',
          difficulty: 'challenging',
          type: 'mcq',
          hint: 'CPython optimizes frequently used small numbers with an internal global array.',
        },
      ],
    },
    {
      id: 'node-var-assignment',
      title: 'ASSIGNMENT (=)',
      shortExplanation: 'The operator that binds a name to the result of an evaluated expression.',
      category: 'syntax',
      depth: 1,
      position: [4.2, 1.8, 1.0],
      size: 0.95,
      color: '#60a5fa',
      beginnerExplanation:
        'The `=` sign does not mean "are equal". It means "evaluate whatever is on the right side, and put the label on the left side on it".',
      whyItMatters: 'Assignment is the primary mechanism for state transition in procedural code.',
      commonMistakes: ['Writing `10 = x` instead of `x = 10`.'],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Right-to-Left Evaluation',
          explanation: 'Python fully calculates the right expression before modifying the variable reference.',
          codeSnippet: 'count = 1\ncount = count + 1 # right side evaluates to 2 first',
        },
      ],
      practiceQuestion: {
        question: 'Which assignment statement is syntactically invalid in Python?',
        options: ['user_age = 25', 'total = count = 0', '100 = score', 'x, y = 1, 2'],
        correctIndex: 2,
        explanation: 'The left side of an assignment must be a valid variable identifier or target, not a literal number.',
      },
      prerequisiteIds: ['node-var-root'],
    },
    {
      id: 'node-var-types',
      title: 'DYNAMIC TYPING',
      shortExplanation: 'Type information is attached to the object in memory, not the variable name.',
      category: 'foundation',
      depth: 1,
      position: [-4.2, 1.8, -1.0],
      size: 0.95,
      color: '#a78bfa',
      beginnerExplanation:
        'In some languages you must say "this variable can only hold numbers". In Python, variables are flexible tags that can stick to any kind of data.',
      whyItMatters: 'Enables rapid development, duck typing, and polymorphic functions.',
      commonMistakes: ['Assuming Python is weakly typed: Python is dynamically typed but strongly typed.'],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Objects Have Types, Names Do Not',
          explanation: 'Use type() to inspect the object currently bound to a variable.',
          codeSnippet: 'v = 3.14\nprint(type(v)) # <class "float">',
        },
      ],
      practiceQuestion: {
        question: 'What does the phrase "Python is strongly, dynamically typed" mean?',
        options: [
          'Variables must be declared with their type, but types can change',
          'Variables can hold any object, and operations respect the explicit types of objects without implicit coercion',
          'All numbers are converted into strings automatically',
          'Types are only checked when deploying code',
        ],
        correctIndex: 1,
        explanation:
          'Dynamic typing means types are bound at runtime; strong typing means operations like `"5" + 2` will raise a TypeError rather than coerce silently.',
      },
      prerequisiteIds: ['node-var-root'],
    },
    {
      id: 'node-var-naming',
      title: 'NAMING RULES (PEP 8)',
      shortExplanation: 'Identifier conventions: letters, numbers, underscores, and case sensitivity.',
      category: 'control',
      depth: 1,
      position: [0.5, 3.6, -2.0],
      size: 0.9,
      color: '#34d399',
      beginnerExplanation:
        'Variable names should describe what they hold, like `user_email` instead of `x`. Use lowercase words separated by underscores (`snake_case`).',
      whyItMatters: 'Readability is the primary tenet of the Zen of Python ("Readability counts").',
      commonMistakes: ['Using reserved keywords like `class`, `for`, `def` as variable names.'],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Allowed Characters',
          explanation: 'Must start with a letter (a-z, A-Z) or underscore (_). Cannot contain spaces or hyphens.',
          codeSnippet: 'valid_name = 1\n_private_var = 2\n# invalid-name = 3',
        },
      ],
      practiceQuestion: {
        question: 'Which of the following is a valid Python variable name?',
        options: ['user-name', '2nd_player', 'total_score', 'class'],
        correctIndex: 2,
        explanation:
          '`total_score` is valid snake_case. `user-name` has a hyphen, `2nd_player` starts with a digit, and `class` is a reserved keyword.',
      },
      prerequisiteIds: ['node-var-root'],
    },
    {
      id: 'node-var-memory',
      title: 'MEMORY REFERENCES & ID',
      shortExplanation: 'How multiple variables can point to the same underlying object in memory.',
      category: 'advanced',
      depth: 2,
      position: [3.4, -2.8, -1.5],
      size: 0.85,
      color: '#fbbf24',
      beginnerExplanation:
        'If two people put their name tags on the exact same bicycle, both names refer to that one bicycle. Painting the bicycle changes it for both.',
      whyItMatters: 'Crucial for understanding mutable object sharing in functions and avoiding aliasing bugs.',
      commonMistakes: ['Thinking `a = b` creates a fresh independent clone for mutable lists.'],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'The id() Function and `is` Operator',
          explanation: '`id(obj)` returns the memory address. The `is` operator checks if two variables point to the same memory address.',
          codeSnippet: 'a = [1, 2]\nb = a\nprint(a is b) # True: same object in memory',
        },
      ],
      practiceQuestion: {
        question: 'If `a = [1, 2, 3]` and `b = a`, what is the value of `b` after `a.append(4)`?',
        options: ['[1, 2, 3]', '[1, 2, 3, 4]', 'None', 'An error occurs'],
        correctIndex: 1,
        explanation: 'Both `a` and `b` reference the identical list in memory, so modifying the list via `a` is reflected when accessing `b`.',
      },
      prerequisiteIds: ['node-var-types'],
    },
  ],
  edges: [
    { id: 'ev1', source: 'node-var-root', target: 'node-var-assignment', relationship: 'initialized_via', description: 'Variables are bound to objects using assignment.' },
    { id: 'ev2', source: 'node-var-root', target: 'node-var-types', relationship: 'typed_dynamically', description: 'Variable names bind dynamically to typed objects.' },
    { id: 'ev3', source: 'node-var-root', target: 'node-var-naming', relationship: 'governed_by', description: 'Variable identifiers must obey PEP 8 syntax rules.' },
    { id: 'ev4', source: 'node-var-types', target: 'node-var-memory', relationship: 'references', description: 'Dynamic types point to underlying heap memory addresses.' },
  ],
}

// 2. PYTHON LISTS KNOWLEDGE MAP
export const PYTHON_LISTS_MAP: KnowledgeMap = {
  id: 'map-python-lists',
  topic: 'What are Python lists',
  title: 'Python Lists & Sequence Architecture',
  description:
    'A 3D spatial decomposition of Python lists: ordered, mutable, dynamic arrays supporting slicing, comprehension, and methods.',
  centralNodeId: 'node-lists-root',
  createdAt: '2026-10-15T00:00:00Z',
  isDemo: true,
  demoNote: 'Curated reference curriculum for Python lists',
  nodes: [
    {
      id: 'node-lists-root',
      title: 'LISTS',
      shortExplanation: 'Ordered, mutable containers capable of storing heterogeneous data elements.',
      category: 'core',
      depth: 0,
      position: [0, 0, 0],
      size: 1.45,
      color: '#38bdf8',
      beginnerExplanation:
        'A list is like an ordered grocery cart. You can put items in, take items out, reorder them, and check what is at spot #1 or #2.',
      intermediateExplanation:
        'Lists are implemented in CPython as dynamic arrays of pointers. They provide O(1) amortized appending and O(1) indexed lookup.',
      advancedDetails:
        'CPython over-allocates memory slots (`0, 4, 8, 16, 24...`) when appending to avoid reallocating on every insert.',
      whyItMatters: 'Lists are the most widely used collection in Python for organizing sequences of data.',
      practicalUseCases: [
        'Holding a series of sensor readings over time.',
        'Managing a queue of tasks in a background worker.',
        'Filtering rows of table data.',
      ],
      commonMistakes: [
        'Attempting to access an index that does not exist (`IndexError: list index out of range`).',
        'Mutating a list while iterating over it with a `for` loop.',
      ],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Creating a List',
          explanation: 'Use square brackets `[]` with comma-separated values.',
          codeSnippet: 'fruits = ["apple", "banana", "cherry"]',
        },
        {
          stepNumber: 2,
          title: 'Appending & Mutating',
          explanation: 'Lists can grow dynamically at runtime using `.append()` and `.pop()`.',
          codeSnippet: 'fruits.append("orange")\nprint(len(fruits)) # 4',
        },
      ],
      concreteExample: {
        code: 'nums = [10, 20]\nnums.append(30)\nfirst = nums[0]\nprint(f"First: {first}, Total: {len(nums)}")',
        explanation: 'Creates a list, appends 30, retrieves the first element, and prints.',
        expectedOutput: 'First: 10, Total: 3',
        trace: {
          code: 'nums = [10, 20]\nnums.append(30)\nfirst = nums[0]\nprint(f"First: {first}")',
          language: 'python',
          explanation: 'Step through list creation, append mutation, and zero-based index access.',
          steps: [
            {
              step: 1,
              line: 1,
              variables: { nums: '[10, 20]', 'len(nums)': 2 },
              output: '',
              description: 'List `nums` initialized with elements [10, 20].',
            },
            {
              step: 2,
              line: 2,
              variables: { nums: '[10, 20, 30]', 'len(nums)': 3 },
              output: '',
              description: '`nums.append(30)` inserts 30 at the end of the array.',
            },
            {
              step: 3,
              line: 3,
              variables: { nums: '[10, 20, 30]', first: 10 },
              output: '',
              description: '`nums[0]` accesses the first element at index 0 (10).',
            },
            {
              step: 4,
              line: 4,
              variables: { nums: '[10, 20, 30]', first: 10 },
              output: 'First: 10\n',
              description: 'Stdout outputs "First: 10".',
            },
          ],
        },
      },
      edgeCases: [
        'List multiplication with nested lists (`[[0]*3]*3`) creates 3 references to the SAME inner list.',
        '`.sort()` modifies in place and returns `None`; `sorted()` returns a new list without touching the input.',
        'Inserting at index 0 requires shifting all N pointers in memory, taking O(N) linear time compared to O(1) append.',
      ],
      intermediateExample: {
        code: `# Slicing, filtering, and reversing a list
data = [10, 25, 30, 45, 50, 65]
even_indices = data[::2]        # [10, 30, 50]
reversed_copy = data[::-1]      # [65, 50, 45, 30, 25, 10]
print("Evens:", even_indices)
print("Reversed:", reversed_copy[:3])`,
        explanation: 'Extended slice syntax [start:stop:step] creates fast, optimized copies of sub-sequences.',
        expectedOutput: 'Evens: [10, 30, 50]\nReversed: [65, 50, 45]',
      },
      advancedExample: {
        code: `import sys

# Inspect dynamic array growth and memory over-allocation
items = []
sizes = []
for i in range(10):
    sizes.append((len(items), sys.getsizeof(items)))
    items.append(i)

print("Length vs Allocated Bytes (first 5):", sizes[:5])`,
        explanation: 'CPython over-allocates list capacity in geometric jumps to achieve O(1) amortized append time.',
        expectedOutput: 'Length vs Allocated Bytes (first 5): [(0, 56), (1, 88), (2, 88), (3, 88), (4, 88)]',
      },
      practiceQuestion: {
        question: 'What is the index of the first element in a Python list?',
        options: ['1', '0', '-1', 'null'],
        correctIndex: 1,
        explanation: 'Python uses zero-based indexing: the first item is always at index 0.',
        difficulty: 'easy',
        type: 'mcq',
        hint: 'Like most modern languages, Python counts sequence positions starting from zero.',
      },
      practiceQuestions: [
        {
          id: 'q-list-1',
          question: 'What is the index of the first element in a Python list?',
          options: ['1', '0', '-1', 'null'],
          correctIndex: 1,
          explanation: 'Python uses zero-based indexing: the first item is always at index 0.',
          difficulty: 'easy',
          type: 'mcq',
          hint: 'Python starts counting element positions from zero.',
        },
        {
          id: 'q-list-2',
          question: 'What is the output of `nums[-1]` on a non-empty list `[10, 20, 30]`?',
          options: ['30', '10', 'IndexError', '-30'],
          correctIndex: 0,
          explanation:
            'Negative indices in Python count backwards from the end of the sequence. `-1` always retrieves the final element.',
          difficulty: 'easy',
          type: 'output_prediction',
          hint: 'Negative indices wrap around from the end: -1 is the last item.',
        },
        {
          id: 'q-list-3',
          question: 'What is the output of this slice with step 2?',
          codeSnippet: `nums = [0, 1, 2, 3, 4, 5]\nprint(nums[1:5:2])`,
          options: ['[1, 3]', '[1, 2, 3, 4]', '[0, 2, 4]', '[2, 4]'],
          correctIndex: 0,
          explanation:
            'The slice starts at index 1 (value 1), steps by 2 (next index 3, value 3), and stops before index 5.',
          difficulty: 'medium',
          type: 'output_prediction',
          hint: 'Start at index 1, add step 2: index 1 and index 3.',
        },
        {
          id: 'q-list-4',
          question: 'Identify the subtle bug in this 2D matrix initialization:',
          codeSnippet: `grid = [[0] * 2] * 2\ngrid[0][0] = 99\nprint(grid)`,
          options: [
            'All rows share the same inner list reference, resulting in [[99, 0], [99, 0]]',
            'Python raises TypeError: 2D lists cannot use multiplication',
            'Only grid[0][0] is changed, printing [[99, 0], [0, 0]]',
            'The matrix becomes a 1D list [99, 0, 0, 0]',
          ],
          correctIndex: 0,
          explanation:
            'Multiplying `[[0] * 2] * 2` copies the reference to the same inner list twice. Modifying row 0 mutates row 1 simultaneously. Use `[[0]*2 for _ in range(2)]` instead.',
          difficulty: 'medium',
          type: 'debugging',
          hint: 'The outer multiplication duplicates list references, not independent copies.',
        },
        {
          id: 'q-list-5',
          question: 'What does `print(res, nums)` output in the following snippet?',
          codeSnippet: `nums = [3, 1, 2]\nres = nums.sort()\nprint(res, nums)`,
          options: [
            'None [1, 2, 3]',
            '[1, 2, 3] [1, 2, 3]',
            '[1, 2, 3] [3, 1, 2]',
            'None [3, 1, 2]',
          ],
          correctIndex: 0,
          explanation:
            '`list.sort()` sorts the list in place and returns `None` by design to signal mutation. The original list `nums` is updated to [1, 2, 3].',
          difficulty: 'challenging',
          type: 'output_prediction',
          hint: 'In-place mutating methods in Python typically return None.',
        },
        {
          id: 'q-list-6',
          question: 'What is the time complexity of `list.append(x)` versus `list.insert(0, x)` in Python?',
          options: [
            'append is O(1) amortized, while insert(0) is O(N) linear because all existing elements must shift right in memory',
            'Both operations are O(1) constant time',
            'Both operations are O(N) linear time',
            'append is O(N) and insert(0) is O(1)',
          ],
          correctIndex: 0,
          explanation:
            'Lists are contiguous dynamic arrays. Appending adds to the end in O(1) amortized time, whereas inserting at position 0 forces CPython to shift every pointer by one offset (memmove).',
          difficulty: 'challenging',
          type: 'mcq',
          hint: 'Consider how contiguous array memory must be reordered when inserting at the beginning.',
        },
      ],
    },
    {
      id: 'node-list-indexing',
      title: 'INDEXING & SLICING',
      shortExplanation: 'Accessing single elements with `[i]` or sub-lists with `[start:stop:step]`.',
      category: 'syntax',
      depth: 1,
      position: [4.2, 1.8, 1.0],
      size: 0.95,
      color: '#60a5fa',
      beginnerExplanation:
        'Positive indexes count forward from 0. Negative indexes count backward from the end (`-1` is the last item!). Slicing cuts out a slice of the list.',
      whyItMatters: 'Enables instant extraction of sub-ranges without manual looping.',
      commonMistakes: ['Expecting `items[1:3]` to include index 3 (the stop boundary is excluded).'],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Slice Syntax',
          explanation: '`list[start:stop:step]` copies elements from start up to (but not including) stop.',
          codeSnippet: 'letters = ["a", "b", "c", "d"]\nprint(letters[1:3]) # ["b", "c"]\nprint(letters[::-1]) # reversed',
        },
      ],
      practiceQuestion: {
        question: 'What does `nums[-1]` return on a non-empty list `nums`?',
        options: [
          'The first element',
          'The last element',
          'A list containing negative numbers',
          'An IndexError',
        ],
        correctIndex: 1,
        explanation: 'Index -1 accesses the very last element of a sequence.',
      },
      prerequisiteIds: ['node-lists-root'],
    },
    {
      id: 'node-list-methods',
      title: 'MUTABILITY & METHODS',
      shortExplanation: 'In-place modifications: `.append()`, `.extend()`, `.insert()`, `.pop()`, `.sort()`.',
      category: 'application',
      depth: 1,
      position: [-4.2, 1.8, -1.0],
      size: 0.95,
      color: '#34d399',
      beginnerExplanation:
        'Because lists are mutable, you can add, change, or delete elements inside them without having to create an entirely new list.',
      whyItMatters: 'In-place modification saves memory and avoids expensive data copying.',
      commonMistakes: ['Writing `x = my_list.sort()` and expecting `x` to hold the list; `.sort()` modifies in-place and returns `None`!'],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Modifying In-Place',
          explanation: 'Methods like `.sort()` and `.reverse()` mutate the list in place and return None.',
          codeSnippet: 'items = [3, 1, 2]\nitems.sort()\nprint(items) # [1, 2, 3]',
        },
      ],
      practiceQuestion: {
        question: 'What is returned by calling `my_list.sort()` in Python?',
        options: ['A new sorted copy of the list', 'None', 'The length of the list', 'True'],
        correctIndex: 1,
        explanation: '`.sort()` mutates the list in-place and returns `None` to prevent accidental loss of references.',
      },
      prerequisiteIds: ['node-lists-root'],
    },
    {
      id: 'node-list-comprehensions',
      title: 'LIST COMPREHENSIONS',
      shortExplanation: 'Concise, declarative syntax for transforming and filtering sequences into new lists.',
      category: 'advanced',
      depth: 1,
      position: [0.5, -3.2, 1.4],
      size: 0.9,
      color: '#f472b6',
      beginnerExplanation:
        'Instead of creating an empty list, running a 4-line for-loop, and appending one by one, a comprehension lets you write: "make a list of all numbers squared".',
      whyItMatters: 'Comprehensions are faster than manual loops and idiomatic Python.',
      commonMistakes: ['Over-complicating comprehensions with 3+ nested conditions, hurting readability.'],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Comprehension Formula',
          explanation: '`[expression for item in iterable if condition]`',
          codeSnippet: 'squares = [x**2 for x in range(5) if x % 2 == 0]\n# [0, 4, 16]',
        },
      ],
      practiceQuestion: {
        question: 'What does `[n * 2 for n in [1, 2, 3]]` evaluate to?',
        options: ['[1, 2, 3, 1, 2, 3]', '[2, 4, 6]', '[2, 3, 4]', '[6]'],
        correctIndex: 1,
        explanation: 'Each element in `[1, 2, 3]` is multiplied by 2, producing `[2, 4, 6]`.',
      },
      prerequisiteIds: ['node-lists-root'],
    },
  ],
  edges: [
    { id: 'el1', source: 'node-lists-root', target: 'node-list-indexing', relationship: 'accessed_via', description: 'Elements inside lists are retrieved via index and slice syntax.' },
    { id: 'el2', source: 'node-lists-root', target: 'node-list-methods', relationship: 'mutated_by', description: 'Lists support in-place methods like append, pop, and sort.' },
    { id: 'el3', source: 'node-lists-root', target: 'node-list-comprehensions', relationship: 'constructed_with', description: 'Comprehensions provide declarative list construction.' },
  ],
}

// 3. PYTHON FUNCTIONS KNOWLEDGE MAP
export const PYTHON_FUNCTIONS_MAP: KnowledgeMap = {
  id: 'map-python-functions',
  topic: 'Explain functions in Python',
  title: 'Python Functions & Scope Anatomy',
  description:
    'A 3D spatial map of Python functions: reusable subroutines with parameters, return values, call stacks, and lexical scoping.',
  centralNodeId: 'node-func-root',
  createdAt: '2026-10-15T00:00:00Z',
  isDemo: true,
  demoNote: 'Curated reference curriculum for Python functions',
  nodes: [
    {
      id: 'node-func-root',
      title: 'FUNCTIONS (def)',
      shortExplanation: 'Named, reusable blocks of code that take inputs, perform operations, and return an output.',
      category: 'core',
      depth: 0,
      position: [0, 0, 0],
      size: 1.45,
      color: '#38bdf8',
      beginnerExplanation:
        'A function is like a recipe in a cookbook. You give it a name and write down instructions once. Whenever you want that dish, you just call its name with ingredients.',
      intermediateExplanation:
        'Functions are first-class objects in Python. They can be assigned to variables, passed as arguments to other functions, and returned from functions.',
      advancedDetails:
        'When a function is called, a new execution frame is pushed onto the Python call stack, allocating a local namespace for variables.',
      whyItMatters:
        'Functions eliminate duplicate code (DRY), make complex tasks manageable through modular abstraction, and make testing straightforward.',
      practicalUseCases: [
        'Calculating sales tax and discounts on an e-commerce order.',
        'Sanitizing user input strings before saving to a database.',
        'Reusable utility pipelines for data transformations.',
      ],
      commonMistakes: [
        'Forgetting the `return` statement; functions without `return` return `None` by default.',
        'Calling a function before defining it.',
        'Confusing parameters (in definition) with arguments (actual values passed).',
      ],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Defining a Function',
          explanation: 'Use the `def` keyword, followed by the function name, parentheses for parameters, and a colon.',
          codeSnippet: 'def greet(name):\n    return f"Hello, {name}!"',
        },
        {
          stepNumber: 2,
          title: 'Invoking the Function',
          explanation: 'Call the function by using its name followed by parentheses containing the arguments.',
          codeSnippet: 'msg = greet("World")\nprint(msg) # Hello, World!',
        },
      ],
      concreteExample: {
        code: 'def add(a, b):\n    return a + b\n\nresult = add(3, 4)\nprint(f"Result: {result}")',
        explanation: 'Defines add, calls it with 3 and 4, and prints the returned sum.',
        expectedOutput: 'Result: 7',
        trace: {
          code: 'def add(a, b):\n    return a + b\nresult = add(3, 4)\nprint(result)',
          language: 'python',
          explanation: 'Step through function definition, call frame invocation, return, and assignment.',
          steps: [
            {
              step: 1,
              line: 1,
              variables: { add: '<function add>' },
              output: '',
              description: 'Python defines function `add` and registers it in the global namespace.',
            },
            {
              step: 2,
              line: 3,
              variables: { 'call target': 'add(3, 4)' },
              output: '',
              description: 'Line 3 calls `add(3, 4)`. A new call frame is allocated.',
            },
            {
              step: 3,
              line: 2,
              variables: { a: 3, b: 4, 'return value': 7 },
              output: '',
              description: 'Inside `add`: arguments `a=3`, `b=4`. `return a + b` yields 7.',
            },
            {
              step: 4,
              line: 3,
              variables: { result: 7 },
              output: '',
              description: 'Call frame closes; returned value 7 is bound to `result`.',
            },
            {
              step: 5,
              line: 4,
              variables: { result: 7 },
              output: '7\n',
              description: '`print(result)` outputs 7 to the console.',
            },
          ],
        },
      },
      edgeCases: [
        'Default argument expressions evaluate ONCE at function definition time, not on every call (the mutable default trap).',
        'Functions without an explicit return statement return `None` implicitly upon completing the final instruction.',
        'LEGB scope resolution: assigning to a name inside a function shadows enclosing names unless declared `global` or `nonlocal`.',
      ],
      intermediateExample: {
        code: `# Higher-order function taking a callback comparator
def filter_and_transform(items, predicate, transform):
    return [transform(x) for x in items if predicate(x)]

nums = [1, 2, 3, 4, 5, 6]
evens_squared = filter_and_transform(nums, lambda x: x % 2 == 0, lambda x: x ** 2)
print("Evens squared:", evens_squared)`,
        explanation: 'Passing lambdas and functions as first-class citizens into higher-order processors.',
        expectedOutput: 'Evens squared: [4, 16, 36]',
      },
      advancedExample: {
        code: `# Closures preserving lexical scope and closure cells
def create_rate_limiter(max_per_sec):
    calls = []
    def allow_call(timestamp):
        nonlocal calls
        calls = [t for t in calls if timestamp - t < 1.0]
        if len(calls) < max_per_sec:
            calls.append(timestamp)
            return True
        return False
    return allow_call

limiter = create_rate_limiter(2)
print([limiter(0.1), limiter(0.2), limiter(0.3)])`,
        explanation: 'Enclosing state maintained inside the __closure__ tuple across invocations.',
        expectedOutput: '[True, True, False]',
      },
      practiceQuestion: {
        question: 'What is the return value of a Python function that does not contain a return statement?',
        options: ['0', 'False', 'None', 'An Empty String'],
        correctIndex: 2,
        explanation: 'In Python, any function that completes execution without a return statement implicitly returns None.',
        difficulty: 'easy',
        type: 'mcq',
        hint: 'Python functions always produce an object return, defaulting to the singleton None.',
      },
      practiceQuestions: [
        {
          id: 'q-func-1',
          question: 'What is the return value of a Python function that does not contain a return statement?',
          options: ['0', 'False', 'None', 'An Empty String'],
          correctIndex: 2,
          explanation:
            'In Python, any function that completes execution without a return statement implicitly returns None.',
          difficulty: 'easy',
          type: 'mcq',
          hint: 'Python functions always return an object, defaulting to None.',
        },
        {
          id: 'q-func-2',
          question: 'What does this function call with keyword arguments output?',
          codeSnippet: `def calc(x, y=5):\n    return x * y\nprint(calc(y=2, x=3))`,
          options: ['6', '15', '10', 'TypeError: arguments passed out of order'],
          correctIndex: 0,
          explanation:
            'Keyword arguments can be provided in any order: x receives 3 and y receives 2, returning 3 * 2 = 6.',
          difficulty: 'easy',
          type: 'output_prediction',
          hint: 'Keyword arguments bind by parameter name, regardless of position.',
        },
        {
          id: 'q-func-3',
          question: 'What is the output of calling this function twice with a mutable default argument?',
          codeSnippet: `def append_item(val, target=[]):\n    target.append(val)\n    return target\n\nappend_item("a")\nprint(append_item("b"))`,
          options: [
            "['a', 'b']",
            "['b']",
            "['a']",
            'TypeError: mutable default forbidden',
          ],
          correctIndex: 0,
          explanation:
            'Default argument expressions are evaluated once when the function is defined. The list `target` is reused across all subsequent calls, accumulating ["a", "b"].',
          difficulty: 'medium',
          type: 'debugging',
          hint: 'Default values in Python are created only once when `def` executes.',
        },
        {
          id: 'q-func-4',
          question: 'What does the `*args` syntax pack positional arguments into?',
          codeSnippet: `def count_items(*args):\n    return type(args).__name__\nprint(count_items(1, 2, 3))`,
          options: ['tuple', 'list', 'dict', 'generator'],
          correctIndex: 0,
          explanation:
            'In Python, `*args` packs variable positional parameters into an immutable `tuple`.',
          difficulty: 'medium',
          type: 'output_prediction',
          hint: 'Variable positional arguments are stored in an immutable sequence container.',
        },
        {
          id: 'q-func-5',
          question: 'What is the output of this closure factory function?',
          codeSnippet: `def make_multiplier(factor):\n    return lambda x: x * factor\n\ndouble = make_multiplier(2)\nprint(double(7))`,
          options: ['14', '7', '49', 'NameError: factor not defined in lambda'],
          correctIndex: 0,
          explanation:
            'The returned lambda forms a closure capturing `factor=2` from the enclosing scope. Calling `double(7)` evaluates 7 * 2 = 14.',
          difficulty: 'challenging',
          type: 'output_prediction',
          hint: 'Inner functions retain access to outer function variables via closures.',
        },
        {
          id: 'q-func-6',
          question: 'Where does CPython inspect the compiled bytecode and parameter metadata of a user function `my_func`?',
          options: [
            'In the `my_func.__code__` code object attribute',
            'In the `sys.call_stack` operating system register',
            'Inside `my_func.__dict__` only',
            'Python functions cannot be inspected at runtime',
          ],
          correctIndex: 0,
          explanation:
            'Functions expose a `__code__` attribute (CodeType object) storing bytecode (`co_code`), argument count (`co_argcount`), local variable names (`co_varnames`), and constants (`co_consts`).',
          difficulty: 'challenging',
          type: 'mcq',
          hint: 'Look for the special dunder attribute storing bytecode metadata.',
        },
      ],
    },
    {
      id: 'node-func-params',
      title: 'PARAMETERS & ARGUMENTS',
      shortExplanation: 'Positional, keyword, default parameters, and variable-length arguments (*args, **kwargs).',
      category: 'syntax',
      depth: 1,
      position: [4.2, 1.8, 1.0],
      size: 0.95,
      color: '#60a5fa',
      beginnerExplanation:
        'Parameters are the placeholder variables inside the function definition. Arguments are the actual values you pass in when calling it.',
      whyItMatters: 'Flexible parameters make functions adaptable across diverse use cases.',
      commonMistakes: ['Using a mutable object (like a list `[]`) as a default parameter value.'],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Default Parameters',
          explanation: 'Provide fallback values when arguments are omitted.',
          codeSnippet: 'def power(base, exp=2):\n    return base ** exp',
        },
      ],
      practiceQuestion: {
        question: 'Why should you avoid using a mutable default argument like `def append_to(item, target=[])`?',
        options: [
          'Python will raise a SyntaxError immediately',
          'The default list is created once at function definition time and shared across all calls',
          'Lists cannot be stored in function signatures',
          'It slows down internet connection speed',
        ],
        correctIndex: 1,
        explanation:
          'Default parameter values are evaluated once when the function is defined, so a mutable default list persists state between calls!',
      },
      prerequisiteIds: ['node-func-root'],
    },
    {
      id: 'node-func-scope',
      title: 'SCOPE & LEGB RULE',
      shortExplanation: 'Namespace resolution order: Local -> Enclosing -> Global -> Built-in.',
      category: 'foundation',
      depth: 1,
      position: [-4.2, 1.8, -1.0],
      size: 0.95,
      color: '#a78bfa',
      beginnerExplanation:
        'Variables created inside a function are like notes written in a private office. People outside the office cannot see or touch them.',
      whyItMatters: 'Scope isolation prevents variables in one function from accidentally colliding with or breaking another.',
      commonMistakes: ['Trying to modify a global variable inside a function without the `global` keyword.'],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'The LEGB Hierarchy',
          explanation: 'Python searches Local, then Enclosing closures, then Global module scope, then Built-ins.',
        },
      ],
      practiceQuestion: {
        question: 'Can code outside a function directly read a variable that was defined inside that function?',
        options: [
          'Yes, all variables are universally accessible',
          'No, local variables exist only while the function executes',
          'Only if the variable is a number',
          'Only in Python 3.12+',
        ],
        correctIndex: 1,
        explanation: 'Local variables are bound to the function execution frame and deleted when the function returns.',
      },
      prerequisiteIds: ['node-func-root'],
    },
    {
      id: 'node-func-first-class',
      title: 'FIRST-CLASS FUNCTIONS',
      shortExplanation: 'Functions can be passed as arguments, assigned to variables, and returned from functions.',
      category: 'advanced',
      depth: 1,
      position: [0.5, -3.2, 1.4],
      size: 0.9,
      color: '#fbbf24',
      beginnerExplanation:
        'Functions are not just code to run; they are objects you can pass around to other functions, just like numbers or strings.',
      whyItMatters: 'Powers functional patterns, decorators, callback handlers, and sorting keys.',
      commonMistakes: ['Writing `func()` when passing the function as a reference instead of `func` without parentheses.'],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Passing Functions as Callbacks',
          explanation: 'Functions can be passed directly as callback parameters without invoking them.',
          codeSnippet: 'names = ["Ada", "Alan", "Bob"]\nnames.sort(key=len) # passes the built-in len function',
        },
      ],
      practiceQuestion: {
        question: 'What is the difference between `f` and `f()` in Python?',
        options: [
          '`f` refers to the function object itself; `f()` executes the function and gets its return value',
          'They are completely identical',
          '`f` is for integers; `f()` is for strings',
          '`f` is deprecated syntax',
        ],
        correctIndex: 0,
        explanation: 'Omitting parentheses refers to the function object; parentheses trigger function execution.',
      },
      prerequisiteIds: ['node-func-root'],
    },
  ],
  edges: [
    { id: 'ef1', source: 'node-func-root', target: 'node-func-params', relationship: 'accepts', description: 'Functions declare parameters to receive arguments.' },
    { id: 'ef2', source: 'node-func-root', target: 'node-func-scope', relationship: 'isolates_with', description: 'Function invocations create isolated local scope frames.' },
    { id: 'ef3', source: 'node-func-root', target: 'node-func-first-class', relationship: 'operates_as', description: 'Functions operate as first-class citizen objects in Python.' },
  ],
}

// 4. RECURSION KNOWLEDGE MAP
export const RECURSION_MAP: KnowledgeMap = {
  id: 'map-recursion',
  topic: 'Explain recursion',
  title: 'Recursion & Call Stack Mechanics',
  description:
    'A 3D spatial model of recursion: self-referential algorithms governed by base cases, recursive steps, and call stack unwinding.',
  centralNodeId: 'node-rec-root',
  createdAt: '2026-10-15T00:00:00Z',
  isDemo: true,
  demoNote: 'Curated reference curriculum for Recursion',
  nodes: [
    {
      id: 'node-rec-root',
      title: 'RECURSION',
      shortExplanation: 'A problem-solving technique where a function solves a problem by calling smaller instances of itself.',
      category: 'core',
      depth: 0,
      position: [0, 0, 0],
      size: 1.45,
      color: '#38bdf8',
      beginnerExplanation:
        'Imagine Russian nesting dolls (Matryoshka). You open one doll to find a slightly smaller doll inside. You keep opening smaller dolls until you hit the solid baby doll (the base case) that cannot be opened.',
      intermediateExplanation:
        'Recursion breaks a complex problem into smaller sub-problems of identical structure. Every recursive algorithm requires two components: a Base Case and a Recursive Case.',
      advancedDetails:
        'Each call creates a stack frame on the execution stack. If recursion exceeds Python’s recursion limit (default 1000), a RecursionError: maximum recursion depth exceeded is raised.',
      whyItMatters:
        'Recursion is the natural and elegant way to traverse tree structures (file systems, HTML DOM, ASTs, binary search trees) and divide-and-conquer algorithms.',
      practicalUseCases: [
        'Traversing nested folders and files in an operating system directory tree.',
        'Parsing JSON or HTML nested document object models (DOM).',
        'Divide-and-conquer algorithms like Merge Sort and Quick Sort.',
      ],
      commonMistakes: [
        'Forgetting the base case, causing infinite recursion and stack overflow.',
        'Not moving toward the base case in the recursive step (e.g., calling `f(n)` instead of `f(n-1)`).',
      ],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'The Two Golden Rules of Recursion',
          explanation: 'Rule 1: Always have a base case that stops recursion.\nRule 2: Every recursive call must move closer to the base case.',
        },
        {
          stepNumber: 2,
          title: 'Stack Winding & Unwinding',
          explanation: 'Calls wind deeper onto the stack until the base case is hit, then unwind returning results back up.',
        },
      ],
      concreteExample: {
        code: 'def countdown(n):\n    if n <= 0:\n        print("Blastoff!")\n        return\n    print(n)\n    countdown(n - 1)\n\ncountdown(3)',
        explanation: 'Countdown calls itself with n-1 until n hits 0 (base case).',
        expectedOutput: '3\n2\n1\nBlastoff!',
        trace: {
          code: 'def countdown(n):\n    if n <= 0:\n        print("Blastoff!")\n        return\n    print(n)\n    countdown(n - 1)\ncountdown(3)',
          language: 'python',
          explanation: 'Watch recursive calls wind down from 3 to 0 and terminate cleanly at the base case.',
          steps: [
            {
              step: 1,
              line: 7,
              variables: { 'call': 'countdown(3)', 'stack depth': 1 },
              output: '',
              description: 'Initial call `countdown(3)` is pushed onto the stack.',
            },
            {
              step: 2,
              line: 5,
              variables: { n: 3, 'stack depth': 1 },
              output: '3\n',
              description: 'Inside `countdown(3)`: `3 <= 0` is False. Prints 3.',
            },
            {
              step: 3,
              line: 6,
              variables: { n: 3, 'next call': 'countdown(2)', 'stack depth': 2 },
              output: '3\n',
              description: 'Recursive step: Calls `countdown(2)`. New stack frame created.',
            },
            {
              step: 4,
              line: 5,
              variables: { n: 2, 'stack depth': 2 },
              output: '3\n2\n',
              description: 'Inside `countdown(2)`: `2 <= 0` is False. Prints 2.',
            },
            {
              step: 5,
              line: 6,
              variables: { n: 2, 'next call': 'countdown(1)', 'stack depth': 3 },
              output: '3\n2\n',
              description: 'Recursive step: Calls `countdown(1)`. New stack frame created.',
            },
            {
              step: 6,
              line: 5,
              variables: { n: 1, 'stack depth': 3 },
              output: '3\n2\n1\n',
              description: 'Inside `countdown(1)`: `1 <= 0` is False. Prints 1.',
            },
            {
              step: 7,
              line: 2,
              variables: { n: 0, 'stack depth': 4, condition: '0 <= 0 (True)' },
              output: '3\n2\n1\nBlastoff!\n',
              description: 'BASE CASE HIT! `countdown(0)` detects `n <= 0`. Prints "Blastoff!" and returns.',
            },
            {
              step: 8,
              line: 7,
              variables: { 'stack depth': 0, status: 'unwound' },
              output: '3\n2\n1\nBlastoff!\n',
              description: 'All stack frames pop and unwind. Execution completes.',
            },
          ],
        },
      },
      edgeCases: [
        'CPython does NOT support Tail Call Optimization (TCO); deep recursion always accumulates stack frames.',
        'Step decrements that skip the base case (e.g. n - 2 with base n == 0 starting from odd n) crash with RecursionError.',
        'Naive recursive tree algorithms (like Fibonacci) exhibit O(2^N) exponential time complexity due to redundant subtree recalculations.',
      ],
      intermediateExample: {
        code: `# Recursive tree directory / nested list flattening
def flatten_nested(items):
    result = []
    for item in items:
        if isinstance(item, list):
            result.extend(flatten_nested(item))
        else:
            result.append(item)
    return result

nested = [1, [2, [3, 4], 5], 6]
print("Flattened:", flatten_nested(nested))`,
        explanation: 'Recursion naturally handles arbitrary nested depths like file systems, ASTs, and JSON.',
        expectedOutput: 'Flattened: [1, 2, 3, 4, 5, 6]',
      },
      advancedExample: {
        code: `import functools, sys

# Memoization using lru_cache converts O(2^N) to O(N) linear time
@functools.lru_cache(maxsize=None)
def fib_memo(n):
    if n < 2:
        return n
    return fib_memo(n - 1) + fib_memo(n - 2)

print("Fib(30):", fib_memo(30))
print("Recursion Limit:", sys.getrecursionlimit())`,
        explanation: 'Caching recursive call frames eliminates redundant calls, achieving linear time.',
        expectedOutput: 'Fib(30): 832040\nRecursion Limit: 1000',
      },
      practiceQuestion: {
        question: 'What is the role of a "base case" in a recursive function?',
        options: [
          'To double the execution speed',
          'To stop the recursion and prevent an infinite loop',
          'To allocate global memory variables',
          'To convert strings into floating point numbers',
        ],
        correctIndex: 1,
        explanation: 'Without a base case, recursive functions call themselves endlessly until running out of memory (stack overflow).',
        difficulty: 'easy',
        type: 'mcq',
        hint: 'Think about what condition signals that the problem cannot be divided any further.',
      },
      practiceQuestions: [
        {
          id: 'q-rec-1',
          question: 'What is the role of a "base case" in a recursive function?',
          options: [
            'To double the execution speed',
            'To stop the recursion and prevent an infinite loop',
            'To allocate global memory variables',
            'To convert strings into floating point numbers',
          ],
          correctIndex: 1,
          explanation:
            'Without a base case, recursive functions call themselves endlessly until running out of stack memory (RecursionError).',
          difficulty: 'easy',
          type: 'mcq',
          hint: 'Think about the stopping condition that terminates calls.',
        },
        {
          id: 'q-rec-2',
          question: 'What is the output of this classic recursive factorial function for `fact(4)`?',
          codeSnippet: `def fact(n):\n    if n <= 1:\n        return 1\n    return n * fact(n - 1)\nprint(fact(4))`,
          options: ['24', '12', '10', '4'],
          correctIndex: 0,
          explanation:
            'fact(4) = 4 * fact(3) = 4 * 3 * fact(2) = 4 * 3 * 2 * fact(1) = 4 * 3 * 2 * 1 = 24.',
          difficulty: 'easy',
          type: 'output_prediction',
          hint: 'Multiply 4 * 3 * 2 * 1 as the stack frames unwind.',
        },
        {
          id: 'q-rec-3',
          question: 'What exception does Python raise when a recursive function exceeds the maximum call stack limit?',
          options: [
            'RecursionError: maximum recursion depth exceeded',
            'StackOverflowException',
            'MemoryError: heap exhausted',
            'InfiniteLoopWarning',
          ],
          correctIndex: 0,
          explanation:
            'In Python 3.5+, exceeding `sys.getrecursionlimit()` raises a `RecursionError` (a subclass of `RuntimeError`).',
          difficulty: 'medium',
          type: 'mcq',
          hint: 'Python provides a specific built-in exception named after recursion.',
        },
        {
          id: 'q-rec-4',
          question: 'Identify the bug that causes infinite recursion in this countdown:',
          codeSnippet: `def blastoff(n):\n    if n == 0:\n        print("Lift off!")\n        return\n    print(n)\n    blastoff(n) # recursive call`,
          options: [
            'The recursive call passes `n` instead of `n - 1`, never making progress toward the base case',
            'The base case condition must check if `n < 0` instead of `n == 0`',
            'Python cannot return None from a recursive function',
            'The print function cannot be placed before the recursive call',
          ],
          correctIndex: 0,
          explanation:
            'Every recursive call must move strictly closer to the base case. Calling `blastoff(n)` keeps `n` identical forever.',
          difficulty: 'medium',
          type: 'debugging',
          hint: 'Look at the argument being passed into `blastoff(...)` in line 6.',
        },
        {
          id: 'q-rec-5',
          question: 'What is the time complexity of the naive unmemoized Fibonacci algorithm `fib(n) = fib(n-1) + fib(n-2)`?',
          options: [
            'O(2^N) exponential time',
            'O(N) linear time',
            'O(N log N)',
            'O(1) constant time',
          ],
          correctIndex: 0,
          explanation:
            'Each call spawns two subsequent recursive calls without memoization, forming a binary call tree of depth N containing approximately 2^N nodes.',
          difficulty: 'challenging',
          type: 'mcq',
          hint: 'Each node splits into two children at every level of the recursive call tree.',
        },
        {
          id: 'q-rec-6',
          question: 'Does CPython automatically optimize recursive calls through Tail Call Optimization (TCO)?',
          options: [
            'No, CPython intentionally does not implement TCO to preserve full, accurate stack tracebacks for debugging',
            'Yes, all functions ending with return func() are compiled into while loops',
            'Yes, but only when the -O optimization flag is passed to the python CLI',
            'Only for functions marked with the @tail_recursion decorator',
          ],
          correctIndex: 0,
          explanation:
            'Guido van Rossum deliberately rejected TCO in CPython to ensure that tracebacks reflect complete, uncorrupted stack frames for reliable debugging and error diagnosis.',
          difficulty: 'challenging',
          type: 'mcq',
          hint: 'Consider the Python philosophy regarding stack trace readability and debugging.',
        },
      ],
    },
    {
      id: 'node-rec-base-case',
      title: 'BASE CASE',
      shortExplanation: 'The condition under which the function returns directly without making further recursive calls.',
      category: 'control',
      depth: 1,
      position: [4.0, 1.8, 1.0],
      size: 0.95,
      color: '#34d399',
      beginnerExplanation: 'The emergency brake of recursion. It tells the function: "You are done, stop calling yourself!"',
      whyItMatters: 'Guarantees algorithm termination.',
      commonMistakes: ['Writing a base case condition that can never be reached (e.g. `n == 0` when `n` steps by 2 starting from an odd number).'],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Designing Base Cases',
          explanation: 'Identify the smallest trivial input (e.g. empty list, 0, 1) whose answer is known immediately.',
        },
      ],
      practiceQuestion: {
        question: 'What happens if a recursive function does not have a base case?',
        options: [
          'It finishes in one iteration',
          'It raises RecursionError (Maximum recursion depth exceeded)',
          'It converts into a while loop automatically',
          'It reboots the computer',
        ],
        correctIndex: 1,
        explanation: 'In Python, recursion without termination exceeds the maximum stack limit and raises RecursionError.',
      },
      prerequisiteIds: ['node-rec-root'],
    },
    {
      id: 'node-rec-stack',
      title: 'CALL STACK & UNWINDING',
      shortExplanation: 'The LIFO (Last-In-First-Out) memory stack that preserves variable states across recursive calls.',
      category: 'foundation',
      depth: 1,
      position: [-4.0, 1.8, -1.0],
      size: 0.95,
      color: '#a78bfa',
      beginnerExplanation:
        'Think of a stack of plates. Every time the function calls itself, a new plate is placed on top. When the bottom is reached, plates are taken off from top to bottom.',
      whyItMatters: 'Explains why deep recursion consumes O(N) auxiliary memory.',
      commonMistakes: ['Assuming recursion is free: each call frame takes memory on the stack.'],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Stack Frames',
          explanation: 'Each active recursive invocation holds its own copy of parameter variables until it returns.',
        },
      ],
      practiceQuestion: {
        question: 'What data structure does the computer use internally to remember where to return after a recursive call?',
        options: ['Queue', 'Call Stack', 'Hash Table', 'Graph'],
        correctIndex: 1,
        explanation: 'The CPU and Python runtime use a Call Stack (LIFO) to track function return addresses and local frame states.',
      },
      prerequisiteIds: ['node-rec-root'],
    },
    {
      id: 'node-rec-overflow',
      title: 'STACK OVERFLOW (LIMITS)',
      shortExplanation: 'CPython’s recursion limit (default 1000) and converting recursion to iteration.',
      category: 'advanced',
      depth: 1,
      position: [0.5, -3.2, 1.4],
      size: 0.9,
      color: '#fbbf24',
      beginnerExplanation: 'Python protects your computer from running out of memory by stopping you if you call yourself more than 1000 times.',
      whyItMatters: 'Crucial for production safety; knowing when to use loops or tail-call elimination.',
      commonMistakes: ['Increasing `sys.setrecursionlimit()` to huge numbers instead of rewriting using iteration.'],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Recursion Limit Inspection',
          explanation: 'Inspect or configure the stack depth recursion threshold using the sys module.',
          codeSnippet: 'import sys\nprint(sys.getrecursionlimit()) # 1000',
        },
      ],
      practiceQuestion: {
        question: 'What is the default recursion limit in Python?',
        options: ['10', '100', '1000', 'Unlimited'],
        correctIndex: 2,
        explanation: 'Python’s default recursion depth limit is set to 1000 frames to prevent stack overflow crashes.',
      },
      prerequisiteIds: ['node-rec-stack'],
    },
  ],
  edges: [
    { id: 'er1', source: 'node-rec-root', target: 'node-rec-base-case', relationship: 'terminated_by', description: 'Recursion must be bounded by a base case.' },
    { id: 'er2', source: 'node-rec-root', target: 'node-rec-stack', relationship: 'executes_on', description: 'Recursive calls allocate frames on the call stack.' },
    { id: 'er3', source: 'node-rec-stack', target: 'node-rec-overflow', relationship: 'constrained_by', description: 'Call stacks are constrained by recursion depth limits.' },
  ],
}

// 5. BINARY SEARCH KNOWLEDGE MAP
export const BINARY_SEARCH_MAP: KnowledgeMap = {
  id: 'map-binary-search',
  topic: 'Explain binary search',
  title: 'Binary Search & Logarithmic Complexity',
  description:
    'A 3D spatial model of Binary Search: bisecting sorted search intervals in O(log N) time.',
  centralNodeId: 'node-bs-root',
  createdAt: '2026-10-15T00:00:00Z',
  isDemo: true,
  demoNote: 'Curated reference curriculum for Binary Search',
  nodes: [
    {
      id: 'node-bs-root',
      title: 'BINARY SEARCH',
      shortExplanation: 'An efficient algorithm for finding an element in a sorted list by repeatedly halving the search interval.',
      category: 'core',
      depth: 0,
      position: [0, 0, 0],
      size: 1.45,
      color: '#38bdf8',
      beginnerExplanation:
        'Imagine guessing a number between 1 and 100. If you guess 50 and I say "Higher", you instantly eliminate 1 through 50 in one step! That is binary search.',
      intermediateExplanation:
        'Binary search requires the input array to be sorted. On each step, it compares the target with the middle element. If not equal, it halves the search interval.',
      advancedDetails:
        'Time complexity is O(log2 N). Searching 1,000,000 items takes at most 20 comparisons! (2^20 ≈ 1,048,576).',
      whyItMatters:
        'Powers database index lookups (B-Trees), git bisect for hunting bug commits, and large-scale data searching.',
      practicalUseCases: [
        'Finding a customer by ID among 100 million sorted database records in milliseconds.',
        'Locating the git commit that introduced a bug using `git bisect`.',
        'Auto-complete dictionary prefix matching.',
      ],
      commonMistakes: [
        'Applying binary search to an unsorted list (produces incorrect results).',
        'Off-by-one errors with `low <= high` vs `low < high`.',
        'Integer overflow in other languages when writing `(low + high) / 2` (in Python integers do not overflow, but `(low + (high - low) // 2)` is standard).',
      ],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Prerequisite: Sorted Data',
          explanation: 'The array must be in sorted order for the elimination logic to hold.',
        },
        {
          stepNumber: 2,
          title: 'Bisecting the Range',
          explanation: 'Calculate `mid = (low + high) // 2`. If `target > arr[mid]`, search right (`low = mid + 1`). If smaller, search left.',
        },
      ],
      concreteExample: {
        code: 'def binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1\n\nnums = [10, 20, 30, 40, 50]\nprint(binary_search(nums, 40))',
        explanation: 'Searches for 40 in sorted array [10, 20, 30, 40, 50].',
        expectedOutput: '3',
        trace: {
          code: 'low = 0, high = 4\nmid = (0 + 4) // 2 = 2 (val 30)\n30 < 40 -> low = mid + 1 (3)\nmid = (3 + 4) // 2 = 3 (val 40)\nFound 40 at index 3!',
          language: 'python',
          explanation: 'Step through how binary search pinpoints 40 in only two comparisons.',
          steps: [
            {
              step: 1,
              line: 1,
              variables: { array: '[10, 20, 30, 40, 50]', low: 0, high: 4, target: 40 },
              output: '',
              description: 'Initialization: Search range spans index 0 to 4.',
            },
            {
              step: 2,
              line: 2,
              variables: { mid: 2, 'arr[mid]': 30, target: 40 },
              output: '',
              description: 'Middle index calculated: mid = 2 (value 30). 30 < 40.',
            },
            {
              step: 3,
              line: 3,
              variables: { low: 3, high: 4, eliminated: 'indices 0..2' },
              output: '',
              description: 'Target is greater than 30: Left half is discarded! low becomes 3.',
            },
            {
              step: 4,
              line: 4,
              variables: { mid: 3, 'arr[mid]': 40, target: 40, match: 'TRUE' },
              output: 'Index: 3\n',
              description: 'Next mid = (3 + 4) // 2 = 3 (value 40). Target matched at index 3!',
            },
          ],
        },
      },
      edgeCases: [
        'Running binary search on an unsorted list causes false negatives or wrong positions silently.',
        'Using `while low < high` instead of `while low <= high` skips checking the final single-element interval.',
        'Duplicate elements: standard binary search finds ANY matching index, while `bisect_left` finds the leftmost insertion index.',
      ],
      intermediateExample: {
        code: `# Iterative binary search returning index or -1
def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

nums = [10, 20, 30, 40, 50, 60]
print("Index of 40:", binary_search(nums, 40))
print("Index of 99:", binary_search(nums, 99))`,
        explanation: 'Standard low and high interval bisection with O(log N) runtime.',
        expectedOutput: 'Index of 40: 3\nIndex of 99: -1',
      },
      advancedExample: {
        code: `import bisect

# Production bisection using Python's C-accelerated bisect module
scores = [60, 70, 80, 90]
grades = ["F", "D", "C", "B", "A"]

def get_grade(score):
    idx = bisect.bisect_right(scores, score)
    return grades[idx]

print([get_grade(75), get_grade(92), get_grade(50)])`,
        explanation: '`bisect.bisect_right` maps breakpoints to grading brackets in logarithmic time.',
        expectedOutput: "['C', 'A', 'F']",
      },
      practiceQuestion: {
        question: 'What is the maximum number of comparisons binary search needs to find an element in a sorted list of 1,000,000 items?',
        options: ['1,000,000', '500,000', '20', '1,000'],
        correctIndex: 2,
        explanation: 'Because log2(1,000,000) ≈ 19.93, binary search needs at most 20 comparisons!',
        difficulty: 'easy',
        type: 'mcq',
        hint: 'Calculate ceil(log2(1,000,000)) or think: 2^10 = 1024, 2^20 ≈ 1,000,000.',
      },
      practiceQuestions: [
        {
          id: 'q-bs-1',
          question: 'What is the maximum number of comparisons binary search needs to find an element in a sorted list of 1,000,000 items?',
          options: ['1,000,000', '500,000', '20', '1,000'],
          correctIndex: 2,
          explanation:
            'Because log2(1,000,000) ≈ 19.93, binary search needs at most 20 comparisons to find or confirm the absence of any key!',
          difficulty: 'easy',
          type: 'mcq',
          hint: 'Think about powers of two: 2^20 is slightly over 1 million.',
        },
        {
          id: 'q-bs-2',
          question: 'What is the indispensable prerequisite for performing binary search on an array?',
          options: [
            'The array elements must be in sorted order',
            'The array length must be an exact power of two',
            'The array must contain only unique positive integers',
            'The array must be immutable',
          ],
          correctIndex: 0,
          explanation:
            'Binary search depends on the monotonic sorted invariant. If elements are unsorted, discarding one half can inadvertently discard the target.',
          difficulty: 'easy',
          type: 'mcq',
          hint: 'Looking in the middle is only meaningful if elements are ordered.',
        },
        {
          id: 'q-bs-3',
          question: 'When `arr[mid] < target`, how should the search boundaries be updated?',
          options: [
            'low = mid + 1 (the target must lie strictly to the right of mid)',
            'high = mid - 1',
            'low = mid',
            'high = mid',
          ],
          correctIndex: 0,
          explanation:
            'Because `arr[mid]` is strictly less than target and the array is sorted, the target cannot be at `mid` or any index to its left. Thus `low = mid + 1`.',
          difficulty: 'medium',
          type: 'output_prediction',
          hint: 'If middle is too small, look strictly to the right.',
        },
        {
          id: 'q-bs-4',
          question: 'Identify the bug in this binary search loop condition when searching for a single-element array `[42]`:',
          codeSnippet: `low, high = 0, len(arr) - 1\nwhile low < high: # bug here\n    mid = (low + high) // 2\n    if arr[mid] == target: return mid`,
          options: [
            'Using `low < high` terminates before inspecting intervals of length 1 (when low == high), missing the target',
            'Integer division `// 2` throws ZeroDivisionError when len(arr) is 1',
            'The middle index must always be rounded upwards with math.ceil',
            'Python requires while True instead of conditional while loops',
          ],
          correctIndex: 0,
          explanation:
            'When `low == high`, there is still one candidate element remaining in the search range. Using `while low <= high` ensures that final element is verified.',
          difficulty: 'medium',
          type: 'debugging',
          hint: 'What happens when low=0 and high=0 in the condition `0 < 0`?',
        },
        {
          id: 'q-bs-5',
          question: 'What index does `bisect.bisect_left([10, 20, 30, 40], 25)` return?',
          codeSnippet: `import bisect\narr = [10, 20, 30, 40]\nidx = bisect.bisect_left(arr, 25)\nprint(idx)`,
          options: ['2', '1', '3', '-1'],
          correctIndex: 0,
          explanation:
            '`bisect_left` finds the insertion position to maintain sorted order. 25 belongs between 20 (index 1) and 30 (index 2), so it returns index 2.',
          difficulty: 'challenging',
          type: 'output_prediction',
          hint: 'Where should 25 be inserted so the list remains sorted?',
        },
        {
          id: 'q-bs-6',
          question: 'What is the recurrence relation describing the time complexity of binary search?',
          options: [
            'T(N) = T(N/2) + O(1), which solves to O(log N) by the Master Theorem',
            'T(N) = 2T(N/2) + O(N), which solves to O(N log N)',
            'T(N) = T(N - 1) + O(1), which solves to O(N)',
            'T(N) = T(N/2) + O(N), which solves to O(N)',
          ],
          correctIndex: 0,
          explanation:
            'Each step does constant O(1) comparison work and recurses on a single sub-problem of half size (N/2), leading to logarithmic O(log N) time.',
          difficulty: 'challenging',
          type: 'mcq',
          hint: 'Binary search does 1 comparison and investigates ONLY ONE half of size N/2.',
        },
      ],
    },
    {
      id: 'node-bs-sorted',
      title: 'SORTED ARRAY INVARIANT',
      shortExplanation: 'The indispensable precondition: values must follow monotonically increasing order.',
      category: 'foundation',
      depth: 1,
      position: [4.0, 1.8, 1.0],
      size: 0.95,
      color: '#60a5fa',
      beginnerExplanation: 'If phone numbers in a phone book were scattered randomly, you could not look up names by flipping to the middle.',
      whyItMatters: 'If the invariant is violated, binary search produces false negative results.',
      commonMistakes: ['Running binary search on raw unsorted data.'],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Invariant Rule',
          explanation: 'For all i < j: arr[i] <= arr[j].',
        },
      ],
      practiceQuestion: {
        question: 'What is the prerequisite for performing a binary search on a list?',
        options: ['The list must contain only even numbers', 'The list must be sorted', 'The list must have an odd number of items', 'The list must be immutable'],
        correctIndex: 1,
        explanation: 'Binary search requires sorted data so that comparing to the middle allows eliminating an entire half.',
      },
      prerequisiteIds: ['node-bs-root'],
    },
    {
      id: 'node-bs-pointers',
      title: 'POINTERS & MIDPOINT',
      shortExplanation: 'The low, high, and mid boundary pointers that track the active candidate window.',
      category: 'syntax',
      depth: 1,
      position: [-4.0, 1.8, -1.0],
      size: 0.95,
      color: '#34d399',
      beginnerExplanation: 'Low marks the start of what is left, High marks the end, and Mid is where you look.',
      whyItMatters: 'Proper pointer updates prevent infinite loops.',
      commonMistakes: ['Setting `low = mid` instead of `low = mid + 1`, causing an infinite loop when low and high are adjacent.'],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Pointer Updates',
          explanation: 'Update low or high pointers based on middle comparison to discard half of candidates.',
          codeSnippet: 'if target > arr[mid]:\n    low = mid + 1\nelse:\n    high = mid - 1',
        },
      ],
      practiceQuestion: {
        question: 'Why do we update `low = mid + 1` instead of `low = mid`?',
        options: [
          'Because mid was already inspected and is not the target; updating prevents infinite loops',
          'To skip odd numbers',
          'To save RAM memory',
          'It is a Python convention with no functional effect',
        ],
        correctIndex: 0,
        explanation: 'Since `arr[mid]` is not the target, we exclude `mid` by moving `low` to `mid + 1`. This also prevents infinite loops when `low == high - 1`.',
      },
      prerequisiteIds: ['node-bs-root'],
    },
    {
      id: 'node-bs-complexity',
      title: 'LOGARITHMIC TIME O(LOG N)',
      shortExplanation: 'How doubling dataset size only adds 1 single comparison step.',
      category: 'advanced',
      depth: 1,
      position: [0.5, -3.2, 1.4],
      size: 0.9,
      color: '#fbbf24',
      beginnerExplanation: 'If you double the list size from 1 million to 2 million, binary search only takes ONE extra comparison!',
      whyItMatters: 'Scales to billions of rows with zero noticeable lag.',
      commonMistakes: ['Thinking O(log N) is slower than O(N).'],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Comparing Linear vs Binary',
          explanation: 'Linear search on 1 billion records takes up to 1,000,000,000 operations. Binary search takes at most 30 operations.',
        },
      ],
      practiceQuestion: {
        question: 'What is the time complexity of binary search?',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
        correctIndex: 1,
        explanation: 'Binary search runs in O(log N) logarithmic time.',
      },
      prerequisiteIds: ['node-bs-root'],
    },
  ],
  edges: [
    { id: 'eb1', source: 'node-bs-root', target: 'node-bs-sorted', relationship: 'requires', description: 'Binary search requires a sorted array invariant.' },
    { id: 'eb2', source: 'node-bs-root', target: 'node-bs-pointers', relationship: 'navigates_via', description: 'Tracks the search window via low, high, and mid pointers.' },
    { id: 'eb3', source: 'node-bs-root', target: 'node-bs-complexity', relationship: 'achieves', description: 'Halving intervals achieves O(log N) complexity.' },
  ],
}
