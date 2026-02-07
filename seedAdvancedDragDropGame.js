const mongoose = require('mongoose');
require('dotenv').config();

const GamifiedQuestion = require('./models/GamifiedQuestion');
const SubTopic = require('./models/SubTopic');

async function seedAdvancedDragDropGame() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const subtopic = await SubTopic.findOne({ title: 'Drag & Drop Games' });
    
    if (!subtopic) {
      console.log('❌ Subtopic not found');
      process.exit(1);
    }

    const levels = [
      { question: 'Match programming languages to their types', items: ['Python', 'Java', 'JavaScript', 'C', 'Ruby'], zones: ['Interpreted', 'Compiled', 'Scripting', 'Low-level', 'Dynamic'], correct: { 'Python': 'Interpreted', 'Java': 'Compiled', 'JavaScript': 'Scripting', 'C': 'Low-level', 'Ruby': 'Dynamic' } },
      { question: 'Match countries to their currencies', items: ['USA', 'Japan', 'UK', 'India', 'China'], zones: ['Dollar', 'Yen', 'Pound', 'Rupee', 'Yuan'], correct: { 'USA': 'Dollar', 'Japan': 'Yen', 'UK': 'Pound', 'India': 'Rupee', 'China': 'Yuan' } },
      { question: 'Match elements to their symbols', items: ['Gold', 'Silver', 'Iron', 'Copper', 'Oxygen'], zones: ['Au', 'Ag', 'Fe', 'Cu', 'O'], correct: { 'Gold': 'Au', 'Silver': 'Ag', 'Iron': 'Fe', 'Copper': 'Cu', 'Oxygen': 'O' } },
      { question: 'Match organs to their systems', items: ['Heart', 'Lungs', 'Stomach', 'Brain', 'Kidneys'], zones: ['Circulatory', 'Respiratory', 'Digestive', 'Nervous', 'Excretory'], correct: { 'Heart': 'Circulatory', 'Lungs': 'Respiratory', 'Stomach': 'Digestive', 'Brain': 'Nervous', 'Kidneys': 'Excretory' } },
      { question: 'Match data structures to operations', items: ['Array', 'Stack', 'Queue', 'Tree', 'Graph', 'Hash'], zones: ['Index', 'LIFO', 'FIFO', 'Hierarchy', 'Network', 'Key-Value'], correct: { 'Array': 'Index', 'Stack': 'LIFO', 'Queue': 'FIFO', 'Tree': 'Hierarchy', 'Graph': 'Network', 'Hash': 'Key-Value' } },
      { question: 'Match planets to their positions', items: ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn'], zones: ['1st', '2nd', '3rd', '4th', '5th', '6th'], correct: { 'Mercury': '1st', 'Venus': '2nd', 'Earth': '3rd', 'Mars': '4th', 'Jupiter': '5th', 'Saturn': '6th' } },
      { question: 'Match colors to RGB values', items: ['Red', 'Green', 'Blue', 'Yellow', 'Cyan', 'Magenta'], zones: ['255,0,0', '0,255,0', '0,0,255', '255,255,0', '0,255,255', '255,0,255'], correct: { 'Red': '255,0,0', 'Green': '0,255,0', 'Blue': '0,0,255', 'Yellow': '255,255,0', 'Cyan': '0,255,255', 'Magenta': '255,0,255' } },
      { question: 'Match HTTP methods to actions', items: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'], zones: ['Read', 'Create', 'Update', 'Remove', 'Modify', 'Headers'], correct: { 'GET': 'Read', 'POST': 'Create', 'PUT': 'Update', 'DELETE': 'Remove', 'PATCH': 'Modify', 'HEAD': 'Headers' } },
      { question: 'Match databases to types', items: ['MySQL', 'MongoDB', 'Redis', 'PostgreSQL', 'Cassandra', 'Neo4j'], zones: ['SQL', 'Document', 'Cache', 'Relational', 'Wide-column', 'Graph'], correct: { 'MySQL': 'SQL', 'MongoDB': 'Document', 'Redis': 'Cache', 'PostgreSQL': 'Relational', 'Cassandra': 'Wide-column', 'Neo4j': 'Graph' } },
      { question: 'Match sorting algorithms to complexity', items: ['Bubble', 'Quick', 'Merge', 'Insertion', 'Heap', 'Selection'], zones: ['O(n²)', 'O(n log n)', 'O(n log n)', 'O(n²)', 'O(n log n)', 'O(n²)'], correct: { 'Bubble': 'O(n²)', 'Quick': 'O(n log n)', 'Merge': 'O(n log n)', 'Insertion': 'O(n²)', 'Heap': 'O(n log n)', 'Selection': 'O(n²)' } },
      { question: 'Match cloud providers to services', items: ['AWS', 'Azure', 'GCP', 'IBM', 'Oracle', 'Alibaba', 'DigitalOcean'], zones: ['EC2', 'VMs', 'Compute', 'Watson', 'Cloud', 'ECS', 'Droplets'], correct: { 'AWS': 'EC2', 'Azure': 'VMs', 'GCP': 'Compute', 'IBM': 'Watson', 'Oracle': 'Cloud', 'Alibaba': 'ECS', 'DigitalOcean': 'Droplets' } },
      { question: 'Match design patterns to categories', items: ['Singleton', 'Factory', 'Observer', 'Decorator', 'Strategy', 'Adapter', 'Proxy'], zones: ['Creational', 'Creational', 'Behavioral', 'Structural', 'Behavioral', 'Structural', 'Structural'], correct: { 'Singleton': 'Creational', 'Factory': 'Creational', 'Observer': 'Behavioral', 'Decorator': 'Structural', 'Strategy': 'Behavioral', 'Adapter': 'Structural', 'Proxy': 'Structural' } },
      { question: 'Match OS to kernels', items: ['Linux', 'Windows', 'macOS', 'Android', 'iOS', 'FreeBSD', 'Solaris'], zones: ['Monolithic', 'Hybrid', 'Hybrid', 'Linux', 'XNU', 'Monolithic', 'Monolithic'], correct: { 'Linux': 'Monolithic', 'Windows': 'Hybrid', 'macOS': 'Hybrid', 'Android': 'Linux', 'iOS': 'XNU', 'FreeBSD': 'Monolithic', 'Solaris': 'Monolithic' } },
      { question: 'Match protocols to layers', items: ['HTTP', 'TCP', 'IP', 'Ethernet', 'DNS', 'FTP', 'SMTP', 'UDP'], zones: ['Application', 'Transport', 'Network', 'Data Link', 'Application', 'Application', 'Application', 'Transport'], correct: { 'HTTP': 'Application', 'TCP': 'Transport', 'IP': 'Network', 'Ethernet': 'Data Link', 'DNS': 'Application', 'FTP': 'Application', 'SMTP': 'Application', 'UDP': 'Transport' } },
      { question: 'Match frameworks to languages', items: ['React', 'Django', 'Spring', 'Laravel', 'Rails', 'Express', 'Flask', 'Angular'], zones: ['JavaScript', 'Python', 'Java', 'PHP', 'Ruby', 'Node.js', 'Python', 'TypeScript'], correct: { 'React': 'JavaScript', 'Django': 'Python', 'Spring': 'Java', 'Laravel': 'PHP', 'Rails': 'Ruby', 'Express': 'Node.js', 'Flask': 'Python', 'Angular': 'TypeScript' } },
      { question: 'Match ports to services', items: ['80', '443', '22', '21', '25', '3306', '5432', '27017'], zones: ['HTTP', 'HTTPS', 'SSH', 'FTP', 'SMTP', 'MySQL', 'PostgreSQL', 'MongoDB'], correct: { '80': 'HTTP', '443': 'HTTPS', '22': 'SSH', '21': 'FTP', '25': 'SMTP', '3306': 'MySQL', '5432': 'PostgreSQL', '27017': 'MongoDB' } },
      { question: 'Match file extensions to types', items: ['.jpg', '.mp4', '.pdf', '.zip', '.exe', '.json', '.csv', '.xml'], zones: ['Image', 'Video', 'Document', 'Archive', 'Executable', 'Data', 'Spreadsheet', 'Markup'], correct: { '.jpg': 'Image', '.mp4': 'Video', '.pdf': 'Document', '.zip': 'Archive', '.exe': 'Executable', '.json': 'Data', '.csv': 'Spreadsheet', '.xml': 'Markup' } },
      { question: 'Match testing types to focus', items: ['Unit', 'Integration', 'E2E', 'Load', 'Security', 'Smoke', 'Regression', 'UAT'], zones: ['Functions', 'Modules', 'Full Flow', 'Performance', 'Vulnerabilities', 'Critical', 'Changes', 'Users'], correct: { 'Unit': 'Functions', 'Integration': 'Modules', 'E2E': 'Full Flow', 'Load': 'Performance', 'Security': 'Vulnerabilities', 'Smoke': 'Critical', 'Regression': 'Changes', 'UAT': 'Users' } },
      { question: 'Match Git commands to actions', items: ['commit', 'push', 'pull', 'merge', 'branch', 'clone', 'rebase', 'stash'], zones: ['Save', 'Upload', 'Download', 'Combine', 'Create', 'Copy', 'Rewrite', 'Store'], correct: { 'commit': 'Save', 'push': 'Upload', 'pull': 'Download', 'merge': 'Combine', 'branch': 'Create', 'clone': 'Copy', 'rebase': 'Rewrite', 'stash': 'Store' } },
      { question: 'Match CSS properties to effects', items: ['display', 'position', 'flex', 'grid', 'transform', 'transition', 'animation', 'opacity'], zones: ['Visibility', 'Layout', 'Flexbox', 'Grid', 'Move', 'Change', 'Animate', 'Transparency'], correct: { 'display': 'Visibility', 'position': 'Layout', 'flex': 'Flexbox', 'grid': 'Grid', 'transform': 'Move', 'transition': 'Change', 'animation': 'Animate', 'opacity': 'Transparency' } }
    ];

    const dragDropGame = {
      subTopicId: subtopic._id,
      title: 'Advanced Match Challenge',
      description: 'Match complex technical concepts',
      difficulty: 'Hard',
      points: 40,
      gameType: 'MCQ',
      isMultiLevel: true,
      totalLevels: 20,
      hasTimer: true,
      totalTimeLimit: 1800,
      maxScore: 40,
      passingScore: 24,
      levels: levels.map((level, i) => ({
        levelNumber: i + 1,
        question: level.question,
        questionType: 'DragDrop',
        correctAnswer: JSON.stringify(level),
        hints: [{ hintNumber: 1, hintText: 'Think about technical relationships', pointsDeduction: 1 }],
        pointsForLevel: 2,
        shuffleOptions: false
      })),
      speedBonus: { enabled: true, maxBonus: 20, timeThreshold: 600 },
      streakBonus: { enabled: true, bonusPerStreak: 5 },
      tags: ['drag-drop', 'advanced', 'technical', 'interactive'],
      isActive: true
    };

    await GamifiedQuestion.create(dragDropGame);
    console.log('✅ Advanced Drag & Drop Game seeded successfully!');
    console.log(`Game: ${dragDropGame.title}`);
    console.log(`Levels: ${dragDropGame.totalLevels}`);
    console.log(`Items per level: 5-8`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedAdvancedDragDropGame();
