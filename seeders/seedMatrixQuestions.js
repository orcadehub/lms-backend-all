require('dotenv').config();
const mongoose = require('mongoose');
const AssessmentQuestion = require('../models/AssessmentQuestion');

const MONGODB_URI = process.env.MONGODB_URI;

const questions = [
  {
    title: "Spiral Matrix II",
    topic: "Matrix",
    description: "Given a positive integer `n`, generate an `n x n` matrix filled with elements from 1 to `n^2` in spiral order.",
    difficulty: "Medium",
    constraints: ["1 <= n <= 20"],
    testCases: [
      { input: "3", output: "1 2 3\n8 9 4\n7 6 5", isPublic: true, explanation: "Outer layer: 1-2-3 (Top), 4-5 (Right column already handled 3), 6-7 (Bottom), 8 (Left column). Finally 9 (Center)." },
      { input: "1", output: "1", isPublic: true, explanation: "Single element matrix." },
      { input: "2", output: "1 2\n4 3", isPublic: true, explanation: "Spiral order: 1 (Top-L), 2 (Top-R), 3 (Bottom-R), 4 (Bottom-L)." },
      { input: "4", output: "1 2 3 4\n12 13 14 5\n11 16 15 6\n10 9 8 7", isPublic: false, explanation: "Outer layer 1-12, Inner layer 13-16." },
      { input: "5", output: "1 2 3 4 5\n16 17 18 19 6\n15 24 25 20 7\n14 23 22 21 8\n13 12 11 10 9", isPublic: false, explanation: "Nested spiral layers for 5x5 grid." },
      { input: "0", output: "", isPublic: false, explanation: "N/A." },
      { input: "2", output: "1 2\n4 3", isPublic: false, explanation: "Case validation." },
      { input: "1", output: "1", isPublic: false, explanation: "Single cell." },
      { input: "3", output: "1 2 3\n8 9 4\n7 6 5", isPublic: false, explanation: "Standard spiral sequence." }
    ],
    tags: ["matrix", "simulation"],
    assessmentType: "programming",
    example: {
      input: "3",
      output: "1 2 3\n8 9 4\n7 6 5",
      explanation: "A 3x3 matrix filled in spiral order from 1 to 9."
    },
    intuition: {
      approach: "Using boundary variables (top, bottom, left, right) to simulate the clockwise traversal.",
      timeComplexity: "O(n^2)",
      spaceComplexity: "O(1) (excluding result)",
      keyInsights: ["Narrow the boundary after every successful side fill."],
      algorithmSteps: ["Initialize boundaries", "Fill Top, Right, Bottom, Left", "Update markers"]
    }
  },
  {
    title: "Rotate Image (90 Degree)",
    topic: "Matrix",
    description: "You are given an `n x n` 2D matrix representing an image. Rotate the image by 90 degrees (clockwise) **in-place**.",
    difficulty: "Medium",
    constraints: ["n == matrix.length"],
    testCases: [
      { input: "3\n1 2 3\n4 5 6\n7 8 9", output: "7 4 1\n8 5 2\n9 6 3", isPublic: true, explanation: "Transposing and reversing each row transforms the matrix: 1 2 3 becomes 1 4 7 (col) and finally reversed into 7 4 1." },
      { input: "2\n1 2\n3 4", output: "3 1\n4 2", isPublic: true, explanation: "Bottom element 3 moves to top left pos (0,0)." },
      { input: "1\n5", output: "5", isPublic: true, explanation: "No rotation visible for single point." },
      { input: "4\n1 1 1 1\n2 2 2 2\n3 3 3 3\n4 4 4 4", output: "4 3 2 1\n4 3 2 1\n4 3 2 1\n4 3 2 1", isPublic: false, explanation: "Constant row values turned into constant column values." },
      { input: "2\n10 20\n30 40", output: "30 10\n40 20", isPublic: false, explanation: "Clockwise 90 deg rotation." },
      { input: "3\n1 1 1\n0 0 0\n1 1 1", output: "1 0 1\n1 0 1\n1 0 1", isPublic: false, explanation: "Horizontal lines rotated to vertical." },
      { input: "3\n5 1 9\n0 4 2\n7 1 6", output: "7 0 5\n1 4 1\n6 2 9", isPublic: false, explanation: "Standard 3x3 matrix values shifted." },
      { input: "4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16", output: "13 9 5 1\n14 10 6 2\n15 11 7 3\n16 12 8 4", isPublic: false, explanation: "Layer-by-layer rotation logic." },
      { input: "2\n0 0\n1 1", output: "1 0\n1 0", isPublic: false, explanation: "Boolean style matrix transition." },
      { input: "3\n9 8 7\n6 5 4\n3 2 1", output: "3 6 9\n2 5 8\n1 4 7", isPublic: false, explanation: "Descending block rotation." }
    ],
    tags: ["matrix", "math", "in-place"],
    assessmentType: "programming",
    example: {
      input: "3\n1 2 3\n4 5 6\n7 8 9",
      output: "7 4 1\n8 5 2\n9 6 3",
      explanation: "In-place rotation."
    },
    intuition: {
      approach: "Transpose first, then reverse rows.",
      timeComplexity: "O(n^2)",
      spaceComplexity: "O(1)",
      keyInsights: ["Transposition with reversal is equivalent to clockwise rotation."],
      algorithmSteps: ["Swap A[i][j] with A[j][i]", "Reverse row[i]"]
    }
  },
  {
    title: "Search a 2D Matrix II",
    topic: "Matrix & Binary Search",
    description: "Each row/column is sorted. Efficient algorithm to find target.",
    difficulty: "Medium",
    constraints: ["m, n <= 300"],
    testCases: [
      { input: "5 5 5\n1 4 7 11 15\n2 5 8 12 19\n3 6 9 16 22\n10 13 14 17 24\n18 21 23 26 30", output: "true", isPublic: true, explanation: "Target 5 found at (1,1) in the 0-indexed matrix." },
      { input: "5 5 20\n1 4 7 11 15\n2 5 8 12 19\n3 6 9 16 22\n10 13 14 17 24\n18 21 23 26 30", output: "false", isPublic: true, explanation: "Target 20 is not present in the grid despite sorted constraints." },
      { input: "1 1 5\n5", output: "true", isPublic: true, explanation: "Direct match on a 1x1 matrix." },
      { input: "1 1 5\n3", output: "false", isPublic: false, explanation: "Mismatch." },
      { input: "2 2 10\n1 5\n2 10", output: "true", isPublic: false, explanation: "Matched last element." },
      { input: "2 2 8\n1 5\n2 10", output: "false", isPublic: false, explanation: "Missing element." },
      { input: "3 3 1\n1 2 3\n4 5 6\n7 8 9", output: "true", isPublic: false, explanation: "Matches (0,0)." },
      { input: "3 3 9\n1 2 3\n4 5 6\n7 8 9", output: "true", isPublic: false, explanation: "Matches (2,2)." },
      { input: "3 3 10\n1 2 3\n4 5 6\n7 8 9", output: "false", isPublic: false, explanation: "Exceeds max value." },
      { input: "4 4 -1\n-5 -4 -3 -2\n-4 -3 -2 -1\n-3 -2 -1 0\n-2 -1 0 1", output: "true", isPublic: false, explanation: "Negative values sorted search." }
    ],
    tags: ["matrix", "binary-search"],
    assessmentType: "programming",
    example: {
      input: "5 5 5 ... (grid)",
      output: "true"
    },
    intuition: {
      approach: "Staircase Search (Top-Right or Bottom-Left starting point).",
      timeComplexity: "O(m + n)",
      spaceComplexity: "O(1)",
      keyInsights: ["Move left if target < current, move down if target > current (from top-right)."],
      algorithmSteps: ["Initialize row=0, col=n-1", "Compare", "Update pointer"]
    }
  },
  {
    title: "Set Matrix Zeroes (In-Place)",
    topic: "Matrix & Space Optimization",
    description: "Set rows/cols containing 0 to all 0s in-place.",
    difficulty: "Medium",
    testCases: [
      { input: "3 3\n1 1 1\n1 0 1\n1 1 1", output: "1 0 1\n0 0 0\n1 0 1", isPublic: true, explanation: "Original 0 is at (1,1). Row 1 and Col 1 both become 0." },
      { input: "3 4\n0 1 2 0\n3 4 5 2\n1 3 1 5", output: "0 0 0 0\n0 4 5 0\n0 3 1 0", isPublic: true, explanation: "First row has zeros at col 0 and 3. Results in row 0, col 0, and col 3 containing all zeros." },
      { input: "1 1\n1", output: "1", isPublic: true, explanation: "No zero, no change." },
      { input: "1 1\n0", output: "0", isPublic: false, explanation: "Single cell zero stays zero." },
      { input: "2 2\n1 2\n3 4", output: "1 2\n3 4", isPublic: false, explanation: "No zeros." },
      { input: "2 2\n0 1\n2 3", output: "0 0\n0 3", isPublic: false, explanation: "First column and row affected." },
      { input: "2 2\n1 0\n2 3", output: "0 0\n2 0", isPublic: false, explanation: "Matches (0,1) zero location." },
      { input: "3 3\n0 0 0\n1 1 1\n1 1 1", output: "0 0 0\n0 0 0\n0 0 0", isPublic: false, explanation: "Top row zeros out everything via column and row markers." },
      { input: "3 3\n1 1 1\n1 0 1\n0 1 1", output: "0 0 1\n0 0 0\n0 0 0", isPublic: false, explanation: "Complex interaction of multiple zeros." },
      { input: "4 4\n1 1 1 1\n1 1 1 1\n1 1 0 1\n1 1 1 1", output: "1 1 0 1\n1 1 0 1\n0 0 0 0\n1 1 0 1", isPublic: false, explanation: "Central zero zeros out its coordinates." }
    ],
    tags: ["matrix", "array", "space-optimization"],
    assessmentType: "programming",
    example: {
      input: "1 1 1 / 1 0 1 / 1 1 1",
      output: "1 0 1 / 0 0 0 / 1 0 1"
    },
    intuition: {
      approach: "Using the first row and first column as storage for row/col indicator markers.",
      timeComplexity: "O(m*n)",
      spaceComplexity: "O(1)",
      keyInsights: ["Remember if the VERY first row/col actually needed a zero separately before using them as markers."],
      algorithmSteps: ["Check 1st row/col", "Set markers in them based on rest of matrix", "Zero rest of matrix based on markers", "Zero 1st row/col"]
    }
  },
  {
    title: "Valid Sudoku",
    topic: "Matrix & Hash Table",
    description: "Check if board is valid per Sudoku rules.",
    difficulty: "Medium",
    testCases: [
      { input: "9 9\n5 3 . . 7 . . . .\n6 . . 1 9 5 . . .\n. 9 8 . . . . 6 .\n8 . . . 6 . . . 3\n4 . . 8 . 3 . . 1\n7 . . . 2 . . . 6\n. 6 . . . . 2 8 .\n. . . 4 1 9 . . 5\n. . . . 8 . . 7 9", output: "true", isPublic: true, explanation: "No duplicates in rows, columns or 3x3 sub-grids." },
      { input: "9 9\n8 3 . . 7 . . . .\n6 . . 1 9 5 . . .\n. 9 8 . . . . 6 .\n8 . . . 6 . . . 3\n4 . . 8 . 3 . . 1\n7 . . . 2 . . . 6\n. 6 . . . . 2 8 .\n. . . 4 1 9 . . 5\n. . . . 8 . . 7 9", output: "false", isPublic: true, explanation: "The number 8 appears twice in a subgrid/region." },
      { input: "9 9\n. . . . . . . . .\n. . . . . . . . .\n. . . . . . . . .\n. . . . . . . . .\n. . . . . . . . .\n. . . . . . . . .\n. . . . . . . . .\n. . . . . . . . .\n. . . . . . . . .", output: "true", isPublic: true, explanation: "Empty board is valid." },
      { input: "9 9\n1 1 . . . . . . .\n. . . . . . . . .\n. . . . . . . . .\n. . . . . . . . .\n. . . . . . . . .\n. . . . . . . . .\n. . . . . . . . .\n. . . . . . . . .\n. . . . . . . . .", output: "false", isPublic: false, explanation: "Row collision." },
      { input: "9 9\n1 . . . . . . . .\n1 . . . . . . . .\n. . . . . . . . .\n. . . . . . . . .\n. . . . . . . . .\n. . . . . . . . .\n. . . . . . . . .\n. . . . . . . . .\n. . . . . . . . .", output: "false", isPublic: false, explanation: "Col collision." }
    ],
    tags: ["matrix", "hash-table"],
    assessmentType: "programming",
    example: {
      input: "Sudoku Board Grid...",
      output: "true"
    },
    intuition: {
      approach: "Using 2D sets for each category (row, col, box).",
      timeComplexity: "O(1) (fixed 81 cells)",
      spaceComplexity: "O(1)",
      keyInsights: ["Region calculation: box_index = (row/3)*3 + col/3."],
      algorithmSteps: ["Initialize 9 sets for row check", "9 for col", "9 for box", "Iterate and check set contains()"]
    }
  },
  {
    title: "Maximal Rectangle (Hybrid)",
    topic: "Matrix & Stack (Hybrid)",
    description: "Largest rectangle of 1s in a binary matrix.",
    difficulty: "Hard",
    testCases: [
      { input: "4 5\n1 0 1 0 0\n1 0 1 1 1\n1 1 1 1 1\n1 0 0 1 0", output: "6", isPublic: true, explanation: "At index (1,2) down to (2,4), a rectangle of 2x3 block exists which has area 6." },
      { input: "1 1\n0", output: "0", isPublic: true, explanation: "No ones." },
      { input: "1 1\n1", output: "1", isPublic: true, explanation: "Area 1x1." },
      { input: "2 2\n1 1\n1 1", output: "4", isPublic: false, explanation: "Full 2x2 grid." },
      { input: "3 3\n1 1 1\n1 1 1\n1 1 1", output: "9", isPublic: false, explanation: "Full 3x3 grid." },
      { input: "3 3\n1 0 1\n0 1 0\n1 0 1", output: "1", isPublic: false, explanation: "Chequered pattern max is 1." },
      { input: "2 3\n1 1 1\n0 0 0", output: "3", isPublic: false, explanation: "Top row 3 units." },
      { input: "3 2\n1 0\n1 0\n1 0", output: "3", isPublic: false, explanation: "Left column 3 units." },
      { input: "4 4\n0 0 0 0\n0 1 1 0\n0 1 1 0\n0 0 0 0", output: "4", isPublic: false, explanation: "Center 2x2 block." },
      { input: "5 5\n1 1 1 1 1\n1 0 0 0 1\n1 0 1 0 1\n1 0 0 0 1\n1 1 1 1 1", output: "5", isPublic: false, explanation: "Max is any edge line of 5." }
    ],
    tags: ["matrix", "stack", "dynamic-programming"],
    assessmentType: "programming",
    example: {
      input: "Grid of 0s and 1s",
      output: "6"
    },
    intuition: {
      approach: "Convert to Largest Rectangle in Histogram for each row.",
      timeComplexity: "O(m*n)",
      spaceComplexity: "O(n)",
      keyInsights: ["Maintain a height array for each row. Update based on current row cell value."],
      algorithmSteps: ["Initialize heights to 0", "For each row, if grid[r][c]==1, increment heights[c]. Else heights[c]=0", "Compute histogram area of current heights"]
    }
  },
  {
    title: "Word Search (Matrix DFS)",
    topic: "Matrix & Backtracking",
    description: "Find if word exists in grid with sequential adjacent cells.",
    difficulty: "Medium",
    testCases: [
      { input: "3 4\nA B C E\nS F C S\nA D E E\nABCCED", output: "true", isPublic: true, explanation: "Start (0,0)->(0,1)->(0,2)->(1,2)->(2,2)->(2,1) matches A-B-C-C-E-D." },
      { input: "3 4\nA B C E\nS F C S\nA D E E\nSEE", output: "true", isPublic: true, explanation: "S(1,0)->E(2,2)->E(2,3) is one path." },
      { input: "3 4\nA B C E\nS F C S\nA D E E\nABCB", output: "false", isPublic: true, explanation: "B cannot be reused in the same path." },
      { input: "1 1\nA\nA", output: "true", isPublic: false, explanation: "Exact char." },
      { input: "1 1\nA\nB", output: "false", isPublic: false, explanation: "Mismatch." },
      { input: "2 2\nA B\nC D\nACDB", output: "true", isPublic: false, explanation: "Snake-like path." },
      { input: "2 2\nA B\nC D\nABCD", output: "true", isPublic: false, explanation: "Z-shaped path." },
      { input: "3 3\nA B A\nA B A\nA B A\nAAA", output: "true", isPublic: false, explanation: "Vertical path." },
      { input: "3 3\nX Y Z\nA B C\nL M N\nXYZCBA", output: "false", isPublic: false, explanation: "Jump required (not allowed)." }
    ],
    tags: ["matrix", "backtracking"],
    assessmentType: "programming",
    example: {
      input: "Board + Word",
      output: "true"
    },
    intuition: {
      approach: "DFS backtracking from every potential starting cell.",
      timeComplexity: "O(m*n * 4^L)",
      spaceComplexity: "O(L)",
      keyInsights: ["Temporarily mark visited characters with a dummy value to avoid reuse."],
      algorithmSteps: ["Loop through every cell", "If board[r][c] matches word[0], start DFS", "Check neighbors for word[index+1]"]
    }
  },
  {
    title: "Matrix Diagonal Traverse",
    topic: "Matrix Simulation",
    description: "Return all elements of the matrix in zigzag diagonal order.",
    difficulty: "Medium",
    testCases: [
      { input: "3 3\n1 2 3\n4 5 6\n7 8 9", output: "1 2 4 7 5 3 6 8 9", isPublic: true, explanation: "Diagonals: [1], [2, 4](rev), [7, 5, 3], [6, 8](rev), [9]. Parity decides flip." },
      { input: "2 2\n1 2\n3 4", output: "1 2 3 4", isPublic: true, explanation: "Sequence: (0,0), then rev(0,1),(1,0) = 0,1->1,0, then (1,1)." },
      { input: "1 3\n1 2 3", output: "1 2 3", isPublic: true, explanation: "Single row traversal." },
      { input: "3 1\n1\n2\n3", output: "1 2 3", isPublic: false, explanation: "Single column traversal." },
      { input: "4 4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16", output: "1 2 5 9 6 3 4 7 10 13 14 11 8 12 15 16", isPublic: false, explanation: "Complex 4x4 zigzag." },
      { input: "2 3\n1 2 3\n4 5 6", output: "1 2 4 5 3 6", isPublic: false, explanation: "Non-square zigzag." },
      { input: "1 1\n100", output: "100", isPublic: false, explanation: "Identity." }
    ],
    tags: ["matrix", "simulation"],
    assessmentType: "programming",
    example: {
      input: "3x3 mat",
      output: "1 2 4 7 5 3 6 8 9"
    },
    intuition: {
      approach: "Group elements by the sum of their indices (i+j).",
      timeComplexity: "O(m*n)",
      spaceComplexity: "O(1) (excluding result)",
      keyInsights: ["Elements with the same i+j sum belong to the same diagonal."],
      algorithmSteps: ["Initialize index groups", "Reverse parity of groups (even vs odd sum)", "Flatten and return"]
    }
  },
  {
    title: "Game of Life",
    topic: "Matrix Simulation",
    description: "Next state of cells based on neighbor count rules.",
    difficulty: "Medium",
    testCases: [
      { input: "4 3\n0 1 0\n0 0 1\n1 1 1\n0 0 0", output: "0 0 0\n1 0 1\n0 1 1\n0 1 0", isPublic: true, explanation: "Glider state transition in Conway's Game of Life." },
      { input: "2 2\n1 1\n1 0", output: "1 1\n1 1", isPublic: true, explanation: "Stable block formation." },
      { input: "3 3\n0 0 0\n0 0 0\n0 0 0", output: "0 0 0\n0 0 0\n0 0 0", isPublic: true, explanation: "Zero neighbors, stays dead." },
      { input: "1 1\n1", output: "0", isPublic: false, explanation: "Solitary cell dies of underpopulation." },
      { input: "1 1\n0", output: "0", isPublic: false, explanation: "Dead cell stays dead." }
    ],
    tags: ["matrix", "simulation"],
    assessmentType: "programming",
    example: {
      input: "Grid state",
      output: "Next state"
    },
    intuition: {
      approach: "In-place update using temporary state markers.",
      timeComplexity: "O(m*n)",
      spaceComplexity: "O(1)",
      keyInsights: ["Use bit 2 or specific integers like 2 (was 1, now 0) and 3 (was 0, now 1) to remember former state during scan."],
      algorithmSteps: ["Count living neighbors for each cell", "Apply rules using markers", "Normalize to 0/1 final state"]
    }
  },
  {
    title: "Unique Paths II (Grid with Obstacles)",
    topic: "Matrix & DP",
    description: "Number of unique paths from Top-Left to Bottom-Right avoiding obstacles (1s).",
    difficulty: "Medium",
    testCases: [
      { input: "3 3\n0 0 0\n0 1 0\n0 0 0", output: "2", isPublic: true, explanation: "Obstacle at center. Paths are Top->Right->Bottom and Top->Bottom->Right." },
      { input: "2 2\n0 1\n0 0", output: "1", isPublic: true, explanation: "Only vertical-horizontal path around obstacle." },
      { input: "2 2\n1 0\n0 0", output: "0", isPublic: true, explanation: "Start is blocked; zero paths." },
      { input: "1 1\n0", output: "1", isPublic: false, explanation: "Immediate success." },
      { input: "1 1\n1", output: "0", isPublic: false, explanation: "Blocked cell." },
      { input: "3 3\n0 0 0\n1 1 1\n0 0 0", output: "0", isPublic: false, explanation: "Wall of obstacles blocks target completely." },
      { input: "4 4\n0 0 0 0\n0 0 1 0\n0 1 0 0\n0 0 0 0", output: "4", isPublic: false, explanation: "Multiple paths around central obstacles." }
    ],
    tags: ["matrix", "dynamic-programming"],
    assessmentType: "programming",
    example: {
      input: "Grid + Obstacles",
      output: "Paths count"
    },
    intuition: {
      approach: "2D Dynamic Programming where DP[i][j] is the number of ways to reach cell (i,j).",
      timeComplexity: "O(m*n)",
      spaceComplexity: "O(n) (1D DP optimization)",
      keyInsights: ["If current cell is 1, set paths to 0. Else sum top and left paths."],
      algorithmSteps: ["Initialize DP with start", "Iterate grid", "Update counts based on previous cells"]
    }
  }
];

async function seedMatrixData() {
  try {
    console.log(`Connecting to database for matrix update with explanations...`);
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
      console.log(`Updated Matrix Question with Explanation: ${qData.title}`);
    }
    
    console.log('--- UPDATED MATRIX SEEDING COMPLETE ---');
  } catch (error) {
    console.error('Error seeding matrix questions:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedMatrixData();
