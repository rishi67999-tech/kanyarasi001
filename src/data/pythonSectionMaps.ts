import type { KnowledgeMap } from '../types/knowledge'

// ==============================================================================
// SECTION A: PYTHON FUNDAMENTALS 3D MAP
// ==============================================================================
export const PYTHON_FUNDAMENTALS_MAP: KnowledgeMap = {
  id: 'map-sec-fundamentals',
  topic: 'Python Fundamentals',
  title: 'Section A: Python Fundamentals Anatomy',
  description:
    'Core syntax, 4-space indentation rules, variables, constants, dynamic data types, input/output, type casting, 7 operator classes, and operator precedence.',
  centralNodeId: 'node-fund-root',
  parentMapId: 'map-python-master',
  parentMapTopic: 'Python Programming Master Curriculum',
  parentMapTitle: 'Python Overview',
  createdAt: '2026-10-15T10:00:00Z',
  isDemo: true,
  demoNote: 'Curated Section A Architecture',
  searchStatus: 'verified-web',
  searchSummary: 'Grounded in Python Documentation: Expressions & Standard Types',
  sources: [
    {
      title: 'Python Documentation: An Informal Introduction to Python',
      url: 'https://docs.python.org/3/tutorial/introduction.html',
      snippet: 'Using Python as a calculator, string operations, list basics, and first steps towards programming.',
      sourceName: 'Python Docs',
    },
    {
      title: 'Python Documentation: Built-in Types & Standard Operators',
      url: 'https://docs.python.org/3/library/stdtypes.html',
      snippet: 'Principal built-in types: numerics, sequences, mappings, classes, instances and exceptions.',
      sourceName: 'Python Docs',
    },
  ],
  nodes: [
    {
      id: 'node-fund-root',
      title: 'PYTHON FUNDAMENTALS',
      shortExplanation: 'The lexical grammar, memory model, and operator rules of Python.',
      category: 'core',
      depth: 0,
      position: [0, 0, 0],
      size: 1.45,
      color: '#38bdf8',
      beginnerExplanation:
        'Python is a human-readable language designed to express powerful ideas with minimal visual clutter. Indentation structures code blocks, and variables automatically track values.',
      intermediateExplanation:
        'Variables act as heap reference bindings rather than typed storage boxes. CPython executes bytecode (.pyc) within the Python Virtual Machine using reference counting and cycle detection.',
      advancedDetails:
        'CPython optimizes memory with small integer caching (-5 to 256), string interning for valid identifiers, and fast-path stack opcodes for local variable evaluation.',
      whyItMatters:
        'Foundations form the baseline. Every high-performance ML model, backend API, or automation script relies on these atomic syntax rules.',
      practicalUseCases: [
        'Automating daily calculation scripts and data extraction',
        'Validating user form inputs with type conversion',
        'Building CLI configuration wizards with input() and f-strings',
      ],
      commonMistakes: [
        'Mixing tabs and spaces for indentation.',
        'Assuming variables are storage boxes rather than pointers to heap objects.',
        'Confusing assignment (=) with equality comparison (==).',
      ],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Indentation is Syntax',
          explanation: 'Python replaces curly braces with 4 spaces to define scope blocks.',
          codeSnippet: 'if True:\n    print("4-space indent")',
        },
        {
          stepNumber: 2,
          title: 'Dynamic Typing',
          explanation: 'Types are bound to objects at runtime, not to variable names.',
          codeSnippet: 'val = 42       # val is int\nval = "hello"  # val is now str',
        },
      ],
      concreteExample: {
        code: '# Fundamentals showcase\nname: str = "Developer"\nage: int = 24\nprint(f"Welcome {name}, next year you will be {age + 1}")',
        explanation: 'Uses type annotations, arithmetic, and formatted string literals.',
        expectedOutput: 'Welcome Developer, next year you will be 25',
      },
      edgeCases: [
        'Mixing tab characters with spaces causes TabError in Python 3.',
        'Variable names starting with numbers (1var) or containing hyphens (my-var) cause SyntaxError.',
        'Chained assignment a = b = [] binds both identifiers to the SAME mutable list instance in heap memory.',
      ],
      intermediateExample: {
        code: `# Safe user input processing and error handling
raw_input = "  42  "
cleaned = raw_input.strip()
if cleaned.isdigit():
    number = int(cleaned)
    print(f"Parsed valid integer: {number}")
else:
    print("Invalid numeric string")`,
        explanation: 'Clean data sanitation using string methods and type conversion.',
        expectedOutput: 'Parsed valid integer: 42',
      },
      advancedExample: {
        code: `import sys

# Bytecode inspection and object header memory overhead
val = 1
print(f"Type: {type(val).__name__}")
print(f"Memory overhead of PyLongObject: {sys.getsizeof(val)} bytes")`,
        explanation: 'CPython integers are full C structures containing reference counts and digit arrays (28 bytes minimum).',
        expectedOutput: 'Type: int\nMemory overhead of PyLongObject: 28 bytes',
      },
      practiceExercises: [
        {
          id: 'fund-rt-ex1',
          title: 'Exercise 1: Basic Input Greeting',
          prompt: 'Write a script asking for user name and year of birth, then calculate their age assuming the current year is 2026.',
          hint: 'Cast birth_year with int().',
          starterCode: 'name = "Rishi"\nbirth_year = "2002"\n# compute and print age\n',
          solutionCode: 'name = "Rishi"\nbirth_year = "2002"\nage = 2026 - int(birth_year)\nprint(f"Hello {name}, you are {age} years old.")',
        },
      ],
      practiceQuestion: {
        question: 'Which indentation standard does the official Python PEP 8 style guide mandate?',
        options: ['Exactly 4 spaces per indentation level', 'A single tab character', '2 spaces per level', 'Any combination of tabs and spaces'],
        correctIndex: 0,
        explanation: 'PEP 8 strictly mandates 4 spaces per indentation level and forbids mixing tabs with spaces.',
        difficulty: 'easy',
        type: 'mcq',
        hint: 'PEP 8 specifies an exact number of space characters for code blocks.',
      },
      practiceQuestions: [
        {
          id: 'fund-q1',
          question: 'Which indentation standard does the official Python PEP 8 style guide mandate?',
          options: ['Exactly 4 spaces per indentation level', 'A single tab character', '2 spaces per level', 'Any combination of tabs and spaces'],
          correctIndex: 0,
          difficulty: 'easy',
          type: 'mcq',
          explanation: 'PEP 8 strictly mandates 4 spaces per indentation level and forbids mixing tabs with spaces.',
          hint: 'PEP 8 specifies an exact number of space characters for code blocks.',
        },
        {
          id: 'fund-q2',
          question: 'What is the exact terminal output of this Python code snippet?',
          codeSnippet: 'x = 10\ny = x\nx += 5\nprint(y)',
          options: ['10', '15', 'None', 'TypeError: integer immutability'],
          correctIndex: 0,
          difficulty: 'medium',
          type: 'output_prediction',
          explanation: 'Integers are immutable in Python. Reassigning x = x + 5 binds x to a new integer 15, leaving y pointing to 10.',
          hint: 'Integers are immutable; `x += 5` creates a new object rather than modifying 10.',
        },
        {
          id: 'fund-q3',
          question: 'Identify the bug in this age calculation script and select the proper fix:',
          codeSnippet: 'birth_year = "2000"\nage = 2026 - birth_year\nprint(f"Age: {age}")',
          options: [
            'TypeError: unsupported operand for - (str and int). Fix: int(birth_year)',
            'SyntaxError: f-strings cannot format integers directly',
            'NameError: birth_year is not defined',
            'ValueError: 2026 is an invalid integer literal',
          ],
          correctIndex: 0,
          difficulty: 'challenging',
          type: 'debugging',
          explanation: 'birth_year is a string. Python disallows subtraction between integers and strings without explicit casting int(birth_year).',
          hint: 'You cannot perform mathematical subtraction between an int and a str.',
        },
        {
          id: 'fund-q4',
          question: 'What does `bool("False")` evaluate to in Python?',
          options: ['True', 'False', 'None', 'ValueError'],
          correctIndex: 0,
          difficulty: 'easy',
          type: 'output_prediction',
          explanation: 'In Python, any non-empty string is truthy, regardless of the text it contains. Only empty string `""` evaluates to False.',
          hint: 'Non-empty strings in Python always evaluate to truthy.',
        },
        {
          id: 'fund-q5',
          question: 'What will be printed when inspecting `b` after this chained assignment?',
          codeSnippet: 'a = b = []\na.append(42)\nprint(b)',
          options: ['[42]', '[]', 'None', 'TypeError: chained assignment creates copies'],
          correctIndex: 0,
          difficulty: 'medium',
          type: 'output_prediction',
          explanation: 'Chained assignment binds both `a` and `b` to the exact same list instance in memory. Modifying `a` reflects in `b`.',
          hint: 'Chained assignment points both variables to the same heap object.',
        },
        {
          id: 'fund-q6',
          question: 'Why does `0.1 + 0.2 == 0.3` evaluate to False in Python?',
          options: [
            'Binary floating-point hardware cannot represent 0.1 and 0.2 exactly in base 2 (0.1 + 0.2 ≈ 0.30000000000000004)',
            'Python rounds all float additions down to zero',
            'The == operator is not permitted between floating point variables',
            'Float literals must use the decimal.Decimal type to evaluate equality',
          ],
          correctIndex: 0,
          difficulty: 'challenging',
          type: 'mcq',
          explanation: 'Python uses IEEE 754 double precision floats. Numbers like 0.1 and 0.2 have repeating fractions in binary, causing tiny rounding differences.',
          hint: 'Think about base-2 representation of decimal fractions.',
        },
      ],
    },
    {
      id: 'node-fund-syntax',
      title: 'SYNTAX & INDENTATION',
      shortExplanation: 'Whitespace scoping rules, single-line (#) and multiline docstring comments.',
      category: 'syntax',
      depth: 1,
      position: [3.8, 1.2, 0.4],
      size: 1.0,
      color: '#38bdf8',
      beginnerExplanation:
        'Instead of using curly braces {} or "begin/end" keywords, Python uses indentation depth to define which statements belong inside functions, loops, and conditions.',
      intermediateExplanation:
        'Colons ":" announce indented suites. The Python tokenizer converts leading whitespace into INDENT and DEDENT tokens on the compiler token stack.',
      advancedDetails:
        'Mixing tabs and spaces causes TabError in Python 3. Comments beginning with # are completely stripped during tokenization, while multiline string literals without assignment become __doc__ docstrings.',
      whyItMatters: 'Enforces clean visual structure without noisy syntax punctuation like semicolons or brackets.',
      practicalUseCases: [
        'Documenting functions with PEP 257 docstrings for automated documentation generation',
        'Creating clean nested code structures that are instantly readable by teammates',
      ],
      commonMistakes: ['Inconsistent indentation levels leading to IndentationError.', 'Using tabs in one file and spaces in another.'],
      lessonSteps: [
        { stepNumber: 1, title: 'Colon + 4 Spaces', explanation: 'A colon ":" introduces an indented suite of code.' },
        { stepNumber: 2, title: 'Comments vs Docstrings', explanation: 'Use # for inline notes and triple quotes """ for function documentation.' },
      ],
      concreteExample: {
        code: 'def check_positive(n):\n    """Return True if positive, else False."""\n    if n > 0:\n        return True\n    return False\nprint(check_positive(5))',
        explanation: 'Clean block indentation defining function and conditional scopes with docstring.',
        expectedOutput: 'True',
      },
      practiceQuestion: {
        question: 'What error occurs if code blocks are indented with inconsistent spacing?',
        options: ['IndentationError', 'MemoryError', 'TypeError', 'SystemExit'],
        correctIndex: 0,
        explanation: 'The Python tokenizer raises an IndentationError when block indentation levels do not match.',
      },
      practiceQuestions: [
        {
          id: 'syn-q1',
          question: 'What error occurs if code blocks are indented with inconsistent spacing?',
          options: ['IndentationError', 'MemoryError', 'TypeError', 'SystemExit'],
          correctIndex: 0,
          difficulty: 'easy',
          type: 'mcq',
          explanation: 'The Python tokenizer raises an IndentationError when block indentation levels do not match.',
        },
        {
          id: 'syn-q2',
          question: 'What will be the output of accessing the __doc__ attribute of this function?',
          codeSnippet: 'def add(a, b):\n    """Calculates sum."""\n    return a + b\nprint(add.__doc__.strip())',
          options: ['Calculates sum.', 'None', 'add(a, b)', 'AttributeError: __doc__ not found'],
          correctIndex: 0,
          difficulty: 'medium',
          type: 'output_prediction',
          explanation: 'Triple-quoted strings placed directly under a function header are stored as the function docstring in __doc__.',
        },
        {
          id: 'syn-q3',
          question: 'Which of the following causes an IndentationError in Python 3?',
          options: [
            'Indenting the body of an if statement with 3 spaces while another has 4 spaces in the same block',
            'Leaving a blank line between two statements inside a function',
            'Using single quotes instead of double quotes for strings',
            'Putting comments at different indentation levels',
          ],
          correctIndex: 0,
          difficulty: 'challenging',
          type: 'mcq',
          explanation: 'Mismatched indentation depth within the same scope block triggers an IndentationError: unindent does not match any outer indentation level.',
        },
      ],
    },
    {
      id: 'node-fund-variables',
      title: 'VARIABLES & TYPES',
      shortExplanation: 'Binding names to objects in heap memory: int, float, str, bool, and NoneType.',
      category: 'data',
      depth: 1,
      position: [1.8, 3.4, -1.0],
      size: 1.0,
      color: '#34d399',
      linkedMapTopic: 'Explain Python variables',
      beginnerExplanation:
        'A variable in Python is a label attached to a value in memory. When you write score = 100, the name "score" points to the integer object 100.',
      intermediateExplanation:
        'Python uses dynamic typing and strong typing: types belong to objects, not variable names. The type() function reveals object type, and id() reveals memory address.',
      advancedDetails:
        'Small integers (-5 to 256) are interned in a single-instance cache. Variables assigned the same small integer point to the identical address, satisfying both "==" and "is".',
      whyItMatters: 'Understanding reference semantics prevents accidental shared mutation bugs.',
      practicalUseCases: [
        'Tracking game state and user sessions in web applications',
        'Managing configuration parameters and feature flags',
      ],
      commonMistakes: ['Thinking variable assignment copies data; it binds references.'],
      lessonSteps: [
        { stepNumber: 1, title: 'Dynamic Binding', explanation: 'Variables do not require explicit type declaration before assignment.' },
        { stepNumber: 2, title: 'Identity vs Equality', explanation: 'Use == to compare values; use "is" to compare memory addresses.' },
      ],
      concreteExample: {
        code: 'x = 100\ny = x\nprint(x is y)  # Same object reference',
        explanation: 'Both x and y refer to the exact same immutable integer object 100.',
        expectedOutput: 'True',
      },
      practiceQuestion: {
        question: 'What is the type of a variable assigned the value None in Python?',
        options: ['NoneType', 'null', 'void', 'undefined'],
        correctIndex: 0,
        explanation: 'In Python, None is a singleton object whose type is NoneType.',
      },
      practiceQuestions: [
        {
          id: 'var-q1',
          question: 'What is the type of a variable assigned the value None in Python?',
          options: ['NoneType', 'null', 'void', 'undefined'],
          correctIndex: 0,
          difficulty: 'easy',
          type: 'mcq',
          explanation: 'In Python, None is a singleton object whose type is NoneType.',
        },
        {
          id: 'var-q2',
          question: 'Predict the output of the following identity comparison:',
          codeSnippet: 'a = [1, 2]\nb = [1, 2]\nprint(a == b, a is b)',
          options: ['True False', 'True True', 'False False', 'False True'],
          correctIndex: 0,
          difficulty: 'medium',
          type: 'output_prediction',
          explanation: 'a and b have equal values (True for ==), but list literals allocate distinct objects in heap memory (False for "is").',
        },
        {
          id: 'var-q3',
          question: 'Which statement accurately describes dynamic typing in Python?',
          options: [
            'A variable can be reassigned to an object of a completely different data type at runtime',
            'Variables automatically convert types without error during addition with any other type',
            'Variables do not have data types in memory',
            'All variables are compiled to C void pointers with static bounds',
          ],
          correctIndex: 0,
          difficulty: 'challenging',
          type: 'mcq',
          explanation: 'In dynamic typing, variables are names bound to objects. The variable can reference an int and later reference a string.',
        },
      ],
    },
    {
      id: 'node-fund-operators',
      title: 'OPERATORS & PRECEDENCE',
      shortExplanation: '7 operator classes: arithmetic, comparison, logical, assignment, identity, membership, and bitwise.',
      category: 'foundation',
      depth: 1,
      position: [-2.0, 3.2, 1.2],
      size: 1.0,
      color: '#818cf8',
      beginnerExplanation:
        'Operators tell Python how to calculate and decide. Arithmetic (+, -, *, /) handles numbers; comparisons (>, <, ==) and logic (and, or, not) drive decisions.',
      intermediateExplanation:
        'Evaluation follows PEMDAS precedence: parentheses -> exponentiation (**) -> unary (~, -) -> multiplication/division (*, /, //, %) -> addition/subtraction (+, -) -> comparisons -> boolean logic.',
      advancedDetails:
        'Python short-circuits boolean operators: "A and B" returns A if A is falsy, else returns B without evaluating B. "A or B" returns A if A is truthy, else returns B.',
      whyItMatters: 'Operator precedence controls evaluation order in mathematical and conditional logic expressions.',
      practicalUseCases: [
        'Formulas for e-commerce cart totals and discounts',
        'Validating multi-step permission requirements with short-circuiting',
      ],
      commonMistakes: ['Confusing bitwise & and | with logical and and or.'],
      lessonSteps: [
        { stepNumber: 1, title: 'Precedence Rules', explanation: 'Exponentiation (**) beats multiplication (*), which beats addition (+).' },
        { stepNumber: 2, title: 'Short-Circuit Logic', explanation: '"and" returns the first falsy operand; "or" returns the first truthy operand.' },
      ],
      concreteExample: {
        code: '# Short-circuit evaluation\ndef noisy(): print("Evaluated!"); return True\nresult = False and noisy()\nprint("Result:", result)',
        explanation: 'Because the first operand is False, "and" immediately returns False without running noisy().',
        expectedOutput: 'Result: False',
      },
      practiceQuestion: {
        question: 'Which operator checks whether two variables refer to the exact same memory address?',
        options: ['is', '==', 'eq()', 'in'],
        correctIndex: 0,
        explanation: 'The "is" operator tests object identity (memory location), whereas "==" tests value equality.',
      },
      practiceQuestions: [
        {
          id: 'op-q1',
          question: 'What is the evaluated output of 2 + 3 * 4 in Python?',
          options: ['14', '20', '24', '18'],
          correctIndex: 0,
          difficulty: 'easy',
          type: 'mcq',
          explanation: 'Multiplication has higher precedence than addition: 3 * 4 = 12, then 2 + 12 = 14.',
        },
        {
          id: 'op-q2',
          question: 'Predict the output of this logical expression:',
          codeSnippet: 'print([] or "Python" and 42)',
          options: ['42', 'Python', 'True', '[]'],
          correctIndex: 0,
          difficulty: 'medium',
          type: 'output_prediction',
          explanation: '"and" has higher precedence than "or". "Python" and 42 evaluates to 42 (both truthy). Then [] or 42 evaluates to 42 ([] is falsy).',
        },
        {
          id: 'op-q3',
          question: 'What is the result of 15 // 4 and 15 % 4 in Python?',
          options: ['3 and 3', '3.75 and 3', '4 and 1', '3 and 4'],
          correctIndex: 0,
          difficulty: 'challenging',
          type: 'mcq',
          explanation: 'Floor division (//) truncates to 3, and modulo (%) gives the remainder 3 (15 = 4*3 + 3).',
        },
      ],
    },
    {
      id: 'node-fund-io',
      title: 'INPUT & OUTPUT',
      shortExplanation: 'Terminal input with input() and formatted printing with f-strings and print().',
      category: 'application',
      depth: 1,
      position: [-3.6, -1.2, -0.6],
      size: 1.0,
      color: '#f43f5e',
      beginnerExplanation:
        'Programs communicate with humans by reading input from keyboards using input() and printing text to terminals using formatted f-strings.',
      intermediateExplanation:
        'f-strings (PEP 498) evaluate bracketed expressions at runtime with format specifications (e.g., :.2f for currency, :>10 for right-alignment).',
      advancedDetails:
        'print() supports "sep" and "end" arguments, and writes to sys.stdout with automatic buffer flushing options (flush=True). input() reads from sys.stdin until newline.',
      whyItMatters: 'Input and output provide user interaction and telemetry logging.',
      practicalUseCases: [
        'Formatting terminal logs with timestamps and status indicators',
        'Creating interactive command-line calculators and utilities',
      ],
      commonMistakes: ['Forgetting that input() always returns a string, even when the user enters numbers.'],
      lessonSteps: [
        { stepNumber: 1, title: 'Formatted Strings (f-strings)', explanation: 'Prefix strings with f and embed expressions in curly brackets {}.' },
        { stepNumber: 2, title: 'Type Casting Input', explanation: 'Wrap input() in int() or float() to perform math operations.' },
      ],
      concreteExample: {
        code: 'item = "Widget"\nprice = 19.99\nprint(f"Item: {item:<10} | Price: ${price:.2f}")',
        explanation: 'Formats output with padding and floating-point decimal precision.',
        expectedOutput: 'Item: Widget     | Price: $19.99',
      },
      practiceQuestion: {
        question: 'What data type does the built-in function input() return?',
        options: ['str (string)', 'int (integer)', 'auto-detected type', 'bytes'],
        correctIndex: 0,
        explanation: 'The input() function always returns user terminal keystrokes as a string (str).',
      },
      practiceQuestions: [
        {
          id: 'io-q1',
          question: 'What data type does the built-in function input() return?',
          options: ['str (string)', 'int (integer)', 'auto-detected type', 'bytes'],
          correctIndex: 0,
          difficulty: 'easy',
          type: 'mcq',
          explanation: 'The input() function always returns user terminal keystrokes as a string (str).',
        },
        {
          id: 'io-q2',
          question: 'What is the output of print("A", "B", "C", sep="-", end="!")?',
          options: ['A-B-C!', 'A B C!', 'A-B-C\\n!', 'ABC!'],
          correctIndex: 0,
          difficulty: 'medium',
          type: 'output_prediction',
          explanation: 'The sep parameter specifies the delimiter between items ("-"), and end specifies the final character ("!").',
        },
        {
          id: 'io-q3',
          question: 'What does the format specifier f"{123.456:.2f}" produce in Python?',
          options: ['123.46', '123.45', '123', '123.5'],
          correctIndex: 0,
          difficulty: 'challenging',
          type: 'mcq',
          explanation: 'The specifier :.2f rounds the floating-point number to two decimal places, producing "123.46".',
        },
      ],
    },
  ],
  edges: [
    { id: 'e-fund-1', source: 'node-fund-root', target: 'node-fund-syntax', relationship: 'defines_rules', description: 'Whitespace and grammar contracts' },
    { id: 'e-fund-2', source: 'node-fund-root', target: 'node-fund-variables', relationship: 'allocates', description: 'Memory binding and type system' },
    { id: 'e-fund-3', source: 'node-fund-root', target: 'node-fund-operators', relationship: 'computes', description: 'Mathematical and logical operations' },
    { id: 'e-fund-4', source: 'node-fund-root', target: 'node-fund-io', relationship: 'interacts', description: 'Reading input and terminal output' },
  ],
}

