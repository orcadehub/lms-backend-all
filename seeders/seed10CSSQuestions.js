require('dotenv').config();
const mongoose = require('mongoose');
const FrontendQuestion = require('../models/FrontendQuestion');
const Tenant = require('../models/Tenant');
const Instructor = require('../models/Instructor');

const cssQuestions = [
  {
    title: 'Style a Button with Colors and Padding',
    problemStatement: 'Style a button element with background color, text color, padding, and remove default border.',
    requirements: [
      'Set .btn background-color to #3b82f6',
      'Set .btn color to #ffffff',
      'Set .btn padding to 12px 24px',
      'Set .btn border to none',
      'Set .btn border-radius to 6px',
      'Set .btn cursor to pointer'
    ],
    acceptanceCriteria: [
      'Button has blue background',
      'Text is white',
      'Padding is applied correctly',
      'No border visible',
      'Corners are rounded',
      'Cursor changes on hover'
    ],
    jestTestFile: `describe('Button Styling', () => {
  beforeEach(() => {
    document.body.innerHTML = '<button class="btn">Click Me</button>';
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
  });
  test('background color is blue', () => {
    const btn = document.querySelector('.btn');
    expect(window.getComputedStyle(btn).backgroundColor).toBe('rgb(59, 130, 246)');
  });
  test('text color is white', () => {
    const btn = document.querySelector('.btn');
    expect(window.getComputedStyle(btn).color).toBe('rgb(255, 255, 255)');
  });
  test('padding is correct', () => {
    const btn = document.querySelector('.btn');
    expect(window.getComputedStyle(btn).paddingTop).toBe('12px');
    expect(window.getComputedStyle(btn).paddingRight).toBe('24px');
  });
  test('border is none', () => {
    const btn = document.querySelector('.btn');
    expect(window.getComputedStyle(btn).borderStyle).toBe('none');
  });
  test('border radius applied', () => {
    const btn = document.querySelector('.btn');
    expect(window.getComputedStyle(btn).borderRadius).toBe('6px');
  });
  test('cursor is pointer', () => {
    const btn = document.querySelector('.btn');
    expect(window.getComputedStyle(btn).cursor).toBe('pointer');
  });
});`,
    defaultFiles: {
      html: '<!-- HTML is fixed -->',
      css: '/* Write your CSS here */\n',
      js: '// Write your JavaScript code here'
    },
    allowedFiles: ['html', 'css', 'js'],
    difficulty: 'easy',
    tags: ['CSS', 'Styling', 'Buttons']
  },
  {
    title: 'Center a Div with Flexbox',
    problemStatement: 'Use flexbox to center a child div both horizontally and vertically inside a container.',
    requirements: [
      'Set .container display to flex',
      'Set .container justify-content to center',
      'Set .container align-items to center',
      'Set .container height to 400px',
      'Set .box width to 200px',
      'Set .box height to 200px',
      'Set .box background-color to #10b981'
    ],
    acceptanceCriteria: [
      'Container uses flexbox',
      'Horizontal centering applied',
      'Vertical centering applied',
      'Container has fixed height',
      'Box has correct dimensions',
      'Box has green background'
    ],
    jestTestFile: `describe('Flexbox Centering', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div class="container"><div class="box"></div></div>';
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
  });
  test('container uses flex', () => {
    const container = document.querySelector('.container');
    expect(window.getComputedStyle(container).display).toBe('flex');
  });
  test('justify-content is center', () => {
    const container = document.querySelector('.container');
    expect(window.getComputedStyle(container).justifyContent).toBe('center');
  });
  test('align-items is center', () => {
    const container = document.querySelector('.container');
    expect(window.getComputedStyle(container).alignItems).toBe('center');
  });
  test('container height is 400px', () => {
    const container = document.querySelector('.container');
    expect(window.getComputedStyle(container).height).toBe('400px');
  });
  test('box dimensions correct', () => {
    const box = document.querySelector('.box');
    expect(window.getComputedStyle(box).width).toBe('200px');
    expect(window.getComputedStyle(box).height).toBe('200px');
  });
  test('box background is green', () => {
    const box = document.querySelector('.box');
    expect(window.getComputedStyle(box).backgroundColor).toBe('rgb(16, 185, 129)');
  });
});`,
    defaultFiles: {
      html: '<!-- HTML is fixed -->',
      css: '/* Write your CSS here */\n',
      js: '// Write your JavaScript code here'
    },
    allowedFiles: ['html', 'css', 'js'],
    difficulty: 'easy',
    tags: ['CSS', 'Flexbox', 'Centering']
  },
  {
    title: 'Create a 2-Column Grid Layout',
    problemStatement: 'Use CSS Grid to create a 2-column layout with equal width columns and gap between them.',
    requirements: [
      'Set .grid display to grid',
      'Set grid-template-columns to 1fr 1fr',
      'Set gap to 24px',
      'Set .grid-item padding to 20px',
      'Set .grid-item background-color to #f3f4f6',
      'Set .grid-item border-radius to 8px'
    ],
    acceptanceCriteria: [
      'Grid display is applied',
      'Two equal columns exist',
      'Gap spacing is correct',
      'Items have padding',
      'Items have gray background',
      'Items have rounded corners'
    ],
    jestTestFile: `describe('Grid Layout', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div class="grid"><div class="grid-item">1</div><div class="grid-item">2</div></div>';
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
  });
  test('grid display applied', () => {
    const grid = document.querySelector('.grid');
    expect(window.getComputedStyle(grid).display).toBe('grid');
  });
  test('two columns configured', () => {
    const grid = document.querySelector('.grid');
    expect(window.getComputedStyle(grid).gridTemplateColumns).toBe('1fr 1fr');
  });
  test('gap is 24px', () => {
    const grid = document.querySelector('.grid');
    expect(window.getComputedStyle(grid).gap).toBe('24px');
  });
  test('item padding is 20px', () => {
    const item = document.querySelector('.grid-item');
    expect(window.getComputedStyle(item).paddingTop).toBe('20px');
  });
  test('item background is gray', () => {
    const item = document.querySelector('.grid-item');
    expect(window.getComputedStyle(item).backgroundColor).toBe('rgb(243, 244, 246)');
  });
  test('item border radius is 8px', () => {
    const item = document.querySelector('.grid-item');
    expect(window.getComputedStyle(item).borderRadius).toBe('8px');
  });
});`,
    defaultFiles: {
      html: '<!-- HTML is fixed -->',
      css: '/* Write your CSS here */\n',
      js: '// Write your JavaScript code here'
    },
    allowedFiles: ['html', 'css', 'js'],
    difficulty: 'medium',
    tags: ['CSS', 'Grid', 'Layout']
  },
  {
    title: 'Style Text with Font Properties',
    problemStatement: 'Apply typography styles including font family, size, weight, line height, and text alignment.',
    requirements: [
      'Set .text font-family to "Arial, sans-serif"',
      'Set .text font-size to 18px',
      'Set .text font-weight to 600',
      'Set .text line-height to 1.6',
      'Set .text color to #1f2937',
      'Set .text text-align to center'
    ],
    acceptanceCriteria: [
      'Font family is set',
      'Font size is 18px',
      'Font weight is bold',
      'Line height improves readability',
      'Text color is dark gray',
      'Text is centered'
    ],
    jestTestFile: `describe('Typography', () => {
  beforeEach(() => {
    document.body.innerHTML = '<p class="text">Sample text</p>';
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
  });
  test('font family includes Arial', () => {
    const text = document.querySelector('.text');
    expect(window.getComputedStyle(text).fontFamily.includes('Arial')).toBe(true);
  });
  test('font size is 18px', () => {
    const text = document.querySelector('.text');
    expect(window.getComputedStyle(text).fontSize).toBe('18px');
  });
  test('font weight is 600', () => {
    const text = document.querySelector('.text');
    expect(window.getComputedStyle(text).fontWeight).toBe('600');
  });
  test('line height is 1.6', () => {
    const text = document.querySelector('.text');
    expect(window.getComputedStyle(text).lineHeight).toBe('1.6');
  });
  test('color is dark gray', () => {
    const text = document.querySelector('.text');
    expect(window.getComputedStyle(text).color).toBe('rgb(31, 41, 55)');
  });
  test('text is centered', () => {
    const text = document.querySelector('.text');
    expect(window.getComputedStyle(text).textAlign).toBe('center');
  });
});`,
    defaultFiles: {
      html: '<!-- HTML is fixed -->',
      css: '/* Write your CSS here */\n',
      js: '// Write your JavaScript code here'
    },
    allowedFiles: ['html', 'css', 'js'],
    difficulty: 'easy',
    tags: ['CSS', 'Typography', 'Text']
  },
  {
    title: 'Create Hover Effect with Transition',
    problemStatement: 'Add smooth hover effect to a card that changes background color and adds shadow with transition.',
    requirements: [
      'Set .card background-color to #ffffff',
      'Set .card padding to 24px',
      'Set .card border-radius to 12px',
      'Set .card transition to all 0.3s ease',
      'Set .card:hover background-color to #eff6ff',
      'Set .card:hover box-shadow to 0 4px 12px rgba(0,0,0,0.1)'
    ],
    acceptanceCriteria: [
      'Card has white background',
      'Card has padding',
      'Card has rounded corners',
      'Transition is smooth',
      'Hover changes background',
      'Hover adds shadow'
    ],
    jestTestFile: `describe('Hover Effect', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div class="card">Card content</div>';
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
  });
  test('card background is white', () => {
    const card = document.querySelector('.card');
    expect(window.getComputedStyle(card).backgroundColor).toBe('rgb(255, 255, 255)');
  });
  test('card padding is 24px', () => {
    const card = document.querySelector('.card');
    expect(window.getComputedStyle(card).paddingTop).toBe('24px');
  });
  test('border radius is 12px', () => {
    const card = document.querySelector('.card');
    expect(window.getComputedStyle(card).borderRadius).toBe('12px');
  });
  test('transition exists', () => {
    const card = document.querySelector('.card');
    expect(window.getComputedStyle(card).transitionProperty.includes('all')).toBe(true);
  });
  test('hover selector exists', () => {
    expect(window.__CSS__.includes('.card:hover')).toBe(true);
  });
  test('hover box-shadow exists', () => {
    expect(window.__CSS__.includes('box-shadow')).toBe(true);
  });
});`,
    defaultFiles: {
      html: '<!-- HTML is fixed -->',
      css: '/* Write your CSS here */\n',
      js: '// Write your JavaScript code here'
    },
    allowedFiles: ['html', 'css', 'js'],
    difficulty: 'medium',
    tags: ['CSS', 'Hover', 'Transitions']
  },
  {
    title: 'Position Badge Absolutely',
    problemStatement: 'Use absolute positioning to place a badge in the top-right corner of a relative container.',
    requirements: [
      'Set .container position to relative',
      'Set .container width to 300px',
      'Set .container height to 200px',
      'Set .badge position to absolute',
      'Set .badge top to 10px',
      'Set .badge right to 10px',
      'Set .badge background-color to #ef4444'
    ],
    acceptanceCriteria: [
      'Container is relatively positioned',
      'Container has fixed dimensions',
      'Badge is absolutely positioned',
      'Badge is in top-right corner',
      'Badge has red background'
    ],
    jestTestFile: `describe('Absolute Positioning', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div class="container"><span class="badge">New</span></div>';
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
  });
  test('container is relative', () => {
    const container = document.querySelector('.container');
    expect(window.getComputedStyle(container).position).toBe('relative');
  });
  test('container dimensions correct', () => {
    const container = document.querySelector('.container');
    expect(window.getComputedStyle(container).width).toBe('300px');
    expect(window.getComputedStyle(container).height).toBe('200px');
  });
  test('badge is absolute', () => {
    const badge = document.querySelector('.badge');
    expect(window.getComputedStyle(badge).position).toBe('absolute');
  });
  test('badge top is 10px', () => {
    const badge = document.querySelector('.badge');
    expect(window.getComputedStyle(badge).top).toBe('10px');
  });
  test('badge right is 10px', () => {
    const badge = document.querySelector('.badge');
    expect(window.getComputedStyle(badge).right).toBe('10px');
  });
  test('badge background is red', () => {
    const badge = document.querySelector('.badge');
    expect(window.getComputedStyle(badge).backgroundColor).toBe('rgb(239, 68, 68)');
  });
});`,
    defaultFiles: {
      html: '<!-- HTML is fixed -->',
      css: '/* Write your CSS here */\n',
      js: '// Write your JavaScript code here'
    },
    allowedFiles: ['html', 'css', 'js'],
    difficulty: 'medium',
    tags: ['CSS', 'Positioning', 'Absolute']
  },
  {
    title: 'Create Responsive Layout with Media Query',
    problemStatement: 'Create a responsive layout that changes from 3 columns to 1 column on mobile devices.',
    requirements: [
      'Set .container display to grid',
      'Set grid-template-columns to repeat(3, 1fr)',
      'Set gap to 16px',
      'Add @media (max-width: 768px)',
      'Inside media query, set grid-template-columns to 1fr',
      'Set .item padding to 16px'
    ],
    acceptanceCriteria: [
      'Grid layout is applied',
      'Desktop has 3 columns',
      'Gap is consistent',
      'Media query exists',
      'Mobile has 1 column',
      'Items have padding'
    ],
    jestTestFile: `describe('Responsive Layout', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div class="container"><div class="item">1</div></div>';
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
  });
  test('container uses grid', () => {
    const container = document.querySelector('.container');
    expect(window.getComputedStyle(container).display).toBe('grid');
  });
  test('desktop has 3 columns', () => {
    const container = document.querySelector('.container');
    expect(window.getComputedStyle(container).gridTemplateColumns).toBe('repeat(3, 1fr)');
  });
  test('gap is 16px', () => {
    const container = document.querySelector('.container');
    expect(window.getComputedStyle(container).gap).toBe('16px');
  });
  test('media query exists', () => {
    expect(window.__CSS__.includes('@media')).toBe(true);
    expect(window.__CSS__.includes('max-width: 768px')).toBe(true);
  });
  test('item padding is 16px', () => {
    const item = document.querySelector('.item');
    expect(window.getComputedStyle(item).paddingTop).toBe('16px');
  });
});`,
    defaultFiles: {
      html: '<!-- HTML is fixed -->',
      css: '/* Write your CSS here */\n',
      js: '// Write your JavaScript code here'
    },
    allowedFiles: ['html', 'css', 'js'],
    difficulty: 'medium',
    tags: ['CSS', 'Responsive', 'Media Queries']
  },
  {
    title: 'Style List with Pseudo-classes',
    problemStatement: 'Use pseudo-classes to style list items differently based on their position.',
    requirements: [
      'Set .list li padding to 12px',
      'Set .list li border-bottom to 1px solid #e5e7eb',
      'Set .list li:first-child font-weight to 700',
      'Set .list li:last-child border-bottom to none',
      'Set .list li:nth-child(even) background-color to #f9fafb',
      'Set .list li:hover background-color to #eff6ff'
    ],
    acceptanceCriteria: [
      'All items have padding',
      'Items have bottom border',
      'First item is bold',
      'Last item has no border',
      'Even items have gray background',
      'Hover changes background'
    ],
    jestTestFile: `describe('List Pseudo-classes', () => {
  beforeEach(() => {
    document.body.innerHTML = '<ul class="list"><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>';
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
  });
  test('list items have padding', () => {
    const li = document.querySelector('.list li');
    expect(window.getComputedStyle(li).paddingTop).toBe('12px');
  });
  test('items have border bottom', () => {
    const li = document.querySelector('.list li');
    expect(window.getComputedStyle(li).borderBottomWidth).toBe('1px');
  });
  test('first-child selector exists', () => {
    expect(window.__CSS__.includes('li:first-child')).toBe(true);
  });
  test('last-child selector exists', () => {
    expect(window.__CSS__.includes('li:last-child')).toBe(true);
  });
  test('nth-child selector exists', () => {
    expect(window.__CSS__.includes('li:nth-child(even)')).toBe(true);
  });
  test('hover selector exists', () => {
    expect(window.__CSS__.includes('li:hover')).toBe(true);
  });
});`,
    defaultFiles: {
      html: '<!-- HTML is fixed -->',
      css: '/* Write your CSS here */\n',
      js: '// Write your JavaScript code here'
    },
    allowedFiles: ['html', 'css', 'js'],
    difficulty: 'medium',
    tags: ['CSS', 'Pseudo-classes', 'Lists']
  },
  {
    title: 'Create Spinning Loader Animation',
    problemStatement: 'Create a spinning loader using CSS keyframe animation with infinite rotation.',
    requirements: [
      'Set .loader width to 50px',
      'Set .loader height to 50px',
      'Set .loader border to 5px solid #e5e7eb',
      'Set .loader border-top-color to #3b82f6',
      'Set .loader border-radius to 50%',
      'Create @keyframes spin with transform rotate(0deg) to rotate(360deg)',
      'Set .loader animation to spin 1s linear infinite'
    ],
    acceptanceCriteria: [
      'Loader has correct size',
      'Loader has border',
      'Top border is blue',
      'Loader is circular',
      'Keyframes are defined',
      'Animation is infinite'
    ],
    jestTestFile: `describe('Loader Animation', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div class="loader"></div>';
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
  });
  test('loader width is 50px', () => {
    const loader = document.querySelector('.loader');
    expect(window.getComputedStyle(loader).width).toBe('50px');
  });
  test('loader height is 50px', () => {
    const loader = document.querySelector('.loader');
    expect(window.getComputedStyle(loader).height).toBe('50px');
  });
  test('loader has border', () => {
    const loader = document.querySelector('.loader');
    expect(window.getComputedStyle(loader).borderTopWidth).toBe('5px');
  });
  test('top border is blue', () => {
    const loader = document.querySelector('.loader');
    expect(window.getComputedStyle(loader).borderTopColor).toBe('rgb(59, 130, 246)');
  });
  test('loader is circular', () => {
    const loader = document.querySelector('.loader');
    expect(window.getComputedStyle(loader).borderRadius).toBe('50%');
  });
  test('keyframes exist', () => {
    expect(window.__CSS__.includes('@keyframes spin')).toBe(true);
  });
  test('animation is infinite', () => {
    const loader = document.querySelector('.loader');
    expect(window.getComputedStyle(loader).animationIterationCount).toBe('infinite');
  });
});`,
    defaultFiles: {
      html: '<!-- HTML is fixed -->',
      css: '/* Write your CSS here */\n',
      js: '// Write your JavaScript code here'
    },
    allowedFiles: ['html', 'css', 'js'],
    difficulty: 'hard',
    tags: ['CSS', 'Animation', 'Keyframes']
  },
  {
    title: 'Use CSS Variables for Theming',
    problemStatement: 'Define CSS custom properties (variables) and use them to style elements consistently.',
    requirements: [
      'Define :root with --primary-color: #3b82f6',
      'Define --secondary-color: #10b981',
      'Define --spacing: 16px',
      'Set .button background-color to var(--primary-color)',
      'Set .button padding to var(--spacing)',
      'Set .badge background-color to var(--secondary-color)',
      'Set .badge padding to calc(var(--spacing) / 2)'
    ],
    acceptanceCriteria: [
      'Root variables are defined',
      'Primary color variable exists',
      'Secondary color variable exists',
      'Spacing variable exists',
      'Button uses primary color',
      'Badge uses secondary color',
      'Calc function is used'
    ],
    jestTestFile: `describe('CSS Variables', () => {
  beforeEach(() => {
    document.body.innerHTML = '<button class="button">Button</button><span class="badge">Badge</span>';
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
  });
  test('root variables exist', () => {
    expect(window.__CSS__.includes(':root')).toBe(true);
    expect(window.__CSS__.includes('--primary-color')).toBe(true);
  });
  test('secondary color variable exists', () => {
    expect(window.__CSS__.includes('--secondary-color')).toBe(true);
  });
  test('spacing variable exists', () => {
    expect(window.__CSS__.includes('--spacing')).toBe(true);
  });
  test('button uses var function', () => {
    expect(window.__CSS__.includes('var(--primary-color)')).toBe(true);
  });
  test('badge uses secondary color', () => {
    expect(window.__CSS__.includes('var(--secondary-color)')).toBe(true);
  });
  test('calc function is used', () => {
    expect(window.__CSS__.includes('calc')).toBe(true);
  });
});`,
    defaultFiles: {
      html: '<!-- HTML is fixed -->',
      css: '/* Write your CSS here */\n',
      js: '// Write your JavaScript code here'
    },
    allowedFiles: ['html', 'css', 'js'],
    difficulty: 'hard',
    tags: ['CSS', 'Variables', 'Custom Properties']
  }
];

async function seed10CSSQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const tenant = await Tenant.findOne();
    const instructor = await Instructor.findOne();

    if (!tenant || !instructor) {
      console.error('Tenant or Instructor not found');
      process.exit(1);
    }

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

seed10CSSQuestions();
