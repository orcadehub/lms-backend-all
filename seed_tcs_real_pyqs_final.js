require('dotenv').config();
const mongoose = require('mongoose');
const Company = require('./models/Company');
const CompanySpecificQuestion = require('./models/CompanySpecificQuestion');
const Instructor = require('./models/Instructor');

async function seedRealTCS() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for Real TCS PYQ Seeding');

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
        title: 'TCS NQT PYQ: Doctor Clinic Earnings',
        description: `A doctor has a clinic where he serves his patients. The doctor's consultation fees are different for different groups of citizens.
- If age <= 0 or age >= 120, print "INVALID INPUT".
- If age < 17, consultation fee is 200 INR.
- If age >= 17 and age < 40, consultation fee is 400 INR.
- If age >= 40, consultation fee is 300 INR.

Write a code to calculate the total earnings of a doctor for the day.
The first line contains N (number of patients). The next line contains N integers representing the ages of the patients.
Output should be exactly: "Total Income <amount> INR"`,
        difficulty: 'Easy',
        tags: ['TCS NQT', 'Arrays', 'Logic'],
        assessmentType: 'programming',
        example: { input: '5\n20 30 40 50 2', output: 'Total Income 1600 INR', explanation: '20->400, 30->400, 40->300, 50->300, 2->200. Total = 1600.' },
        constraints: ['1 <= N <= 20', 'Age must be valid'],
        testCases: [
          { input: '5\n20 30 40 50 2', output: 'Total Income 1600 INR', isPublic: true },
          { input: '3\n-5 20 40', output: 'INVALID INPUT', isPublic: true },
          { input: '6\n16 41 89 22 10 50', output: 'Total Income 1700 INR', isPublic: false }
        ],
        intuition: {
          approach: 'Iterate the array and add fee to a total sum based on the conditions. If any age is invalid, terminate and print INVALID INPUT.',
          timeComplexity: 'O(N)',
          spaceComplexity: 'O(1)',
          keyInsights: ['Break immediately on invalid input and do not print total.'],
          algorithmSteps: ['Read N', 'Read N integers', 'Loop through integers', 'Check validity', 'Add fee based on conditions', 'Print result']
        },
        createdBy: instructor._id
      },
      {
        company: tcs._id,
        title: 'TCS NQT PYQ: Cruise Party',
        description: `A party has been organized on cruise. The party is organized for a limited time(T). The number of guests entering (E[i]) and leaving (L[i]) the party at every hour is represented as elements of the array. The task is to find the maximum number of guests present on the cruise at any given instance within T hours.

Input:
T - Time (hours)
Array E of size T representing entering guests.
Array L of size T representing leaving guests.

Output:
Maximum number of guests on the cruise.`,
        difficulty: 'Medium',
        tags: ['TCS NQT', 'Arrays', 'Maximum'],
        assessmentType: 'programming',
        example: { input: '5\n7 0 5 1 3\n1 2 1 3 4', output: '8', explanation: 'Hour 1: 7 in, 1 out = 6. Hour 2: 0 in, 2 out = 4. Hour 3: 5 in, 1 out = 8. Max is 8.' },
        constraints: ['1 <= T <= 25', 'E[i] >= 0, L[i] >= 0'],
        testCases: [
          { input: '5\n7 0 5 1 3\n1 2 1 3 4', output: '8', isPublic: true },
          { input: '4\n3 5 2 0\n0 2 4 4', output: '6', isPublic: true },
          { input: '3\n10 0 0\n5 2 3', output: '10', isPublic: false }
        ],
        intuition: {
          approach: 'Maintain a running sum of guests currently on the ship: current = current + E[i] - L[i]. Track the maximum of current.',
          timeComplexity: 'O(T)',
          spaceComplexity: 'O(T)',
          keyInsights: ['Track the global maximum after each hour calculation.'],
          algorithmSteps: ['Read T, E, and L arrays', 'Init current=0, max_guests=0', 'Loop T times: current += E[i]-L[i], update max_guests', 'Print max_guests']
        },
        createdBy: instructor._id
      },
      {
        company: tcs._id,
        title: 'TCS NQT PYQ: Paint the Wall',
        description: `We want to estimate the cost of painting a property. Interior wall painting costs Rs.18 per sq.ft. and exterior wall painting costs Rs.12 per sq.ft.
You are given the number of interior walls and exterior walls, followed by the surface area of each interior wall, then the surface area of each exterior wall.

Input Format:
First line: Number of Interior walls (Ni)
Second line: Number of Exterior walls (Ne)
Next Ni lines: Surface Area of each interior wall
Next Ne lines: Surface Area of each exterior wall

If Ni or Ne is less than zero, print "INVALID INPUT". 

Output:
"Total estimated Cost : <amount> INR"`,
        difficulty: 'Medium',
        tags: ['TCS NQT', 'Mathematics', 'Basic Logic'],
        assessmentType: 'programming',
        example: { input: '6\n3\n12.3\n15.2\n12.3\n15.2\n12.3\n15.2\n10.10\n10.10\n10.00', output: 'Total estimated Cost : 1847.4 INR', explanation: 'Interior = sum * 18. Exterior = sum * 12. Sum them up.' },
        constraints: ['0 <= Ni, Ne <= 100'],
        testCases: [
          { input: '6\n3\n12.3\n15.2\n12.3\n15.2\n12.3\n15.2\n10.10\n10.10\n10.00', output: 'Total estimated Cost : 1847.4 INR', isPublic: true },
          { input: '0\n0', output: 'Total estimated Cost : 0.0 INR', isPublic: true },
          { input: '-1\n5', output: 'INVALID INPUT', isPublic: false }
        ],
        intuition: {
          approach: 'Sum up all interior wall areas and multiply by 18. Sum up all exterior wall areas and multiply by 12. Add both to get total cost.',
          timeComplexity: 'O(Ni + Ne)',
          spaceComplexity: 'O(1)',
          keyInsights: ['Handle zero walls properly without expecting area inputs.'],
          algorithmSteps: ['Read Ni, Ne', 'If < 0 INVALID', 'Loop Ni times, add to sumI', 'Loop Ne times, add to sumE', 'Calc total, print with 1 decimal']
        },
        createdBy: instructor._id
      },
      {
        company: tcs._id,
        title: 'TCS NQT PYQ: Word is Key',
        description: `One programming language has the following keywords that cannot be used as identifiers:
break, case, continue, default, defer, else, for, func, goto, if, map, range, return, struct, type, var

Write a program to find if the given word is a keyword or not.
If it is a keyword, print "<word> is a keyword". Otherwise print "<word> is not a keyword".`,
        difficulty: 'Easy',
        tags: ['TCS NQT', 'Strings', 'Hash Map'],
        assessmentType: 'programming',
        example: { input: 'defer', output: 'defer is a keyword', explanation: 'defer is present in the list' },
        constraints: ['String length <= 20'],
        testCases: [
          { input: 'defer', output: 'defer is a keyword', isPublic: true },
          { input: 'While', output: 'While is not a keyword', isPublic: true },
          { input: 'continue', output: 'continue is a keyword', isPublic: false },
          { input: 'Function', output: 'Function is not a keyword', isPublic: false }
        ],
        intuition: {
          approach: 'Store all keywords in an array or set, and check if the input string exists in it.',
          timeComplexity: 'O(1)',
          spaceComplexity: 'O(1)',
          keyInsights: ['Case sensitive check.'],
          algorithmSteps: ['Init array of keywords', 'Read input', 'Check if input in array', 'Print respective output']
        },
        createdBy: instructor._id
      },
      {
        company: tcs._id,
        title: 'TCS NQT PYQ: Trainee Oxygen Level',
        description: `Selection of MPCS trainees are done based on the oxygen level. A total of 3 trainees take 3 rounds of trials.
First 3 inputs are oxygen levels of trainee 1, 2, and 3 for round 1.
Next 3 inputs are oxygen levels of trainee 1, 2, and 3 for round 2.
Next 3 inputs are oxygen levels for round 3.

Find the average oxygen level of each trainee over the 3 rounds.
If the average oxygen level is < 70, they are considered unfit.
Print the trainee number with the highest average oxygen level (can be multiple). Print "Trainee Number : <id>"
If all are unfit, print "All trainees are unfit."
Note: Oxygen value must be between 1 and 100. If an input is invalid, print "INVALID INPUT". Average should be rounded to integer.`,
        difficulty: 'Hard',
        tags: ['TCS NQT', 'Arrays', 'Averages'],
        assessmentType: 'programming',
        example: { input: '95\n92\n95\n92\n90\n92\n90\n92\n90', output: 'Trainee Number : 1\nTrainee Number : 3', explanation: 'Averages: T1=92, T2=91, T3=92. Max is 92 for T1 and T3.' },
        constraints: ['1 <= Oxygen <= 100'],
        testCases: [
          { input: '95\n92\n95\n92\n90\n92\n90\n92\n90', output: 'Trainee Number : 1\nTrainee Number : 3', isPublic: true },
          { input: '60\n60\n60\n60\n60\n60\n60\n60\n60', output: 'All trainees are unfit.', isPublic: true },
          { input: '120\n90\n90\n90\n90\n90\n90\n90\n90', output: 'INVALID INPUT', isPublic: false }
        ],
        intuition: {
          approach: 'Store inputs into a 3x3 matrix. Calculate averages for each trainee. Find the maximum average. Output those who match the max.',
          timeComplexity: 'O(1)',
          spaceComplexity: 'O(1)',
          keyInsights: ['Round the averages to nearest integer.', 'Handle multiple winners.'],
          algorithmSteps: ['Read 9 inputs', 'Check validity', 'Calculate averages for T1, T2, T3', 'Find max', 'If max < 70 print Unfit', 'Else print Trainees matching max']
        },
        createdBy: instructor._id
      }
    ];

    for (const q of questions) {
      await CompanySpecificQuestion.create(q);
      console.log(`Created: ${q.title}`);
    }

    console.log('Successfully populated REAL TCS NQT PYQs!');

  } catch (error) {
    console.error('Error seeding PYQs:', error);
  } finally {
    process.exit();
  }
}

seedRealTCS();
