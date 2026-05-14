const mongoose = require('mongoose');
const AssessmentQuestion = require('../models/AssessmentQuestion');
require('dotenv').config();

const questions = [
  {
    title: "Battle of Two ⚔️",
    description: "Read two integers 'a' and 'b'. Print the larger of the two numbers. If they are equal, print 'Both are equal'.",
    difficulty: "Easy",
    constraints: ["a, b are integers between -10^6 and 10^6."],
    testCases: [
      { input: "10 20", output: "20", isPublic: true },
      { input: "50 5", output: "50", isPublic: true },
      { input: "5 5", output: "Both are equal", isPublic: true },
      { input: "-10 -20", output: "-10", isPublic: false },
      { input: "-5 -5", output: "Both are equal", isPublic: false },
      { input: "0 0", output: "Both are equal", isPublic: false },
      { input: "1000000 999999", output: "1000000", isPublic: false },
      { input: "7 14", output: "14", isPublic: false },
      { input: "-1 1", output: "1", isPublic: false },
      { input: "42 0", output: "42", isPublic: false }
    ],
    tags: ["Conditions", "Comparison", "Basics"],
    assessmentType: "programming",
    topic: "Conditions",
    example: { input: "10 20", output: "20", explanation: "20 > 10, so 20 is the winner." },
    intuition: { approach: "Use if-elif-else to compare.", timeComplexity: "O(1)", spaceComplexity: "O(1)", algorithmSteps: ["Read a, b", "If a > b print a", "Elif b > a print b", "Else print Both are equal"] }
  },
  {
    title: "The Ultimate Trio 👑",
    description: "Read three integers 'a', 'b', and 'c'. Find and print the maximum value among them using **logical operators** (`and`). No nested if-statements allowed! If all are equal, print that value.",
    difficulty: "Easy",
    constraints: ["a, b, c are integers."],
    testCases: [
      { input: "10 50 30", output: "50", isPublic: true },
      { input: "100 20 30", output: "100", isPublic: true },
      { input: "5 10 25", output: "25", isPublic: true },
      { input: "-1 -5 -10", output: "-1", isPublic: false },
      { input: "0 0 0", output: "0", isPublic: false },
      { input: "5 5 10", output: "10", isPublic: false },
      { input: "99 99 1", output: "99", isPublic: false },
      { input: "10 20 20", output: "20", isPublic: false },
      { input: "-100 0 -50", output: "0", isPublic: false },
      { input: "1 2 3", output: "3", isPublic: false }
    ],
    tags: ["Conditions", "Logical", "Basics"],
    assessmentType: "programming",
    topic: "Conditions",
    example: { input: "10 50 30", output: "50", explanation: "50 is greater than both 10 and 30." },
    intuition: { approach: "Check if 'a' is >= both 'b' and 'c' using 'and'. Repeat for 'b' and 'c'.", timeComplexity: "O(1)", spaceComplexity: "O(1)", algorithmSteps: ["Read a, b, c", "Check (a >= b and a >= c)", "Check (b >= a and b >= c)", "Check (c >= a and c >= b)", "Print winner"] }
  },
  {
    title: "Vibe Check (Even/Odd) ⚖️",
    description: "Read an integer 'N'. Print 'Even' if the number is divisible by 2, otherwise print 'Odd'. Easy work.",
    difficulty: "Easy",
    constraints: ["N can be negative."],
    testCases: [
      { input: "10", output: "Even", isPublic: true },
      { input: "7", output: "Odd", isPublic: true },
      { input: "0", output: "Even", isPublic: true },
      { input: "-2", output: "Even", isPublic: false },
      { input: "-31", output: "Odd", isPublic: false },
      { input: "1000001", output: "Odd", isPublic: false },
      { input: "2468", output: "Even", isPublic: false },
      { input: "999", output: "Odd", isPublic: false },
      { input: "1", output: "Odd", isPublic: false },
      { input: "-0", output: "Even", isPublic: false }
    ],
    tags: ["Conditions", "Modulo", "Basics"],
    assessmentType: "programming",
    topic: "Conditions",
    example: { input: "10", output: "Even", explanation: "10 divided by 2 has remainder 0." },
    intuition: { approach: "Use modulo operator %.", timeComplexity: "O(1)", spaceComplexity: "O(1)", algorithmSteps: ["Read N", "If N % 2 == 0 print Even", "Else print Odd"] }
  },
  {
    title: "The Sign Board 🛑",
    description: "Read a number 'X'. Print 'Positive' if it is greater than 0, 'Negative' if it is less than 0, and 'Zero' if it is 0.",
    difficulty: "Easy",
    constraints: ["X is a float or integer."],
    testCases: [
      { input: "10.5", output: "Positive", isPublic: true },
      { input: "-5", output: "Negative", isPublic: true },
      { input: "0", output: "Zero", isPublic: true },
      { input: "-0.01", output: "Negative", isPublic: false },
      { input: "0.0001", output: "Positive", isPublic: false },
      { input: "-100000", output: "Negative", isPublic: false },
      { input: "9999", output: "Positive", isPublic: false },
      { input: "0.0", output: "Zero", isPublic: false },
      { input: "-1.0", output: "Negative", isPublic: false },
      { input: "0.5", output: "Positive", isPublic: false }
    ],
    tags: ["Conditions", "Comparison", "Floats"],
    assessmentType: "programming",
    topic: "Conditions",
    example: { input: "10.5", output: "Positive", explanation: "10.5 > 0." },
    intuition: { approach: "Standard if-elif-else logic.", timeComplexity: "O(1)", spaceComplexity: "O(1)", algorithmSteps: ["Read X", "Compare to 0", "Print sign"] }
  },
  {
    title: "Leap Year Hunt 📅",
    description: "A year is a leap year if it is divisible by 4. However, century years (like 1900) are ONLY leap years if they are divisible by 400. \nRead a year 'Y' and print 'Leap Year' or 'Regular Year'.",
    difficulty: "Medium",
    constraints: ["Y > 0"],
    testCases: [
      { input: "2000", output: "Leap Year", isPublic: true },
      { input: "1900", output: "Regular Year", isPublic: true },
      { input: "2024", output: "Leap Year", isPublic: true },
      { input: "2100", output: "Regular Year", isPublic: false },
      { input: "2023", output: "Regular Year", isPublic: false },
      { input: "1600", output: "Leap Year", isPublic: false },
      { input: "2400", output: "Leap Year", isPublic: false },
      { input: "2004", output: "Leap Year", isPublic: false },
      { input: "1800", output: "Regular Year", isPublic: false },
      { input: "2020", output: "Leap Year", isPublic: false }
    ],
    tags: ["Conditions", "LeapYear", "Match"],
    assessmentType: "programming",
    topic: "Conditions",
    example: { input: "2000", output: "Leap Year", explanation: "Century year divisible by 400 is a Leap Year." },
    intuition: { approach: "Combined condition: (Y%4==0 and Y%100!=0) or (Y%400==0).", timeComplexity: "O(1)", spaceComplexity: "O(1)", algorithmSteps: ["Read Y", "Apply logic", "Print"] }
  },
  {
    title: "Vowel or NAH? 🗣️",
    description: "Read a single character. Print 'Vowel' if it's (a, e, i, o, u) or their uppercase versions. Otherwise, if it's an alphabet letter, print 'Consonant'. If it's not a letter, print 'Invalid'.",
    difficulty: "Easy",
    constraints: ["Input is a single character string."],
    testCases: [
      { input: "a", output: "Vowel", isPublic: true },
      { input: "B", output: "Consonant", isPublic: true },
      { input: "9", output: "Invalid", isPublic: true },
      { input: "e", output: "Vowel", isPublic: false },
      { input: "I", output: "Vowel", isPublic: false },
      { input: "z", output: "Consonant", isPublic: false },
      { input: "$", output: "Invalid", isPublic: false },
      { input: "O", output: "Vowel", isPublic: false },
      { input: "u", output: "Vowel", isPublic: false },
      { input: "y", output: "Consonant", isPublic: false }
    ],
    tags: ["Conditions", "Membership", "String"],
    assessmentType: "programming",
    topic: "Conditions",
    example: { input: "a", output: "Vowel", explanation: " 'a' is a vowel." },
    intuition: { approach: "Use .lower() and 'in' for vowels, .isalpha() for letters.", timeComplexity: "O(1)", spaceComplexity: "O(1)", algorithmSteps: ["Read char", "Normalize char", "Check if vowel", "Else check if letter", "Else invalid"] }
  },
  {
    title: "The Grade Factor 🎓",
    description: "Read a student score (0-100). Print the grade based on this slab: \n90-100 -> A\n80-89 -> B\n70-79 -> C\nBelow 70 -> D",
    difficulty: "Easy",
    constraints: ["Score is an integer 0-100."],
    testCases: [
      { input: "95", output: "A", isPublic: true },
      { input: "82", output: "B", isPublic: true },
      { input: "70", output: "C", isPublic: true },
      { input: "65", output: "D", isPublic: false },
      { input: "0", output: "D", isPublic: false },
      { input: "100", output: "A", isPublic: false },
      { input: "89", output: "B", isPublic: false },
      { input: "90", output: "A", isPublic: false },
      { input: "79", output: "C", isPublic: false },
      { input: "80", output: "B", isPublic: false }
    ],
    tags: ["Conditions", "Ranges", "Education"],
    assessmentType: "programming",
    topic: "Conditions",
    example: { input: "95", output: "A", explanation: "95 is in 90-100 range." },
    intuition: { approach: "Use if-elif-else cascade.", timeComplexity: "O(1)", spaceComplexity: "O(1)", algorithmSteps: ["Read score", "Check ranges", "Print grade"] }
  },
  {
    title: "Electricity Master ⚡",
    description: "Calculate the total bill based on units consumed:\n- First 100 units: $5 per unit\n- Next 100 units (101-200): $10 per unit\n- Above 200 units: $15 per unit\n\nRead 'units' and print the total bill. \nExample: 150 units = (100*5) + (50*10) = 1000.",
    difficulty: "Medium",
    constraints: ["units >= 0"],
    testCases: [
      { input: "150", output: "1000", isPublic: true },
      { input: "50", output: "250", isPublic: true },
      { input: "250", output: "2250", isPublic: true },
      { input: "100", output: "500", isPublic: false },
      { input: "200", output: "1500", isPublic: false },
      { input: "0", output: "0", isPublic: false },
      { input: "10", output: "50", isPublic: false },
      { input: "101", output: "510", isPublic: false },
      { input: "201", output: "1515", isPublic: false },
      { input: "300", output: "3000", isPublic: false }
    ],
    tags: ["Conditions", "Slabs", "Finance"],
    assessmentType: "programming",
    topic: "Conditions",
    example: { input: "150", output: "1000", explanation: "100 units at $5 and 50 units at $10." },
    intuition: { approach: "Calculate based on tiers.", timeComplexity: "O(1)", spaceComplexity: "O(1)", algorithmSteps: ["Read units", "Check if units <= 100", "Elif units <= 200", "Else calc all three tiers", "Print sum"] }
  },
  {
    title: "Triangle Architect 📐",
    description: "Read three side lengths. Print 'Equilateral' if all sides are equal, 'Isosceles' if exactly two sides are equal, and 'Scalene' if none are equal. \nNote: Assume the sides always form a valid triangle.",
    difficulty: "Easy",
    constraints: ["Sides are positive integers."],
    testCases: [
      { input: "10 10 10", output: "Equilateral", isPublic: true },
      { input: "10 10 5", output: "Isosceles", isPublic: true },
      { input: "3 4 5", output: "Scalene", isPublic: true },
      { input: "5 10 10", output: "Isosceles", isPublic: false },
      { input: "7 8 7", output: "Isosceles", isPublic: false },
      { input: "1 2 3", output: "Scalene", isPublic: false },
      { input: "100 100 100", output: "Equilateral", isPublic: false },
      { input: "8 8 1", output: "Isosceles", isPublic: false },
      { input: "9 10 11", output: "Scalene", isPublic: false },
      { input: "2 2 2", output: "Equilateral", isPublic: false }
    ],
    tags: ["Conditions", "Geometry", "Basics"],
    assessmentType: "programming",
    topic: "Conditions",
    example: { input: "10 10 10", output: "Equilateral", explanation: "All sides are 10." },
    intuition: { approach: "Compare sides equality.", timeComplexity: "O(1)", spaceComplexity: "O(1)", algorithmSteps: ["Read a, b, c", "Check a==b==c", "Check a==b or b==c or a==c", "Else scalene"] }
  },
  {
    title: "Quadrant Scout 🔍",
    description: "Read X and Y coordinates of a point. Print which quadrant it belongs to:\n- Quadrant 1 (X > 0, Y > 0)\n- Quadrant 2 (X < 0, Y > 0)\n- Quadrant 3 (X < 0, Y < 0)\n- Quadrant 4 (X > 0, Y < 0)\nIf it is on an axis, print 'On Axis'. If it is origin, print 'Origin'.",
    difficulty: "Medium",
    constraints: ["X, Y are integers."],
    testCases: [
      { input: "10 5", output: "Quadrant 1", isPublic: true },
      { input: "-5 5", output: "Quadrant 2", isPublic: true },
      { input: "0 0", output: "Origin", isPublic: true },
      { input: "-1 -1", output: "Quadrant 3", isPublic: false },
      { input: "1 -1", output: "Quadrant 4", isPublic: false },
      { input: "0 10", output: "On Axis", isPublic: false },
      { input: "5 0", output: "On Axis", isPublic: false },
      { input: "-10 0", output: "On Axis", isPublic: false },
      { input: "0 -5", output: "On Axis", isPublic: false },
      { input: "-2 2", output: "Quadrant 2", isPublic: false }
    ],
    tags: ["Conditions", "Geometry", "Coordinate"],
    assessmentType: "programming",
    topic: "Conditions",
    example: { input: "10 5", output: "Quadrant 1", explanation: "Both X and Y are positive." },
    intuition: { approach: "Multi-branch condition.", timeComplexity: "O(1)", spaceComplexity: "O(1)", algorithmSteps: ["Read X, Y", "Check Origin", "Check Axis", "Determine Quadrant by signs"] }
  }
];

async function seedConditionQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    await AssessmentQuestion.deleteMany({ topic: 'Conditions' });
    const creatorId = new mongoose.Types.ObjectId("65f1234567890abcdef01234");
    const result = await AssessmentQuestion.insertMany(questions.map(q => ({ ...q, createdBy: creatorId })));
    console.log(`Successfully seeded ${result.length} Conditions questions! 🚀`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding:', error);
    process.exit(1);
  }
}

seedConditionQuestions();
