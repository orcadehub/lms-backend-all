const AIMockInterview = require('../models/AIMockInterview');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'your-api-key');

// Parse resume text from PDF (simplified - you can enhance with pdf-parse library)
const parseResume = (text) => {
  const skills = [];
  const experience = [];
  
  // Extract skills (basic pattern matching)
  const skillKeywords = ['javascript', 'python', 'java', 'react', 'node', 'mongodb', 'sql', 'aws', 'docker', 'kubernetes'];
  skillKeywords.forEach(skill => {
    if (text.toLowerCase().includes(skill)) skills.push(skill);
  });
  
  // Extract experience years
  const expMatch = text.match(/(\d+)\+?\s*(years?|yrs?)\s*(of)?\s*experience/i);
  const yearsExp = expMatch ? parseInt(expMatch[1]) : 0;
  
  return { skills, yearsExp };
};

// Generate questions using Gemini AI
const generateQuestionsWithAI = async (resumeText, difficulty) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    const prompt = `Analyze this resume and generate 10 interview questions based on the candidate's skills and experience.

Resume:
${resumeText}

Difficulty: ${difficulty}

Generate questions in this JSON format:
[
  {"question": "...", "category": "Technical/Behavioral/Experience"}
]

Focus on: technical skills, projects, experience level, and problem-solving.`;
    
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Extract JSON from response
    const jsonMatch = text.match(/\[\s*\{[\s\S]*\}\s*\]/);    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]).map(q => ({ ...q, difficulty }));
    }
    
    // Fallback to basic questions
    return generateBasicQuestions(resumeText, difficulty);
  } catch (error) {
    console.error('AI generation failed:', error);
    return generateBasicQuestions(resumeText, difficulty);
  }
};

// Fallback basic question generation
const generateBasicQuestions = (resumeText, difficulty) => {
  const skills = ['JavaScript', 'Python', 'React', 'Node.js', 'SQL'].filter(s => 
    resumeText.toLowerCase().includes(s.toLowerCase())
  );
  
  return [
    { question: `Tell me about your experience with ${skills[0] || 'programming'}.`, category: 'Technical', difficulty },
    { question: 'Describe a challenging project you worked on.', category: 'Experience', difficulty },
    { question: 'How do you approach problem-solving?', category: 'Behavioral', difficulty },
    { question: 'What are your strengths and weaknesses?', category: 'Behavioral', difficulty },
    { question: `Explain a complex technical concept in ${skills[1] || 'your field'}.`, category: 'Technical', difficulty }
  ];
};

exports.analyzeResume = async (req, res) => {
  try {
    const { duration, difficulty } = req.body;
    const studentId = req.user.id;
    
    // Get resume text from request body (sent from frontend after reading file)
    let resumeText = req.body.resumeText;
    
    // If file buffer is available, convert to text
    if (req.file && !resumeText) {
      resumeText = req.file.buffer.toString('utf-8');
    }
    
    if (!resumeText) {
      return res.status(400).json({ success: false, message: 'Resume text is required' });
    }
    
    // Generate questions using AI
    const questions = await generateQuestionsWithAI(resumeText, difficulty);
    
    // Save to database
    const mockInterview = new AIMockInterview({
      studentId,
      type: 'resume-based',
      resumeText,
      questions,
      duration,
      difficulty,
      status: 'pending'
    });
    
    await mockInterview.save();
    
    res.json({
      success: true,
      interviewId: mockInterview._id,
      questions: questions.map(q => ({ question: q.question, category: q.category })),
      skills: parseResume(resumeText).skills
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getInterview = async (req, res) => {
  try {
    const interview = await AIMockInterview.findById(req.params.id);
    if (!interview) return res.status(404).json({ message: 'Interview not found' });
    
    res.json(interview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.submitAnswer = async (req, res) => {
  try {
    const { interviewId, questionIndex, answer } = req.body;
    
    const interview = await AIMockInterview.findById(interviewId);
    if (!interview) return res.status(404).json({ message: 'Interview not found' });
    
    interview.questions[questionIndex].answer = answer;
    interview.questions[questionIndex].feedback = 'Good answer'; // Simple feedback
    
    await interview.save();
    
    res.json({ success: true, feedback: interview.questions[questionIndex].feedback });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.completeInterview = async (req, res) => {
  try {
    const interview = await AIMockInterview.findById(req.params.id);
    if (!interview) return res.status(404).json({ message: 'Interview not found' });
    
    interview.status = 'completed';
    interview.score = Math.floor(Math.random() * 30) + 70; // Mock score 70-100
    
    await interview.save();
    
    res.json({ success: true, score: interview.score });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
