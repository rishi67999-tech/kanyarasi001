import type { KnowledgeMap } from '../types/knowledge'

// 1. PYTHON DICTIONARIES
export const PYTHON_DICTS_MAP: KnowledgeMap = {
  id: 'map-python-dicts',
  topic: 'What is a dictionary in Python',
  title: 'Python Dictionaries & Hash Maps',
  description:
    'A 3D spatial exploration of Python dictionaries: key-value associations powered by hash tables with O(1) average lookup time.',
  centralNodeId: 'node-dict-root',
  createdAt: '2026-10-15T00:00:00Z',
  isDemo: true,
  demoNote: 'Curated reference curriculum for Python dictionaries',
  nodes: [
    {
      id: 'node-dict-root',
      title: 'DICTIONARIES (dict)',
      shortExplanation: 'Unordered (insertion-ordered in 3.7+), mutable collections of key-value pairs.',
      category: 'core',
      depth: 0,
      position: [0, 0, 0],
      size: 1.45,
      color: '#38bdf8',
      beginnerExplanation:
        'A real-world dictionary has words (keys) and definitions (values). In Python, you give it a key, and it instantly retrieves the matching value.',
      intermediateExplanation:
        'Keys must be hashable and immutable (strings, numbers, tuples). Values can be any Python object. Lookups, inserts, and deletes are O(1) average time.',
      advancedDetails:
        'CPython uses a compact hash table with a sparse hash indices array and a dense entries array, reducing memory overhead by ~30% since Python 3.6.',
      whyItMatters: 'Dictionaries are the primary data structure for structured records, JSON handling, and high-speed key-based lookups.',
      practicalUseCases: [
        'Storing user profile records (name, email, age).',
        'Parsing REST API JSON responses.',
        'Word frequency counters and caching memoization.',
      ],
      commonMistakes: [
        'Attempting to use a mutable list as a dictionary key (`TypeError: unhashable type: list`).',
        'Accessing missing keys with `d[k]` instead of `d.get(k, default)`.',
      ],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Creating Dictionaries',
          explanation: 'Use curly braces `{}` with `key: value` pairs.',
          codeSnippet: 'user = {"name": "Alice", "role": "Admin", "level": 5}',
        },
        {
          stepNumber: 2,
          title: 'Accessing and Mutating',
          explanation: 'Read using `user["name"]` or safely with `user.get("name")`.',
          codeSnippet: 'user["level"] += 1\nprint(user["level"]) # 6',
        },
      ],
      concreteExample: {
        code: 'user = {"name": "Ada", "lang": "Python"}\nuser["role"] = "Dev"\nprint(user.get("role"))',
        explanation: 'Creates a dictionary, adds a new key-value pair, and accesses it using `.get()`.',
        expectedOutput: 'Dev',
      },
      practiceQuestion: {
        question: 'Which of the following can be used as a key in a Python dictionary?',
        options: ['[1, 2, 3] (list)', '{"a": 1} (dict)', '"user_id" (str)', 'set([1, 2])'],
        correctIndex: 2,
        explanation: 'Dictionary keys must be hashable and immutable. Strings, numbers, and tuples are hashable; lists and dicts are not.',
      },
    },
    {
      id: 'node-dict-keys-values',
      title: 'KEYS & HASHABILITY',
      shortExplanation: 'How hash() computes bucket indexes for instant O(1) lookups.',
      category: 'foundation',
      depth: 1,
      position: [4.0, 1.8, 1.0],
      size: 0.95,
      color: '#60a5fa',
      beginnerExplanation: 'The computer calculates a mathematical fingerprint (hash) of the key so it knows the exact memory slot without searching through all items.',
      whyItMatters: 'Explains why dictionary lookups stay lightning-fast whether you have 10 items or 10,000,000 items.',
      commonMistakes: ['Trying to mutate a key in-place.'],
      lessonSteps: [
        { stepNumber: 1, title: 'Hash Function', explanation: 'hash(key) generates an integer bucket index.', codeSnippet: 'print(hash("admin"))' },
      ],
      practiceQuestion: {
        question: 'What is the average time complexity of looking up a key in a Python dictionary?',
        options: ['O(1) constant', 'O(N) linear', 'O(N^2)', 'O(log N)'],
        correctIndex: 0,
        explanation: 'Due to hash table indexing, dictionary lookups run in O(1) constant average time.',
      },
      prerequisiteIds: ['node-dict-root'],
    },
    {
      id: 'node-dict-methods',
      title: 'DICT METHODS & ITERATION',
      shortExplanation: '.keys(), .values(), .items(), and safe retrieval with .get().',
      category: 'syntax',
      depth: 1,
      position: [-4.0, 1.8, -1.0],
      size: 0.95,
      color: '#34d399',
      beginnerExplanation: 'You can loop over just the keys, just the values, or both at once using `.items()`.',
      whyItMatters: 'Essential for data transformation pipelines and serialization.',
      commonMistakes: ['Modifying dictionary keys while iterating directly over the dictionary.'],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Iterating Pairs',
          explanation: 'Use .items() to iterate through key-value pairs simultaneously.',
          codeSnippet: 'for k, v in user.items():\n    print(f"{k} -> {v}")',
        },
      ],
      practiceQuestion: {
        question: 'What happens if you run `d["missing"]` on dictionary `d` where "missing" is not a key?',
        options: ['It returns None', 'It returns 0', 'It raises a KeyError', 'It creates the key automatically'],
        correctIndex: 2,
        explanation: 'Square bracket lookup on a missing key raises KeyError. Use `d.get("missing", default)` to avoid exceptions.',
      },
      prerequisiteIds: ['node-dict-root'],
    },
  ],
  edges: [
    { id: 'ed1', source: 'node-dict-root', target: 'node-dict-keys-values', relationship: 'powered_by', description: 'Dictionaries rely on hashable keys for O(1) lookups.' },
    { id: 'ed2', source: 'node-dict-root', target: 'node-dict-methods', relationship: 'manipulated_by', description: 'Manipulated with items, keys, and values methods.' },
  ],
}

