const mongoose = require('mongoose');
const StudyMaterial = require('../models/StudyMaterial');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

const dsaChapters = [
  {
    title: 'Introduction to DSA',
    order: 1,
    lessons: [
      { title: 'What is Data Structure', order: 1, content: '<h2>What is Data Structure</h2><p>Content will be added here.</p>' },
      { title: 'What is Algorithm', order: 2, content: '<h2>What is Algorithm</h2><p>Content will be added here.</p>' },
      { title: 'Why Learn DSA', order: 3, content: '<h2>Why Learn DSA</h2><p>Content will be added here.</p>' },
      { title: 'Types of Data Structures', order: 4, content: '<h2>Types of Data Structures</h2><p>Content will be added here.</p>' },
      { title: 'Time vs Space Tradeoff', order: 5, content: '<h2>Time vs Space Tradeoff</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Algorithm Analysis',
    order: 2,
    lessons: [
      { title: 'What is Time Complexity', order: 1, content: '<h2>What is Time Complexity</h2><p>Content will be added here.</p>' },
      { title: 'What is Space Complexity', order: 2, content: '<h2>What is Space Complexity</h2><p>Content will be added here.</p>' },
      { title: 'Big O Notation', order: 3, content: '<h2>Big O Notation</h2><p>Content will be added here.</p>' },
      { title: 'Best, Average, Worst Case', order: 4, content: '<h2>Best, Average, Worst Case</h2><p>Content will be added here.</p>' },
      { title: 'Common Complexity Examples', order: 5, content: '<h2>Common Complexity Examples</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Arrays',
    order: 3,
    lessons: [
      { title: 'Introduction to Arrays', order: 1, content: '<h2>Introduction to Arrays</h2><p>Content will be added here.</p>' },
      { title: 'Array Operations', order: 2, content: '<h2>Array Operations</h2><p>Content will be added here.</p>' },
      { title: 'Traversing Arrays', order: 3, content: '<h2>Traversing Arrays</h2><p>Content will be added here.</p>' },
      { title: 'Insertion in Array', order: 4, content: '<h2>Insertion in Array</h2><p>Content will be added here.</p>' },
      { title: 'Deletion in Array', order: 5, content: '<h2>Deletion in Array</h2><p>Content will be added here.</p>' },
      { title: 'Searching in Array', order: 6, content: '<h2>Searching in Array</h2><p>Content will be added here.</p>' },
      { title: 'Multi-dimensional Arrays', order: 7, content: '<h2>Multi-dimensional Arrays</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Strings',
    order: 4,
    lessons: [
      { title: 'String Basics', order: 1, content: '<h2>String Basics</h2><p>Content will be added here.</p>' },
      { title: 'String Operations', order: 2, content: '<h2>String Operations</h2><p>Content will be added here.</p>' },
      { title: 'String Searching', order: 3, content: '<h2>String Searching</h2><p>Content will be added here.</p>' },
      { title: 'String Manipulation Problems', order: 4, content: '<h2>String Manipulation Problems</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Recursion',
    order: 5,
    lessons: [
      { title: 'What is Recursion', order: 1, content: '<h2>What is Recursion</h2><p>Content will be added here.</p>' },
      { title: 'Base Condition', order: 2, content: '<h2>Base Condition</h2><p>Content will be added here.</p>' },
      { title: 'Recursive vs Iterative', order: 3, content: '<h2>Recursive vs Iterative</h2><p>Content will be added here.</p>' },
      { title: 'Recursion Examples', order: 4, content: '<h2>Recursion Examples</h2><p>Content will be added here.</p>' },
      { title: 'Backtracking Basics', order: 5, content: '<h2>Backtracking Basics</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Searching Algorithms',
    order: 6,
    lessons: [
      { title: 'Linear Search', order: 1, content: '<h2>Linear Search</h2><p>Content will be added here.</p>' },
      { title: 'Binary Search', order: 2, content: '<h2>Binary Search</h2><p>Content will be added here.</p>' },
      { title: 'Binary Search Variations', order: 3, content: '<h2>Binary Search Variations</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Sorting Algorithms',
    order: 7,
    lessons: [
      { title: 'Bubble Sort', order: 1, content: '<h2>Bubble Sort</h2><p>Content will be added here.</p>' },
      { title: 'Selection Sort', order: 2, content: '<h2>Selection Sort</h2><p>Content will be added here.</p>' },
      { title: 'Insertion Sort', order: 3, content: '<h2>Insertion Sort</h2><p>Content will be added here.</p>' },
      { title: 'Merge Sort', order: 4, content: '<h2>Merge Sort</h2><p>Content will be added here.</p>' },
      { title: 'Quick Sort', order: 5, content: '<h2>Quick Sort</h2><p>Content will be added here.</p>' },
      { title: 'Heap Sort', order: 6, content: '<h2>Heap Sort</h2><p>Content will be added here.</p>' },
      { title: 'Counting Sort', order: 7, content: '<h2>Counting Sort</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Linked List',
    order: 8,
    lessons: [
      { title: 'Introduction to Linked List', order: 1, content: '<h2>Introduction to Linked List</h2><p>Content will be added here.</p>' },
      { title: 'Types of Linked Lists', order: 2, content: '<h2>Types of Linked Lists</h2><p>Content will be added here.</p>' },
      { title: 'Insertion in Linked List', order: 3, content: '<h2>Insertion in Linked List</h2><p>Content will be added here.</p>' },
      { title: 'Deletion in Linked List', order: 4, content: '<h2>Deletion in Linked List</h2><p>Content will be added here.</p>' },
      { title: 'Traversal', order: 5, content: '<h2>Traversal</h2><p>Content will be added here.</p>' },
      { title: 'Reverse Linked List', order: 6, content: '<h2>Reverse Linked List</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Stack',
    order: 9,
    lessons: [
      { title: 'Introduction to Stack', order: 1, content: '<h2>Introduction to Stack</h2><p>Content will be added here.</p>' },
      { title: 'Stack Operations', order: 2, content: '<h2>Stack Operations</h2><p>Content will be added here.</p>' },
      { title: 'Stack using Arrays', order: 3, content: '<h2>Stack using Arrays</h2><p>Content will be added here.</p>' },
      { title: 'Stack using Linked List', order: 4, content: '<h2>Stack using Linked List</h2><p>Content will be added here.</p>' },
      { title: 'Applications of Stack', order: 5, content: '<h2>Applications of Stack</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Queue',
    order: 10,
    lessons: [
      { title: 'Introduction to Queue', order: 1, content: '<h2>Introduction to Queue</h2><p>Content will be added here.</p>' },
      { title: 'Queue Operations', order: 2, content: '<h2>Queue Operations</h2><p>Content will be added here.</p>' },
      { title: 'Circular Queue', order: 3, content: '<h2>Circular Queue</h2><p>Content will be added here.</p>' },
      { title: 'Deque', order: 4, content: '<h2>Deque</h2><p>Content will be added here.</p>' },
      { title: 'Priority Queue', order: 5, content: '<h2>Priority Queue</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Hashing',
    order: 11,
    lessons: [
      { title: 'What is Hashing', order: 1, content: '<h2>What is Hashing</h2><p>Content will be added here.</p>' },
      { title: 'Hash Functions', order: 2, content: '<h2>Hash Functions</h2><p>Content will be added here.</p>' },
      { title: 'Collision Handling', order: 3, content: '<h2>Collision Handling</h2><p>Content will be added here.</p>' },
      { title: 'Hash Tables', order: 4, content: '<h2>Hash Tables</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Trees',
    order: 12,
    lessons: [
      { title: 'Introduction to Trees', order: 1, content: '<h2>Introduction to Trees</h2><p>Content will be added here.</p>' },
      { title: 'Binary Tree', order: 2, content: '<h2>Binary Tree</h2><p>Content will be added here.</p>' },
      { title: 'Tree Traversals', order: 3, content: '<h2>Tree Traversals</h2><p>Content will be added here.</p>' },
      { title: 'Binary Search Tree', order: 4, content: '<h2>Binary Search Tree</h2><p>Content will be added here.</p>' },
      { title: 'AVL Tree', order: 5, content: '<h2>AVL Tree</h2><p>Content will be added here.</p>' },
      { title: 'Heap Tree', order: 6, content: '<h2>Heap Tree</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Graphs',
    order: 13,
    lessons: [
      { title: 'Introduction to Graphs', order: 1, content: '<h2>Introduction to Graphs</h2><p>Content will be added here.</p>' },
      { title: 'Graph Representation', order: 2, content: '<h2>Graph Representation</h2><p>Content will be added here.</p>' },
      { title: 'BFS Traversal', order: 3, content: '<h2>BFS Traversal</h2><p>Content will be added here.</p>' },
      { title: 'DFS Traversal', order: 4, content: '<h2>DFS Traversal</h2><p>Content will be added here.</p>' },
      { title: 'Shortest Path Algorithms', order: 5, content: '<h2>Shortest Path Algorithms</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Greedy Algorithms',
    order: 14,
    lessons: [
      { title: 'What is Greedy Approach', order: 1, content: '<h2>What is Greedy Approach</h2><p>Content will be added here.</p>' },
      { title: 'Activity Selection Problem', order: 2, content: '<h2>Activity Selection Problem</h2><p>Content will be added here.</p>' },
      { title: 'Fractional Knapsack', order: 3, content: '<h2>Fractional Knapsack</h2><p>Content will be added here.</p>' },
      { title: 'Huffman Coding', order: 4, content: '<h2>Huffman Coding</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Dynamic Programming',
    order: 15,
    lessons: [
      { title: 'Introduction to DP', order: 1, content: '<h2>Introduction to DP</h2><p>Content will be added here.</p>' },
      { title: 'Memoization vs Tabulation', order: 2, content: '<h2>Memoization vs Tabulation</h2><p>Content will be added here.</p>' },
      { title: 'Fibonacci using DP', order: 3, content: '<h2>Fibonacci using DP</h2><p>Content will be added here.</p>' },
      { title: 'Knapsack Problem', order: 4, content: '<h2>Knapsack Problem</h2><p>Content will be added here.</p>' },
      { title: 'Longest Common Subsequence', order: 5, content: '<h2>Longest Common Subsequence</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Backtracking',
    order: 16,
    lessons: [
      { title: 'What is Backtracking', order: 1, content: '<h2>What is Backtracking</h2><p>Content will be added here.</p>' },
      { title: 'N-Queens Problem', order: 2, content: '<h2>N-Queens Problem</h2><p>Content will be added here.</p>' },
      { title: 'Sudoku Solver', order: 3, content: '<h2>Sudoku Solver</h2><p>Content will be added here.</p>' },
      { title: 'Subset Generation', order: 4, content: '<h2>Subset Generation</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Divide and Conquer',
    order: 17,
    lessons: [
      { title: 'Concept of Divide and Conquer', order: 1, content: '<h2>Concept of Divide and Conquer</h2><p>Content will be added here.</p>' },
      { title: 'Merge Sort', order: 2, content: '<h2>Merge Sort</h2><p>Content will be added here.</p>' },
      { title: 'Quick Sort', order: 3, content: '<h2>Quick Sort</h2><p>Content will be added here.</p>' },
      { title: 'Binary Search', order: 4, content: '<h2>Binary Search</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Advanced Data Structures',
    order: 18,
    lessons: [
      { title: 'Trie', order: 1, content: '<h2>Trie</h2><p>Content will be added here.</p>' },
      { title: 'Segment Tree', order: 2, content: '<h2>Segment Tree</h2><p>Content will be added here.</p>' },
      { title: 'Fenwick Tree', order: 3, content: '<h2>Fenwick Tree</h2><p>Content will be added here.</p>' },
      { title: 'Disjoint Set (Union-Find)', order: 4, content: '<h2>Disjoint Set (Union-Find)</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'DSA Problem Solving Techniques',
    order: 19,
    lessons: [
      { title: 'Two Pointers', order: 1, content: '<h2>Two Pointers</h2><p>Content will be added here.</p>' },
      { title: 'Sliding Window', order: 2, content: '<h2>Sliding Window</h2><p>Content will be added here.</p>' },
      { title: 'Prefix Sum', order: 3, content: '<h2>Prefix Sum</h2><p>Content will be added here.</p>' },
      { title: 'Bit Manipulation', order: 4, content: '<h2>Bit Manipulation</h2><p>Content will be added here.</p>' }
    ]
  },
  {
    title: 'Real-World Applications of DSA',
    order: 20,
    lessons: [
      { title: 'DSA in Web Development', order: 1, content: '<h2>DSA in Web Development</h2><p>Content will be added here.</p>' },
      { title: 'DSA in AI & ML', order: 2, content: '<h2>DSA in AI & ML</h2><p>Content will be added here.</p>' },
      { title: 'DSA in System Design', order: 3, content: '<h2>DSA in System Design</h2><p>Content will be added here.</p>' },
      { title: 'DSA in Competitive Programming', order: 4, content: '<h2>DSA in Competitive Programming</h2><p>Content will be added here.</p>' }
    ]
  }
];

async function addDSAMaterial() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const dsaMaterial = new StudyMaterial({
      title: 'Data Structures and Algorithms',
      description: 'Complete DSA course covering all fundamental and advanced topics',
      category: 'Computer Science',
      estimatedDuration: '60 hours',
      chapters: dsaChapters
    });

    await dsaMaterial.save();

    const totalLessons = dsaChapters.reduce((acc, ch) => acc + ch.lessons.length, 0);
    console.log(`Successfully created DSA with ${dsaChapters.length} chapters and ${totalLessons} lessons`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

addDSAMaterial();
