const mongoose = require('mongoose');
require('dotenv').config();

const topicSchema = new mongoose.Schema({
  title: String,
  description: String,
  difficulty: String,
  order: Number
}, { timestamps: true });

const subtopicSchema = new mongoose.Schema({
  topicId: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  difficulty: String,
  order: Number
}, { timestamps: true });

const Topic = mongoose.model('Topic', topicSchema);
const SubTopic = mongoose.model('SubTopic', subtopicSchema);

const gamifiedData = [
  {
    topic: { title: 'Logical Reasoning', description: 'Test your logical thinking abilities', difficulty: 'Medium', order: 1 },
    subtopics: [
      { title: 'Syllogisms', description: 'Logical deductions from statements', difficulty: 'Easy', order: 1 },
      { title: 'Blood Relations', description: 'Family relationship puzzles', difficulty: 'Medium', order: 2 },
      { title: 'Seating Arrangements', description: 'Arrange people based on conditions', difficulty: 'Hard', order: 3 },
      { title: 'Puzzles & Riddles', description: 'Brain teasers and riddles', difficulty: 'Medium', order: 4 },
      { title: 'Coding-Decoding', description: 'Pattern-based coding', difficulty: 'Easy', order: 5 },
      { title: 'Direction Sense', description: 'Navigation and direction problems', difficulty: 'Easy', order: 6 },
      { title: 'Ranking & Order', description: 'Position and ranking problems', difficulty: 'Easy', order: 7 },
      { title: 'Clocks & Calendars', description: 'Time-based calculations', difficulty: 'Medium', order: 8 },
      { title: 'Venn Diagrams', description: 'Set theory problems', difficulty: 'Medium', order: 9 },
      { title: 'Statement & Conclusions', description: 'Logical conclusions', difficulty: 'Medium', order: 10 }
    ]
  },
  {
    topic: { title: 'Quantitative Aptitude', description: 'Mathematical problem solving', difficulty: 'Medium', order: 2 },
    subtopics: [
      { title: 'Number Systems', description: 'Properties of numbers', difficulty: 'Easy', order: 1 },
      { title: 'Percentages', description: 'Percentage calculations', difficulty: 'Easy', order: 2 },
      { title: 'Profit & Loss', description: 'Business math problems', difficulty: 'Medium', order: 3 },
      { title: 'Simple & Compound Interest', description: 'Interest calculations', difficulty: 'Medium', order: 4 },
      { title: 'Time & Work', description: 'Work efficiency problems', difficulty: 'Medium', order: 5 },
      { title: 'Time, Speed & Distance', description: 'Motion problems', difficulty: 'Medium', order: 6 },
      { title: 'Ratio & Proportion', description: 'Ratio calculations', difficulty: 'Easy', order: 7 },
      { title: 'Averages', description: 'Mean calculations', difficulty: 'Easy', order: 8 },
      { title: 'Mixtures & Alligations', description: 'Mixture problems', difficulty: 'Hard', order: 9 },
      { title: 'Permutations & Combinations', description: 'Counting principles', difficulty: 'Hard', order: 10 },
      { title: 'Probability', description: 'Chance calculations', difficulty: 'Medium', order: 11 },
      { title: 'Geometry', description: 'Shapes and angles', difficulty: 'Medium', order: 12 },
      { title: 'Mensuration', description: 'Area and volume', difficulty: 'Medium', order: 13 },
      { title: 'Algebra', description: 'Equations and expressions', difficulty: 'Medium', order: 14 },
      { title: 'Data Sufficiency', description: 'Determine if data is sufficient', difficulty: 'Hard', order: 15 }
    ]
  },
  {
    topic: { title: 'Verbal Ability', description: 'English language skills', difficulty: 'Easy', order: 3 },
    subtopics: [
      { title: 'Reading Comprehension', description: 'Understand passages', difficulty: 'Medium', order: 1 },
      { title: 'Sentence Correction', description: 'Grammar corrections', difficulty: 'Easy', order: 2 },
      { title: 'Para Jumbles', description: 'Arrange sentences', difficulty: 'Medium', order: 3 },
      { title: 'Fill in the Blanks', description: 'Complete sentences', difficulty: 'Easy', order: 4 },
      { title: 'Synonyms & Antonyms', description: 'Word meanings', difficulty: 'Easy', order: 5 },
      { title: 'Idioms & Phrases', description: 'Common expressions', difficulty: 'Medium', order: 6 },
      { title: 'One Word Substitution', description: 'Replace phrases', difficulty: 'Easy', order: 7 },
      { title: 'Spotting Errors', description: 'Find grammatical errors', difficulty: 'Easy', order: 8 },
      { title: 'Sentence Completion', description: 'Complete logical sentences', difficulty: 'Medium', order: 9 },
      { title: 'Vocabulary Builder', description: 'Word power', difficulty: 'Easy', order: 10 }
    ]
  },
  {
    topic: { title: 'Data Interpretation', description: 'Analyze charts and graphs', difficulty: 'Medium', order: 4 },
    subtopics: [
      { title: 'Bar Charts', description: 'Interpret bar graphs', difficulty: 'Easy', order: 1 },
      { title: 'Line Graphs', description: 'Analyze trends', difficulty: 'Easy', order: 2 },
      { title: 'Pie Charts', description: 'Percentage distribution', difficulty: 'Easy', order: 3 },
      { title: 'Tables', description: 'Tabular data analysis', difficulty: 'Medium', order: 4 },
      { title: 'Mixed Charts', description: 'Multiple chart types', difficulty: 'Hard', order: 5 }
    ]
  },
  {
    topic: { title: 'Pattern Recognition', description: 'Identify patterns and sequences', difficulty: 'Easy', order: 5 },
    subtopics: [
      { title: 'Number Series', description: 'Number patterns', difficulty: 'Easy', order: 1 },
      { title: 'Letter Series', description: 'Alphabet patterns', difficulty: 'Easy', order: 2 },
      { title: 'Visual Patterns', description: 'Shape patterns', difficulty: 'Medium', order: 3 },
      { title: 'Shape Sequences', description: 'Geometric sequences', difficulty: 'Medium', order: 4 },
      { title: 'Matrix Patterns', description: '2D pattern grids', difficulty: 'Hard', order: 5 }
    ]
  },
  {
    topic: { title: 'Spatial Reasoning', description: 'Visual and spatial thinking', difficulty: 'Hard', order: 6 },
    subtopics: [
      { title: 'Paper Folding & Cutting', description: 'Visualize paper folds', difficulty: 'Hard', order: 1 },
      { title: 'Mirror & Water Images', description: 'Reflection problems', difficulty: 'Medium', order: 2 },
      { title: 'Cube & Dice', description: '3D visualization', difficulty: 'Hard', order: 3 },
      { title: 'Figure Rotation', description: 'Rotate shapes mentally', difficulty: 'Medium', order: 4 },
      { title: 'Embedded Figures', description: 'Find hidden shapes', difficulty: 'Medium', order: 5 }
    ]
  },
  {
    topic: { title: 'Memory & Attention', description: 'Test memory and focus', difficulty: 'Medium', order: 7 },
    subtopics: [
      { title: 'Sequence Memory', description: 'Remember sequences', difficulty: 'Medium', order: 1 },
      { title: 'Visual Memory', description: 'Remember images', difficulty: 'Medium', order: 2 },
      { title: 'Number Memory', description: 'Remember numbers', difficulty: 'Easy', order: 3 },
      { title: 'Attention to Detail', description: 'Spot differences', difficulty: 'Easy', order: 4 },
      { title: 'Spot the Difference', description: 'Find changes', difficulty: 'Easy', order: 5 }
    ]
  },
  {
    topic: { title: 'Coding & Programming', description: 'Programming aptitude', difficulty: 'Hard', order: 8 },
    subtopics: [
      { title: 'Pseudocode Understanding', description: 'Read pseudocode', difficulty: 'Medium', order: 1 },
      { title: 'Code Output Prediction', description: 'Predict results', difficulty: 'Medium', order: 2 },
      { title: 'Debug the Code', description: 'Find bugs', difficulty: 'Hard', order: 3 },
      { title: 'Algorithm Selection', description: 'Choose best algorithm', difficulty: 'Hard', order: 4 },
      { title: 'Complexity Analysis', description: 'Time/space complexity', difficulty: 'Hard', order: 5 },
      { title: 'Data Structure Problems', description: 'DS questions', difficulty: 'Hard', order: 6 },
      { title: 'SQL Queries', description: 'Database queries', difficulty: 'Medium', order: 7 },
      { title: 'Regex Patterns', description: 'Pattern matching', difficulty: 'Hard', order: 8 },
      { title: 'Bitwise Operations', description: 'Bit manipulation', difficulty: 'Hard', order: 9 },
      { title: 'Recursion Problems', description: 'Recursive thinking', difficulty: 'Hard', order: 10 }
    ]
  },
  {
    topic: { title: 'Game Challenges', description: 'Multi-level game experiences', difficulty: 'Hard', order: 9 },
    subtopics: [
      { title: 'Treasure Hunt', description: 'Multi-step puzzle adventure', difficulty: 'Hard', order: 1 },
      { title: 'Escape Room', description: 'Time-bound escape challenges', difficulty: 'Hard', order: 2 },
      { title: 'Quiz Battle', description: '1v1 competitions', difficulty: 'Medium', order: 3 },
      { title: 'Survival Mode', description: 'Elimination rounds', difficulty: 'Hard', order: 4 },
      { title: 'Speed Run', description: 'Fastest completion', difficulty: 'Medium', order: 5 },
      { title: 'Streak Master', description: 'Consecutive correct answers', difficulty: 'Medium', order: 6 },
      { title: 'Daily Challenges', description: 'Daily puzzles', difficulty: 'Medium', order: 7 },
      { title: 'Boss Battles', description: 'Hard question challenges', difficulty: 'Hard', order: 8 }
    ]
  }
];

async function seedGamifiedAptitude() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    for (const data of gamifiedData) {
      const topic = await Topic.create(data.topic);
      console.log(`Created topic: ${topic.title}`);

      for (const sub of data.subtopics) {
        await SubTopic.create({ ...sub, topicId: topic._id });
      }
      console.log(`Created ${data.subtopics.length} subtopics for ${topic.title}`);
    }

    console.log('✅ All gamified aptitude data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedGamifiedAptitude();
