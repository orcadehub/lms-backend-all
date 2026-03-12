require('dotenv').config();
const mongoose = require('mongoose');
const FrontendQuestion = require('./models/FrontendQuestion');

async function verifyAllQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const htmlQuestions = await FrontendQuestion.find({
      title: { $in: [
        'Basic HTML Structure, Headings & Paragraphs',
        'HTML Forms & Input Elements',
        'HTML Lists & Navigation',
        'HTML Tables & Data Display',
        'HTML Semantic Elements & Accessibility'
      ]}
    });
    
    const cssQuestions = await FrontendQuestion.find({
      title: { $in: [
        'CSS Selectors & Basic Styling',
        'CSS Box Model & Layout',
        'CSS Flexbox Layout',
        'CSS Grid Layout',
        'CSS Animations & Transitions'
      ]}
    });
    
    const jsQuestions = await FrontendQuestion.find({
      title: { $in: [
        'DOM Manipulation - Render User List',
        'DOM Manipulation - Product Catalog with Cart',
        'DOM Manipulation - Todo List with Local Storage',
        'DOM Manipulation - Student Grade Dashboard',
        'DOM Manipulation - Employee Management System'
      ]}
    });
    
    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║      FRONTEND QUESTIONS - DATABASE VERIFICATION            ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');
    
    console.log('📚 HTML QUESTIONS (' + htmlQuestions.length + '/5)');
    htmlQuestions.forEach((q, i) => {
      console.log('  ' + (i+1) + '. ' + q.title + ' (' + q.difficulty + ')');
    });
    
    console.log('\n🎨 CSS QUESTIONS (' + cssQuestions.length + '/5)');
    cssQuestions.forEach((q, i) => {
      console.log('  ' + (i+1) + '. ' + q.title + ' (' + q.difficulty + ')');
    });
    
    console.log('\n⚙️  JAVASCRIPT QUESTIONS (' + jsQuestions.length + '/5)');
    jsQuestions.forEach((q, i) => {
      console.log('  ' + (i+1) + '. ' + q.title + ' (' + q.difficulty + ')');
    });
    
    const total = htmlQuestions.length + cssQuestions.length + jsQuestions.length;
    console.log('\n' + '═'.repeat(60));
    console.log('✅ TOTAL: ' + total + '/15 Questions');
    console.log('✅ HTML: ' + htmlQuestions.length + '/5 Questions');
    console.log('✅ CSS: ' + cssQuestions.length + '/5 Questions');
    console.log('✅ JavaScript: ' + jsQuestions.length + '/5 Questions');
    console.log('═'.repeat(60));
    
    if (total === 15) {
      console.log('\n✅ ALL FRONTEND QUESTIONS SUCCESSFULLY VERIFIED!\n');
    } else {
      console.log('\n⚠️  MISSING ' + (15 - total) + ' QUESTIONS\n');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

verifyAllQuestions();
