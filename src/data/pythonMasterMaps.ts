import type { KnowledgeMap } from '../types/knowledge'

/**
 * MASTER 3D PYTHON OVERVIEW MAP
 * Central glowing sphere: PYTHON
 * Orbiting section spheres: Sections A through H
 */
export const PYTHON_MASTER_OVERVIEW_MAP: KnowledgeMap = {
  id: 'map-python-master',
  topic: 'Python Programming Master Curriculum',
  title: 'Python Programming Master Architecture',
  description:
    'An interactive 3D map of the complete Python language, organized into 8 foundational pillars from syntax fundamentals to advanced concurrency and real-world projects.',
  centralNodeId: 'node-py-root',
  createdAt: '2026-10-15T10:00:00Z',
  isDemo: true,
  demoNote: 'Official Master Python Curriculum',
  searchStatus: 'verified-web',
  searchSummary: 'Grounded in Python 3.12+ Official Documentation & Computer Science Standards',
  sources: [
    {
      title: 'Python 3.12 Documentation — The Python Tutorial',
      url: 'https://docs.python.org/3/tutorial/index.html',
      snippet: 'Python is an easy to learn, powerful programming language with efficient high-level data structures and an elegant syntax.',
      sourceName: 'Python Docs',
    },
    {
      title: 'PEP 8 — Style Guide for Python Code',
      url: 'https://peps.python.org/pep-0008/',
      snippet: 'This document gives coding conventions for the Python code comprising the standard library in the main Python distribution.',
      sourceName: 'Python Enhancement Proposals',
    },
    {
      title: 'The Python Standard Library Architecture',
      url: 'https://docs.python.org/3/library/index.html',
      snippet: 'Python’s standard library is very extensive, offering a wide range of facilities as indicated by the long table of contents.',
      sourceName: 'Python Docs',
    },
  ],
  nodes: [
    {
      id: 'node-py-root',
      title: 'PYTHON',
      shortExplanation:
        'A high-level, general-purpose, dynamically typed programming language emphasizing human code readability and developer productivity.',
      category: 'core',
      depth: 0,
      position: [0, 0, 0],
      size: 1.55,
      color: '#38bdf8', // Electric Cyan
      beginnerExplanation:
        'Think of Python like clear, structured English for communicating with computers. Created by Guido van Rossum in 1991, Python replaces cryptic symbols with clean, readable keywords.',
      intermediateExplanation:
        'Python is interpreted and bytecode-compiled to the CPython Virtual Machine (PVM). It uses dynamic typing, automatic reference-counted memory management with cyclic garbage collection, and batteries-included libraries.',
      advancedDetails:
        'CPython compiles .py source into .pyc bytecode instructions executed by an evaluation loop. Thread concurrency is managed by the Global Interpreter Lock (GIL), with subinterpreters and free-threaded builds advancing in Python 3.13+.',
      whyItMatters:
        'Python powers global systems: AI/ML models (PyTorch, TensorFlow), high-scale backends (Instagram, YouTube, Spotify), cloud automation, scientific simulations (NASA), and web infrastructure.',
      practicalUseCases: [
        'Artificial Intelligence & Machine Learning model training and inference',
        'Backend web servers and REST/GraphQL APIs (FastAPI, Django, Flask)',
        'Data science, statistical visualization, and automated data pipelines',
        'System automation, DevOps scripting, and network reliability tooling',
      ],
      commonMistakes: [
        'Confusing assignment (reference binding) with deep object copying.',
        'Over-indexing loops manually with range(len()) instead of direct iteration.',
        'Ignoring variable scope rules (LEGB: Local, Enclosing, Global, Built-in).',
      ],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'The Python Philosophy (Zen of Python)',
          explanation:
            'Beautiful is better than ugly. Explicit is better than implicit. Simple is better than complex. Readability counts. Run `import this` in any Python shell to view.',
          codeSnippet: 'import this\n# The guiding design principles of Python',
        },
        {
          stepNumber: 2,
          title: 'The Execution Lifecycle',
          explanation:
            'Source Code (.py) -> CPython Compiler -> Bytecode (.pyc) -> Python Virtual Machine (PVM) -> Native CPU Execution.',
          codeSnippet: '# Check bytecode instructions\nimport dis\ndis.dis(lambda x: x + 1)',
        },
        {
          stepNumber: 3,
          title: 'The 8 Curriculum Pillars',
          explanation:
            'Explore the 8 connected spheres: Fundamentals, Control Flow, Data Structures, Functions, Errors & Files, OOP, Advanced Python, and Practical Projects.',
        },
      ],
      concreteExample: {
        code: '# Python idiomatic elegance\nstudents = ["Ada", "Alan", "Grace"]\nfor rank, name in enumerate(students, start=1):\n    print(f"Rank {rank}: {name}")',
        explanation: 'Uses Python f-strings and enumerate() to cleanly unpack index and element simultaneously.',
        expectedOutput: 'Rank 1: Ada\nRank 2: Alan\nRank 3: Grace',
      },
      practiceExercises: [
        {
          id: 'py-root-ex1',
          title: 'Exercise 1: Inspect System Info',
          prompt: 'Write a Python snippet that prints the current Python version, platform architecture, and executes a formatted string.',
          hint: 'Import the "sys" and "platform" standard modules.',
          starterCode: 'import sys\nimport platform\n\n# Print system details here\n',
          solutionCode: 'import sys\nimport platform\n\nprint(f"Python Version: {sys.version.split()[0]}")\nprint(f"Operating System: {platform.system()} {platform.release()}")',
        },
        {
          id: 'py-root-ex2',
          title: 'Exercise 2: Dynamic Typing Check',
          prompt: 'Create a variable, assign it an integer, print its type and memory id(), then reassign it to a string and observe the change.',
          hint: 'Use type() and id() functions.',
          starterCode: 'val = 42\n# inspect type and id\n',
          solutionCode: 'val = 42\nprint(f"val is {val}, type: {type(val)}, id: {id(val)}")\nval = "Hello Python"\nprint(f"val is {val}, type: {type(val)}, id: {id(val)}")',
        },
      ],
      practiceQuestion: {
        question: 'Which component is responsible for executing Python bytecode instructions?',
        options: [
          'The Python Virtual Machine (PVM)',
          'The Linux bash kernel',
          'The browser JavaScript V8 engine',
          'The GCC C preprocessor',
        ],
        correctIndex: 0,
        explanation:
          'CPython compiles source code into intermediate bytecode, which is interpreted and executed by the Python Virtual Machine (PVM).',
      },
      nextSuggestedLessons: [
        { id: 'sec-a', title: 'Section A: Python Fundamentals', query: 'Python Fundamentals' },
        { id: 'sec-b', title: 'Section B: Control Flow', query: 'Python Control Flow' },
      ],
    },
    {
      id: 'node-sec-fundamentals',
      title: 'A. FUNDAMENTALS',
      shortExplanation:
        'Syntax, 4-space indentation, variables, constants, dynamic types, I/O, operators, and precedence.',
      category: 'foundation',
      depth: 1,
      position: [4.2, 1.4, 0.5],
      size: 1.15,
      color: '#38bdf8',
      linkedMapTopic: 'Python Fundamentals',
      beginnerExplanation:
        'Section A introduces how Python reads code using whitespace instead of brackets, how variables store values, and how operators perform math and logic.',
      intermediateExplanation:
        'Covers variables as memory object references, the 7 operator classes (arithmetic, comparison, logical, assignment, identity, membership, bitwise), and PEMDAS operator precedence.',
      advancedDetails:
        'Covers integer caching (-5 to 256), string interning, IEEE 754 floating point precision limits, and the difference between equality (==) and object identity (is).',
      whyItMatters:
        'Flawless fundamentals prevent insidious bugs like unexpected operator short-circuiting or mutable reference sharing.',
      practicalUseCases: [
        'Formatting CLI prompts and parsing user keyboard inputs',
        'Mathematical operations and financial interest rate calculations',
        'Writing clean, PEP 8-compliant readable scripts',
      ],
      commonMistakes: [
        'Mixing tabs and spaces for indentation (TabError).',
        'Confusing assignment (=) with equality comparison (==).',
        'Using "is" to compare strings or numbers instead of "==".',
      ],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Variables & Memory Binding',
          explanation:
            'Variables in Python are name tags bound to objects in heap memory. Assigning b = a points b to the exact same object as a.',
          codeSnippet: 'x = 10\ny = x  # y points to the int 10 object',
        },
        {
          stepNumber: 2,
          title: 'The 7 Operator Categories',
          explanation:
            'Arithmetic (+,-,*,/,//,%,**), Comparison (==,!=,<,>), Logical (and, or, not), Assignment (+=), Identity (is), Membership (in), and Bitwise (&,|,^,~,<<,>>).',
          codeSnippet: 'print(5 in [1, 2, 5])  # Membership\nprint(x is y)           # Identity',
        },
      ],
      concreteExample: {
        code: '# Type casting & operator precedence\nage_input = "25"\nage = int(age_input)\ncan_vote = age >= 18 and not age > 120\nprint(f"Eligible: {can_vote}")',
        explanation: 'Converts string input to int, then evaluates comparison (>=) before logical "not" and "and".',
        expectedOutput: 'Eligible: True',
      },
      practiceExercises: [
        {
          id: 'fund-ex1',
          title: 'Exercise 1: Temperature Converter',
          prompt: 'Write a program converting Celsius to Fahrenheit: F = (C * 9/5) + 32. Cast input string to float.',
          hint: 'Use float(input()) and format with f-string :.1f',
          starterCode: 'celsius = 25.0\n# calculate fahrenheit\n',
          solutionCode: 'celsius = 25.0\nfahrenheit = (celsius * 9/5) + 32\nprint(f"{celsius}°C is equal to {fahrenheit:.1f}°F")',
        },
        {
          id: 'fund-ex2',
          title: 'Exercise 2: Identity vs Equality',
          prompt: 'Create two lists with identical values [1, 2, 3]. Print the results of == and "is" to verify identity vs value.',
          hint: 'List literals create two distinct heap objects.',
          starterCode: 'a = [1, 2, 3]\nb = [1, 2, 3]\n# compare with == and is\n',
          solutionCode: 'a = [1, 2, 3]\nb = [1, 2, 3]\nprint(f"a == b: {a == b}") # True (values match)\nprint(f"a is b: {a is b}") # False (distinct memory addresses)',
        },
      ],
      practiceQuestion: {
        question: 'What is the output of: 10 + 2 * 3 ** 2 in Python?',
        options: ['28', '108', '144', '36'],
        correctIndex: 0,
        explanation: 'Exponentiation (3**2 = 9) has highest precedence, followed by multiplication (2*9 = 18), then addition (10+18 = 28).',
      },
      nextSuggestedLessons: [
        { id: 'sec-b', title: 'Section B: Control Flow', query: 'Python Control Flow' },
      ],
    },
    {
      id: 'node-sec-control-flow',
      title: 'B. CONTROL FLOW',
      shortExplanation:
        'Conditional branching (if/elif/else), loops (for, while), range(), loop controls (break, continue, pass), and nesting.',
      category: 'control',
      depth: 1,
      position: [2.1, 3.7, -1.2],
      size: 1.15,
      color: '#818cf8', // Indigo
      linkedMapTopic: 'Python Control Flow',
      beginnerExplanation:
        'Section B provides the decision-making and repetition machinery of code. If-statements allow programs to choose paths; loops repeat tasks automatically.',
      intermediateExplanation:
        'Covers short-circuit boolean evaluation, definite iteration over sequences via the iterator protocol, indefinite while-loops, loop else-clauses, and generator range().',
      advancedDetails:
        'range() in Python 3 is an immutable sequence type with O(1) membership testing and lazy evaluation. Loop else executes only when the loop terminates naturally without break.',
      whyItMatters:
        'Control flow turns static calculations into dynamic, reactive algorithms that handle arbitrary inputs, validation, and real-time streams.',
      practicalUseCases: [
        'User authentication and role-based access checks (if/elif/else)',
        'Batch processing 100,000 database records with pagination loops',
        'Implementing retry logic with exponential backoff in API clients',
      ],
      commonMistakes: [
        'Infinite while loops caused by forgetting to update the loop condition variable.',
        'Modifying a list while actively iterating over it with a for loop.',
        'Confusing break (exits entire loop) with continue (skips to next iteration).',
      ],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Conditional Branching',
          explanation:
            'Use if, elif, and else with boolean expressions. Python evaluates conditions top-down and executes only the first matching branch.',
          codeSnippet: 'if score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelse:\n    grade = "C"',
        },
        {
          stepNumber: 2,
          title: 'Definite vs Indefinite Iteration',
          explanation:
            'Use "for" when iterating over known collections or range(). Use "while" when repeating until an external event or condition changes.',
          codeSnippet: 'for i in range(3): print(i)\nwhile not connected(): wait()',
        },
      ],
      concreteExample: {
        code: '# Loop else construct: Search without flags\nnumbers = [11, 23, 35, 42, 57]\ntarget = 42\nfor n in numbers:\n    if n == target:\n        print(f"Found target: {n}")\n        break\nelse:\n    print("Target not found.")',
        explanation: 'The loop else clause runs only if no "break" statement is triggered during iteration.',
        expectedOutput: 'Found target: 42',
      },
      practiceExercises: [
        {
          id: 'cf-ex1',
          title: 'Exercise 1: FizzBuzz Implementation',
          prompt: 'Write FizzBuzz for numbers 1 to 20: print "Fizz" for multiples of 3, "Buzz" for 5, "FizzBuzz" for both, or the number.',
          hint: 'Check num % 15 == 0 first, or combine num % 3 == 0 and num % 5 == 0.',
          starterCode: 'for num in range(1, 21):\n    # your conditions here\n',
          solutionCode: 'for num in range(1, 21):\n    if num % 15 == 0:\n        print("FizzBuzz")\n    elif num % 3 == 0:\n        print("Fizz")\n    elif num % 5 == 0:\n        print("Buzz")\n    else:\n        print(num)',
        },
        {
          id: 'cf-ex2',
          title: 'Exercise 2: Prime Number Filter',
          prompt: 'Write a loop that checks if a number n is prime by testing divisors up to int(n**0.5) using for-else.',
          hint: 'If n % d == 0, break. If the loop completes without breaking, n is prime.',
          starterCode: 'n = 29\n# check if prime\n',
          solutionCode: 'n = 29\nfor d in range(2, int(n ** 0.5) + 1):\n    if n % d == 0:\n        print(f"{n} is composite")\n        break\nelse:\n    print(f"{n} is prime")',
        },
      ],
      practiceQuestion: {
        question: 'When does the "else" block attached to a Python "for" loop execute?',
        options: [
          'Only when the loop terminates naturally without encountering a break statement',
          'Whenever the loop terminates via a break statement',
          'On every single iteration of the loop',
          'Only if the iterable collection was empty',
        ],
        correctIndex: 0,
        explanation:
          'In Python, loop else blocks execute when the loop runs to exhaustion without being halted by a break statement.',
      },
      nextSuggestedLessons: [
        { id: 'sec-c', title: 'Section C: Data Structures', query: 'Python Data Structures' },
      ],
    },
    {
      id: 'node-sec-data-structures',
      title: 'C. DATA STRUCTURES',
      shortExplanation:
        'Strings, lists, tuples, sets, dictionaries, indexing, slicing, comprehensions, and mutability.',
      category: 'data',
      depth: 1,
      position: [-1.8, 3.8, 1.3],
      size: 1.15,
      color: '#34d399', // Emerald
      linkedMapTopic: 'Python Data Structures',
      beginnerExplanation:
        'Section C covers how Python groups data: ordered sequences (lists, tuples, strings) and key-based mappings (dictionaries, sets).',
      intermediateExplanation:
        'Analyzes mutability (lists/dicts/sets are mutable; tuples/strings are immutable), hash tables (O(1) dict/set lookups), list slicing [start:stop:step], and list/dict comprehensions.',
      advancedDetails:
        'Lists are dynamic arrays over-allocated in memory. Dictionaries use a compact hash table with collision resolution via open addressing and perturbation. Keys must implement __hash__ and __eq__.',
      whyItMatters:
        'Selecting the correct data structure determines algorithmic time and space complexity: searching a set is O(1), while searching an unsorted list is O(N).',
      practicalUseCases: [
        'Deduplicating millions of customer IDs instantly using sets',
        'Parsing JSON payloads into nested dictionaries and lists',
        'Transforming and filtering data efficiently with comprehensions',
      ],
      commonMistakes: [
        'Using mutable default arguments (like def func(data=[])) which persist across calls.',
        'Copying nested lists with list.copy() instead of copy.deepcopy().',
        'Using unhashable types (like lists or dicts) as dictionary keys.',
      ],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'The Core 4 Collections',
          explanation:
            'List: [1, 2] (ordered, mutable). Tuple: (1, 2) (ordered, immutable). Set: {1, 2} (unique, unordered). Dict: {"a": 1} (key-value mapping).',
          codeSnippet: 'my_list = [1, 2, 2]\nmy_set = set(my_list) # {1, 2}',
        },
        {
          stepNumber: 2,
          title: 'List & Dict Comprehensions',
          explanation:
            'Concise, Pythonic syntax for creating transformed collections: [expr for item in iterable if condition].',
          codeSnippet: 'squares = [x**2 for x in range(10) if x % 2 == 0]',
        },
      ],
      concreteExample: {
        code: '# Dictionary comprehension & frequency counting\nwords = ["apple", "banana", "apple", "cherry", "banana", "apple"]\ncounts = {w: words.count(w) for w in set(words)}\nprint(counts)',
        explanation: 'Uses a set to find unique words, then builds a frequency map in a single readable line.',
        expectedOutput: "{'apple': 3, 'banana': 2, 'cherry': 1}",
      },
      practiceExercises: [
        {
          id: 'ds-ex1',
          title: 'Exercise 1: Palindrome Slicer',
          prompt: 'Write a function checking if a string is a palindrome, ignoring case and spaces, using slice notation [::-1].',
          hint: 'Clean with text.lower().replace(" ", "") then compare with [::-1].',
          starterCode: 'text = "Race Car"\n# check if palindrome\n',
          solutionCode: 'text = "Race Car"\ncleaned = text.lower().replace(" ", "")\nis_palindrome = cleaned == cleaned[::-1]\nprint(f"Is palindrome: {is_palindrome}")',
        },
        {
          id: 'ds-ex2',
          title: 'Exercise 2: Set Operations',
          prompt: 'Find common skills between two developer candidate profiles using set intersection (&).',
          hint: 'Use set_a & set_b or set_a.intersection(set_b).',
          starterCode: 'dev_a = {"Python", "SQL", "Docker"}\ndev_b = {"Python", "AWS", "SQL"}\n# find intersection\n',
          solutionCode: 'dev_a = {"Python", "SQL", "Docker"}\ndev_b = {"Python", "AWS", "SQL"}\nshared = dev_a & dev_b\nprint(f"Shared skills: {shared}")',
        },
      ],
      practiceQuestion: {
        question: 'Which of the following can be used as a key in a Python dictionary?',
        options: [
          '("user", 101) — an immutable tuple of strings and ints',
          '["user", 101] — a mutable list',
          '{"id": 101} — a mutable dictionary',
          '{"admin", "editor"} — a mutable set',
        ],
        correctIndex: 0,
        explanation:
          'Dictionary keys must be hashable and immutable. Tuples containing only immutable elements are hashable, whereas lists, dicts, and sets are mutable and unhashable.',
      },
      nextSuggestedLessons: [
        { id: 'sec-d', title: 'Section D: Functions and Modules', query: 'Python Functions and Modules' },
      ],
    },
    {
      id: 'node-sec-functions-modules',
      title: 'D. FUNCTIONS & MODULES',
      shortExplanation:
        'def, parameters, return values, *args, **kwargs, LEGB scope, recursion, lambdas, imports, and pip.',
      category: 'syntax',
      depth: 1,
      position: [-4.2, 1.2, -0.6],
      size: 1.15,
      color: '#c084fc', // Purple
      linkedMapTopic: 'Python Functions and Modules',
      beginnerExplanation:
        'Section D teaches how to package reusable logic into functions using `def`, pass inputs as arguments, return outputs, and import external modules.',
      intermediateExplanation:
        'Covers positional vs keyword arguments, variable-length *args and **kwargs, the LEGB scope hierarchy, recursive call stacks, anonymous lambda expressions, and modular imports.',
      advancedDetails:
        'Functions in Python are first-class objects with attributes (__name__, __doc__, __code__, __closure__). Modules are cached in sys.modules upon first import.',
      whyItMatters:
        'Functions embody DRY (Don’t Repeat Yourself) design. Modular packaging allows teams to scale codebases across hundreds of microservices and dependencies.',
      practicalUseCases: [
        'Creating reusable business logic components and validation utilities',
        'Composing higher-order functions with map(), filter(), and sorted()',
        'Installing external packages from PyPI using pip (e.g., requests, numpy)',
      ],
      commonMistakes: [
        'Confusing print() (terminal output) with return (sending data back to caller).',
        'Forgetting the base case in a recursive function, causing RecursionError (stack overflow).',
        'Creating circular imports between two mutually dependent modules.',
      ],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Function Definition & Return',
          explanation:
            'Use "def" keyword, parentheses for parameters, and "return" to hand results back to caller.',
          codeSnippet: 'def add(a: int, b: int) -> int:\n    return a + b',
        },
        {
          stepNumber: 2,
          title: '*args and **kwargs Unpacking',
          explanation:
            '*args collects excess positional arguments into a tuple. **kwargs collects excess keyword arguments into a dictionary.',
          codeSnippet: 'def log_event(name, *tags, **metadata):\n    print(name, tags, metadata)',
        },
      ],
      concreteExample: {
        code: '# Higher-order function with lambda\nproducts = [\n    {"name": "Laptop", "price": 1200},\n    {"name": "Mouse", "price": 25},\n    {"name": "Monitor", "price": 300},\n]\nsorted_products = sorted(products, key=lambda p: p["price"])\nprint([p["name"] for p in sorted_products])',
        explanation: 'Passes a lambda function as the sort key to extract the price attribute for comparison.',
        expectedOutput: "['Mouse', 'Monitor', 'Laptop']",
      },
      practiceExercises: [
        {
          id: 'fn-ex1',
          title: 'Exercise 1: Flexible Statistics Calculator',
          prompt: 'Write a function calculate_stats(*numbers) that returns a dictionary with {"min": ..., "max": ..., "avg": ...}. Handle empty input safely.',
          hint: 'Check if not numbers return None. Use sum(numbers) / len(numbers).',
          starterCode: 'def calculate_stats(*numbers):\n    pass\n',
          solutionCode: 'def calculate_stats(*numbers):\n    if not numbers:\n        return None\n    return {\n        "min": min(numbers),\n        "max": max(numbers),\n        "avg": sum(numbers) / len(numbers)\n    }\nprint(calculate_stats(10, 20, 30, 40))',
        },
        {
          id: 'fn-ex2',
          title: 'Exercise 2: Recursive Factorial with Guard',
          prompt: 'Write factorial(n) using recursion. Raise ValueError if n < 0, and return 1 if n == 0.',
          hint: 'Base case: n == 0 -> 1. Recursive case: n * factorial(n - 1).',
          starterCode: 'def factorial(n):\n    pass\n',
          solutionCode: 'def factorial(n):\n    if n < 0:\n        raise ValueError("n must be non-negative")\n    if n == 0:\n        return 1\n    return n * factorial(n - 1)\nprint(factorial(5)) # 120',
        },
      ],
      practiceQuestion: {
        question: 'What happens if a Python function does not include an explicit return statement?',
        options: [
          'It automatically returns None',
          'It throws a CompileError at runtime',
          'It returns 0 by default',
          'It halts execution and terminates the script',
        ],
        correctIndex: 0,
        explanation:
          'In Python, any function that finishes execution without hitting an explicit return statement implicitly returns the singleton None.',
      },
      nextSuggestedLessons: [
        { id: 'sec-e', title: 'Section E: Error Handling and Files', query: 'Python Error Handling and Files' },
      ],
    },
    {
      id: 'node-sec-errors-files',
      title: 'E. ERRORS & FILES',
      shortExplanation:
        'Syntax vs runtime errors, try/except/else/finally, custom exceptions, file I/O, pathlib, and JSON.',
      category: 'application',
      depth: 1,
      position: [-3.3, -2.5, 1.4],
      size: 1.15,
      color: '#f43f5e', // Rose
      linkedMapTopic: 'Python Error Handling and Files',
      beginnerExplanation:
        'Section E teaches how to defend against crashes using `try...except`, read and write files on disk safely with `with open()`, and parse structured JSON data.',
      intermediateExplanation:
        'Covers the exception hierarchy (BaseException -> Exception), exception chaining (raise ... from ...), context managers ensuring resource cleanup, pathlib modern file paths, and json.dump()/load().',
      advancedDetails:
        'The "with" statement invokes __enter__ and __exit__ on context managers, guaranteeing file descriptor release even when uncaught exceptions occur. Traceback objects can be inspected with sys.exc_info().',
      whyItMatters:
        'Production software must never crash on bad user inputs or missing files. Defensive error handling and safe file I/O ensure system stability and data integrity.',
      practicalUseCases: [
        'Safely loading configuration settings from config.json',
        'Writing audit log events to disk files with timestamps',
        'Validating API inputs and returning clean HTTP 400 error messages',
      ],
      commonMistakes: [
        'Using bare except: which catches KeyboardInterrupt and SystemExit, preventing script termination.',
        'Opening files without the "with" context manager, risking file lock leaks.',
        'Forgetting to specify encoding="utf-8" when working with cross-platform text files.',
      ],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'The try-except-else-finally Architecture',
          explanation:
            'try (risky code) -> except (handle specific error) -> else (runs only if NO error) -> finally (always runs for cleanup).',
          codeSnippet: 'try:\n    val = int("123")\nexcept ValueError:\n    print("Invalid")\nelse:\n    print("Success")\nfinally:\n    cleanup()',
        },
        {
          stepNumber: 2,
          title: 'Safe File I/O with Context Managers',
          explanation:
            'Always use "with open(...) as f:" so the operating system automatically closes the file descriptor when done.',
          codeSnippet: 'with open("data.txt", "w", encoding="utf-8") as f:\n    f.write("Hello File")',
        },
      ],
      concreteExample: {
        code: 'import json\n# Safe JSON serialization and file write\nuser_data = {"username": "ada_lovelace", "verified": True, "score": 98}\njson_str = json.dumps(user_data, indent=2)\nparsed_data = json.loads(json_str)\nprint(f"User: {parsed_data[\'username\']}, Score: {parsed_data[\'score\']}")',
        explanation: 'Serializes a Python dictionary to a formatted JSON string and deserializes it safely back into native types.',
        expectedOutput: 'User: ada_lovelace, Score: 98',
      },
      practiceExercises: [
        {
          id: 'ef-ex1',
          title: 'Exercise 1: Safe Integer Parser',
          prompt: 'Write a function safe_divide(a, b) that catches ZeroDivisionError and TypeError, returning None with a logged message.',
          hint: 'Use except (ZeroDivisionError, TypeError) as e: or multiple except blocks.',
          starterCode: 'def safe_divide(a, b):\n    pass\n',
          solutionCode: 'def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        print("Cannot divide by zero")\n        return None\n    except TypeError:\n        print("Both arguments must be numbers")\n        return None\nprint(safe_divide(10, 0))',
        },
        {
          id: 'ef-ex2',
          title: 'Exercise 2: JSON Config Loader',
          prompt: 'Write a function that parses a JSON configuration string. If invalid JSON, catch json.JSONDecodeError and return a default configuration.',
          hint: 'import json, try json.loads(config_str), except json.JSONDecodeError.',
          starterCode: 'import json\ndef load_config(raw_json):\n    pass\n',
          solutionCode: 'import json\ndef load_config(raw_json):\n    try:\n        return json.loads(raw_json)\n    except json.JSONDecodeError:\n        return {"status": "default", "theme": "dark"}\nprint(load_config("invalid-json{"))',
        },
      ],
      practiceQuestion: {
        question: 'Why should you always open files using "with open(...) as file:" in Python?',
        options: [
          'It guarantees the file will be closed automatically even if an exception is raised inside the block',
          'It encrypts the file on disk using AES-256 automatically',
          'It increases hard drive read speed by 500%',
          'It makes Python run without requiring an interpreter',
        ],
        correctIndex: 0,
        explanation:
          'The "with" statement implements a context manager that automatically executes __exit__, ensuring the file descriptor is released even if errors crash the inner block.',
      },
      nextSuggestedLessons: [
        { id: 'sec-f', title: 'Section F: Object-Oriented Programming', query: 'Python OOP' },
      ],
    },
    {
      id: 'node-sec-oop',
      title: 'F. OBJECT-ORIENTED (OOP)',
      shortExplanation:
        'Classes, objects, constructors (__init__), self, inheritance, polymorphism, encapsulation, and magic methods.',
      category: 'foundation',
      depth: 1,
      position: [0.5, -4.1, -1.5],
      size: 1.15,
      color: '#38bdf8',
      linkedMapTopic: 'Python OOP',
      beginnerExplanation:
        'Section F teaches how to model real-world concepts into code using classes (blueprints) and objects (instances with state and behavior).',
      intermediateExplanation:
        'Covers instance attributes vs class attributes, method resolution order (MRO / C3 linearization), single and multiple inheritance, property getters/setters, and dunder magic methods (__str__, __repr__, __len__, __eq__).',
      advancedDetails:
        'All Python classes inherit from object. Classes are themselves instances of the metaclass type. Slotting (__slots__) optimizes memory by removing the per-instance __dict__.',
      whyItMatters:
        'OOP is standard in enterprise software architectures, game development, GUI frameworks, and domain-driven design.',
      practicalUseCases: [
        'Modeling database entities with ORMs (SQLAlchemy, Django ORM)',
        'Building UI components and game actors with stateful behavior',
        'Creating custom collection types adhering to Python protocols',
      ],
      commonMistakes: [
        'Forgetting "self" as the first parameter of instance methods.',
        'Accidentally sharing mutable class attributes across all instances.',
        'Overcomplicating designs with deep inheritance trees instead of composition.',
      ],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Class Blueprint & Constructor',
          explanation:
            'A class defines attributes and methods. __init__ initializes per-instance state, bound via "self".',
          codeSnippet: 'class Car:\n    def __init__(self, brand: str):\n        self.brand = brand',
        },
        {
          stepNumber: 2,
          title: 'Inheritance & super()',
          explanation:
            'Child classes inherit attributes and methods from parents. Use super().__init__() to call the parent constructor.',
          codeSnippet: 'class ElectricCar(Car):\n    def __init__(self, brand, battery_kwh):\n        super().__init__(brand)\n        self.battery_kwh = battery_kwh',
        },
      ],
      concreteExample: {
        code: 'class BankAccount:\n    def __init__(self, owner: str, balance: float = 0.0):\n        self.owner = owner\n        self._balance = balance  # Protected attribute\n\n    def deposit(self, amount: float):\n        if amount <= 0: raise ValueError("Must deposit positive amount")\n        self._balance += amount\n\n    def __repr__(self):\n        return f"BankAccount(owner={self.owner!r}, balance={self._balance:.2f})"\n\nacct = BankAccount("Ada", 100.0)\nacct.deposit(50.0)\nprint(acct)',
        explanation: 'Demonstrates encapsulation with protected _balance, validation methods, and the __repr__ dunder method.',
        expectedOutput: "BankAccount(owner='Ada', balance=150.00)",
      },
      practiceExercises: [
        {
          id: 'oop-ex1',
          title: 'Exercise 1: Circle Class with Properties',
          prompt: 'Create a Circle class with radius. Implement area and perimeter as @property getters.',
          hint: 'import math. Area = math.pi * r**2. Perimeter = 2 * math.pi * r.',
          starterCode: 'import math\nclass Circle:\n    def __init__(self, radius):\n        self.radius = radius\n',
          solutionCode: 'import math\nclass Circle:\n    def __init__(self, radius):\n        self.radius = radius\n    @property\n    def area(self):\n        return math.pi * (self.radius ** 2)\n    @property\n    def perimeter(self):\n        return 2 * math.pi * self.radius\nc = Circle(5)\nprint(f"Area: {c.area:.2f}, Perimeter: {c.perimeter:.2f}")',
        },
        {
          id: 'oop-ex2',
          title: 'Exercise 2: Custom Vector with Dunder Methods',
          prompt: 'Create Vector2D(x, y). Implement __add__ so v1 + v2 returns a new Vector2D with summed coordinates, and __str__ for display.',
          hint: 'def __add__(self, other): return Vector2D(self.x + other.x, self.y + other.y)',
          starterCode: 'class Vector2D:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n',
          solutionCode: 'class Vector2D:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    def __add__(self, other):\n        return Vector2D(self.x + other.x, self.y + other.y)\n    def __str__(self):\n        return f"({self.x}, {self.y})"\nv1 = Vector2D(2, 3)\nv2 = Vector2D(4, 5)\nprint(f"Sum: {v1 + v2}")',
        },
      ],
      practiceQuestion: {
        question: 'What is the role of the "self" parameter in Python class methods?',
        options: [
          'It represents the specific instance of the class on which the method is called',
          'It is a special keyword that imports global variables into the class',
          'It prevents other threads from accessing the method',
          'It is required only when inheriting from multiple classes',
        ],
        correctIndex: 0,
        explanation:
          'When an instance method is called, Python automatically passes the instance itself as the first argument, customarily named "self".',
      },
      nextSuggestedLessons: [
        { id: 'sec-g', title: 'Section G: Intermediate and Advanced Python', query: 'Advanced Python' },
      ],
    },
    {
      id: 'node-sec-advanced',
      title: 'G. ADVANCED PYTHON',
      shortExplanation:
        'Iterators, generators, decorators (@), context managers, type hints, virtual environments, asyncio, and memory.',
      category: 'advanced',
      depth: 1,
      position: [3.4, -2.4, 1.2],
      size: 1.15,
      color: '#f59e0b', // Amber
      linkedMapTopic: 'Advanced Python',
      beginnerExplanation:
        'Section G introduces professional Python tools: generators that save gigabytes of RAM, decorators that wrap functions, and type hints for bug-free architectures.',
      intermediateExplanation:
        'Covers the iterator protocol (__iter__, __next__), yield vs return, functools.wraps decorators, custom context managers via contextlib.contextmanager, asyncio event loops, and type hints with typing/collections.abc.',
      advancedDetails:
        'Generators create stackless coroutines pausing at yield. Decorators leverage closures preserving function metadata. asyncio uses cooperative multitasking over a single-threaded selector event loop.',
      whyItMatters:
        'Advanced Python patterns allow scaling applications to handle millions of streaming events, high-throughput network servers, and clean production codebases.',
      practicalUseCases: [
        'Streaming multi-gigabyte log files without exhausting server RAM',
        'Authentication and timing execution benchmarks using custom decorators',
        'Concurrent network requests using asyncio and aiohttp',
      ],
      commonMistakes: [
        'Attempting to reuse or re-iterate an exhausted generator object.',
        'Writing decorators without functools.wraps, losing function name and docstrings.',
        'Mixing blocking synchronous code inside asyncio async def coroutines.',
      ],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Generators & Lazy Evaluation',
          explanation:
            'Generators compute values on-demand using "yield" instead of loading entire sequences into memory at once.',
          codeSnippet: 'def count_up(limit):\n    n = 1\n    while n <= limit:\n        yield n\n        n += 1',
        },
        {
          stepNumber: 2,
          title: 'Function Decorators (@)',
          explanation:
            'Decorators wrap a function to extend or modify its behavior without modifying its internal source code.',
          codeSnippet: 'def timer(func):\n    def wrapper(*args, **kwargs):\n        # before\n        res = func(*args, **kwargs)\n        # after\n        return res\n    return wrapper',
        },
      ],
      concreteExample: {
        code: 'import time\nfrom functools import wraps\n\ndef benchmark(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        start = time.perf_counter()\n        result = func(*args, **kwargs)\n        elapsed = (time.perf_counter() - start) * 1000\n        print(f"[{func.__name__}] took {elapsed:.3f}ms")\n        return result\n    return wrapper\n\n@benchmark\ndef compute_sum(n):\n    return sum(range(n))\n\nprint("Total:", compute_sum(100_000))',
        explanation: 'A reusable timing decorator that measures and logs execution time with high precision.',
        expectedOutput: '[compute_sum] took 1.250ms\nTotal: 4999950000',
      },
      practiceExercises: [
        {
          id: 'adv-ex1',
          title: 'Exercise 1: Infinite Fibonacci Generator',
          prompt: 'Write a generator fibonacci_stream() that yields Fibonacci numbers infinitely. Use it with islice or a loop to take the first 8 numbers.',
          hint: 'a, b = 0, 1; while True: yield a; a, b = b, a + b.',
          starterCode: 'def fibonacci_stream():\n    pass\n',
          solutionCode: 'def fibonacci_stream():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\ngen = fibonacci_stream()\nfirst_8 = [next(gen) for _ in range(8)]\nprint(f"Fibonacci: {first_8}")',
        },
        {
          id: 'adv-ex2',
          title: 'Exercise 2: Type-Hinted Generic Pipeline',
          prompt: 'Write a type-annotated function filter_items(items: list[int], threshold: int) -> list[int] using modern Python 3.9+ type hints.',
          hint: 'Use list[int] directly as parameter and return annotations.',
          starterCode: 'def filter_items(items, threshold):\n    pass\n',
          solutionCode: 'def filter_items(items: list[int], threshold: int) -> list[int]:\n    return [x for x in items if x > threshold]\nprint(filter_items([5, 12, 3, 19, 8], 10))',
        },
      ],
      practiceQuestion: {
        question: 'What is the primary memory advantage of a generator over a standard Python list?',
        options: [
          'Generators yield elements lazily one at a time, consuming O(1) memory regardless of stream size',
          'Generators automatically compress values using gzip algorithms',
          'Generators bypass CPU cache memory and execute in RAM',
          'Generators convert all numbers to 8-bit integers',
        ],
        correctIndex: 0,
        explanation:
          'Because generators yield items on demand instead of allocating space for the complete collection upfront, memory consumption remains constant (O(1)).',
      },
      nextSuggestedLessons: [
        { id: 'sec-h', title: 'Section H: Practical Python Projects', query: 'Practical Python Projects' },
      ],
    },
    {
      id: 'node-sec-practical',
      title: 'H. PRACTICAL PROJECTS',
      shortExplanation:
        'End-to-end real projects: Number Guessing, Calculator, Quiz App, File Organizer, API Clients, Data Analysis, and Automation.',
      category: 'application',
      depth: 1,
      position: [0.2, 0.4, 4.3],
      size: 1.15,
      color: '#ec4899', // Pink
      linkedMapTopic: 'Practical Python Projects',
      beginnerExplanation:
        'Section H synthesizes all prior concepts into real-world applications: interactive games, tools, automation scripts, and data analyzers.',
      intermediateExplanation:
        'Walks through 8 production-style projects combining loops, error handling, file systems (pathlib/shutil), networking (urllib/requests), and data pipelines.',
      advancedDetails:
        'Covers modular project architecture: separation of concerns, CLI argument parsing with argparse, unit testing with pytest, and safe cryptographic hashing with hashlib.',
      whyItMatters:
        'Coding isolated syntax exercises is not enough; building complete projects develops architectural intuition and portfolio-ready software engineering skills.',
      practicalUseCases: [
        'Automated directory sorting by file extension and MIME type',
        'Command-line multi-operation financial calculator with history',
        'Data extraction, cleanup, and statistical reporting pipeline',
      ],
      commonMistakes: [
        'Writing all project code in one massive 500-line function without modular abstraction.',
        'Hardcoding file paths (e.g., "C:\\Users\\...") that break on macOS/Linux.',
        'Failing to handle network timeouts or bad status codes in API integrations.',
      ],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Project Architecture: Separation of Concerns',
          explanation:
            'Split projects into: Data Models -> Business Logic -> User Interface (CLI/Web) -> Storage/IO.',
        },
        {
          stepNumber: 2,
          title: 'The 8 Project Blueprints',
          explanation:
            '1. Number Guessing Game. 2. Scientific Calculator. 3. Interactive Quiz Engine. 4. Automated File Organizer. 5. REST API Client. 6. Data Analysis Pipeline. 7. OS Automation Script. 8. File Hash Integrity Auditor.',
        },
      ],
      concreteExample: {
        code: '# Practical Project: File Integrity Hasher\nimport hashlib\n\ndef compute_sha256(content: bytes) -> str:\n    hasher = hashlib.sha256()\n    hasher.update(content)\n    return hasher.hexdigest()\n\npayload = b"Python Master Architecture 2026"\nprint(f"SHA-256 Digest: {compute_sha256(payload)[:16]}...")',
        explanation: 'Demonstrates a safe, legal cybersecurity utility for verifying digital data integrity using cryptographic hashing.',
        expectedOutput: 'SHA-256 Digest: a1b2c3d4e5f6... (valid hash digest)',
      },
      practiceExercises: [
        {
          id: 'proj-ex1',
          title: 'Exercise 1: Number Guessing Game Logic',
          prompt: 'Write evaluate_guess(target: int, guess: int) returning "Too High", "Too Low", or "Correct!".',
          hint: 'Use if guess > target, elif guess < target, else.',
          starterCode: 'def evaluate_guess(target: int, guess: int) -> str:\n    pass\n',
          solutionCode: 'def evaluate_guess(target: int, guess: int) -> str:\n    if guess > target:\n        return "Too High"\n    elif guess < target:\n        return "Too Low"\n    return "Correct!"\nprint(evaluate_guess(42, 30))\nprint(evaluate_guess(42, 42))',
        },
        {
          id: 'proj-ex2',
          title: 'Exercise 2: File Extension Categorizer',
          prompt: 'Write get_category(filename: str) mapping extensions like .py -> "Code", .jpg/.png -> "Images", .pdf -> "Documents", else "Other".',
          hint: 'Extract extension with filename.split(".")[-1].lower() or pathlib.Path(filename).suffix.',
          starterCode: 'def get_category(filename: str) -> str:\n    pass\n',
          solutionCode: 'def get_category(filename: str) -> str:\n    ext = filename.split(".")[-1].lower()\n    mappings = {\n        "py": "Code", "js": "Code",\n        "jpg": "Images", "png": "Images",\n        "pdf": "Documents", "txt": "Documents"\n    }\n    return mappings.get(ext, "Other")\nprint(get_category("script.py"))\nprint(get_category("report.pdf"))',
        },
      ],
      practiceQuestion: {
        question: 'Which standard Python module is recommended for constructing cross-platform file system paths?',
        options: [
          'pathlib (or os.path)',
          'string.format',
          'regex',
          'math',
        ],
        correctIndex: 0,
        explanation:
          'The pathlib module (introduced in Python 3.4) offers an object-oriented, cross-platform approach to manipulating filesystem paths across Windows, Linux, and macOS.',
      },
      nextSuggestedLessons: [
        { id: 'sec-a', title: 'Review: Section A Fundamentals', query: 'Python Fundamentals' },
      ],
    },
  ],
  edges: [
    {
      id: 'edge-py-a',
      source: 'node-py-root',
      target: 'node-sec-fundamentals',
      relationship: 'establishes',
      description: 'Foundational syntax, data types, and operators upon which all Python code is written.',
    },
    {
      id: 'edge-py-b',
      source: 'node-py-root',
      target: 'node-sec-control-flow',
      relationship: 'controls',
      description: 'Decision trees and loop structures governing program execution flow.',
    },
    {
      id: 'edge-py-c',
      source: 'node-py-root',
      target: 'node-sec-data-structures',
      relationship: 'structures',
      description: 'Memory collections, sequence indexing, hash tables, and comprehensions.',
    },
    {
      id: 'edge-py-d',
      source: 'node-py-root',
      target: 'node-sec-functions-modules',
      relationship: 'modularizes',
      description: 'Reusable function logic, variable scope boundaries, and package imports.',
    },
    {
      id: 'edge-py-e',
      source: 'node-py-root',
      target: 'node-sec-errors-files',
      relationship: 'secures',
      description: 'Defensive exception handling pipelines and robust persistent file I/O.',
    },
    {
      id: 'edge-py-f',
      source: 'node-py-root',
      target: 'node-sec-oop',
      relationship: 'architects',
      description: 'Object-oriented class modeling, inheritance, polymorphism, and dunder protocols.',
    },
    {
      id: 'edge-py-g',
      source: 'node-py-root',
      target: 'node-sec-advanced',
      relationship: 'optimizes',
      description: 'Generators, decorators, static typing, and asynchronous concurrency.',
    },
    {
      id: 'edge-py-h',
      source: 'node-py-root',
      target: 'node-sec-practical',
      relationship: 'deploys',
      description: 'Real-world software projects, automation tools, and security auditing utilities.',
    },
  ],
}
