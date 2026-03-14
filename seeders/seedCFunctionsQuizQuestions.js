require('dotenv').config();
const mongoose = require('mongoose');
const QuizQuestion = require('../models/QuizQuestion');
const Tenant = require('../models/Tenant');
const Instructor = require('../models/Instructor');

const cFunctionsQuestions = [
  {
    title: 'What is the output of this C function?',
    codeSnippet: `#include <stdio.h>\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    printf("%d", add(3, 4));\n    return 0;\n}`,
    language: 'c',
    topic: 'Functions',
    options: [
      { text: '7' },
      { text: '34' },
      { text: '0' },
      { text: 'Error' }
    ],
    correctAnswer: 0,
    difficulty: 'easy',
    tags: ['C', 'Functions', 'Return Value']
  },
  {
    title: 'What will this recursive function print?',
    codeSnippet: `#include <stdio.h>\n\nvoid countdown(int n) {\n    if (n == 0) {\n        printf("Go!");\n        return;\n    }\n    printf("%d ", n);\n    countdown(n - 1);\n}\n\nint main() {\n    countdown(3);\n    return 0;\n}`,
    language: 'c',
    topic: 'Recursion',
    options: [
      { text: '3 2 1 Go!' },
      { text: 'Go! 1 2 3' },
      { text: '1 2 3 Go!' },
      { text: '3 2 1' }
    ],
    correctAnswer: 0,
    difficulty: 'easy',
    tags: ['C', 'Recursion', 'Output Prediction']
  },
  {
    title: 'What does this function return for factorial(4)?',
    codeSnippet: `#include <stdio.h>\n\nint factorial(int n) {\n    if (n == 0 || n == 1)\n        return 1;\n    return n * factorial(n - 1);\n}\n\nint main() {\n    printf("%d", factorial(4));\n    return 0;\n}`,
    language: 'c',
    topic: 'Recursion',
    options: [
      { text: '12' },
      { text: '24' },
      { text: '16' },
      { text: '8' }
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    tags: ['C', 'Recursion', 'Factorial']
  },
  {
    title: 'What is the output of this code with multiple functions?',
    codeSnippet: `#include <stdio.h>\n\nint square(int x) {\n    return x * x;\n}\n\nint sumOfSquares(int a, int b) {\n    return square(a) + square(b);\n}\n\nint main() {\n    printf("%d", sumOfSquares(3, 4));\n    return 0;\n}`,
    language: 'c',
    topic: 'Functions',
    options: [
      { text: '7' },
      { text: '25' },
      { text: '49' },
      { text: '12' }
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    tags: ['C', 'Functions', 'Multiple Functions']
  },
  {
    title: 'What will this recursive Fibonacci function return for fib(5)?',
    codeSnippet: `#include <stdio.h>\n\nint fib(int n) {\n    if (n <= 1)\n        return n;\n    return fib(n - 1) + fib(n - 2);\n}\n\nint main() {\n    printf("%d", fib(5));\n    return 0;\n}`,
    language: 'c',
    topic: 'Recursion',
    options: [
      { text: '3' },
      { text: '8' },
      { text: '5' },
      { text: '13' }
    ],
    correctAnswer: 2,
    difficulty: 'medium',
    tags: ['C', 'Recursion', 'Fibonacci']
  },
  {
    title: 'What is the output of this code?',
    codeSnippet: `#include <stdio.h>\n\nint power(int base, int exp) {\n    if (exp == 0)\n        return 1;\n    return base * power(base, exp - 1);\n}\n\nint main() {\n    printf("%d\\n", power(2, 3));\n    printf("%d\\n", power(3, 2));\n    return 0;\n}`,
    language: 'c',
    topic: 'Recursion',
    options: [
      { text: '6\n9' },
      { text: '8\n9' },
      { text: '8\n6' },
      { text: '6\n6' }
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    tags: ['C', 'Recursion', 'Power', 'Multiple Outputs']
  },
  {
    title: 'What does this function print?',
    codeSnippet: `#include <stdio.h>\n\nvoid printReverse(int n) {\n    if (n == 0) return;\n    printReverse(n - 1);\n    printf("%d ", n);\n}\n\nint main() {\n    printReverse(4);\n    return 0;\n}`,
    language: 'c',
    topic: 'Recursion',
    options: [
      { text: '4 3 2 1' },
      { text: '1 2 3 4' },
      { text: '0 1 2 3 4' },
      { text: '4 3 2 1 0' }
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    tags: ['C', 'Recursion', 'Output Prediction', 'Call Stack']
  },
  {
    title: 'What is the output of this code with helper functions?',
    codeSnippet: `#include <stdio.h>\n\nint isEven(int n) {\n    return n % 2 == 0;\n}\n\nint countEven(int arr[], int size) {\n    int count = 0;\n    for (int i = 0; i < size; i++)\n        if (isEven(arr[i])) count++;\n    return count;\n}\n\nint main() {\n    int arr[] = {1, 2, 3, 4, 5, 6};\n    printf("%d", countEven(arr, 6));\n    return 0;\n}`,
    language: 'c',
    topic: 'Functions',
    options: [
      { text: '2' },
      { text: '4' },
      { text: '3' },
      { text: '6' }
    ],
    correctAnswer: 2,
    difficulty: 'medium',
    tags: ['C', 'Functions', 'Arrays', 'Helper Functions']
  },
  {
    title: 'What is the output of this recursive sum function?',
    codeSnippet: `#include <stdio.h>\n\nint sumDigits(int n) {\n    if (n == 0) return 0;\n    return (n % 10) + sumDigits(n / 10);\n}\n\nint main() {\n    printf("%d\\n", sumDigits(123));\n    printf("%d\\n", sumDigits(456));\n    return 0;\n}`,
    language: 'c',
    topic: 'Recursion',
    options: [
      { text: '6\n15' },
      { text: '123\n456' },
      { text: '3\n6' },
      { text: '6\n456' }
    ],
    correctAnswer: 0,
    difficulty: 'hard',
    tags: ['C', 'Recursion', 'Digits', 'Multiple Outputs']
  },
  {
    title: 'What does this code print?',
    codeSnippet: `#include <stdio.h>\n\nint gcd(int a, int b) {\n    if (b == 0) return a;\n    return gcd(b, a % b);\n}\n\nint lcm(int a, int b) {\n    return (a * b) / gcd(a, b);\n}\n\nint main() {\n    printf("GCD: %d\\n", gcd(12, 8));\n    printf("LCM: %d\\n", lcm(4, 6));\n    return 0;\n}`,
    language: 'c',
    topic: 'Recursion',
    options: [
      { text: 'GCD: 4\nLCM: 12' },
      { text: 'GCD: 8\nLCM: 24' },
      { text: 'GCD: 2\nLCM: 12' },
      { text: 'GCD: 4\nLCM: 24' }
    ],
    correctAnswer: 0,
    difficulty: 'hard',
    tags: ['C', 'Recursion', 'GCD', 'LCM', 'Multiple Functions']
  }
];

async function seedCFunctionsQuizQuestions() {
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
    for (const question of cFunctionsQuestions) {
      await QuizQuestion.create({
        ...question,
        tenant: tenant._id,
        createdBy: instructor._id
      });
      createdCount++;
      console.log(`✓ Created: ${question.title.substring(0, 60)}...`);
    }

    console.log(`\n✓ All ${createdCount} C Functions & Recursion quiz questions created successfully!`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedCFunctionsQuizQuestions();
