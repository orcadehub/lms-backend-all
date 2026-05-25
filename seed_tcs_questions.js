require('dotenv').config();
const mongoose = require('mongoose');
const Company = require('./models/Company');
const CompanySpecificQuestion = require('./models/CompanySpecificQuestion');
const Instructor = require('./models/Instructor'); // For createdBy

async function seedTCS() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for TCS Seeding');

    const instructor = await Instructor.findOne();
    if (!instructor) {
      console.log('No instructor found to use for createdBy');
      process.exit(1);
    }

    const tcs = await Company.findOne({ name: 'TCS' });
    if (!tcs) {
      console.log('TCS company not found. Please run seed_companies.js first.');
      process.exit(1);
    }

    console.log('Found TCS, inserting questions...');

    // A helper for dummy required fields
    const defaultFields = {
      constraints: ['None'],
      example: {
        input: 'N/A',
        output: 'N/A',
        explanation: 'N/A'
      },
      intuition: {
        approach: 'N/A',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
        keyInsights: ['N/A'],
        algorithmSteps: ['N/A']
      }
    };

    const tcsQuestions = [
      // --- APTITUDE / NUMERICAL ---
      {
        company: tcs._id,
        title: 'Time & Work: A and B together',
        description: 'A can do a piece of work in 15 days and B alone can do it in 20 days. If they work together for 4 days, then the fraction of the work that is left is:',
        difficulty: 'Medium',
        tags: ['Time & Work', 'Aptitude', 'TCS NQT'],
        assessmentType: 'aptitude',
        options: ['1/4', '1/10', '7/15', '8/15'],
        correctAnswer: '8/15',
        createdBy: instructor._id,
        ...defaultFields
      },
      {
        company: tcs._id,
        title: 'Speed & Distance: Two Trains',
        description: 'Two trains running in opposite directions cross a man standing on the platform in 27 seconds and 17 seconds respectively. They cross each other in 23 seconds. The ratio of their speeds is:',
        difficulty: 'Hard',
        tags: ['Speed & Distance', 'Aptitude', 'TCS NQT'],
        assessmentType: 'aptitude',
        options: ['1:3', '3:2', '3:4', 'None of these'],
        correctAnswer: '3:2',
        createdBy: instructor._id,
        ...defaultFields
      },
      
      // --- REASONING ---
      {
        company: tcs._id,
        title: 'Coding & Decoding',
        description: 'If in a certain language, MADRAS is coded as NBESBT, how is BOMBAY coded in that code?',
        difficulty: 'Easy',
        tags: ['Reasoning', 'Coding-Decoding', 'TCS NQT'],
        assessmentType: 'aptitude',
        options: ['CPNCBX', 'CPNCBZ', 'CPOCBZ', 'CQOCBZ'],
        correctAnswer: 'CPNCBZ',
        createdBy: instructor._id,
        ...defaultFields
      },

      // --- PROGRAMMING LOGIC (MCQs) ---
      {
        company: tcs._id,
        title: 'Data Structures: Queues',
        description: 'Which of the following data structures is used for breadth first search of a graph?',
        difficulty: 'Medium',
        tags: ['Data Structures', 'BFS', 'Programming Logic'],
        assessmentType: 'aptitude', // We use aptitude schema since it's an MCQ
        options: ['Stack', 'Queue', 'Tree', 'Array'],
        correctAnswer: 'Queue',
        createdBy: instructor._id,
        ...defaultFields
      },

      // --- HANDS-ON CODING (PROGRAMMING) ---
      {
        company: tcs._id,
        title: 'TCS Coding: Two and Four Wheelers',
        description: 'An automobile company manufactures both a two-wheeler (TW) and a four-wheeler (FW). A company manager wants to make the production of both types of vehicle according to the given data below:\n\n1st data, Total number of vehicle (two-wheeler + four-wheeler) = V\n2nd data, Total number of wheels = W\n\nThe task is to find how many two-wheelers as well as four-wheelers need to manufacture as per the given data.\n\nPrint "INVALID INPUT" if the input values are not valid. (e.g. wheels < 2 or wheels is odd).',
        difficulty: 'Easy',
        tags: ['TCS Coding', 'Mathematics', 'Simultaneous Equations'],
        assessmentType: 'programming',
        example: {
          input: '200\n540',
          output: 'TW = 130 FW = 70',
          explanation: 'Let TW = x, FW = y. x+y=200, 2x+4y=540.'
        },
        constraints: ['2 <= W <= 10^4', 'W % 2 == 0', 'V < W'],
        testCases: [
          { input: '200\n540', output: 'TW = 130 FW = 70', isPublic: true },
          { input: '130\n320', output: 'TW = 100 FW = 30', isPublic: true },
          { input: '10\n15', output: 'INVALID INPUT', isPublic: false }
        ],
        intuition: {
          approach: 'Solve simultaneous linear equations: x + y = V, 2x + 4y = W',
          timeComplexity: 'O(1)',
          spaceComplexity: 'O(1)',
          keyInsights: ['Use elimination method: y = (W - 2V) / 2'],
          algorithmSteps: ['Check for valid inputs', 'Calculate y', 'Calculate x', 'Print result']
        },
        createdBy: instructor._id
      },
      {
        company: tcs._id,
        title: 'TCS Coding: N-th term of mixed series',
        description: 'Find the N-th term of the series:\n1, 1, 2, 3, 4, 9, 8, 27, 16, 81, 32, 243, 64, 729, 128, 2187 ...\n\nThis series is a mixture of 2 series - all the odd terms in this series form a geometric progression with a factor of 2, and all the even terms form a geometric progression with a factor of 3.\n\nGiven N, find the N-th term.',
        difficulty: 'Medium',
        tags: ['TCS Coding', 'Series', 'Logic'],
        assessmentType: 'programming',
        example: {
          input: '16',
          output: '2187',
          explanation: '16 is even, so it uses 3^(16/2 - 1) = 3^7 = 2187'
        },
        constraints: ['1 <= N <= 30'],
        testCases: [
          { input: '16', output: '2187', isPublic: true },
          { input: '1', output: '1', isPublic: true },
          { input: '2', output: '1', isPublic: true },
          { input: '15', output: '128', isPublic: false }
        ],
        intuition: {
          approach: 'Check if N is odd or even to determine which power to calculate',
          timeComplexity: 'O(1)',
          spaceComplexity: 'O(1)',
          keyInsights: ['If odd: 2^(N/2), if even: 3^(N/2 - 1)'],
          algorithmSteps: ['Read N', 'Check odd/even', 'Print exponent calculation']
        },
        createdBy: instructor._id
      }
    ];

    for (const q of tcsQuestions) {
      await CompanySpecificQuestion.create(q);
      console.log(`Created: ${q.title}`);
    }

    console.log('Successfully populated TCS questions!');

  } catch (error) {
    console.error('Error seeding TCS:', error);
  } finally {
    process.exit();
  }
}

seedTCS();
