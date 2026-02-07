const mongoose = require('mongoose');
require('dotenv').config();

const GamifiedQuestion = require('./models/GamifiedQuestion');
const SubTopic = require('./models/SubTopic');

async function seedExpertDragDropGame() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const subtopic = await SubTopic.findOne({ title: 'Drag & Drop Games' });
    
    if (!subtopic) {
      console.log('❌ Subtopic not found');
      process.exit(1);
    }

    const levels = [
      { question: 'Match US states to their capitals', items: ['California', 'Texas', 'Florida', 'New York', 'Illinois', 'Pennsylvania', 'Ohio', 'Georgia', 'Michigan', 'Arizona'], zones: ['Sacramento', 'Austin', 'Tallahassee', 'Albany', 'Springfield', 'Harrisburg', 'Columbus', 'Atlanta', 'Lansing', 'Phoenix'], correct: { 'California': 'Sacramento', 'Texas': 'Austin', 'Florida': 'Tallahassee', 'New York': 'Albany', 'Illinois': 'Springfield', 'Pennsylvania': 'Harrisburg', 'Ohio': 'Columbus', 'Georgia': 'Atlanta', 'Michigan': 'Lansing', 'Arizona': 'Phoenix' } },
      { question: 'Match European countries to capitals', items: ['France', 'Germany', 'Italy', 'Spain', 'Poland', 'Netherlands', 'Belgium', 'Greece', 'Portugal', 'Sweden', 'Austria'], zones: ['Paris', 'Berlin', 'Rome', 'Madrid', 'Warsaw', 'Amsterdam', 'Brussels', 'Athens', 'Lisbon', 'Stockholm', 'Vienna'], correct: { 'France': 'Paris', 'Germany': 'Berlin', 'Italy': 'Rome', 'Spain': 'Madrid', 'Poland': 'Warsaw', 'Netherlands': 'Amsterdam', 'Belgium': 'Brussels', 'Greece': 'Athens', 'Portugal': 'Lisbon', 'Sweden': 'Stockholm', 'Austria': 'Vienna' } },
      { question: 'Match chemical elements to atomic numbers', items: ['Hydrogen', 'Helium', 'Carbon', 'Nitrogen', 'Oxygen', 'Sodium', 'Magnesium', 'Aluminum', 'Silicon', 'Chlorine', 'Calcium'], zones: ['1', '2', '6', '7', '8', '11', '12', '13', '14', '17', '20'], correct: { 'Hydrogen': '1', 'Helium': '2', 'Carbon': '6', 'Nitrogen': '7', 'Oxygen': '8', 'Sodium': '11', 'Magnesium': '12', 'Aluminum': '13', 'Silicon': '14', 'Chlorine': '17', 'Calcium': '20' } },
      { question: 'Match programming paradigms to languages', items: ['OOP', 'Functional', 'Procedural', 'Logic', 'Declarative', 'Imperative', 'Event-driven', 'Concurrent', 'Scripting', 'Markup', 'Query'], zones: ['Java', 'Haskell', 'C', 'Prolog', 'SQL', 'Python', 'JavaScript', 'Go', 'Bash', 'HTML', 'GraphQL'], correct: { 'OOP': 'Java', 'Functional': 'Haskell', 'Procedural': 'C', 'Logic': 'Prolog', 'Declarative': 'SQL', 'Imperative': 'Python', 'Event-driven': 'JavaScript', 'Concurrent': 'Go', 'Scripting': 'Bash', 'Markup': 'HTML', 'Query': 'GraphQL' } },
      { question: 'Match AWS services to categories', items: ['EC2', 'S3', 'RDS', 'Lambda', 'DynamoDB', 'CloudFront', 'Route53', 'VPC', 'IAM', 'SNS', 'SQS', 'ECS'], zones: ['Compute', 'Storage', 'Database', 'Serverless', 'NoSQL', 'CDN', 'DNS', 'Network', 'Security', 'Notification', 'Queue', 'Container'], correct: { 'EC2': 'Compute', 'S3': 'Storage', 'RDS': 'Database', 'Lambda': 'Serverless', 'DynamoDB': 'NoSQL', 'CloudFront': 'CDN', 'Route53': 'DNS', 'VPC': 'Network', 'IAM': 'Security', 'SNS': 'Notification', 'SQS': 'Queue', 'ECS': 'Container' } },
      { question: 'Match data structures to time complexity', items: ['Array Access', 'Array Search', 'Linked List Access', 'Binary Search', 'Hash Table Insert', 'BST Search', 'Heap Insert', 'Graph BFS', 'Quick Sort', 'Merge Sort', 'Bubble Sort', 'Binary Search Tree Insert'], zones: ['O(1)', 'O(n)', 'O(n)', 'O(log n)', 'O(1)', 'O(log n)', 'O(log n)', 'O(V+E)', 'O(n log n)', 'O(n log n)', 'O(n²)', 'O(log n)'], correct: { 'Array Access': 'O(1)', 'Array Search': 'O(n)', 'Linked List Access': 'O(n)', 'Binary Search': 'O(log n)', 'Hash Table Insert': 'O(1)', 'BST Search': 'O(log n)', 'Heap Insert': 'O(log n)', 'Graph BFS': 'O(V+E)', 'Quick Sort': 'O(n log n)', 'Merge Sort': 'O(n log n)', 'Bubble Sort': 'O(n²)', 'Binary Search Tree Insert': 'O(log n)' } },
      { question: 'Match Linux commands to functions', items: ['ls', 'cd', 'pwd', 'mkdir', 'rm', 'cp', 'mv', 'cat', 'grep', 'chmod', 'chown', 'ps', 'kill'], zones: ['List', 'Change Dir', 'Print Dir', 'Make Dir', 'Remove', 'Copy', 'Move', 'Display', 'Search', 'Permissions', 'Owner', 'Process', 'Terminate'], correct: { 'ls': 'List', 'cd': 'Change Dir', 'pwd': 'Print Dir', 'mkdir': 'Make Dir', 'rm': 'Remove', 'cp': 'Copy', 'mv': 'Move', 'cat': 'Display', 'grep': 'Search', 'chmod': 'Permissions', 'chown': 'Owner', 'ps': 'Process', 'kill': 'Terminate' } },
      { question: 'Match HTTP status codes to meanings', items: ['200', '201', '204', '301', '400', '401', '403', '404', '500', '502', '503'], zones: ['OK', 'Created', 'No Content', 'Moved', 'Bad Request', 'Unauthorized', 'Forbidden', 'Not Found', 'Server Error', 'Bad Gateway', 'Unavailable'], correct: { '200': 'OK', '201': 'Created', '204': 'No Content', '301': 'Moved', '400': 'Bad Request', '401': 'Unauthorized', '403': 'Forbidden', '404': 'Not Found', '500': 'Server Error', '502': 'Bad Gateway', '503': 'Unavailable' } },
      { question: 'Match SQL commands to types', items: ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'DROP', 'ALTER', 'GRANT', 'REVOKE', 'COMMIT', 'ROLLBACK', 'JOIN', 'WHERE'], zones: ['DQL', 'DML', 'DML', 'DML', 'DDL', 'DDL', 'DDL', 'DCL', 'DCL', 'TCL', 'TCL', 'Clause', 'Clause'], correct: { 'SELECT': 'DQL', 'INSERT': 'DML', 'UPDATE': 'DML', 'DELETE': 'DML', 'CREATE': 'DDL', 'DROP': 'DDL', 'ALTER': 'DDL', 'GRANT': 'DCL', 'REVOKE': 'DCL', 'COMMIT': 'TCL', 'ROLLBACK': 'TCL', 'JOIN': 'Clause', 'WHERE': 'Clause' } },
      { question: 'Match JavaScript methods to array operations', items: ['push', 'pop', 'shift', 'unshift', 'slice', 'splice', 'map', 'filter', 'reduce', 'forEach', 'find', 'some', 'every'], zones: ['Add End', 'Remove End', 'Remove Start', 'Add Start', 'Copy', 'Modify', 'Transform', 'Select', 'Accumulate', 'Iterate', 'Search', 'Any', 'All'], correct: { 'push': 'Add End', 'pop': 'Remove End', 'shift': 'Remove Start', 'unshift': 'Add Start', 'slice': 'Copy', 'splice': 'Modify', 'map': 'Transform', 'filter': 'Select', 'reduce': 'Accumulate', 'forEach': 'Iterate', 'find': 'Search', 'some': 'Any', 'every': 'All' } },
      { question: 'Match CSS selectors to specificity', items: ['*', 'div', '.class', '#id', 'div.class', 'div > p', 'div + p', 'div ~ p', '[attr]', ':hover', '::before', 'div p', 'div, p'], zones: ['0', '1', '10', '100', '11', '2', '2', '2', '10', '10', '1', '2', '1'], correct: { '*': '0', 'div': '1', '.class': '10', '#id': '100', 'div.class': '11', 'div > p': '2', 'div + p': '2', 'div ~ p': '2', '[attr]': '10', ':hover': '10', '::before': '1', 'div p': '2', 'div, p': '1' } },
      { question: 'Match design patterns to problems', items: ['Singleton', 'Factory', 'Builder', 'Prototype', 'Adapter', 'Bridge', 'Composite', 'Decorator', 'Facade', 'Proxy', 'Observer', 'Strategy', 'Template', 'Visitor', 'Command'], zones: ['One Instance', 'Create Objects', 'Complex Build', 'Clone', 'Interface Match', 'Decouple', 'Tree Structure', 'Add Features', 'Simplify', 'Control Access', 'Notify', 'Algorithm', 'Steps', 'Operations', 'Encapsulate'], correct: { 'Singleton': 'One Instance', 'Factory': 'Create Objects', 'Builder': 'Complex Build', 'Prototype': 'Clone', 'Adapter': 'Interface Match', 'Bridge': 'Decouple', 'Composite': 'Tree Structure', 'Decorator': 'Add Features', 'Facade': 'Simplify', 'Proxy': 'Control Access', 'Observer': 'Notify', 'Strategy': 'Algorithm', 'Template': 'Steps', 'Visitor': 'Operations', 'Command': 'Encapsulate' } },
      { question: 'Match network protocols to OSI layers', items: ['HTTP', 'FTP', 'SMTP', 'DNS', 'TCP', 'UDP', 'IP', 'ICMP', 'Ethernet', 'WiFi', 'PPP'], zones: ['Layer 7', 'Layer 7', 'Layer 7', 'Layer 7', 'Layer 4', 'Layer 4', 'Layer 3', 'Layer 3', 'Layer 2', 'Layer 2', 'Layer 2'], correct: { 'HTTP': 'Layer 7', 'FTP': 'Layer 7', 'SMTP': 'Layer 7', 'DNS': 'Layer 7', 'TCP': 'Layer 4', 'UDP': 'Layer 4', 'IP': 'Layer 3', 'ICMP': 'Layer 3', 'Ethernet': 'Layer 2', 'WiFi': 'Layer 2', 'PPP': 'Layer 2' } },
      { question: 'Match Python libraries to purposes', items: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn', 'TensorFlow', 'Django', 'Flask', 'Requests', 'BeautifulSoup', 'Pytest', 'SQLAlchemy'], zones: ['Arrays', 'DataFrames', 'Plotting', 'ML', 'Deep Learning', 'Web Framework', 'Micro Framework', 'HTTP', 'Web Scraping', 'Testing', 'ORM'], correct: { 'NumPy': 'Arrays', 'Pandas': 'DataFrames', 'Matplotlib': 'Plotting', 'Scikit-learn': 'ML', 'TensorFlow': 'Deep Learning', 'Django': 'Web Framework', 'Flask': 'Micro Framework', 'Requests': 'HTTP', 'BeautifulSoup': 'Web Scraping', 'Pytest': 'Testing', 'SQLAlchemy': 'ORM' } },
      { question: 'Match Docker commands to actions', items: ['build', 'run', 'pull', 'push', 'ps', 'stop', 'rm', 'rmi', 'exec', 'logs', 'inspect', 'compose'], zones: ['Create Image', 'Start Container', 'Download', 'Upload', 'List', 'Stop', 'Remove Container', 'Remove Image', 'Execute', 'View Logs', 'Details', 'Multi-container'], correct: { 'build': 'Create Image', 'run': 'Start Container', 'pull': 'Download', 'push': 'Upload', 'ps': 'List', 'stop': 'Stop', 'rm': 'Remove Container', 'rmi': 'Remove Image', 'exec': 'Execute', 'logs': 'View Logs', 'inspect': 'Details', 'compose': 'Multi-container' } },
      { question: 'Match React hooks to purposes', items: ['useState', 'useEffect', 'useContext', 'useReducer', 'useCallback', 'useMemo', 'useRef', 'useLayoutEffect', 'useImperativeHandle', 'useDebugValue', 'useId'], zones: ['State', 'Side Effects', 'Context', 'Complex State', 'Memoize Function', 'Memoize Value', 'DOM Reference', 'Layout', 'Ref Handle', 'Debug', 'Unique ID'], correct: { 'useState': 'State', 'useEffect': 'Side Effects', 'useContext': 'Context', 'useReducer': 'Complex State', 'useCallback': 'Memoize Function', 'useMemo': 'Memoize Value', 'useRef': 'DOM Reference', 'useLayoutEffect': 'Layout', 'useImperativeHandle': 'Ref Handle', 'useDebugValue': 'Debug', 'useId': 'Unique ID' } },
      { question: 'Match MongoDB operations to SQL equivalents', items: ['find', 'insertOne', 'updateOne', 'deleteOne', 'aggregate', 'createIndex', 'drop', 'count', 'distinct', 'findOneAndUpdate', 'replaceOne'], zones: ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'GROUP BY', 'CREATE INDEX', 'DROP', 'COUNT', 'DISTINCT', 'UPDATE RETURNING', 'REPLACE'], correct: { 'find': 'SELECT', 'insertOne': 'INSERT', 'updateOne': 'UPDATE', 'deleteOne': 'DELETE', 'aggregate': 'GROUP BY', 'createIndex': 'CREATE INDEX', 'drop': 'DROP', 'count': 'COUNT', 'distinct': 'DISTINCT', 'findOneAndUpdate': 'UPDATE RETURNING', 'replaceOne': 'REPLACE' } },
      { question: 'Match Kubernetes resources to functions', items: ['Pod', 'Service', 'Deployment', 'StatefulSet', 'DaemonSet', 'Job', 'CronJob', 'ConfigMap', 'Secret', 'Ingress', 'PersistentVolume', 'Namespace'], zones: ['Container', 'Network', 'Replicas', 'Stateful', 'Node Copy', 'One-time', 'Scheduled', 'Config', 'Credentials', 'Routing', 'Storage', 'Isolation'], correct: { 'Pod': 'Container', 'Service': 'Network', 'Deployment': 'Replicas', 'StatefulSet': 'Stateful', 'DaemonSet': 'Node Copy', 'Job': 'One-time', 'CronJob': 'Scheduled', 'ConfigMap': 'Config', 'Secret': 'Credentials', 'Ingress': 'Routing', 'PersistentVolume': 'Storage', 'Namespace': 'Isolation' } },
      { question: 'Match security concepts to definitions', items: ['Encryption', 'Hashing', 'Salting', 'JWT', 'OAuth', 'CORS', 'XSS', 'CSRF', 'SQL Injection', 'DDoS', 'MFA', 'SSL/TLS', 'Firewall'], zones: ['Encode', 'One-way', 'Random Data', 'Token', 'Authorization', 'Cross-Origin', 'Script Attack', 'Request Forgery', 'Query Attack', 'Overload', 'Multi-Factor', 'Secure Channel', 'Filter'], correct: { 'Encryption': 'Encode', 'Hashing': 'One-way', 'Salting': 'Random Data', 'JWT': 'Token', 'OAuth': 'Authorization', 'CORS': 'Cross-Origin', 'XSS': 'Script Attack', 'CSRF': 'Request Forgery', 'SQL Injection': 'Query Attack', 'DDoS': 'Overload', 'MFA': 'Multi-Factor', 'SSL/TLS': 'Secure Channel', 'Firewall': 'Filter' } },
      { question: 'Match CI/CD tools to categories', items: ['Jenkins', 'GitLab CI', 'GitHub Actions', 'CircleCI', 'Travis CI', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Prometheus', 'Grafana', 'SonarQube', 'Selenium', 'JUnit', 'Jest'], zones: ['CI Server', 'Git CI', 'Git CI', 'Cloud CI', 'Cloud CI', 'Container', 'Orchestration', 'IaC', 'Config Mgmt', 'Monitoring', 'Visualization', 'Code Quality', 'E2E Testing', 'Unit Testing', 'JS Testing'], correct: { 'Jenkins': 'CI Server', 'GitLab CI': 'Git CI', 'GitHub Actions': 'Git CI', 'CircleCI': 'Cloud CI', 'Travis CI': 'Cloud CI', 'Docker': 'Container', 'Kubernetes': 'Orchestration', 'Terraform': 'IaC', 'Ansible': 'Config Mgmt', 'Prometheus': 'Monitoring', 'Grafana': 'Visualization', 'SonarQube': 'Code Quality', 'Selenium': 'E2E Testing', 'JUnit': 'Unit Testing', 'Jest': 'JS Testing' } }
    ];

    const dragDropGame = {
      subTopicId: subtopic._id,
      title: 'Expert Match Master',
      description: 'Ultimate matching challenge with 10-15 items',
      difficulty: 'Hard',
      points: 40,
      gameType: 'MCQ',
      isMultiLevel: true,
      totalLevels: 20,
      hasTimer: true,
      totalTimeLimit: 2400,
      maxScore: 40,
      passingScore: 24,
      levels: levels.map((level, i) => ({
        levelNumber: i + 1,
        question: level.question,
        questionType: 'DragDrop',
        correctAnswer: JSON.stringify(level),
        hints: [{ hintNumber: 1, hintText: 'Focus on technical relationships and patterns', pointsDeduction: 1 }],
        pointsForLevel: 2,
        shuffleOptions: false
      })),
      speedBonus: { enabled: true, maxBonus: 30, timeThreshold: 800 },
      streakBonus: { enabled: true, bonusPerStreak: 5 },
      tags: ['drag-drop', 'expert', 'technical', 'advanced'],
      isActive: true
    };

    await GamifiedQuestion.create(dragDropGame);
    console.log('✅ Expert Drag & Drop Game seeded successfully!');
    console.log(`Game: ${dragDropGame.title}`);
    console.log(`Levels: ${dragDropGame.totalLevels}`);
    console.log(`Items per level: 10-15`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedExpertDragDropGame();
