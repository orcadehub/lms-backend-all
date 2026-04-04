require('dotenv').config();
const mongoose = require('mongoose');
const ProgrammingQuestion = require('../models/ProgrammingQuestion');
const Tenant = require('../models/Tenant');
const Instructor = require('../models/Instructor');

const TENANT_ID = '697a3d4173c9d3c273aef570';
const INSTRUCTOR_ID = '697a3c92903954e2291a2d89';

const cProgrammingQuestions = [
  {
    title: "Swap Two Numbers using Pointers",
    description: "Write a function `swap(int *a, int *b)` that swaps the values of two integers. The main function should read two integers, call the swap function, and print the resulting values.",
    difficulty: "Easy",
    constraints: ["The values can be any integer.", "The swap must happen in-place using pointers."],
    testCases: [
      { input: "10 20", output: "20 10", explanation: "Sample inputs 10 and 20 are swapped to 20 and 10.", isPublic: true },
      { input: "-5 5", output: "5 -5", explanation: "Negative values are swapped.", isPublic: true },
      { input: "0 100", output: "100 0", explanation: "Zero and positive value swapped.", isPublic: false }
    ],
    tags: ["C", "Pointers", "Basic"],
    assessmentType: "programming",
    example: { input: "10 20", output: "20 10", explanation: "10 and 20 swapped to 20 and 10." },
    intuition: {
      approach: "Using a temporary variable within the swap function to hold one value, then reassigning through pointer dereferencing.",
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      keyInsights: ["Dereferencing *ptr accesses actual value.", "Using temp variable ensures data is not lost."],
      algorithmSteps: ["Store *a in temp", "Assign *b to *a", "Assign temp to *b"]
    },
    topic: "C Pointers",
    isActive: true,
    createdBy: new mongoose.Types.ObjectId(INSTRUCTOR_ID)
  },
  {
    title: "Read and Display Student Info using Structure",
    description: "Create a structure `Student` with members `name` (char[50]) and `rollNumber` (int). Read these details from the user and display them in the format 'Name: [name], Roll: [rollNumber]'.",
    difficulty: "Easy",
    constraints: ["Name can have spaces.", "Roll number is a positive integer."],
    testCases: [
      { input: "JohnDoe 101", output: "Name: JohnDoe, Roll: 101", explanation: "Shows format requirement.", isPublic: true }
    ],
    tags: ["C", "Structures", "Input/Output"],
    assessmentType: "programming",
    example: { input: "Alice 12", output: "Name: Alice, Roll: 12", explanation: "Basic display from structure." },
    intuition: {
      approach: "Define struct, declare instance, read values using scanf/gets, print formatted string.",
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      keyInsights: ["Dot operator (.) accesses structure members.", "Padding might occur in memory but not output."],
      algorithmSteps: ["Declare struct instance", "Read name and roll", "Print formatted output"]
    },
    topic: "C Structures",
    isActive: true,
    createdBy: new mongoose.Types.ObjectId(INSTRUCTOR_ID)
  },
  {
    title: "Find Largest in Array using Pointers",
    description: "Write a program that takes the number of elements in an array and the array elements. Find the largest number in that array using pointers only (avoid using index like arr[i]).",
    difficulty: "Medium",
    constraints: ["Array size up to 1000.", "Elements can be negative."],
    testCases: [
      { input: "5\n1 2 9 4 5", output: "9", explanation: "9 is largest.", isPublic: true },
      { input: "3\n-10 -20 -5", output: "-5", explanation: "-5 is largest.", isPublic: false }
    ],
    tags: ["C", "Pointers", "Arrays"],
    assessmentType: "programming",
    example: { input: "5\n10 50 30 20 40", output: "50", explanation: "Large array find max." },
    intuition: {
      approach: "Iterate through array using pointer arithmetic *(ptr + i) or ptr++, comparing each to the current max.",
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      keyInsights: ["arr is a pointer to first element.", "Increment pointer to move through memory."],
      algorithmSteps: ["Set max to first element using *ptr", "Loop through rest using *(ptr+i)", "If current > max, update max", "Print max"]
    },
    topic: "C Pointers",
    isActive: true,
    createdBy: new mongoose.Types.ObjectId(INSTRUCTOR_ID)
  },
  {
    title: "Pointer to Structures - Update Grade",
    description: "Given a student's marks out of 100 in a structure, use a pointer to that structure to update their record. If marks >= 50, set `status` to 'Pass', else 'Fail'.",
    difficulty: "Medium",
    constraints: ["Marks are between 0 and 100."],
    testCases: [
      { input: "75", output: "Pass", explanation: "75 is >= 50.", isPublic: true },
      { input: "40", output: "Fail", explanation: "40 is < 50.", isPublic: true }
    ],
    tags: ["C", "Structures", "Pointers", "Logic"],
    assessmentType: "programming",
    example: { input: "55", output: "Pass", explanation: "Boundary check." },
    intuition: {
      approach: "Use arrow operator (->) to access and modify member through pointer.",
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      keyInsights: ["ptr->member is shorthand for (*ptr).member."],
      algorithmSteps: ["Define structure", "Pass instance by address to function", "Check marks using ->", "Set result using ->"]
    },
    topic: "C Structures",
    isActive: true,
    createdBy: new mongoose.Types.ObjectId(INSTRUCTOR_ID)
  },
  {
    title: "Demonstrate Union Memory Sharing",
    description: "Define a union `Data` with `i` (int) and `f` (float). Read an integer value, store it in `i`, then store a float in `f`. Print both members. Observe and print the corrupted integer result.",
    difficulty: "Hard",
    constraints: ["Understand memory overlap."],
    testCases: [
      { input: "10 2.5", output: "Integer corrupted", explanation: "Final state shows union behavior.", isPublic: true }
    ],
    tags: ["C", "Unions", "Memory"],
    assessmentType: "programming",
    example: { input: "100 5.5", output: "Integer corrupted", explanation: "Detailed demonstration." },
    intuition: {
      approach: "Unions share a single memory block. Storing one variable overwrites other's bits.",
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      keyInsights: ["Size of union = size of largest member.", "Only one member holds valid data at a time."],
      algorithmSteps: ["Store integer", "Store float in same union", "Printing integer shows overlap effect"]
    },
    topic: "C Unions",
    isActive: true,
    createdBy: new mongoose.Types.ObjectId(INSTRUCTOR_ID)
  }
];

async function seedCProgrammingQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    let createdCount = 0;
    for (const question of cProgrammingQuestions) {
      await ProgrammingQuestion.create(question);
      createdCount++;
      console.log(`✓ Created Programming Question: ${question.title}`);
    }

    console.log(`\n✓ All ${createdCount} C Programming Questions (Pointers/Structs/Unions) created successfully!`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedCProgrammingQuestions();
