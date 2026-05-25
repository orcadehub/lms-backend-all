require("dotenv").config();
const mongoose = require("mongoose");
const QuizQuestion = require("./models/QuizQuestion");
const ProgrammingQuestion = require("./models/ProgrammingQuestion");
const Instructor = require("./models/Instructor");
const Tenant = require("./models/Tenant");

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  console.log("Connected to MongoDB.");

  const instructor = await Instructor.findOne({});
  const tenant = await Tenant.findOne({});

  if (!instructor || !tenant) {
    console.error("No instructor or tenant found.");
    process.exit(1);
  }

  const quizQuestions = [
    {
      title: "What is the worst-case time complexity of Bubble Sort?",
      topic: "Sorting Algorithms",
      options: [{ text: "O(n)" }, { text: "O(n log n)" }, { text: "O(n^2)" }, { text: "O(log n)" }],
      correctAnswer: 2,
      difficulty: "easy",
      tags: ["bubble-sort", "time-complexity"]
    },
    {
      title: "Which of the following sorting algorithms has the best average-case time complexity?",
      topic: "Sorting Algorithms",
      options: [{ text: "Bubble Sort" }, { text: "Selection Sort" }, { text: "Insertion Sort" }, { text: "Merge Sort" }],
      correctAnswer: 3,
      difficulty: "medium",
      tags: ["time-complexity", "sorting"]
    },
    {
      title: "In Binary Search, what is the prerequisite for the array?",
      topic: "Searching Algorithms",
      options: [{ text: "It must be sorted" }, { text: "It must be empty" }, { text: "It must contain unique elements" }, { text: "It must be unsorted" }],
      correctAnswer: 0,
      difficulty: "easy",
      tags: ["binary-search"]
    },
    {
      title: "What is the worst-case time complexity of Linear Search?",
      topic: "Searching Algorithms",
      options: [{ text: "O(1)" }, { text: "O(log n)" }, { text: "O(n)" }, { text: "O(n^2)" }],
      correctAnswer: 2,
      difficulty: "easy",
      tags: ["linear-search", "time-complexity"]
    },
    {
      title: "Which algorithm repeatedly finds the minimum element from the unsorted part and puts it at the beginning?",
      topic: "Sorting Algorithms",
      options: [{ text: "Bubble Sort" }, { text: "Insertion Sort" }, { text: "Selection Sort" }, { text: "Merge Sort" }],
      correctAnswer: 2,
      difficulty: "easy",
      tags: ["selection-sort"]
    },
    {
      title: "What is the best-case time complexity of Insertion Sort?",
      topic: "Sorting Algorithms",
      options: [{ text: "O(1)" }, { text: "O(log n)" }, { text: "O(n)" }, { text: "O(n^2)" }],
      correctAnswer: 2,
      difficulty: "medium",
      tags: ["insertion-sort", "time-complexity"]
    },
    {
      title: "How many comparisons are made in the worst-case scenario of a Binary Search on an array of size 32?",
      topic: "Searching Algorithms",
      options: [{ text: "32" }, { text: "16" }, { text: "5" }, { text: "6" }],
      correctAnswer: 3,
      difficulty: "medium",
      tags: ["binary-search", "time-complexity"]
    },
    {
      title: "Which sorting algorithm is an in-place comparison-based sorting algorithm?",
      topic: "Sorting Algorithms",
      options: [{ text: "Merge Sort" }, { text: "Quick Sort" }, { text: "Bubble Sort" }, { text: "Counting Sort" }],
      correctAnswer: 2,
      difficulty: "medium",
      tags: ["bubble-sort"]
    },
    {
      title: "If the target element is at the very end of an array of size N, which search is faster?",
      topic: "Searching Algorithms",
      options: [{ text: "Linear Search" }, { text: "Binary Search" }, { text: "Both take the same time" }, { text: "Cannot be determined" }],
      correctAnswer: 1,
      difficulty: "medium",
      tags: ["searching"]
    },
    {
      title: "What is the main disadvantage of Selection Sort?",
      topic: "Sorting Algorithms",
      options: [{ text: "It requires extra memory" }, { text: "It is not stable" }, { text: "Time complexity is O(n^2) even in the best case" }, { text: "It only works on integers" }],
      correctAnswer: 2,
      difficulty: "hard",
      tags: ["selection-sort"]
    },
    {
      title: "Which algorithmic paradigm does Binary Search follow?",
      topic: "Searching Algorithms",
      options: [{ text: "Greedy" }, { text: "Divide and Conquer" }, { text: "Dynamic Programming" }, { text: "Backtracking" }],
      correctAnswer: 1,
      difficulty: "medium",
      tags: ["binary-search"]
    },
    {
      title: "What is the space complexity of an iterative Binary Search?",
      topic: "Searching Algorithms",
      options: [{ text: "O(1)" }, { text: "O(log n)" }, { text: "O(n)" }, { text: "O(n^2)" }],
      correctAnswer: 0,
      difficulty: "medium",
      tags: ["binary-search", "space-complexity"]
    },
    {
      title: "In which scenario does Bubble Sort perform best?",
      topic: "Sorting Algorithms",
      options: [{ text: "When array is reverse sorted" }, { text: "When array is already sorted" }, { text: "When array has duplicate elements" }, { text: "When array is randomly shuffled" }],
      correctAnswer: 1,
      difficulty: "medium",
      tags: ["bubble-sort"]
    },
    {
      title: "Insertion sort is highly efficient for:",
      topic: "Sorting Algorithms",
      options: [{ text: "Large data sets" }, { text: "Reverse sorted arrays" }, { text: "Small or partially sorted arrays" }, { text: "Floating point numbers only" }],
      correctAnswer: 2,
      difficulty: "hard",
      tags: ["insertion-sort"]
    },
    {
      title: "What is the average case time complexity of Linear Search?",
      topic: "Searching Algorithms",
      options: [{ text: "O(1)" }, { text: "O(log n)" }, { text: "O(n)" }, { text: "O(n/2)" }],
      correctAnswer: 2,
      difficulty: "medium",
      tags: ["linear-search"]
    },
    {
      title: "Which of these sorting algorithms is considered stable by default?",
      topic: "Sorting Algorithms",
      options: [{ text: "Selection Sort" }, { text: "Quick Sort" }, { text: "Insertion Sort" }, { text: "Heap Sort" }],
      correctAnswer: 2,
      difficulty: "hard",
      tags: ["insertion-sort", "stable-sort"]
    },
    {
      title: "How many swaps are made in the best case of Selection Sort for an array of size N?",
      topic: "Sorting Algorithms",
      options: [{ text: "0" }, { text: "N" }, { text: "N-1" }, { text: "O(N^2)" }],
      correctAnswer: 0,
      difficulty: "hard",
      tags: ["selection-sort"]
    },
    {
      title: "Which sorting algorithm works by continuously swapping adjacent elements if they are in the wrong order?",
      topic: "Sorting Algorithms",
      options: [{ text: "Selection Sort" }, { text: "Insertion Sort" }, { text: "Bubble Sort" }, { text: "Merge Sort" }],
      correctAnswer: 2,
      difficulty: "easy",
      tags: ["bubble-sort"]
    },
    {
      title: "If an array is implemented as a linked list, which search algorithm is most appropriate?",
      topic: "Searching Algorithms",
      options: [{ text: "Binary Search" }, { text: "Linear Search" }, { text: "Interpolation Search" }, { text: "Jump Search" }],
      correctAnswer: 1,
      difficulty: "hard",
      tags: ["linear-search", "data-structures"]
    },
    {
      title: "The number of passes required to sort an array of size N using Bubble Sort is at most:",
      topic: "Sorting Algorithms",
      options: [{ text: "N" }, { text: "N-1" }, { text: "N/2" }, { text: "log N" }],
      correctAnswer: 1,
      difficulty: "medium",
      tags: ["bubble-sort"]
    }
  ];

  const dbQuizQuestions = quizQuestions.map(q => ({
    ...q,
    language: "general",
    tenant: tenant._id,
    createdBy: instructor._id
  }));

  const insertedQuiz = await QuizQuestion.insertMany(dbQuizQuestions);
  console.log(`Inserted ${insertedQuiz.length} quiz questions.`);

  const programmingQuestions = [
    {
      title: "Median of Two Sorted Arrays",
      description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be O(log (m+n)).",
      difficulty: "Hard",
      constraints: [
        "nums1.length == m",
        "nums2.length == n",
        "0 <= m <= 1000",
        "0 <= n <= 1000",
        "1 <= m + n <= 2000",
        "-10^6 <= nums1[i], nums2[i] <= 10^6"
      ],
      testCases: [
        { input: { nums1: [1, 3], nums2: [2] }, output: 2.0, explanation: "merged array = [1,2,3] and median is 2.", isPublic: true },
        { input: { nums1: [1, 2], nums2: [3, 4] }, output: 2.5, explanation: "merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.", isPublic: true },
        { input: { nums1: [0, 0], nums2: [0, 0] }, output: 0.0, explanation: "All zeros", isPublic: false }
      ],
      tags: ["binary-search", "arrays", "hard"],
      assessmentType: "programming",
      example: {
        input: 'nums1 = [1,3], nums2 = [2]',
        output: '2.00000',
        explanation: 'merged array = [1,2,3] and median is 2.'
      },
      intuition: {
        approach: "Use Binary Search to partition the two arrays into two halves of equal length. We binary search on the smaller array to find the correct partition point where elements on the left are smaller than elements on the right.",
        timeComplexity: "O(log(min(m, n)))",
        spaceComplexity: "O(1)",
        keyInsights: ["Binary search on the smaller array", "Partitioning logic"],
        algorithmSteps: ["Ensure nums1 is the smaller array", "Define low and high pointers", "Calculate cuts and check boundary conditions", "Adjust binary search window"]
      },
      topic: "Binary Search",
      isActive: true,
      createdBy: instructor._id
    },
    {
      title: "Minimum Window Substring",
      description: "Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string \"\".",
      difficulty: "Hard",
      constraints: [
        "m == s.length",
        "n == t.length",
        "1 <= m, n <= 10^5",
        "s and t consist of uppercase and lowercase English letters."
      ],
      testCases: [
        { input: { s: "ADOBECODEBANC", t: "ABC" }, output: "BANC", explanation: "The minimum window substring BANC includes A, B, and C from string t.", isPublic: true },
        { input: { s: "a", t: "a" }, output: "a", explanation: "The entire string s is the minimum window.", isPublic: true },
        { input: { s: "a", t: "aa" }, output: "", explanation: "Both as from t must be included in the window.", isPublic: false }
      ],
      tags: ["sliding-window", "hashmap", "strings", "hard"],
      assessmentType: "programming",
      example: {
        input: 's = "ADOBECODEBANC", t = "ABC"',
        output: '"BANC"',
        explanation: 'The minimum window substring "BANC" includes A, B, and C from string t.'
      },
      intuition: {
        approach: "Use a Hashmap to keep track of characters in t. Use a sliding window with two pointers (left and right) over string s to find the minimum window that satisfies the character requirements.",
        timeComplexity: "O(m + n)",
        spaceComplexity: "O(1)",
        keyInsights: ["Sliding window technique", "Hashmap for character frequency tracking", "Expand right and contract left"],
        algorithmSteps: ["Initialize character map for string t", "Move right pointer to expand window", "When valid window found, update min length", "Move left pointer to shrink window and find smaller valid window"]
      },
      topic: "Sliding Window",
      isActive: true,
      createdBy: instructor._id
    }
  ];

  const insertedProg = await ProgrammingQuestion.insertMany(programmingQuestions);
  console.log(`Inserted ${insertedProg.length} programming questions.`);

  process.exit();
}).catch(console.error);