// ==============================================================================
// SECTION B: CONTROL FLOW 3D MAP
// ==============================================================================
export const PYTHON_CONTROL_FLOW_MAP: KnowledgeMap = {
  id: 'map-sec-control-flow',
  topic: 'Python Control Flow',
  title: 'Section B: Control Flow & Iteration Anatomy',
  description:
    'Branching decision trees (if/elif/else), loops (for, while), range() generators, loop controls (break, continue, pass), and nested iteration.',
  centralNodeId: 'node-cf-root',
  parentMapId: 'map-python-master',
  parentMapTopic: 'Python Programming Master Curriculum',
  parentMapTitle: 'Python Overview',
  createdAt: '2026-10-15T10:00:00Z',
  isDemo: true,
  demoNote: 'Curated Section B Architecture',
  searchStatus: 'verified-web',
  sources: [
    {
      title: 'Python Documentation: More Control Flow Tools',
      url: 'https://docs.python.org/3/tutorial/controlflow.html',
      snippet: 'if statements, for statements, range() function, break, continue, and else clauses on loops.',
      sourceName: 'Python Docs',
    },
  ],
  nodes: [
    {
      id: 'node-cf-root',
      title: 'CONTROL FLOW',
      shortExplanation: 'Directing the execution path of code via boolean branches and iterative loops.',
      category: 'core',
      depth: 0,
      position: [0, 0, 0],
      size: 1.45,
      color: '#818cf8',
      beginnerExplanation:
        'Control flow allows programs to make decisions and repeat actions. If-statements choose which branches run; loops repeat code until work is done.',
      intermediateExplanation:
        'Python executes statements sequentially unless interrupted by conditional jumps (POP_JUMP_IF_FALSE) or loop iterators conforming to the iteration protocol (__iter__, __next__).',
      advancedDetails:
        'Loop "else" blocks run only if iteration finishes naturally without triggering a "break". The match/case construct (PEP 634) adds structural pattern matching.',
      whyItMatters: 'Control flow gives algorithms the ability to respond to changing input and repeat processing without code duplication.',
      practicalUseCases: [
        'Authentication and role permission gating in web backends',
        'Batching 10,000 database records in automated migration pipelines',
      ],
      commonMistakes: ['Infinite loops created by missed termination conditions.', 'Modifying sequences during active iteration.'],
      lessonSteps: [
        { stepNumber: 1, title: 'Branching vs Looping', explanation: 'If-statements diverge paths; loops cycle through code blocks.' },
        { stepNumber: 2, title: 'Loop Control', explanation: 'break exits the loop immediately; continue skips to the next iteration.' },
      ],
      concreteExample: {
        code: '# Loop with continue & break\nfor i in range(10):\n    if i % 2 == 0: continue # Skip evens\n    if i > 5: break          # Stop at 7\n    print(i, end=" ")',
        explanation: 'Demonstrates flow alteration using continue and break.',
        expectedOutput: '1 3 5',
      },
      edgeCases: [
        'Short-circuit evaluation stops evaluating logical operators once the outcome is guaranteed (e.g. False and func() never executes func).',
        'Mutating a list while iterating over it in a for loop causes elements to be skipped silently due to pointer shifting.',
        'A break statement inside nested loops terminates only the innermost loop, not the enclosing outer loop.',
      ],
      intermediateExample: {
        code: `# Early exit guard pattern in processing records
def process_transaction(user, amount):
    if user is None:
        return "Error: No user"
    if amount <= 0:
        return "Error: Invalid amount"
    if user.get("balance", 0) < amount:
        return "Error: Insufficient funds"
    return f"Success: Processed \${amount}"

print(process_transaction({"balance": 100}, 50))`,
        explanation: 'Guard clauses simplify nested if-else pyramids into readable linear validation steps.',
        expectedOutput: 'Success: Processed $50',
      },
      advancedExample: {
        code: `# Structural pattern matching with guard clauses (Python 3.10+)
def route_event(event):
    match event:
        case {"type": "click", "x": x, "y": y} if x > 0 and y > 0:
            return f"Valid viewport click at ({x}, {y})"
        case {"type": "keypress", "key": key}:
            return f"Key press: {key}"
        case _:
            return "Unhandled event"

print(route_event({"type": "click", "x": 100, "y": 200}))`,
        explanation: 'Pattern matching destructures dictionaries and evaluates contextual guard conditions simultaneously.',
        expectedOutput: 'Valid viewport click at (100, 200)',
      },
      practiceExercises: [
        {
          id: 'cf-rt-ex1',
          title: 'Exercise 1: Multiplication Table Matrix',
          prompt: 'Write a nested loop that prints a 3x3 multiplication grid.',
          hint: 'Outer loop row in range(1, 4), inner loop col in range(1, 4).',
          starterCode: '# write nested loop\n',
          solutionCode: 'for r in range(1, 4):\n    for c in range(1, 4):\n        print(f"{r*c:2}", end=" ")\n    print()',
        },
      ],
      practiceQuestion: {
        question: 'Which statement immediately skips the rest of the current iteration and advances to the next?',
        options: ['continue', 'break', 'pass', 'return'],
        correctIndex: 0,
        explanation: 'The continue statement halts the current iteration cycle and advances to the next item.',
        difficulty: 'easy',
        type: 'mcq',
        hint: 'This keyword skips the remainder of the current loop body.',
      },
      practiceQuestions: [
        {
          id: 'cf-q1',
          question: 'Which statement immediately skips the rest of the current iteration and advances to the next?',
          options: ['continue', 'break', 'pass', 'return'],
          correctIndex: 0,
          difficulty: 'easy',
          type: 'mcq',
          explanation: 'The continue statement halts the current iteration cycle and advances to the next item.',
          hint: 'This keyword skips the remainder of the current loop body.',
        },
        {
          id: 'cf-q2',
          question: 'What is the terminal output of this loop with an else clause?',
          codeSnippet: 'for n in [1, 3, 5]:\n    if n % 2 == 0:\n        break\nelse:\n    print("All odd!")',
          options: ['All odd!', 'Nothing is printed', '1 3 5', 'SyntaxError: else on loop'],
          correctIndex: 0,
          difficulty: 'medium',
          type: 'output_prediction',
          explanation: 'Because no even number was found, the loop never hits break. In Python, loop else executes when a loop runs to natural completion.',
          hint: 'The loop else block executes only if break was not triggered.',
        },
        {
          id: 'cf-q3',
          question: 'Identify why this while loop hangs indefinitely and pick the required fix:',
          codeSnippet: 'count = 1\nwhile count <= 5:\n    print(count)',
          options: [
            'Missing count increment (e.g. count += 1 inside loop body)',
            'while loops cannot test <= condition in Python',
            'print() blocks execution inside while loops',
            'count must be initialized to 0',
          ],
          correctIndex: 0,
          difficulty: 'challenging',
          type: 'debugging',
          explanation: 'Without updating count += 1, the condition count <= 5 remains True forever, causing an infinite loop.',
          hint: 'Check if the condition variable changes anywhere in the loop body.',
        },
        {
          id: 'cf-q4',
          question: 'What is the output of this conditional checking truthiness of an empty list?',
          codeSnippet: 'items = []\nif items:\n    print("Full")\nelse:\n    print("Empty")',
          options: ['Empty', 'Full', 'None', 'TypeError'],
          correctIndex: 0,
          difficulty: 'easy',
          type: 'output_prediction',
          explanation: 'Empty containers (lists, tuples, dicts, sets, strings) evaluate to False in boolean contexts in Python.',
          hint: 'Empty containers in Python evaluate to falsy.',
        },
        {
          id: 'cf-q5',
          question: 'Will "Executed" be printed by the following code with short-circuiting?',
          codeSnippet: 'def log_msg():\n    print("Executed")\n    return True\n\nres = False and log_msg()',
          options: [
            'No, because "and" short-circuits immediately when the first operand is False',
            'Yes, Python evaluates all operands before returning',
            'Yes, log_msg() runs during compilation',
            'SyntaxError: cannot assign boolean expression to variable',
          ],
          correctIndex: 0,
          difficulty: 'medium',
          type: 'debugging',
          explanation: 'Python evaluates boolean "and" from left to right. Since the left operand is False, the entire result is guaranteed to be False, so log_msg() is never called.',
          hint: 'In `A and B`, if A is False, B is never evaluated.',
        },
        {
          id: 'cf-q6',
          question: 'In structural pattern matching (match/case), what does the underscore `case _:` represent?',
          options: [
            'The wildcard / default pattern that matches any unmatched subject',
            'A syntax error in Python 3.10+',
            'A pattern that matches only None values',
            'A pattern that forces the match statement to repeat',
          ],
          correctIndex: 0,
          difficulty: 'challenging',
          type: 'mcq',
          explanation: 'The underscore `_` in a match statement acts as a wildcard catch-all pattern, functioning like the default case in other languages.',
          hint: 'The underscore is the standard wildcard in pattern matching.',
        },
      ],
    },
    {
      id: 'node-cf-branching',
      title: 'IF / ELIF / ELSE',
      shortExplanation: 'Conditional decision trees evaluated sequentially based on truthiness.',
      category: 'control',
      depth: 1,
      position: [3.6, 1.4, -0.8],
      size: 1.0,
      color: '#818cf8',
      beginnerExplanation:
        'Conditional statements let code react to circumstances. If the first condition is True, its block runs. Otherwise, elif conditions are checked in order.',
      intermediateExplanation:
        'Python tests truth value: empty collections ([], "", {}), zero numbers (0, 0.0), and None evaluate to False. All other objects evaluate to True.',
      advancedDetails:
        'Ternary conditional expressions allow inline assignments: x = a if condition else b. Structural pattern matching (match/case) evaluates patterns with guard clauses (if).',
      whyItMatters: 'Allows programs to implement business rules, permission checks, and data validation.',
      practicalUseCases: [
        'User permission verification and role-based access control',
        'Validating network response status codes (200 OK vs 404/500)',
      ],
      commonMistakes: ['Over-nesting deeply indented if-statements instead of early returns.'],
      lessonSteps: [
        { stepNumber: 1, title: 'Truth Value Testing', explanation: 'Empty collections [], {}, 0, and None evaluate as falsy in conditions.' },
        { stepNumber: 2, title: 'Ternary Operator', explanation: 'value_if_true if condition else value_if_false.' },
      ],
      concreteExample: {
        code: 'user = None\nrole = "admin" if user else "guest"\nprint(f"Role: {role}")',
        explanation: 'Ternary conditional operator: [value_if_true] if [condition] else [value_if_false].',
        expectedOutput: 'Role: guest',
      },
      practiceQuestion: {
        question: 'What is the boolean evaluation of an empty Python list [] in an if-statement?',
        options: ['False', 'True', 'TypeError', 'None'],
        correctIndex: 0,
        explanation: 'In Python, empty sequences and collections ([], "", {}, set()) evaluate to False (falsy).',
      },
      practiceQuestions: [
        {
          id: 'br-q1',
          question: 'What is the boolean evaluation of an empty Python list [] in an if-statement?',
          options: ['False', 'True', 'TypeError', 'None'],
          correctIndex: 0,
          difficulty: 'easy',
          type: 'mcq',
          explanation: 'In Python, empty sequences and collections ([], "", {}, set()) evaluate to False (falsy).',
        },
        {
          id: 'br-q2',
          question: 'What does this conditional snippet print?',
          codeSnippet: 'val = 0\nstatus = "Active" if val else "Inactive"\nprint(status)',
          options: ['Inactive', 'Active', '0', 'None'],
          correctIndex: 0,
          difficulty: 'medium',
          type: 'output_prediction',
          explanation: 'The integer 0 is falsy, so the ternary operator resolves to the else branch "Inactive".',
        },
        {
          id: 'br-q3',
          question: 'Which of the following values is truthy in a Python boolean condition?',
          options: ['[-1]', '0', '""', 'None'],
          correctIndex: 0,
          difficulty: 'challenging',
          type: 'mcq',
          explanation: 'A list containing any element (even negative numbers or False) is non-empty, and therefore evaluates to True.',
        },
      ],
    },
    {
      id: 'node-cf-loops',
      title: 'FOR & WHILE LOOPS',
      shortExplanation: 'Definite traversal over iterables (for) and indefinite conditional repetition (while).',
      category: 'control',
      depth: 1,
      position: [1.2, 3.6, 1.2],
      size: 1.0,
      color: '#818cf8',
      linkedMapTopic: 'Explain loops in Python',
      beginnerExplanation:
        'A for loop repeats once for each item in a collection or range. A while loop repeats as long as a condition stays True.',
      intermediateExplanation:
        'The for loop calls iter(obj) to acquire an iterator, then repeatedly invokes next(it) until StopIteration is raised. It handles indexing automatically.',
      advancedDetails:
        'Nested loops have O(N*M) algorithmic complexity. Python provides itertools (product, combinations) and enumerate() to handle iteration elegantly.',
      whyItMatters: 'Automates batch data processing across lists, dictionaries, files, and network sockets.',
      practicalUseCases: [
        'Reading rows from a CSV spreadsheet one by one',
        'Retrying an API call up to 3 times with a while loop',
      ],
      commonMistakes: ['Forgetting while loop variable increments causing infinite hangs.'],
      lessonSteps: [
        { stepNumber: 1, title: 'for in Iterable', explanation: 'Traverses each element in sequence without needing manual index counters.' },
        { stepNumber: 2, title: 'enumerate() Helper', explanation: 'Produces (index, value) tuples simultaneously.' },
      ],
      concreteExample: {
        code: 'count = 3\nwhile count > 0:\n    print(count, end=" ")\n    count -= 1\nprint("Blastoff!")',
        explanation: 'Indefinite loop that decrements a counter until condition is False.',
        expectedOutput: '3 2 1 Blastoff!',
      },
      practiceQuestion: {
        question: 'Which loop construct is best suited for traversing every element of a known list?',
        options: ['for item in list:', 'while i < len(list):', 'goto loop', 'repeat until'],
        correctIndex: 0,
        explanation: 'The for-in loop is the idiomatic, safe Python construct for traversing collections.',
      },
      practiceQuestions: [
        {
          id: 'lp-q1',
          question: 'Which loop construct is best suited for traversing every element of a known list?',
          options: ['for item in list:', 'while i < len(list):', 'goto loop', 'repeat until'],
          correctIndex: 0,
          difficulty: 'easy',
          type: 'mcq',
          explanation: 'The for-in loop is the idiomatic, safe Python construct for traversing collections.',
        },
        {
          id: 'lp-q2',
          question: 'What is the output of this loop using enumerate()?',
          codeSnippet: 'items = ["a", "b"]\nfor idx, val in enumerate(items, start=1):\n    print(f"{idx}:{val}", end=" ")',
          options: ['1:a 2:b ', '0:a 1:b ', '1:b 2:a ', 'a:1 b:2 '],
          correctIndex: 0,
          difficulty: 'medium',
          type: 'output_prediction',
          explanation: 'enumerate(..., start=1) starts the counter index at 1, outputting 1:a 2:b.',
        },
        {
          id: 'lp-q3',
          question: 'What happens when modifying a list while iterating directly over it with a for loop?',
          options: [
            'Items can be skipped or processed twice due to internal index shifting',
            'Python raises a ConcurrentModificationException immediately',
            'The loop freezes permanently',
            'Python automatically makes a deep copy of the list before iteration',
          ],
          correctIndex: 0,
          difficulty: 'challenging',
          type: 'mcq',
          explanation: 'Mutating a list during iteration shifts elements in the underlying array, causing silent index skips or duplicates. Iterating over list(items) avoids this.',
        },
      ],
    },
    {
      id: 'node-cf-range',
      title: 'RANGE() GENERATOR',
      shortExplanation: 'Memory-efficient lazy sequence generator: range(start, stop, step).',
      category: 'syntax',
      depth: 1,
      position: [-2.2, 3.0, -1.0],
      size: 1.0,
      color: '#c084fc',
      beginnerExplanation:
        'range() generates a sequence of numbers on the fly. range(5) generates 0, 1, 2, 3, 4 without storing all numbers in memory.',
      intermediateExplanation:
        'In Python 3, range is an immutable sequence type. It supports indexing, slicing, and O(1) membership testing ("in") using arithmetic.',
      advancedDetails:
        'range(10_000_000) consumes exactly 48 bytes of RAM because it stores only start, stop, step parameters and calculates numbers on demand.',
      whyItMatters: 'range(10_000_000) creates an O(1) memory sequence rather than allocating a 10-million element array.',
      practicalUseCases: [
        'Iterating N times to generate sample test data',
        'Stepping backwards through indices with range(10, 0, -1)',
      ],
      commonMistakes: ['Forgetting that the "stop" parameter is exclusive (stop-1).'],
      lessonSteps: [
        { stepNumber: 1, title: 'Start, Stop, Step', explanation: 'range(2, 10, 2) generates 2, 4, 6, 8.' },
      ],
      concreteExample: {
        code: 'evens = list(range(0, 10, 2))\nprint(evens)',
        explanation: 'Generates even numbers up to 10 (exclusive).',
        expectedOutput: '[0, 2, 4, 6, 8]',
      },
      practiceQuestion: {
        question: 'What is the last number generated by range(1, 5)?',
        options: ['4', '5', '6', '1'],
        correctIndex: 0,
        explanation: 'In Python, the stop parameter of range() is strictly exclusive, so range(1, 5) generates 1, 2, 3, 4.',
      },
      practiceQuestions: [
        {
          id: 'rng-q1',
          question: 'What is the last number generated by range(1, 5)?',
          options: ['4', '5', '6', '1'],
          correctIndex: 0,
          difficulty: 'easy',
          type: 'mcq',
          explanation: 'In Python, the stop parameter of range() is strictly exclusive, so range(1, 5) generates 1, 2, 3, 4.',
        },
        {
          id: 'rng-q2',
          question: 'What is the result of list(range(6, 0, -2))?',
          options: ['[6, 4, 2]', '[6, 4, 2, 0]', '[4, 2, 0]', '[6, 5, 4, 3, 2, 1]'],
          correctIndex: 0,
          difficulty: 'medium',
          type: 'output_prediction',
          explanation: 'Starting at 6, decrementing by 2, and stopping before 0 yields [6, 4, 2].',
        },
        {
          id: 'rng-q3',
          question: 'How much memory does range(1_000_000_000) consume in Python 3?',
          options: [
            'O(1) constant small memory (~48 bytes)',
            'Approximately 8 Gigabytes of RAM',
            '4 Megabytes of heap cache',
            'It raises MemoryError immediately upon invocation',
          ],
          correctIndex: 0,
          difficulty: 'challenging',
          type: 'mcq',
          explanation: 'range() is a lazy sequence object storing only start, stop, and step. It calculates values on request and takes O(1) memory.',
        },
      ],
    },
  ],
  edges: [
    { id: 'e-cf-1', source: 'node-cf-root', target: 'node-cf-branching', relationship: 'branches_on', description: 'Boolean conditional trees' },
    { id: 'e-cf-2', source: 'node-cf-root', target: 'node-cf-loops', relationship: 'iterates_with', description: 'Definite and indefinite loops' },
    { id: 'e-cf-3', source: 'node-cf-root', target: 'node-cf-range', relationship: 'generates_sequence', description: 'Lazy numeric indexing' },
  ],
}

