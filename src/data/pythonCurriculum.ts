import type { CurriculumCategory } from '../types/knowledge'

export const PYTHON_CURRICULUM_CATEGORIES: CurriculumCategory[] = [
  {
    key: 'fundamentals',
    letter: 'A',
    title: 'Python Fundamentals',
    topics: [
      {
        id: 'what-is-python',
        title: 'What Python is',
        query: 'What is Python and how does it work',
        categoryKey: 'fundamentals',
        description: 'An interpreted, high-level, dynamically typed language emphasizing human readability and productivity.',
        difficulty: 'Beginner',
      },
      {
        id: 'installing-running',
        title: 'Installing & Running Python',
        query: 'How to install and run Python',
        categoryKey: 'fundamentals',
        description: 'Setting up the Python interpreter, REPL interactive shell, and executing .py scripts.',
        difficulty: 'Beginner',
      },
      {
        id: 'syntax-indentation',
        title: 'Syntax & Indentation',
        query: 'Explain Python syntax and indentation rules',
        categoryKey: 'fundamentals',
        description: 'How Python uses whitespace and 4-space indentation to define code blocks instead of curly braces.',
        difficulty: 'Beginner',
      },
      {
        id: 'comments',
        title: 'Comments & Documentation',
        query: 'Explain comments in Python',
        categoryKey: 'fundamentals',
        description: 'Single-line comments with # and multiline docstrings for documenting functions and modules.',
        difficulty: 'Beginner',
      },
      {
        id: 'variables',
        title: 'Variables & Assignment',
        query: 'Explain Python variables',
        categoryKey: 'fundamentals',
        description: 'Binding names to objects in memory, dynamic typing, and variable assignment mechanics.',
        difficulty: 'Beginner',
      },
      {
        id: 'naming-conventions',
        title: 'Constants & Naming Conventions',
        query: 'Explain Python naming conventions and PEP 8',
        categoryKey: 'fundamentals',
        description: 'PEP 8 guidelines: snake_case for functions/variables, UPPER_CASE for constants, PascalCase for classes.',
        difficulty: 'Beginner',
      },
      {
        id: 'input-output',
        title: 'Input & Output',
        query: 'Explain input and print output in Python',
        categoryKey: 'fundamentals',
        description: 'Reading user terminal input with input() and formatting output with print().',
        difficulty: 'Beginner',
      },
      {
        id: 'type-conversion',
        title: 'Type Conversion',
        query: 'Explain type casting and conversion in Python',
        categoryKey: 'fundamentals',
        description: 'Implicit coercion and explicit conversion using int(), float(), str(), and bool().',
        difficulty: 'Beginner',
      },
      {
        id: 'debugging-basics',
        title: 'Debugging Basics',
        query: 'Explain Python debugging basics',
        categoryKey: 'fundamentals',
        description: 'Interpreting tracebacks, reading error messages, and using print debugging and breakpoint().',
        difficulty: 'Beginner',
      },
    ],
  },
  {
    key: 'data-types',
    letter: 'B',
    title: 'Data Types',
    topics: [
      {
        id: 'integers',
        title: 'Integers',
        query: 'Explain integers in Python',
        categoryKey: 'data-types',
        description: 'Arbitrary-precision whole numbers with no fixed 32-bit or 64-bit overflow limits.',
        difficulty: 'Beginner',
      },
      {
        id: 'floats',
        title: 'Floating-Point Numbers',
        query: 'Explain floating point numbers in Python',
        categoryKey: 'data-types',
        description: 'IEEE 754 double-precision decimal numbers, precision limits, and the math module.',
        difficulty: 'Beginner',
      },
      {
        id: 'strings-type',
        title: 'Strings (str)',
        query: 'Explain Python strings',
        categoryKey: 'data-types',
        description: 'Immutable sequences of Unicode characters enclosed in single, double, or triple quotes.',
        difficulty: 'Beginner',
      },
      {
        id: 'booleans',
        title: 'Booleans (bool)',
        query: 'Explain booleans and truthiness in Python',
        categoryKey: 'data-types',
        description: 'True and False values, boolean expressions, and subclass relationships with integers.',
        difficulty: 'Beginner',
      },
      {
        id: 'none-type',
        title: 'None & NoneType',
        query: 'Explain None in Python',
        categoryKey: 'data-types',
        description: 'The singleton object representing the absence of a value or default return value.',
        difficulty: 'Beginner',
      },
      {
        id: 'type-checking',
        title: 'Type Checking (type & isinstance)',
        query: 'Explain type checking in Python',
        categoryKey: 'data-types',
        description: 'Inspecting types dynamically with type() and verifying class hierarchies with isinstance().',
        difficulty: 'Beginner',
      },
      {
        id: 'mutability',
        title: 'Mutable vs Immutable Objects',
        query: 'Explain mutable versus immutable objects in Python',
        categoryKey: 'data-types',
        description: 'The fundamental architectural divide: lists/dicts (mutable) vs numbers/strings/tuples (immutable).',
        difficulty: 'Intermediate',
      },
    ],
  },
  {
    key: 'operators',
    letter: 'C',
    title: 'Operators',
    topics: [
      {
        id: 'arithmetic-operators',
        title: 'Arithmetic Operators',
        query: 'Explain arithmetic operators in Python',
        categoryKey: 'operators',
        description: '+, -, *, /, // (floor division), % (modulo), and ** (exponentiation).',
        difficulty: 'Beginner',
      },
      {
        id: 'comparison-operators',
        title: 'Comparison Operators',
        query: 'Explain comparison operators in Python',
        categoryKey: 'operators',
        description: '==, !=, <, >, <=, and >= evaluation returning boolean results.',
        difficulty: 'Beginner',
      },
      {
        id: 'logical-operators',
        title: 'Logical Operators (and, or, not)',
        query: 'Explain logical operators in Python',
        categoryKey: 'operators',
        description: 'Boolean conjunctions, truth table evaluation, and short-circuit evaluation mechanics.',
        difficulty: 'Beginner',
      },
      {
        id: 'assignment-operators',
        title: 'Assignment Operators',
        query: 'Explain assignment operators in Python',
        categoryKey: 'operators',
        description: '=, +=, -=, *=, /=, and the walrus operator := (assignment expressions).',
        difficulty: 'Beginner',
      },
      {
        id: 'membership-operators',
        title: 'Membership Operators (in, not in)',
        query: 'Explain membership operators in Python',
        categoryKey: 'operators',
        description: 'Testing whether an element exists inside a collection, sequence, or set.',
        difficulty: 'Beginner',
      },
      {
        id: 'identity-operators',
        title: 'Identity Operators (is, is not)',
        query: 'Explain identity operators is and is not in Python',
        categoryKey: 'operators',
        description: 'Comparing memory addresses (id()) vs comparing semantic values (==).',
        difficulty: 'Intermediate',
      },
      {
        id: 'bitwise-operators',
        title: 'Bitwise Operators',
        query: 'Explain bitwise operators in Python',
        categoryKey: 'operators',
        description: '& (AND), | (OR), ^ (XOR), ~ (NOT), << (left shift), and >> (right shift).',
        difficulty: 'Intermediate',
      },
      {
        id: 'operator-precedence',
        title: 'Operator Precedence',
        query: 'Explain operator precedence in Python',
        categoryKey: 'operators',
        description: 'PEMDAS rules in code: parentheses, exponents, multiplication, addition, and comparisons.',
        difficulty: 'Beginner',
      },
    ],
  },
  {
    key: 'conditionals',
    letter: 'D',
    title: 'Conditional Statements',
    topics: [
      {
        id: 'if-statement',
        title: 'if Statements',
        query: 'Explain if statements in Python',
        categoryKey: 'conditionals',
        description: 'Executing code blocks conditionally when a boolean expression evaluates to True.',
        difficulty: 'Beginner',
      },
      {
        id: 'if-else',
        title: 'if-else Branching',
        query: 'Explain if-else in Python',
        categoryKey: 'conditionals',
        description: 'Providing fallback execution paths when conditions evaluate to False.',
        difficulty: 'Beginner',
      },
      {
        id: 'if-elif-else',
        title: 'if-elif-else Chains',
        query: 'Explain if-elif-else chains in Python',
        categoryKey: 'conditionals',
        description: 'Evaluating multiple mutually exclusive branches sequentially.',
        difficulty: 'Beginner',
      },
      {
        id: 'nested-conditions',
        title: 'Nested Conditions',
        query: 'Explain nested conditions in Python',
        categoryKey: 'conditionals',
        description: 'Structuring conditions within conditions for hierarchical decision logic.',
        difficulty: 'Beginner',
      },
      {
        id: 'truthiness',
        title: 'Truth Value Testing (Truthiness)',
        query: 'Explain truthy and falsy values in Python',
        categoryKey: 'conditionals',
        description: 'How empty collections, 0, None, and empty strings implicitly evaluate to False.',
        difficulty: 'Intermediate',
      },
      {
        id: 'conditional-expressions',
        title: 'Ternary Conditional Expressions',
        query: 'Explain ternary operator in Python',
        categoryKey: 'conditionals',
        description: 'Single-line conditional assignments: x = a if condition else b.',
        difficulty: 'Intermediate',
      },
    ],
  },
  {
    key: 'loops',
    letter: 'E',
    title: 'Loops & Iteration',
    topics: [
      {
        id: 'for-loops',
        title: 'for Loops',
        query: 'Explain loops in Python',
        categoryKey: 'loops',
        description: 'Definite iteration over sequences, strings, ranges, and custom iterables.',
        difficulty: 'Beginner',
      },
      {
        id: 'while-loops',
        title: 'while Loops',
        query: 'Explain while loops in Python',
        categoryKey: 'loops',
        description: 'Repeating statements as long as an invariant condition remains True.',
        difficulty: 'Beginner',
      },
      {
        id: 'range-function',
        title: 'range() Generator',
        query: 'Explain range function in Python',
        categoryKey: 'loops',
        description: 'Generating arithmetic progressions with start, stop, and step arguments.',
        difficulty: 'Beginner',
      },
      {
        id: 'break-continue',
        title: 'break & continue',
        query: 'Explain break and continue in Python loops',
        categoryKey: 'loops',
        description: 'Controlling loop flow: premature termination with break, skipping cycles with continue.',
        difficulty: 'Beginner',
      },
      {
        id: 'loop-else',
        title: 'Loop else Clauses',
        query: 'Explain for else and while else in Python',
        categoryKey: 'loops',
        description: 'Executing clean-up blocks only when a loop finishes naturally without breaking.',
        difficulty: 'Intermediate',
      },
      {
        id: 'nested-loops',
        title: 'Nested Loops',
        query: 'Explain nested loops in Python',
        categoryKey: 'loops',
        description: 'Multidimensional coordinate and matrix traversal with nested iteration loops.',
        difficulty: 'Intermediate',
      },
      {
        id: 'infinite-loops',
        title: 'Infinite Loops & Termination',
        query: 'Explain infinite loops and how to prevent them in Python',
        categoryKey: 'loops',
        description: 'Loop guards, watchdog timers, and condition variable mutation safeguards.',
        difficulty: 'Beginner',
      },
    ],
  },
  {
    key: 'strings',
    letter: 'F',
    title: 'Strings & Text Processing',
    topics: [
      {
        id: 'string-indexing-slicing',
        title: 'Indexing & Slicing',
        query: 'Explain string indexing and slicing in Python',
        categoryKey: 'strings',
        description: 'Zero-based positive indexing, negative reverse indexing, and [start:stop:step] slices.',
        difficulty: 'Beginner',
      },
      {
        id: 'f-strings',
        title: 'f-strings & Formatting',
        query: 'Explain f-strings and string formatting in Python',
        categoryKey: 'strings',
        description: 'Modern formatted string literals: f"{variable:.2f}" for clear, fast text interpolation.',
        difficulty: 'Beginner',
      },
      {
        id: 'string-methods',
        title: 'String Methods',
        query: 'Explain Python string methods',
        categoryKey: 'strings',
        description: '.upper(), .lower(), .strip(), .replace(), .startswith(), and .endswith().',
        difficulty: 'Beginner',
      },
      {
        id: 'split-join',
        title: 'Splitting & Joining',
        query: 'Explain split and join in Python',
        categoryKey: 'strings',
        description: 'Tokenizing text into lists with .split() and concatenating iterables with .join().',
        difficulty: 'Beginner',
      },
      {
        id: 'string-immutability',
        title: 'String Immutability',
        query: 'Explain string immutability in Python',
        categoryKey: 'strings',
        description: 'Why strings cannot be modified in-place and how new string allocations occur in memory.',
        difficulty: 'Intermediate',
      },
    ],
  },
  {
    key: 'collections',
    letter: 'G',
    title: 'Collections & Data Structures',
    topics: [
      {
        id: 'lists',
        title: 'Lists',
        query: 'What are Python lists',
        categoryKey: 'collections',
        description: 'Ordered, mutable, dynamic arrays holding heterogeneous elements.',
        difficulty: 'Beginner',
      },
      {
        id: 'list-methods',
        title: 'List Methods',
        query: 'Explain list methods in Python',
        categoryKey: 'collections',
        description: '.append(), .extend(), .insert(), .pop(), .remove(), .sort(), and .reverse().',
        difficulty: 'Beginner',
      },
      {
        id: 'tuples',
        title: 'Tuples',
        query: 'Explain tuples in Python',
        categoryKey: 'collections',
        description: 'Ordered, immutable sequences used for record grouping and dictionary keys.',
        difficulty: 'Beginner',
      },
      {
        id: 'dictionaries',
        title: 'Dictionaries',
        query: 'What is a dictionary in Python',
        categoryKey: 'collections',
        description: 'Hash table key-value mappings offering O(1) average-time lookups and insertions.',
        difficulty: 'Beginner',
      },
      {
        id: 'sets',
        title: 'Sets',
        query: 'Explain sets in Python',
        categoryKey: 'collections',
        description: 'Unordered collections of unique hashable elements supporting union, intersection, and difference.',
        difficulty: 'Intermediate',
      },
      {
        id: 'comprehensions',
        title: 'Comprehensions',
        query: 'Explain list comprehensions in Python',
        categoryKey: 'collections',
        description: 'Concise syntax for creating lists, dictionaries, and sets: [x**2 for x in nums if x > 0].',
        difficulty: 'Intermediate',
      },
      {
        id: 'copy-vs-reference',
        title: 'Copying vs Referencing (Shallow vs Deep)',
        query: 'Explain shallow copy versus deep copy in Python',
        categoryKey: 'collections',
        description: 'Pointer aliasing, the copy module, and preventing unintentional mutation of nested data.',
        difficulty: 'Intermediate',
      },
    ],
  },
  {
    key: 'functions',
    letter: 'H',
    title: 'Functions & Modular Code',
    topics: [
      {
        id: 'defining-functions',
        title: 'Defining Functions (def)',
        query: 'Explain functions in Python',
        categoryKey: 'functions',
        description: 'Declaring reusable subroutines with def, docstrings, parameters, and return statements.',
        difficulty: 'Beginner',
      },
      {
        id: 'parameters-arguments',
        title: 'Parameters & Arguments',
        query: 'Explain function parameters and arguments in Python',
        categoryKey: 'functions',
        description: 'Positional arguments, keyword arguments, default parameters, and mutable default pitfalls.',
        difficulty: 'Beginner',
      },
      {
        id: 'args-kwargs',
        title: '*args and **kwargs',
        query: 'Explain args and kwargs in Python',
        categoryKey: 'functions',
        description: 'Accepting arbitrary numbers of positional and keyword arguments for flexible APIs.',
        difficulty: 'Intermediate',
      },
      {
        id: 'scope-legb',
        title: 'Variable Scope & LEGB Rule',
        query: 'Explain variable scope and LEGB rule in Python',
        categoryKey: 'functions',
        description: 'Local, Enclosing, Global, and Built-in namespace resolution and the global/nonlocal keywords.',
        difficulty: 'Intermediate',
      },
      {
        id: 'lambda-functions',
        title: 'Lambda Functions',
        query: 'Explain lambda anonymous functions in Python',
        categoryKey: 'functions',
        description: 'Anonymous inline expressions for functional programming, sorting keys, and callbacks.',
        difficulty: 'Intermediate',
      },
      {
        id: 'recursion',
        title: 'Recursion',
        query: 'Explain recursion',
        categoryKey: 'functions',
        description: 'Functions calling themselves with base cases, recursive reduction, and call stack mechanics.',
        difficulty: 'Intermediate',
      },
    ],
  },
  {
    key: 'modules',
    letter: 'I',
    title: 'Modules & Packages',
    topics: [
      {
        id: 'importing-modules',
        title: 'import & from ... import',
        query: 'Explain importing modules in Python',
        categoryKey: 'modules',
        description: 'Loading code from external files, namespaces, aliasing with as, and circular imports.',
        difficulty: 'Beginner',
      },
      {
        id: 'standard-library',
        title: 'The Standard Library',
        query: 'Explain Python standard library modules',
        categoryKey: 'modules',
        description: 'Built-in batteries included: math, random, datetime, os, sys, and pathlib.',
        difficulty: 'Beginner',
      },
      {
        id: 'packages-pip',
        title: 'Packages & pip',
        query: 'Explain pip and Python packages',
        categoryKey: 'modules',
        description: 'Installing third-party packages from PyPI with pip and structuring __init__.py packages.',
        difficulty: 'Beginner',
      },
      {
        id: 'virtual-environments',
        title: 'Virtual Environments (venv)',
        query: 'Explain virtual environments in Python',
        categoryKey: 'modules',
        description: 'Isolating project dependencies and Python interpreter versions with python -m venv.',
        difficulty: 'Intermediate',
      },
    ],
  },
  {
    key: 'error-handling',
    letter: 'J',
    title: 'Error Handling & Exceptions',
    topics: [
      {
        id: 'exceptions-basics',
        title: 'Exceptions & Try-Except',
        query: 'Explain try and except in Python',
        categoryKey: 'error-handling',
        description: 'Catching runtime errors gracefully to prevent abrupt program termination.',
        difficulty: 'Beginner',
      },
      {
        id: 'else-finally',
        title: 'else and finally Blocks',
        query: 'Explain else and finally in Python exception handling',
        categoryKey: 'error-handling',
        description: 'Executing code when no exceptions occur (else) and guaranteed resource cleanup (finally).',
        difficulty: 'Intermediate',
      },
      {
        id: 'raising-exceptions',
        title: 'Raising & Custom Exceptions',
        query: 'Explain raising custom exceptions in Python',
        categoryKey: 'error-handling',
        description: 'Signaling invalid conditions with raise and subclassing Exception for domain errors.',
        difficulty: 'Intermediate',
      },
    ],
  },
  {
    key: 'file-handling',
    letter: 'K',
    title: 'File Handling & I/O',
    topics: [
      {
        id: 'reading-writing-files',
        title: 'Opening, Reading & Writing Files',
        query: 'Explain reading and writing files in Python',
        categoryKey: 'file-handling',
        description: 'Using open() with modes ("r", "w", "a", "b"), .read(), .readline(), and .write().',
        difficulty: 'Beginner',
      },
      {
        id: 'context-managers-files',
        title: 'with Context Managers',
        query: 'Explain the with statement for files in Python',
        categoryKey: 'file-handling',
        description: 'Automatic resource management ensuring files are safely closed even if exceptions occur.',
        difficulty: 'Beginner',
      },
      {
        id: 'json-csv',
        title: 'JSON & CSV Basics',
        query: 'Explain JSON and CSV parsing in Python',
        categoryKey: 'file-handling',
        description: 'Serializing and deserializing structured data with the json and csv standard modules.',
        difficulty: 'Intermediate',
      },
    ],
  },
  {
    key: 'oop',
    letter: 'L',
    title: 'Object-Oriented Programming (OOP)',
    topics: [
      {
        id: 'classes-objects',
        title: 'Classes & Objects',
        query: 'Explain classes and objects',
        categoryKey: 'oop',
        description: 'Blueprints for user-defined types encapsulating state (attributes) and behavior (methods).',
        difficulty: 'Intermediate',
      },
      {
        id: 'init-self',
        title: '__init__ Constructor & self',
        query: 'Explain init and self in Python classes',
        categoryKey: 'oop',
        description: 'Instance initialization, binding instance variables, and explicit self method receivers.',
        difficulty: 'Intermediate',
      },
      {
        id: 'inheritance',
        title: 'Inheritance & super()',
        query: 'Explain inheritance in Python',
        categoryKey: 'oop',
        description: 'Reusing and extending parent classes, method overriding, and super() delegation.',
        difficulty: 'Intermediate',
      },
      {
        id: 'encapsulation',
        title: 'Encapsulation & Private Attributes',
        query: 'Explain encapsulation and private variables in Python',
        categoryKey: 'oop',
        description: 'Data hiding conventions: _protected attributes, __private name mangling, and @property decorators.',
        difficulty: 'Intermediate',
      },
      {
        id: 'polymorphism',
        title: 'Polymorphism & Duck Typing',
        query: 'Explain polymorphism and duck typing in Python',
        categoryKey: 'oop',
        description: '"If it walks like a duck and quacks like a duck, it is a duck": interface flexibility without rigid inheritance.',
        difficulty: 'Intermediate',
      },
      {
        id: 'special-methods',
        title: 'Dunder / Special Methods',
        query: 'Explain dunder methods in Python',
        categoryKey: 'oop',
        description: 'Operator overloading with __str__, __repr__, __len__, __getitem__, and __eq__.',
        difficulty: 'Advanced',
      },
    ],
  },
  {
    key: 'advanced',
    letter: 'M',
    title: 'Advanced Python',
    topics: [
      {
        id: 'iterators-generators',
        title: 'Generators & yield',
        query: 'Explain generators and yield in Python',
        categoryKey: 'advanced',
        description: 'Lazy evaluation, memory-efficient streams, and generator functions with yield.',
        difficulty: 'Advanced',
      },
      {
        id: 'decorators',
        title: 'Decorators & Closures',
        query: 'Explain decorators in Python',
        categoryKey: 'advanced',
        description: 'Higher-order wrapper functions using @decorator syntax to inject cross-cutting behavior.',
        difficulty: 'Advanced',
      },
      {
        id: 'type-hints',
        title: 'Type Hints & Type Annotations',
        query: 'Explain type hints in Python',
        categoryKey: 'advanced',
        description: 'PEP 484 static typing annotations with Union, Optional, List, Dict, and mypy analysis.',
        difficulty: 'Intermediate',
      },
      {
        id: 'dataclasses',
        title: 'Dataclasses',
        query: 'Explain dataclasses in Python',
        categoryKey: 'advanced',
        description: 'Automatic code generation for boilerplate classes (__init__, __repr__, __eq__) with @dataclass.',
        difficulty: 'Intermediate',
      },
      {
        id: 'async-basics',
        title: 'Asynchronous Programming (async/await)',
        query: 'Explain async and await in Python',
        categoryKey: 'advanced',
        description: 'Concurrent non-blocking I/O with the asyncio event loop, coroutines, and Tasks.',
        difficulty: 'Advanced',
      },
    ],
  },
  {
    key: 'algorithms',
    letter: 'N',
    title: 'Algorithms & Computer Science',
    topics: [
      {
        id: 'linear-search',
        title: 'Linear Search',
        query: 'Explain linear search',
        categoryKey: 'algorithms',
        description: 'Sequential element-by-element scanning across unordered datasets with O(N) complexity.',
        difficulty: 'Beginner',
      },
      {
        id: 'binary-search',
        title: 'Binary Search',
        query: 'Explain binary search',
        categoryKey: 'algorithms',
        description: 'Logarithmic O(log N) divide-and-conquer search on sorted arrays by bisecting search intervals.',
        difficulty: 'Intermediate',
      },
      {
        id: 'time-complexity',
        title: 'Time Complexity & Big O Notation',
        query: 'Explain Big O notation and time complexity',
        categoryKey: 'algorithms',
        description: 'Analyzing growth rates: O(1) constant, O(log N), O(N) linear, O(N log N), and O(N^2) polynomial.',
        difficulty: 'Intermediate',
      },
      {
        id: 'sorting-algorithms',
        title: 'Sorting Algorithms',
        query: 'Explain sorting algorithms in Python',
        categoryKey: 'algorithms',
        description: 'Bubble sort, insertion sort, merge sort, quicksort, and Python’s built-in Timsort algorithm.',
        difficulty: 'Intermediate',
      },
    ],
  },
]

