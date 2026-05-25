const mongoose = require('mongoose');
require('dotenv').config();

const QuizQuestion = require('../models/QuizQuestion');
const Instructor = require('../models/Instructor');

async function run() {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lms';
  console.log('Connecting to database...');
  await mongoose.connect(mongoURI, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000
  });
  console.log('Database connected!');

  try {
    // Find an instructor and their tenant
    const instructor = await Instructor.findOne();
    if (!instructor) {
      console.log('No instructor found. Please create one first.');
      process.exit(1);
    }

    // Get tenant from assignedTenants array, or fallback to Tenant collection
    let tenantId = instructor.assignedTenants && instructor.assignedTenants.length > 0
      ? instructor.assignedTenants[0]
      : null;

    if (!tenantId) {
      const Tenant = mongoose.model('Tenant') || require('../models/Tenant');
      const tenant = await Tenant.findOne();
      tenantId = tenant?._id;
    }

    if (!tenantId) {
      console.log('No tenant found. Please create one first.');
      process.exit(1);
    }

    const createdById = instructor._id;

    console.log(`Using Instructor: ${instructor.name}, Tenant: ${tenantId}`);

    const questions = [
      // ===== LIST =====
      {
        title: 'Which interface does ArrayList implement in Java?',
        options: [
          { text: 'Set', image: '' },
          { text: 'List', image: '' },
          { text: 'Map', image: '' },
          { text: 'Queue', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Java Collections - List',
        tags: ['java', 'collections', 'list', 'arraylist'],
        difficulty: 'easy',
        language: 'java'
      },
      {
        title: 'What is the default initial capacity of an ArrayList in Java?',
        options: [
          { text: '5', image: '' },
          { text: '10', image: '' },
          { text: '16', image: '' },
          { text: '0', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Java Collections - List',
        tags: ['java', 'collections', 'arraylist', 'capacity'],
        difficulty: 'medium',
        language: 'java'
      },
      {
        title: 'Which of the following is true about LinkedList in Java?',
        options: [
          { text: 'It implements only List interface', image: '' },
          { text: 'It implements both List and Deque interfaces', image: '' },
          { text: 'It implements only Deque interface', image: '' },
          { text: 'It implements Map interface', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Java Collections - List',
        tags: ['java', 'collections', 'linkedlist'],
        difficulty: 'medium',
        language: 'java'
      },
      {
        title: 'What will be the output of the following code?\n\nArrayList<Integer> list = new ArrayList<>();\nlist.add(10);\nlist.add(20);\nlist.add(1, 15);\nSystem.out.println(list);',
        options: [
          { text: '[10, 20, 15]', image: '' },
          { text: '[10, 15, 20]', image: '' },
          { text: '[15, 10, 20]', image: '' },
          { text: 'Compilation error', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Java Collections - List',
        tags: ['java', 'collections', 'arraylist', 'code-snippet'],
        difficulty: 'easy',
        language: 'java'
      },
      {
        title: 'Which method is used to replace an element at a specific index in an ArrayList?',
        options: [
          { text: 'replace(index, element)', image: '' },
          { text: 'set(index, element)', image: '' },
          { text: 'update(index, element)', image: '' },
          { text: 'put(index, element)', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Java Collections - List',
        tags: ['java', 'collections', 'arraylist', 'methods'],
        difficulty: 'easy',
        language: 'java'
      },
      {
        title: 'What is the key difference between ArrayList and Vector?',
        options: [
          { text: 'ArrayList is synchronized, Vector is not', image: '' },
          { text: 'Vector is synchronized, ArrayList is not', image: '' },
          { text: 'Both are synchronized', image: '' },
          { text: 'Neither is synchronized', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Java Collections - List',
        tags: ['java', 'collections', 'arraylist', 'vector', 'differences'],
        difficulty: 'medium',
        language: 'java'
      },
      {
        title: 'What will be the output?\n\nList<String> list = new ArrayList<>(Arrays.asList("A", "B", "C"));\nlist.remove(1);\nSystem.out.println(list);',
        options: [
          { text: '[A, C]', image: '' },
          { text: '[B, C]', image: '' },
          { text: '[A, B]', image: '' },
          { text: 'Runtime exception', image: '' }
        ],
        correctAnswer: 0,
        topic: 'Java Collections - List',
        tags: ['java', 'collections', 'list', 'code-snippet'],
        difficulty: 'easy',
        language: 'java'
      },
      {
        title: 'Which List implementation provides the best performance for random access operations?',
        options: [
          { text: 'LinkedList', image: '' },
          { text: 'ArrayList', image: '' },
          { text: 'Stack', image: '' },
          { text: 'Vector', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Java Collections - List',
        tags: ['java', 'collections', 'performance', 'arraylist'],
        difficulty: 'easy',
        language: 'java'
      },
      {
        title: 'What does the Collections.unmodifiableList() method return?',
        options: [
          { text: 'A new mutable copy of the list', image: '' },
          { text: 'A read-only view of the list', image: '' },
          { text: 'A synchronized list', image: '' },
          { text: 'A sorted list', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Java Collections - List',
        tags: ['java', 'collections', 'unmodifiable'],
        difficulty: 'medium',
        language: 'java'
      },
      {
        title: 'What is the time complexity of the add(int index, E element) method in ArrayList?',
        options: [
          { text: 'O(1)', image: '' },
          { text: 'O(log n)', image: '' },
          { text: 'O(n)', image: '' },
          { text: 'O(n²)', image: '' }
        ],
        correctAnswer: 2,
        topic: 'Java Collections - List',
        tags: ['java', 'collections', 'arraylist', 'complexity'],
        difficulty: 'medium',
        language: 'java'
      },

      // ===== SET =====
      {
        title: 'Which Set implementation maintains insertion order?',
        options: [
          { text: 'HashSet', image: '' },
          { text: 'TreeSet', image: '' },
          { text: 'LinkedHashSet', image: '' },
          { text: 'EnumSet', image: '' }
        ],
        correctAnswer: 2,
        topic: 'Java Collections - Set',
        tags: ['java', 'collections', 'set', 'linkedhashset'],
        difficulty: 'easy',
        language: 'java'
      },
      {
        title: 'What will be the output?\n\nSet<Integer> set = new HashSet<>();\nset.add(1);\nset.add(2);\nset.add(1);\nSystem.out.println(set.size());',
        options: [
          { text: '3', image: '' },
          { text: '2', image: '' },
          { text: '1', image: '' },
          { text: 'Compilation error', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Java Collections - Set',
        tags: ['java', 'collections', 'hashset', 'code-snippet'],
        difficulty: 'easy',
        language: 'java'
      },
      {
        title: 'Which Set implementation stores elements in sorted (natural) order?',
        options: [
          { text: 'HashSet', image: '' },
          { text: 'LinkedHashSet', image: '' },
          { text: 'TreeSet', image: '' },
          { text: 'ConcurrentSkipListSet', image: '' }
        ],
        correctAnswer: 2,
        topic: 'Java Collections - Set',
        tags: ['java', 'collections', 'treeset', 'sorting'],
        difficulty: 'easy',
        language: 'java'
      },
      {
        title: 'What underlying data structure does HashSet use internally?',
        options: [
          { text: 'Array', image: '' },
          { text: 'Linked List', image: '' },
          { text: 'HashMap', image: '' },
          { text: 'Binary Tree', image: '' }
        ],
        correctAnswer: 2,
        topic: 'Java Collections - Set',
        tags: ['java', 'collections', 'hashset', 'internals'],
        difficulty: 'medium',
        language: 'java'
      },
      {
        title: 'What happens when you add an element to a TreeSet that doesn\'t implement Comparable and no Comparator is provided?',
        options: [
          { text: 'Element is added successfully', image: '' },
          { text: 'ClassCastException at runtime', image: '' },
          { text: 'Compilation error', image: '' },
          { text: 'Element is ignored silently', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Java Collections - Set',
        tags: ['java', 'collections', 'treeset', 'comparable'],
        difficulty: 'hard',
        language: 'java'
      },
      {
        title: 'Which method is used to check if a Set contains a specific element?',
        options: [
          { text: 'has(element)', image: '' },
          { text: 'exists(element)', image: '' },
          { text: 'contains(element)', image: '' },
          { text: 'find(element)', image: '' }
        ],
        correctAnswer: 2,
        topic: 'Java Collections - Set',
        tags: ['java', 'collections', 'set', 'methods'],
        difficulty: 'easy',
        language: 'java'
      },
      {
        title: 'What is the average time complexity of add(), remove(), and contains() in HashSet?',
        options: [
          { text: 'O(n)', image: '' },
          { text: 'O(log n)', image: '' },
          { text: 'O(1)', image: '' },
          { text: 'O(n log n)', image: '' }
        ],
        correctAnswer: 2,
        topic: 'Java Collections - Set',
        tags: ['java', 'collections', 'hashset', 'complexity'],
        difficulty: 'medium',
        language: 'java'
      },
      {
        title: 'What will be the output?\n\nTreeSet<Integer> ts = new TreeSet<>();\nts.add(30);\nts.add(10);\nts.add(20);\nSystem.out.println(ts);',
        options: [
          { text: '[30, 10, 20]', image: '' },
          { text: '[10, 20, 30]', image: '' },
          { text: '[20, 10, 30]', image: '' },
          { text: 'Compilation error', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Java Collections - Set',
        tags: ['java', 'collections', 'treeset', 'code-snippet'],
        difficulty: 'easy',
        language: 'java'
      },
      {
        title: 'Which method in TreeSet returns the greatest element strictly less than the given element?',
        options: [
          { text: 'floor()', image: '' },
          { text: 'lower()', image: '' },
          { text: 'headSet()', image: '' },
          { text: 'previous()', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Java Collections - Set',
        tags: ['java', 'collections', 'treeset', 'navigation'],
        difficulty: 'hard',
        language: 'java'
      },
      {
        title: 'What is the key difference between HashSet and LinkedHashSet?',
        options: [
          { text: 'HashSet is faster for all operations', image: '' },
          { text: 'LinkedHashSet maintains insertion order, HashSet does not', image: '' },
          { text: 'LinkedHashSet allows duplicates', image: '' },
          { text: 'HashSet maintains sorted order', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Java Collections - Set',
        tags: ['java', 'collections', 'hashset', 'linkedhashset', 'differences'],
        difficulty: 'easy',
        language: 'java'
      },

      // ===== QUEUE =====
      {
        title: 'Which interface does PriorityQueue implement?',
        options: [
          { text: 'List', image: '' },
          { text: 'Set', image: '' },
          { text: 'Queue', image: '' },
          { text: 'Map', image: '' }
        ],
        correctAnswer: 2,
        topic: 'Java Collections - Queue',
        tags: ['java', 'collections', 'queue', 'priorityqueue'],
        difficulty: 'easy',
        language: 'java'
      },
      {
        title: 'What is the difference between poll() and remove() in Queue?',
        options: [
          { text: 'poll() throws exception if queue is empty, remove() returns null', image: '' },
          { text: 'remove() throws exception if queue is empty, poll() returns null', image: '' },
          { text: 'Both return null if queue is empty', image: '' },
          { text: 'Both throw exception if queue is empty', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Java Collections - Queue',
        tags: ['java', 'collections', 'queue', 'methods', 'differences'],
        difficulty: 'medium',
        language: 'java'
      },
      {
        title: 'What will be the output?\n\nPriorityQueue<Integer> pq = new PriorityQueue<>();\npq.add(30);\npq.add(10);\npq.add(20);\nSystem.out.println(pq.poll());',
        options: [
          { text: '30', image: '' },
          { text: '20', image: '' },
          { text: '10', image: '' },
          { text: 'null', image: '' }
        ],
        correctAnswer: 2,
        topic: 'Java Collections - Queue',
        tags: ['java', 'collections', 'priorityqueue', 'code-snippet'],
        difficulty: 'medium',
        language: 'java'
      },
      {
        title: 'Which data structure does PriorityQueue use internally?',
        options: [
          { text: 'Linked List', image: '' },
          { text: 'Binary Heap (Min-Heap)', image: '' },
          { text: 'Binary Search Tree', image: '' },
          { text: 'Hash Table', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Java Collections - Queue',
        tags: ['java', 'collections', 'priorityqueue', 'internals'],
        difficulty: 'medium',
        language: 'java'
      },
      {
        title: 'What is a Deque in Java?',
        options: [
          { text: 'A queue that allows insertion only at the front', image: '' },
          { text: 'A double-ended queue that supports insertion and removal at both ends', image: '' },
          { text: 'A queue sorted by priority', image: '' },
          { text: 'A synchronized version of Queue', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Java Collections - Queue',
        tags: ['java', 'collections', 'deque'],
        difficulty: 'easy',
        language: 'java'
      },
      {
        title: 'Which of the following is a Deque implementation in Java?',
        options: [
          { text: 'PriorityQueue', image: '' },
          { text: 'ArrayDeque', image: '' },
          { text: 'HashSet', image: '' },
          { text: 'TreeMap', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Java Collections - Queue',
        tags: ['java', 'collections', 'deque', 'arraydeque'],
        difficulty: 'easy',
        language: 'java'
      },
      {
        title: 'What is the difference between peek() and element() in Queue?',
        options: [
          { text: 'peek() throws exception, element() returns null for empty queue', image: '' },
          { text: 'element() throws exception, peek() returns null for empty queue', image: '' },
          { text: 'Both return null for empty queue', image: '' },
          { text: 'Both throw NoSuchElementException for empty queue', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Java Collections - Queue',
        tags: ['java', 'collections', 'queue', 'methods', 'differences'],
        difficulty: 'medium',
        language: 'java'
      },
      {
        title: 'Does PriorityQueue allow null elements?',
        options: [
          { text: 'Yes, null can be added', image: '' },
          { text: 'No, it throws NullPointerException', image: '' },
          { text: 'Yes, but only as the first element', image: '' },
          { text: 'It depends on the Comparator used', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Java Collections - Queue',
        tags: ['java', 'collections', 'priorityqueue', 'null'],
        difficulty: 'medium',
        language: 'java'
      },
      {
        title: 'Which method adds an element to the front of a Deque?',
        options: [
          { text: 'addFirst()', image: '' },
          { text: 'addFront()', image: '' },
          { text: 'insertFirst()', image: '' },
          { text: 'pushFront()', image: '' }
        ],
        correctAnswer: 0,
        topic: 'Java Collections - Queue',
        tags: ['java', 'collections', 'deque', 'methods'],
        difficulty: 'easy',
        language: 'java'
      },
      {
        title: 'What will be the output?\n\nArrayDeque<String> dq = new ArrayDeque<>();\ndq.offerFirst("A");\ndq.offerLast("B");\ndq.offerFirst("C");\nSystem.out.println(dq);',
        options: [
          { text: '[A, B, C]', image: '' },
          { text: '[C, A, B]', image: '' },
          { text: '[B, A, C]', image: '' },
          { text: '[C, B, A]', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Java Collections - Queue',
        tags: ['java', 'collections', 'arraydeque', 'code-snippet'],
        difficulty: 'medium',
        language: 'java'
      },

      // ===== MAP =====
      {
        title: 'Which Map implementation maintains insertion order?',
        options: [
          { text: 'HashMap', image: '' },
          { text: 'TreeMap', image: '' },
          { text: 'LinkedHashMap', image: '' },
          { text: 'Hashtable', image: '' }
        ],
        correctAnswer: 2,
        topic: 'Java Collections - Map',
        tags: ['java', 'collections', 'map', 'linkedhashmap'],
        difficulty: 'easy',
        language: 'java'
      },
      {
        title: 'Does Map interface extend the Collection interface?',
        options: [
          { text: 'Yes', image: '' },
          { text: 'No', image: '' },
          { text: 'Only HashMap does', image: '' },
          { text: 'Only TreeMap does', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Java Collections - Map',
        tags: ['java', 'collections', 'map', 'hierarchy'],
        difficulty: 'medium',
        language: 'java'
      },
      {
        title: 'What will be the output?\n\nMap<String, Integer> map = new HashMap<>();\nmap.put("A", 1);\nmap.put("B", 2);\nmap.put("A", 3);\nSystem.out.println(map.get("A"));',
        options: [
          { text: '1', image: '' },
          { text: '3', image: '' },
          { text: 'null', image: '' },
          { text: 'Compilation error', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Java Collections - Map',
        tags: ['java', 'collections', 'hashmap', 'code-snippet'],
        difficulty: 'easy',
        language: 'java'
      },
      {
        title: 'What is the default load factor of HashMap in Java?',
        options: [
          { text: '0.5', image: '' },
          { text: '0.75', image: '' },
          { text: '1.0', image: '' },
          { text: '0.25', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Java Collections - Map',
        tags: ['java', 'collections', 'hashmap', 'load-factor'],
        difficulty: 'medium',
        language: 'java'
      },
      {
        title: 'Which method returns a Set view of all keys in a Map?',
        options: [
          { text: 'getKeys()', image: '' },
          { text: 'keys()', image: '' },
          { text: 'keySet()', image: '' },
          { text: 'allKeys()', image: '' }
        ],
        correctAnswer: 2,
        topic: 'Java Collections - Map',
        tags: ['java', 'collections', 'map', 'methods'],
        difficulty: 'easy',
        language: 'java'
      },
      {
        title: 'What is the key difference between HashMap and Hashtable?',
        options: [
          { text: 'HashMap allows null keys, Hashtable does not', image: '' },
          { text: 'Hashtable allows null keys, HashMap does not', image: '' },
          { text: 'Both allow null keys', image: '' },
          { text: 'Neither allows null keys', image: '' }
        ],
        correctAnswer: 0,
        topic: 'Java Collections - Map',
        tags: ['java', 'collections', 'hashmap', 'hashtable', 'differences'],
        difficulty: 'medium',
        language: 'java'
      },
      {
        title: 'Which Map implementation stores entries in sorted order of keys?',
        options: [
          { text: 'HashMap', image: '' },
          { text: 'LinkedHashMap', image: '' },
          { text: 'TreeMap', image: '' },
          { text: 'WeakHashMap', image: '' }
        ],
        correctAnswer: 2,
        topic: 'Java Collections - Map',
        tags: ['java', 'collections', 'treemap', 'sorting'],
        difficulty: 'easy',
        language: 'java'
      },
      {
        title: 'What will be the output?\n\nMap<String, Integer> map = new HashMap<>();\nmap.put("X", 10);\nmap.put("Y", 20);\nSystem.out.println(map.containsValue(20));',
        options: [
          { text: 'true', image: '' },
          { text: 'false', image: '' },
          { text: '20', image: '' },
          { text: 'Compilation error', image: '' }
        ],
        correctAnswer: 0,
        topic: 'Java Collections - Map',
        tags: ['java', 'collections', 'hashmap', 'code-snippet'],
        difficulty: 'easy',
        language: 'java'
      },
      {
        title: 'What does the getOrDefault(key, defaultValue) method do in Map?',
        options: [
          { text: 'Returns the value for the key, or throws an exception if not found', image: '' },
          { text: 'Returns the value for the key, or the defaultValue if key is not present', image: '' },
          { text: 'Inserts the defaultValue if the key is not present', image: '' },
          { text: 'Removes the key if its value equals defaultValue', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Java Collections - Map',
        tags: ['java', 'collections', 'map', 'methods'],
        difficulty: 'easy',
        language: 'java'
      },
      {
        title: 'What is the initial capacity of a HashMap?',
        options: [
          { text: '8', image: '' },
          { text: '10', image: '' },
          { text: '16', image: '' },
          { text: '32', image: '' }
        ],
        correctAnswer: 2,
        topic: 'Java Collections - Map',
        tags: ['java', 'collections', 'hashmap', 'capacity'],
        difficulty: 'medium',
        language: 'java'
      },

      // ===== CROSS-TOPIC / DIFFERENCES / SIMILARITIES =====
      {
        title: 'Which collection types allow duplicate elements?',
        options: [
          { text: 'List and Set', image: '' },
          { text: 'List and Queue', image: '' },
          { text: 'Set and Map', image: '' },
          { text: 'Queue and Set', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Java Collections - General',
        tags: ['java', 'collections', 'differences', 'duplicates'],
        difficulty: 'easy',
        language: 'java'
      },
      {
        title: 'Which of the following is NOT a part of the Java Collection Framework?',
        options: [
          { text: 'ArrayList', image: '' },
          { text: 'HashMap', image: '' },
          { text: 'String', image: '' },
          { text: 'TreeSet', image: '' }
        ],
        correctAnswer: 2,
        topic: 'Java Collections - General',
        tags: ['java', 'collections', 'general'],
        difficulty: 'easy',
        language: 'java'
      },
      {
        title: 'What will be the output?\n\nMap<String, Integer> map = new TreeMap<>();\nmap.put("Banana", 2);\nmap.put("Apple", 1);\nmap.put("Cherry", 3);\nSystem.out.println(map.keySet());',
        options: [
          { text: '[Banana, Apple, Cherry]', image: '' },
          { text: '[Apple, Banana, Cherry]', image: '' },
          { text: '[Cherry, Banana, Apple]', image: '' },
          { text: 'Random order', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Java Collections - Map',
        tags: ['java', 'collections', 'treemap', 'code-snippet'],
        difficulty: 'easy',
        language: 'java'
      },
      {
        title: 'What is the similarity between HashSet and HashMap?',
        options: [
          { text: 'Both store key-value pairs', image: '' },
          { text: 'Both use hashing internally', image: '' },
          { text: 'Both maintain sorted order', image: '' },
          { text: 'Both implement the List interface', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Java Collections - General',
        tags: ['java', 'collections', 'hashset', 'hashmap', 'similarities'],
        difficulty: 'medium',
        language: 'java'
      },
      {
        title: 'Which method is used to iterate over all entries of a Map?',
        options: [
          { text: 'map.iterator()', image: '' },
          { text: 'map.entrySet()', image: '' },
          { text: 'map.getAll()', image: '' },
          { text: 'map.forEach() only', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Java Collections - Map',
        tags: ['java', 'collections', 'map', 'iteration'],
        difficulty: 'easy',
        language: 'java'
      },
      {
        title: 'What will be the output?\n\nList<Integer> list = new ArrayList<>(Arrays.asList(3, 1, 2));\nCollections.sort(list);\nSystem.out.println(list);',
        options: [
          { text: '[3, 1, 2]', image: '' },
          { text: '[1, 2, 3]', image: '' },
          { text: '[3, 2, 1]', image: '' },
          { text: 'Compilation error', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Java Collections - General',
        tags: ['java', 'collections', 'sorting', 'code-snippet'],
        difficulty: 'easy',
        language: 'java'
      },
      {
        title: 'Which collection should you use if you need thread-safe operations without external synchronization?',
        options: [
          { text: 'ArrayList', image: '' },
          { text: 'ConcurrentHashMap', image: '' },
          { text: 'HashMap', image: '' },
          { text: 'LinkedList', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Java Collections - General',
        tags: ['java', 'collections', 'concurrency', 'thread-safety'],
        difficulty: 'medium',
        language: 'java'
      },
      {
        title: 'What does the putIfAbsent(key, value) method do in Map?',
        options: [
          { text: 'Always puts the value regardless of existing key', image: '' },
          { text: 'Inserts the value only if the key is not already present', image: '' },
          { text: 'Throws exception if key exists', image: '' },
          { text: 'Removes the key if present and adds new value', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Java Collections - Map',
        tags: ['java', 'collections', 'map', 'methods'],
        difficulty: 'medium',
        language: 'java'
      },
      {
        title: 'What is the difference between Iterator and ListIterator?',
        options: [
          { text: 'Iterator can traverse in both directions, ListIterator cannot', image: '' },
          { text: 'ListIterator can traverse in both directions and is only for Lists', image: '' },
          { text: 'Both can only traverse forward', image: '' },
          { text: 'ListIterator works with all Collection types', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Java Collections - General',
        tags: ['java', 'collections', 'iterator', 'listiterator', 'differences'],
        difficulty: 'medium',
        language: 'java'
      },
      {
        title: 'What will be the output?\n\nMap<Integer, String> map = new HashMap<>();\nmap.put(1, "One");\nmap.put(2, "Two");\nmap.put(3, "Three");\nmap.remove(2);\nSystem.out.println(map.size());',
        options: [
          { text: '3', image: '' },
          { text: '2', image: '' },
          { text: '1', image: '' },
          { text: '0', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Java Collections - Map',
        tags: ['java', 'collections', 'hashmap', 'code-snippet'],
        difficulty: 'easy',
        language: 'java'
      }
    ];

    // Add tenant and createdBy to each question
    const questionsWithMeta = questions.map(q => ({
      ...q,
      tenant: tenantId,
      createdBy: createdById
    }));

    const result = await QuizQuestion.insertMany(questionsWithMeta);
    console.log(`\n✅ Successfully inserted ${result.length} Java Collections Framework quiz questions!`);
    console.log('\nBreakdown:');
    
    const topics = {};
    result.forEach(q => {
      topics[q.topic] = (topics[q.topic] || 0) + 1;
    });
    Object.entries(topics).forEach(([topic, count]) => {
      console.log(`  📋 ${topic}: ${count} questions`);
    });

    console.log('\nQuestion IDs:');
    result.forEach((q, i) => {
      console.log(`  ${i + 1}. ${q._id} - ${q.title.substring(0, 60)}...`);
    });

  } catch (error) {
    console.error('Error seeding quiz questions:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed.');
  }
}

run();