// ==============================================================================
// SECTION C: DATA STRUCTURES 3D MAP
// ==============================================================================
export const PYTHON_DATA_STRUCTURES_MAP: KnowledgeMap = {
  id: 'map-sec-data-structures',
  topic: 'Python Data Structures',
  title: 'Section C: Data Structures Architecture',
  description:
    'Strings, lists, tuples, sets, dictionaries, indexing, slicing [start:stop:step], comprehensions, and mutability vs immutability.',
  centralNodeId: 'node-ds-root',
  parentMapId: 'map-python-master',
  parentMapTopic: 'Python Programming Master Curriculum',
  parentMapTitle: 'Python Overview',
  createdAt: '2026-10-15T10:00:00Z',
  isDemo: true,
  demoNote: 'Curated Section C Architecture',
  searchStatus: 'verified-web',
  sources: [
    {
      title: 'Python Documentation: Data Structures & Collections',
      url: 'https://docs.python.org/3/tutorial/datastructures.html',
      snippet: 'More on lists, del statement, tuples and sequences, sets, dictionaries, and looping techniques.',
      sourceName: 'Python Docs',
    },
  ],
  nodes: [
    {
      id: 'node-ds-root',
      title: 'DATA STRUCTURES',
      shortExplanation: 'How data is organized, accessed, and transformed in memory.',
      category: 'core',
      depth: 0,
      position: [0, 0, 0],
      size: 1.45,
      color: '#34d399',
      beginnerExplanation:
        'Python provides four primary built-in data collections: Lists (ordered, changeable), Tuples (ordered, unchangeable), Sets (unique items), and Dictionaries (key-value lookups).',
      intermediateExplanation:
        'Sequences support positive and negative indexing, slicing, concatenation (+), and membership testing ("in"). Dictionaries and sets use hash tables for O(1) average lookup.',
      advancedDetails:
        'Lists are dynamic arrays with amortized O(1) append. Dictionaries preserve insertion order in Python 3.7+ using a compact array of indices pointing to hash entries.',
      whyItMatters: 'Picking the right structure turns slow O(N) operations into instant O(1) lookups.',
      practicalUseCases: [
        'Removing duplicates from a customer list using set() in O(N) time',
        'Caching database records in memory using dictionary lookups',
      ],
      commonMistakes: ['Modifying mutable objects in place without realizing alias references also change.'],
      lessonSteps: [
        { stepNumber: 1, title: 'Sequences vs Mappings', explanation: 'Lists/tuples access items by position index; dictionaries access by unique hashable key.' },
        { stepNumber: 2, title: 'Mutability Rules', explanation: 'Lists and dicts are mutable; strings and tuples are immutable.' },
      ],
      concreteExample: {
        code: '# Data structure interplay\nraw_data = ["apple", "banana", "apple", "orange"]\nunique_set = set(raw_data)\nlookup = {fruit: len(fruit) for fruit in unique_set}\nprint(lookup)',
        explanation: 'Converts a list to a set to remove duplicates, then uses a dict comprehension to map lengths.',
        expectedOutput: "{'apple': 5, 'banana': 6, 'orange': 6}",
      },
      edgeCases: [
        'A tuple containing mutable elements (e.g. (1, [2, 3])) is unhashable and raises TypeError if used as a dict key or set item.',
        'Dictionary key lookups compare both hash equality (__hash__) AND value equality (__eq__), preventing hash collisions from producing wrong data.',
        'Copying nested collections with .copy() creates a shallow copy; modifying inner objects affects both copies unless copy.deepcopy() is used.',
      ],
      intermediateExample: {
        code: `# Frequency counting and group aggregation using dict and collections
from collections import defaultdict, Counter

words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
counts = Counter(words)
print("Most common:", counts.most_common(1))

grouped = defaultdict(list)
for w in words:
    grouped[len(w)].append(w)
print("By length:", dict(grouped))`,
        explanation: 'Specialized containers provide clean, expressive data pipelines for counting and grouping.',
        expectedOutput: "Most common: [('apple', 3)]\nBy length: {5: ['apple', 'apple', 'apple'], 6: ['banana', 'cherry', 'banana']}",
      },
      advancedExample: {
        code: `import sys

# Memory comparison between lists, tuples, and sets
data = list(range(100))
tup = tuple(data)
s = set(data)

print(f"List bytes:  {sys.getsizeof(data)}")
print(f"Tuple bytes: {sys.getsizeof(tup)}")
print(f"Set bytes:   {sys.getsizeof(s)}")`,
        explanation: 'Tuples have lower memory overhead than dynamic lists; sets allocate hash tables taking more memory for O(1) lookups.',
        expectedOutput: 'List bytes:  856\nTuple bytes: 840\nSet bytes:   8408',
      },
      practiceExercises: [
        {
          id: 'ds-rt-ex1',
          title: 'Exercise 1: Nested Data Navigation',
          prompt: 'Given users = [{"id": 1, "profile": {"email": "ada@example.com"}}], extract and print the email safely.',
          hint: 'Use users[0]["profile"]["email"] or .get().',
          starterCode: 'users = [{"id": 1, "profile": {"email": "ada@example.com"}}]\n# extract email\n',
          solutionCode: 'users = [{"id": 1, "profile": {"email": "ada@example.com"}}]\nemail = users[0]["profile"]["email"]\nprint(f"User email: {email}")',
        },
      ],
      practiceQuestion: {
        question: 'What is the average time complexity for key lookup in a Python dictionary?',
        options: ['O(1) constant time', 'O(N) linear time', 'O(log N) logarithmic time', 'O(N^2) quadratic time'],
        correctIndex: 0,
        explanation: 'Python dictionaries utilize a hash table implementation that achieves O(1) average lookup time.',
        difficulty: 'easy',
        type: 'mcq',
        hint: 'Hash tables map keys directly to bucket indices.',
      },
      practiceQuestions: [
        {
          id: 'ds-q1',
          question: 'What is the average time complexity for key lookup in a Python dictionary?',
          options: ['O(1) constant time', 'O(N) linear time', 'O(log N) logarithmic time', 'O(N^2) quadratic time'],
          correctIndex: 0,
          difficulty: 'easy',
          type: 'mcq',
          explanation: 'Python dictionaries utilize a hash table implementation that achieves O(1) average lookup time.',
          hint: 'Hash tables map keys directly to bucket indices.',
        },
        {
          id: 'ds-q2',
          question: 'What is the result of slicing a list with a negative step: [1, 2, 3, 4][::-1]?',
          options: ['[4, 3, 2, 1]', '[1, 2, 3, 4]', '[4, 3]', 'IndexError'],
          correctIndex: 0,
          difficulty: 'medium',
          type: 'output_prediction',
          explanation: 'A step parameter of -1 reverses the sequence, returning [4, 3, 2, 1].',
          hint: 'A negative step traverses the sequence in reverse order.',
        },
        {
          id: 'ds-q3',
          question: 'Why can a tuple (1, [2, 3]) NOT be used as a key in a Python dictionary?',
          options: [
            'It contains a mutable list element, making the entire tuple unhashable (TypeError)',
            'Tuples cannot be used as dictionary keys under any circumstance',
            'Dictionary keys must be strings only',
            'Dictionaries only support single primitive values as keys',
          ],
          correctIndex: 0,
          difficulty: 'challenging',
          type: 'debugging',
          explanation: 'Dictionary keys must have an immutable hash value. Even though the tuple is immutable, its child list is mutable, causing TypeError: unhashable type: "list".',
          hint: 'All child elements of a key tuple must also be immutable.',
        },
        {
          id: 'ds-q4',
          question: 'What is the output of `len(set([1, 2, 2, 3, 3, 3]))`?',
          options: ['3', '6', '1', 'TypeError'],
          correctIndex: 0,
          difficulty: 'easy',
          type: 'output_prediction',
          explanation: 'Sets enforce unique elements and automatically discard duplicates. The distinct elements are 1, 2, and 3, so length is 3.',
          hint: 'Sets store only unique values.',
        },
        {
          id: 'ds-q5',
          question: 'What does `{"a": 1}.get("b", 100)` return in Python?',
          options: ['100', 'None', 'KeyError: "b"', '1'],
          correctIndex: 0,
          difficulty: 'medium',
          type: 'output_prediction',
          explanation: 'The `.get(key, default)` method returns the second argument as a fallback default when the key is missing from the dictionary, avoiding a KeyError.',
          hint: 'The second argument to .get() is the fallback value if the key does not exist.',
        },
        {
          id: 'ds-q6',
          question: 'What collision resolution strategy does CPython use for hash tables in dictionaries and sets?',
          options: [
            'Open addressing with pseudo-random perturbation probing',
            'Separate chaining with linked lists',
            'Binary search trees in each bucket',
            'Red-black self-balancing trees',
          ],
          correctIndex: 0,
          explanation: 'CPython implements open addressing with a perturbation recurrence formula (`j = ((5*j) + 1 + perturb) & mask`) to efficiently jump across collision slots without linked lists.',
          difficulty: 'challenging',
          type: 'mcq',
          hint: 'CPython stores entries directly in a contiguous array without separate linked list nodes.',
        },
      ],
    },
    {
      id: 'node-ds-lists',
      title: 'LISTS & TUPLES',
      shortExplanation: 'Ordered sequences: lists are mutable dynamic arrays; tuples are immutable fixed sequences.',
      category: 'data',
      depth: 1,
      position: [3.5, 1.5, 0.6],
      size: 1.0,
      color: '#34d399',
      linkedMapTopic: 'What are Python lists?',
      beginnerExplanation:
        'Lists are written with brackets [1, 2, 3] and can be modified. Tuples are written with parentheses (1, 2, 3) and cannot be changed once created.',
      intermediateExplanation:
        'Lists are over-allocated dynamic arrays in CPython. Appending is O(1) amortized, but inserting at index 0 is O(N) due to element shifting.',
      advancedDetails:
        'Tuples use less memory than lists because they require no resizing buffer. Small tuples are cached by CPython for rapid re-allocation.',
      whyItMatters: 'Tuples provide integrity and can be used as dictionary keys; lists provide mutable collections.',
      practicalUseCases: [
        'Returning multiple values from a function as a packed tuple',
        'Maintaining an ordered queue of pending tasks with a list',
      ],
      commonMistakes: ['Expecting a tuple to support append().'],
      lessonSteps: [
        { stepNumber: 1, title: 'Mutability Contrast', explanation: 'my_list[0] = 99 works; my_tuple[0] = 99 raises TypeError.' },
        { stepNumber: 2, title: 'Unpacking Syntax', explanation: 'x, y = (10, 20) unpacks items into individual variables.' },
      ],
      concreteExample: {
        code: 'point = (10, 20)  # Immutable tuple\nx, y = point      # Tuple unpacking\nprint(f"X: {x}, Y: {y}")',
        explanation: 'Demonstrates clean tuple unpacking into separate variables.',
        expectedOutput: 'X: 10, Y: 20',
      },
      practiceQuestion: {
        question: 'Which of the following creates a single-element tuple in Python?',
        options: ['(42,)', '(42)', 'tuple[42]', '[42]'],
        correctIndex: 0,
        explanation: 'A trailing comma (42,) is required to distinguish a single-element tuple from parentheses used in an expression.',
      },
      practiceQuestions: [
        {
          id: 'lt-q1',
          question: 'Which of the following creates a single-element tuple in Python?',
          options: ['(42,)', '(42)', 'tuple[42]', '[42]'],
          correctIndex: 0,
          difficulty: 'easy',
          type: 'mcq',
          explanation: 'A trailing comma (42,) is required to distinguish a single-element tuple from parentheses used in an expression.',
        },
        {
          id: 'lt-q2',
          question: 'What happens when calling .append() on a tuple?',
          codeSnippet: 't = (1, 2, 3)\nt.append(4)',
          options: [
            'AttributeError: "tuple" object has no attribute "append"',
            'The tuple becomes (1, 2, 3, 4)',
            't is converted into a list automatically',
            'TypeError: tuple cannot be appended',
          ],
          correctIndex: 0,
          difficulty: 'medium',
          type: 'output_prediction',
          explanation: 'Tuples are strictly immutable and do not have mutation methods like append or extend.',
        },
        {
          id: 'lt-q3',
          question: 'What is the time complexity of inserting an item at the beginning of a Python list (list.insert(0, item))?',
          options: ['O(N) linear time', 'O(1) constant time', 'O(log N)', 'O(N^2)'],
          correctIndex: 0,
          difficulty: 'challenging',
          type: 'mcq',
          explanation: 'Because lists are dynamic arrays, inserting at index 0 requires shifting all N existing elements forward in memory by one slot.',
        },
      ],
    },
    {
      id: 'node-ds-dicts',
      title: 'DICTS & SETS',
      shortExplanation: 'Hash-table based collections: dictionaries map keys to values; sets enforce uniqueness.',
      category: 'data',
      depth: 1,
      position: [-1.4, 3.6, -1.0],
      size: 1.0,
      color: '#34d399',
      linkedMapTopic: 'Python Dictionaries',
      beginnerExplanation:
        'A dictionary stores associations between keys and values: {"name": "Alice"}. A set is a bag of unique items that automatically removes duplicates: {1, 2, 3}.',
      intermediateExplanation:
        'Keys in dictionaries and items in sets must be hashable (__hash__) and equality-comparable (__eq__). Average lookup, insert, and delete are O(1).',
      advancedDetails:
        'CPython uses open addressing with quadratic pseudo-random perturbation probing to resolve hash table collisions with low overhead.',
      whyItMatters: 'Powers fast indexing, caching, deduplication, and JSON API payloads.',
      practicalUseCases: [
        'Fast membership testing ("item in user_ids") in O(1) instead of O(N)',
        'Parsing JSON payloads into nested Python dictionaries',
      ],
      commonMistakes: ['Calling dict[key] on a missing key raises KeyError. Use dict.get(key, default) instead.'],
      lessonSteps: [
        { stepNumber: 1, title: 'Safe Access with get()', explanation: 'user.get("role", "guest") returns "guest" without throwing KeyError.' },
        { stepNumber: 2, title: 'Set Operations', explanation: 'Use union (|), intersection (&), and difference (-) for mathematical sets.' },
      ],
      concreteExample: {
        code: 'user = {"name": "Grace", "lang": "Python"}\nprint(user.get("admin", False)) # Safe fallback',
        explanation: 'Uses .get() with a default value to prevent KeyError exceptions.',
        expectedOutput: 'False',
      },
      practiceQuestion: {
        question: 'How do you safely access a dictionary value without triggering a KeyError if the key is missing?',
        options: ['dict.get(key, default)', 'dict[key]', 'dict.fetch(key)', 'dict.search(key)'],
        correctIndex: 0,
        explanation: 'The .get(key, default) method returns default (or None) if key does not exist, avoiding KeyError.',
      },
      practiceQuestions: [
        {
          id: 'ds-dict-q1',
          question: 'How do you safely access a dictionary value without triggering a KeyError if the key is missing?',
          options: ['dict.get(key, default)', 'dict[key]', 'dict.fetch(key)', 'dict.search(key)'],
          correctIndex: 0,
          difficulty: 'easy',
          type: 'mcq',
          explanation: 'The .get(key, default) method returns default (or None) if key does not exist, avoiding KeyError.',
        },
        {
          id: 'ds-dict-q2',
          question: 'What is the result of set union: {1, 2} | {2, 3}?',
          options: ['{1, 2, 3}', '{2}', '{1, 2, 2, 3}', '[1, 2, 3]'],
          correctIndex: 0,
          difficulty: 'medium',
          type: 'output_prediction',
          explanation: 'Sets enforce uniqueness. The union operator (|) combines elements and eliminates duplicates.',
        },
        {
          id: 'ds-dict-q3',
          question: 'What happens when using a list as a dictionary key: d = {[1, 2]: "numbers"}?',
          options: [
            'TypeError: unhashable type: "list"',
            'The key is converted to a string automatically',
            'It creates a valid dictionary',
            'ValueError: invalid key format',
          ],
          correctIndex: 0,
          difficulty: 'challenging',
          type: 'debugging',
          explanation: 'Lists are mutable, so their contents (and potential hash) could change. Python prohibits unhashable mutable types as dict keys.',
        },
      ],
    },
    {
      id: 'node-ds-comprehensions',
      title: 'COMPREHENSIONS',
      shortExplanation: 'Declarative, compact syntax for transforming collections in memory.',
      category: 'syntax',
      depth: 1,
      position: [-3.2, -1.8, 1.2],
      size: 1.0,
      color: '#c084fc',
      beginnerExplanation:
        'A comprehension is a clean, single-line shorthand to build a new list, set, or dictionary by transforming an existing collection.',
      intermediateExplanation:
        'Syntax pattern: [expr for item in iterable if condition]. Comprehensions run at C-speed in CPython bytecode, avoiding loop overhead.',
      advancedDetails:
        'Generator expressions (expr for item in iterable) compute lazily on demand, saving memory compared to list comprehensions.',
      whyItMatters: 'Replaces 5-line for-loops with clear, optimized 1-line pipeline transformations.',
      practicalUseCases: [
        'Normalizing raw text strings: [w.lower().strip() for w in words]',
        'Filtering even numbers or prime values with concise predicates',
      ],
      commonMistakes: ['Nesting 3+ comprehensions together, hurting code readability.'],
      lessonSteps: [
        { stepNumber: 1, title: 'Syntax Pattern', explanation: '[expression for item in iterable if condition].' },
      ],
      concreteExample: {
        code: 'words = ["hello", "world", "python"]\nupper_words = [w.upper() for w in words if len(w) > 4]\nprint(upper_words)',
        explanation: 'Filters words longer than 4 chars and transforms them to uppercase.',
        expectedOutput: "['HELLO', 'WORLD', 'PYTHON']",
      },
      practiceQuestion: {
        question: 'What is the result of [x * 2 for x in range(3)]?',
        options: ['[0, 2, 4]', '[2, 4, 6]', '[0, 1, 2]', '[1, 2, 3]'],
        correctIndex: 0,
        explanation: 'range(3) produces 0, 1, 2. Multiplying each by 2 yields [0, 2, 4].',
      },
      practiceQuestions: [
        {
          id: 'cmp-q1',
          question: 'What is the result of [x * 2 for x in range(3)]?',
          options: ['[0, 2, 4]', '[2, 4, 6]', '[0, 1, 2]', '[1, 2, 3]'],
          correctIndex: 0,
          difficulty: 'easy',
          type: 'mcq',
          explanation: 'range(3) produces 0, 1, 2. Multiplying each by 2 yields [0, 2, 4].',
        },
        {
          id: 'cmp-q2',
          question: 'What dictionary is produced by {x: x**2 for x in [1, 2, 3]}?',
          options: ['{1: 1, 2: 4, 3: 9}', '{1: 2, 2: 4, 3: 6}', '[1, 4, 9]', '{1, 4, 9}'],
          correctIndex: 0,
          difficulty: 'medium',
          type: 'output_prediction',
          explanation: 'A dictionary comprehension maps each key x to its square x**2.',
        },
        {
          id: 'cmp-q3',
          question: 'What is the difference between [x for x in data] and (x for x in data)?',
          options: [
            'Brackets create a full list in RAM; parentheses create a lazy generator expression',
            'Parentheses create a tuple comprehension in memory',
            'There is no difference; both create lists',
            'Parentheses syntax is invalid in Python',
          ],
          correctIndex: 0,
          difficulty: 'challenging',
          type: 'mcq',
          explanation: 'Parentheses syntax defines a generator expression that yields items lazily one at a time, conserving memory.',
        },
      ],
    },
  ],
  edges: [
    { id: 'e-ds-1', source: 'node-ds-root', target: 'node-ds-lists', relationship: 'indexes_sequences', description: 'Ordered positional collections' },
    { id: 'e-ds-2', source: 'node-ds-root', target: 'node-ds-dicts', relationship: 'hashes_mappings', description: 'Key-value and mathematical sets' },
    { id: 'e-ds-3', source: 'node-ds-root', target: 'node-ds-comprehensions', relationship: 'transforms_via', description: 'Declarative data pipelines' },
  ],
}

