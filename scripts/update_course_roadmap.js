const mongoose = require('mongoose');
const Course = require('../models/Course');
require('dotenv').config({ path: '.env' }); // Current working dir is be/

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB:', process.env.MONGODB_URI.split('@')[1]);

    const roadmap = [
      { week: 1, title: 'HTML, CSS, Bootstrap', topics: ['HTML5', 'CSS3', 'Responsive Design'], project: 'Portfolio Layout', assignment: 'Build a landing page' },
      { week: 2, title: 'JavaScript', topics: ['ES6+', 'DOM Manipulation', 'Async JS'], project: 'Interactive Calculator', assignment: 'JS Algorithms' },
      { week: 3, title: 'React', topics: ['Components', 'State & Props', 'Hooks'], project: 'Task Management App', assignment: 'React Router setup' },
      { week: 4, title: 'Advanced React', topics: ['Context API', 'Redux', 'Performance'], project: 'E-commerce Frontend', assignment: 'State management' },
      { week: 5, title: 'MongoDB', topics: ['NoSQL', 'Mongoose', 'Aggregations'], project: 'Blog Database', assignment: 'CRUD Operations' },
      { week: 6, title: 'Express', topics: ['REST APIs', 'Middleware', 'Authentication'], project: 'Secure API Backend', assignment: 'JWT Implementation' },
      { week: 7, title: 'Integration & Project Development', topics: ['Frontend + Backend Integration', 'CORS', 'Error Handling'], project: 'Full Stack App Phase 1', assignment: 'API Integration' },
      { week: 8, title: 'Project Development & Deployment', topics: ['Final Polish', 'Testing', 'Vercel / Render Deployment'], project: 'Full Stack App Phase 2', assignment: 'Deploy your app' }
    ];

    const result = await Course.updateOne({ courseId: 'mern' }, { $set: { roadmap } });
    console.log('Updated roadmap for course "mern". Match count:', result.matchedCount, 'Modified count:', result.modifiedCount);

  } catch (error) {
    console.error('Error during setup:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from DB.');
  }
}

run();
