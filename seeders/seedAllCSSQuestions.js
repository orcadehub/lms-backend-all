require('dotenv').config();
const mongoose = require('mongoose');
const FrontendQuestion = require('../models/FrontendQuestion');
const Tenant = require('../models/Tenant');
const Instructor = require('../models/Instructor');

const cssQuestions = [
  {
    title: 'CSS Selectors - Class, ID, and Element',
    problemStatement: 'Apply styles using different CSS selectors including class, id, and element selectors.',
    requirements: [
      "Set all p elements color to #333333",
      "Set .highlight class background-color to #ffeb3b",
      "Set #main-title font-size to 32px",
      "Set .highlight padding to 10px",
      "Set #main-title font-weight to bold"
    ],
    acceptanceCriteria: [
      'Paragraph color is applied',
      'Highlight background is yellow',
      'Main title font size is correct',
      'Highlight padding is applied',
      'Main title is bold'
    ],
    expectedOutput: `<div style="padding:20px;font-family:Arial;">
  <h1 id="main-title" style="font-size:32px;font-weight:bold;color:#6a0dad;">Title</h1>
  <p style="color:#333333;">Paragraph text</p>
  <p class="highlight" style="background-color:#ffeb3b;padding:10px;">Highlighted text</p>
</div>`,
    jestTestFile: `describe('CSS Selectors', () => {
  beforeEach(() => {
    document.body.innerHTML = \`
      <h1 id="main-title">Title</h1>
      <p>Paragraph text</p>
      <p class="highlight">Highlighted text</p>
    \`;
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
  });

  test('paragraph color is #333333', () => {
    const p = document.querySelector('p');
    expect(window.getComputedStyle(p).color).toBe('rgb(51, 51, 51)');
  });

  test('highlight background is #ffeb3b', () => {
    const highlight = document.querySelector('.highlight');
    expect(window.getComputedStyle(highlight).backgroundColor).toBe('rgb(255, 235, 59)');
  });

  test('main title font size is 32px', () => {
    const title = document.getElementById('main-title');
    expect(window.getComputedStyle(title).fontSize).toBe('32px');
  });

  test('highlight padding is 10px', () => {
    const highlight = document.querySelector('.highlight');
    expect(window.getComputedStyle(highlight).paddingTop).toBe('10px');
  });

  test('main title is bold', () => {
    const title = document.getElementById('main-title');
    const weight = window.getComputedStyle(title).fontWeight;
    expect(weight === 'bold' || weight === '700').toBe(true);
  });
});`,
    defaultFiles: {
      html: '<!-- HTML is fixed -->',
      css: '/* Write your CSS here */\n',
      js: ''
    },
    allowedFiles: ['css'],
    difficulty: 'easy',
    tags: ['CSS', 'Selectors']
  },

  {
    title: 'CSS Box Model - Margin, Padding, Border',
    problemStatement: 'Apply box model properties to create proper spacing and borders.',
    requirements: [
      "Set .box width to 300px",
      "Set .box padding to 20px",
      "Set .box margin to 15px",
      "Set .box border to 2px solid #3f51b5",
      "Set .box box-sizing to border-box"
    ],
    acceptanceCriteria: [
      'Box width is 300px',
      'Padding is applied',
      'Margin is applied',
      'Border is visible',
      'Box sizing is border-box'
    ],
    expectedOutput: `<div style="padding:20px;background:#f5f5f5;">
  <div style="width:300px;padding:20px;margin:15px;border:2px solid #3f51b5;border-radius:12px;background:#ffffff;box-sizing:border-box;">Panel content</div>
</div>`,
    jestTestFile: `describe('CSS Box Model', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div class="box">Content</div>';
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
  });

  test('box width is 300px', () => {
    const box = document.querySelector('.box');
    expect(window.getComputedStyle(box).width).toBe('300px');
  });

  test('box padding is 20px', () => {
    const box = document.querySelector('.box');
    expect(window.getComputedStyle(box).paddingTop).toBe('20px');
  });

  test('box margin is 15px', () => {
    const box = document.querySelector('.box');
    expect(window.getComputedStyle(box).marginTop).toBe('15px');
  });

  test('box border width is 2px', () => {
    const box = document.querySelector('.box');
    expect(window.getComputedStyle(box).borderTopWidth).toBe('2px');
  });

  test('box sizing is border-box', () => {
    const box = document.querySelector('.box');
    expect(window.getComputedStyle(box).boxSizing).toBe('border-box');
  });
});`,
    defaultFiles: {
      html: '<!-- HTML is fixed -->',
      css: '/* Write your CSS here */\n',
      js: ''
    },
    allowedFiles: ['css'],
    difficulty: 'easy',
    tags: ['CSS', 'Box Model']
  },

  {
    title: 'CSS Flexbox - Basic Layout',
    problemStatement: 'Create a flexbox layout with proper alignment and spacing.',
    requirements: [
      "Set .container display to flex",
      "Set .container justify-content to space-between",
      "Set .container align-items to center",
      "Set .container gap to 20px",
      "Set .container padding to 16px"
    ],
    acceptanceCriteria: [
      'Container uses flexbox',
      'Items are spaced between',
      'Items are vertically centered',
      'Gap between items exists',
      'Container has padding'
    ],
    expectedOutput: `<div style="display:flex;justify-content:space-between;align-items:center;gap:20px;padding:16px;background:#f5f5f5;border-radius:8px;">
  <div style="background:#1976d2;color:white;padding:20px;border-radius:8px;">Item 1</div>
  <div style="background:#1976d2;color:white;padding:20px;border-radius:8px;">Item 2</div>
  <div style="background:#1976d2;color:white;padding:20px;border-radius:8px;">Item 3</div>
</div>`,
    jestTestFile: `describe('CSS Flexbox', () => {
  beforeEach(() => {
    document.body.innerHTML = \`
      <div class="container">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </div>
    \`;
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
  });

  test('container uses flex', () => {
    const container = document.querySelector('.container');
    expect(window.getComputedStyle(container).display).toBe('flex');
  });

  test('justify-content is space-between', () => {
    const container = document.querySelector('.container');
    expect(window.getComputedStyle(container).justifyContent).toBe('space-between');
  });

  test('align-items is center', () => {
    const container = document.querySelector('.container');
    expect(window.getComputedStyle(container).alignItems).toBe('center');
  });

  test('gap is 20px', () => {
    const container = document.querySelector('.container');
    expect(window.getComputedStyle(container).gap).toBe('20px');
  });

  test('padding is 16px', () => {
    const container = document.querySelector('.container');
    expect(window.getComputedStyle(container).paddingTop).toBe('16px');
  });
});`,
    defaultFiles: {
      html: '<!-- HTML is fixed -->',
      css: '/* Write your CSS here */\n',
      js: ''
    },
    allowedFiles: ['css'],
    difficulty: 'medium',
    tags: ['CSS', 'Flexbox', 'Layout']
  },

  {
    title: 'CSS Grid - Basic Grid Layout',
    problemStatement: 'Create a CSS Grid layout with 3 columns and proper spacing.',
    requirements: [
      "Set .grid display to grid",
      "Set grid-template-columns to repeat(3, 1fr)",
      "Set gap to 24px",
      "Set .grid-item background-color to #e3f2fd",
      "Set .grid-item padding to 20px"
    ],
    acceptanceCriteria: [
      'Grid display is applied',
      'Three equal columns exist',
      'Gap between items is correct',
      'Grid items have background',
      'Grid items have padding'
    ],
    expectedOutput: `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;padding:20px;background:#f5f5f5;">
  <div style="background:#e3f2fd;padding:20px;border-radius:10px;border:1px solid #e5e7eb;">1</div>
  <div style="background:#e3f2fd;padding:20px;border-radius:10px;border:1px solid #e5e7eb;">2</div>
  <div style="background:#e3f2fd;padding:20px;border-radius:10px;border:1px solid #e5e7eb;">3</div>
</div>`,
    jestTestFile: `describe('CSS Grid', () => {
  beforeEach(() => {
    document.body.innerHTML = \`
      <div class="grid">
        <div class="grid-item">1</div>
        <div class="grid-item">2</div>
        <div class="grid-item">3</div>
      </div>
    \`;
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
  });

  test('grid display is applied', () => {
    const grid = document.querySelector('.grid');
    expect(window.getComputedStyle(grid).display).toBe('grid');
  });

  test('grid has 3 columns', () => {
    const grid = document.querySelector('.grid');
    const columns = window.getComputedStyle(grid).gridTemplateColumns;
    expect(columns.split(' ').length).toBe(3);
  });

  test('gap is 24px', () => {
    const grid = document.querySelector('.grid');
    expect(window.getComputedStyle(grid).gap).toBe('24px');
  });

  test('grid item background is #e3f2fd', () => {
    const item = document.querySelector('.grid-item');
    expect(window.getComputedStyle(item).backgroundColor).toBe('rgb(227, 242, 253)');
  });

  test('grid item padding is 20px', () => {
    const item = document.querySelector('.grid-item');
    expect(window.getComputedStyle(item).paddingTop).toBe('20px');
  });
});`,
    defaultFiles: {
      html: '<!-- HTML is fixed -->',
      css: '/* Write your CSS here */\n',
      js: ''
    },
    allowedFiles: ['css'],
    difficulty: 'medium',
    tags: ['CSS', 'Grid', 'Layout']
  },

  {
    title: 'CSS Typography - Font Styling',
    problemStatement: 'Apply typography styles including font family, size, weight, and spacing.',
    requirements: [
      "Set body font-family to Arial, sans-serif",
      "Set h1 font-size to 36px",
      "Set h1 font-weight to 700",
      "Set p line-height to 1.6",
      "Set p letter-spacing to 0.5px"
    ],
    acceptanceCriteria: [
      'Body font family is set',
      'H1 font size is correct',
      'H1 is bold',
      'Paragraph line height is applied',
      'Paragraph letter spacing is applied'
    ],
    expectedOutput: `<div style="font-family:Arial,sans-serif;padding:20px;">
  <h1 style="font-size:36px;font-weight:700;">Heading</h1>
  <p style="line-height:1.6;letter-spacing:0.5px;">Paragraph text with proper spacing and typography.</p>
</div>`,
    jestTestFile: `describe('CSS Typography', () => {
  beforeEach(() => {
    document.body.innerHTML = \`
      <h1>Heading</h1>
      <p>Paragraph text</p>
    \`;
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
  });

  test('body font family includes Arial', () => {
    const body = document.body;
    const fontFamily = window.getComputedStyle(body).fontFamily.toLowerCase();
    expect(fontFamily).toContain('arial');
  });

  test('h1 font size is 36px', () => {
    const h1 = document.querySelector('h1');
    expect(window.getComputedStyle(h1).fontSize).toBe('36px');
  });

  test('h1 font weight is 700', () => {
    const h1 = document.querySelector('h1');
    expect(window.getComputedStyle(h1).fontWeight).toBe('700');
  });

  test('paragraph line height is 1.6', () => {
    const p = document.querySelector('p');
    const lineHeight = parseFloat(window.getComputedStyle(p).lineHeight);
    const fontSize = parseFloat(window.getComputedStyle(p).fontSize);
    expect(Math.abs(lineHeight / fontSize - 1.6)).toBeLessThan(0.1);
  });

  test('paragraph letter spacing is 0.5px', () => {
    const p = document.querySelector('p');
    expect(window.getComputedStyle(p).letterSpacing).toBe('0.5px');
  });
});`,
    defaultFiles: {
      html: '<!-- HTML is fixed -->',
      css: '/* Write your CSS here */\n',
      js: ''
    },
    allowedFiles: ['css'],
    difficulty: 'easy',
    tags: ['CSS', 'Typography', 'Fonts']
  },

  {
    title: 'CSS Colors and Backgrounds',
    problemStatement: 'Apply colors and background properties to elements.',
    requirements: [
      "Set .card background-color to #ffffff",
      "Set .card color to #212121",
      "Set .header background-color to #1976d2",
      "Set .header color to #ffffff",
      "Set .button background-color to #4caf50"
    ],
    acceptanceCriteria: [
      'Card has white background',
      'Card text is dark',
      'Header has blue background',
      'Header text is white',
      'Button has green background'
    ],
    expectedOutput: `<div style="padding:20px;">
  <div style="background:#ffffff;color:#212121;padding:20px;margin:10px;border-radius:8px;box-shadow:0 2px 4px rgba(0,0,0,0.1);">Card content</div>
  <div style="background:#1976d2;color:#ffffff;padding:20px;margin:10px;border-radius:8px;">Header</div>
  <button style="background:#4caf50;color:white;padding:10px 20px;border:none;border-radius:4px;cursor:pointer;">Click</button>
</div>`,
    jestTestFile: `describe('CSS Colors and Backgrounds', () => {
  beforeEach(() => {
    document.body.innerHTML = \`
      <div class="card">Card content</div>
      <div class="header">Header</div>
      <button class="button">Click</button>
    \`;
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
  });

  test('card background is white', () => {
    const card = document.querySelector('.card');
    expect(window.getComputedStyle(card).backgroundColor).toBe('rgb(255, 255, 255)');
  });

  test('card text color is dark', () => {
    const card = document.querySelector('.card');
    expect(window.getComputedStyle(card).color).toBe('rgb(33, 33, 33)');
  });

  test('header background is blue', () => {
    const header = document.querySelector('.header');
    expect(window.getComputedStyle(header).backgroundColor).toBe('rgb(25, 118, 210)');
  });

  test('header text is white', () => {
    const header = document.querySelector('.header');
    expect(window.getComputedStyle(header).color).toBe('rgb(255, 255, 255)');
  });

  test('button background is green', () => {
    const button = document.querySelector('.button');
    expect(window.getComputedStyle(button).backgroundColor).toBe('rgb(76, 175, 80)');
  });
});`,
    defaultFiles: {
      html: '<!-- HTML is fixed -->',
      css: '/* Write your CSS here */\n',
      js: ''
    },
    allowedFiles: ['css'],
    difficulty: 'easy',
    tags: ['CSS', 'Colors', 'Backgrounds']
  },

  {
    title: 'CSS Positioning - Relative and Absolute',
    problemStatement: 'Use CSS positioning to place elements precisely.',
    requirements: [
      "Set .parent position to relative",
      "Set .child position to absolute",
      "Set .child top to 10px",
      "Set .child right to 10px",
      "Set .parent height to 200px"
    ],
    acceptanceCriteria: [
      'Parent has relative positioning',
      'Child has absolute positioning',
      'Child is positioned from top',
      'Child is positioned from right',
      'Parent has height'
    ],
    expectedOutput: `<div style="position:relative;height:200px;background:#f5f5f5;padding:20px;border-radius:8px;">
  <div style="position:absolute;top:10px;right:10px;background:#1976d2;color:white;padding:10px;border-radius:4px;">Child</div>
</div>`,
    jestTestFile: `describe('CSS Positioning', () => {
  beforeEach(() => {
    document.body.innerHTML = \`
      <div class="parent">
        <div class="child">Child</div>
      </div>
    \`;
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
  });

  test('parent position is relative', () => {
    const parent = document.querySelector('.parent');
    expect(window.getComputedStyle(parent).position).toBe('relative');
  });

  test('child position is absolute', () => {
    const child = document.querySelector('.child');
    expect(window.getComputedStyle(child).position).toBe('absolute');
  });

  test('child top is 10px', () => {
    const child = document.querySelector('.child');
    expect(window.getComputedStyle(child).top).toBe('10px');
  });

  test('child right is 10px', () => {
    const child = document.querySelector('.child');
    expect(window.getComputedStyle(child).right).toBe('10px');
  });

  test('parent height is 200px', () => {
    const parent = document.querySelector('.parent');
    expect(window.getComputedStyle(parent).height).toBe('200px');
  });
});`,
    defaultFiles: {
      html: '<!-- HTML is fixed -->',
      css: '/* Write your CSS here */\n',
      js: ''
    },
    allowedFiles: ['css'],
    difficulty: 'medium',
    tags: ['CSS', 'Positioning']
  },

  {
    title: 'CSS Transitions and Hover Effects',
    problemStatement: 'Add smooth transitions and hover effects to elements.',
    requirements: [
      "Set .button transition to all 0.3s ease",
      "Set .button background-color to #2196f3",
      "Set .button:hover background-color to #1976d2",
      "Set .button padding to 12px 24px",
      "Set .button border-radius to 4px"
    ],
    acceptanceCriteria: [
      'Button has transition',
      'Button has background color',
      'Hover state changes color',
      'Button has padding',
      'Button has rounded corners'
    ],
    expectedOutput: `<div style="padding:20px;">
  <button style="background:#2196f3;color:white;padding:12px 24px;border:none;border-radius:4px;cursor:pointer;transition:all 0.3s ease;">Hover me</button>
  <p style="margin-top:10px;color:#666;font-size:14px;">Hover over the button to see the transition effect</p>
</div>`,
    jestTestFile: `describe('CSS Transitions', () => {
  beforeEach(() => {
    document.body.innerHTML = '<button class="button">Hover me</button>';
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
  });

  test('button has transition', () => {
    const button = document.querySelector('.button');
    const transition = window.getComputedStyle(button).transition;
    expect(transition).toContain('0.3s');
  });

  test('button background is blue', () => {
    const button = document.querySelector('.button');
    expect(window.getComputedStyle(button).backgroundColor).toBe('rgb(33, 150, 243)');
  });

  test('button has padding', () => {
    const button = document.querySelector('.button');
    expect(window.getComputedStyle(button).paddingTop).toBe('12px');
    expect(window.getComputedStyle(button).paddingLeft).toBe('24px');
  });

  test('button has border radius', () => {
    const button = document.querySelector('.button');
    expect(window.getComputedStyle(button).borderRadius).toBe('4px');
  });

  test('hover state exists in CSS', () => {
    expect(window.__CSS__).toContain(':hover');
  });
});`,
    defaultFiles: {
      html: '<!-- HTML is fixed -->',
      css: '/* Write your CSS here */\n',
      js: ''
    },
    allowedFiles: ['css'],
    difficulty: 'medium',
    tags: ['CSS', 'Transitions', 'Hover']
  }
];

async function seedCSSQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const tenant = await Tenant.findOne();
    const instructor = await Instructor.findOne();

    if (!tenant || !instructor) {
      console.error('Tenant or Instructor not found');
      process.exit(1);
    }

    // Delete existing CSS questions
    await FrontendQuestion.deleteMany({ tags: 'CSS' });
    console.log('Removed existing CSS questions');

    // Insert new questions
    for (const question of cssQuestions) {
      await FrontendQuestion.create({
        ...question,
        tenant: tenant._id,
        createdBy: instructor._id
      });
      console.log(`Created: ${question.title}`);
    }

    console.log(`\nAll ${cssQuestions.length} CSS questions created successfully!`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedCSSQuestions();
