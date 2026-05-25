require('dotenv').config();
const mongoose = require('mongoose');
const CompanySpecificQuestion = require('./models/CompanySpecificQuestion');
const Company = require('./models/Company');
const Instructor = require('./models/Instructor');

async function cleanAndSeed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');

    // 1. Delete Dummy Questions
    const deleteRes = await CompanySpecificQuestion.deleteMany({
      title: { $regex: /Sample|Dummy/i }
    });
    console.log(`Deleted ${deleteRes.deletedCount} dummy questions.`);

    const tcs = await Company.findOne({ name: 'TCS' });
    const instructor = await Instructor.findOne();

    if (!tcs || !instructor) {
      console.log('TCS or Instructor not found');
      process.exit();
    }

    // 2. Add more real questions
    const defaultFields = {
      constraints: ['None'],
      example: { input: 'N/A', output: 'N/A', explanation: 'N/A' },
      intuition: { approach: 'N/A', timeComplexity: 'O(1)', spaceComplexity: 'O(1)', keyInsights: ['N/A'], algorithmSteps: ['N/A'] }
    };

    const questions = [
      {
        company: tcs._id,
        title: 'TCS NQT PYQ: Oddly Even',
        description: `Given a maximum of 100 digit numbers as input, find the difference between the sum of odd and even position digits.
Input: A string of numbers.
Output: Difference between sum of odd position digits and sum of even position digits (absolute value).
Assume 1-based indexing for positions (i.e., first digit is at position 1 which is odd).`,
        difficulty: 'Easy',
        tags: ['TCS NQT', 'Mathematics', 'Strings'],
        assessmentType: 'programming',
        example: { input: '4567', output: '2', explanation: 'Odd pos: 4+6=10. Even pos: 5+7=12. Abs(10-12) = 2.' },
        constraints: ['Number length <= 100'],
        testCases: [
          { input: '4567', output: '2', isPublic: true },
          { input: '5476', output: '2', isPublic: true },
          { input: '9834698765123', output: '1', isPublic: false }
        ],
        intuition: {
          approach: 'Iterate the string. If index is even (0-based), add to odd_sum. Else add to even_sum. Return abs(odd_sum - even_sum).',
          timeComplexity: 'O(N)',
          spaceComplexity: 'O(1)',
          keyInsights: ['Handle numbers as strings due to length constraint.'],
          algorithmSteps: ['Init odd_sum, even_sum', 'Iterate chars', 'Update sums based on index parity', 'Print absolute difference']
        },
        createdBy: instructor._id
      },
      {
        company: tcs._id,
        title: 'TCS NQT PYQ: Custom Caesar Cipher',
        description: `The Caesar cipher is a type of substitution cipher in which each letter in the plaintext is replaced by a letter some fixed number of positions down the alphabet. 
Write a function to implement a Custom Caesar Cipher. Given a string and an integer key, encrypt the string by shifting every alphabetical character by the key amount.
Input: First line is the string. Second line is the integer key.
Output: Encrypted string.
If the string contains numbers or special characters, output "INVALID INPUT".`,
        difficulty: 'Medium',
        tags: ['TCS NQT', 'Strings', 'Cryptography'],
        assessmentType: 'programming',
        example: { input: 'All the best\n1', output: 'Bmm uif cftu', explanation: 'A shifted by 1 is B, l -> m, etc. Spaces remain spaces.' },
        constraints: ['0 <= Key <= 25', 'String length <= 100'],
        testCases: [
          { input: 'All the best\n1', output: 'Bmm uif cftu', isPublic: true },
          { input: 'Hello\n5', output: 'Mjqqt', isPublic: true },
          { input: 'Hi123\n2', output: 'INVALID INPUT', isPublic: false }
        ],
        intuition: {
          approach: 'Check for invalid characters using regex. Then iterate each character, if alphabet shift it by key wrapping around A-Z or a-z.',
          timeComplexity: 'O(N)',
          spaceComplexity: 'O(N)',
          keyInsights: ['Maintain the case (upper/lower).'],
          algorithmSteps: ['Check regex', 'Loop chars', 'Shift char code', 'Print result']
        },
        createdBy: instructor._id
      },
      {
        company: tcs._id,
        title: 'TCS NQT PYQ: Alternating Series',
        description: `Find the Nth term of the series:
1, 2, 1, 3, 2, 5, 3, 7, 5, 11, 8, 13, 13, 17...
This series is a mixture of two series:
Odd terms: Fibonacci series (1, 1, 2, 3, 5, 8, 13...)
Even terms: Prime numbers (2, 3, 5, 7, 11, 13, 17...)
Given N, output the Nth term.`,
        difficulty: 'Medium',
        tags: ['TCS NQT', 'Series', 'Logic'],
        assessmentType: 'programming',
        example: { input: '14', output: '17', explanation: '14 is even, so it maps to the 7th prime number, which is 17.' },
        constraints: ['1 <= N <= 30'],
        testCases: [
          { input: '14', output: '17', isPublic: true },
          { input: '1', output: '1', isPublic: true },
          { input: '11', output: '8', isPublic: false }
        ],
        intuition: {
          approach: 'Check if N is odd or even. If odd, find the (N/2 + 1)th Fibonacci number. If even, find the (N/2)th Prime number.',
          timeComplexity: 'O(N^2) for primes',
          spaceComplexity: 'O(1)',
          keyInsights: ['Use a helper function for primes and fibonacci.'],
          algorithmSteps: ['Read N', 'If odd -> fib(N/2 + 1)', 'If even -> nth_prime(N/2)', 'Print result']
        },
        createdBy: instructor._id
      }
    ];

    for (const q of questions) {
      await CompanySpecificQuestion.create(q);
      console.log(`Created: ${q.title}`);
    }

    console.log('Cleanup and Seeding done.');

  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
}

cleanAndSeed();
