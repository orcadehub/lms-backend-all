require('dotenv').config();
const mongoose = require('mongoose');
const Company = require('./models/Company');
const CompanySpecificQuestion = require('./models/CompanySpecificQuestion');
const Instructor = require('./models/Instructor'); // For createdBy

async function seedTCSPYQs() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for TCS PYQ Seeding');

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

    const pyqs = [
      // APTITUDE PYQs
      {
        company: tcs._id,
        title: 'TCS NQT PYQ: Average Speed',
        description: 'A man travels from A to B at 20 km/hr and comes back from B to A at 30 km/hr. Find the average speed of the whole journey.',
        difficulty: 'Medium',
        tags: ['Speed & Distance', 'Aptitude', 'TCS PYQ'],
        assessmentType: 'aptitude',
        options: ['24 km/hr', '25 km/hr', '26 km/hr', '22 km/hr'],
        correctAnswer: '24 km/hr',
        createdBy: instructor._id,
        ...defaultFields
      },
      {
        company: tcs._id,
        title: 'TCS NQT PYQ: Ages',
        description: 'The ratio of the present ages of two friends is 2:3 and six years back, the ratio was 1:3. What will be the ratio of their ages after 4 years?',
        difficulty: 'Hard',
        tags: ['Ages', 'Aptitude', 'TCS PYQ'],
        assessmentType: 'aptitude',
        options: ['1:3', '3:4', '4:5', '3:5'],
        correctAnswer: '3:4',
        createdBy: instructor._id,
        ...defaultFields
      },
      {
        company: tcs._id,
        title: 'TCS NQT PYQ: Number Series',
        description: 'What is the next number in the series: 3, 7, 13, 21, 31, ?',
        difficulty: 'Easy',
        tags: ['Number Series', 'Aptitude', 'TCS PYQ'],
        assessmentType: 'aptitude',
        options: ['41', '43', '40', '42'],
        correctAnswer: '43',
        createdBy: instructor._id,
        ...defaultFields
      },

      // PROGRAMMING PYQs
      {
        company: tcs._id,
        title: 'TCS NQT PYQ: Washing Machine Estimation',
        description: `A washing machine works on the principle of Fuzzy System, the weight of clothes put inside it for washing is uncertain. But based on weight measured by sensors, it decides time and water level which can be changed by menus given on the machine control area. 

For low level water, the time estimate is 25 minutes, where approximately weight is between 2000 grams or any nonzero positive number below that.
For medium level water, the time estimate is 35 minutes, where approximately weight is between 2001 grams and 4000 grams.
For high level water, the time estimate is 45 minutes, where approximately weight is above 4000 grams.

Assume the capacity of machine is maximum 7000 grams.
Where approximately weight is zero, time estimate is 0 minutes.
Write a function which takes a numeric weight in the range [0,7000] as input and produces estimated time as output is: "Time Estimated: <time> Minutes".
If weight is more than 7000, print "OVERLOADED". If weight is negative, print "INVALID INPUT".`,
        difficulty: 'Easy',
        tags: ['TCS PYQ', 'If-Else', 'Basic Logic'],
        assessmentType: 'programming',
        example: {
          input: '2000',
          output: 'Time Estimated: 25 Minutes',
          explanation: 'Weight is 2000 grams, which falls under the low level water requirement taking 25 minutes.'
        },
        constraints: ['-10^4 <= Weight <= 10^4'],
        testCases: [
          { input: '2000', output: 'Time Estimated: 25 Minutes', isPublic: true },
          { input: '4001', output: 'Time Estimated: 45 Minutes', isPublic: true },
          { input: '7500', output: 'OVERLOADED', isPublic: true },
          { input: '-100', output: 'INVALID INPUT', isPublic: false },
          { input: '0', output: 'Time Estimated: 0 Minutes', isPublic: false }
        ],
        intuition: {
          approach: 'Use a series of if-else statements to check the weight brackets and print the corresponding time.',
          timeComplexity: 'O(1)',
          spaceComplexity: 'O(1)',
          keyInsights: ['Handle edge cases: negative numbers, zero, and numbers greater than 7000 first.'],
          algorithmSteps: ['Check if W < 0: INVALID', 'Check if W == 0: 0 Mins', 'Check brackets up to 7000', 'Else OVERLOADED']
        },
        createdBy: instructor._id
      },
      {
        company: tcs._id,
        title: 'TCS NQT PYQ: Base 17 Sweet Seventeen',
        description: `Given a maximum of four digit to the base 17 (10-A, 11-B, 12-C, 13-D ... 16-G) as input, output its decimal value.
Input will be a string (can be alpha-numeric). output will be a numeric integer.

For example, input "1A" is evaluated as:
1 * 17^1 + 10 * 17^0 = 17 + 10 = 27.`,
        difficulty: 'Medium',
        tags: ['TCS PYQ', 'Number Systems', 'Strings'],
        assessmentType: 'programming',
        example: {
          input: '1A',
          output: '27',
          explanation: 'Base 17 evaluated to base 10'
        },
        constraints: ['Length of string <= 4'],
        testCases: [
          { input: '1A', output: '27', isPublic: true },
          { input: '23GF', output: '10980', isPublic: true },
          { input: 'G', output: '16', isPublic: false },
          { input: '0', output: '0', isPublic: false }
        ],
        intuition: {
          approach: 'Iterate the string from right to left, multiplying each digit by increasing powers of 17.',
          timeComplexity: 'O(N)',
          spaceComplexity: 'O(1)',
          keyInsights: ['Characters A-G map to integers 10-16. Use ASCII values to convert.'],
          algorithmSteps: ['Initialize power to 1, result to 0', 'Iterate backwards', 'If char is a digit, add to result', 'If char is A-G, convert and add']
        },
        createdBy: instructor._id
      }
    ];

    for (const q of pyqs) {
      await CompanySpecificQuestion.create(q);
      console.log(`Created: ${q.title}`);
    }

    console.log('Successfully populated TCS PYQs!');

  } catch (error) {
    console.error('Error seeding PYQs:', error);
  } finally {
    process.exit();
  }
}

seedTCSPYQs();