// ==============================================================================
// SECTION D: FUNCTIONS & MODULES 3D MAP
// ==============================================================================
export const PYTHON_FUNCTIONS_MODULES_MAP: KnowledgeMap = {
  id: 'map-sec-functions-modules',
  topic: 'Python Functions and Modules',
  title: 'Section D: Functions & Modules Architecture',
  description:
    'def statements, positional and keyword arguments, default parameters, *args, **kwargs, return values, LEGB scope rules, lambda functions, and module packaging.',
  centralNodeId: 'node-fn-root',
  parentMapId: 'map-python-master',
  parentMapTopic: 'Python Programming Master Curriculum',
  parentMapTitle: 'Python Overview',
  createdAt: '2026-10-15T10:00:00Z',
  isDemo: true,
  demoNote: 'Curated Section D Architecture',
  searchStatus: 'verified-web',
  sources: [
    {
      title: 'Python Documentation: Defining Functions',
      url: 'https://docs.python.org/3/tutorial/controlflow.html#defining-functions',
      snippet: 'Default argument values, keyword arguments, special parameters, and lambda expressions.',
      sourceName: 'Python Docs',
    },
  ],
  nodes: [
    {
      id: 'node-fn-root',
      title: 'FUNCTIONS & MODULES',
      shortExplanation: 'Packaging reusable logic, parameter binding, lexical scope, and modular imports.',
      category: 'core',
      depth: 0,
      position: [0, 0, 0],
      size: 1.45,
      color: '#c084fc',
      linkedMapTopic: 'Python Functions',
      beginnerExplanation:
        'Functions are named blocks of code designed to do one specific job. Instead of writing the same 10 lines of code five times, you define a function once and call it anywhere.',
      intermediateExplanation:
        'Functions are first-class citizens in Python. They can be assigned to variables, passed as arguments, returned from other functions, and store closures in __closure__.',
      advancedDetails:
        'CPython compiles functions into code objects (__code__) containing bytecode instructions, local variable names (co_varnames), and constant tables (co_consts).',
      whyItMatters: 'Functions embody the DRY (Don’t Repeat Yourself) principle and enable scalable modular architecture.',
      practicalUseCases: [
        'Creating clean calculation engines for financial portfolios',
        'Higher-order functions passing callbacks to map() and filter()',
      ],
      commonMistakes: [
        'Using mutable default arguments (def func(items=[])) which share state across calls.',
        'Confusing print() with return.',
      ],
      lessonSteps: [
        { stepNumber: 1, title: 'Defining Functions', explanation: 'Use "def name(parameters):" followed by an indented body.' },
        { stepNumber: 2, title: 'Return Values', explanation: 'Use "return" to send results back; omission implicitly returns None.' },
      ],
      concreteExample: {
        code: 'def calculate_total(subtotal: float, tax_rate: float = 0.08) -> float:\n    """Return total price with tax applied."""\n    return round(subtotal * (1 + tax_rate), 2)\n\nprint(f"Total: ${calculate_total(100.0)}")',
        explanation: 'Demonstrates type hints, default argument values, docstring, and return value.',
        expectedOutput: 'Total: $108.0',
      },
      edgeCases: [
        'Default arguments are evaluated ONCE at function definition time, leading to shared state bugs if given mutable defaults like [] or {}.',
        'Assigning to a variable anywhere in a function makes it local to that entire scope; reading it prior to assignment raises UnboundLocalError.',
        'Variable-length positional parameters *args pack into a tuple, while **kwargs pack into a dict; keyword-only arguments must follow * or *args.',
      ],
      intermediateExample: {
        code: `# Higher-order parsing function with fallback default and tuple unpacking
def parse_user_record(raw: str, default_role: str = "viewer") -> tuple[str, str]:
    """Parse user:role string with fallback default."""
    parts = raw.strip().split(":", 1)
    username = parts[0]
    role = parts[1] if len(parts) > 1 and parts[1] else default_role
    return username.lower(), role.lower()

user1, role1 = parse_user_record("Alice:Admin")
user2, role2 = parse_user_record("Bob")
print(f"User 1: {user1} ({role1})")
print(f"User 2: {user2} ({role2})")`,
        explanation: 'Uses default arguments, string splitting, and tuple unpacking with type annotations.',
        expectedOutput: 'User 1: alice (admin)\nUser 2: bob (viewer)',
      },
      advancedExample: {
        code: `from functools import wraps

# Decorator factory preserving metadata and wrapping callable execution
def retry(times: int = 3):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, times + 1):
                try:
                    return func(*args, **kwargs)
                except ValueError as err:
                    if attempt == times:
                        raise
                    print(f"Attempt {attempt} failed: {err}")
        return wrapper
    return decorator

@retry(times=2)
def parse_id(val: str) -> int:
    return int(val)

print("Parsed ID:", parse_id("100"))`,
        explanation: 'Metaprogramming with closures, decorator factory, @wraps metadata preservation, and exception retry loops.',
        expectedOutput: 'Parsed ID: 100',
      },
      practiceExercises: [
        {
          id: 'fn-rt-ex1',
          title: 'Exercise 1: Area Calculator',
          prompt: 'Write a function rectangle_area(width, height) that returns the area. If width or height is negative, raise ValueError.',
          hint: 'if width < 0 or height < 0: raise ValueError(...)',
          starterCode: 'def rectangle_area(width, height):\n    # your code here\n    pass\n',
          solutionCode: 'def rectangle_area(width, height):\n    if width < 0 or height < 0:\n        raise ValueError("Dimensions must be positive")\n    return width * height\nprint(rectangle_area(5, 4))',
        },
      ],
      practiceQuestion: {
        question: 'What is the default return value of a Python function that does not include an explicit return statement?',
        options: ['None', '0', 'False', 'Undefined'],
        correctIndex: 0,
        explanation: 'Any function completing execution without hitting a return statement returns the singleton None.',
        difficulty: 'easy',
        type: 'mcq',
        hint: 'Python functions always return an object, defaulting to the singleton None.',
      },
      practiceQuestions: [
        {
          id: 'fn-q1',
          question: 'What is the default return value of a Python function that does not include an explicit return statement?',
          options: ['None', '0', 'False', 'Undefined'],
          correctIndex: 0,
          difficulty: 'easy',
          type: 'mcq',
          explanation: 'Any function completing execution without hitting a return statement returns the singleton None.',
          hint: 'Python functions always return an object, defaulting to the singleton None.',
        },
        {
          id: 'fn-q2',
          question: 'Predict the unexpected behavior caused by this mutable default argument:',
          codeSnippet: 'def add_item(val, bucket=[]):\n    bucket.append(val)\n    return bucket\nprint(add_item(1))\nprint(add_item(2))',
          options: [
            '[1] then [1, 2]',
            '[1] then [2]',
            '[1] then TypeError',
            '[1, 2] then [1, 2]',
          ],
          correctIndex: 0,
          difficulty: 'medium',
          type: 'output_prediction',
          explanation: 'Default arguments are evaluated once at function definition time, so all calls without a second argument share the exact same list instance.',
          hint: 'Default argument expressions run once when the function is defined, not per call.',
        },
        {
          id: 'fn-q3',
          question: 'How do you fix the dangerous mutable default argument bug in Python?',
          options: [
            'Set bucket=None as default, then initialize bucket = [] inside the function if bucket is None',
            'Declare the list as const bucket=[] in the parameter list',
            'Wrap the bucket parameter in a tuple() converter',
            'Python 3 fixes this automatically with garbage collection',
          ],
          correctIndex: 0,
          difficulty: 'challenging',
          type: 'debugging',
          explanation: 'The idiomatic Python fix is: def add_item(val, bucket=None): if bucket is None: bucket = [].',
          hint: 'Use None as a sentinel value in the function signature and initialize the list inside the body.',
        },
        {
          id: 'fn-q4',
          question: "In Python's LEGB scope resolution rule, what do the four letters stand for?",
          options: [
            'Local, Enclosing, Global, Built-in',
            'Lexical, Extended, Global, Base',
            'Literal, Enclosing, Generated, Block',
            'Local, Explicit, Global, Binary',
          ],
          correctIndex: 0,
          difficulty: 'medium',
          type: 'mcq',
          explanation: 'Python searches variable names first in Local scope, then Enclosing (outer functions), Global (module level), and finally Built-in.',
          hint: 'The lookup starts at the innermost function and climbs outward to built-in functions like len().',
        },
        {
          id: 'fn-q5',
          question: 'What error is raised when executing this code snippet?',
          codeSnippet: 'x = 10\ndef modify():\n    print(x)\n    x = 20\nmodify()',
          options: ['UnboundLocalError', '10', 'None', 'NameError'],
          correctIndex: 0,
          difficulty: 'medium',
          type: 'output_prediction',
          explanation: 'Python compiles variable scopes at parse time. Since x is assigned inside modify, it is treated as a local variable throughout the entire body, so referencing it before the assignment raises UnboundLocalError.',
          hint: 'Assigning to x inside the function makes x local for the entire function scope.',
        },
        {
          id: 'fn-q6',
          question: "How can you define a function that forces callers to provide 'debug' only as a keyword argument?",
          options: [
            'def run(data, *, debug=False):',
            'def run(data, debug: kwarg=False):',
            'def run(data, / debug=False):',
            'def run(*data, **debug):',
          ],
          correctIndex: 0,
          difficulty: 'challenging',
          type: 'debugging',
          explanation: 'Parameters placed after a bare * or *args cannot be passed positionally and must be supplied as keyword arguments (e.g. run(data, debug=True)).',
          hint: 'A bare asterisk `*` in the parameter list separates positional parameters from keyword-only parameters.',
        },
      ],
    },
    {
      id: 'node-fn-args',
      title: '*ARGS & **KWARGS',
      shortExplanation: 'Variable-length positional (*args tuple) and keyword (**kwargs dict) parameter unpacking.',
      category: 'syntax',
      depth: 1,
      position: [3.4, 1.4, -0.6],
      size: 1.0,
      color: '#c084fc',
      beginnerExplanation:
        '*args allows a function to accept any number of extra positional arguments as a tuple. **kwargs allows accepting any number of keyword arguments as a dictionary.',
      intermediateExplanation:
        'The single asterisk * packs positional arguments into a tuple. The double asterisk ** packs keyword arguments into a dictionary. They can also unpack collections in calls.',
      advancedDetails:
        'Keyword-only arguments can be enforced by placing parameters after *args or a bare *. Positional-only parameters are declared before a slash (/) (PEP 570).',
      whyItMatters: 'Enables flexible APIs, wrappers, decorators, and forwarding arguments seamlessly.',
      practicalUseCases: [
        'Writing logger utilities accepting arbitrary message metadata',
        'Creating decorators that wrap functions without knowing their signatures in advance',
      ],
      commonMistakes: ['Putting *args after **kwargs in function definitions (SyntaxError).'],
      lessonSteps: [
        { stepNumber: 1, title: '*args Packing', explanation: 'Collects excess positional arguments into a tuple.' },
        { stepNumber: 2, title: '**kwargs Packing', explanation: 'Collects excess named arguments into a dict.' },
      ],
      concreteExample: {
        code: 'def build_profile(name, *skills, **details):\n    print(f"Name: {name}")\n    print(f"Skills: {skills}")\n    print(f"Details: {details}")\n\nbuild_profile("Ada", "Math", "Logic", level="Senior", country="UK")',
        explanation: 'Packs "Math" and "Logic" into skills tuple, and level/country into details dict.',
        expectedOutput: "Name: Ada\nSkills: ('Math', 'Logic')\nDetails: {'level': 'Senior', 'country': 'UK'}",
      },
      practiceQuestion: {
        question: 'What data type does *args evaluate to inside a function body?',
        options: ['tuple', 'list', 'dict', 'generator'],
        correctIndex: 0,
        explanation: '*args gathers excess positional arguments into an immutable tuple.',
      },
      practiceQuestions: [
        {
          id: 'ak-q1',
          question: 'What data type does *args evaluate to inside a function body?',
          options: ['tuple', 'list', 'dict', 'generator'],
          correctIndex: 0,
          difficulty: 'easy',
          type: 'mcq',
          explanation: '*args gathers excess positional arguments into an immutable tuple.',
        },
        {
          id: 'ak-q2',
          question: 'What data structure does **kwargs create inside a function body?',
          options: ['dict', 'list', 'tuple', 'set'],
          correctIndex: 0,
          difficulty: 'medium',
          type: 'mcq',
          explanation: '**kwargs captures keyword arguments into a standard Python dictionary mapping parameter names to values.',
        },
        {
          id: 'ak-q3',
          question: 'What is the output of this argument unpacking call?',
          codeSnippet: 'def multiply(a, b, c):\n    return a * b * c\nnums = [2, 3, 4]\nprint(multiply(*nums))',
          options: ['24', 'TypeError: takes 3 arguments (1 given)', '[2, 3, 4]', 'None'],
          correctIndex: 0,
          difficulty: 'challenging',
          type: 'output_prediction',
          explanation: 'The * operator unpacks the list elements as separate positional arguments: multiply(2, 3, 4) = 24.',
        },
      ],
    },
    {
      id: 'node-fn-scope',
      title: 'SCOPE & CLOSURES',
      shortExplanation: 'The LEGB hierarchy (Local, Enclosing, Global, Built-in) and non-local closures.',
      category: 'foundation',
      depth: 1,
      position: [-1.8, 3.4, 1.2],
      size: 1.0,
      color: '#c084fc',
      beginnerExplanation:
        'Where a variable is defined determines where it can be seen and used. Variables inside a function cannot be accessed from outside.',
      intermediateExplanation:
        'Python searches names using the LEGB rule: Local first, then Enclosing (outer functions), Global (module level), and Built-in (print, len, etc.).',
      advancedDetails:
        'A closure occurs when an inner function remembers and accesses variables from its enclosing scope even after the outer function has finished executing.',
      whyItMatters: 'Understanding scope prevents accidental global state corruption and powers function factories.',
      practicalUseCases: [
        'Creating function factories (e.g., make_multiplier(factor))',
        'Encapsulating private counter state without global variables',
      ],
      commonMistakes: ['Modifying a global variable without the "global" or "nonlocal" keyword (UnboundLocalError).'],
      lessonSteps: [
        { stepNumber: 1, title: 'The LEGB Rule', explanation: 'Local -> Enclosing -> Global -> Built-in resolution.' },
        { stepNumber: 2, title: 'Closures', explanation: 'Inner functions retain access to enclosing variables.' },
      ],
      concreteExample: {
        code: 'def make_counter(start=0):\n    count = start\n    def increment():\n        nonlocal count\n        count += 1\n        return count\n    return increment\n\nc = make_counter(10)\nprint(c(), c())',
        explanation: 'Uses "nonlocal" so the inner function can mutate the enclosing scope variable.',
        expectedOutput: '11 12',
      },
      practiceQuestion: {
        question: 'What keyword allows an inner function to reassign a variable from its enclosing function scope?',
        options: ['nonlocal', 'global', 'outer', 'enclosing'],
        correctIndex: 0,
        explanation: 'The "nonlocal" keyword declares that a variable refers to an enclosing outer function scope rather than a local one.',
      },
      practiceQuestions: [
        {
          id: 'sc-q1',
          question: 'What keyword allows an inner function to reassign a variable from its enclosing function scope?',
          options: ['nonlocal', 'global', 'outer', 'enclosing'],
          correctIndex: 0,
          difficulty: 'easy',
          type: 'mcq',
          explanation: 'The "nonlocal" keyword declares that a variable refers to an enclosing outer function scope rather than a local one.',
        },
        {
          id: 'sc-q2',
          question: 'What error does this code trigger?',
          codeSnippet: 'x = 10\ndef update():\n    print(x)\n    x = 20\nupdate()',
          options: [
            'UnboundLocalError: cannot access local variable "x" where it is not associated with a value',
            '10',
            'NameError: x is not defined',
            '20',
          ],
          correctIndex: 0,
          difficulty: 'medium',
          type: 'output_prediction',
          explanation: 'Because "x = 20" assigns to x inside update(), Python marks x as a local variable for the entire function. Attempting to print it before assignment raises UnboundLocalError.',
        },
        {
          id: 'sc-q3',
          question: 'What does the acronym LEGB stand for in Python scope resolution?',
          options: [
            'Local, Enclosing, Global, Built-in',
            'Lexical, Explicit, Global, Bound',
            'Local, External, General, Binary',
            'Linear, Enclosed, Group, Base',
          ],
          correctIndex: 0,
          difficulty: 'challenging',
          type: 'mcq',
          explanation: 'LEGB defines the sequential lookup order for variable resolution: Local -> Enclosing -> Global -> Built-in.',
        },
      ],
    },
    {
      id: 'node-fn-recursion-lambda',
      title: 'RECURSION & LAMBDAS',
      shortExplanation: 'Self-referential functions with base cases and anonymous single-expression lambdas.',
      category: 'advanced',
      depth: 1,
      position: [-3.2, -1.8, -0.8],
      size: 1.0,
      color: '#c084fc',
      linkedMapTopic: 'Explain recursion',
      beginnerExplanation:
        'Recursion is when a function calls itself to solve smaller pieces of a problem until it reaches a base case. Lambdas are quick one-line functions.',
      intermediateExplanation:
        'Every recursive function must have a terminating base case to prevent stack overflow (RecursionError). Lambdas are defined with "lambda args: expression".',
      advancedDetails:
        'CPython has a recursion limit (default 1000, sys.getrecursionlimit()) and does not optimize tail calls. Tail recursion uses O(N) call stack frames.',
      whyItMatters: 'Recursion naturally traverses trees, nested file systems, and graph structures.',
      practicalUseCases: [
        'Navigating hierarchical directory structures with recursive search',
        'Custom sort keys using lambda x: x["price"]',
      ],
      commonMistakes: ['Missing base cases in recursive functions causing RecursionError.'],
      lessonSteps: [
        { stepNumber: 1, title: 'Base Case vs Recursive Step', explanation: 'Always write the base case first to stop execution.' },
        { stepNumber: 2, title: 'Lambda Syntax', explanation: 'lambda x, y: x + y creates an anonymous function.' },
      ],
      concreteExample: {
        code: '# Recursive countdown + lambda sorting\ndef countdown(n):\n    if n <= 0: return "Go!"\n    return f"{n} " + countdown(n - 1)\n\nprint(countdown(3))\npairs = [(1, "one"), (3, "three"), (2, "two")]\npairs.sort(key=lambda p: p[0])\nprint([p[1] for p in pairs])',
        explanation: 'Demonstrates a recursive call with a base case and a lambda key function for sorting.',
        expectedOutput: "3 2 1 Go!\n['one', 'two', 'three']",
      },
      practiceQuestion: {
        question: 'What exception is raised when a recursive function exceeds Python’s maximum call stack depth?',
        options: ['RecursionError', 'StackOverflowError', 'MemoryError', 'SystemExit'],
        correctIndex: 0,
        explanation: 'Python raises RecursionError (a subclass of RuntimeError) when the call stack depth limit is exceeded.',
      },
      practiceQuestions: [
        {
          id: 'rl-q1',
          question: 'What exception is raised when a recursive function exceeds Python’s maximum call stack depth?',
          options: ['RecursionError', 'StackOverflowError', 'MemoryError', 'SystemExit'],
          correctIndex: 0,
          difficulty: 'easy',
          type: 'mcq',
          explanation: 'Python raises RecursionError when the call stack depth limit is exceeded.',
        },
        {
          id: 'rl-q2',
          question: 'What does this lambda expression evaluate to?',
          codeSnippet: 'f = lambda a, b: a if a > b else b\nprint(f(12, 25))',
          options: ['25', '12', 'True', 'None'],
          correctIndex: 0,
          difficulty: 'medium',
          type: 'output_prediction',
          explanation: 'The lambda compares 12 > 25 (False) and returns the else value 25.',
        },
        {
          id: 'rl-q3',
          question: 'What critical element is missing from this recursive function?',
          codeSnippet: 'def count_down(n):\n    print(n)\n    return count_down(n - 1)',
          options: [
            'A base case condition (e.g. if n <= 0: return) to stop infinite recursion',
            'A return type annotation',
            'A global variable declaration',
            'A while loop wrapper',
          ],
          correctIndex: 0,
          difficulty: 'challenging',
          type: 'debugging',
          explanation: 'Without a base case, count_down will continue calling itself until Python halts execution with a RecursionError.',
        },
      ],
    },
  ],
  edges: [
    { id: 'e-fn-1', source: 'node-fn-root', target: 'node-fn-args', relationship: 'unpacks_with', description: 'Dynamic parameter collection' },
    { id: 'e-fn-2', source: 'node-fn-root', target: 'node-fn-scope', relationship: 'resolves_via', description: 'Lexical variable scoping' },
    { id: 'e-fn-3', source: 'node-fn-root', target: 'node-fn-recursion-lambda', relationship: 'expresses_with', description: 'Self-reference and anonymous expressions' },
  ],
}

