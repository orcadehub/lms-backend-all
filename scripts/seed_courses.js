require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('../models/Course');

const MERN_ROADMAP = [
  {
    week: 1,
    title: 'Web Fundamentals & HTML5',
    topics: [
      'How the Internet works — HTTP, DNS, Browsers',
      'HTML5 Semantic Elements & Structure',
      'Forms, Tables, Media Embeds',
      'Accessibility & SEO Basics',
      'Developer Tools & VS Code Setup'
    ],
    project: 'Build a Personal Portfolio Page (HTML only)',
    assignment: 'Week 1 Quiz & Portfolio basic structure'
  },
  {
    week: 2,
    title: 'CSS3 & Responsive Design',
    topics: [
      'CSS Selectors, Box Model, Specificity',
      'Flexbox & CSS Grid Layouts',
      'Media Queries & Mobile-First Design',
      'CSS Animations & Transitions',
      'CSS Variables & Modern Techniques'
    ],
    project: 'Responsive Landing Page with Animations',
    assignment: 'Replicate a Landing Page layout exactly'
  },
  {
    week: 3,
    title: 'JavaScript Essentials',
    topics: [
      'Variables, Data Types, Operators',
      'Functions, Scope, Closures',
      'Arrays, Objects, Destructuring',
      'DOM Manipulation & Events',
      'ES6+ Features — Arrow Functions, Spread, Template Literals'
    ],
    project: 'Interactive To-Do App with Local Storage',
    assignment: 'Array Methods & DOM Exercise'
  },
  {
    week: 4,
    title: 'Advanced JavaScript & Async',
    topics: [
      'Promises, Async/Await',
      'Fetch API & REST API Consumption',
      'Error Handling & Debugging',
      'Modules (import/export)',
      'JSON, LocalStorage, SessionStorage'
    ],
    project: 'Weather Dashboard using Public API',
    assignment: 'Fetch Data from Movie API',
    isAssessmentWeek: true
  },
  {
    week: 5,
    title: 'React.js Fundamentals',
    topics: [
      'React Setup — Create React App / Vite',
      'JSX, Components, Props',
      'useState, useEffect Hooks',
      'Conditional Rendering & Lists',
      'Event Handling & Forms in React'
    ],
    project: 'React Blog with Dynamic Content',
    assignment: 'State Management Exercise'
  },
  {
    week: 6,
    title: 'Advanced React & Routing',
    topics: [
      'React Router DOM — Navigation & Params',
      'useContext, useReducer for State Management',
      'Custom Hooks',
      'React Toastify & UI Libraries (MUI basics)',
      'Deployment on Netlify / Vercel'
    ],
    project: 'Multi-page E-Commerce Frontend',
    assignment: 'Routing & Context API Task'
  },
  {
    week: 7,
    title: 'Backend with Node.js & Express',
    topics: [
      'Node.js Runtime & NPM',
      'Express.js — Routes, Middleware',
      'REST API Design & HTTP Methods',
      'MongoDB & Mongoose — Schema, Models, CRUD',
      'Environment Variables (.env), Nodemon'
    ],
    project: 'Full REST API for a Blog Platform',
    assignment: 'Build a secure Login API'
  },
  {
    week: 8,
    title: 'Full Stack Integration & Deployment',
    topics: [
      'Connecting React Frontend to Express Backend',
      'Authentication — JWT, bcrypt, Protected Routes',
      'File Uploads & Image Handling',
      'Error Handling & Validation',
      'Deployment — Frontend + Backend on Cloud'
    ],
    project: 'Full Stack MERN Project — Task Management App',
    assignment: 'Final Project Submission & Review',
    isAssessmentWeek: true
  }
];

