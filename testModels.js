require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function test() {
  const models = ['gemini-2.0-flash', 'gemini-2.5-flash', 'gemini-1.5-pro', 'gemini-1.5-flash'];
  
  for (const modelName of models) {
    try {
      console.log(`\nTrying ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent('Say hello');
      console.log(`✅ ${modelName} works:`, result.response.text());
      break;
    } catch (error) {
      console.log(`❌ ${modelName} failed`);
    }
  }
}

test();
