require('dotenv').config();
const mongoose = require('mongoose');
const QuizQuestion = require('../models/QuizQuestion');
const Tenant = require('../models/Tenant');
const Instructor = require('../models/Instructor');

const cFunctionsQuestions2 = [
  {
    title: 'What is the output? (Pass by Value)',
    codeSnippet: `#include <stdio.h>\n\nvoid change(int x) {\n    x = 100;\n}\n\nint main() {\n    int a = 10;\n    change(a);\n    printf("%d", a);\n    return 0;\n}`,
    language: 'c',
    topic: 'Functions',
    options: [
      { text: '100' },
      { text: '10' },
      { text: '0' },
      { text: 'Error' }
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    tags: ['C', 'Functions', 'Pass by Value']
  },
  {
    title: 'What is the output? (Static variable in function)',
    codeSnippet: `#include <stdio.h>\n\nvoid counter() {\n    static int count = 0;\n    count++;\n    printf("%d ", count);\n}\n\nint main() {\n    counter();\n    counter();\n    counter();\n    return 0;\n}`,
    language: 'c',
    topic: 'Functions',
    options: [
      { text: '0 0 0' },
      { text: '1 1 1' },
      { text: '1 2 3' },
      { text: '3 2 1' }
    ],
    correctAnswer: 2,
    difficulty: 'medium',
    tags: ['C', 'Functions', 'Static Variable']
  },
  {
    title: 'What does this recursive function print?',
    codeSnippet: `#include <stdio.h>\n\nvoid printBinary(int n) {\n    if (n == 0) return;\n    printBinary(n / 2);\n    printf("%d", n % 2);\n}\n\nint main() {\n    printBinary(6);\n    return 0;\n}`,
    language: 'c',
    topic: 'Recursion',
    options: [
      { text: '011' },
      { text: '110' },
      { text: '101' },
      { text: '010' }
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    tags: ['C', 'Recursion', 'Binary', 'Output Prediction']
  },
  {
    title: 'What is the output of this code?',
    codeSnippet: `#include <stdio.h>\n\nint multiply(int a, int b) {\n    return a * b;\n}\n\nint applyTwice(int x) {\n    return multiply(x, x) + multiply(x, 2);\n}\n\nint main() {\n    printf("%d", applyTwice(3));\n    return 0;\n}`,
    language: 'c',
    topic: 'Functions',
    options: [
      { text: '12' },
      { text: '15' },
      { text: '18' },
      { text: '9' }
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    tags: ['C', 'Functions', 'Multiple Functions', 'Output Prediction']
  },
  {
    title: 'What is the output? (Recursive with return)',
    codeSnippet: `#include <stdio.h>\n\nint sumN(int n) {\n    if (n == 0) return 0;\n    return n + sumN(n - 1);\n}\n\nint main() {\n    printf("%d\\n", sumN(4));\n    printf("%d\\n", sumN(5));\n    return 0;\n}`,
    language: 'c',
    topic: 'Recursion',
    options: [
      { text: '10\n15' },
      { text: '4\n5' },
      { text: '6\n10' },
      { text: '10\n10' }
    ],
    correctAnswer: 0,
    difficulty: 'easy',
    tags: ['C', 'Recursion', 'Sum', 'Multiple Outputs']
  },
  {
    title: 'What does this code print? (Mutual recursion)',
    codeSnippet: `#include <stdio.h>\n\nint isEven(int n);\nint isOdd(int n);\n\nint isEven(int n) {\n    if (n == 0) return 1;\n    return isOdd(n - 1);\n}\n\nint isOdd(int n) {\n    if (n == 0) return 0;\n    return isEven(n - 1);\n}\n\nint main() {\n    printf("%d\\n", isEven(4));\n    printf("%d\\n", isOdd(3));\n    return 0;\n}`,
    language: 'c',
    topic: 'Recursion',
    options: [
      { text: '0\n0' },
      { text: '1\n1' },
      { text: '0\n1' },
      { text: '1\n0' }
    ],
    correctAnswer: 1,
    difficulty: 'hard',
    tags: ['C', 'Recursion', 'Mutual Recursion', 'Output Prediction']
  },
  {
    title: 'What is the output? (Pointer as function argument)',
    codeSnippet: `#include <stdio.h>\n\nvoid doubleIt(int *x) {\n    *x = *x * 2;\n}\n\nint main() {\n    int a = 5;\n    doubleIt(&a);\n    printf("%d", a);\n    return 0;\n}`,
    language: 'c',
    topic: 'Functions',
    options: [
      { text: '5' },
      { text: '25' },
      { text: '10' },
      { text: '0' }
    ],
    correctAnswer: 2,
    difficulty: 'medium',
    tags: ['C', 'Functions', 'Pointers', 'Pass by Reference']
  },
  {
    title: 'What does this recursive function return for count(5)?',
    codeSnippet: `#include <stdio.h>\n\nint count(int n) {\n    if (n <= 0) return 0;\n    if (n % 2 == 0)\n        return 1 + count(n - 1);\n    return count(n - 1);\n}\n\nint main() {\n    printf("%d", count(5));\n    return 0;\n}`,
    language: 'c',
    topic: 'Recursion',
    options: [
      { text: '5' },
      { text: '3' },
      { text: '2' },
      { text: '1' }
    ],
    correctAnswer: 2,
    difficulty: 'hard',
    tags: ['C', 'Recursion', 'Counting', 'Output Prediction']
  },
  {
    title: 'What is the output of this code? (Nested function calls)',
    codeSnippet: `#include <stdio.h>\n\nint add(int a, int b) { return a + b; }\nint sub(int a, int b) { return a - b; }\nint mul(int a, int b) { return a * b; }\n\nint main() {\n    int x = mul(add(2, 3), sub(10, 5));\n    printf("%d", x);\n    return 0;\n}`,
    language: 'c',
    topic: 'Functions',
    options: [
      { text: '10' },
      { text: '25' },
      { text: '50' },
      { text: '15' }
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    tags: ['C', 'Functions', 'Nested Calls', 'Output Prediction']
  },
  {
    title: 'What does this Tower of Hanoi function print for n=2?',
    codeSnippet: `#include <stdio.h>\n\nvoid hanoi(int n, char from, char to, char aux) {\n    if (n == 1) {\n        printf("Move disk 1 from %c to %c\\n", from, to);\n        return;\n    }\n    hanoi(n - 1, from, aux, to);\n    printf("Move disk %d from %c to %c\\n", n, from, to);\n    hanoi(n - 1, aux, to, from);\n}\n\nint main() {\n    hanoi(2, 'A', 'C', 'B');\n    return 0;\n}`,
    language: 'c',
    topic: 'Recursion',
    options: [
      { text: 'Move disk 1 from A to C\nMove disk 2 from A to B\nMove disk 1 from B to C' },
      { text: 'Move disk 1 from A to B\nMove disk 2 from A to C\nMove disk 1 from B to C' },
      { text: 'Move disk 2 from A to C\nMove disk 1 from A to B' },
      { text: 'Move disk 1 from A to C\nMove disk 1 from A to B' }
    ],
    correctAnswer: 1,
    difficulty: 'hard',
    tags: ['C', 'Recursion', 'Tower of Hanoi', 'Output Prediction']
  }
];

async function seedCFunctionsQuizQuestions2() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const tenant = await Tenant.findOne();
    const instructor = await Instructor.findOne();

    if (!tenant || !instructor) {
      console.error('Tenant or Instructor not found');
      process.exit(1);
    }

    let createdCount = 0;
    for (const question of cFunctionsQuestions2) {
      await QuizQuestion.create({
        ...question,
        tenant: tenant._id,
        createdBy: instructor._id
      });
      createdCount++;
      console.log(`✓ Created: ${question.title}`);
    }

    console.log(`\n✓ All ${createdCount} C Functions & Recursion quiz questions (Part 2) created successfully!`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedCFunctionsQuizQuestions2();
