const mongoose = require('mongoose');
const AssessmentQuestion = require('../models/AssessmentQuestion');
require('dotenv').config();

const questions = [
  {
    title: "Triangle: Left Forward 📐",
    description: "Read 'N'. Print a left-aligned triangle of stars (*) with 'N' rows.\nRow 1 has 1 star, Row 2 has 2 stars, ..., Row N has N stars.",
    difficulty: "Easy",
    constraints: ["1 <= N <= 20"],
    testCases: [
      { input: "3", output: "*\n**\n***", isPublic: true },
      { input: "1", output: "*", isPublic: true },
      { input: "5", output: "*\n**\n***\n****\n*****", isPublic: true },
      { input: "2", output: "*\n**", isPublic: false },
      { input: "4", output: "*\n**\n***\n****", isPublic: false },
      { input: "6", output: "*\n**\n***\n****\n*****\n******", isPublic: false },
      { input: "7", output: "*\n**\n***\n****\n*****\n******\n*******", isPublic: false },
      { input: "10", output: "*\n**\n***\n****\n*****\n******\n*******\n********\n*********\n**********", isPublic: false },
      { input: "8", output: "*\n**\n***\n****\n*****\n******\n*******\n********", isPublic: false },
      { input: "9", output: "*\n**\n***\n****\n*****\n******\n*******\n********\n*********", isPublic: false }
    ],
    tags: ["Pattern", "Basics"],
    assessmentType: "programming",
    topic: "Pattern Printing",
    example: { input: "3", output: "*\\n**\\n***", explanation: "Row index matches star count." },
    intuition: { approach: "Outer loop R, Inner loop R times.", timeComplexity: "O(N^2)", spaceComplexity: "O(1)" }
  },
  {
    title: "Triangle: Left Inverted 📐",
    description: "Read 'N'. Print an inverted left-aligned triangle.\nRow 1 has N stars, Row 2 has N-1 stars, ..., Row N has 1 star.",
    difficulty: "Easy",
    constraints: ["1 <= N <= 20"],
    testCases: [
      { input: "3", output: "***\n**\n*", isPublic: true },
      { input: "5", output: "*****\n****\n***\n**\n*", isPublic: true },
      { input: "1", output: "*", isPublic: true },
      { input: "2", output: "**\n*", isPublic: false },
      { input: "4", output: "****\n***\n**\n*", isPublic: false },
      { input: "6", output: "******\n*****\n****\n***\n**\n*", isPublic: false }
    ],
    tags: ["Pattern", "Basics"],
    assessmentType: "programming",
    topic: "Pattern Printing",
    example: { input: "3", output: "***\\n**\\n*", explanation: "Descending star count." },
    intuition: { approach: "Loop from N down to 1.", timeComplexity: "O(N^2)", spaceComplexity: "O(1)" }
  },
  {
    title: "Triangle: Right Forward 📐",
    description: "Read 'N'. Print a **right-aligned** triangle of stars with 'N' rows.\nUse spaces to align everything to the right.",
    difficulty: "Medium",
    constraints: ["1 <= N <= 20"],
    testCases: [
      { input: "3", output: "  *\n **\n***", isPublic: true },
      { input: "5", output: "    *\n   **\n  ***\n ****\n*****", isPublic: true },
      { input: "2", output: " *\n**", isPublic: true },
      { input: "4", output: "   *\n  **\n ***\n****", isPublic: false },
      { input: "1", output: "*", isPublic: false },
      { input: "6", output: "     *\n    **\n   ***\n  ****\n *****\n******", isPublic: false }
    ],
    tags: ["Pattern", "Alignment"],
    assessmentType: "programming",
    topic: "Pattern Printing",
    example: { input: "3", output: "  *\\n **\\n***", explanation: "Spaces before stars." },
    intuition: { approach: "Print (N-i) spaces then (i) stars.", timeComplexity: "O(N^2)", spaceComplexity: "O(1)" }
  },
  {
    title: "Triangle: Right Inverted 📐",
    description: "Read 'N'. Print an inverted right-aligned triangle.",
    difficulty: "Medium",
    constraints: ["1 <= N <= 20"],
    testCases: [
      { input: "3", output: "***\n **\n  *", isPublic: true },
      { input: "5", output: "*****\n ****\n  ***\n   **\n    *", isPublic: true },
      { input: "2", output: "**\n *", isPublic: true },
      { input: "4", output: "****\n ***\n  **\n   *", isPublic: false },
      { input: "1", output: "*", isPublic: false }
    ],
    tags: ["Pattern", "Alignment"],
    assessmentType: "programming",
    topic: "Pattern Printing",
    example: { input: "3", output: "***\\n **\\n  *", explanation: "Spaces increase while stars decrease." },
    intuition: { approach: "Print i spaces then (N-i) stars.", timeComplexity: "O(N^2)", spaceComplexity: "O(1)" }
  },
  {
    title: "The Golden Pyramid 🏛️",
    description: "Read 'N'. Print a perfect centered pyramid with 'N' levels.\nLevel 1: 1 star\nLevel 2: 3 stars\nLevel 3: 5 stars\nFormat: Properly centered using spaces.",
    difficulty: "Medium",
    constraints: ["1 <= N <= 15"],
    testCases: [
      { input: "3", output: "  *\n ***\n*****", isPublic: true },
      { input: "2", output: " *\n***", isPublic: true },
      { input: "1", output: "*", isPublic: true },
      { input: "4", output: "   *\n  ***\n *****\n*******", isPublic: false },
      { input: "5", output: "    *\n   ***\n  *****\n *******\n*********", isPublic: false }
    ],
    tags: ["Pattern", "Center"],
    assessmentType: "programming",
    topic: "Pattern Printing",
    example: { input: "3", output: "  *\\n ***\\n*****", explanation: "Standard pyramid logic." },
    intuition: { approach: "Print (N-i) spaces then (2*i - 1) stars.", timeComplexity: "O(N^2)", spaceComplexity: "O(1)" }
  },
  {
    title: "Inverted Pyramid 🏛️",
    description: "Read 'N'. Print an inverted centered pyramid.",
    difficulty: "Medium",
    constraints: ["1 <= N <= 15"],
    testCases: [
      { input: "3", output: "*****\n ***\n  *", isPublic: true },
      { input: "2", output: "***\n *", isPublic: true },
      { input: "4", output: "*******\n *****\n  ***\n   *", isPublic: true }
    ],
    tags: ["Pattern", "Center"],
    assessmentType: "programming",
    topic: "Pattern Printing",
    example: { input: "3", output: "*****\\n ***\\n  *", explanation: "Inverted pyramid." },
    intuition: { approach: "Spaces increase by 1 per row.", timeComplexity: "O(N^2)", spaceComplexity: "O(1)" }
  },
  {
    title: "Eternal Diamond 💎",
    description: "Read 'N'. Print a diamond pattern where the top half is a pyramid of height 'N' and bottom half is the inverted version.",
    difficulty: "Hard",
    constraints: ["1 <= N <= 15"],
    testCases: [
      { input: "3", output: "  *\n ***\n*****\n ***\n  *", isPublic: true },
      { input: "2", output: " *\n***\n *", isPublic: true },
      { input: "1", output: "*", isPublic: true },
      { input: "4", output: "   *\n  ***\n *****\n*******\n *****\n  ***\n   *", isPublic: false }
    ],
    tags: ["Pattern", "Complex"],
    assessmentType: "programming",
    topic: "Pattern Printing",
    example: { input: "2", output: " *\\n***\\n *", explanation: "Double loop or reflected logic." },
    intuition: { approach: "Pyramid up to N, then Inverted Pyramid from N-1 down.", timeComplexity: "O(N^2)", spaceComplexity: "O(1)" }
  },
  {
    title: "Hollow Rectangle 📦",
    description: "Read Rows 'R' and Columns 'C'. Print a hollow rectangle of stars where stars only exist on the boundary.",
    difficulty: "Medium",
    constraints: ["R, C >= 2"],
    testCases: [
      { input: "3 5", output: "*****\n*   *\n*****", isPublic: true },
      { input: "2 2", output: "**\n**", isPublic: true },
      { input: "4 3", output: "***\n* *\n* *\n***", isPublic: true }
    ],
    tags: ["Pattern", "Conditions"],
    assessmentType: "programming",
    topic: "Pattern Printing",
    example: { input: "3 5", output: "*****\\n*   *\\n*****", explanation: "Stars only on borders." },
    intuition: { approach: "Print stars only if i==0, i==R-1, j==0, j==C-1.", timeComplexity: "O(R*C)", spaceComplexity: "O(1)" }
  },
  {
    title: "Floyd's Triangle 🔢",
    description: "Read 'N'. Print Floyd's triangle using numbers.\n1\n2 3\n4 5 6\n...",
    difficulty: "Easy",
    constraints: ["1 <= N <= 15"],
    testCases: [
      { input: "3", output: "1\n2 3\n4 5 6", isPublic: true },
      { input: "2", output: "1\n2 3", isPublic: true },
      { input: "4", output: "1\n2 3\n4 5 6\n7 8 9 10", isPublic: true }
    ],
    tags: ["Pattern", "Numbers"],
    assessmentType: "programming",
    topic: "Pattern Printing",
    example: { input: "3", output: "1\\n2 3\\n4 5 6", explanation: "Cumulative numbers." },
    intuition: { approach: "Maintain a running count variable.", timeComplexity: "O(N^2)", spaceComplexity: "O(1)" }
  },
  {
    title: "Sandglass Pattern ⏳",
    description: "Read 'N'. Print an inverted pyramid followed by a pyramid.",
    difficulty: "Hard",
    constraints: ["1 <= N <= 15"],
    testCases: [
      { input: "3", output: "*****\n ***\n  *\n ***\n*****", isPublic: true },
      { input: "2", output: "***\n *\n***", isPublic: true },
      { input: "4", output: "*******\n *****\n  ***\n   *\n  ***\n *****\n*******", isPublic: true }
    ],
    tags: ["Pattern", "Combined"],
    assessmentType: "programming",
    topic: "Pattern Printing",
    example: { input: "2", output: "***\\n *\\n***", explanation: "Inverse then Normal." },
    intuition: { approach: "Inverted Pyramid (size N) -> Pyramid (starting 3, up to N).", timeComplexity: "O(N^2)", spaceComplexity: "O(1)" }
  },
  {
    title: "Letter Triangle 🔠",
    description: "Read 'N'. Print a letter triangle.\nA\nA B\nA B C\n...",
    difficulty: "Easy",
    constraints: ["1 <= N <= 26"],
    testCases: [
      { input: "3", output: "A\nA B\nA B C", isPublic: true },
      { input: "2", output: "A\nA B", isPublic: true },
      { input: "1", output: "A", isPublic: true }
    ],
    tags: ["Pattern", "String"],
    assessmentType: "programming",
    topic: "Pattern Printing",
    example: { input: "2", output: "A\\nA B", explanation: "ASCII characters." },
    intuition: { approach: "Use chr(65 + j) to get uppercase letters.", timeComplexity: "O(N^2)", spaceComplexity: "O(1)" }
  },
  {
    title: "Butterfly Energy 🦋",
    description: "Read 'N'. Print a butterfly pattern.",
    difficulty: "Hard",
    constraints: ["1 <= N <= 10"],
    testCases: [
      { input: "3", output: "*    *\n**  **\n******\n**  **\n*    *", isPublic: true },
      { input: "2", output: "*  *\n****\n*  *", isPublic: true },
      { input: "4", output: "*      *\n**    **\n***  ***\n********\n***  ***\n**    **\n*      *", isPublic: true }
    ],
    tags: ["Pattern", "Complex"],
    assessmentType: "programming",
    topic: "Pattern Printing",
    example: { input: "2", output: "*  *\\n****\\n*  *", explanation: "Symmetric triangles." },
    intuition: { approach: "Split into upper and lower half.", timeComplexity: "O(N^2)", spaceComplexity: "O(1)" }
  },
  {
    title: "X Marks the Spot ❌",
    description: "Read 'N' (odd number). Print an 'X' shape of size N.",
    difficulty: "Hard",
    constraints: ["N must be odd."],
    testCases: [
      { input: "3", output: "* *\n * \n* *", isPublic: true },
      { input: "5", output: "*   *\n * * \n  *  \n * * \n*   *", isPublic: true },
      { input: "7", output: "*     *\n *   * \n  * *  \n   *   \n  * *  \n *   * \n*     *", isPublic: true }
    ],
    tags: ["Pattern", "Conditions"],
    assessmentType: "programming",
    topic: "Pattern Printing",
    example: { input: "3", output: "* *\\n * \\n* *", explanation: "Diagonal based cross." },
    intuition: { approach: "i==j or i+j == N-1.", timeComplexity: "O(N^2)", spaceComplexity: "O(1)" }
  },
  {
    title: "Zebra ZigZag 🦓",
    description: "Read 'N'. Print a Z pattern.",
    difficulty: "Hard",
    constraints: ["1 <= N <= 15"],
    testCases: [
      { input: "3", output: "***\n * \n***", isPublic: true },
      { input: "4", output: "****\n  * \n *  \n****", isPublic: true },
      { input: "5", output: "*****\n   * \n  *  \n *   \n*****", isPublic: true }
    ],
    tags: ["Pattern", "Boundary"],
    assessmentType: "programming",
    topic: "Pattern Printing",
    example: { input: "3", output: "***\\n * \\n***", explanation: "Z-axis boundaries." },
    intuition: { approach: "i==0 or i==N-1 or i+j == N-1.", timeComplexity: "O(N^2)", spaceComplexity: "O(1)" }
  },
  {
    title: "Pascal's Pulse 📉",
    description: "Read 'N'. Print Pascal's Triangle for 'N' rows.",
    difficulty: "Hard",
    constraints: ["1 <= N <= 10"],
    testCases: [
      { input: "3", output: "1\n1 1\n1 2 1", isPublic: true },
      { input: "4", output: "1\n1 1\n1 2 1\n1 3 3 1", isPublic: true },
      { input: "5", output: "1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1", isPublic: true }
    ],
    tags: ["Pattern", "Math"],
    assessmentType: "programming",
    topic: "Pattern Printing",
    example: { input: "3", output: "1\\n1 1\\n1 2 1", explanation: "Sum of parents." },
    intuition: { approach: "Calculate C(n, k).", timeComplexity: "O(N^2)", spaceComplexity: "O(N)" }
  }
];

async function seedPatternQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    await AssessmentQuestion.deleteMany({ topic: 'Pattern Printing' });
    const creatorId = new mongoose.Types.ObjectId("65f1234567890abcdef01234");
    const result = await AssessmentQuestion.insertMany(questions.map(q => ({ 
      ...q, 
      createdBy: creatorId, 
      intuition: { ...q.intuition, spaceComplexity: q.intuition.spaceComplexity || 'O(1)', algorithmSteps: q.intuition.algorithmSteps || ["Loop R", "Inner loop C", "Print result"] }
    })));
    console.log(`Successfully seeded ${result.length} Pattern questions! 🚀`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding:', error);
    process.exit(1);
  }
}

seedPatternQuestions();
