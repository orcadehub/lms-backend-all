require('dotenv').config();
const mongoose = require('mongoose');
const QuizQuestion = require('../models/QuizQuestion');
const Tenant = require('../models/Tenant');
const Instructor = require('../models/Instructor');

const quizQuestions = [
  // --- EASY (15) ---
  {
    title: "What is the time complexity of accessing an element in an array using its index?",
    topic: "Arrays",
    difficulty: "easy",
    options: [{ text: "O(1)" }, { text: "O(n)" }, { text: "O(log n)" }, { text: "O(n^2)" }],
    correctAnswer: 0,
    tags: ["DSA", "Arrays", "Basics"]
  },
  {
    title: "Which data structure follows the Last-In-First-Out (LIFO) principle?",
    topic: "Stacks",
    difficulty: "easy",
    options: [{ text: "Queue" }, { text: "Linked List" }, { text: "Stack" }, { text: "Tree" }],
    correctAnswer: 2,
    tags: ["DSA", "Stacks", "Basics"]
  },
  {
    title: "In a singly linked list, what does the 'next' pointer of the last node point to?",
    topic: "Linked Lists",
    difficulty: "easy",
    options: [{ text: "The first node" }, { text: "The previous node" }, { text: "NULL/None" }, { text: "Itself" }],
    correctAnswer: 2,
    tags: ["DSA", "Linked List", "Basics"]
  },
  {
    title: "Which of the following sorting algorithms is generally considered the slowest in theory for large datasets?",
    topic: "Sorting",
    difficulty: "easy",
    options: [{ text: "Merge Sort" }, { text: "Quick Sort" }, { text: "Bubble Sort" }, { text: "Heap Sort" }],
    correctAnswer: 2,
    tags: ["DSA", "Sorting", "Basics"]
  },
  {
    title: "Guess the output of the following pseudo-code:\n```\nS = Stack()\nS.push(5)\nS.push(10)\nS.pop()\nprint(S.top())\n```",
    topic: "Stacks",
    difficulty: "easy",
    codeSnippet: "S = Stack()\nS.push(5)\nS.push(10)\nS.pop()\nprint(S.top())",
    options: [{ text: "10" }, { text: "5" }, { text: "Error" }, { text: "None" }],
    correctAnswer: 1,
    tags: ["DSA", "Stacks", "PseudoCode"]
  },
  {
    title: "Which data structure is most suitable for implementing a Breadth-First Search (BFS) on a graph?",
    topic: "Queues",
    difficulty: "easy",
    options: [{ text: "Stack" }, { text: "Queue" }, { text: "Priority Queue" }, { text: "Tree" }],
    correctAnswer: 1,
    tags: ["DSA", "Graphs", "BFS"]
  },
  {
    title: "What is the worst-case time complexity of Linear Search?",
    topic: "Searching",
    difficulty: "easy",
    options: [{ text: "O(1)" }, { text: "O(log n)" }, { text: "O(n)" }, { text: "O(n log n)" }],
    correctAnswer: 2,
    tags: ["DSA", "Searching", "Basics"]
  },
  {
    title: "A Binary Search Tree (BST) property states that for any node, the left child is ___ than the parent.",
    topic: "Trees",
    difficulty: "easy",
    options: [{ text: "Greater" }, { text: "Equal" }, { text: "Smaller" }, { text: "Double" }],
    correctAnswer: 2,
    tags: ["DSA", "Trees", "BST"]
  },
  {
    title: "What is the root of a tree with no parent called?",
    topic: "Trees",
    difficulty: "easy",
    options: [{ text: "Leaf" }, { text: "Subtree" }, { text: "Root" }, { text: "Internal Node" }],
    correctAnswer: 2,
    tags: ["DSA", "Trees", "Basics"]
  },
  {
    title: "Which of these is NOT a stable sorting algorithm in its standard implementation?",
    topic: "Sorting",
    difficulty: "easy",
    options: [{ text: "Merge Sort" }, { text: "Insertion Sort" }, { text: "Bubble Sort" }, { text: "Quick Sort" }],
    correctAnswer: 3,
    tags: ["DSA", "Sorting", "Stability"]
  },
  {
    title: "What does the following return?\n```\narr = [10, 20, 30]\nprint(arr[1])\n```",
    topic: "Arrays",
    difficulty: "easy",
    codeSnippet: "arr = [10, 20, 30]\nprint(arr[1])",
    options: [{ text: "10" }, { text: "20" }, { text: "30" }, { text: "IndexError" }],
    correctAnswer: 1,
    tags: ["DSA", "Arrays", "Basics"]
  },
  {
    title: "The process of calling a function within itself is known as:",
    topic: "Recursion",
    difficulty: "easy",
    options: [{ text: "Looping" }, { text: "Recursion" }, { text: "Iteration" }, { text: "Overloading" }],
    correctAnswer: 1,
    tags: ["DSA", "Recursion", "Basics"]
  },
  {
    title: "In a Queue, insertion is done at which end?",
    topic: "Queues",
    difficulty: "easy",
    options: [{ text: "Front" }, { text: "Rear" }, { text: "Top" }, { text: "Center" }],
    correctAnswer: 1,
    tags: ["DSA", "Queues", "Basics"]
  },
  {
    title: "Which of the following is an example of a dynamic data structure?",
    topic: "Linked Lists",
    difficulty: "easy",
    options: [{ text: "Array" }, { text: "Linked List" }, { text: "Static Array" }, { text: "Enum" }],
    correctAnswer: 1,
    tags: ["DSA", "Linked List", "Basics"]
  },
  {
    title: "What is the space complexity of a recursive Fibonacci function without memoization?",
    topic: "Recursion",
    difficulty: "easy",
    options: [{ text: "O(1)" }, { text: "O(n)" }, { text: "O(2^n)" }, { text: "O(log n)" }],
    correctAnswer: 1,
    tags: ["DSA", "Recursion", "Complexity"]
  },

  // --- MEDIUM (15) ---
  {
    title: "Calculate the output:\n```\ndef func(n):\n  if n <= 1: return 1\n  return n + func(n-1)\nprint(func(4))\n```",
    topic: "Recursion",
    difficulty: "medium",
    codeSnippet: "def func(n):\n  if n <= 1: return 1\n  return n + func(n-1)\nprint(func(4))",
    options: [{ text: "7" }, { text: "10" }, { text: "6" }, { text: "11" }],
    correctAnswer: 1,
    tags: ["DSA", "Recursion", "PseudoCode"]
  },
  {
    title: "What is the time complexity of building a heap from an array of size n?",
    topic: "Heaps",
    difficulty: "medium",
    options: [{ text: "O(n log n)" }, { text: "O(n)" }, { text: "O(n^2)" }, { text: "O(log n)" }],
    correctAnswer: 1,
    tags: ["DSA", "Heaps", "Complexity"]
  },
  {
    title: "Which traversal of a Binary Search Tree (BST) produces elements in sorted order?",
    topic: "Trees",
    difficulty: "medium",
    options: [{ text: "Pre-order" }, { text: "Post-order" }, { text: "In-order" }, { text: "Level-order" }],
    correctAnswer: 2,
    tags: ["DSA", "Trees", "BST"]
  },
  {
    title: "What is the best case time complexity of QuickSort?",
    topic: "Sorting",
    difficulty: "medium",
    options: [{ text: "O(n log n)" }, { text: "O(n)" }, { text: "O(n^2)" }, { text: "O(log n)" }],
    correctAnswer: 0,
    tags: ["DSA", "Sorting", "Complexity"]
  },
  {
    title: "Which of the following is use of a Hash function?",
    topic: "Hashing",
    difficulty: "medium",
    options: [{ text: "Mapping large data to small keys" }, { text: "Sorting data" }, { text: "Finding the shortest path" }, { text: "Allocating memory" }],
    correctAnswer: 0,
    tags: ["DSA", "Hashing", "Basics"]
  },
  {
    title: "In a circular queue with size N, what is the 'next' position after index 'i'?",
    topic: "Queues",
    difficulty: "medium",
    options: [{ text: "(i + 1)" }, { text: "(i + 1) % N" }, { text: "(i - 1) % N" }, { text: "i % (N + 1)" }],
    correctAnswer: 1,
    tags: ["DSA", "Queues", "Circular"]
  },
  {
    title: "Dijkstra's algorithm is used to find:",
    topic: "Graphs",
    difficulty: "medium",
    options: [{ text: "Minimum Spanning Tree" }, { text: "Shortest path from source to all nodes" }, { text: "Connected components" }, { text: "Topological sort" }],
    correctAnswer: 1,
    tags: ["DSA", "Graphs", "Shortest Path"]
  },
  {
    title: "What is the result of applying 'Post-order' traversal on this tree: 1(Root) -> Left(2), Right(3)?",
    topic: "Trees",
    difficulty: "medium",
    codeSnippet: "1\n / \\\n2   3",
    options: [{ text: "1, 2, 3" }, { text: "2, 3, 1" }, { text: "2, 1, 3" }, { text: "3, 2, 1" }],
    correctAnswer: 1,
    tags: ["DSA", "Trees", "Traversal"]
  },
  {
    title: "A hash table has a size of 10 and uses h(k) = k % 10. If we insert 12, 22, 32 using linear probing, where does 32 go?",
    topic: "Hashing",
    difficulty: "medium",
    options: [{ text: "Index 2" }, { text: "Index 3" }, { text: "Index 4" }, { text: "Index 5" }],
    correctAnswer: 2,
    tags: ["DSA", "Hashing", "Collision"]
  },
  {
    title: "Which of the following is NOT a Greedy algorithm?",
    topic: "Algorithms",
    difficulty: "medium",
    options: [{ text: "Huffman Coding" }, { text: "Prim's Algorithm" }, { text: "Kruskal's Algorithm" }, { text: "0/1 Knapsack (Dynamic Programming)" }],
    correctAnswer: 3,
    tags: ["DSA", "Algorithms", "Greedy"]
  },
  {
    title: "What is the height of a balanced binary tree with N nodes?",
    topic: "Trees",
    difficulty: "medium",
    options: [{ text: "O(N)" }, { text: "O(log N)" }, { text: "O(N log N)" }, { text: "O(1)" }],
    correctAnswer: 1,
    tags: ["DSA", "Trees", "Balance"]
  },
  {
    title: "Which operation is most efficient in a Doubly Linked List compared to a Singly Linked List?",
    topic: "Linked Lists",
    difficulty: "medium",
    options: [{ text: "Finding an element" }, { text: "Deleting a node given a pointer to it" }, { text: "Inserting at front" }, { text: "Appending to end" }],
    correctAnswer: 1,
    tags: ["DSA", "Linked List", "Operations"]
  },
  {
    title: "The 'Amortized' time complexity of adding an element to a Dynamic Array happens to be:",
    topic: "Complexity",
    difficulty: "medium",
    options: [{ text: "O(n)" }, { text: "O(1)" }, { text: "O(log n)" }, { text: "O(n^2)" }],
    correctAnswer: 1,
    tags: ["DSA", "Arrays", "Amortized"]
  },
  {
    title: "What is the maximum number of nodes in a binary tree of height H (root is at height 0)?",
    topic: "Trees",
    difficulty: "medium",
    options: [{ text: "2^H" }, { text: "2^(H+1) - 1" }, { text: "2^H - 1" }, { text: "H^2" }],
    correctAnswer: 1,
    tags: ["DSA", "Trees", "Math"]
  },
  {
    title: "A graph with N vertices and N-1 edges that is connected and has no cycles is called a:",
    topic: "Graphs",
    difficulty: "medium",
    options: [{ text: "Complete Graph" }, { text: "Tree" }, { text: "Bipartite Graph" }, { text: "Directed Acyclic Graph" }],
    correctAnswer: 1,
    tags: ["DSA", "Graphs", "Trees"]
  },

  // --- HARD (20) ---
  {
    title: "Find the time complexity of the following pseudo-code:\n```\nfor i from 1 to n:\n  j = 1\n  while j < n:\n    j = j * 2\n```",
    topic: "Complexity",
    difficulty: "hard",
    codeSnippet: "for i from 1 to n:\n  j = 1\n  while j < n:\n    j = j * 2",
    options: [{ text: "O(n)" }, { text: "O(n log n)" }, { text: "O(log n)" }, { text: "O(n^2)" }],
    correctAnswer: 1,
    tags: ["DSA", "Complexity", "LoopAnalysis"]
  },
  {
    title: "What is the primary condition for an AVL tree to remain balanced?",
    topic: "Trees",
    difficulty: "hard",
    options: [
      { text: "Difference between left and right subtree heights is exactly 0" },
      { text: "Difference between left and right subtree heights is at most 1" },
      { text: "The tree must be a complete binary tree" },
      { text: "Total nodes must be prime" }
    ],
    correctAnswer: 1,
    tags: ["DSA", "Trees", "AVL"]
  },
  {
    title: "Which algorithm uses the 'Divide and Conquer' strategy to solve the 'Matrix Chain Multiplication' problem efficiently?",
    topic: "Dynamic Programming",
    difficulty: "hard",
    options: [{ text: "Merge Sort" }, { text: "Strassen's Algorithm" }, { text: "Dynamic Programming" }, { text: "Floyd-Warshall" }],
    correctAnswer: 2,
    tags: ["DSA", "DP", "Matrices"]
  },
  {
    title: "In a Red-Black tree, if a node is Red, what must be the color of its children?",
    topic: "Trees",
    difficulty: "hard",
    options: [{ text: "Red" }, { text: "Black" }, { text: "Either Red or Black" }, { text: "Blue" }],
    correctAnswer: 1,
    tags: ["DSA", "Trees", "Red-Black"]
  },
  {
    title: "What is the time complexity of the Bellman-Ford algorithm for a graph with V vertices and E edges?",
    topic: "Graphs",
    difficulty: "hard",
    options: [{ text: "O(V + E)" }, { text: "O(VE)" }, { text: "O(V^2)" }, { text: "O(E log V)" }],
    correctAnswer: 1,
    tags: ["DSA", "Graphs", "Shortest Path"]
  },
  {
    title: "The 'Floyd-Warshall' algorithm finds the shortest path between:",
    topic: "Graphs",
    difficulty: "hard",
    options: [
      { text: "Source to all vertices" },
      { text: "All pairs of vertices" },
      { text: "Two specific vertices" },
      { text: "Middle vertices only" }
    ],
    correctAnswer: 1,
    tags: ["DSA", "Graphs", "All-Pairs"]
  },
  {
    title: "Guess the output of this DP related recursion:\n```\ndef solve(n, memo={}):\n  if n in memo: return memo[n]\n  if n <= 2: return n\n  memo[n] = solve(n-1) + solve(n-2)\n  return memo[n]\nprint(solve(5))\n```",
    topic: "Dynamic Programming",
    difficulty: "hard",
    codeSnippet: "def solve(n, memo={}):\n  if n in memo: return memo[n]\n  if n <= 2: return n\n  memo[n] = solve(n-1) + solve(n-2)\n  return memo[n]\nprint(solve(5))",
    options: [{ text: "5" }, { text: "8" }, { text: "13" }, { text: "21" }],
    correctAnswer: 1,
    tags: ["DSA", "DP", "Fibonacci"]
  },
  {
    title: "What is the worst-case time complexity of searching in a Hash Table with Chaining?",
    topic: "Hashing",
    difficulty: "hard",
    options: [{ text: "O(1)" }, { text: "O(log n)" }, { text: "O(n)" }, { text: "O(n^2)" }],
    correctAnswer: 2,
    tags: ["DSA", "Hashing", "Complexity"]
  },
  {
    title: "Which data structure is used to implement a 'Disjoint Set Union' (DSU)?",
    topic: "Set Theory",
    difficulty: "hard",
    options: [{ text: "Graph" }, { text: "Stack" }, { text: "Array or Forest of Trees" }, { text: "Hash Table" }],
    correctAnswer: 2,
    tags: ["DSA", "DSU", "Advanced"]
  },
  {
    title: "The Kruskal's algorithm for finding the MST uses which internal sorting and set management?",
    topic: "Graphs",
    difficulty: "hard",
    options: [
      { text: "Merge Sort and Queue" },
      { text: "Sorting edges and DSU (Union-Find)" },
      { text: "Dijkstra and Priority Queue" },
      { text: "BFS and DFS" }
    ],
    correctAnswer: 1,
    tags: ["DSA", "Graphs", "MST"]
  },
  {
    title: "What is the time complexity of searching in a Trie (Prefix Tree) for a word of length L?",
    topic: "Trees",
    difficulty: "hard",
    options: [{ text: "O(L)" }, { text: "O(N)" }, { text: "O(log N)" }, { text: "O(L * N)" }],
    correctAnswer: 0,
    tags: ["DSA", "Trie", "Complexity"]
  },
  {
    title: "Which of the following is true about a B-Tree?",
    topic: "Trees",
    difficulty: "hard",
    options: [
      { text: "It is a binary tree" },
      { text: "All leaf nodes are at the same level" },
      { text: "Maximum degree is always 2" },
      { text: "Used only for in-memory operations" }
    ],
    correctAnswer: 1,
    tags: ["DSA", "Trees", "B-Tree"]
  },
  {
    title: "The 'Knapsack Problem' using Dynamic Programming has a time complexity of (where W is capacity and n is items):",
    topic: "Dynamic Programming",
    difficulty: "hard",
    options: [{ text: "O(2^n)" }, { text: "O(n * W)" }, { text: "O(n + W)" }, { text: "O(n!)" }],
    correctAnswer: 1,
    tags: ["DSA", "DP", "Knapsack"]
  },
  {
    title: "What is a 'Spanning Tree' of a graph G?",
    topic: "Graphs",
    difficulty: "hard",
    options: [
      { text: "A tree containing all vertices of G" },
      { text: "A tree containing all edges of G" },
      { text: "A cycle containing all vertices" },
      { text: "A subset of G with maximum edges" }
    ],
    correctAnswer: 0,
    tags: ["DSA", "Graphs", "Definitions"]
  },
  {
    title: "The time complexity of finding the Median in an unsorted array using the 'Median of Medians' algorithm is:",
    topic: "Algorithms",
    difficulty: "hard",
    options: [{ text: "O(n log n)" }, { text: "O(n)" }, { text: "O(n^2)" }, { text: "O(log n)" }],
    correctAnswer: 1,
    tags: ["DSA", "Algorithms", "Selection"]
  },
  {
    title: "Which technique is used to solve the 'N-Queens' problem?",
    topic: "Backtracking",
    difficulty: "hard",
    options: [{ text: "Greedy" }, { text: "Dynamic Programming" }, { text: "Backtracking" }, { text: "BFS" }],
    correctAnswer: 2,
    tags: ["DSA", "Algorithms", "Backtracking"]
  },
  {
    title: "What is the time complexity of the 'KMP' algorithm for string matching (text length N, pattern length M)?",
    topic: "Strings",
    difficulty: "hard",
    options: [{ text: "O(N * M)" }, { text: "O(N + M)" }, { text: "O(N log M)" }, { text: "O(M^2)" }],
    correctAnswer: 1,
    tags: ["DSA", "Strings", "Matching"]
  },
  {
    title: "In a min-heap, where is the smallest element located?",
    topic: "Heaps",
    difficulty: "hard",
    options: [{ text: "At any leaf node" }, { text: "At the root node" }, { text: "In the middle level" }, { text: "Depends on insertion order" }],
    correctAnswer: 1,
    tags: ["DSA", "Heaps", "Basics"]
  },
  {
    title: "The 'Primary Clustering' problem occurs in which collision resolution technique?",
    topic: "Hashing",
    difficulty: "hard",
    options: [{ text: "Separate Chaining" }, { text: "Linear Probing" }, { text: "Quadratic Probing" }, { text: "Double Hashing" }],
    correctAnswer: 1,
    tags: ["DSA", "Hashing", "Problems"]
  },
  {
    title: "What is the time complexity of Prim's algorithm using an Adjacency Matrix and a simple array to find the minimum weight edge?",
    topic: "Graphs",
    difficulty: "hard",
    options: [{ text: "O(E log V)" }, { text: "O(V^2)" }, { text: "O(V + E)" }, { text: "O(E^2)" }],
    correctAnswer: 1,
    tags: ["DSA", "Graphs", "MST"]
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms');
    console.log('Connected to MongoDB');

    const tenant = await Tenant.findOne();
    const instructor = await Instructor.findOne();

    if (!tenant || !instructor) {
      console.error('Missing Tenant or Instructor to associate questions. Please seed users first.');
      process.exit(1);
    }

    console.log(`Using Tenant: ${tenant.name} (${tenant._id})`);
    console.log(`Using Instructor: ${instructor.name} (${instructor._id})`);

    const quizToInsert = quizQuestions.map(q => ({
      ...q,
      tenant: tenant._id,
      createdBy: instructor._id
    }));

    await QuizQuestion.deleteMany({ tags: "DSA" }); // Clear previous DSA quiz questions to avoid duplicates
    const quizResult = await QuizQuestion.insertMany(quizToInsert);
    console.log(`Successfully seeded ${quizResult.length} DSA Quiz questions (15 Easy, 15 Medium, 20 Hard).`);

  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seed();
