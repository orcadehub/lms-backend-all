require('dotenv').config();
const mongoose = require('mongoose');
const AssessmentQuestion = require('../models/AssessmentQuestion'); // Updated model
const Instructor = require('../models/Instructor');

const questions = [
  // --- SET 1 ---
  {
    title: "Array Concatenation Mastery",
    description: "Given an integer array `nums` of length `n`, create an array `ans` of length `2n` where `ans[i] == nums[i]` and `ans[i + n] == nums[i]` for `0 <= i < n`. This is a core fundamental exercise for beginners to understand how to handle array doubling and data mapping. The challenge lies in ensuring a single-pass solution that is both space and time efficient. Mastering this enables deeper understanding of buffer management and collection transformations which are critical in low-level system design.",
    difficulty: "Easy",
    constraints: ["1 <= nums.length <= 1000", "1 <= nums[i] <= 1000"],
    topic: "Arrays",
    assessmentType: "programming",
    tags: ["Arrays", "Basics", "Set1"],
    example: { input: "1 2 1", output: "1 2 1 1 2 1", explanation: "Concatenating [1,2,1] with [1,2,1] results in [1,2,1,1,2,1]." },
    intuition: { approach: "Allocate 2n space and copy once.", timeComplexity: "O(n)", spaceComplexity: "O(n)", keyInsights: ["Index mapping i and i+n"], algorithmSteps: ["Read n", "Loop once", "Return ans"] },
    testCases: [
      { input: "1 2 1", output: "1 2 1 1 2 1", isPublic: true, explanation: "Standard case" },
      { input: "1 3 2 1", output: "1 3 2 1 1 3 2 1", isPublic: true },
      { input: "4", output: "4 4", isPublic: true },
      { input: "5 5 5", output: "5 5 5 5 5 5", isPublic: false },
      { input: "1 1 1 1 1", output: "1 1 1 1 1 1 1 1 1 1", isPublic: false },
      { input: "10 20", output: "10 20 10 20", isPublic: false },
      { input: "9 8 7 6", output: "9 8 7 6 9 8 7 6", isPublic: false },
      { input: "1 2 3 4 5", output: "1 2 3 4 5 1 2 3 4 5", isPublic: false },
      { input: "100", output: "100 100", isPublic: false },
      { input: "0 0 0", output: "0 0 0 0 0 0", isPublic: false }
    ]
  },
  {
    title: "Array Rotation by K Steps",
    description: "Rotate an array to the right by `k` steps, where `k` is non-negative. This problem tests your ability to think beyond naïve shifts. An optimized solution using the 'Reverse' technique is recommended—reversing the entire array, then the first `k` elements, and then the rest. This demonstrates index manipulation and is standard in performance-critical software where buffer rotations are common.",
    difficulty: "Medium",
    constraints: ["1 <= nums.length <= 10^5", "0 <= k <= 10^5"],
    topic: "Arrays",
    assessmentType: "programming",
    tags: ["Arrays", "Two Pointers", "Set1"],
    example: { input: "3\n1 2 3 4 5 6 7", output: "5 6 7 1 2 3 4", explanation: "Array rotated by 3 steps." },
    intuition: { approach: "Use triple reverse technique.", timeComplexity: "O(n)", spaceComplexity: "O(1)", keyInsights: ["k = k % n"], algorithmSteps: ["Reverse all", "Reverse first k", "Reverse remaining"] },
    testCases: [
      { input: "3\n1 2 3 4 5 6 7", output: "5 6 7 1 2 3 4", isPublic: true },
      { input: "2\n-1 -100 3 99", output: "3 99 -1 -100", isPublic: true },
      { input: "0\n1 2 3", output: "1 2 3", isPublic: true },
      { input: "4\n1 2", output: "1 2", isPublic: false },
      { input: "1\n1 2 3 4 5", output: "5 1 2 3 4", isPublic: false },
      { input: "5\n1 2 3 4 5", output: "1 2 3 4 5", isPublic: false },
      { input: "2\n1 2 3", output: "2 3 1", isPublic: false },
      { input: "3\n1 2", output: "2 1", isPublic: false },
      { input: "10\n1", output: "1", isPublic: false },
      { input: "7\n1 2 3 4 5 6 7 8 9 10", output: "4 5 6 7 8 9 10 1 2 3", isPublic: false }
    ]
  },
  {
    title: "Find All Duplicates (Constant Space)",
    description: "Given an integer array `nums` where each integer appears once or twice, return all that appear twice. You must write an algorithm that runs in $O(n)$ time and uses only constant extra space. This problem uses the 'Array as its own Hash Map' technique, where you use the index to mark visitation by negating the value at that index. It is a masterpiece of logic that tests your ability to manipulate data without relying on bulky external structures.",
    difficulty: "Medium",
    constraints: ["n == nums.length", "1 <= n <= 10^5", "1 <= nums[i] <= n"],
    topic: "Arrays",
    assessmentType: "programming",
    tags: ["Arrays", "Hashmap", "Set1"],
    example: { input: "4 3 2 7 8 2 3 1", output: "2 3", explanation: "2 and 3 appear twice." },
    intuition: { approach: "Use indices as markers by negating values.", timeComplexity: "O(n)", spaceComplexity: "O(1)", keyInsights: ["Relative indexing"], algorithmSteps: ["Iterate", "Mark index abs(val)-1 negative", "If already negative, add to result"] },
    testCases: [
      { input: "4 3 2 7 8 2 3 1", output: "2 3", isPublic: true },
      { input: "1 1 2", output: "1", isPublic: true },
      { input: "1", output: "", isPublic: true },
      { input: "2 2", output: "2", isPublic: false },
      { input: "1 2 3", output: "", isPublic: false },
      { input: "1 2 1 2", output: "1 2", isPublic: false },
      { input: "3 3 1 2 1", output: "3 1", isPublic: false },
      { input: "4 4 4 4", output: "4", isPublic: false },
      { input: "5 4 3 2 1", output: "", isPublic: false },
      { input: "2 1 2 1 3", output: "2 1", isPublic: false }
    ]
  },
  {
    title: "Clockwise Spiral Matrix II",
    description: "Given a positive integer `n`, generate an `n x n` matrix filled with elements from 1 to $n^2$ in spiral order. This is a classic test of algorithmic precision and index management. You must maintain 4 boundaries (top, bottom, left, right) and fill the matrix layer by layer. This problem is excellent for practicing nested loops and state-dependent logic in 2D space, which is foundational for graphics programming.",
    difficulty: "Hard",
    constraints: ["1 <= n <= 20"],
    topic: "Matrix",
    assessmentType: "programming",
    tags: ["Matrix", "Simulation", "Set1"],
    example: { input: "3", output: "1 2 3\n8 9 4\n7 6 5", explanation: "Spiral filling of a 3x3 matrix." },
    intuition: { approach: "Iterate with 4 boundary pointers.", timeComplexity: "O(n^2)", spaceComplexity: "O(n^2)", keyInsights: ["Boundary contraction"], algorithmSteps: ["Initialize matrix", "Fill while counter <= n*n", "Update boundaries"] },
    testCases: [
      { input: "1", output: "1", isPublic: true },
      { input: "2", output: "1 2\n4 3", isPublic: true },
      { input: "3", output: "1 2 3\n8 9 4\n7 6 5", isPublic: true },
      { input: "4", output: "1 2 3 4\n12 13 14 5\n11 16 15 6\n10 9 8 7", isPublic: false },
      { input: "5", output: "1 2 3 4 5\n16 17 18 19 6\n15 24 25 20 7\n14 23 22 21 8\n13 12 11 10 9", isPublic: false },
      { input: "2", output: "1 2\n4 3", isPublic: false },
      { input: "1", output: "1", isPublic: false },
      { input: "3", output: "1 2 3\n8 9 4\n7 6 5", isPublic: false },
      { input: "4", output: "1 2 3 4\n12 13 14 5\n11 16 15 6\n10 9 8 7", isPublic: false },
      { input: "2", output: "1 2\n4 3", isPublic: false }
    ]
  },

  // --- SET 2 ---
  {
    title: "Reverse Word Ordering",
    description: "Given a string `s`, reverse each word individually while preserving whitespace and original word sequence. For example, 'God Ding' becomes 'doG gniD'. This problem tests string parsing and local reversal. It's vital for text processing tasks like search query cleaning and document formatting. Mastery ensures efficiency with immutable string handling.",
    difficulty: "Easy",
    constraints: ["1 <= s.length <= 5 * 10^4", "s contains printable ASCII characters."],
    topic: "Strings",
    assessmentType: "programming",
    tags: ["Strings", "Set2"],
    example: { input: "God Ding", output: "doG gniD", explanation: "Words are reversed separately." },
    intuition: { approach: "Split by space then reverse each word.", timeComplexity: "O(n)", spaceComplexity: "O(n)", keyInsights: ["Preserve whitespace"], algorithmSteps: ["Split tokens", "Reverse each", "Join"] },
    testCases: [
      { input: "God Ding", output: "doG gniD", isPublic: true },
      { input: "Hello World", output: "olleH dlroW", isPublic: true },
      { input: "A", output: "A", isPublic: true },
      { input: "I love coding", output: "I evol gnidoc", isPublic: false },
      { input: "DSA is fun", output: "ASD si nuf", isPublic: false },
      { input: "Racecar", output: "racecaR", isPublic: false },
      { input: "Try hard", output: "yrT drah", isPublic: false },
      { input: "One two three", output: "enO owt eerht", isPublic: false },
      { input: "Quick brown fox", output: "kciuQ nworb xof", isPublic: false },
      { input: "Go", output: "oG", isPublic: false }
    ]
  },
  {
    title: "Parentheses Validation Logic",
    description: "Determine if parentheses '()', '{}', '[]' are closed correctly. Brackets must close in sequence. This problem uses a 'Stack' (LIFO) and is critical for compilers and syntax highlighters. Understanding stack-based balancing is a prerequisite for more advanced parser design and expression evaluation projects.",
    difficulty: "Medium",
    constraints: ["1 <= s.length <= 10^4"],
    topic: "Stacks",
    assessmentType: "programming",
    tags: ["Stacks", "Set2"],
    example: { input: "()[]{}", output: "true", explanation: "All types balanced." },
    intuition: { approach: "Use stack to store opening brackets.", timeComplexity: "O(n)", spaceComplexity: "O(n)", keyInsights: ["Match top of stack"], algorithmSteps: ["Iterate", "Push opening", "Pop and verify on closing"] },
    testCases: [
      { input: "()", output: "true", isPublic: true },
      { input: "()[]{}", output: "true", isPublic: true },
      { input: "(]", output: "false", isPublic: true },
      { input: "([)]", output: "false", isPublic: false },
      { input: "{[]}", output: "true", isPublic: false },
      { input: "(", output: "false", isPublic: false },
      { input: "]", output: "false", isPublic: false },
      { input: "{()}", output: "true", isPublic: false },
      { input: "((()))", output: "true", isPublic: false },
      { input: "[{()}]", output: "true", isPublic: false }
    ]
  },
  {
    title: "Longest Palindromic Pattern",
    description: "Find the longest substring that reads the same forward and backward. This evaluates 'Expand from Center' or DP efficiency. It's a standard string processing question that bridges simple character checks with complex window management. Crucial for bioinformatics and data deduplication applications.",
    difficulty: "Medium",
    constraints: ["1 <= s.length <= 1000"],
    topic: "Strings",
    assessmentType: "programming",
    tags: ["Strings", "DP", "Set2"],
    example: { input: "babad", output: "bab", explanation: "Longest palindrome." },
    intuition: { approach: "Expand from characters center point.", timeComplexity: "O(n^2)", spaceComplexity: "O(1)", keyInsights: ["Odd/Even centers"], algorithmSteps: ["For each char", "Expand odd", "Expand even", "Track max"] },
    testCases: [
      { input: "babad", output: "bab", isPublic: true },
      { input: "cbbd", output: "bb", isPublic: true },
      { input: "a", output: "a", isPublic: true },
      { input: "ac", output: "a", isPublic: false },
      { input: "racecar", output: "racecar", isPublic: false },
      { input: "abacaba", output: "abacaba", isPublic: false },
      { input: "bb", output: "bb", isPublic: false },
      { input: "abcde", output: "a", isPublic: false },
      { input: "noon", output: "noon", isPublic: false },
      { input: "abcdefgfedcba", output: "abcdefgfedcba", isPublic: false }
    ]
  },
  {
    title: "Word Presence DFS",
    description: "Check if a word exists in a character grid using adjacent steps. Cells cannot be reused. This tests 'Backtracking' and 'DFS' (Depth First Search) precision. Navigating a grid and maintaining visitor state is fundamental for AI and graph theory. Crucial for grid-based game development and pathfinding optimizations.",
    difficulty: "Hard",
    constraints: ["1 <= m, n <= 6", "1 <= word.length <= 15"],
    topic: "Matrix",
    assessmentType: "programming",
    tags: ["Matrix", "DFS", "Backtracking", "Set2"],
    example: { input: "2 2\na b\nc d\nabdc", output: "true", explanation: "Word found in grid." },
    intuition: { approach: "DFS with backtracking marker.", timeComplexity: "O(m*n*4^L)", spaceComplexity: "O(L)", keyInsights: ["Backtrack marking"], algorithmSteps: ["Iterate grid", "Start DFS on match", "Unmark on exit", "Return found status"] },
    testCases: [
      { input: "3 4\nA B C E\nS F C S\nA D E E\nABCCED", output: "true", isPublic: true },
      { input: "3 4\nA B C E\nS F C S\nA D E E\nSEE", output: "true", isPublic: true },
      { input: "3 4\nA B C E\nS F C S\nA D E E\nABCB", output: "false", isPublic: true },
      { input: "2 2\na b\nc d\nabdc", output: "true", isPublic: false },
      { input: "2 2\na b\nc d\nabcd", output: "false", isPublic: false },
      { input: "1 1\na\na", output: "true", isPublic: false },
      { input: "1 1\na\nb", output: "false", isPublic: false },
      { input: "3 3\na a a\na a a\na a a\naaaaaaaaa", output: "true", isPublic: false },
      { input: "2 3\na b c\nd e f\nabcfed", output: "true", isPublic: false },
      { input: "2 3\na b c\nd e f\nadf", output: "false", isPublic: false }
    ]
  },

  // --- SET 3 ---
  {
    title: "Zero Element Management",
    description: "Move all 0's to the end of an array in-place while keeping relative order of other elements. No extra array allowed. This evaluates the 'Two Pointer' approach efficiently and is a standard data processing task for sanitizing input pipelines and organizing sparse data structures without memory overhead.",
    difficulty: "Easy",
    constraints: ["1 <= nums.length <= 10^4"],
    topic: "Arrays",
    assessmentType: "programming",
    tags: ["Arrays", "Two Pointers", "Set3"],
    example: { input: "0 1 0 3 12", output: "1 3 12 0 0", explanation: "0s shifted right." },
    intuition: { approach: "Write pointer for non-zeros.", timeComplexity: "O(n)", spaceComplexity: "O(1)", keyInsights: ["In-place swap"], algorithmSteps: ["Loop nums", "If non-zero, swap to write_pos", "Inc write_pos"] },
    testCases: [
      { input: "0 1 0 3 12", output: "1 3 12 0 0", isPublic: true },
      { input: "0", output: "0", isPublic: true },
      { input: "1 0", output: "1 0", isPublic: true },
      { input: "0 0 1", output: "1 0 0", isPublic: false },
      { input: "1 2 3", output: "1 2 3", isPublic: false },
      { input: "0 0 0", output: "0 0 0", isPublic: false },
      { input: "4 5 0 0 6", output: "4 5 6 0 0", isPublic: false },
      { input: "0 9 0", output: "9 0 0", isPublic: false },
      { input: "10 0 20 0 30", output: "10 20 30 0 0", isPublic: false },
      { input: "1 0 0 0", output: "1 0 0 0", isPublic: false }
    ]
  },
  {
    title: "Target Sum in Sorted Data",
    description: "Find two indices in a sorted array that sum to a target value. Must use O(1) space. The sorted property allows a highly efficient two-pointer convergence. This is an industry-standard optimization question that highlights the importance of leveraging data properties like sorting to improve algorithmic runtime.",
    difficulty: "Medium",
    constraints: ["Numbers are sorted.", "O(1) extra space required."],
    topic: "Two Pointers",
    assessmentType: "programming",
    tags: ["Arrays", "Two Pointers", "Set3"],
    example: { input: "9\n2 7 11 15", output: "1 2", explanation: "2+7=9 (index 1 and 2)." },
    intuition: { approach: "Left and Right pointers moving inward.", timeComplexity: "O(n)", spaceComplexity: "O(1)", keyInsights: ["Leverage sorted order"], algorithmSteps: ["L=0, R=end", "Check sum", "Adjust L or R pin"] },
    testCases: [
      { input: "9\n2 7 11 15", output: "1 2", isPublic: true },
      { input: "6\n2 3 4", output: "1 3", isPublic: true },
      { input: "-1\n-1 0", output: "1 2", isPublic: true },
      { input: "10\n1 2 3 4 5 6", output: "4 6", isPublic: false },
      { input: "0\n-3 0 3 4", output: "1 3", isPublic: false },
      { input: "100\n10 20 30 70", output: "3 4", isPublic: false },
      { input: "5\n2 3", output: "1 2", isPublic: false },
      { input: "20\n5 10 15 20", output: "1 3", isPublic: false },
      { input: "8\n1 2 3 4 5", output: "3 5", isPublic: false },
      { input: "7\n1 2 3 4", output: "3 4", isPublic: false }
    ]
  },
  {
    title: "Count Sliding Subarrays",
    description: "Count subarrays with product strictly less than K. Uses 'Sliding Window' logic where window size (R-L+1) represents the number of valid subarrays ending at the right pointer. This is an advanced counting problem that requires perfect management of window state and mathematical subset counting.",
    difficulty: "Medium",
    constraints: ["1 <= nums.length <= 3 * 10^4", "0 <= k <= 10^6"],
    topic: "Sliding Window",
    assessmentType: "programming",
    tags: ["Arrays", "Sliding Window", "Set3"],
    example: { input: "100\n10 5 2 6", output: "8", explanation: "All 8 subarrays found." },
    intuition: { approach: "Sliding window product.", timeComplexity: "O(n)", spaceComplexity: "O(1)", keyInsights: ["Window size adds to result"], algorithmSteps: ["Expand R", "Shrink L if product > k", "res += window_size"] },
    testCases: [
      { input: "100\n10 5 2 6", output: "8", isPublic: true },
      { input: "0\n1 2 3", output: "0", isPublic: true },
      { input: "1\n1 1 1", output: "0", isPublic: true },
      { input: "10\n1 2 3", output: "6", isPublic: false },
      { input: "5\n1 2 3 4", output: "6", isPublic: false },
      { input: "10\n2 4 8", output: "3", isPublic: false },
      { input: "100\n1 1 1", output: "6", isPublic: false },
      { input: "20\n10 5 2", output: "2", isPublic: false },
      { input: "50\n5 10 2 1", output: "8", isPublic: false },
      { input: "15\n1 2 3 4 5", output: "9", isPublic: false }
    ]
  },
  {
    title: "In-place Matrix Zeroing",
    description: "Set matrix rows/columns to zero if any element is zero. Must use O(1) space. Use the first row/column as metadata storage to avoid extra allocation. This is a rigorous memory-optimization challenge requiring state management within the same data structure, crucial for high-performance computing.",
    difficulty: "Hard",
    constraints: ["In-place modification only.", "O(1) extra space total."],
    topic: "Matrix",
    assessmentType: "programming",
    tags: ["Matrix", "Optimization", "Set3"],
    example: { input: "3 3\n1 0 1\n1 1 1\n1 1 1", output: "0 0 0\n1 0 1\n1 0 1", explanation: "Correctly zeroed." },
    intuition: { approach: "Use first row/col as bit-flags.", timeComplexity: "O(m*n)", spaceComplexity: "O(1)", keyInsights: ["First row overlap"], algorithmSteps: ["Seal flags for row0/col0", "Iterate others to mark", "Zero based on marks", "Zero row0/col0 if seeded"] },
    testCases: [
      { input: "3 3\n1 1 1\n1 0 1\n1 1 1", output: "1 0 1\n0 0 0\n1 0 1", isPublic: true },
      { input: "3 4\n0 1 2 0\n3 4 5 2\n1 3 1 5", output: "0 0 0 0\n0 4 5 0\n0 3 1 0", isPublic: true },
      { input: "1 1\n1", output: "1", isPublic: true },
      { input: "1 1\n0", output: "0", isPublic: false },
      { input: "2 2\n1 0\n1 1", output: "1 0\n1 0", isPublic: false },
      { input: "2 2\n0 0\n1 1", output: "0 0\n0 0", isPublic: false },
      { input: "3 2\n1 2\n0 3\n4 5", output: "0 2\n0 0\n0 5", isPublic: false },
      { input: "2 3\n1 0 1\n1 1 1", output: "0 0 0\n1 0 1", isPublic: false },
      { input: "3 3\n1 2 3\n4 0 6\n7 8 9", output: "1 0 3\n0 0 0\n7 0 9", isPublic: false },
      { input: "1 3\n1 0 1", output: "0 0 0", isPublic: false }
    ]
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms');
    console.log('Connected to MongoDB');

    const instructor = await Instructor.findOne();
    if (!instructor) {
      console.error('Missing Instructor.');
      process.exit(1);
    }

    const data = questions.map(q => ({
      ...q,
      createdBy: instructor._id
    }));

    await AssessmentQuestion.deleteMany({ tags: { $in: ["Set1", "Set2", "Set3"] } });
    const result = await AssessmentQuestion.insertMany(data);
    console.log(`Successfully seeded ${result.length} questions into AssessmentQuestion model.`);

  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seed();
