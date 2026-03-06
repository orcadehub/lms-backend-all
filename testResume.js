require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testResumeAnalysis() {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    const resumeText = `
    John Doe
    Software Engineer
    3 years experience in JavaScript, React, Node.js, MongoDB
    Built e-commerce platform handling 10k users
    Strong problem-solving and teamwork skills
    `;
    
    const prompt = `Analyze this resume and generate 10 interview questions based on the candidate's skills and experience.

Resume:
${resumeText}

Difficulty: medium

Generate questions in this JSON format:
[
  {"question": "...", "category": "Technical/Behavioral/Experience"}
]

Focus on: technical skills, projects, experience level, and problem-solving.`;
    
    console.log('Analyzing resume...\n');
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    console.log('AI Response:\n', text);
    
    const jsonMatch = text.match(/\[\s*\{[\s\S]*\}\s*\]/);
    if (jsonMatch) {
      const questions = JSON.parse(jsonMatch[0]);
      console.log('\n✅ Generated', questions.length, 'questions:');
      questions.forEach((q, i) => console.log(`${i+1}. [${q.category}] ${q.question}`));
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testResumeAnalysis();