// ==============================================================================
// SECTION E: ERROR HANDLING & FILES 3D MAP
// ==============================================================================
export const PYTHON_ERRORS_FILES_MAP: KnowledgeMap = {
  id: 'map-sec-errors-files',
  topic: 'Python Error Handling and Files',
  title: 'Section E: Errors & File I/O Architecture',
  description:
    'try/except/else/finally blocks, exception hierarchies, custom exceptions, context managers (with open), pathlib modern paths, and JSON serialization.',
  centralNodeId: 'node-ef-root',
  parentMapId: 'map-python-master',
  parentMapTopic: 'Python Programming Master Curriculum',
  parentMapTitle: 'Python Overview',
  createdAt: '2026-10-15T10:00:00Z',
  isDemo: true,
  demoNote: 'Curated Section E Architecture',
  searchStatus: 'verified-web',
  sources: [
    {
      title: 'Python Documentation: Errors and Exceptions',
      url: 'https://docs.python.org/3/tutorial/errors.html',
      snippet: 'Handling exceptions, raising exceptions, user-defined exceptions, defining clean-up actions.',
      sourceName: 'Python Docs',
    },
  ],
  nodes: [
    {
      id: 'node-ef-root',
      title: 'ERRORS & FILES',
      shortExplanation: 'Defensive exception handling, automatic resource cleanup, disk file I/O, and data serialization.',
      category: 'core',
      depth: 0,
      position: [0, 0, 0],
      size: 1.45,
      color: '#f43f5e',
      beginnerExplanation:
        'Software must handle the unexpected gracefully: missing files, network outages, or bad user inputs. Using try/except keeps programs from crashing.',
      intermediateExplanation:
        'Exceptions are classes inheriting from BaseException -> Exception. Context managers (with) ensure files are cleanly closed even during errors.',
      advancedDetails:
        'The with statement calls __enter__() and __exit__(exc_type, exc_val, exc_tb). Exception chaining (raise ... from ...) preserves diagnostic causality.',
      whyItMatters: 'Production systems require rock-solid resilience and zero leaked file descriptors or connection locks.',
      practicalUseCases: [
        'Reading configuration settings from config.json with fallback defaults',
        'Logging error tracebacks to disk for remote server diagnostics',
      ],
      commonMistakes: [
        'Using bare except: which catches KeyboardInterrupt and prevents stopping the program.',
        'Forgetting encoding="utf-8" when opening text files.',
      ],
      lessonSteps: [
        { stepNumber: 1, title: 'try-except-else-finally', explanation: 'try risky code; except catches errors; else runs if no error; finally always runs.' },
        { stepNumber: 2, title: 'with open()', explanation: 'Guarantees automatic file closure when exiting the scope block.' },
      ],
      concreteExample: {
        code: 'try:\n    with open("config.txt", "w", encoding="utf-8") as f:\n        f.write("status=active\\n")\n    print("File saved successfully.")\nexcept IOError as e:\n    print(f"Disk error: {e}")',
        explanation: 'Safely writes to a file with utf-8 encoding using a context manager and exception guard.',
        expectedOutput: 'File saved successfully.',
      },
      edgeCases: [
        'A finally block executes even if the try or except block executes an explicit return; a return in finally overwrites earlier return values or uncaught exceptions.',
        'Catching Exception catches standard runtime errors, but leaves KeyboardInterrupt, SystemExit, and GeneratorExit unintercepted because they inherit directly from BaseException.',
        'Opening files on Windows without specifying encoding="utf-8" falls back to the system locale (e.g. CP1252), causing silent data corruption or UnicodeDecodeError on non-ASCII characters.',
      ],
      intermediateExample: {
        code: `import json

# Safe JSON file loader with defensive fallback
def load_app_settings(filepath: str) -> dict:
    """Safely read and parse a JSON configuration file."""
    default_settings = {"theme": "dark", "timeout": 30}
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        print("Config file not found. Using defaults.")
        return default_settings
    except json.JSONDecodeError as err:
        print(f"Malformed JSON ({err}). Using defaults.")
        return default_settings

print("Loaded Settings:", load_app_settings("nonexistent_app.json"))`,
        explanation: 'Robust configuration parser combining with statement context manager, FileNotFoundError, and JSONDecodeError handling.',
        expectedOutput: 'Config file not found. Using defaults.\nLoaded Settings: {\'theme\': \'dark\', \'timeout\': 30}',
      },
      advancedExample: {
        code: `# Custom domain exception hierarchy and explicit exception chaining (PEP 3134)
class ServiceError(Exception):
    """Base exception for application services."""
    pass

class DatabaseTimeoutError(ServiceError):
    """Raised when remote database operation exceeds deadline."""
    pass

def query_user_record(user_id: int):
    try:
        raise TimeoutError("Socket connection timeout after 5.0s")
    except TimeoutError as original_error:
        raise DatabaseTimeoutError(f"Failed query for user {user_id}") from original_error

try:
    query_user_record(42)
except DatabaseTimeoutError as err:
    print(f"Caught: {err}")
    print(f"Direct Cause: {err.__cause__}")`,
        explanation: 'Custom exception hierarchies and explicit exception chaining using "raise ... from ...", preserving root cause diagnostics in production logs.',
        expectedOutput: 'Caught: Failed query for user 42\nDirect Cause: Socket connection timeout after 5.0s',
      },
      practiceExercises: [
        {
          id: 'ef-rt-ex1',
          title: 'Exercise 1: Safe Integer Converter',
          prompt: 'Write safe_int(val, default=0) that returns int(val) or default if ValueError occurs.',
          hint: 'Use try: return int(val) except ValueError: return default.',
          starterCode: 'def safe_int(val, default=0):\n    pass\n',
          solutionCode: 'def safe_int(val, default=0):\n    try:\n        return int(val)\n    except ValueError:\n        return default\nprint(safe_int("123"), safe_int("bad"))',
        },
      ],
      practiceQuestion: {
        question: 'Which block in a try-except structure is guaranteed to run whether an exception occurred or not?',
        options: ['finally', 'else', 'except', 'catch'],
        correctIndex: 0,
        explanation: 'The finally block is unconditionally executed before leaving the try structure, making it ideal for cleanup.',
        difficulty: 'easy',
        type: 'mcq',
        hint: 'This block always executes for guaranteed resource cleanup.',
      },
      practiceQuestions: [
        {
          id: 'ef-q1',
          question: 'Which block in a try-except structure is guaranteed to run whether an exception occurred or not?',
          options: ['finally', 'else', 'except', 'catch'],
          correctIndex: 0,
          difficulty: 'easy',
          type: 'mcq',
          explanation: 'The finally block is unconditionally executed before leaving the try structure, making it ideal for cleanup.',
          hint: 'This block always executes for guaranteed resource cleanup.',
        },
        {
          id: 'ef-q2',
          question: 'What is the output of this try-except-else sequence?',
          codeSnippet: 'try:\n    x = 10 / 2\nexcept ZeroDivisionError:\n    print("Error")\nelse:\n    print(f"Result: {int(x)}")',
          options: ['Result: 5', 'Error', '5.0', 'None'],
          correctIndex: 0,
          difficulty: 'medium',
          type: 'output_prediction',
          explanation: 'Because no exception is raised, the except block is skipped and the else block executes.',
          hint: 'The else block in a try-except statement executes only if NO exceptions were raised in try.',
        },
        {
          id: 'ef-q3',
          question: 'Why is using a bare "except:" antipattern discouraged in production Python?',
          options: [
            'It intercepts KeyboardInterrupt and SystemExit, preventing users from halting the program with Ctrl+C',
            'It slows down Python execution by 500%',
            'Bare except statements are deprecated syntax in Python 3',
            'It deletes the stack trace completely from memory',
          ],
          correctIndex: 0,
          difficulty: 'challenging',
          type: 'debugging',
          explanation: 'A bare except: catches BaseException, which includes SystemExit and KeyboardInterrupt. Catching except Exception: is the correct practice.',
          hint: 'A bare except catches BaseException, which includes OS signals meant to terminate the script.',
        },
        {
          id: 'ef-q4',
          question: 'What is returned by this function call with a finally clause?',
          codeSnippet: 'def compute():\n    try:\n        return 10\n    finally:\n        return 20\nprint(compute())',
          options: ['20', '10', '30', 'TypeError'],
          correctIndex: 0,
          difficulty: 'medium',
          type: 'output_prediction',
          explanation: 'When a return statement is encountered in try, the finally clause executes before the function exits. Since finally returns 20, that value overwrites the earlier return of 10.',
          hint: 'The finally block executes immediately before leaving the function, and an explicit return in finally takes precedence.',
        },
        {
          id: 'ef-q5',
          question: "Why does 'except Exception:' NOT catch a user pressing Ctrl+C to terminate the program?",
          options: [
            'KeyboardInterrupt inherits directly from BaseException, not from Exception',
            'Operating system signals cannot be intercepted by Python',
            'Ctrl+C triggers a hardware reset that terminates the CPU thread immediately',
            'KeyboardInterrupt is a warning, not an exception',
          ],
          correctIndex: 0,
          difficulty: 'medium',
          type: 'mcq',
          explanation: 'BaseException is the root of the exception hierarchy. Exception, SystemExit, and KeyboardInterrupt are all direct subclasses of BaseException, so catching Exception deliberately leaves termination signals unhandled.',
          hint: 'BaseException has three system-level subclasses outside of Exception: KeyboardInterrupt, SystemExit, and GeneratorExit.',
        },
        {
          id: 'ef-q6',
          question: 'In Python 3, what syntax explicitly links a caught exception as the causal root of a new exception?',
          options: [
            'raise NewException("message") from original_exception',
            'raise NewException("message") with original_exception',
            'raise NewException("message", cause=original_exception)',
            'raise NewException.chained(original_exception)',
          ],
          correctIndex: 0,
          difficulty: 'challenging',
          type: 'debugging',
          explanation: 'Using raise NewException(...) from orig_err sets __cause__ on the new exception, displaying a clear "The above exception was the direct cause of the following exception" traceback.',
          hint: 'PEP 3134 introduced the keyword `from` for explicit exception chaining.',
        },
      ],
    },
    {
      id: 'node-ef-context',
      title: 'CONTEXT MANAGERS & WITH',
      shortExplanation: 'The "with" statement managing resource allocation and deterministic cleanup.',
      category: 'syntax',
      depth: 1,
      position: [3.4, 1.2, 0.8],
      size: 1.0,
      color: '#f43f5e',
      beginnerExplanation:
        'When you open a file or database connection, you must close it when done. The with statement automatically closes files for you.',
      intermediateExplanation:
        'Any class implementing __enter__ and __exit__ can be used with "with". The contextlib module provides the @contextmanager decorator for generators.',
      advancedDetails:
        'If an exception occurs inside the with block, it is passed to __exit__(exc_type, exc_val, exc_tb). If __exit__ returns True, the exception is suppressed.',
      whyItMatters: 'Prevents file descriptor leaks and database lock deadlocks in long-running services.',
      practicalUseCases: [
        'Managing database transactions with automatic commit/rollback',
        'Acquiring and releasing thread locks (threading.Lock)',
      ],
      commonMistakes: ['Manual file open without with statement.'],
      lessonSteps: [
        { stepNumber: 1, title: 'The with Statement', explanation: 'with open("data.txt") as f: handles closing automatically.' },
      ],
      concreteExample: {
        code: 'from contextlib import contextmanager\n\n@contextmanager\ndef demo_tag(tag):\n    print(f"<{tag}>")\n    yield\n    print(f"</{tag}>")\n\nwith demo_tag("article"):\n    print("Hello Context!")',
        explanation: 'Custom generator-based context manager using contextlib.',
        expectedOutput: '<article>\nHello Context!\n</article>',
      },
      practiceQuestion: {
        question: 'Which two dunder methods must an object implement to act as a context manager?',
        options: ['__enter__ and __exit__', '__open__ and __close__', '__start__ and __stop__', '__init__ and __del__'],
        correctIndex: 0,
        explanation: 'The context management protocol requires __enter__ (setup) and __exit__ (teardown).',
      },
      practiceQuestions: [
        {
          id: 'cm-q1',
          question: 'Which two dunder methods must an object implement to act as a context manager?',
          options: ['__enter__ and __exit__', '__open__ and __close__', '__start__ and __stop__', '__init__ and __del__'],
          correctIndex: 0,
          difficulty: 'easy',
          type: 'mcq',
          explanation: 'The context management protocol requires __enter__ (setup) and __exit__ (teardown).',
        },
        {
          id: 'cm-q2',
          question: 'What happens to the file descriptor if an exception crashes the code inside a "with open(...) as f:" block?',
          options: [
            'Python guarantees the file is cleanly closed before propagating the exception',
            'The file remains locked open on disk',
            'The file is deleted automatically',
            'The file becomes corrupted with partial bytes',
          ],
          correctIndex: 0,
          difficulty: 'medium',
          type: 'mcq',
          explanation: 'The with statement guarantees execution of __exit__, ensuring the OS file handle is closed even during crashes.',
        },
        {
          id: 'cm-q3',
          question: 'How can a custom context manager suppress an exception raised within its block?',
          options: [
            'By having its __exit__ method return a truthy value (such as True)',
            'By raising a StopIteration exception',
            'By calling sys.suppress()',
            'Exceptions inside with blocks cannot be suppressed',
          ],
          correctIndex: 0,
          difficulty: 'challenging',
          type: 'debugging',
          explanation: 'If __exit__ returns True, Python treats the exception as handled and resumes normal execution outside the with block.',
        },
      ],
    },
    {
      id: 'node-ef-json',
      title: 'JSON & SERIALIZATION',
      shortExplanation: 'Converting between in-memory Python structures and JSON text formats.',
      category: 'data',
      depth: 1,
      position: [-2.2, 3.2, -1.0],
      size: 1.0,
      color: '#34d399',
      beginnerExplanation:
        'JSON is the universal data format of the internet. The json module converts Python dictionaries and lists into text and back.',
      intermediateExplanation:
        'json.dumps() converts a Python object to a JSON string; json.loads() parses JSON string to Python. json.dump() and json.load() operate directly on file streams.',
      advancedDetails:
        'JSON natively supports only strings, numbers, booleans, null, arrays, and objects. Custom objects require a custom JSONEncoder or default function.',
      whyItMatters: 'JSON is the standard communication payload for REST APIs and configuration files.',
      practicalUseCases: [
        'Fetching API responses from GitHub or weather services',
        'Saving user preferences to a local config.json file',
      ],
      commonMistakes: ['Trying to serialize sets or datetime objects with standard json.dumps().'],
      lessonSteps: [
        { stepNumber: 1, title: 'dumps vs loads', explanation: 'dumps() turns objects to string; loads() parses string to object.' },
      ],
      concreteExample: {
        code: 'import json\ndata = {"lang": "Python", "version": 3.12, "active": True}\nencoded = json.dumps(data)\ndecoded = json.loads(encoded)\nprint(f"Decoded: {decoded[\'lang\']}")',
        explanation: 'Round-trip serialization and deserialization using json.',
        expectedOutput: 'Decoded: Python',
      },
      practiceQuestion: {
        question: 'Which function parses a JSON string directly into a Python dictionary?',
        options: ['json.loads()', 'json.dumps()', 'json.parse()', 'json.read()'],
        correctIndex: 0,
        explanation: 'json.loads() ("load string") parses JSON text into corresponding Python native types.',
      },
      practiceQuestions: [
        {
          id: 'js-q1',
          question: 'Which function parses a JSON string directly into a Python dictionary?',
          options: ['json.loads()', 'json.dumps()', 'json.parse()', 'json.read()'],
          correctIndex: 0,
          difficulty: 'easy',
          type: 'mcq',
          explanation: 'json.loads() ("load string") parses JSON text into corresponding Python native types.',
        },
        {
          id: 'js-q2',
          question: 'What is the Python equivalent of the JSON literal "null"?',
          options: ['None', 'False', '0', 'nil'],
          correctIndex: 0,
          difficulty: 'medium',
          type: 'mcq',
          explanation: 'The JSON value null is deserialized to Python singleton None.',
        },
        {
          id: 'js-q3',
          question: 'What error occurs when calling json.dumps({"tags": {1, 2, 3}})?',
          options: [
            'TypeError: Object of type set is not JSON serializable',
            'Sets are converted to arrays automatically',
            'ValueError: invalid set format',
            'JSONDecodeError',
          ],
          correctIndex: 0,
          difficulty: 'challenging',
          type: 'debugging',
          explanation: 'Standard JSON has no set type. Attempting to serialize a set raises TypeError: Object of type set is not JSON serializable.',
        },
      ],
    },
  ],
  edges: [
    { id: 'e-ef-1', source: 'node-ef-root', target: 'node-ef-context', relationship: 'safeguards_with', description: 'Deterministic resource management' },
    { id: 'e-ef-2', source: 'node-ef-root', target: 'node-ef-json', relationship: 'serializes_to', description: 'Cross-platform text formats' },
  ],
}

