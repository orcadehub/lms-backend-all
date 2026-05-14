require('dotenv').config();
const mongoose = require('mongoose');
const ProgrammingQuestion = require('./models/ProgrammingQuestion');

const MONGODB_URI = process.env.MONGODB_URI;

const questionsToDelete = [
  "Trapping Rain Water (Advanced)", "Longest Valid Parentheses", "Minimum Window Substring", "Sliding Window Maximum",
  "Edit Distance", "Largest Rectangle in Histogram", "Regular Expression Matching", "Burst Balloons (Advanced DP)",
  "Minimum Number of Refueling Stops (Greedy/Hybrid)", "Median of Two Sorted Arrays",
  "Spiral Matrix II", "Rotate Image (90 Degree)", "Search a 2D Matrix II", "Set Matrix Zeroes (In-Place)",
  "Valid Sudoku", "Maximal Rectangle (Hybrid)", "Word Search (Matrix DFS)", "Matrix Diagonal Traverse",
  "Game of Life", "Unique Paths II (Grid with Obstacles)"
];

async function cleanup() {
  try {
    console.log(`Connecting to database for cleanup...`);
    await mongoose.connect(MONGODB_URI);
    
    for (const title of questionsToDelete) {
      await ProgrammingQuestion.deleteOne({ title });
      console.log(`Deleted from ProgrammingQuestion: ${title}`);
    }
    
    console.log('--- CLEANUP COMPLETE ---');
  } catch (error) {
    console.error('Error cleanup:', error);
  } finally {
    mongoose.connection.close();
  }
}

cleanup();
