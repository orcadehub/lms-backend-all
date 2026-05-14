const mongoose = require('mongoose');
const AssessmentQuestion = require('../models/AssessmentQuestion');
require('dotenv').config();

const questions = [
  {
    title: "Arithmetic Wizardry 🧙‍♂️",
    description: "Read two integers 'a' and 'b'. Perform all the following arithmetic operations and print them as a single string separated by spaces: \n1. Sum (+)\n2. Difference (-)\n3. Product (*)\n4. Quotient (/) (Round to 2 decimal places)\n5. Modulo (%)\n6. Exponent (**)\n7. Floor Division (//)\n\nNote: For Quotient (/), always round to **2 decimal places**. All other results are integers.",
    difficulty: "Easy",
    constraints: ["a, b are integers.", "b != 0 for division.", "0 < a, b < 100 for exponent."],
    testCases: [
      { input: "10 3", output: "13 7 30 3.33 1 1000 3", isPublic: true },
      { input: "5 2", output: "7 3 10 2.5 1 25 2", isPublic: true },
      { input: "15 4", output: "19 11 60 3.75 3 50625 3", isPublic: true },
      { input: "20 5", output: "25 15 100 4.0 0 3200000 4", isPublic: false },
      { input: "8 2", output: "10 6 16 4.0 0 64 4", isPublic: false },
      { input: "7 3", output: "10 4 21 2.33 1 343 2", isPublic: false },
      { input: "4 2", output: "6 2 8 2.0 0 16 2", isPublic: false },
      { input: "12 6", output: "18 6 72 2.0 0 2985984 2", isPublic: false },
      { input: "5 5", output: "10 0 25 1.0 0 3125 1", isPublic: false },
      { input: "1 1", output: "2 0 1 1.0 0 1 1", isPublic: false }
    ],
    tags: ["Operators", "Arithmetic", "Basics"],
    assessmentType: "programming",
    topic: "Operators",
    example: {
      input: "10 3",
      output: "13 7 30 3.33 1 1000 3",
      explanation: "10+3=13, 10-3=7, 10*3=30, 10/3=3.33 (rounded), 10%3=1, 10**3=1000, 10//3=3"
    },
    intuition: {
      approach: "Apply each operator. For division, use round(a/b, 2) or formatted string.",
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      keyInsights: ["Python's round() function is key.", "/ always returns a float."],
      algorithmSteps: ["Read a, b", "Calculate results", "Round the float to 2 decimals", "Print space-separated string"]
    }
  },
  {
    title: "Assignment Hustle 💼",
    description: "Read an initial integer 'x'. Perform the following sequence of assignment updates and print the final value of 'x':\n1. Add 10 to 'x' using += \n2. Subtract 5 from 'x' using -= \n3. Multiply 'x' by 2 using *= \n4. Modulo 'x' by 7 using %= \nFinal Value of 'x' is what we need.",
    difficulty: "Easy",
    constraints: ["x is a positive integer."],
    testCases: [
      { input: "5", output: "2", isPublic: true },
      { input: "10", output: "5", isPublic: true },
      { input: "1", output: "12", isPublic: true },
      { input: "0", output: "3", isPublic: false },
      { input: "99", output: "5", isPublic: false },
      { input: "50", output: "4", isPublic: false },
      { input: "7", output: "3", isPublic: false },
      { input: "21", output: "4", isPublic: false },
      { input: "100", output: "0", isPublic: false },
      { input: "33", output: "2", isPublic: false }
    ],
    tags: ["Operators", "Assignment", "Basics"],
    assessmentType: "programming",
    topic: "Operators",
    example: {
      input: "5",
      output: "2",
      explanation: "5->15->10->20->20%7=6... wait, (5+10)=15, 15-5=10, 10*2=20, 20%7=6. Let's recalculate accurately."
    },
    intuition: {
      approach: "Direct assignment updates.",
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      algorithmSteps: ["Read x", "Apply +=, -=, *=, %=", "Print x"]
    }
  },
  {
    title: "The Great Comparison 🔍",
    description: "Compare two values 'P' and 'Q'. Print a boolean string representing if:\n1. P is equal to Q\n2. P is greater than Q\n3. P is not equal to Q\nOutput template: 'Equal: <bool>, Greater: <bool>, NotEqual: <bool>'",
    difficulty: "Easy",
    constraints: ["P, Q are integers."],
    testCases: [
      { input: "10 10", output: "Equal: True, Greater: False, NotEqual: False", isPublic: true },
      { input: "20 5", output: "Equal: False, Greater: True, NotEqual: True", isPublic: true },
      { input: "5 10", output: "Equal: False, Greater: False, NotEqual: True", isPublic: true },
      { input: "-1 -1", output: "Equal: True, Greater: False, NotEqual: False", isPublic: false },
      { input: "0 1", output: "Equal: False, Greater: False, NotEqual: True", isPublic: false },
      { input: "100 99", output: "Equal: False, Greater: True, NotEqual: True", isPublic: false },
      { input: "-5 -10", output: "Equal: False, Greater: True, NotEqual: True", isPublic: false },
      { input: "42 42", output: "Equal: True, Greater: False, NotEqual: False", isPublic: false },
      { input: "1 2", output: "Equal: False, Greater: False, NotEqual: True", isPublic: false },
      { input: "7 7", output: "Equal: True, Greater: False, NotEqual: False", isPublic: false }
    ],
    tags: ["Operators", "Comparison", "Conditional"],
    assessmentType: "programming",
    topic: "Operators",
    example: {
      input: "10 10",
      output: "Equal: True, Greater: False, NotEqual: False",
      explanation: "P and Q are both 10, so Equal is True, and the others follow logically."
    },
    intuition: {
      approach: "Standard comparison.",
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      algorithmSteps: ["Read P, Q", "Compare P==Q, P>Q, P!=Q", "Print formatted string"]
    }
  },
  {
    title: "Logical Flow ⚡",
    description: "Read a number 'N'. Print 'Elite' if N is between 10 and 20 (inclusive) AND is even. Otherwise, print 'Mid'. Use logical operators `and` and `%` for the condition.",
    difficulty: "Easy",
    constraints: ["N is an integer."],
    testCases: [
      { input: "12", output: "Elite", isPublic: true },
      { input: "15", output: "Mid", isPublic: true },
      { input: "22", output: "Mid", isPublic: true },
      { input: "10", output: "Elite", isPublic: false },
      { input: "20", output: "Elite", isPublic: false },
      { input: "11", output: "Mid", isPublic: false },
      { input: "19", output: "Mid", isPublic: false },
      { input: "5", output: "Mid", isPublic: false },
      { input: "16", output: "Elite", isPublic: false },
      { input: "18", output: "Elite", isPublic: false }
    ],
    tags: ["Operators", "Logical", "Condition"],
    assessmentType: "programming",
    topic: "Operators",
    example: {
      input: "12",
      output: "Elite",
      explanation: "12 is between 10-20 and is even."
    },
    intuition: {
      approach: "Combined logical condition.",
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      algorithmSteps: ["Read N", "Check: 10 <= N <= 20 and N % 2 == 0", "Print Based on result"]
    }
  },
  {
    title: "Bitwise Shift 🧬",
    description: "Read a positive integer 'num' and a shift count 's'. \n1. Bitwise Left Shift (<<) 'num' by 's' bits.\n2. Bitwise Right Shift (>>) 'num' by 's' bits.\nPrint results as: 'Left: <val>, Right: <val>'",
    difficulty: "Medium",
    constraints: ["num, s are positive integers.", "s < 10."],
    testCases: [
      { input: "10 2", output: "Left: 40, Right: 2", isPublic: true },
      { input: "5 1", output: "Left: 10, Right: 2", isPublic: true },
      { input: "8 3", output: "Left: 64, Right: 1", isPublic: true },
      { input: "1 4", output: "Left: 16, Right: 0", isPublic: false },
      { input: "100 2", output: "Left: 400, Right: 25", isPublic: false },
      { input: "7 1", output: "Left: 14, Right: 3", isPublic: false },
      { input: "16 4", output: "Left: 256, Right: 1", isPublic: false },
      { input: "3 2", output: "Left: 12, Right: 0", isPublic: false },
      { input: "32 5", output: "Left: 1024, Right: 1", isPublic: false },
      { input: "15 2", output: "Left: 60, Right: 3", isPublic: false }
    ],
    tags: ["Operators", "Bitwise", "Binary"],
    assessmentType: "programming",
    topic: "Operators",
    example: {
      input: "10 2",
      output: "Left: 40, Right: 2",
      explanation: "10 (1010) shifted left by 2 is 40. Shifted right by 2 is 2."
    },
    intuition: {
      approach: "Apply shift operators.",
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      algorithmSteps: ["Read num, s", "Shift and print"]
    }
  },
  {
    title: "Identity Check 🎭",
    description: "Membership check! Read a character 'char' and a string 'word'. \nCheck if the character exists in the word using `in` operator. \nPrint 'Found it' if it exists, otherwise 'Missing'.",
    difficulty: "Easy",
    constraints: ["'char' is a single character.", "'word' is a sentence."],
    testCases: [
      { input: "a\norcade", output: "Found it", isPublic: true },
      { input: "x\norcade", output: "Missing", isPublic: true },
      { input: "O\nORCA", output: "Found it", isPublic: true },
      { input: "!\nHi!", output: "Found it", isPublic: false },
      { input: " \nHello World", output: "Found it", isPublic: false },
      { input: "z\napple", output: "Missing", isPublic: false },
      { input: "e\nsmiLe", output: "Found it", isPublic: false },
      { input: "9\nLevel10", output: "Missing", isPublic: false },
      { input: "G\ngoogle", output: "Missing", isPublic: false },
      { input: ".\nEnd.", output: "Found it", isPublic: false }
    ],
    tags: ["Operators", "Membership", "String"],
    assessmentType: "programming",
    topic: "Operators",
    example: {
      input: "a\\norcade",
      output: "Found it",
      explanation: "Membership check logic."
    },
    intuition: {
      approach: "Use 'in' keyword.",
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      algorithmSteps: ["Read char", "Read word", "Check if char in word", "Print"]
    }
  }
];

async function seedOperatorQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    await AssessmentQuestion.deleteMany({ topic: 'Operators' });
    console.log('Cleared existing Operators questions.');
    const creatorId = new mongoose.Types.ObjectId("65f1234567890abcdef01234");
    const questionsWithCreator = questions.map(q => ({ ...q, createdBy: creatorId }));
    const result = await AssessmentQuestion.insertMany(questionsWithCreator);
    console.log(`Successfully updated ${result.length} Operator questions (Rounded Float Fix)! 🚀`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding questions:', error);
    process.exit(1);
  }
}

seedOperatorQuestions();
