const mongoose = require('mongoose');
require('dotenv').config({ path: 'be/.env' }); // Load env relative to where script might run from

const QuizQuestion = require('../models/QuizQuestion');
const Instructor = require('../models/Instructor');

async function run() {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lms';
  console.log('Connecting to database...', mongoURI);
  await mongoose.connect(mongoURI, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000
  });
  console.log('Database connected!');

  try {
    const instructor = await Instructor.findOne();
    if (!instructor) {
      console.log('No instructor found. Please create one first.');
      process.exit(1);
    }

    let tenantId = instructor.assignedTenants && instructor.assignedTenants.length > 0
      ? instructor.assignedTenants[0]
      : null;

    if (!tenantId) {
      const Tenant = mongoose.model('Tenant') || require('../models/Tenant');
      const fallbackTenant = await Tenant.findOne();
      if (fallbackTenant) tenantId = fallbackTenant._id;
    }

    const createdById = instructor._id;

    const questions = [
      {
        title: 'Which data structure is best suited to represent hierarchical relationships like file systems?',
        options: [
          { text: 'Array', image: '' },
          { text: 'Linked List', image: '' },
          { text: 'Tree', image: '' },
          { text: 'Stack', image: '' }
        ],
        correctAnswer: 2,
        topic: 'Trees - Basics',
        tags: ['java', 'trees', 'data-structures'],
        difficulty: 'easy',
        language: 'java'
      },
      {
        title: 'In Java, how is a generic Binary Tree node typically represented?',
        options: [
          { text: 'class Node { int data; Node next; }', image: '' },
          { text: 'class Node { int data; Node left, right; }', image: '' },
          { text: 'class Node { int data; List<Node> children; }', image: '' },
          { text: 'class Node { int data; Node previous, next; }', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Trees - Implementation',
        tags: ['java', 'trees', 'binary-tree', 'code-snippet'],
        difficulty: 'easy',
        language: 'java'
      },
      {
        title: 'Which Depth-First Search (DFS) traversal visits the root node first, then the left subtree, and finally the right subtree?',
        options: [
          { text: 'Inorder', image: '' },
          { text: 'Preorder', image: '' },
          { text: 'Postorder', image: '' },
          { text: 'Level Order', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Tree Traversal - DFS',
        tags: ['java', 'trees', 'dfs', 'preorder'],
        difficulty: 'easy',
        language: 'java'
      },
      {
        title: 'What is the output of an Inorder traversal on a valid Binary Search Tree (BST)?',
        options: [
          { text: 'Elements in descending order', image: '' },
          { text: 'Elements in random order', image: '' },
          { text: 'Elements in ascending (sorted) order', image: '' },
          { text: 'The root element followed by leaves', image: '' }
        ],
        correctAnswer: 2,
        topic: 'Tree Traversal - DFS',
        tags: ['java', 'trees', 'inorder', 'bst'],
        difficulty: 'medium',
        language: 'java'
      },
      {
        title: 'Consider this traversal method:\n\nvoid traverse(Node node) {\n    if (node == null) return;\n    traverse(node.left);\n    traverse(node.right);\n    System.out.print(node.data + " ");\n}\n\nWhich traversal is this?',
        options: [
          { text: 'Preorder', image: '' },
          { text: 'Inorder', image: '' },
          { text: 'Postorder', image: '' },
          { text: 'Level Order', image: '' }
        ],
        correctAnswer: 2,
        topic: 'Tree Traversal - DFS',
        tags: ['java', 'trees', 'postorder', 'code-snippet'],
        difficulty: 'medium',
        language: 'java'
      },
      {
        title: 'What data structure is commonly used to implement Breadth-First Search (Level Order Traversal) iteratively in a Tree?',
        options: [
          { text: 'Stack', image: '' },
          { text: 'Queue', image: '' },
          { text: 'PriorityQueue', image: '' },
          { text: 'HashMap', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Tree Traversal - BFS',
        tags: ['java', 'trees', 'bfs', 'level-order'],
        difficulty: 'medium',
        language: 'java'
      },
      {
        title: 'Complete the BFS traversal code in Java:\n\nQueue<Node> q = new LinkedList<>();\nq.add(root);\nwhile (!q.isEmpty()) {\n    Node curr = /* ? */;\n    System.out.print(curr.data);\n    if (curr.left != null) q.add(curr.left);\n    if (curr.right != null) q.add(curr.right);\n}',
        options: [
          { text: 'q.pop()', image: '' },
          { text: 'q.peek()', image: '' },
          { text: 'q.removeLast()', image: '' },
          { text: 'q.poll()', image: '' }
        ],
        correctAnswer: 3,
        topic: 'Tree Traversal - BFS',
        tags: ['java', 'trees', 'bfs', 'code-snippet'],
        difficulty: 'medium',
        language: 'java'
      },
      {
        title: 'What property must hold true for every node in a Binary Search Tree (BST)?',
        options: [
          { text: 'Left child > Node > Right child', image: '' },
          { text: 'Left child < Node < Right child', image: '' },
          { text: 'Both children must be smaller than the Node', image: '' },
          { text: 'The tree must be perfectly balanced at all times', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Binary Search Tree',
        tags: ['java', 'bst', 'trees'],
        difficulty: 'easy',
        language: 'java'
      },
      {
        title: 'What is the average time complexity of searching for an element in a Binary Search Tree?',
        options: [
          { text: 'O(1)', image: '' },
          { text: 'O(n)', image: '' },
          { text: 'O(log n)', image: '' },
          { text: 'O(n log n)', image: '' }
        ],
        correctAnswer: 2,
        topic: 'Binary Search Tree',
        tags: ['java', 'bst', 'time-complexity'],
        difficulty: 'medium',
        language: 'java'
      },
      {
        title: 'What is the worst-case time complexity of searching in a severely unbalanced (skewed) Binary Search Tree?',
        options: [
          { text: 'O(1)', image: '' },
          { text: 'O(log n)', image: '' },
          { text: 'O(n)', image: '' },
          { text: 'O(n^2)', image: '' }
        ],
        correctAnswer: 2,
        topic: 'Binary Search Tree',
        tags: ['java', 'bst', 'time-complexity'],
        difficulty: 'medium',
        language: 'java'
      },
      {
        title: 'Which of the following Java snippets correctly finds the minimum value in a Binary Search Tree?',
        options: [
          { text: 'while (node.right != null) node = node.right; return node.data;', image: '' },
          { text: 'while (node.left != null) node = node.left; return node.data;', image: '' },
          { text: 'if (node == null) return -1; return Math.min(node.left.data, node.right.data);', image: '' },
          { text: 'return node.data;', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Binary Search Tree',
        tags: ['java', 'bst', 'code-snippet'],
        difficulty: 'medium',
        language: 'java'
      },
      {
        title: 'When deleting a node with two children from a BST, which node can be used as its replacement to maintain the BST property?',
        options: [
          { text: 'The root of the tree', image: '' },
          { text: 'Any leaf node in the tree', image: '' },
          { text: 'The Inorder Successor (smallest node in the right subtree)', image: '' },
          { text: 'The node\'s immediate left child', image: '' }
        ],
        correctAnswer: 2,
        topic: 'Binary Search Tree',
        tags: ['java', 'bst', 'deletion'],
        difficulty: 'hard',
        language: 'java'
      },
      {
        title: 'An AVL tree is a self-balancing binary search tree. What is the maximum allowed difference between the heights of the left and right subtrees (Balance Factor) for any node?',
        options: [
          { text: '0', image: '' },
          { text: '1', image: '' },
          { text: '2', image: '' },
          { text: 'log(n)', image: '' }
        ],
        correctAnswer: 1,
        topic: 'AVL Trees',
        tags: ['java', 'avl', 'trees', 'balancing'],
        difficulty: 'medium',
        language: 'java'
      },
      {
        title: 'In an AVL tree, if a node becomes unbalanced after an insertion in the LEFT subtree of its LEFT child (Left-Left case), which rotation is required to rebalance?',
        options: [
          { text: 'Left Rotation', image: '' },
          { text: 'Right Rotation', image: '' },
          { text: 'Left-Right Rotation', image: '' },
          { text: 'Right-Left Rotation', image: '' }
        ],
        correctAnswer: 1,
        topic: 'AVL Trees',
        tags: ['java', 'avl', 'rotations'],
        difficulty: 'hard',
        language: 'java'
      },
      {
        title: 'What is the time complexity of insertion and deletion operations in an AVL Tree?',
        options: [
          { text: 'O(1)', image: '' },
          { text: 'O(log n)', image: '' },
          { text: 'O(n)', image: '' },
          { text: 'O(n log n)', image: '' }
        ],
        correctAnswer: 1,
        topic: 'AVL Trees',
        tags: ['java', 'avl', 'time-complexity'],
        difficulty: 'medium',
        language: 'java'
      },
      {
        title: 'Given the preorder traversal `[1, 2, 4, 5, 3]` and inorder traversal `[4, 2, 5, 1, 3]` of a binary tree, what is the root of the tree?',
        options: [
          { text: '4', image: '' },
          { text: '2', image: '' },
          { text: '1', image: '' },
          { text: '3', image: '' }
        ],
        correctAnswer: 2,
        topic: 'Trees - Construction',
        tags: ['java', 'trees', 'traversals'],
        difficulty: 'hard',
        language: 'java'
      },
      {
        title: 'What is the maximum number of nodes at level `L` in a binary tree? (Assume the root is at level 0)',
        options: [
          { text: '2 * L', image: '' },
          { text: '2^L', image: '' },
          { text: '2^(L+1) - 1', image: '' },
          { text: 'L^2', image: '' }
        ],
        correctAnswer: 1,
        topic: 'Trees - Properties',
        tags: ['java', 'trees', 'math'],
        difficulty: 'medium',
        language: 'java'
      },
      {
        title: 'What does the following Java method compute?\n\nint compute(Node root) {\n    if (root == null) return 0;\n    return 1 + Math.max(compute(root.left), compute(root.right));\n}',
        options: [
          { text: 'The number of leaf nodes', image: '' },
          { text: 'The total number of nodes', image: '' },
          { text: 'The sum of all node values', image: '' },
          { text: 'The maximum depth (height) of the tree', image: '' }
        ],
        correctAnswer: 3,
        topic: 'Trees - Algorithms',
        tags: ['java', 'trees', 'recursion', 'code-snippet'],
        difficulty: 'medium',
        language: 'java'
      },
      {
        title: 'Which rotation is performed in an AVL tree for a Right-Left (RL) unbalance case?',
        options: [
          { text: 'A single Left Rotation', image: '' },
          { text: 'A single Right Rotation', image: '' },
          { text: 'A Right rotation on the right child, followed by a Left rotation on the unbalanced node', image: '' },
          { text: 'A Left rotation on the left child, followed by a Right rotation on the unbalanced node', image: '' }
        ],
        correctAnswer: 2,
        topic: 'AVL Trees',
        tags: ['java', 'avl', 'rotations'],
        difficulty: 'hard',
        language: 'java'
      },
      {
        title: 'In Java, what happens if you try to access `node.left.data` when `node.left` is `null`?',
        options: [
          { text: 'It returns 0', image: '' },
          { text: 'It returns null', image: '' },
          { text: 'It throws a NullPointerException', image: '' },
          { text: 'It throws an ArrayIndexOutOfBoundsException', image: '' }
        ],
        correctAnswer: 2,
        topic: 'Trees - Implementation',
        tags: ['java', 'trees', 'exceptions'],
        difficulty: 'easy',
        language: 'java'
      }
    ];

    const questionsWithMeta = questions.map(q => ({
      ...q,
      tenant: tenantId,
      createdBy: createdById
    }));

    const result = await QuizQuestion.insertMany(questionsWithMeta);
    console.log(`\n✅ Successfully inserted ${result.length} Non-Linear DS (Trees) quiz questions!`);
    
    mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('Error seeding questions:', err);
    process.exit(1);
  }
}

run();
