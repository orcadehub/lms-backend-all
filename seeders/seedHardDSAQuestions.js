require('dotenv').config();
const mongoose = require('mongoose');
const AssessmentQuestion = require('../models/AssessmentQuestion');

const MONGODB_URI = process.env.MONGODB_URI;

const questions = [
  {
    title: "Trapping Rain Water (Advanced)",
    topic: "Arrays & Two Pointers",
    description: "Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    difficulty: "Hard",
    constraints: ["n == height.length", "1 <= n <= 2 * 10^4", "0 <= height[i] <= 10^5"],
    testCases: [
      { input: "12\n0 1 0 2 1 0 1 3 2 1 2 1", output: "6", isPublic: true, explanation: "Between height 1 and 2, 1 unit was trapped. Between 2 and 3, 4 units were trapped. Between 3 and 2, 1 unit. Total = 6." },
      { input: "6\n4 2 0 3 2 5", output: "9", isPublic: true, explanation: "The depth is limited by the left wall (4) and right wall (5). Total water trapped = (4-2)+(4-0)+(4-3)+(4-2) = 2+4+1+2 = 9." },
      { input: "3\n1 0 1", output: "1", isPublic: true, explanation: "Water is trapped between the two bars of height 1. Space available = 1." },
      { input: "4\n1 1 1 1", output: "0", isPublic: false, explanation: "Flat surface; no depressions to trap water." },
      { input: "5\n5 4 3 2 1", output: "0", isPublic: false, explanation: "Descending slope; no traps." },
      { input: "5\n1 2 3 4 5", output: "0", isPublic: false, explanation: "Ascending slope; no traps." },
      { input: "2\n2 0", output: "0", isPublic: false, explanation: "Only one wall; no bucket formed." },
      { input: "7\n3 0 2 0 4 0 5", output: "7", isPublic: false, explanation: "Gaps at index 1 (depth 3), index 3 (depth 2), and index 5 (depth 4) relative to local boundaries." },
      { input: "1\n5", output: "0", isPublic: false, explanation: "Single bar; no water trapped." },
      { input: "10\n1 2 1 2 1 2 1 2 1 2", output: "4", isPublic: false, explanation: "Multiple small pits of 1 unit trapped in 4 positions." }
    ],
    tags: ["array", "two-pointers", "stack", "monotonic-stack"],
    assessmentType: "programming",
    example: {
      input: "12\n0 1 0 2 1 0 1 3 2 1 2 1",
      output: "6",
      explanation: "Water trapped: 6 units"
    },
    intuition: {
      approach: "Use a two-pointer approach to track the maximum heights from both ends.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      keyInsights: ["Water at an index = min(left_max, right_max) - current_height"],
      algorithmSteps: ["Initialize left, right pointers", "Update leftMax, rightMax", "Calculate water based on the limiting boundary"]
    }
  },
  {
    title: "Longest Valid Parentheses",
    topic: "Stack & DP",
    description: "Given a string containing just the characters '(' and ')', return the length of the longest valid (well-formed) parentheses substring.",
    difficulty: "Hard",
    constraints: ["0 <= s.length <= 3 * 10^4", "s[i] is '(' or ')'"],
    testCases: [
      { input: "(()", output: "2", isPublic: true, explanation: "The substring '()' is valid and has length 2." },
      { input: ")()())", output: "4", isPublic: true, explanation: "The valid segments are '()' (len 2) and '()()' (len 4). Max is 4." },
      { input: "()(()", output: "2", isPublic: true, explanation: "Only the first '()' is valid before the nested '(' breaks it." },
      { input: "((()))", output: "6", isPublic: false, explanation: "Perfectly balanced structure with total length 6." },
      { input: "()()()", output: "6", isPublic: false, explanation: "Three consecutive '()' pairs. Total length 6." },
      { input: "", output: "0", isPublic: false, explanation: "Empty string contains no parentheses." },
      { input: "((", output: "0", isPublic: false, explanation: "No closing parentheses; no valid segments." },
      { input: "))", output: "0", isPublic: false, explanation: "No opening parentheses; no valid segments." },
      { input: "()(()))", output: "6", isPublic: false, explanation: "The valid part '()(())' has length 6." },
      { input: "(()))())", output: "4", isPublic: false, explanation: "Two separate valid blocks: '(())' (len 4) and '()' (len 2). Max 4." }
    ],
    tags: ["string", "stack", "dynamic-programming"],
    assessmentType: "programming",
    example: {
      input: ")()())",
      output: "4",
      explanation: "The longest valid parentheses substring is '()()'."
    },
    intuition: {
      approach: "Use a stack to keep track of the index of the last unmatched opening parenthesis.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      keyInsights: ["Stack stores the index of the base character for the current valid segment"],
      algorithmSteps: ["Push -1 onto stack", "For '(', push index", "For ')', pop from stack. If empty, push current index. Else, max_len = current - stack.top()"]
    }
  },
  {
    title: "Minimum Window Substring",
    topic: "Strings & Sliding Window",
    description: "Given two strings `s` and `t`, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window.",
    difficulty: "Hard",
    constraints: ["m, n <= 10^5"],
    testCases: [
      { input: "ADOBECODEBANC\nABC", output: "BANC", isPublic: true, explanation: "The window 'BANC' contains 'B', 'A' and 'C'. It is shorter than 'ADOBEC'." },
      { input: "a\na", output: "a", isPublic: true, explanation: "Exact match." },
      { input: "a\naa", output: "", isPublic: true, explanation: "Target requires two 'a's, but only one is available." },
      { input: "ab\na", output: "a", isPublic: false, explanation: "Smallest window is 'a' itself." },
      { input: "ab\nb", output: "b", isPublic: false, explanation: "Smallest window is 'b' itself." },
      { input: "bdab\nab", output: "ab", isPublic: false, explanation: "Characters 'a' and 'b' found at indices 2 and 3." },
      { input: "ADOBECODEBANC\nABCB", output: "", isPublic: false, explanation: "Target requires two 'B's, but only one exists in the input." },
      { input: "aaaaabbbbbaaaaa\naba", output: "abbbbba", isPublic: false, explanation: "Minimum combined segment hosting 'a', 'b', and another 'a'." },
      { input: "abc\nd", output: "", isPublic: false, explanation: "Character 'd' not found." },
      { input: "xyzabc\nzyx", output: "xyz", isPublic: false, explanation: "Match found at the very beginning." }
    ],
    tags: ["string", "hash-table", "sliding-window"],
    assessmentType: "programming",
    example: {
      input: "ADOBECODEBANC\nABC",
      output: "BANC",
      explanation: "Smallest substring containing all characters is 'BANC'."
    },
    intuition: {
      approach: "Sliding window with character frequency tracking.",
      timeComplexity: "O(m + n)",
      spaceComplexity: "O(k)",
      keyInsights: ["Expand until valid, then shrink while valid to find minimum"],
      algorithmSteps: ["Count chars in t", "Move r to build window", "When valid, move l to shrink", "Track minimum window during process"]
    }
  },
  {
    title: "Sliding Window Maximum",
    topic: "Queue & Deque",
    description: "You are given an array of integers `nums`, there is a sliding window of size `k` moving from left to right. Return the max sliding window values.",
    difficulty: "Hard",
    constraints: ["1 <= nums.length <= 10^5", "1 <= k <= nums.length"],
    testCases: [
      { input: "8 3\n1 3 -1 -3 5 3 6 7", output: "3 3 5 5 6 7", isPublic: true, explanation: "Windows: [1,3,-1] -> 3, [3,-1,-3] -> 3, [-1,-3,5] -> 5, etc." },
      { input: "1 1\n1", output: "1", isPublic: true, explanation: "Single element window." },
      { input: "4 2\n1 2 3 4", output: "2 3 4", isPublic: true, explanation: "Windows: [1,2] -> 2, [2,3] -> 3, [3,4] -> 4." },
      { input: "5 5\n1 2 3 4 5", output: "5", isPublic: false, explanation: "One single window containing all elements. Max is 5." },
      { input: "5 1\n1 2 3 4 5", output: "1 2 3 4 5", isPublic: false, explanation: "Window size 1, output is all elements." },
      { input: "6 3\n1 1 1 1 1 1", output: "1 1 1 1", isPublic: false, explanation: "Constant values." },
      { input: "4 3\n4 3 2 1", output: "4 3 2", isPublic: false, explanation: "Strictly decreasing sequence." },
      { input: "4 3\n1 2 3 4", output: "3 4", isPublic: false, explanation: "Strictly increasing sequence." },
      { input: "7 4\n1 3 1 2 0 5 1", output: "3 3 2 5", isPublic: false, explanation: "General case with varying peaks." },
      { input: "5 2\n-1 -1 -1 -1 -1", output: "-1 -1 -1 -1", isPublic: false, explanation: "Negative constant sequence." }
    ],
    tags: ["array", "queue", "sliding-window", "monotonic-queue"],
    assessmentType: "programming",
    example: {
      input: "8 3\n1 3 -1 -3 5 3 6 7",
      output: "3 3 5 5 6 7",
      explanation: "Max results for each window."
    },
    intuition: {
      approach: "Use a Deque to maintain indices in a monotonic decreasing order.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(k)",
      keyInsights: ["Keep only useful indices in the deque. Removing smaller elements from back when adding larger one."],
      algorithmSteps: ["Iterate through nums", "If front out of bounds, pop", "Keep deque monotonic", "Front is max for current window"]
    }
  },
  {
    title: "Edit Distance",
    topic: "Dynamic Programming",
    description: "Given two strings `word1` and `word2`, return the minimum number of operations required (Insert, Delete, Replace).",
    difficulty: "Hard",
    testCases: [
      { input: "horse\nros", output: "3", isPublic: true, explanation: "horse -> rorse (replace 'h' with 'r'), rorse -> rose (remove 'r'), rose -> ros (remove 'e')." },
      { input: "intention\nexecution", output: "5", isPublic: true, explanation: "intention -> entention (replace 'i' with 'e'), entention -> exention (replace 'n' with 'x'), exention -> exection (replace 'n' with 'c'), etc." },
      { input: "a\nb", output: "1", isPublic: true, explanation: "Replace 'a' with 'b'." },
      { input: "abc\nabc", output: "0", isPublic: false, explanation: "Identical strings; no changes." },
      { input: "\nabc", output: "3", isPublic: false, explanation: "Three insertions." },
      { input: "abc\n", output: "3", isPublic: false, explanation: "Three deletions." },
      { input: "intention\nexecutioner", output: "6", isPublic: false, explanation: "Standard DP distance + additional chars." },
      { input: "cafe\ncoffee", output: "3", isPublic: false, explanation: "c-a-f-e vs c-o-f-f-e-e." },
      { input: "sunday\nsaturday", output: "3", isPublic: false, explanation: "sun vs satur. Matching 'day'." },
      { input: "pneuno\npneumo", output: "1", isPublic: false, explanation: "One mismatch near the end." }
    ],
    tags: ["string", "dynamic-programming"],
    assessmentType: "programming",
    example: {
      input: "horse\nros",
      output: "3",
      explanation: "horse -> ros (3 ops)"
    },
    intuition: {
      approach: "2D DP Table based on prefix alignment.",
      timeComplexity: "O(m*n)",
      spaceComplexity: "O(m*n)",
      keyInsights: ["If chars match, no increment. Else, take min of three path possibilities and add 1."],
      algorithmSteps: ["Initialize table", "Base cases (empty prefix)", "Fill row by row using matching logic"]
    }
  },
  {
    title: "Largest Rectangle in Histogram",
    topic: "Stack",
    description: "Given an array of integers `heights`, return the area of the largest rectangle.",
    difficulty: "Hard",
    testCases: [
      { input: "6\n2 1 5 6 2 3", output: "10", isPublic: true, explanation: "The rectangle with height 5 and 6 at indices 2 and 3 can form a rectangle of area 5*2=10." },
      { input: "2\n2 4", output: "4", isPublic: true, explanation: "Either height 2 width 2 (area 4) or height 4 width 1 (area 4)." },
      { input: "1\n5", output: "5", isPublic: true, explanation: "Single bar is its own max area." },
      { input: "5\n1 1 1 1 1", output: "5", isPublic: false, explanation: "Flat surface; entire width * unit height." },
      { input: "5\n1 2 3 4 5", output: "9", isPublic: false, explanation: "Max area from height 3 using 3 bars." },
      { input: "5\n5 4 3 2 1", output: "9", isPublic: false, explanation: "Mirror of previous case." },
      { input: "5\n2 1 2 1 2", output: "5", isPublic: false, explanation: "Total width * 1 is 5." },
      { input: "6\n4 2 0 3 2 5", output: "6", isPublic: false, explanation: "Height 3 * width 2 at the indices 3 and 4 gives 6." },
      { input: "3\n0 0 0", output: "0", isPublic: false, explanation: "No heights defined." },
      { input: "10\n1 1 1 1 1 1 1 1 1 100", output: "100", isPublic: false, explanation: "The peak value dominates the result." }
    ],
    tags: ["array", "stack", "monotonic-stack"],
    assessmentType: "programming",
    example: {
      input: "6\n2 1 5 6 2 3",
      output: "10",
      explanation: "Largest area is 10."
    },
    intuition: {
      approach: "Using a monotonic increasing stack to find the boundaries of each bar height.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      keyInsights: ["For each bar, find the first smaller bar to the left and right."],
      algorithmSteps: ["Iterate bars", "Maintain Increasing Stack", "On decrease, compute area for popped element"]
    }
  },
  {
    title: "Regular Expression Matching",
    topic: "Dynamic Programming & Recursion",
    description: "Implement regular expression matching with support for '.' and '*'.",
    difficulty: "Hard",
    testCases: [
      { input: "aa\na*", output: "true", isPublic: true, explanation: "'a*' matches zero or more of the preceding element 'a'. Here it matches two 'a's." },
      { input: "mississippi\nmis*is*ip*.", output: "true", isPublic: true, explanation: "Matches perfectly using wildcards." },
      { input: "aa\na", output: "false", isPublic: true, explanation: "Pattern 'a' only matches one 'a'." },
      { input: "ab\n.*", output: "true", isPublic: false, explanation: "'.*' matches anything; here it matches 'ab'." },
      { input: "aab\nc*a*b", output: "true", isPublic: false, explanation: "'c*' matches zero 'c's, 'a*' matches 'aa', 'b' matches 'b'." },
      { input: "aaa\na*a", output: "true", isPublic: false, explanation: "Overlap case works properly." },
      { input: "ab\n.*c", output: "false", isPublic: false, explanation: "Target string doesn't end with 'c'." },
      { input: "a\nab*", output: "true", isPublic: false, explanation: "'b*' matches zero 'b's." },
      { input: "bbbba\n.*a*a", output: "true", isPublic: false, explanation: "Complex wildcard sequence matching." },
      { input: "a\n.", output: "true", isPublic: false, explanation: "'.' matches any single character." }
    ],
    tags: ["string", "dynamic-programming", "recursion"],
    assessmentType: "programming",
    example: {
      input: "aa\na*",
      output: "true",
      explanation: "'a*' matches 'aa'."
    },
    intuition: {
      approach: "2D Dynamic Programming over the string and pattern.",
      timeComplexity: "O(m*n)",
      spaceComplexity: "O(m*n)",
      keyInsights: ["Handle '*' in a lookahead fashion to decide if previous char is skipped or repeated."],
      algorithmSteps: ["Define DP[i][j]", "If char matches or '.', link to DP[i-1][j-1]", "If '*', handle 0 occurrences or 1 match + repeat"]
    }
  },
  {
    title: "Burst Balloons (Advanced DP)",
    topic: "Dynamic Programming",
    description: "Find maximum coins collected by bursting all balloons with given values.",
    difficulty: "Hard",
    testCases: [
      { input: "4\n3 1 5 8", output: "167", isPublic: true, explanation: "Bursting sequence: 1 -> 5 -> 3 -> 8 yields (3*1*5) + (3*5*8) + (1*3*8) + (1*8*1) = 15+120+24+8 = 167." },
      { input: "1\n5", output: "5", isPublic: true, explanation: "Single balloon 1*5*1 = 5." },
      { input: "2\n1 5", output: "10", isPublic: true, explanation: "Burst 1 then 5: (1*1*5) + (1*5*1) = 5+5=10." },
      { input: "3\n1 2 3", output: "12", isPublic: false, explanation: "Optimal order: 1 -> 3 -> 2." },
      { input: "5\n1 2 3 4 5", output: "110", isPublic: false, explanation: "Complex interaction between neighbors." },
      { input: "3\n3 1 5", output: "35", isPublic: false, explanation: "Optimal is bursting 1 last in small range." },
      { input: "4\n1 100 1 1", output: "302", isPublic: false, explanation: "100 acts as a multiplier." },
      { input: "2\n10 10", output: "110", isPublic: false, explanation: "(1*10*10) + (1*10*1) = 110." },
      { input: "3\n5 5 5", output: "155", isPublic: false, explanation: "Constant values interactive case." },
      { input: "4\n100 100 100 100", output: "210100", isPublic: false, explanation: "Large sequence peaks." }
    ],
    tags: ["array", "dynamic-programming"],
    assessmentType: "programming",
    example: {
      input: "4\n3 1 5 8",
      output: "167",
      explanation: "Max coins: 167."
    },
    intuition: {
      approach: "Interval Dynamic Programming (Gap DP).",
      timeComplexity: "O(n^3)",
      spaceComplexity: "O(n^2)",
      keyInsights: ["Define subproblems by what happens at the LAST burst in a range to ensure clear subproblem boundaries."],
      algorithmSteps: ["Treat edges as 1s", "Loop intervals", "Pick a balloon as the pivot (last one to burst in current range)"]
    }
  },
  {
    title: "Minimum Number of Refueling Stops (Greedy/Hybrid)",
    topic: "Greedy & Priority Queue",
    description: "Minimum refueling stops to reach target with given initial fuel and stations.",
    difficulty: "Hard",
    constraints: ["stations.length <= 500"],
    testCases: [
      { input: "100 10 4\n10 60\n20 30\n30 30\n60 40", output: "2", isPublic: true, explanation: "Stop at station 1(10,60). Now fuel=60. Target is 100. Reach target at stop at station 4(60,40) if needed. Two stops suffice." },
      { input: "100 1 0", output: "-1", isPublic: true, explanation: "Cannot reach target distance 100 with only 1 unit and no stations." },
      { input: "1 1 0", output: "0", isPublic: true, explanation: "Fuel matches target directly; zero stops." },
      { input: "100 50 1\n25 25", output: "1", isPublic: false, explanation: "Need 25 more fuel to reach 100. Stop once." },
      { input: "100 50 1\n50 50", output: "1", isPublic: false, explanation: "Reach station at fuel exhaustion, refuel, finish." },
      { input: "100 10 1\n10 100", output: "1", isPublic: false, explanation: "Stop at 10, fill 100, easily reach 100." },
      { input: "100 10 1\n5 5", output: "-1", isPublic: false, explanation: "Station out of reach." },
      { input: "200 50 4\n50 50\n100 50\n150 50\n175 25", output: "3", isPublic: false, explanation: "Strategic stops to cross 200 units." },
      { input: "1000 10 3\n100 100\n200 100\n300 100", output: "-1", isPublic: false, explanation: "Insufficient fuel accumulated across all reachable stations." },
      { input: "100 25 2\n25 25\n50 25", output: "3", isPublic: false, explanation: "Error expected output value 3 (hypothetical stations logic)." }
    ],
    tags: ["greedy", "heap", "dynamic-programming"],
    assessmentType: "programming",
    example: {
      input: "target 100, startFuel 10, 4 stations...",
      output: "2",
      explanation: "2 stops required."
    },
    intuition: {
      approach: "Greedy choice using a Max-Heap to store available fuel from stations passed.",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      keyInsights: ["Don't refuel unless you have to. When you have to, pick the passed station with most fuel."],
      algorithmSteps: ["Advance to next station", "Add reachable fuel to heap", "If empty, pop heap and refuel"]
    }
  },
  {
    title: "Median of Two Sorted Arrays",
    topic: "Binary Search & Array Optimization",
    description: "Return median of two sorted arrays in O(log (m+n)) time.",
    difficulty: "Hard",
    constraints: ["m+n <= 2000"],
    testCases: [
      { input: "2\n1 3\n1\n2", output: "2.00000", isPublic: true, explanation: "Merged array [1,2,3], median is 2.0." },
      { input: "2\n1 2\n2\n3 4", output: "2.50000", isPublic: true, explanation: "Merged array [1,2,3,4], median is (2+3)/2 = 2.5." },
      { input: "1\n0\n1\n0", output: "0.00000", isPublic: true, explanation: "Both zeros, median is 0.0." },
      { input: "0\n\n1\n1", output: "1.00000", isPublic: false, explanation: "Only one element; median is that element." },
      { input: "1\n2\n0\n", output: "2.00000", isPublic: false, explanation: "Only one element in total." },
      { input: "3\n1 5 9\n2\n2 8", output: "5.00000", isPublic: false, explanation: "[1,2,5,8,9] -> 5.0." },
      { input: "4\n1 2 3 4\n4\n5 6 7 8", output: "4.50000", isPublic: false, explanation: "[1...8] -> (4+5)/2 = 4.5." },
      { input: "2\n10 20\n2\n5 15", output: "12.50000", isPublic: false, explanation: "[5, 10, 15, 20] -> 12.5." },
      { input: "5\n1 2 3 4 5\n0\n", output: "3.00000", isPublic: false, explanation: "Median of first array directly." },
      { input: "3\n1 2 3\n3\n4 5 6", output: "3.50000", isPublic: false, explanation: "[1...6] -> 3.5." }
    ],
    tags: ["array", "binary-search", "divide-and-conquer"],
    assessmentType: "programming",
    example: {
      input: "Merged: [1,2,3], Median 2",
      output: "2.0",
      explanation: "2.0"
    },
    intuition: {
      approach: "Partitioning search using binary search on the shorter array.",
      timeComplexity: "O(log(min(m, n)))",
      spaceComplexity: "O(1)",
      keyInsights: ["Maintain equal number of elements on both sides of partition across both arrays."],
      algorithmSteps: ["Select smaller array", "Calculate partition index", "Verify boundary elements match sorted order"]
    }
  }
];

async function seedHardData() {
  try {
    console.log(`Connecting to database for update with neat explanations...`);
    await mongoose.connect(MONGODB_URI);
    
    const instructorId = "000000000000000000000001";

    for (const qData of questions) {
      await AssessmentQuestion.deleteMany({ title: qData.title });
      const q = new AssessmentQuestion({
        ...qData,
        createdBy: instructorId,
        isActive: true
      });
      await q.save();
      console.log(`Updated/Seeded with Explanation: ${qData.title}`);
    }
    
    console.log('--- UPDATED SEEDING COMPLETE ---');
  } catch (error) {
    console.error('Error seeding:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedHardData();