// 2. CLASSES AND OBJECTS
export const CLASSES_OBJECTS_MAP: KnowledgeMap = {
  id: 'map-classes-objects',
  topic: 'Explain classes and objects',
  title: 'Classes, Objects & Object-Oriented Architecture',
  description:
    'A 3D spatial map of Object-Oriented Programming (OOP) in Python: blueprints (classes), instances (objects), state (attributes), and behavior (methods).',
  centralNodeId: 'node-oop-root',
  createdAt: '2026-10-15T00:00:00Z',
  isDemo: true,
  demoNote: 'Curated reference curriculum for Classes & Objects',
  nodes: [
    {
      id: 'node-oop-root',
      title: 'CLASSES & OBJECTS',
      shortExplanation: 'Classes are blueprints defining attributes and methods; objects are concrete instances created from those blueprints.',
      category: 'core',
      depth: 0,
      position: [0, 0, 0],
      size: 1.45,
      color: '#38bdf8',
      beginnerExplanation:
        'A Class is like an architectural blueprint for a house. An Object is the actual house built from that blueprint. You can build 50 houses from one blueprint!',
      intermediateExplanation:
        'OOP bundles related state and functions into cohesive units. Objects manage their own internal state and communicate via method calls.',
      advancedDetails:
        'Classes in Python are themselves instances of type `type` (metaclasses). Methods bind to instances via the descriptor protocol.',
      whyItMatters: 'OOP helps model real-world domains, encapsulate complexity, and maintain large codebases.',
      practicalUseCases: [
        'Game entities: Player, Enemy, Weapon classes with health, coordinates, and attack methods.',
        'GUI frameworks: Window, Button, Canvas widgets.',
        'Database ORM models: User, Order, Payment tables mapped to Python classes.',
      ],
      commonMistakes: [
        'Forgetting `self` as the first parameter in instance methods.',
        'Confusing class attributes (shared by all instances) with instance attributes (unique to each instance).',
      ],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Declaring a Class',
          explanation: 'Use the `class` keyword followed by `__init__` constructor.',
          codeSnippet: 'class Car:\n    def __init__(self, make, model):\n        self.make = make\n        self.model = model',
        },
        {
          stepNumber: 2,
          title: 'Instantiating an Object',
          explanation: 'Call the class like a function to create a new instance.',
          codeSnippet: 'my_car = Car("Tesla", "Model 3")\nprint(my_car.make) # Tesla',
        },
      ],
      concreteExample: {
        code: 'class Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        return f"{self.name} says Woof!"\n\npet = Dog("Rex")\nprint(pet.bark())',
        explanation: 'Defines Dog with an attribute name and method bark, instantiates Rex, and barks.',
        expectedOutput: 'Rex says Woof!',
      },
      practiceQuestion: {
        question: 'What is the relationship between a class and an object in Python?',
        options: [
          'A class is a single instance; an object is the blueprint',
          'A class is the blueprint; an object is a concrete instance of that class',
          'They are synonyms with identical meaning',
          'Classes can only store numbers',
        ],
        correctIndex: 1,
        explanation: 'A class is the blueprint/template; an object is the concrete instance allocated in memory.',
      },
    },
    {
      id: 'node-oop-self-init',
      title: '__INIT__ & SELF',
      shortExplanation: 'The initializer method and explicit reference to the current instance.',
      category: 'syntax',
      depth: 1,
      position: [4.0, 1.8, 1.0],
      size: 0.95,
      color: '#60a5fa',
      beginnerExplanation: '`__init__` runs automatically whenever a new object is born to set up its starting properties. `self` means "this specific object".',
      whyItMatters: 'Guarantees that every object begins in a valid, well-initialized state.',
      commonMistakes: ['Calling `__init__` manually instead of letting `Class()` call it.'],
      lessonSteps: [
        { stepNumber: 1, title: 'The self Parameter', explanation: 'Python passes the instance automatically as the first argument to instance methods.' },
      ],
      practiceQuestion: {
        question: 'What does the parameter `self` represent inside an instance method?',
        options: ['The Python interpreter', 'The specific object instance upon which the method was called', 'The parent class', 'A global variable'],
        correctIndex: 1,
        explanation: '`self` represents the particular instance whose attributes and methods are being accessed.',
      },
      prerequisiteIds: ['node-oop-root'],
    },
    {
      id: 'node-oop-inheritance',
      title: 'INHERITANCE & POLYMORPHISM',
      shortExplanation: 'Subclasses inherit attributes and methods from base classes, overriding or extending them with super().',
      category: 'advanced',
      depth: 1,
      position: [-4.0, 1.8, -1.0],
      size: 0.95,
      color: '#fbbf24',
      beginnerExplanation: 'A Child class inherits traits from a Parent class (like an ElectricCar inheriting wheels and doors from Car, but adding batteryCharging).',
      whyItMatters: 'Promotes code reuse and establishes polymorphic object hierarchies.',
      commonMistakes: ['Creating excessively deep inheritance trees (prefer composition over inheritance).'],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Inheriting with super()',
          explanation: 'Call super().__init__() to invoke parent constructor initialization.',
          codeSnippet: 'class ElectricCar(Car):\n    def __init__(self, make, model, battery):\n        super().__init__(make, model)\n        self.battery = battery',
        },
      ],
      practiceQuestion: {
        question: 'How do you call a method from the parent class inside a child class override?',
        options: ['parent().method()', 'super().method()', 'this.method()', 'base.method()'],
        correctIndex: 1,
        explanation: '`super()` delegates method calls to the parent/superclass in the Method Resolution Order (MRO).',
      },
      prerequisiteIds: ['node-oop-root'],
    },
  ],
  edges: [
    { id: 'eo1', source: 'node-oop-root', target: 'node-oop-self-init', relationship: 'initialized_by', description: 'Instances are initialized by the __init__ constructor using self.' },
    { id: 'eo2', source: 'node-oop-root', target: 'node-oop-inheritance', relationship: 'extended_by', description: 'Classes can be subclassed through inheritance.' },
  ],
}

// 3. HTML FLEXBOX
export const HTML_FLEXBOX_MAP: KnowledgeMap = {
  id: 'map-html-flexbox',
  topic: 'Explain HTML flexbox',
  title: 'CSS Flexbox 1D Layout System',
  description:
    'A 3D spatial decomposition of CSS Flexible Box Layout: axes, alignment, justification, and dynamic item sizing.',
  centralNodeId: 'node-flex-root',
  createdAt: '2026-10-15T00:00:00Z',
  isDemo: true,
  demoNote: 'Curated reference curriculum for CSS Flexbox',
  nodes: [
    {
      id: 'node-flex-root',
      title: 'FLEXBOX',
      shortExplanation: 'A one-dimensional CSS layout model designed for distributing space and aligning items across rows or columns.',
      category: 'core',
      depth: 0,
      position: [0, 0, 0],
      size: 1.45,
      color: '#38bdf8',
      beginnerExplanation:
        'Flexbox is like an elastic shelf. You put boxes on it, and you can tell it: "spread them evenly", "pack them to the left", or "center them vertically".',
      intermediateExplanation:
        'Activated with `display: flex`. Establishes a flex container and transforms immediate children into flex items governed by main and cross axes.',
      advancedDetails:
        'The flex layout algorithm computes available free space, applies flex-grow, flex-shrink, and flex-basis, and resolves line breaking.',
      whyItMatters: 'Flexbox solved decades of CSS alignment nightmares, making centering elements trivial (`justify-content: center; align-items: center`).',
      practicalUseCases: [
        'Navigation bars with logo on the left and links on the right.',
        'Centering a card both vertically and horizontally on a webpage.',
        'Responsive toolbars that wrap items as screen sizes change.',
      ],
      commonMistakes: [
        'Confusing `justify-content` (main axis) with `align-items` (cross axis).',
        'Trying to use flexbox for full 2D page layouts instead of CSS Grid.',
      ],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Activating Flexbox',
          explanation: 'Set `display: flex` on the parent container element.',
          codeSnippet: '.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}',
        },
      ],
      concreteExample: {
        code: '<div style="display: flex; justify-content: center; align-items: center; height: 100vh;">\n  <div>Perfect Center!</div>\n</div>',
        explanation: 'Centers the child element both horizontally and vertically inside the viewport.',
        expectedOutput: 'Child div rendered exactly in the screen center.',
      },
      practiceQuestion: {
        question: 'Which property aligns flex items along the MAIN axis?',
        options: ['align-items', 'justify-content', 'flex-direction', 'align-content'],
        correctIndex: 1,
        explanation: '`justify-content` aligns items along the main axis; `align-items` aligns along the cross axis.',
      },
    },
    {
      id: 'node-flex-axes',
      title: 'MAIN VS CROSS AXES',
      shortExplanation: 'flex-direction determines the primary flow: row (horizontal) or column (vertical).',
      category: 'foundation',
      depth: 1,
      position: [4.0, 1.8, 1.0],
      size: 0.95,
      color: '#60a5fa',
      beginnerExplanation: 'When flex-direction is row, main axis is left-to-right. When column, main axis becomes top-to-bottom!',
      whyItMatters: 'Every alignment property depends on knowing which axis is the main axis.',
      commonMistakes: ['Thinking main axis is always horizontal.'],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Direction Switching',
          explanation: 'Toggle flex-direction between row and column to orient the main axis.',
          codeSnippet: 'flex-direction: row; /* default */\nflex-direction: column; /* vertical stack */',
        },
      ],
      practiceQuestion: {
        question: 'If `flex-direction: column` is set, which direction does the main axis run?',
        options: ['Left to right', 'Top to bottom (vertical)', 'Diagonally', 'Z-axis outward'],
        correctIndex: 1,
        explanation: 'With `flex-direction: column`, the main axis runs vertically from top to bottom.',
      },
      prerequisiteIds: ['node-flex-root'],
    },
    {
      id: 'node-flex-sizing',
      title: 'FLEX GROW, SHRINK & BASIS',
      shortExplanation: 'How items expand into free space or compress when crowded.',
      category: 'control',
      depth: 1,
      position: [-4.0, 1.8, -1.0],
      size: 0.95,
      color: '#34d399',
      beginnerExplanation: 'Flex-grow tells an item: "If there is empty room left over, stretch to fill it!"',
      whyItMatters: 'Enables fluid responsive interfaces that adapt smoothly without fixed pixel widths.',
      commonMistakes: ['Not knowing the shorthand `flex: 1` sets `flex-grow: 1; flex-shrink: 1; flex-basis: 0%`.'],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Flex Shorthand',
          explanation: 'The flex shorthand sets grow, shrink, and basis in a single declarative rule.',
          codeSnippet: '.sidebar { flex: 0 0 250px; }\n.content { flex: 1; } /* grows to fill remainder */',
        },
      ],
      practiceQuestion: {
        question: 'What does `flex-grow: 1` tell a flex child to do?',
        options: ['Double its font size', 'Absorb available remaining free space in the container', 'Become a grid container', 'Wrap to the next line'],
        correctIndex: 1,
        explanation: '`flex-grow` determines how much of the remaining free container space the item should absorb.',
      },
      prerequisiteIds: ['node-flex-root'],
    },
  ],
  edges: [
    { id: 'efx1', source: 'node-flex-root', target: 'node-flex-axes', relationship: 'oriented_by', description: 'Flexbox alignment is oriented by main and cross axes.' },
    { id: 'efx2', source: 'node-flex-root', target: 'node-flex-sizing', relationship: 'sized_by', description: 'Flex items resize dynamically via grow, shrink, and basis.' },
  ],
}

// 4. DATABASE INDEXES
export const DATABASE_INDEXES_MAP: KnowledgeMap = {
  id: 'map-db-indexes',
  topic: 'Explain database indexes',
  title: 'Database Indexes & B-Tree Optimization',
  description:
    'A 3D spatial decomposition of database indexes: auxiliary lookup trees, binary branching, table scans vs index scans, and write overhead.',
  centralNodeId: 'node-idx-root',
  createdAt: '2026-10-15T00:00:00Z',
  isDemo: true,
  demoNote: 'Curated reference curriculum for Database Indexes',
  nodes: [
    {
      id: 'node-idx-root',
      title: 'DATABASE INDEXES',
      shortExplanation: 'Auxiliary data structures (usually B-Trees) that accelerate data retrieval from database tables.',
      category: 'core',
      depth: 0,
      position: [0, 0, 0],
      size: 1.45,
      color: '#38bdf8',
      beginnerExplanation:
        'Think of the index at the back of a 1000-page textbook. Instead of reading every page from beginning to end to find "photosynthesis", you look it up in the index in 3 seconds.',
      intermediateExplanation:
        'Without an index, the database must execute a Full Table Scan (O(N)), checking every single row on disk. With an index, it traverses a B-Tree in O(log N) disk reads.',
      advancedDetails:
        'Indexes point to row IDs (heap pointers). While reading is orders of magnitude faster, writes (INSERT/UPDATE/DELETE) incur overhead because the B-Tree must be updated and rebalanced.',
      whyItMatters: 'Indexes are the single most impactful performance tuning tool in relational and NoSQL databases.',
      practicalUseCases: [
        'Looking up user accounts by email or username in under 1ms among 50 million users.',
        'Speeding up JOIN operations across foreign keys.',
        'Optimizing sorted ORDER BY queries.',
      ],
      commonMistakes: [
        'Indexing every single column, severely slowing down INSERT and UPDATE write throughput.',
        'Not realizing queries with `LIKE "%search"` cannot use standard B-Tree indexes because the prefix is wild.',
      ],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Creating an Index',
          explanation: 'Use the `CREATE INDEX` SQL command on frequently queried columns.',
          codeSnippet: 'CREATE INDEX idx_users_email ON users(email);',
        },
      ],
      concreteExample: {
        code: '-- Query without index: Full table scan (reads 10,000,000 rows)\n-- Query with index: B-tree scan (reads ~3-4 index blocks)\nSELECT * FROM users WHERE email = "alice@example.com";',
        explanation: 'Finds Alice in ~1 millisecond instead of scanning every table row on disk.',
        expectedOutput: 'Query executed in 0.8ms using Index Scan.',
      },
      practiceQuestion: {
        question: 'What is the primary trade-off of adding indexes to a database table?',
        options: [
          'Reads become slower, but writes become faster',
          'Reads become much faster, but writes (INSERT/UPDATE) become slower and disk usage increases',
          'Database passwords become unencrypted',
          'You can no longer use SQL SELECT statements',
        ],
        correctIndex: 1,
        explanation: 'Indexes speed up SELECT queries dramatically, but every write must also update the index structure, adding write overhead and consuming disk space.',
      },
    },
    {
      id: 'node-idx-btree',
      title: 'B-TREE STRUCTURE',
      shortExplanation: 'Self-balancing, multi-way search trees optimized for reading and writing large blocks of disk memory.',
      category: 'foundation',
      depth: 1,
      position: [4.0, 1.8, 1.0],
      size: 0.95,
      color: '#60a5fa',
      beginnerExplanation: 'A wide tree with multiple branches at each fork. Reaching any item takes only 3 to 4 steps even for billions of records.',
      whyItMatters: 'B-Trees minimize disk I/O operations, which are the slowest bottleneck in database engines.',
      commonMistakes: ['Thinking database indexes use binary search trees; B-Trees have hundreds of keys per node to match disk page sizes.'],
      lessonSteps: [
        { stepNumber: 1, title: 'Multi-Way Branching', explanation: 'Each tree node matches a disk block (e.g. 8KB), packing hundreds of keys per page.' },
      ],
      practiceQuestion: {
        question: 'Why do relational databases use B-Trees rather than simple Binary Search Trees for indexes?',
        options: [
          'B-Trees have higher branching factors, minimizing expensive disk block read operations',
          'Binary trees are illegal in SQL standards',
          'B-Trees only store numbers',
          'B-Trees eliminate the need for hard drives',
        ],
        correctIndex: 0,
        explanation: 'B-Trees store hundreds of keys per node, keeping the tree very shallow (3-4 levels) and minimizing disk I/O.',
      },
      prerequisiteIds: ['node-idx-root'],
    },
    {
      id: 'node-idx-scans',
      title: 'TABLE SCAN VS INDEX SCAN',
      shortExplanation: 'EXPLAIN analysis: sequential scan O(N) vs index search O(log N).',
      category: 'application',
      depth: 1,
      position: [-4.0, 1.8, -1.0],
      size: 0.95,
      color: '#34d399',
      beginnerExplanation: 'Table scan = looking through every receipt in a shoe box. Index scan = flipping to the exact folder labeled with the date.',
      whyItMatters: 'Using EXPLAIN to verify that queries use index scans is standard database engineering.',
      commonMistakes: ['Assuming the database will always use an index; if the table has only 10 rows, a table scan is faster and chosen by the query planner.'],
      lessonSteps: [
        {
          stepNumber: 1,
          title: 'Using EXPLAIN',
          explanation: 'EXPLAIN shows the query planner execution strategy and index usage.',
          codeSnippet: 'EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 42;',
        },
      ],
      practiceQuestion: {
        question: 'Which SQL command displays whether a query is using an index scan or a full table scan?',
        options: ['SHOW TABLES', 'EXPLAIN', 'ALTER TABLE', 'VACUUM'],
        correctIndex: 1,
        explanation: '`EXPLAIN` (or `EXPLAIN ANALYZE`) shows the execution plan chosen by the query planner.',
      },
      prerequisiteIds: ['node-idx-root'],
    },
  ],
  edges: [
    { id: 'eidx1', source: 'node-idx-root', target: 'node-idx-btree', relationship: 'structured_as', description: 'Indexes are structured as balanced B-Trees.' },
    { id: 'eidx2', source: 'node-idx-root', target: 'node-idx-scans', relationship: 'optimizes_away', description: 'Indexes replace sequential table scans with index lookups.' },
  ],
}
