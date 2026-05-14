require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('../models/Course');

const MERN_ROADMAP = [
  {
    week: 1,
    title: 'Web Fundamentals & Version Control',
    topics: [
      'How the Internet works — HTTP/HTTPS, DNS',
      'HTML5 Semantic Elements & SEO Structure',
      'Git Fundamentals — Config, Init, Add, Commit',
      'GitHub — Repositories, Pushing Code, Pull Requests',
      'Developer Tools & VS Code Extensions'
    ],
    project: 'Personal Portfolio hosted on GitHub Pages',
    assignment: 'Week 1 Quiz & Portfolio basic structure'
  },
  {
    week: 2,
    title: 'CSS3 & Responsive UI with Bootstrap',
    topics: [
      'Advanced CSS3 — Flexbox, Grid, Animations',
      'Media Queries & Mobile-First Design',
      'Bootstrap 5 — Grid System, Components, Utilities',
      'Customizing Bootstrap with CSS Overrides',
      'Modern UI/UX Principles for Web'
    ],
    project: 'Multi-section Responsive Landing Page',
    assignment: 'Replicate a complex UI using Bootstrap'
  },
  {
    week: 3,
    title: 'JavaScript Essentials (Logic Building)',
    topics: [
      'ES6+ Features — Destructuring, Spread, Modules',
      'Higher-Order Functions — map, filter, reduce',
      'DOM Manipulation & Event Listeners',
      'Logical Operators & Conditional Statements',
      'Logic Building with 50+ Coding Patterns'
    ],
    project: 'Interactive Finance Tracker App',
    assignment: 'Solve 20+ JavaScript Algorithm Challenges'
  },
  {
    week: 4,
    title: 'Async JS & REST API Consumption',
    topics: [
      'Promises, Async/Await & Error Handling',
      'Fetch API & Consuming External REST APIs',
      'JSON Data Parsing & Local Storage',
      'HTTP Methods — GET, POST, PUT, DELETE',
      'Postman for API Testing & Documentation'
    ],
    project: 'Real-time Weather Dashboard using OpenWeather API',
    assignment: 'Build a Movie Search Engine using OMDB API',
    isAssessmentWeek: true
  },
  {
    week: 5,
    title: 'React.js Mastery (Frontend Framework)',
    topics: [
      'React Architecture — Components, Props, JSX',
      'State Management with useState & useEffect',
      'Handling Forms & Input Validations',
      'Conditional Rendering & Dynamic Lists',
      'Thinking in React — Component Composition'
    ],
    project: 'Modern Task Management Dashboard',
    assignment: 'Build a Product Catalog with Filters'
  },
  {
    week: 6,
    title: 'Advanced React & Global State',
    topics: [
      'React Router — Navigation, Nested Routes, Params',
      'Context API for Global State Management',
      'Custom Hooks & useReducer Optimization',
      'Frontend Deployment — Vercel and Render',
      'React Toastify & Framer Motion Animations'
    ],
    project: 'E-Commerce Storefront with Shopping Cart',
    assignment: 'Implement Auth-Protected Routes in React'
  },
  {
    week: 7,
    title: 'Backend with Node.js, Express & DB',
    topics: [
      'Node.js Runtime & Express.js Framework',
      'Building RESTful APIs from Scratch',
      'MongoDB Atlas & Mongoose Modeling',
      'Middleware — Auth, Logger, Error Handlers',
      'Database Relationships — One-to-Many, Reference'
    ],
    project: 'Full-featured Backend for a Social Media App',
    assignment: 'Create a secure CRUD API with Mongoose'
  },
  {
    week: 8,
    title: 'Security, CI/CD & Cloud Deployment',
    topics: [
      'JWT Authentication & Bcrypt Password Hashing',
      'CI/CD Pipelines using GitHub Actions',
      'Cloudflare — DNS Management & Security',
      'Cloud Deployment — Deploying Full Stack to Production',
      'Final Project Architecture & Code Review'
    ],
    project: 'Final Full Stack MERN Application (LMS or CRM)',
    assignment: 'Final Capstone Project Submission',
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
      'Build responsive websites with HTML5, CSS3 & Bootstrap 5',
      'Master Git & GitHub for professional version control',
      'Write modern JavaScript (ES6+) and logic patterns',
      'Create dynamic apps with React.js & Context API',
      'Design robust REST APIs with Node.js & Express.js',
      'Master MongoDB & Mongoose for cloud data persistence',
      'Implement JWT Security & CI/CD Pipelines',
      'Deploy full-stack apps to the cloud with Cloudflare security'
    ],
    prerequisites: [
      'Basic computer literacy',
      'A laptop/PC with internet connection',
      'No prior programming experience required',
      'Willingness to practice daily'
    ],
    technologies: ['HTML5', 'CSS3', 'Bootstrap 5', 'JavaScript', 'React.js', 'Context API', 'Node.js', 'Express.js', 'MongoDB', 'Git', 'GitHub', 'CI/CD', 'Cloudflare', 'Vercel'],
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