// ==============================================================================
// SECTION F: OBJECT-ORIENTED PROGRAMMING (OOP) 3D MAP
// ==============================================================================
export const PYTHON_OOP_MAP: KnowledgeMap = {
  id: 'map-sec-oop',
  topic: 'Python OOP',
  title: 'Section F: Object-Oriented Programming Anatomy',
  description:
    'Classes, instances, the __init__ constructor, the self parameter, inheritance, super(), encapsulation, properties (@property), and dunder magic methods.',
  centralNodeId: 'node-oop-root',
  parentMapId: 'map-python-master',
  parentMapTopic: 'Python Programming Master Curriculum',
  parentMapTitle: 'Python Overview',
  createdAt: '2026-10-15T10:00:00Z',
  isDemo: true,
  demoNote: 'Curated Section F Architecture',
  searchStatus: 'verified-web',
  sources: [
    {
      title: 'Python Documentation: Classes',
      url: 'https://docs.python.org/3/tutorial/classes.html',
      snippet: 'Class definition syntax, class objects, instance objects, method objects, and inheritance.',
      sourceName: 'Python Docs',
    },
  ],
  nodes: [
    {
      id: 'node-oop-root',
      title: 'OOP ARCHITECTURE',
      shortExplanation: 'Modeling real-world entities through class blueprints, instances, inheritance, and encapsulation.',
      category: 'core',
      depth: 0,
      position: [0, 0, 0],
      size: 1.45,
      color: '#38bdf8',
      linkedMapTopic: 'Classes and Objects',
      beginnerExplanation:
        'A class is like an architectural blueprint. An object is a specific house built from that blueprint. Classes bundle state (attributes) and behavior (methods) together.',
      intermediateExplanation:
        'Classes in Python are dynamic objects instantiated from the metaclass "type". Methods automatically receive the calling instance as their first argument ("self").',
      advancedDetails:
        'Multiple inheritance is resolved using C3 Linearization (Method Resolution Order, MRO). The __slots__ attribute replaces per-instance __dict__ with fixed descriptors for memory optimization.',
      whyItMatters: 'OOP provides scalable structure for large codebases, ORMs (SQLAlchemy, Django), and GUI applications.',
      practicalUseCases: [
        'Defining database model schemas and relationships in web backends',
        'Creating game actors, players, and inventory items with private state',
      ],
      commonMistakes: [
        'Forgetting "self" as the first parameter in class methods.',
        'Sharing mutable class variables across all instances accidentally.',
      ],
      lessonSteps: [
        { stepNumber: 1, title: 'Classes and __init__', explanation: '__init__ is the initializer method called when creating new instances.' },
        { stepNumber: 2, title: 'Inheritance with super()', explanation: 'Allows child classes to reuse and extend parent functionality.' },
      ],
      concreteExample: {
        code: 'class Robot:\n    def __init__(self, name: str):\n        self.name = name\n    def speak(self) -> str:\n        return f"I am {self.name}."\n\nbot = Robot("Atlas")\nprint(bot.speak())',
        explanation: 'Basic class definition, constructor, instance method, and instantiation.',
        expectedOutput: 'I am Atlas.',
      },
      edgeCases: [
        'Class attributes defined directly on the class body are shared across all instances; mutating a shared class list affects all instances.',
        'Prefixing attributes with double underscores (__attr) triggers private name mangling (_ClassName__attr), not true security isolation.',
        'Multiple inheritance diamond hierarchies resolve attribute lookups using C3 Linearization (the MRO).',
      ],
      intermediateExample: {
        code: `# Encapsulation using @property getter and setter validation
class Temperature:
    def __init__(self, celsius: float):
        self._celsius = celsius

    @property
    def celsius(self) -> float:
        return self._celsius

    @celsius.setter
    def celsius(self, value: float):
        if value < -273.15:
            raise ValueError("Temperature below absolute zero!")
        self._celsius = value

temp = Temperature(25.0)
temp.celsius = 30.0
print("Current Celsius:", temp.celsius)`,
        explanation: 'The @property decorator provides clean dot syntax with runtime validation guards.',
        expectedOutput: 'Current Celsius: 30.0',
      },
      advancedExample: {
        code: `# Memory optimization using __slots__
class PointSlots:
    __slots__ = ('x', 'y')
    def __init__(self, x, y):
        self.x = x
        self.y = y

p = PointSlots(10, 20)
print(f"Has __dict__: {hasattr(p, '__dict__')}")
print(f"Coordinates: ({p.x}, {p.y})")`,
        explanation: '__slots__ eliminates per-instance __dict__ allocations, drastically reducing memory for millions of instances.',
        expectedOutput: 'Has __dict__: False\nCoordinates: (10, 20)',
      },
      practiceExercises: [
        {
          id: 'oop-rt-ex1',
          title: 'Exercise 1: BankAccount Class',
          prompt: 'Create BankAccount(owner, balance=0). Implement deposit(amount) and withdraw(amount) methods with balance checks.',
          hint: 'Raise ValueError if withdraw amount exceeds balance.',
          starterCode: 'class BankAccount:\n    # write methods here\n    pass\n',
          solutionCode: 'class BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n    def deposit(self, amt):\n        self.balance += amt\n    def withdraw(self, amt):\n        if amt > self.balance:\n            raise ValueError("Insufficient funds")\n        self.balance -= amt\nacct = BankAccount("Ada", 100)\nacct.deposit(50)\nprint(acct.balance)',
        },
      ],
      practiceQuestion: {
        question: 'What is the purpose of the "self" parameter in Python class instance methods?',
        options: [
          'It references the specific instance of the class on which the method is called',
          'It is a special keyword used to import classes from other modules',
          'It designates the method as static',
          'It allocates memory on the stack for the function call',
        ],
        correctIndex: 0,
        explanation: 'When calling instance.method(), Python implicitly passes the instance itself as the first argument, customarily named "self".',
        difficulty: 'easy',
        type: 'mcq',
        hint: '`self` connects the method to the specific instance calling it.',
      },
      practiceQuestions: [
        {
          id: 'oop-q1',
          question: 'What is the purpose of the "self" parameter in Python class instance methods?',
          options: [
            'It references the specific instance of the class on which the method is called',
            'It is a special keyword used to import classes from other modules',
            'It designates the method as static',
            'It allocates memory on the stack for the function call',
          ],
          correctIndex: 0,
          difficulty: 'easy',
          type: 'mcq',
          explanation: 'When calling instance.method(), Python implicitly passes the instance itself as the first argument, customarily named "self".',
          hint: '`self` connects the method to the specific instance calling it.',
        },
        {
          id: 'oop-q2',
          question: 'What is printed by calling super().__init__() in this subclass?',
          codeSnippet: 'class Parent:\n    def __init__(self):\n        self.x = 10\nclass Child(Parent):\n    def __init__(self):\n        super().__init__()\n        self.x += 5\nc = Child()\nprint(c.x)',
          options: ['15', '10', '5', 'AttributeError: x not found'],
          correctIndex: 0,
          difficulty: 'medium',
          type: 'output_prediction',
          explanation: 'super().__init__() initializes self.x to 10 in the parent, then the child increments it by 5, giving 15.',
          hint: '`super().__init__()` calls the parent constructor first.',
        },
        {
          id: 'oop-q3',
          question: 'What happens when a mutable list is defined directly on the class body (class attribute)?',
          options: [
            'All instances of the class share the exact same list in memory',
            'Each instance receives a separate isolated copy of the list',
            'Python raises a ClassDefinitionError',
            'The list becomes read-only',
          ],
          correctIndex: 0,
          difficulty: 'challenging',
          type: 'debugging',
          explanation: 'Attributes defined on the class body are shared across all instances. Instance attributes must be initialized inside __init__ with self.items = [].',
          hint: 'Class-level attributes belong to the class object itself, not separate instances.',
        },
        {
          id: 'oop-q4',
          question: 'How do you access a method decorated with `@property` on an instance `obj`?',
          codeSnippet: 'class Circle:\n    def __init__(self, r):\n        self.r = r\n    @property\n    def diameter(self):\n        return self.r * 2\n\nc = Circle(5)\n# How is diameter accessed?',
          options: [
            'c.diameter (without parentheses, like a regular attribute)',
            'c.diameter() (with mandatory parentheses)',
            'c.get_diameter()',
            'Circle.diameter(c)',
          ],
          correctIndex: 0,
          difficulty: 'easy',
          type: 'output_prediction',
          explanation: 'The `@property` decorator transforms a getter method into a readable attribute accessed using standard dot notation without parentheses `c.diameter`.',
          hint: '@property makes a method look and behave like a standard attribute.',
        },
        {
          id: 'oop-q5',
          question: 'What name mangling occurs when defining an attribute with two leading underscores `__balance` inside a class `Account`?',
          options: [
            '_Account__balance',
            '__balance__',
            '_balance',
            'private_balance',
          ],
          correctIndex: 0,
          explanation: 'CPython automatically prepends `_ClassName` to identifiers starting with two leading underscores (`_Account__balance`) to prevent namespace collisions in subclasses.',
          difficulty: 'medium',
          type: 'debugging',
          hint: 'Python prepends an underscore and the class name to the mangled identifier.',
        },
        {
          id: 'oop-q6',
          question: 'Which algorithm does Python use to determine the Method Resolution Order (MRO) in multiple inheritance?',
          options: [
            'C3 Linearization algorithm',
            'Depth-first search with cycles',
            'Breadth-first left-to-right search',
            'Dijkstra\'s shortest path algorithm',
          ],
          correctIndex: 0,
          explanation: 'Python 2.3+ and Python 3 use the C3 Linearization algorithm to compute a deterministic, monotonic Method Resolution Order (MRO) for class hierarchies.',
          difficulty: 'challenging',
          type: 'mcq',
          hint: 'The algorithm guarantees monotonicity and respects local precedence ordering.',
        },
      ],
    },
    {
      id: 'node-oop-dunder',
      title: 'MAGIC (DUNDER) METHODS',
      shortExplanation: 'Operator overloading and protocol integration: __str__, __repr__, __len__, and __eq__.',
      category: 'syntax',
      depth: 1,
      position: [3.2, 1.4, -0.6],
      size: 1.0,
      color: '#38bdf8',
      beginnerExplanation:
        'Double-underscore ("dunder") methods allow your custom classes to integrate with Python built-in operations like print(), len(), and "+".',
      intermediateExplanation:
        'Implementing __repr__ gives unambiguous developer representations; __str__ provides friendly user output. __eq__ customizes equality comparisons (==).',
      advancedDetails:
        'Classes implementing __iter__ and __getitem__ participate in iteration and indexing protocols. Operator overloading routes "+" to __add__ and "<" to __lt__.',
      whyItMatters: 'Makes custom classes feel like first-class native Python types.',
      practicalUseCases: [
        'Creating 2D/3D Vector math classes that support v1 + v2',
        'Custom collection classes that work seamlessly with len(collection) and for item in collection',
      ],
      commonMistakes: ['Returning non-string objects from __str__ or __repr__.'],
      lessonSteps: [
        { stepNumber: 1, title: '__str__ vs __repr__', explanation: '__str__ is for end users; __repr__ is for developers and debugging.' },
      ],
      concreteExample: {
        code: 'class Vector:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def __add__(self, other):\n        return Vector(self.x + other.x, self.y + other.y)\n    def __repr__(self):\n        return f"Vector({self.x}, {self.y})"\n\nprint(Vector(1, 2) + Vector(3, 4))',
        explanation: 'Overloads the + operator using __add__ and formats display with __repr__.',
        expectedOutput: 'Vector(4, 6)',
      },
      practiceQuestion: {
        question: 'Which magic method is called when the built-in len() function is used on an instance?',
        options: ['__len__', '__size__', '__count__', '__length__'],
        correctIndex: 0,
        explanation: 'Python routes len(obj) directly to obj.__len__(), which must return a non-negative integer.',
      },
      practiceQuestions: [
        {
          id: 'du-q1',
          question: 'Which magic method is called when the built-in len() function is used on an instance?',
          options: ['__len__', '__size__', '__count__', '__length__'],
          correctIndex: 0,
          difficulty: 'easy',
          type: 'mcq',
          explanation: 'Python routes len(obj) directly to obj.__len__(), which must return a non-negative integer.',
        },
        {
          id: 'du-q2',
          question: 'What is the required return type of the __str__ dunder method?',
          options: ['str (string)', 'None', 'dict', 'any printable type'],
          correctIndex: 0,
          difficulty: 'medium',
          type: 'mcq',
          explanation: 'The __str__ method must return a string. Returning any non-string type raises a TypeError.',
        },
        {
          id: 'du-q3',
          question: 'Which dunder method must be implemented to support the "in" operator (item in my_object)?',
          options: ['__contains__', '__has__', '__in__', '__lookup__'],
          correctIndex: 0,
          difficulty: 'challenging',
          type: 'mcq',
          explanation: 'The membership test "x in obj" first checks obj.__contains__(x), falling back to iteration if not defined.',
        },
      ],
    },
  ],
  edges: [
    { id: 'e-oop-1', source: 'node-oop-root', target: 'node-oop-dunder', relationship: 'implements_protocols', description: 'Native operator integration' },
  ],
}

