const mongoose = require('mongoose');
require('dotenv').config();

const Topic = require('../models/Topic');
const SubTopic = require('../models/SubTopic');
const Tenant = require('../models/Tenant');

const programmingSubtopics = [
  { name: "Inputs", description: "Learn input reading, validation, parsing, error handling, and secure processing techniques.", order: 1 },
  { name: "Operators", description: "Learn arithmetic, relational, logical, bitwise operators, and practical usage techniques.", order: 2 },
  { name: "Basic Conditions", description: "Learn if-else statements, switch cases, logical operators, and decision-making techniques.", order: 3 },
  { name: "Nested Conditions", description: "Learn if-else chains, nested switch cases, logical nesting, and complex decision flows.", order: 4 },
  { name: "Loops", description: "Learn for, while loops, break/continue, and iteration techniques.", order: 5 },
  { name: "Nested Loops", description: "Learn double/triple loops, patterns, optimization, break/continue, and matrix applications.", order: 6 },
  { name: "Pattern Printing", description: "Learn star, number, alphabet patterns using nested loops and printing techniques.", order: 7 },
  { name: "Arrays", description: "Practice array problems from Excel dataset", order: 8 },
  { name: "Strings", description: "Learn declaration, traversal, manipulation, searching, sorting, and string operations.", order: 9 },
  { name: "2D Arrays", description: "Learn declaration, initialization, traversal, matrix operations, and common applications.", order: 10 },
  { name: "Two Pointers", description: "Learn left/right pointers, array traversal, pair finding, and optimization techniques.", order: 11 },
  { name: "Sliding Window Fixed", description: "Learn fixed-size windows, maximum sum, subarray averages, and efficient sliding techniques.", order: 12 },
  { name: "Sliding Window Variable", description: "Learn dynamic windows, longest substring, minimum subarray, condition-based expansion/shrinking.", order: 13 },
  { name: "HashMap", description: "Learn key-value storage, hashing, collisions, put/get/remove, and practical applications.", order: 14 },
  { name: "Stack", description: "Learn push, pop, peek operations, parentheses matching, and monotonic stack techniques.", order: 15 },
  { name: "Queue", description: "Learn enqueue, dequeue, peek operations, circular queue, and FIFO applications.", order: 16 }
];

async function seedProgrammingTopics() {
  try {
    console.log('Starting seed script...');
    console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Found' : 'Not found');
    
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log('Connected to MongoDB');

    // Get all tenants
    const tenants = await Tenant.find();
    console.log(`Found ${tenants.length} tenants`);
    
    if (tenants.length === 0) {
      console.log('No tenants found. Please create tenants first.');
      process.exit(1);
    }

    for (const tenant of tenants) {
      console.log(`\nSeeding for tenant: ${tenant.name}`);

      // Check if Programming topic exists
      let programmingTopic = await Topic.findOne({ 
        domain: 'programming', 
        tenant: tenant._id 
      });

      if (!programmingTopic) {
        // Create Programming topic
        programmingTopic = await Topic.create({
          name: 'Programming',
          description: 'Learn programming from basics to complete DSA with strong problem-solving skills.',
          domain: 'programming',
          order: 1,
          tenant: tenant._id
        });
        console.log('Created Programming topic');
      } else {
        console.log('Programming topic already exists');
      }

      // Create subtopics
      for (const subtopic of programmingSubtopics) {
        const existingSubtopic = await SubTopic.findOne({
          name: subtopic.name,
          topicId: programmingTopic._id,
          tenant: tenant._id
        });

        if (!existingSubtopic) {
          await SubTopic.create({
            ...subtopic,
            topicId: programmingTopic._id,
            tenant: tenant._id
          });
          console.log(`Created subtopic: ${subtopic.name}`);
        } else {
          console.log(`Subtopic already exists: ${subtopic.name}`);
        }
      }
    }

    console.log('\nSeeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seedProgrammingTopics();