export function getAllCurriculumTopics() {
  return PYTHON_CURRICULUM_CATEGORIES.flatMap((c) => c.topics)
}

const CURRICULUM_MATCH_STOPWORDS = new Set([
  'python',
  'explain',
  'what',
  'is',
  'are',
  'how',
  'in',
  'to',
  'and',
  'the',
  'a',
  'an',
  'for',
  'of',
  'with',
  'using',
  'about',
  'does',
  'do',
])

function normalizeCurriculumWord(w: string): string {
  const s = w.toLowerCase().replace(/[^a-z0-9]/g, '')
  if (s.endsWith('ies')) return s.slice(0, -3) + 'y'
  if (s.endsWith('es') && (s.endsWith('shes') || s.endsWith('ches') || s.endsWith('sses') || s.endsWith('xes'))) return s.slice(0, -2)
  if (s.endsWith('s') && !s.endsWith('ss')) return s.slice(0, -1)
  return s
}

function tokenizeCurriculumText(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !CURRICULUM_MATCH_STOPWORDS.has(w))
}

export function findCurriculumTopicByQuery(query: string) {
  const normalized = query.trim().toLowerCase().replace(/[?.!]+$/, '')
  const all = getAllCurriculumTopics()

  // 1. Exact match on title, query, or id
  const exact = all.find(
    (t) =>
      t.title.toLowerCase() === normalized ||
      t.query.toLowerCase().replace(/[?.!]+$/, '') === normalized ||
      t.id === normalized
  )
  if (exact) return exact

  // 2. Exact match after stripping conversational prefixes
  const stripped = normalized
    .replace(/^(explain|what is|what are|how to|how do|teach me about|explore)\s+/i, '')
    .replace(/\s+in\s+python$/i, '')
    .trim()

  const strippedExact = all.find(
    (t) =>
      t.title.toLowerCase() === stripped ||
      t.query.toLowerCase().replace(/[?.!]+$/, '') === stripped
  )
  if (strippedExact) return strippedExact

  // 3. Singular / plural exact match
  const normStrippedWord = normalizeCurriculumWord(stripped)
  const singularMatch = all.find(
    (t) => normalizeCurriculumWord(t.title) === normStrippedWord
  )
  if (singularMatch) return singularMatch

  // 4. Token overlap with scoring (highest score wins, avoiding stopword hijacking)
  const qTokens = tokenizeCurriculumText(normalized).map(normalizeCurriculumWord)
  if (qTokens.length === 0) return null

  let bestTopic: typeof all[0] | null = null
  let bestScore = 0

  for (const item of all) {
    const titleTokens = tokenizeCurriculumText(item.title).map(normalizeCurriculumWord)
    const topicQueryTokens = tokenizeCurriculumText(item.query).map(normalizeCurriculumWord)

    let score = 0
    let matches = 0

    for (const qt of qTokens) {
      if (titleTokens.includes(qt)) {
        score += 40
        matches++
      } else if (topicQueryTokens.includes(qt)) {
        score += 20
        matches++
      }
    }

    if (matches > 0) {
      // Penalize extra unmatched words so tighter matches score higher (e.g. "Lists" vs "List Methods")
      const extraWords = Math.abs(titleTokens.length - qTokens.length)
      score -= extraWords * 3

      if (score > bestScore) {
        bestScore = score
        bestTopic = item
      }
    }
  }

  return bestScore >= 15 ? bestTopic : null
}
