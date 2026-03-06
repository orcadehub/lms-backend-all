require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testGemini() {
  try {
    console.log('Testing Gemini API...');
    
    // List available models
    const models = await genAI.listModels();
    console.log('Available models:', models.map(m => m.name));
    
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `Analyze this resume and generate 5 interview questions.

Resume:
Software Engineer with 3 years experience in JavaScript, React, Node.js, and MongoDB. 
Built e-commerce platform handling 10k users. Strong problem-solving skills.

Generate questions in JSON format:
[{"question": "...", "category": "Technical/Behavioral"}]`;
    
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    console.log('\n✅ API Response:');
    console.log(text);
    
    const jsonMatch = text.match(/\[\s*\{[\s\S]*\}\s*\]/);
    if (jsonMatch) {
      const questions = JSON.parse(jsonMatch[0]);
      console.log('\n✅ Parsed Questions:', questions.length);
      questions.forEach((q, i) => console.log(`${i+1}. ${q.question}`));
    }
    
    console.log('\n✅ Gemini API is working!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testGemini();
