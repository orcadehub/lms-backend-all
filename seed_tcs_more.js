require('dotenv').config();
const mongoose = require('mongoose');
const Company = require('./models/Company');
const CompanySpecificQuestion = require('./models/CompanySpecificQuestion');
const Instructor = require('./models/Instructor');

async function seedMoreTCS() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for More TCS Seeding');

    const instructor = await Instructor.findOne();
    if (!instructor) {
      console.log('No instructor found to use for createdBy');
      process.exit(1);
    }

    const tcs = await Company.findOne({ name: 'TCS' });
    if (!tcs) {
      console.log('TCS company not found.');
      process.exit(1);
    }

    const defaultFields = {
      constraints: ['None'],
      example: { input: 'N/A', output: 'N/A', explanation: 'N/A' },
      intuition: {
        approach: 'N/A',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
        keyInsights: ['N/A'],
        algorithmSteps: ['N/A']
      }
    };

    const questions = [
      {
        company: tcs._id,
        title: 'TCS Coding: Largest and Smallest in Array',
        description: 'Given an array of N integers, find the largest and smallest element in the array. Output should be "Largest: X Smallest: Y".',
        difficulty: 'Easy',
        tags: ['Arrays', 'TCS PYQ', 'Fundamentals'],
        assessmentType: 'programming',
        example: { input: '5\n10 50 12 1 8', output: 'Largest: 50 Smallest: 1', explanation: 'Iterate through the array to find min and max.' },
        constraints: ['1 <= N <= 1000', '-10^5 <= Arr[i] <= 10^5'],
        testCases: [
          { input: '5\n10 50 12 1 8', output: 'Largest: 50 Smallest: 1', isPublic: true },
          { input: '1\n10', output: 'Largest: 10 Smallest: 10', isPublic: true },
          { input: '3\n-1 -5 -2', output: 'Largest: -1 Smallest: -5', isPublic: false }
        ],
        intuition: {
          approach: 'Initialize min and max to first element, then iterate and update.',
          timeComplexity: 'O(N)',
          spaceComplexity: 'O(1)',
          keyInsights: ['Single pass is sufficient.'],
          algorithmSteps: ['Read N', 'Read array', 'Find min/max', 'Print']
        },
        createdBy: instructor._id
      },
      {
        company: tcs._id,
        title: 'TCS Coding: Leap Year Check',
        description: 'Write a program to check if a given year is a leap year. Print "Leap Year" or "Not a Leap Year".\nA year is a leap year if it is divisible by 4. However, if it is a century year (divisible by 100), it must also be divisible by 400.',
        difficulty: 'Easy',
        tags: ['Mathematics', 'If-Else', 'TCS PYQ'],
        assessmentType: 'programming',
        example: { input: '2024', output: 'Leap Year', explanation: '2024 is divisible by 4 and not a century year.' },
        constraints: ['1 <= Year <= 9999'],
        testCases: [
          { input: '2024', output: 'Leap Year', isPublic: true },
          { input: '1900', output: 'Not a Leap Year', isPublic: true },
          { input: '2000', output: 'Leap Year', isPublic: false },
          { input: '2023', output: 'Not a Leap Year', isPublic: false }
        ],
        intuition: {
          approach: 'Check the divisibility rules of leap years.',
          timeComplexity: 'O(1)',
          spaceComplexity: 'O(1)',
          keyInsights: ['The century year rule (divisible by 100 and 400) is the trick.'],
          algorithmSteps: ['Read year', 'If year % 400 == 0 -> Leap', 'Else if year % 100 == 0 -> Not Leap', 'Else if year % 4 == 0 -> Leap']
        },
        createdBy: instructor._id
      },
      {
        company: tcs._id,
        title: 'TCS Coding: Sum of Digits',
        description: 'Given an integer N, calculate the sum of its digits. If N is negative, treat it as a positive number for the sum of digits.',
        difficulty: 'Easy',
        tags: ['Mathematics', 'Loops', 'TCS PYQ'],
        assessmentType: 'programming',
        example: { input: '1234', output: '10', explanation: '1+2+3+4 = 10' },
        constraints: ['-10^9 <= N <= 10^9'],
        testCases: [
          { input: '1234', output: '10', isPublic: true },
          { input: '-456', output: '15', isPublic: true },
          { input: '0', output: '0', isPublic: false }
        ],
        intuition: {
          approach: 'Extract digits using modulo 10 and divide by 10.',
          timeComplexity: 'O(log N)',
          spaceComplexity: 'O(1)',
          keyInsights: ['Take absolute value of N first.'],
          algorithmSteps: ['N = abs(N)', 'While N > 0: sum += N % 10, N /= 10', 'Print sum']
        },
        createdBy: instructor._id
      },
      {
        company: tcs._id,
        title: 'TCS Coding: Decimal to Binary',
        description: 'Given a decimal positive integer N, convert it to its binary representation and print as a string.',
        difficulty: 'Easy',
        tags: ['Number Systems', 'TCS PYQ'],
        assessmentType: 'programming',
        example: { input: '10', output: '1010', explanation: 'Binary of 10 is 1010' },
        constraints: ['0 <= N <= 10^9'],
        testCases: [
          { input: '10', output: '1010', isPublic: true },
          { input: '0', output: '0', isPublic: true },
          { input: '255', output: '11111111', isPublic: false }
        ],
        intuition: {
          approach: 'Divide by 2 and store remainders.',
          timeComplexity: 'O(log N)',
          spaceComplexity: 'O(log N)',
          keyInsights: ['Read remainders in reverse order.'],
          algorithmSteps: ['If N==0 print 0', 'While N > 0, append N%2 to string, N/=2', 'Reverse string and print']
        },
        createdBy: instructor._id
      },
      {
        company: tcs._id,
        title: 'TCS Coding: Remove Vowels',
        description: 'Given a string S, remove all vowels (a, e, i, o, u, A, E, I, O, U) from it and print the resulting string.',
        difficulty: 'Easy',
        tags: ['Strings', 'TCS PYQ'],
        assessmentType: 'programming',
        example: { input: 'Computer', output: 'Cmptr', explanation: 'o, u, e are removed.' },
        constraints: ['1 <= length(S) <= 1000'],
        testCases: [
          { input: 'Computer', output: 'Cmptr', isPublic: true },
          { input: 'AEIOUaeiou', output: '', isPublic: true },
          { input: 'TCS NQT', output: 'TCS NQT', isPublic: false }
        ],
        intuition: {
          approach: 'Iterate through string and append non-vowels to a new string.',
          timeComplexity: 'O(N)',
          spaceComplexity: 'O(N)',
          keyInsights: ['Check both uppercase and lowercase vowels.'],
          algorithmSteps: ['For each char in S', 'If char is not in "aeiouAEIOU", append to result']
        },
        createdBy: instructor._id
      },
      {
        company: tcs._id,
        title: 'TCS NQT PYQ: Monkey on the Tree',
        description: `There are total n number of Monkeys sitting on the branches of a huge Tree. As travelers offer Bananas and Peanuts, the Monkeys jump down the Tree. If every Monkey can eat k Bananas, or j Peanuts. If total m Bananas and p Peanuts are offered by travelers, calculate how many Monkeys remain on the Tree after some of them jump down to eat.
Input Format:
n - Total no of Monkeys
k - Number of eatable Bananas by Single Monkey
j - Number of eatable Peanuts by Single Monkey
m - Total number of Bananas
p - Total number of Peanuts

Output the number of monkeys left on the tree. If inputs are invalid, print "INVALID INPUT".`,
        difficulty: 'Medium',
        tags: ['TCS PYQ', 'Mathematics', 'Logic'],
        assessmentType: 'programming',
        example: { input: '20\n2\n3\n12\n12', output: 'Number of Monkeys left on the tree: 10', explanation: 'Bananas eat 12/2=6 monkeys. Peanuts eat 12/3=4 monkeys. Total monkeys eaten = 10. Left = 20-10 = 10.' },
        constraints: ['n > 0', 'k > 0', 'j > 0', 'm >= 0', 'p >= 0'],
        testCases: [
          { input: '20\n2\n3\n12\n12', output: 'Number of Monkeys left on the tree: 10', isPublic: true },
          { input: '20\n3\n2\n12\n13', output: 'Number of Monkeys left on the tree: 9', isPublic: true },
          { input: '-1\n2\n3\n10\n10', output: 'INVALID INPUT', isPublic: false },
          { input: '10\n0\n0\n0\n0', output: 'INVALID INPUT', isPublic: false }
        ],
        intuition: {
          approach: 'Calculate monkeys that ate bananas and peanuts. Monkeys eaten = floor(m/k) + floor(p/j). Extra bananas/peanuts mean 1 more monkey jumped down to eat the remainder.',
          timeComplexity: 'O(1)',
          spaceComplexity: 'O(1)',
          keyInsights: ['If m%k > 0, one extra monkey came down. Same for p%j.'],
          algorithmSteps: ['Check valid inputs', 'Calculate monkeys for bananas', 'Calculate monkeys for peanuts', 'Subtract from total']
        },
        createdBy: instructor._id
      },
      {
        company: tcs._id,
        title: 'TCS NQT PYQ: Minting Mints',
        description: `It was one of the places, where people need to get their provisions in advance. We were ready for the distribution of mints to children.
The first child will get 'len' mints.
For the subsequent children, the number of mints they get is equal to the sum of all mints given to the previous children, minus 1.

Given len and n (number of children), calculate the total number of mints given out.`,
        difficulty: 'Medium',
        tags: ['TCS PYQ', 'Series', 'Mathematics'],
        assessmentType: 'programming',
        example: { input: '4\n2', output: '7', explanation: 'Child 1: 4. Child 2: 4-1 = 3. Total: 7.' },
        constraints: ['1 <= len <= 100', '1 <= n <= 20'],
        testCases: [
          { input: '4\n2', output: '7', isPublic: true },
          { input: '14\n4', output: '105', isPublic: true },
          { input: '1\n1', output: '1', isPublic: false }
        ],
        intuition: {
          approach: 'Simulate the process of distributing mints.',
          timeComplexity: 'O(N)',
          spaceComplexity: 'O(1)',
          keyInsights: ['Keep a running sum of all mints given out so far.'],
          algorithmSteps: ['sum = len', 'current = len', 'Loop from 2 to n: new_mints = sum - 1, sum += new_mints', 'Print sum']
        },
        createdBy: instructor._id
      }
    ];

    for (const q of questions) {
      await CompanySpecificQuestion.create(q);
      console.log(`Created: ${q.title}`);
    }

    console.log('Successfully populated MORE TCS PYQs!');

  } catch (error) {
    console.error('Error seeding PYQs:', error);
  } finally {
    process.exit();
  }
}

seedMoreTCS();