// ==============================================================================
// SECTION G: ADVANCED PYTHON 3D MAP
// ==============================================================================
export const PYTHON_ADVANCED_MAP: KnowledgeMap = {
  id: 'map-sec-advanced',
  topic: 'Advanced Python',
  title: 'Section G: Advanced Python Architecture',
  description:
    'Generators, the yield keyword, function decorators (@), typing type hints, asyncio concurrency, and memory optimization.',
  centralNodeId: 'node-adv-root',
  parentMapId: 'map-python-master',
  parentMapTopic: 'Python Programming Master Curriculum',
  parentMapTitle: 'Python Overview',
  createdAt: '2026-10-15T10:00:00Z',
  isDemo: true,
  demoNote: 'Curated Section G Architecture',
  searchStatus: 'verified-web',
  sources: [
    {
      title: 'Python Documentation: Generators and Coroutines',
      url: 'https://docs.python.org/3/glossary.html#term-generator',
      snippet: 'A function which returns a generator iterator. It looks like a normal function except that it contains yield expressions.',
      sourceName: 'Python Docs',
    },
  ],
  nodes: [
    {
      id: 'node-adv-root',
      title: 'ADVANCED PYTHON',
      shortExplanation: 'High-performance lazy generators, metaprogramming decorators, asyncio concurrency, and type systems.',
      category: 'core',
      depth: 0,
      position: [0, 0, 0],
      size: 1.45,
      color: '#f59e0b',
      beginnerExplanation:
        'Advanced Python provides professional tools: generators that stream multi-gigabyte data without exhausting RAM, decorators that wrap functions cleanly, and type hints that catch bugs before runtime.',
      intermediateExplanation:
        'Generators preserve local state between yield expressions. Decorators utilize closures to wrap callables. Asyncio coordinates non-blocking I/O over an event loop.',
      advancedDetails:
        'CPython generator frames store bytecode offsets and evaluation stacks across yield points. The Global Interpreter Lock (GIL) serializes CPU bytecode execution across native threads.',
      whyItMatters: 'Enables high-scale distributed backend servers, streaming data pipelines, and production-grade architectures.',
      practicalUseCases: [
        'Streaming 50GB log files line-by-line in O(1) memory',
        'Building high-throughput asynchronous web APIs with FastAPI and async def',
      ],
      commonMistakes: [
        'Attempting to re-iterate over an exhausted generator.',
        'Blocking the asyncio event loop with synchronous time.sleep() instead of await asyncio.sleep().',
      ],
      lessonSteps: [
        { stepNumber: 1, title: 'yield vs return', explanation: 'yield pauses the function and hands a value back, preserving internal state.' },
        { stepNumber: 2, title: 'Decorators (@)', explanation: 'Wraps another function to modify behavior without altering source code.' },
      ],
      concreteExample: {
        code: 'def fibonacci(limit):\n    a, b = 0, 1\n    for _ in range(limit):\n        yield a\n        a, b = b, a + b\n\nprint(list(fibonacci(7)))',
        explanation: 'Generates Fibonacci numbers lazily using the yield statement.',
        expectedOutput: '[0, 1, 1, 2, 3, 5, 8]',
      },
      edgeCases: [
        'Generator iterators can only be consumed ONCE; once exhausted, subsequent for loops over them execute zero iterations without raising an error.',
        'Decorators defined without @functools.wraps overwrite the target function\'s __name__, __doc__, and signature with generic wrapper attributes.',
        'Synchronous blocking operations (e.g. time.sleep() or synchronous socket calls) freeze the single-threaded asyncio event loop, starving all concurrent tasks.',
      ],
      intermediateExample: {
        code: `# Memory-efficient streaming generator pipeline
def read_log_records(entries):
    for raw in entries:
        cleaned = raw.strip()
        if cleaned:
            yield cleaned.upper()

def filter_errors(record_stream):
    for record in record_stream:
        if "ERROR" in record:
            yield record

raw_logs = ["  error: timeout  ", "info: ok", "  error: disk full  ", ""]
pipeline = filter_errors(read_log_records(raw_logs))
print("Matched Logs:", list(pipeline))`,
        explanation: 'Composing generator pipelines processes infinite or large streaming data lazily in constant O(1) memory.',
        expectedOutput: 'Matched Logs: [\'ERROR: TIMEOUT\', \'ERROR: DISK FULL\']',
      },
      advancedExample: {
        code: `import asyncio

# Asynchronous non-blocking task coordination via asyncio.gather
async def fetch_metric(service: str, delay: float) -> str:
    await asyncio.sleep(delay)
    return f"{service} responding in {delay:.2f}s"

async def main():
    tasks = [
        fetch_metric("AuthService", 0.05),
        fetch_metric("BillingService", 0.08),
        fetch_metric("SearchService", 0.02),
    ]
    results = await asyncio.gather(*tasks)
    for r in results:
        print(r)

asyncio.run(main())`,
        explanation: 'Non-blocking I/O multiplexing on the asyncio event loop using coroutines, await, and cooperative scheduling.',
        expectedOutput: 'AuthService responding in 0.05s\nBillingService responding in 0.08s\nSearchService responding in 0.02s',
      },
      practiceExercises: [
        {
          id: 'adv-rt-ex1',
          title: 'Exercise 1: Timing Decorator',
          prompt: 'Write a decorator @timer that prints how many seconds a function takes to execute using time.perf_counter().',
          hint: 'Use functools.wraps and wrap *args, **kwargs.',
          starterCode: 'import time\nfrom functools import wraps\n\ndef timer(func):\n    # your code\n    pass\n',
          solutionCode: 'import time\nfrom functools import wraps\n\ndef timer(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        t0 = time.perf_counter()\n        res = func(*args, **kwargs)\n        print(f"Executed in {time.perf_counter() - t0:.4f}s")\n        return res\n    return wrapper',
        },
      ],
      practiceQuestion: {
        question: 'What is the primary memory advantage of a generator over a standard Python list?',
        options: [
          'Generators calculate values lazily on demand, consuming O(1) memory',
          'Generators automatically compress values using gzip',
          'Generators bypass CPU cache memory entirely',
          'Generators store values in GPU memory',
        ],
        correctIndex: 0,
        explanation: 'Because generators compute values only when next() is called, they do not allocate storage for the entire sequence in memory.',
        difficulty: 'easy',
        type: 'mcq',
        hint: 'Generators evaluate items lazily one item at a time rather than allocating a full sequence in RAM.',
      },
      practiceQuestions: [
        {
          id: 'adv-q1',
          question: 'What is the primary memory advantage of a generator over a standard Python list?',
          options: [
            'Generators calculate values lazily on demand, consuming O(1) memory',
            'Generators automatically compress values using gzip',
            'Generators bypass CPU cache memory entirely',
            'Generators store values in GPU memory',
          ],
          correctIndex: 0,
          difficulty: 'easy',
          type: 'mcq',
          explanation: 'Because generators compute values only when next() is called, they do not allocate storage for the entire sequence in memory.',
          hint: 'Generators evaluate items lazily one item at a time rather than allocating a full sequence in RAM.',
        },
        {
          id: 'adv-q2',
          question: 'What happens when calling next() on an exhausted generator that has no more yield values?',
          options: ['StopIteration is raised', 'It returns None', 'It loops back to the beginning', 'It raises GeneratorExit'],
          correctIndex: 0,
          difficulty: 'medium',
          type: 'output_prediction',
          explanation: 'When a generator function terminates or returns, subsequent calls to next() raise the StopIteration exception.',
          hint: 'The iterator protocol signals termination through a specific built-in exception.',
        },
        {
          id: 'adv-q3',
          question: 'Why should decorators always use the @functools.wraps(func) helper on inner wrapper functions?',
          options: [
            'It preserves the original function name (__name__), docstring (__doc__), and signature',
            'It makes the decorator execute asynchronously',
            'It prevents the decorator from accepting arguments',
            'It disables garbage collection for the wrapper',
          ],
          correctIndex: 0,
          difficulty: 'challenging',
          type: 'debugging',
          explanation: 'Without @wraps, the decorated function loses its identity and adopts the wrapper generic name "__name__ = wrapper" and empty docstring.',
          hint: 'Without it, introspecting the decorated function reveals the wrapper function name instead of the original function name.',
        },
        {
          id: 'adv-q4',
          question: 'What is printed when attempting to iterate through this generator expression twice?',
          codeSnippet: 'gen = (x * 2 for x in [1, 2, 3])\nlist1 = list(gen)\nlist2 = list(gen)\nprint(list1, list2)',
          options: ['[2, 4, 6] []', '[2, 4, 6] [2, 4, 6]', 'StopIteration error', '[2, 4, 6] None'],
          correctIndex: 0,
          difficulty: 'medium',
          type: 'output_prediction',
          explanation: 'Generators produce values on demand and maintain an internal iteration pointer. Once the generator reaches the end, subsequent attempts to consume it produce an empty list [].',
          hint: 'Generators are one-way lazy iterators that do not rewind or buffer past items in memory.',
        },
        {
          id: 'adv-q5',
          question: 'What does the "yield from <iterable>" syntax accomplish inside a Python generator?',
          options: [
            'Delegates generation to another iterable or sub-generator transparently',
            'Imports a generator from an external module',
            'Terminates the generator and yields a return value',
            'Creates a deep copy of the iterable in memory',
          ],
          correctIndex: 0,
          difficulty: 'medium',
          type: 'mcq',
          explanation: '`yield from` establishes a transparent bidirectional channel between the caller and a sub-generator, forwarding yielded values and received send/throw signals.',
          hint: 'It transparently forwards all items from a sub-iterable or sub-generator to the caller.',
        },
        {
          id: 'adv-q6',
          question: 'Which of the following calls dangerously freezes all concurrent tasks in an asyncio application?',
          options: [
            'time.sleep(5)',
            'await asyncio.sleep(5)',
            'await asyncio.gather(...)',
            'asyncio.create_task(...)',
          ],
          correctIndex: 0,
          difficulty: 'challenging',
          type: 'debugging',
          explanation: 'Synchronous blocking calls like time.sleep() block the entire OS thread, preventing the asyncio event loop from switching context to any other scheduled coroutines. Always use non-blocking await asyncio.sleep().',
          hint: 'Asyncio operates cooperatively on a single operating system thread by default.',
        },
      ],
    },
    {
      id: 'node-adv-decorators',
      title: 'FUNCTION DECORATORS (@)',
      shortExplanation: 'Syntactic sugar (@) wrapping functions with cross-cutting concerns: logging, caching, and auth.',
      category: 'syntax',
      depth: 1,
      position: [3.4, 1.2, -0.6],
      size: 1.0,
      color: '#f59e0b',
      beginnerExplanation:
        'A decorator is a function that takes another function as input, adds new behavior to it, and returns the modified function.',
      intermediateExplanation:
        'The @decorator syntax is sugar for: func = decorator(func). Decorators can accept configuration arguments by nesting an additional outer function.',
      advancedDetails:
        'Decorators are widely used in Python frameworks: @app.get() in FastAPI, @property, @staticmethod, and @lru_cache in functools.',
      whyItMatters: 'Enforces clean separation of concerns without modifying the core business logic inside functions.',
      practicalUseCases: [
        'Caching expensive database calculations with @functools.lru_cache',
        'Validating user JWT authentication tokens before executing API routes',
      ],
      commonMistakes: ['Forgetting to return the inner wrapper function from the decorator body.'],
      lessonSteps: [
        { stepNumber: 1, title: 'Decorator Pattern', explanation: 'def dec(fn): def wrap(*a, **kw): ... return wrap.' },
      ],
      concreteExample: {
        code: 'from functools import lru_cache\n\n@lru_cache(maxsize=32)\ndef fib(n):\n    if n < 2: return n\n    return fib(n - 1) + fib(n - 2)\n\nprint(fib(30)) # Computed instantly due to memoization',
        explanation: 'Uses @lru_cache to eliminate exponential recursive recalculation.',
        expectedOutput: '832040',
      },
      practiceQuestion: {
        question: 'The syntax @my_decorator above "def my_func(): pass" is equivalent to which assignment?',
        options: [
          'my_func = my_decorator(my_func)',
          'my_decorator = my_func(my_decorator)',
          'my_func.decorator = my_decorator',
          'my_func = my_decorator()',
        ],
        correctIndex: 0,
        explanation: 'Decorator syntax is direct syntactic sugar for passing the decorated function to the decorator callable.',
      },
      practiceQuestions: [
        {
          id: 'dec-q1',
          question: 'The syntax @my_decorator above "def my_func(): pass" is equivalent to which assignment?',
          options: [
            'my_func = my_decorator(my_func)',
            'my_decorator = my_func(my_decorator)',
            'my_func.decorator = my_decorator',
            'my_func = my_decorator()',
          ],
          correctIndex: 0,
          difficulty: 'easy',
          type: 'mcq',
          explanation: 'Decorator syntax is direct syntactic sugar for passing the decorated function to the decorator callable.',
        },
        {
          id: 'dec-q2',
          question: 'What does the @functools.lru_cache decorator do?',
          options: [
            'Memoizes function call results based on argument values to prevent redundant computation',
            'Logs function execution time to disk',
            'Enforces type checking at runtime',
            'Converts functions into multithreaded workers',
          ],
          correctIndex: 0,
          difficulty: 'medium',
          type: 'mcq',
          explanation: 'lru_cache provides a Least Recently Used in-memory cache that stores recent return values for corresponding arguments.',
        },
        {
          id: 'dec-q3',
          question: 'What is the output of this decorator that doubles the return value?',
          codeSnippet: 'def double(fn):\n    def wrap(x):\n        return fn(x) * 2\n    return wrap\n\n@double\ndef num(n):\n    return n + 3\n\nprint(num(4))',
          options: ['14', '11', '8', '7'],
          correctIndex: 0,
          difficulty: 'challenging',
          type: 'output_prediction',
          explanation: 'num(4) returns 4 + 3 = 7. The wrapper doubles it: 7 * 2 = 14.',
        },
      ],
    },
  ],
  edges: [
    { id: 'e-adv-1', source: 'node-adv-root', target: 'node-adv-decorators', relationship: 'metaprograms_via', description: 'Callable wrapping and caching' },
  ],
}

// ==============================================================================
// SECTION H: PRACTICAL PROJECTS 3D MAP
// ==============================================================================
export const PYTHON_PROJECTS_MAP: KnowledgeMap = {
  id: 'map-sec-projects',
  topic: 'Practical Python Projects',
  title: 'Section H: Practical Projects Architecture',
  description:
    'End-to-end Python software development: CLI tools, file system automation, web scrapers, REST API integrations, and data analysis pipelines.',
  centralNodeId: 'node-proj-root',
  parentMapId: 'map-python-master',
  parentMapTopic: 'Python Programming Master Curriculum',
  parentMapTitle: 'Python Overview',
  createdAt: '2026-10-15T10:00:00Z',
  isDemo: true,
  demoNote: 'Curated Section H Architecture',
  searchStatus: 'verified-web',
  sources: [
    {
      title: 'Python Documentation: Python Packaging and CLI Tooling',
      url: 'https://docs.python.org/3/library/argparse.html',
      snippet: 'Parser for command-line options, arguments and sub-commands.',
      sourceName: 'Python Docs',
    },
  ],
  nodes: [
    {
      id: 'node-proj-root',
      title: 'PRACTICAL PROJECTS',
      shortExplanation: 'Synthesizing language fundamentals into production-ready software systems.',
      category: 'core',
      depth: 0,
      position: [0, 0, 0],
      size: 1.45,
      color: '#ec4899',
      beginnerExplanation:
        'Building real projects transitions you from learning syntax to thinking like a software engineer. Projects combine loops, data structures, files, and APIs.',
      intermediateExplanation:
        'Production Python systems separate concerns: Data Models -> Core Business Logic -> CLI / UI Interface -> Storage / Persistence. They include testing with pytest.',
      advancedDetails:
        'Covers command line parsing with argparse/click, environment variable management (.env), graceful signal handling, and reproducible virtual environments with venv.',
      whyItMatters: 'Practical projects prove competence and provide working applications for portfolios.',
      practicalUseCases: [
        'Automated directory organizer sorting downloads by file format',
        'Weather CLI client fetching real-time forecasts from REST APIs',
      ],
      commonMistakes: [
        'Writing entire 400-line scripts in one monolithic block without helper functions.',
        'Hardcoding secret API keys or passwords directly into source code.',
      ],
      lessonSteps: [
        { stepNumber: 1, title: 'Separation of Concerns', explanation: 'Keep data parsing separate from business rules and display logic.' },
        { stepNumber: 2, title: 'Virtual Environments', explanation: 'Use python -m venv .venv to isolate third-party dependencies.' },
      ],
      concreteExample: {
        code: '# Clean CLI structure\ndef format_report(title: str, stats: dict) -> str:\n    lines = [f"=== {title.upper()} ==="]\n    for k, v in stats.items():\n        lines.append(f"{k:<12}: {v}")\n    return "\\n".join(lines)\n\nprint(format_report("Sales", {"Units": 140, "Revenue": "$2,800"}))',
        explanation: 'Clean report formatting utility separating data representation from output rendering.',
        expectedOutput: '=== SALES ===\nUnits       : 140\nRevenue     : $2,800',
      },
      edgeCases: [
        'Direct dictionary indexing on os.environ[KEY] raises KeyError if the environment variable is not defined; use os.environ.get(KEY, default) or os.getenv() for safe fallbacks.',
        'Hardcoding OS-specific path separators ("\\\\" vs "/") breaks portability between Windows and Linux/macOS; use pathlib.Path or the "/" operator.',
        'Writing files without proper context managers can leave unwritten buffers on sudden process exit or power failure.',
      ],
      intermediateExample: {
        code: `from pathlib import Path

# Clean file directory inspection utility using pathlib
def inspect_directory_files(dir_path: str = ".") -> dict:
    """Tally files by extension in directory."""
    root = Path(dir_path)
    summary = {"total_files": 0, "extensions": {}}
    if not root.is_dir():
        return summary

    for entry in root.iterdir():
        if entry.is_file():
            summary["total_files"] += 1
            ext = entry.suffix.lower() or ".none"
            summary["extensions"][ext] = summary["extensions"].get(ext, 0) + 1
    return summary

print("Project Files:", inspect_directory_files("."))`,
        explanation: 'Object-oriented filesystem traversal using pathlib.Path and directory iteration.',
        expectedOutput: 'Project Files: {\'total_files\': 3, \'extensions\': {\'.py\': 2, \'.json\': 1}}',
      },
      advancedExample: {
        code: `import os
from dataclasses import dataclass

# Production configuration manager with dataclasses and env validation
@dataclass(frozen=True)
class AppConfig:
    app_env: str
    port: int
    debug: bool

    @classmethod
    def from_env(cls) -> "AppConfig":
        env = os.getenv("APP_ENV", "development").lower()
        port_raw = os.getenv("PORT", "8000")
        try:
            port = int(port_raw)
        except ValueError:
            port = 8000
        debug = env in ("development", "staging")
        return cls(app_env=env, port=port, debug=debug)

config = AppConfig.from_env()
print(f"Loaded Config: env={config.app_env}, port={config.port}, debug={config.debug}")`,
        explanation: 'Immutable configuration object built from runtime environment variables with defensive type casting and fallbacks.',
        expectedOutput: 'Loaded Config: env=development, port=8000, debug=True',
      },
      practiceExercises: [
        {
          id: 'proj-rt-ex1',
          title: 'Exercise 1: File Extension Counter',
          prompt: 'Write count_extensions(filenames) that returns a dict tallying extensions (e.g. {"py": 2, "txt": 1}).',
          hint: 'Use name.rsplit(".", 1)[-1] and dict or collections.Counter.',
          starterCode: 'def count_extensions(files):\n    # your code\n    pass\n',
          solutionCode: 'def count_extensions(files):\n    counts = {}\n    for f in files:\n        ext = f.rsplit(".", 1)[-1].lower() if "." in f else "none"\n        counts[ext] = counts.get(ext, 0) + 1\n    return counts\nprint(count_extensions(["app.py", "test.py", "notes.txt"]))',
        },
      ],
      practiceQuestion: {
        question: 'Which built-in Python module is standard for creating command-line argument interfaces?',
        options: ['argparse', 'cli_parser', 'terminal', 'cmdline'],
        correctIndex: 0,
        explanation: 'argparse is Python’s standard library module for parsing CLI arguments, flags, and help menus.',
        difficulty: 'easy',
        type: 'mcq',
        hint: 'This standard library module generates CLI help flags (--help) and parses sys.argv.',
      },
      practiceQuestions: [
        {
          id: 'prj-q1',
          question: 'Which built-in Python module is standard for creating command-line argument interfaces?',
          options: ['argparse', 'cli_parser', 'terminal', 'cmdline'],
          correctIndex: 0,
          difficulty: 'easy',
          type: 'mcq',
          explanation: 'argparse is Python’s standard library module for parsing CLI arguments, flags, and help menus.',
          hint: 'This standard library module generates CLI help flags (--help) and parses sys.argv.',
        },
        {
          id: 'prj-q2',
          question: 'Where should sensitive API keys and secrets be stored in a production Python project?',
          options: [
            'In environment variables (.env file excluded from git via .gitignore)',
            'Hardcoded into constant variables at the top of the main.py script',
            'Committed to the public git repository in README.md',
            'In Python comments inside the function body',
          ],
          correctIndex: 0,
          difficulty: 'medium',
          type: 'mcq',
          explanation: 'Sensitive credentials must always be stored in environment variables and never checked into source control.',
          hint: 'Environment variables keep secrets isolated from the codebase and out of version control.',
        },
        {
          id: 'prj-q3',
          question: 'What is the purpose of the "if __name__ == \'__main__\':" guard in Python scripts?',
          options: [
            'It ensures the code block runs only when executed directly, not when imported as a module',
            'It accelerates execution speed by skipping bytecode compilation',
            'It is mandatory for all Python programs to run',
            'It declares the main entry thread in the OS scheduler',
          ],
          correctIndex: 0,
          difficulty: 'challenging',
          type: 'debugging',
          explanation: 'The __name__ variable equals "__main__" only when the script is run directly from the terminal, allowing files to be both runnable scripts and importable modules.',
          hint: 'When a Python file is imported by another script, __name__ is set to the module name instead.',
        },
        {
          id: 'prj-q4',
          question: 'What operator does Python\'s pathlib.Path overload to join path segments cross-platform?',
          options: [
            'The division operator (/)',
            'The addition operator (+)',
            'The bitwise or operator (|)',
            'The modulo operator (%)',
          ],
          correctIndex: 0,
          difficulty: 'medium',
          type: 'mcq',
          explanation: 'pathlib.Path overloads the forward-slash / operator so expressions like Path("data") / "sub" / "file.txt" work consistently on Windows, Linux, and macOS.',
          hint: 'Path("folder") / "file.txt" joins paths naturally.',
        },
        {
          id: 'prj-q5',
          question: 'Why is os.environ.get("PORT", 8000) preferred over os.environ["PORT"] for service configuration?',
          options: [
            'os.environ.get returns a safe default without raising KeyError when PORT is unset',
            'os.environ.get automatically parses strings into integers',
            'Direct indexing on os.environ is deprecated in Python 3',
            'os.environ.get encrypts the variable value in memory',
          ],
          correctIndex: 0,
          difficulty: 'medium',
          type: 'debugging',
          explanation: 'Accessing os.environ[key] directly crashes with KeyError if the variable was not provided by the environment. get(key, default) falls back gracefully.',
          hint: 'Direct dictionary indexing crashes if the key is missing from the environment dictionary.',
        },
        {
          id: 'prj-q6',
          question: 'What is the primary technical benefit of using "python -m venv .venv" in a project?',
          options: [
            'It creates an isolated directory with its own Python binary and site-packages to prevent dependency version conflicts',
            'It compiles Python code into native machine code for faster execution',
            'It runs Python scripts inside a Docker container automatically',
            'It eliminates the need to install pip packages',
          ],
          correctIndex: 0,
          difficulty: 'challenging',
          type: 'mcq',
          explanation: 'Virtual environments isolate packages into a local .venv/lib/site-packages directory, preventing version collisions between different projects sharing the same host machine.',
          hint: 'Virtual environments prevent packages installed for one project from breaking other projects on the same machine.',
        },
      ],
    },
    {
      id: 'node-proj-automation',
      title: 'FILE SYSTEM & AUTOMATION',
      shortExplanation: 'Automating OS file operations using pathlib, os, and shutil.',
      category: 'application',
      depth: 1,
      position: [3.4, 1.4, -0.6],
      size: 1.0,
      color: '#ec4899',
      beginnerExplanation:
        'Python can organize your computer: search folders, rename files in bulk, move files by date, and clean up messy downloads.',
      intermediateExplanation:
        'pathlib.Path provides object-oriented paths with path / "subfolder" operator syntax. shutil handles high-level operations like copying directory trees.',
      advancedDetails:
        'Path.glob("*.py") returns a generator of matching path objects. Path.stat() provides file sizes, modification timestamps, and permissions.',
      whyItMatters: 'Saves hours of repetitive manual computer tasks through clean, reproducible scripts.',
      practicalUseCases: [
        'Automatically sorting messy Downloads folder into Images, Documents, and Archives',
        'Finding and deleting temporary cache files older than 30 days',
      ],
      commonMistakes: ['Hardcoding Windows backslash paths like "C:\\..." which break on Linux/Mac.'],
      lessonSteps: [
        { stepNumber: 1, title: 'pathlib.Path', explanation: 'Use Path("folder") / "file.txt" for cross-platform file paths.' },
      ],
      concreteExample: {
        code: 'from pathlib import Path\n\n# Cross-platform path composition\nlog_path = Path("logs") / "2026" / "app.log"\nprint(f"File suffix: {log_path.suffix}")\nprint(f"Parent directory: {log_path.parent}")',
        explanation: 'Demonstrates cross-platform path manipulation with pathlib.',
        expectedOutput: 'File suffix: .log\nParent directory: logs/2026',
      },
      practiceQuestion: {
        question: 'Which modern standard library module provides an object-oriented API for file system paths in Python?',
        options: ['pathlib', 'filepath', 'os.path', 'syspath'],
        correctIndex: 0,
        explanation: 'pathlib (introduced in Python 3.4) offers a modern, cross-platform object-oriented API for path handling.',
      },
      practiceQuestions: [
        {
          id: 'aut-q1',
          question: 'Which modern standard library module provides an object-oriented API for file system paths in Python?',
          options: ['pathlib', 'filepath', 'os.path', 'syspath'],
          correctIndex: 0,
          difficulty: 'easy',
          type: 'mcq',
          explanation: 'pathlib offers a modern, cross-platform object-oriented API for path handling.',
        },
        {
          id: 'aut-q2',
          question: 'What does Path("documents").glob("*.pdf") return?',
          options: [
            'A generator yielding Path objects for all matching PDF files',
            'A list of raw string file names',
            'A single file path',
            'The total byte size of PDF files',
          ],
          correctIndex: 0,
          difficulty: 'medium',
          type: 'mcq',
          explanation: 'glob() yields matching Path objects lazily as an iterator.',
        },
        {
          id: 'aut-q3',
          question: 'Which pathlib method checks whether a file or directory actually exists on disk?',
          options: ['path.exists()', 'path.is_there()', 'path.valid()', 'path.check()'],
          correctIndex: 0,
          difficulty: 'challenging',
          type: 'mcq',
          explanation: 'path.exists() queries the file system and returns True if the path references an existing file or directory.',
        },
      ],
    },
  ],
  edges: [
    { id: 'e-proj-1', source: 'node-proj-root', target: 'node-proj-automation', relationship: 'automates_with', description: 'Cross-platform file system scripts' },
  ],
}
