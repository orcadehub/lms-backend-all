const mongoose = require('mongoose');
const AssessmentQuestion = require('../models/AssessmentQuestion');
require('dotenv').config();

const questions = [
  {
    title: "The OG Inputs 📥",
    description: "Read an integer, a float, and a boolean from **three separate lines** and print them in a formatted string. Ready to be the input main character? \n\nNote: For floats, ORCA expects exactly **2 decimal places**.",
    difficulty: "Easy",
    constraints: ["The integer will be between -10^6 and 10^6.", "The float will have up to 2 decimal places.", "The boolean will be provided as 'True' or 'False'."],
    testCases: [
      { input: "10\n3.14\nTrue", output: "Int: 10, Float: 3.14, Bool: True", isPublic: true },
      { input: "-50\n0.99\nFalse", output: "Int: -50, Float: 0.99, Bool: False", isPublic: true },
      { input: "0\n0.0\nTrue", output: "Int: 0, Float: 0.0, Bool: True", isPublic: true },
      { input: "1000000\n99.99\nFalse", output: "Int: 1000000, Float: 99.99, Bool: False", isPublic: false },
      { input: "-1000000\n-3.14\nTrue", output: "Int: -1000000, Float: -3.14, Bool: True", isPublic: false },
      { input: "42\n1.0\nFalse", output: "Int: 42, Float: 1.0, Bool: False", isPublic: false },
      { input: "7\n7.77\nTrue", output: "Int: 7, Float: 7.77, Bool: True", isPublic: false },
      { input: "99\n0.1\nFalse", output: "Int: 99, Float: 0.1, Bool: False", isPublic: false },
      { input: "-1\n-1.0\nTrue", output: "Int: -1, Float: -1.0, Bool: True", isPublic: false },
      { input: "5\n2.5\nFalse", output: "Int: 5, Float: 2.5, Bool: False", isPublic: false }
    ],
    tags: ["Input", "Basics", "Python"],
    assessmentType: "programming",
    topic: "Inputs",
    example: {
      input: "10\\n3.14\\nTrue",
      output: "Int: 10, Float: 3.14, Bool: True",
      explanation: "Float rounded to 2 decimals."
    },
    intuition: {
      approach: "Read and print.",
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      keyInsights: ["Python f-strings like {:.2f} are great."],
      algorithmSteps: ["Read integer", "Read float", "Read bool string", "Print formatted"]
    }
  },
  {
    title: "Split the Vibe ⚡",
    description: "Read three space-separated integers from one line and print their sum. Efficient energy only.",
    difficulty: "Easy",
    constraints: ["Items are space-separated.", "Values between -10^4 and 10^4."],
    testCases: [
      { input: "10 20 30", output: "Sum is 60", isPublic: true },
      { input: "1 1 1", output: "Sum is 3", isPublic: true },
      { input: "0 0 0", output: "Sum is 0", isPublic: true },
      { input: "-10 -20 -30", output: "Sum is -60", isPublic: false },
      { input: "1000 2000 3000", output: "Sum is 6000", isPublic: false },
      { input: "-5 5 10", output: "Sum is 10", isPublic: false },
      { input: "99 1 0", output: "Sum is 100", isPublic: false },
      { input: "-1 1 -1", output: "Sum is -1", isPublic: false },
      { input: "500 0 -500", output: "Sum is 0", isPublic: false },
      { input: "123 456 789", output: "Sum is 1368", isPublic: false }
    ],
    tags: ["Input", "Basics", "Split"],
    assessmentType: "programming",
    topic: "Inputs",
    example: {
      input: "10 20 30",
      output: "Sum is 60",
      explanation: "Use split() and sum()."
    },
    intuition: {
      approach: "Split and sum.",
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      algorithmSteps: ["Read line", "list(map(int, input().split()))", "Calculate sum", "Print"]
    }
  },
  {
    title: "String Splitting Masterclass 🧶",
    description: "Read a sentence and split it into words. Then, read a separator character and join those words back using that character.",
    difficulty: "Easy",
    constraints: ["Sentence length < 100 characters.", "Separator is a single char."],
    testCases: [
      { input: "Hello World and Python\n-", output: "Hello-World-and-Python", isPublic: true },
      { input: "Coding is fun\n*", output: "Coding*is*fun", isPublic: true },
      { input: "A B C\n|", output: "A|B|C", isPublic: true },
      { input: "Word\n#", output: "Word", isPublic: false },
      { input: "One Two Three\n_", output: "One_Two_Three", isPublic: false },
      { input: "Space Ship One\n.", output: "Space.Ship.One", isPublic: false },
      { input: "Python is great\n+", output: "Python+is+great", isPublic: false },
      { input: "NoSpaces\n?", output: "NoSpaces", isPublic: false },
      { input: "Many Many Many Words\n~", output: "Many~Many~Many~Words", isPublic: false },
      { input: "X Y Z\n/", output: "X/Y/Z", isPublic: false }
    ],
    tags: ["Input", "String", "Basics"],
    assessmentType: "programming",
    topic: "Inputs",
    example: {
      input: "Hello World\\n-",
      output: "Hello-World",
      explanation: "Split and join."
    },
    intuition: {
      approach: "Split and join.",
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      algorithmSteps: ["Read sentence", "Read separator", "Split sentence", "Join with separator", "Print"]
    }
  },
  {
    title: "Array Entry (Fixed Size) 📏",
    description: "Read an integer 'N' (size of array), followed by 'N' integers on separate lines. Store them in a list and print the list.",
    difficulty: "Easy",
    constraints: ["N > 0", "Integers between -100 and 100."],
    testCases: [
      { input: "3\n10\n20\n30", output: "[10, 20, 30]", isPublic: true },
      { input: "2\n1\n0", output: "[1, 0]", isPublic: true },
      { input: "1\n99", output: "[99]", isPublic: true },
      { input: "4\n1\n2\n3\n4", output: "[1, 2, 3, 4]", isPublic: false },
      { input: "5\n0\n0\n0\n0\n0", output: "[0, 0, 0, 0, 0]", isPublic: false },
      { input: "2\n-1\n-2", output: "[-1, -2]", isPublic: false },
      { input: "3\n100\n-100\n50", output: "[100, -100, 50]", isPublic: false },
      { input: "6\n1\n1\n1\n1\n1\n1", output: "[1, 1, 1, 1, 1, 1]", isPublic: false },
      { input: "2\n42\n21", output: "[42, 21]", isPublic: false },
      { input: "4\n-5\n5\n-10\n10", output: "[-5, 5, -10, 10]", isPublic: false }
    ],
    tags: ["Input", "Array", "Loops"],
    assessmentType: "programming",
    topic: "Inputs",
    example: {
      input: "3\\n10\\n20\\n30",
      output: "[10, 20, 30]",
      explanation: "Loop range(N)."
    },
    intuition: {
      approach: "Traditional for-loop.",
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      algorithmSteps: ["Read N", "Initialize empty list", "Loop N times to read input and append", "Print list"]
    }
  },
  {
    title: "Array Entry (Dynamic Split) 🌊",
    description: "Read a single line containing integers separated by commas (','). Convert them into an integer list and print the square of the first element.",
    difficulty: "Easy",
    constraints: ["At least one element exists.", "Separator is specifically a comma."],
    testCases: [
      { input: "4,5,6", output: "16", isPublic: true },
      { input: "10,20", output: "100", isPublic: true },
      { input: "0,1,2", output: "0", isPublic: true },
      { input: "9,8,7,6", output: "81", isPublic: false },
      { input: "-5,5,10", output: "25", isPublic: false },
      { input: "100", output: "10000", isPublic: false },
      { input: "1,2,3,4,5,6,7,8,9,10", output: "1", isPublic: false },
      { input: "-1,0,1", output: "1", isPublic: false },
      { input: "12,34,56", output: "144", isPublic: false },
      { input: "25,0", output: "625", isPublic: false }
    ],
    tags: ["Input", "Array", "Split"],
    assessmentType: "programming",
    topic: "Inputs",
    example: {
      input: "4,5,6",
      output: "16",
      explanation: "split(',') handling."
    },
    intuition: {
      approach: "Read, split, int-ify, square first.",
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      algorithmSteps: ["Read line", "Split by ','", "Convert to ints", "Square first", "Print"]
    }
  },
  {
    title: "The Ultimate Input Boss 👺",
    description: "Boss Level: Read student name, age, 3 scores, and vibe. Output a summary. \n\nNote: For the Average Score, always round to exactly **2 decimal places**.",
    difficulty: "Medium",
    constraints: ["Name is single word.", "Scores are integers."],
    testCases: [
      { input: "Aria\n21\n90 85 95\nPro", output: "Student Aria (21) scored Avg 90.0. Status: Pro", isPublic: true },
      { input: "Leo\n19\n10 10 10\nNoob", output: "Student Leo (19) scored Avg 10.0. Status: Noob", isPublic: true },
      { input: "Zoe\n22\n100 100 100\nLegend", output: "Student Zoe (22) scored Avg 100.0. Status: Legend", isPublic: true },
      { input: "Sam\n18\n0 0 0\nAFK", output: "Student Sam (18) scored Avg 0.0. Status: AFK", isPublic: false },
      { input: "Kai\n20\n50 60 70\nMid", output: "Student Kai (20) scored Avg 60.0. Status: Mid", isPublic: false },
      { input: "Sky\n25\n80 80 80\nSteady", output: "Student Sky (25) scored Avg 80.0. Status: Steady", isPublic: false },
      { input: "Max\n17\n100 50 0\nChaos", output: "Student Max (17) scored Avg 50.0. Status: Chaos", isPublic: false },
      { input: "Luna\n23\n99 99 99\nElite", output: "Student Luna (23) scored Avg 99.0. Status: Elite", isPublic: false },
      { input: "Finn\n21\n33 33 34\nLucky", output: "Student Finn (21) scored Avg 33.33. Status: Lucky", isPublic: false },
      { input: "Raze\n24\n10 20 30\nValorant", output: "Student Raze (24) scored Avg 20.0. Status: Valorant", isPublic: false }
    ],
    tags: ["Input", "Advanced", "Mix"],
    assessmentType: "programming",
    topic: "Inputs",
    example: {
      input: "Aria\\n21\\n90 85 95\\nPro",
      output: "Student Aria (21) scored Avg 90.0. Status: Pro",
      explanation: "Avg rounded to 2 decimals."
    },
    intuition: {
      approach: "Parse line by line. Sum scores and divide by 3.",
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      algorithmSteps: ["Read name", "Read age", "Read line of scores", "Calculate average", "Read status", "Print rounded summary"]
    }
  }
];

async function seedInputQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    await AssessmentQuestion.deleteMany({ topic: 'Inputs' });
    const creatorId = new mongoose.Types.ObjectId("65f1234567890abcdef01234");
    const questionsWithCreator = questions.map(q => ({ ...q, createdBy: creatorId }));
    const result = await AssessmentQuestion.insertMany(questionsWithCreator);
    console.log(`Successfully updated ${result.length} Input questions (Rounded Float Fix)! 🚀`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding questions:', error);
    process.exit(1);
  }
}

seedInputQuestions();
