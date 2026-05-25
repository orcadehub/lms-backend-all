require('dotenv').config();
const mongoose = require('mongoose');
const Company = require('./models/Company');
const CompanySpecificQuestion = require('./models/CompanySpecificQuestion');
const Instructor = require('./models/Instructor'); // Need an instructor ID for createdBy

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get an instructor
    const instructor = await Instructor.findOne();
    if (!instructor) {
      console.log('No instructor found to use for createdBy');
      process.exit(1);
    }

    const companies = [
      { name: 'TCS', description: 'Tata Consultancy Services', order: 1 },
      { name: 'Cognizant', description: 'Cognizant Technology Solutions', order: 2 },
      { name: 'Wipro', description: 'Wipro Limited', order: 3 },
      { name: 'Infosys', description: 'Infosys Limited', order: 4 },
      { name: 'HCL', description: 'HCL Technologies', order: 5 },
    ];

    for (const compData of companies) {
      let company = await Company.findOne({ name: compData.name });
      if (!company) {
        company = await Company.create(compData);
        console.log(`Created company: ${company.name}`);
      } else {
        console.log(`Company ${company.name} already exists`);
      }

      // Add a dummy aptitude question
      await CompanySpecificQuestion.deleteMany({}); const existingApt = null;({ company: company._id, assessmentType: 'aptitude' });
      if (!existingApt) {
        await CompanySpecificQuestion.create({
          company: company._id,
          title: `Sample Aptitude Question for ${company.name}`,
          description: 'Two trains are moving in opposite directions. Train A is 100m long, Train B is 150m long. Find crossing time.',
          difficulty: 'Medium',
          constraints: ['Speed > 0'],
          tags: ['Aptitude', 'Trains', 'Speed & Distance'],
          assessmentType: 'aptitude',
          options: ['5 seconds', '9 seconds', '12 seconds', '15 seconds'],
          correctAnswer: '9 seconds',
          example: {
            input: 'Train A speed = 60km/h, Train B speed = 40km/h',
            output: '9 seconds',
            explanation: 'Relative speed = 100km/h. Distance = 250m. Time = 250 / (100 * 5/18) = 9s'
          },
          intuition: {
            approach: 'Use relative speed concept',
            timeComplexity: 'O(1)',
            spaceComplexity: 'O(1)',
            keyInsights: ['Opposite direction means add speeds'],
            algorithmSteps: ['Convert km/h to m/s', 'Divide total length by relative speed']
          },
          createdBy: instructor._id
        });
        console.log(`Created aptitude question for ${company.name}`);
      }

      // Add a dummy programming question
      const existingProg = await CompanySpecificQuestion.findOne({ company: company._id, assessmentType: 'programming' });
      if (!existingProg) {
        await CompanySpecificQuestion.create({
          company: company._id,
          title: `Sample Coding Question for ${company.name}`,
          description: 'Write a program to find the missing number in an array of size N containing numbers from 1 to N+1.',
          difficulty: 'Easy',
          constraints: ['1 <= N <= 10^5'],
          testCases: [
            { input: '4\n1 2 4 5', output: '3', isPublic: true },
            { input: '5\n1 2 3 4 5', output: '6', isPublic: true }
          ],
          tags: ['Arrays', 'Math'],
          assessmentType: 'programming',
          example: {
            input: '4\n1 2 4 5',
            output: '3',
            explanation: 'The array has 4 elements, but it should contain numbers up to 5. Missing is 3.'
          },
          intuition: {
            approach: 'Use sum of N natural numbers formula',
            timeComplexity: 'O(N)',
            spaceComplexity: 'O(1)',
            keyInsights: ['Sum of N numbers is N*(N+1)/2'],
            algorithmSteps: ['Calculate total sum', 'Subtract array sum']
          },
          createdBy: instructor._id
        });
        console.log(`Created programming question for ${company.name}`);
      }
    }

    console.log('Seeding complete');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seed();
