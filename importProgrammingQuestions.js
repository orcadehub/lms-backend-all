const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();

const ProgrammingQuestion = require('./models/ProgrammingQuestion');

const SHEET_ID = '197pQuWdj0u9fiFyN2WILdvpOiZ2Qm_rvALzSTRg1mho';
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;

const parseCSV = (csv) => {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
  const data = [];
  
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    const row = {};
    let currentField = '';
    let inQuotes = false;
    let fieldIndex = 0;
    
    for (let j = 0; j < lines[i].length; j++) {
      const char = lines[i][j];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        row[headers[fieldIndex]] = currentField.trim();
        currentField = '';
        fieldIndex++;
      } else {
        currentField += char;
      }
    }
    
    row[headers[fieldIndex]] = currentField.trim();
    data.push(row);
  }
  
  return data;
};

const parseTestCases = (testCasesStr) => {
  try {
    const testCases = JSON.parse(testCasesStr);
    return testCases.map(tc => ({
      input: tc.input,
      output: tc.output,
      explanation: tc.explanation || '',
      isPublic: tc.isPublic !== false
    }));
  } catch (e) {
    return [];
  }
};

const parseConstraints = (constraintsStr) => {
  if (!constraintsStr) return [];
  return constraintsStr.split('\n').filter(c => c.trim());
};

const importQuestions = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const response = await axios.get(SHEET_URL);
    const questions = parseCSV(response.data);

    console.log(`Found ${questions.length} questions to import`);

    const instructorId = '000000000000000000000001';

    for (const q of questions) {
      if (!q.title || !q.description) continue;

      const questionData = {
        title: q.title,
        description: q.description,
        difficulty: q.difficulty || 'Easy',
        constraints: parseConstraints(q.constraints),
        testCases: parseTestCases(q.testCases),
        tags: q.topic ? [q.topic] : [],
        assessmentType: 'programming',
        example: {
          input: q.example_input || '',
          output: q.example_output || '',
          explanation: q.explanation || ''
        },
        intuition: {
          approach: q.intuition_approach || 'Solve the problem step by step',
          timeComplexity: q.intuition_timeComplexity || 'O(n)',
          spaceComplexity: q.intuition_spaceComplexity || 'O(1)',
          keyInsights: q.intuition_keyInsights ? q.intuition_keyInsights.split('\n').filter(k => k.trim()) : [],
          algorithmSteps: q.intuition_algorithmSteps ? q.intuition_algorithmSteps.split('\n').filter(s => s.trim()) : []
        },
        topic: q.topic || 'General',
        isActive: true,
        createdBy: instructorId
      };

      await ProgrammingQuestion.findOneAndUpdate(
        { title: questionData.title, topic: questionData.topic },
        questionData,
        { upsert: true, new: true }
      );

      console.log(`Imported: ${questionData.title}`);
    }

    console.log('Import completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error importing questions:', error);
    process.exit(1);
  }
};

importQuestions();
