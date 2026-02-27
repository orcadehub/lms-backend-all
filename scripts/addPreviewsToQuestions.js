require('dotenv').config();
const mongoose = require('mongoose');
const FrontendQuestion = require('../models/FrontendQuestion');

async function addPreviews() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const questions = await FrontendQuestion.find({});
    console.log(`Found ${questions.length} questions to update`);

    for (const question of questions) {
      let preview = '';
      
      // Generate preview based on question title/tags
      if (question.tags.includes('HTML')) {
        if (question.title.includes('Basic Structure')) {
          preview = `<!DOCTYPE html>
<html lang="en">
<head>
  <title>My First Page</title>
  <style>body{font-family:Arial;padding:20px;background:#f5f5f5;}h1{color:#1976d2;}</style>
</head>
<body>
  <h1>Welcome to HTML</h1>
  <p>This is my first webpage.</p>
</body>
</html>`;
        } else if (question.title.includes('Links')) {
          preview = `<div style="padding:20px;font-family:Arial;">
  <a href="https://www.google.com" style="color:#1976d2;margin:10px;display:block;">Visit Google</a>
  <a href="#section1" style="color:#1976d2;margin:10px;display:block;">Go to Section 1</a>
  <a href="mailto:contact@example.com" style="color:#1976d2;margin:10px;display:block;">Email Us</a>
  <a href="https://www.github.com" target="_blank" style="color:#1976d2;margin:10px;display:block;">GitHub</a>
</div>`;
        } else if (question.title.includes('Media')) {
          preview = `<div style="padding:20px;font-family:Arial;background:#f5f5f5;">
  <img src="https://via.placeholder.com/150" alt="Company Logo" style="margin:10px;border-radius:8px;">
  <img src="https://via.placeholder.com/300x200" width="300" height="200" style="margin:10px;border-radius:8px;">
  <video controls style="width:300px;margin:10px;border-radius:8px;">
    <source src="video.mp4" type="video/mp4">
  </video>
</div>`;
        } else if (question.title.includes('Lists')) {
          preview = `<div style="padding:20px;font-family:Arial;">
  <h3>Unordered List:</h3>
  <ul style="line-height:1.8;">
    <li>Apple</li>
    <li>Banana</li>
    <li>Orange</li>
  </ul>
  <h3>Ordered List:</h3>
  <ol style="line-height:1.8;">
    <li>First</li>
    <li>Second</li>
    <li>Third</li>
  </ol>
</div>`;
        } else if (question.title.includes('Forms')) {
          preview = `<div style="padding:20px;font-family:Arial;background:#f5f5f5;">
  <form style="max-width:400px;background:white;padding:20px;border-radius:8px;">
    <input type="text" name="username" placeholder="Enter username" style="width:100%;padding:10px;margin:10px 0;border:1px solid #ddd;border-radius:4px;">
    <input type="email" name="email" required placeholder="Email" style="width:100%;padding:10px;margin:10px 0;border:1px solid #ddd;border-radius:4px;">
    <input type="password" name="password" placeholder="Password" style="width:100%;padding:10px;margin:10px 0;border:1px solid #ddd;border-radius:4px;">
    <button type="submit" style="background:#1976d2;color:white;padding:10px 20px;border:none;border-radius:4px;cursor:pointer;">Submit</button>
  </form>
</div>`;
        } else if (question.title.includes('Semantic')) {
          preview = `<div style="font-family:Arial;">
  <header style="background:#1976d2;color:white;padding:20px;">
    <nav><a href="#" style="color:white;margin:0 10px;">Home</a><a href="#" style="color:white;margin:0 10px;">About</a></nav>
  </header>
  <main style="padding:20px;">
    <article style="background:#f5f5f5;padding:20px;margin:10px 0;border-radius:8px;">
      <section><h2>Article Section</h2><p>Content here</p></section>
    </article>
  </main>
  <aside style="background:#e3f2fd;padding:20px;margin:10px;">Sidebar content</aside>
  <footer style="background:#333;color:white;padding:20px;text-align:center;">Footer</footer>
</div>`;
        } else if (question.title.includes('IFrame')) {
          preview = `<div style="padding:20px;font-family:Arial;">
  <iframe src="https://www.example.com" width="600" height="400" title="External Content" style="border:1px solid #ddd;border-radius:8px;"></iframe>
</div>`;
        }
      } else if (question.tags.includes('CSS')) {
        if (question.title.includes('Selectors')) {
          preview = `<div style="padding:20px;font-family:Arial;">
  <h1 id="main-title" style="font-size:32px;font-weight:bold;color:#6a0dad;">Title</h1>
  <p style="color:#333333;">Paragraph text</p>
  <p class="highlight" style="background-color:#ffeb3b;padding:10px;">Highlighted text</p>
</div>`;
        } else if (question.title.includes('Box Model')) {
          preview = `<div style="padding:20px;background:#f5f5f5;">
  <div style="width:300px;padding:20px;margin:15px;border:2px solid #3f51b5;border-radius:12px;background:#ffffff;box-sizing:border-box;">
    Panel content
  </div>
</div>`;
        } else if (question.title.includes('Flexbox')) {
          preview = `<div style="display:flex;justify-content:space-between;align-items:center;gap:20px;padding:16px;background:#f5f5f5;border-radius:8px;">
  <div style="background:#1976d2;color:white;padding:20px;border-radius:8px;">Item 1</div>
  <div style="background:#1976d2;color:white;padding:20px;border-radius:8px;">Item 2</div>
  <div style="background:#1976d2;color:white;padding:20px;border-radius:8px;">Item 3</div>
</div>`;
        } else if (question.title.includes('Grid')) {
          preview = `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;padding:20px;background:#f5f5f5;">
  <div style="background:#e3f2fd;padding:20px;border-radius:10px;border:1px solid #e5e7eb;">1</div>
  <div style="background:#e3f2fd;padding:20px;border-radius:10px;border:1px solid #e5e7eb;">2</div>
  <div style="background:#e3f2fd;padding:20px;border-radius:10px;border:1px solid #e5e7eb;">3</div>
</div>`;
        } else if (question.title.includes('Typography')) {
          preview = `<div style="font-family:Arial,sans-serif;padding:20px;">
  <h1 style="font-size:36px;font-weight:700;">Heading</h1>
  <p style="line-height:1.6;letter-spacing:0.5px;">Paragraph text with proper spacing and typography.</p>
</div>`;
        } else if (question.title.includes('Colors')) {
          preview = `<div style="padding:20px;">
  <div style="background:#ffffff;color:#212121;padding:20px;margin:10px;border-radius:8px;box-shadow:0 2px 4px rgba(0,0,0,0.1);">Card content</div>
  <div style="background:#1976d2;color:#ffffff;padding:20px;margin:10px;border-radius:8px;">Header</div>
  <button style="background:#4caf50;color:white;padding:10px 20px;border:none;border-radius:4px;cursor:pointer;">Click</button>
</div>`;
        } else if (question.title.includes('Positioning')) {
          preview = `<div style="position:relative;height:200px;background:#f5f5f5;padding:20px;border-radius:8px;">
  <div style="position:absolute;top:10px;right:10px;background:#1976d2;color:white;padding:10px;border-radius:4px;">Child</div>
</div>`;
        } else if (question.title.includes('Transitions')) {
          preview = `<div style="padding:20px;">
  <button style="background:#2196f3;color:white;padding:12px 24px;border:none;border-radius:4px;cursor:pointer;transition:all 0.3s ease;">Hover me</button>
</div>`;
        }
      } else if (question.tags.includes('JavaScript')) {
        if (question.title.includes('Variables')) {
          preview = `<div style="padding:20px;font-family:Arial;background:#f5f5f5;border-radius:8px;">
  <div id="nameDisplay" style="margin:10px;padding:10px;background:white;border-radius:4px;">Name: John</div>
  <div id="ageDisplay" style="margin:10px;padding:10px;background:white;border-radius:4px;">Age: 25</div>
  <div id="isStudentDisplay" style="margin:10px;padding:10px;background:white;border-radius:4px;">Is Student: true</div>
  <button style="background:#1976d2;color:white;padding:10px 20px;border:none;border-radius:4px;margin:10px;cursor:pointer;">Show Data</button>
</div>`;
        } else if (question.title.includes('Functions')) {
          preview = `<div style="padding:20px;font-family:Arial;">
  <div id="greeting" style="font-size:24px;color:#1976d2;margin:20px;">Hello, Alice!</div>
  <button style="background:#1976d2;color:white;padding:10px 20px;border:none;border-radius:4px;cursor:pointer;">Greet</button>
</div>`;
        } else if (question.title.includes('Arrays')) {
          preview = `<div style="padding:20px;font-family:Arial;">
  <ul style="list-style:none;padding:0;">
    <li style="background:#e3f2fd;margin:5px;padding:10px;border-radius:4px;">Apple</li>
    <li style="background:#e3f2fd;margin:5px;padding:10px;border-radius:4px;">Banana</li>
    <li style="background:#e3f2fd;margin:5px;padding:10px;border-radius:4px;">Orange</li>
  </ul>
  <button style="background:#1976d2;color:white;padding:10px 20px;border:none;border-radius:4px;cursor:pointer;">Display Fruits</button>
</div>`;
        } else if (question.title.includes('DOM')) {
          preview = `<div style="padding:20px;font-family:Arial;">
  <div style="background:blue;color:white;padding:20px;border-radius:8px;border:2px solid red;">Changed!</div>
  <button style="background:#1976d2;color:white;padding:10px 20px;border:none;border-radius:4px;margin-top:10px;cursor:pointer;">Change</button>
</div>`;
        } else if (question.title.includes('Form Validation')) {
          preview = `<div style="padding:20px;font-family:Arial;">
  <input type="text" placeholder="Enter email" style="padding:10px;border:1px solid #ddd;border-radius:4px;width:250px;">
  <button style="background:#1976d2;color:white;padding:10px 20px;border:none;border-radius:4px;margin-left:10px;cursor:pointer;">Submit</button>
  <div style="margin-top:10px;color:#4caf50;font-weight:bold;">Valid email</div>
</div>`;
        } else if (question.title.includes('Objects')) {
          preview = `<div style="padding:20px;font-family:Arial;">
  <div style="font-size:20px;color:#1976d2;margin:20px;">Hi, I am Bob</div>
  <button style="background:#1976d2;color:white;padding:10px 20px;border:none;border-radius:4px;cursor:pointer;">Introduce</button>
</div>`;
        } else if (question.title.includes('Conditional')) {
          preview = `<div style="padding:20px;font-family:Arial;">
  <input type="number" placeholder="Enter number" style="padding:10px;border:1px solid #ddd;border-radius:4px;width:200px;">
  <button style="background:#1976d2;color:white;padding:10px 20px;border:none;border-radius:4px;margin-left:10px;cursor:pointer;">Check</button>
  <div style="margin-top:10px;color:#4caf50;font-weight:bold;">Greater than 10</div>
</div>`;
        } else if (question.title.includes('String')) {
          preview = `<div style="padding:20px;font-family:Arial;">
  <input type="text" placeholder="Enter text" style="padding:10px;border:1px solid #ddd;border-radius:4px;width:200px;">
  <button style="background:#1976d2;color:white;padding:10px 20px;border:none;border-radius:4px;margin-left:10px;cursor:pointer;">Convert</button>
  <div style="margin-top:10px;"><strong>Uppercase:</strong> HELLO</div>
  <div style="margin-top:5px;"><strong>Length:</strong> 5</div>
</div>`;
        }
      }

      if (preview) {
        await FrontendQuestion.findByIdAndUpdate(question._id, { expectedOutput: preview });
        console.log(`✓ Updated: ${question.title}`);
      } else {
        console.log(`⚠ Skipped: ${question.title} (no preview template)`);
      }
    }

    console.log('\nAll questions updated with previews!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addPreviews();
