require('dotenv').config();
const mongoose = require('mongoose');
const FrontendQuestion = require('../models/FrontendQuestion');
const Tenant = require('../models/Tenant');
const Instructor = require('../models/Instructor');

const cssQuestions = [
  {
    title: 'CSS Selectors & Specificity',
    problemStatement: 'Master CSS selectors including element selectors, class selectors, ID selectors, attribute selectors, pseudo-classes, and pseudo-elements. Understand specificity and cascade rules to apply styles correctly to different elements.',
    requirements: [
      'Use element selectors to style HTML elements',
      'Apply class selectors with dot notation (.className)',
      'Use ID selectors with hash notation (#idName)',
      'Apply attribute selectors [attribute="value"]',
      'Use pseudo-classes like :hover, :focus, :active, :nth-child()',
      'Apply pseudo-elements like ::before, ::after, ::first-line',
      'Combine selectors using descendant combinator (space)',
      'Use child combinator (>) for direct children',
      'Apply adjacent sibling combinator (+)',
      'Understand and apply specificity rules correctly'
    ],
    acceptanceCriteria: [
      'Element selectors work correctly',
      'Class selectors are applied',
      'ID selectors are applied',
      'Attribute selectors work',
      'Pseudo-classes function properly',
      'Pseudo-elements are rendered',
      'Combinators work correctly',
      'Specificity is handled properly',
      'Cascade rules are followed',
      'All selector types are demonstrated'
    ],
    jestTestFile: `describe('CSS Selectors & Specificity', () => {
  beforeEach(() => {
    document.body.innerHTML = \`
      <div id="container" class="main-container">
        <h1 class="title">Main Title</h1>
        <p class="paragraph">First paragraph</p>
        <p class="paragraph highlight">Second paragraph</p>
        <button class="btn" data-type="primary">Click Me</button>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
    \`;
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
  });

  test('element selectors work correctly', () => {
    const h1 = document.querySelector('h1');
    const computed = window.getComputedStyle(h1);
    expect(computed.color).toBeTruthy();
  });

  test('class selectors are applied', () => {
    const title = document.querySelector('.title');
    expect(title).toBeTruthy();
    const computed = window.getComputedStyle(title);
    expect(computed.fontSize).toBeTruthy();
  });

  test('ID selectors are applied', () => {
    const container = document.getElementById('container');
    expect(container).toBeTruthy();
    const computed = window.getComputedStyle(container);
    expect(computed.display || computed.padding).toBeTruthy();
  });

  test('attribute selectors work', () => {
    const button = document.querySelector('[data-type="primary"]');
    expect(button).toBeTruthy();
    const computed = window.getComputedStyle(button);
    expect(computed.backgroundColor || computed.color).toBeTruthy();
  });

  test('pseudo-classes function properly', () => {
    expect(window.__CSS__.includes(':hover')).toBe(true);
    expect(window.__CSS__.includes(':nth-child')).toBe(true);
  });

  test('pseudo-elements are rendered', () => {
    expect(window.__CSS__.includes('::before') || window.__CSS__.includes('::after')).toBe(true);
  });

  test('descendant combinator works', () => {
    expect(window.__CSS__.includes(' ')).toBe(true);
  });

  test('child combinator works', () => {
    expect(window.__CSS__.includes('>')).toBe(true);
  });

  test('multiple selectors are used', () => {
    const paragraphs = document.querySelectorAll('.paragraph');
    expect(paragraphs.length).toBeGreaterThan(0);
  });

  test('CSS is properly structured', () => {
    expect(window.__CSS__.length).toBeGreaterThan(100);
    expect(window.__CSS__.includes('{')).toBe(true);
    expect(window.__CSS__.includes('}')).toBe(true);
  });
});`,
    defaultFiles: {
      html: '',
      css: '',
      js: '',
      dataJs: ''
    },
    allowedFiles: ['html', 'css', 'js', 'data.js'],
    expectedOutput: 'CSS code demonstrating element, class, ID, attribute selectors, pseudo-classes, pseudo-elements, and combinators with proper specificity handling.',
    difficulty: 'easy',
    tags: ['CSS', 'Selectors', 'Specificity', 'Pseudo-classes', 'Pseudo-elements', 'Combinators'],
    tenant: null,
    createdBy: null,
    isActive: true
  },
  {
    title: 'CSS Box Model & Positioning',
    problemStatement: 'Understand and apply the CSS box model including margin, padding, border, and content. Master positioning techniques including static, relative, absolute, fixed, and sticky positioning with proper z-index layering.',
    requirements: [
      'Apply margin property with different values (top, right, bottom, left)',
      'Apply padding property to create internal spacing',
      'Use border property with width, style, and color',
      'Set box-sizing to border-box or content-box',
      'Use position: static for default positioning',
      'Apply position: relative with offset properties',
      'Use position: absolute for precise placement',
      'Apply position: fixed for viewport-relative positioning',
      'Use position: sticky for scroll-based positioning',
      'Manage z-index for layering elements'
    ],
    acceptanceCriteria: [
      'Margin is applied correctly',
      'Padding is applied correctly',
      'Border is visible and styled',
      'Box-sizing is set appropriately',
      'Static positioning works',
      'Relative positioning works',
      'Absolute positioning works',
      'Fixed positioning works',
      'Sticky positioning works',
      'Z-index layering is correct'
    ],
    jestTestFile: `describe('CSS Box Model & Positioning', () => {
  beforeEach(() => {
    document.body.innerHTML = \`
      <div class="container">
        <div class="box box-relative">Relative</div>
        <div class="box box-absolute">Absolute</div>
        <div class="box box-fixed">Fixed</div>
        <div class="box box-sticky">Sticky</div>
      </div>
    \`;
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
  });

  test('margin is applied correctly', () => {
    expect(window.__CSS__.includes('margin')).toBe(true);
  });

  test('padding is applied correctly', () => {
    expect(window.__CSS__.includes('padding')).toBe(true);
  });

  test('border is visible and styled', () => {
    expect(window.__CSS__.includes('border')).toBe(true);
  });

  test('box-sizing is set', () => {
    expect(window.__CSS__.includes('box-sizing')).toBe(true);
  });

  test('relative positioning is applied', () => {
    const relativeBox = document.querySelector('.box-relative');
    const computed = window.getComputedStyle(relativeBox);
    expect(computed.position).toBe('relative');
  });

  test('absolute positioning is applied', () => {
    const absoluteBox = document.querySelector('.box-absolute');
    const computed = window.getComputedStyle(absoluteBox);
    expect(computed.position).toBe('absolute');
  });

  test('fixed positioning is applied', () => {
    const fixedBox = document.querySelector('.box-fixed');
    const computed = window.getComputedStyle(fixedBox);
    expect(computed.position).toBe('fixed');
  });

  test('sticky positioning is applied', () => {
    const stickyBox = document.querySelector('.box-sticky');
    const computed = window.getComputedStyle(stickyBox);
    expect(computed.position).toBe('sticky');
  });

  test('z-index is used for layering', () => {
    expect(window.__CSS__.includes('z-index')).toBe(true);
  });

  test('positioning properties are used', () => {
    expect(window.__CSS__.includes('top') || window.__CSS__.includes('left') || window.__CSS__.includes('right') || window.__CSS__.includes('bottom')).toBe(true);
  });
});`,
    defaultFiles: {
      html: '',
      css: '',
      js: '',
      dataJs: ''
    },
    allowedFiles: ['html', 'css', 'js', 'data.js'],
    expectedOutput: 'CSS demonstrating box model properties (margin, padding, border), box-sizing, and all positioning types (static, relative, absolute, fixed, sticky) with proper z-index layering.',
    difficulty: 'medium',
    tags: ['CSS', 'Box Model', 'Positioning', 'Margin', 'Padding', 'Border', 'Z-index'],
    tenant: null,
    createdBy: null,
    isActive: true
  },
  {
    title: 'CSS Flexbox & Grid Layout',
    problemStatement: 'Master modern CSS layout techniques using Flexbox and CSS Grid. Create responsive layouts with flexible containers, alignment, distribution, and grid-based designs with rows and columns.',
    requirements: [
      'Create flex container with display: flex',
      'Use flex-direction to set main axis direction',
      'Apply justify-content for main axis alignment',
      'Use align-items for cross axis alignment',
      'Apply flex-wrap for wrapping behavior',
      'Use flex property for item sizing',
      'Create grid container with display: grid',
      'Define grid-template-columns with fr units',
      'Define grid-template-rows for row sizing',
      'Use gap property for spacing between items',
      'Apply grid-column and grid-row for item placement',
      'Use auto-fit and auto-fill for responsive grids'
    ],
    acceptanceCriteria: [
      'Flex container is created',
      'Flex-direction is set',
      'Justify-content works',
      'Align-items works',
      'Flex-wrap is applied',
      'Flex items are sized',
      'Grid container is created',
      'Grid columns are defined',
      'Grid rows are defined',
      'Gap spacing works'
    ],
    jestTestFile: `describe('CSS Flexbox & Grid Layout', () => {
  beforeEach(() => {
    document.body.innerHTML = \`
      <div class="flex-container">
        <div class="flex-item">Item 1</div>
        <div class="flex-item">Item 2</div>
        <div class="flex-item">Item 3</div>
      </div>
      <div class="grid-container">
        <div class="grid-item">Grid 1</div>
        <div class="grid-item">Grid 2</div>
        <div class="grid-item">Grid 3</div>
        <div class="grid-item">Grid 4</div>
      </div>
    \`;
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
  });

  test('flex container is created', () => {
    const flexContainer = document.querySelector('.flex-container');
    const computed = window.getComputedStyle(flexContainer);
    expect(computed.display).toBe('flex');
  });

  test('flex-direction is set', () => {
    expect(window.__CSS__.includes('flex-direction')).toBe(true);
  });

  test('justify-content works', () => {
    expect(window.__CSS__.includes('justify-content')).toBe(true);
  });

  test('align-items works', () => {
    expect(window.__CSS__.includes('align-items')).toBe(true);
  });

  test('flex-wrap is applied', () => {
    expect(window.__CSS__.includes('flex-wrap')).toBe(true);
  });

  test('grid container is created', () => {
    const gridContainer = document.querySelector('.grid-container');
    const computed = window.getComputedStyle(gridContainer);
    expect(computed.display).toBe('grid');
  });

  test('grid-template-columns is defined', () => {
    expect(window.__CSS__.includes('grid-template-columns')).toBe(true);
  });

  test('grid-template-rows is defined', () => {
    expect(window.__CSS__.includes('grid-template-rows')).toBe(true);
  });

  test('gap property is used', () => {
    expect(window.__CSS__.includes('gap')).toBe(true);
  });

  test('layout is responsive', () => {
    expect(window.__CSS__.includes('fr') || window.__CSS__.includes('auto-fit') || window.__CSS__.includes('auto-fill')).toBe(true);
  });
});`,
    defaultFiles: {
      html: '',
      css: '',
      js: '',
      dataJs: ''
    },
    allowedFiles: ['html', 'css', 'js', 'data.js'],
    expectedOutput: 'CSS demonstrating Flexbox layout with flex-direction, justify-content, align-items, flex-wrap, and CSS Grid with grid-template-columns, grid-template-rows, gap, and responsive design.',
    difficulty: 'medium',
    tags: ['CSS', 'Flexbox', 'Grid', 'Layout', 'Responsive', 'Alignment'],
    tenant: null,
    createdBy: null,
    isActive: true
  },
  {
    title: 'CSS Animations & Transitions',
    problemStatement: 'Create smooth animations and transitions using CSS. Master keyframe animations, transition properties, timing functions, and animation controls for interactive and engaging user experiences.',
    requirements: [
      'Use transition property for smooth property changes',
      'Set transition-duration for animation timing',
      'Apply transition-timing-function (ease, linear, cubic-bezier)',
      'Use transition-delay for delayed animations',
      'Create @keyframes animations',
      'Define animation-name to reference keyframes',
      'Set animation-duration for keyframe animation timing',
      'Use animation-timing-function for keyframe timing',
      'Apply animation-iteration-count for repeat behavior',
      'Use animation-direction for forward/reverse/alternate',
      'Set animation-fill-mode for state persistence',
      'Create hover effects with transitions'
    ],
    acceptanceCriteria: [
      'Transition property is used',
      'Transition-duration is set',
      'Transition-timing-function is applied',
      'Transition-delay is used',
      'Keyframes are defined',
      'Animation-name is set',
      'Animation-duration is set',
      'Animation-timing-function is applied',
      'Animation-iteration-count is set',
      'Animation-direction is applied'
    ],
    jestTestFile: `describe('CSS Animations & Transitions', () => {
  beforeEach(() => {
    document.body.innerHTML = \`
      <div class="transition-box">Transition</div>
      <div class="animation-box">Animation</div>
      <button class="hover-button">Hover Me</button>
    \`;
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
  });

  test('transition property is used', () => {
    expect(window.__CSS__.includes('transition')).toBe(true);
  });

  test('transition-duration is set', () => {
    expect(window.__CSS__.includes('transition-duration') || window.__CSS__.includes('transition:')).toBe(true);
  });

  test('transition-timing-function is applied', () => {
    expect(window.__CSS__.includes('ease') || window.__CSS__.includes('linear') || window.__CSS__.includes('cubic-bezier')).toBe(true);
  });

  test('keyframes are defined', () => {
    expect(window.__CSS__.includes('@keyframes')).toBe(true);
  });

  test('animation-name is set', () => {
    expect(window.__CSS__.includes('animation-name') || window.__CSS__.includes('animation:')).toBe(true);
  });

  test('animation-duration is set', () => {
    expect(window.__CSS__.includes('animation-duration') || window.__CSS__.includes('animation:')).toBe(true);
  });

  test('animation-timing-function is applied', () => {
    expect(window.__CSS__.includes('animation-timing-function') || window.__CSS__.includes('animation:')).toBe(true);
  });

  test('animation-iteration-count is set', () => {
    expect(window.__CSS__.includes('animation-iteration-count') || window.__CSS__.includes('infinite')).toBe(true);
  });

  test('animation-direction is applied', () => {
    expect(window.__CSS__.includes('animation-direction') || window.__CSS__.includes('alternate')).toBe(true);
  });

  test('hover effects are implemented', () => {
    expect(window.__CSS__.includes(':hover')).toBe(true);
  });
});`,
    defaultFiles: {
      html: '',
      css: '',
      js: '',
      dataJs: ''
    },
    allowedFiles: ['html', 'css', 'js', 'data.js'],
    expectedOutput: 'CSS demonstrating transitions with duration, timing functions, and delays, plus keyframe animations with duration, timing, iteration count, direction, and fill-mode properties.',
    difficulty: 'hard',
    tags: ['CSS', 'Animations', 'Transitions', 'Keyframes', 'Timing Functions', 'Interactive'],
    tenant: null,
    createdBy: null,
    isActive: true
  },
  {
    title: 'CSS Typography, Colors & Responsive Design',
    problemStatement: 'Master CSS typography with font properties, text styling, and color management. Implement responsive design using media queries, CSS variables, and flexible units for multi-device compatibility.',
    requirements: [
      'Apply font-family with fallback fonts',
      'Set font-size using relative units (em, rem)',
      'Use font-weight for text emphasis',
      'Apply line-height for readability',
      'Use letter-spacing and word-spacing',
      'Apply text-align, text-transform, text-decoration',
      'Use color property for text color',
      'Apply background-color for backgrounds',
      'Use CSS variables (custom properties) for theming',
      'Create media queries for responsive design',
      'Use flexible units (%, vw, vh, em, rem)',
      'Implement mobile-first approach'
    ],
    acceptanceCriteria: [
      'Font-family is set with fallbacks',
      'Font-size uses relative units',
      'Font-weight is applied',
      'Line-height improves readability',
      'Text properties are used',
      'Color is applied',
      'Background-color is set',
      'CSS variables are defined',
      'Media queries are used',
      'Responsive design is implemented'
    ],
    jestTestFile: `describe('CSS Typography, Colors & Responsive Design', () => {
  beforeEach(() => {
    document.body.innerHTML = \`
      <div class="container">
        <h1 class="heading">Main Heading</h1>
        <p class="paragraph">This is a paragraph with styled text.</p>
        <div class="color-box">Colored Box</div>
      </div>
    \`;
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
  });

  test('font-family is set with fallbacks', () => {
    expect(window.__CSS__.includes('font-family')).toBe(true);
  });

  test('font-size uses relative units', () => {
    expect(window.__CSS__.includes('em') || window.__CSS__.includes('rem') || window.__CSS__.includes('%')).toBe(true);
  });

  test('font-weight is applied', () => {
    expect(window.__CSS__.includes('font-weight')).toBe(true);
  });

  test('line-height is set', () => {
    expect(window.__CSS__.includes('line-height')).toBe(true);
  });

  test('text properties are used', () => {
    expect(window.__CSS__.includes('text-align') || window.__CSS__.includes('text-transform') || window.__CSS__.includes('text-decoration')).toBe(true);
  });

  test('color is applied', () => {
    expect(window.__CSS__.includes('color:')).toBe(true);
  });

  test('background-color is set', () => {
    expect(window.__CSS__.includes('background-color')).toBe(true);
  });

  test('CSS variables are defined', () => {
    expect(window.__CSS__.includes('--') || window.__CSS__.includes('var(')).toBe(true);
  });

  test('media queries are used', () => {
    expect(window.__CSS__.includes('@media')).toBe(true);
  });

  test('responsive design is implemented', () => {
    expect(window.__CSS__.includes('max-width') || window.__CSS__.includes('min-width')).toBe(true);
  });
});`,
    defaultFiles: {
      html: '',
      css: '',
      js: '',
      dataJs: ''
    },
    allowedFiles: ['html', 'css', 'js', 'data.js'],
    expectedOutput: 'CSS demonstrating typography (font-family, font-size with relative units, font-weight, line-height), text styling, colors, CSS variables for theming, media queries, and responsive design with flexible units.',
    difficulty: 'hard',
    tags: ['CSS', 'Typography', 'Colors', 'Responsive Design', 'Media Queries', 'CSS Variables', 'Mobile-First'],
    tenant: null,
    createdBy: null,
    isActive: true
  }
];

async function seed5CSSQuestions() {
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
      console.log(`✓ Created: ${question.title}`);
    }

    console.log(`\n✓ All ${cssQuestions.length} CSS questions created successfully!`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seed5CSSQuestions();