const courses = [
  {
    courseId: 'mern',
    title: 'Full Stack Web Development — MERN Stack',
    subtitle: '1st Anniversary Special — Completely FREE!',
    description: 'Become a complete MERN stack developer by building full-stack, scalable web applications.',
    longDescription: 'This comprehensive 2-month program covers everything from HTML/CSS fundamentals to deploying production-ready full-stack applications. You will master MongoDB, Express.js, React.js, and Node.js through hands-on projects, live coding sessions, and weekend assignments. By the end, you\'ll have a portfolio of real-world projects and the confidence to build any web application from scratch.',
    category: 'Full Stack',
    level: 'All Levels',
    duration: { weeks: 8, hoursPerDay: 1, daysPerWeek: 5 },
    price: 0,
    originalPrice: 15000,
    isFree: true,
    color: '#6366f1',
    bgColor: '#eef2ff',
    tags: ['Full Stack', 'Job Ready', 'MERN', 'React', 'Node.js', 'MongoDB', 'Express', '1st Anniversary'],
    roadmap: MERN_ROADMAP,
    batches: [
      {
        name: 'MERN-ANNIVERSARY-BATCH',
        startDate: new Date('2026-05-18'),
        endDate: new Date('2026-07-12'),
        maxSeats: 200,
        enrolledCount: 0,
        timing: '7 PM - 8 PM IST',
        classDays: 'Mon - Fri',
        status: 'upcoming',
        isActive: true
      }
    ],
    learningOutcomes: [
      'Build responsive websites with HTML5 & CSS3',
      'Write modern JavaScript (ES6+) with confidence',
      'Create dynamic single-page apps with React.js',
      'Design and build REST APIs with Express.js',
      'Work with MongoDB & Mongoose for data persistence',
      'Implement JWT Authentication & Authorization',
      'Deploy full-stack apps to the cloud',
      'Build a professional portfolio with 8+ projects'
    ],
    prerequisites: [
      'Basic computer literacy',
      'A laptop/PC with internet connection',
      'No prior programming experience required',
      'Willingness to practice daily'
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'Git', 'VS Code'],
    isPublished: true,
    isActive: true
  },
  {
    courseId: 'python',
    title: 'Python Mastery',
    subtitle: 'From Zero to Python Pro',
    description: 'Learn Python from basics to advanced, including OOP, standard libraries, and real-world projects.',
    longDescription: 'Master Python programming through structured learning and hands-on projects.',
    category: 'Programming',
    level: 'Beginner',
    duration: { weeks: 8, hoursPerDay: 1, daysPerWeek: 5 },
    price: 3499,
    originalPrice: 5000,
    color: '#3b82f6',
    bgColor: '#eff6ff',
    tags: ['Beginner Friendly', 'Core Concept', 'Python'],
    roadmap: [],
    batches: [{
      name: 'PYTHON-BATCH-1',
      startDate: new Date('2026-06-01'),
      endDate: new Date('2026-07-26'),
      maxSeats: 50,
      enrolledCount: 0,
      timing: '7 PM - 8 PM IST',
      status: 'upcoming',
      isActive: true
    }],
    learningOutcomes: ['Python fundamentals', 'OOP concepts', 'File handling', 'Libraries & modules'],
    prerequisites: ['No prior experience required'],
    technologies: ['Python', 'VS Code', 'Git'],
    isPublished: true,
    isActive: true
  },
  {
    courseId: 'java',
    title: 'Java Developer',
    subtitle: 'Enterprise-Grade Java Programming',
    description: 'Master Java programming, multithreading, collections, and build enterprise-ready applications.',
    longDescription: 'Complete Java development course covering core and advanced concepts.',
    category: 'Programming',
    level: 'Beginner',
    duration: { weeks: 8, hoursPerDay: 1, daysPerWeek: 5 },
    price: 3999,
    originalPrice: 6000,
    color: '#eab308',
    bgColor: '#fefce8',
    tags: ['Enterprise', 'OOP', 'Java'],
    roadmap: [],
    batches: [{
      name: 'JAVA-BATCH-1',
      startDate: new Date('2026-06-01'),
      endDate: new Date('2026-07-26'),
      maxSeats: 50,
      enrolledCount: 0,
      timing: '8 PM - 9 PM IST',
      status: 'upcoming',
      isActive: true
    }],
    learningOutcomes: ['Core Java', 'OOP mastery', 'Collections framework', 'Multithreading'],
    prerequisites: ['No prior experience required'],
    technologies: ['Java', 'IntelliJ IDEA', 'Git'],
    isPublished: true,
    isActive: true
  },
  {
    courseId: 'frontend',
    title: 'Frontend Development',
    subtitle: 'Build Stunning Web Interfaces',
    description: 'Build stunning, responsive interfaces using HTML, CSS, JavaScript, and React.',
    longDescription: 'Learn modern frontend development from scratch.',
    category: 'Web Development',
    level: 'Beginner',
    duration: { weeks: 8, hoursPerDay: 1, daysPerWeek: 5 },
    price: 4999,
    originalPrice: 8000,
    color: '#ec4899',
    bgColor: '#fdf2f8',
    tags: ['UI/UX', 'React', 'Frontend'],
    roadmap: [],
    batches: [{
      name: 'FE-BATCH-1',
      startDate: new Date('2026-06-01'),
      endDate: new Date('2026-07-26'),
      maxSeats: 50,
      enrolledCount: 0,
      timing: '6 PM - 7 PM IST',
      status: 'upcoming',
      isActive: true
    }],
    learningOutcomes: ['HTML5 & CSS3', 'JavaScript ES6+', 'React.js', 'Responsive Design'],
    prerequisites: ['Basic computer literacy'],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'React.js'],
    isPublished: true,
    isActive: true
  },
  {
    courseId: 'backend',
    title: 'Backend Development',
    subtitle: 'Server-Side Programming Mastery',
    description: 'Learn server-side programming, REST APIs, and database integration using Node.js and Express.',
    longDescription: 'Backend development with Node.js, Express, and MongoDB.',
    category: 'Web Development',
    level: 'Intermediate',
    duration: { weeks: 8, hoursPerDay: 1, daysPerWeek: 5 },
    price: 4999,
    originalPrice: 8000,
    color: '#10b981',
    bgColor: '#ecfdf5',
    tags: ['Node.js', 'APIs', 'Backend'],
    roadmap: [],
    batches: [{
      name: 'BE-BATCH-1',
      startDate: new Date('2026-06-01'),
      endDate: new Date('2026-07-26'),
      maxSeats: 50,
      enrolledCount: 0,
      timing: '7 PM - 8 PM IST',
      status: 'upcoming',
      isActive: true
    }],
    learningOutcomes: ['Node.js runtime', 'Express.js APIs', 'MongoDB & Mongoose', 'Authentication'],
    prerequisites: ['Basic JavaScript knowledge'],
    technologies: ['Node.js', 'Express.js', 'MongoDB'],
    isPublished: true,
    isActive: true
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get Orcode tenant
    const Tenant = require('../models/Tenant');
    const tenant = await Tenant.findOne({ domain: 'orcode.in' });
    if (!tenant) {
      console.error('Tenant orcode.in not found!');
      process.exit(1);
    }

    console.log(`Using tenant: ${tenant.name} (${tenant._id})`);

    for (const courseData of courses) {
      // Remove existing course with same courseId
      await Course.deleteOne({ courseId: courseData.courseId });

      const course = new Course({
        ...courseData,
        tenant: tenant._id
      });

      await course.save();
      console.log(`✅ Seeded: ${course.title} (${course.courseId}) — ${course.isFree ? 'FREE' : '₹' + course.price}`);
    }

    console.log('\n🎉 All courses seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seed();
