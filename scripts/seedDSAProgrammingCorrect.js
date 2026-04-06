require('dotenv').config();
const mongoose = require('mongoose');
const ProgrammingQuestion = require('../models/ProgrammingQuestion');
const Instructor = require('../models/Instructor');

const programmingQuestions = [
  {
    title: "Array Duplication & Concatenation",
    description: "Given an integer array `nums` of length `n`, you are required to generate a new array `ans` of length `2n`. This new array must be constructed such that the first `n` elements are identical to the original array, and the subsequent `n` elements are also a direct copy of the original array. In other words, `ans` is the concatenation of `nums` with itself. This problem is a foundational exercise in understanding how to allocate memory for a larger collection and how to map source indices into a destination index that repeats a pattern. Mastery of this concept is vital before moving on to more complex transformations like array rotation or shuffling.",
    difficulty: "Easy",
    constraints: ["1 <= nums.length <= 1000", "1 <= nums[i] <= 1000"],
    testCases: [
      { input: "1 2 1", output: "1 2 1 1 2 1", isPublic: true, explanation: "The array [1,2,1] concatenated with [1,2,1] results in [1,2,1,1,2,1]." },
      { input: "1 3 2 1", output: "1 3 2 1 1 3 2 1", isPublic: false }
    ],
    tags: ["Arrays", "Basics", "Concatenation"],
    assessmentType: "programming",
    example: {
      input: "nums = [1, 2, 1]",
      output: "[1, 2, 1, 1, 2, 1]",
      explanation: "We just repeat the array twice."
    },
    intuition: {
      approach: "Create an array of size 2n. Loop through the original array once and set ans[i] and ans[i+n] to nums[i].",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      keyInsights: ["Single pass", "Memory allocation"],
      algorithmSteps: ["Initialize result array", "Copy elements in one pass", "Return result"]
    },
    topic: "Arrays"
  },
  {
    title: "Minimum Length Window Sum",
    description: "Given an array of positive integers `nums` and a positive integer `target`, find the minimal length of a contiguous subarray of which the sum is greater than or equal to the given `target`. If no such subarray exists, the solution should return 0. This problem is a perfect demonstration of the 'Sliding Window' technique with a dynamic size. By expanding the window to find a valid sum and then shrinking it from the left to find the absolute minimum length, we can achieve a highly efficient linear time complexity. This approach is significantly faster than the naïve $O(n^2)$ method which calculates sums for all possible subarrays, making it a critical optimization techniques for real-world data processing.",
    difficulty: "Medium",
    constraints: ["1 <= target <= 10^9", "1 <= nums.length <= 10^5", "1 <= nums[i] <= 10^4"],
    testCases: [
      { input: "7\n2 3 1 2 4 3", output: "2", isPublic: true, explanation: "Subarray [4,3] has the minimal length under the problem constraints." },
      { input: "4\n1 4 4", output: "1", isPublic: false },
      { input: "11\n1 1 1 1 1 1 1 1", output: "0", isPublic: false }
    ],
    tags: ["Arrays", "Sliding Window", "Optimization"],
    assessmentType: "programming",
    example: {
      input: "target = 7, nums = [2, 3, 1, 2, 4, 3]",
      output: "2",
      explanation: "Subarray [4,3] sums to 7, length is 2."
    },
    intuition: {
      approach: "Maintain a sliding window sum. Expand until sum >= target, then shrink to minimize length.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      keyInsights: ["Dynamic Sliding Window", "Greedy Shrinking"],
      algorithmSteps: ["Initialize left=0, current_sum=0", "Iterate right pointer", "Add to sum, then shrink left while valid", "Track min length"]
    },
    topic: "Arrays"
  },
  {
    title: "Days Until Warmer Temperature",
    description: "Given an array of integers `temperatures` representing the daily temperatures, you need to calculate an array `answer` where `answer[i]` is the number of days you have to wait after the `i-th` day to see a warmer temperature. If there's no future day with a warmer temperature, simply record 0 for that specific day. This problem is solved efficiently using a 'Monotonic Stack'. By parsing the temperatures and keeping track of the indices of 'unresolved' days on the stack, we can resolve them as soon as a higher temperature appears. This problem helps developers master the 'Next Greater Element' pattern, which is widely applicable in financial indicators and time-series data analysis.",
    difficulty: "Medium",
    constraints: ["1 <= temperatures.length <= 10^5", "30 <= temperatures[i] <= 100"],
    testCases: [
      { input: "73 74 75 71 69 72 76 73", output: "1 1 4 2 1 1 0 0", isPublic: true, explanation: "For day 1 (73), wait 1 day for 74. For day 3 (75), wait 4 days for 76." },
      { input: "30 40 50 60", output: "1 1 1 0", isPublic: false },
      { input: "30 30 30", output: "0 0 0", isPublic: false }
    ],
    tags: ["Stacks", "Arrays", "Monotonic Stack"],
    assessmentType: "programming",
    example: {
      input: "temps = [73, 74, 75, 71, 69, 72, 76, 73]",
      output: "[1, 1, 4, 2, 1, 1, 0, 0]",
      explanation: "Calculates the gap between current day and next warmer day."
    },
    intuition: {
      approach: "Use a stack to store indices of temperatures that haven't found a warmer day yet.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      keyInsights: ["Next Greater Element", "Index storage on stack"],
      algorithmSteps: ["Initialize result array of 0s", "Iterate through temperatures", "Resolve indices on stack smaller than current", "Push current index"]
    },
    topic: "Stacks"
  },
  {
    title: "Clockwise Spiral Matrix Traversal",
    description: "Your task is to take an $m x n$ matrix and return all its elements in a clockwise spiral order, starting from the top-left element. This problem is a rigorous test of your ability to manage multiple moving boundaries and direction states in a 2D coordinate system. You must carefully navigate the matrix by traversing the top row, descending the right column, crossing the bottom row, and ascending the left column, while ensuring that you do not re-visit any element or stray out of bounds. This specific problem is frequently used to evaluate a programmer's attention to edge cases, such as single-row or single-column matrices, and their ability to follow complex procedural logic without error.",
    difficulty: "Hard",
    constraints: ["m == matrix.length", "n == matrix[i].length", "1 <= m, n <= 10", "-100 <= matrix[i][j] <= 100"],
    testCases: [
      { 
        input: "3 3\n1 2 3\n4 5 6\n7 8 9", 
        output: "1 2 3 6 9 8 7 4 5", 
        isPublic: true,
        explanation: "1->2->3 (Top), ->6->9 (Right), ->8->7 (Bottom), ->4 (Left), ->5 (Middle)."
      },
      { 
        input: "3 4\n1 2 3 4\n5 6 7 8\n9 10 11 12", 
        output: "1 2 3 4 8 12 11 10 9 5 6 7", 
        isPublic: false 
      }
    ],
    tags: ["Matrix", "Simulation", "Boundaries"],
    assessmentType: "programming",
    example: {
      input: "3x3 Matrix [[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
      output: "[1, 2, 3, 6, 9, 8, 7, 4, 5]",
      explanation: "The spiral goes in and around."
    },
    intuition: {
      approach: "Maintain four boundaries: top, bottom, left, and right. Traverse in a spiral while contracting boundaries.",
      timeComplexity: "O(m * n)",
      spaceComplexity: "O(1) excluding result",
      keyInsights: ["Boundary management", "State transitions"],
      algorithmSteps: ["Define 4 pointers", "Iterate while top <= bottom and left <= right", "Move Right, Down, Left, Up", "Increment/Decrement pointers"]
    },
    topic: "Matrix"
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms');
    console.log('Connected to MongoDB');

    const instructor = await Instructor.findOne();

    if (!instructor) {
      console.error('Missing Instructor to associate questions. Please seed users first.');
      process.exit(1);
    }

    console.log(`Using Instructor: ${instructor.name} (${instructor._id})`);

    const programmingToInsert = programmingQuestions.map(q => ({
      ...q,
      createdBy: instructor._id
    }));

    await ProgrammingQuestion.deleteMany({ tags: { $in: ["Concatenation", "Sliding Window", "Monotonic Stack", "Simulation"] } });
    const programmingResult = await ProgrammingQuestion.insertMany(programmingToInsert);
    console.log(`Successfully seeded ${programmingResult.length} DSA Programming challenges (1 Easy, 2 Medium, 1 Hard).`);

  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seed();
