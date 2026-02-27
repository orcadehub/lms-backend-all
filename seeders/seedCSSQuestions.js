require('dotenv').config();
const mongoose = require('mongoose');
const FrontendQuestion = require('../models/FrontendQuestion');
const Tenant = require('../models/Tenant');
const Instructor = require('../models/Instructor');

const questions = [
  {
    title: 'CSS Selectors and Specificity Basics',
    problemStatement: 'Style elements using class, id, and descendant selectors with clear priority rules.',
    requirements: [
      "Set .card background-color to #f5f7ff",
      "Set #main-title color to #6a0dad",
      "Set .card p font-size to 16px",
      "Set .badge color to white",
      "Set .badge background-color to #16a34a",
      "Set button.cta border-radius to 8px",
      "Set button.cta padding to 10px 16px"
    ],
    acceptanceCriteria: [
      'Class selector is applied correctly',
      'ID selector is applied correctly',
      'Descendant selector applies to paragraph inside card',
      'Badge text and background are styled',
      'CTA button has proper shape and spacing',
      'Styles are readable and consistent',
      'No inline styles required'
    ],
    jestTestFile: `describe('CSS Selectors and Specificity Basics', () => {
  beforeEach(() => {
    document.body.innerHTML = \`
      <div class="card">
        <h1 id="main-title">Dashboard</h1>
        <p>Learning summary</p>
        <span class="badge">Active</span>
        <button class="cta">Start</button>
      </div>
    \`;
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
  });

  test('card background color applied', () => {
    const card = document.querySelector('.card');
    const bg = window.getComputedStyle(card).backgroundColor;
    expect(bg).toBe('rgb(245, 247, 255)');
  });

  test('main title color applied', () => {
    const title = document.getElementById('main-title');
    const color = window.getComputedStyle(title).color;
    expect(color).toBe('rgb(106, 13, 173)');
  });

  test('card paragraph font size applied', () => {
    const p = document.querySelector('.card p');
    const size = window.getComputedStyle(p).fontSize;
    expect(size).toBe('16px');
  });

  test('badge text color is white', () => {
    const badge = document.querySelector('.badge');
    const color = window.getComputedStyle(badge).color;
    expect(color).toBe('rgb(255, 255, 255)');
  });

  test('badge background color applied', () => {
    const badge = document.querySelector('.badge');
    const bg = window.getComputedStyle(badge).backgroundColor;
    expect(bg).toBe('rgb(22, 163, 74)');
  });

  test('cta button border radius applied', () => {
    const btn = document.querySelector('button.cta');
    const radius = window.getComputedStyle(btn).borderRadius;
    expect(radius).toBe('8px');
  });

  test('cta button horizontal padding applied', () => {
    const btn = document.querySelector('button.cta');
    const rightPad = window.getComputedStyle(btn).paddingRight;
    expect(rightPad).toBe('16px');
  });
});`,
    defaultFiles: {
      html: '<!-- HTML is fixed for this question. Write CSS only. -->',
      css: '/* Write your CSS here */\n',
      js: ''
    },
    allowedFiles: ['css'],
    difficulty: 'easy',
    tags: ['CSS', 'Selectors', 'Specificity', 'CSS_TOPIC_PACK_V1']
  },
  {
    title: 'CSS Box Model and Spacing',
    problemStatement: 'Apply margin, padding, border, and sizing to create a clean content box.',
    requirements: [
      "Set .panel width to 320px",
      "Set .panel padding to 24px",
      "Set .panel border to 2px solid #6a0dad",
      "Set .panel margin-top to 20px",
      "Set .panel box-sizing to border-box",
      "Set .panel border-radius to 12px",
      "Set .panel background-color to #ffffff"
    ],
    acceptanceCriteria: [
      'Width is fixed correctly',
      'Padding is applied on all sides',
      'Border style and color are correct',
      'Top margin separates panel from top content',
      'Box sizing prevents overflow',
      'Rounded corners are visible',
      'Background remains clean'
    ],
    jestTestFile: `describe('CSS Box Model and Spacing', () => {
  beforeEach(() => {
    document.body.innerHTML = '<section class="panel">Panel content</section>';
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
  });

  test('panel width is 320px', () => {
    const panel = document.querySelector('.panel');
    expect(window.getComputedStyle(panel).width).toBe('320px');
  });

  test('panel padding top is 24px', () => {
    const panel = document.querySelector('.panel');
    expect(window.getComputedStyle(panel).paddingTop).toBe('24px');
  });

  test('panel border width is 2px', () => {
    const panel = document.querySelector('.panel');
    expect(window.getComputedStyle(panel).borderTopWidth).toBe('2px');
  });

  test('panel border color is #6a0dad', () => {
    const panel = document.querySelector('.panel');
    expect(window.getComputedStyle(panel).borderTopColor).toBe('rgb(106, 13, 173)');
  });

  test('panel margin top is 20px', () => {
    const panel = document.querySelector('.panel');
    expect(window.getComputedStyle(panel).marginTop).toBe('20px');
  });

  test('panel uses border-box sizing', () => {
    const panel = document.querySelector('.panel');
    expect(window.getComputedStyle(panel).boxSizing).toBe('border-box');
  });

  test('panel border radius is 12px', () => {
    const panel = document.querySelector('.panel');
    expect(window.getComputedStyle(panel).borderRadius).toBe('12px');
  });
});`,
    defaultFiles: {
      html: '<!-- HTML is fixed for this question. Write CSS only. -->',
      css: '/* Write your CSS here */\n',
      js: ''
    },
    allowedFiles: ['css'],
    difficulty: 'easy',
    tags: ['CSS', 'Box Model', 'Spacing', 'CSS_TOPIC_PACK_V1']
  },
  {
    title: 'CSS Flexbox Navigation Layout',
    problemStatement: 'Use flexbox to align a logo, menu links, and actions in one row.',
    requirements: [
      'Set .navbar display to flex',
      'Set .navbar justify-content to space-between',
      'Set .navbar align-items to center',
      'Set .menu display to flex',
      'Set .menu gap to 16px',
      'Set .actions display to flex',
      'Set .actions gap to 12px'
    ],
    acceptanceCriteria: [
      'Navbar uses flex container behavior',
      'Main sections spread horizontally',
      'Vertical alignment is centered',
      'Menu links are in one row',
      'Menu spacing is consistent',
      'Action buttons are in one row',
      'Action spacing is consistent'
    ],
    jestTestFile: `describe('CSS Flexbox Navigation Layout', () => {
  beforeEach(() => {
    document.body.innerHTML = \`
      <header class="navbar">
        <div class="logo">Brand</div>
        <nav class="menu"><a>Home</a><a>Courses</a><a>Pricing</a></nav>
        <div class="actions"><button>Login</button><button>Signup</button></div>
      </header>
    \`;
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
  });

  test('navbar uses flex', () => {
    const nav = document.querySelector('.navbar');
    expect(window.getComputedStyle(nav).display).toBe('flex');
  });

  test('navbar uses space-between', () => {
    const nav = document.querySelector('.navbar');
    expect(window.getComputedStyle(nav).justifyContent).toBe('space-between');
  });

  test('navbar aligns center', () => {
    const nav = document.querySelector('.navbar');
    expect(window.getComputedStyle(nav).alignItems).toBe('center');
  });

  test('menu uses flex', () => {
    const menu = document.querySelector('.menu');
    expect(window.getComputedStyle(menu).display).toBe('flex');
  });

  test('menu gap is 16px', () => {
    const menu = document.querySelector('.menu');
    expect(window.getComputedStyle(menu).gap).toBe('16px');
  });

  test('actions uses flex', () => {
    const actions = document.querySelector('.actions');
    expect(window.getComputedStyle(actions).display).toBe('flex');
  });

  test('actions gap is 12px', () => {
    const actions = document.querySelector('.actions');
    expect(window.getComputedStyle(actions).gap).toBe('12px');
  });
});`,
    defaultFiles: {
      html: '<!-- HTML is fixed for this question. Write CSS only. -->',
      css: '/* Write your CSS here */\n',
      js: ''
    },
    allowedFiles: ['css'],
    difficulty: 'medium',
    tags: ['CSS', 'Flexbox', 'Layout', 'CSS_TOPIC_PACK_V1']
  },
  {
    title: 'CSS Grid Dashboard Cards',
    problemStatement: 'Build a 3-column dashboard card layout using CSS Grid.',
    requirements: [
      'Set .dashboard display to grid',
      'Set grid-template-columns to repeat(3, 1fr)',
      'Set gap to 20px',
      'Set .card padding to 16px',
      'Set .card border-radius to 10px',
      'Set .card background-color to #ffffff',
      'Set .card border to 1px solid #e5e7eb'
    ],
    acceptanceCriteria: [
      'Grid container is defined',
      'Three equal columns are configured',
      'Card spacing is present',
      'Card padding is applied',
      'Card corners are rounded',
      'Card surface color is white',
      'Card border is subtle and visible'
    ],
    jestTestFile: `describe('CSS Grid Dashboard Cards', () => {
  beforeEach(() => {
    document.body.innerHTML = \`
      <section class="dashboard">
        <article class="card">A</article>
        <article class="card">B</article>
        <article class="card">C</article>
      </section>
    \`;
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
  });

  test('dashboard uses grid', () => {
    const el = document.querySelector('.dashboard');
    expect(window.getComputedStyle(el).display).toBe('grid');
  });

  test('dashboard has 3 columns', () => {
    const el = document.querySelector('.dashboard');
    expect(window.getComputedStyle(el).gridTemplateColumns).toBe('repeat(3, 1fr)');
  });

  test('dashboard gap is 20px', () => {
    const el = document.querySelector('.dashboard');
    expect(window.getComputedStyle(el).gap).toBe('20px');
  });

  test('card padding is 16px', () => {
    const card = document.querySelector('.card');
    expect(window.getComputedStyle(card).paddingTop).toBe('16px');
  });

  test('card border radius is 10px', () => {
    const card = document.querySelector('.card');
    expect(window.getComputedStyle(card).borderRadius).toBe('10px');
  });

  test('card background color is white', () => {
    const card = document.querySelector('.card');
    expect(window.getComputedStyle(card).backgroundColor).toBe('rgb(255, 255, 255)');
  });

  test('card border width is 1px', () => {
    const card = document.querySelector('.card');
    expect(window.getComputedStyle(card).borderTopWidth).toBe('1px');
  });
});`,
    defaultFiles: {
      html: '<!-- HTML is fixed for this question. Write CSS only. -->',
      css: '/* Write your CSS here */\n',
      js: ''
    },
    allowedFiles: ['css'],
    difficulty: 'medium',
    tags: ['CSS', 'Grid', 'Dashboard', 'CSS_TOPIC_PACK_V1']
  },
  {
    title: 'CSS Positioning and Z-Index',
    problemStatement: 'Use relative and absolute positioning to place badge over a card image.',
    requirements: [
      'Set .image-wrap position to relative',
      'Set .badge position to absolute',
      'Set .badge top to 12px',
      'Set .badge right to 12px',
      'Set .badge z-index to 10',
      'Set .badge background-color to #6a0dad',
      'Set .badge color to #ffffff'
    ],
    acceptanceCriteria: [
      'Parent container is relative',
      'Badge is absolutely positioned',
      'Top offset is correct',
      'Right offset is correct',
      'Badge appears above image',
      'Badge has brand background',
      'Badge text is readable'
    ],
    jestTestFile: `describe('CSS Positioning and Z-Index', () => {
  beforeEach(() => {
    document.body.innerHTML = \`
      <div class="image-wrap">
        <img src="x.jpg" alt="x" />
        <span class="badge">New</span>
      </div>
    \`;
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
  });

  test('image-wrap is relative', () => {
    const el = document.querySelector('.image-wrap');
    expect(window.getComputedStyle(el).position).toBe('relative');
  });

  test('badge is absolute', () => {
    const badge = document.querySelector('.badge');
    expect(window.getComputedStyle(badge).position).toBe('absolute');
  });

  test('badge top is 12px', () => {
    const badge = document.querySelector('.badge');
    expect(window.getComputedStyle(badge).top).toBe('12px');
  });

  test('badge right is 12px', () => {
    const badge = document.querySelector('.badge');
    expect(window.getComputedStyle(badge).right).toBe('12px');
  });

  test('badge z-index is 10', () => {
    const badge = document.querySelector('.badge');
    expect(window.getComputedStyle(badge).zIndex).toBe('10');
  });

  test('badge background is brand purple', () => {
    const badge = document.querySelector('.badge');
    expect(window.getComputedStyle(badge).backgroundColor).toBe('rgb(106, 13, 173)');
  });

  test('badge text is white', () => {
    const badge = document.querySelector('.badge');
    expect(window.getComputedStyle(badge).color).toBe('rgb(255, 255, 255)');
  });
});`,
    defaultFiles: {
      html: '<!-- HTML is fixed for this question. Write CSS only. -->',
      css: '/* Write your CSS here */\n',
      js: ''
    },
    allowedFiles: ['css'],
    difficulty: 'medium',
    tags: ['CSS', 'Positioning', 'Z-Index', 'CSS_TOPIC_PACK_V1']
  },
  {
    title: 'CSS Typography and Text Styling',
    problemStatement: 'Create readable typography with hierarchy for heading and body text.',
    requirements: [
      'Set body font-family to Arial, sans-serif',
      'Set h1 font-size to 36px',
      'Set h1 font-weight to 700',
      'Set p line-height to 1.8',
      'Set p color to #334155',
      'Set p text-align to justify',
      'Set .caption letter-spacing to 1px'
    ],
    acceptanceCriteria: [
      'Base font family is consistent',
      'Heading hierarchy is clear',
      'Heading weight is strong',
      'Paragraph readability is improved',
      'Paragraph color has proper contrast',
      'Text alignment follows requirement',
      'Caption spacing is applied'
    ],
    jestTestFile: `describe('CSS Typography and Text Styling', () => {
  beforeEach(() => {
    document.body.innerHTML = \`
      <h1>Platform Overview</h1>
      <p>Learning content paragraph for reading experience.</p>
      <span class="caption">UPDATED</span>
    \`;
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
  });

  test('body font-family includes Arial', () => {
    const family = window.getComputedStyle(document.body).fontFamily;
    expect(family.includes('Arial')).toBe(true);
  });

  test('h1 font-size is 36px', () => {
    const h1 = document.querySelector('h1');
    expect(window.getComputedStyle(h1).fontSize).toBe('36px');
  });

  test('h1 font-weight is 700', () => {
    const h1 = document.querySelector('h1');
    expect(window.getComputedStyle(h1).fontWeight).toBe('700');
  });

  test('paragraph line-height is 1.8', () => {
    const p = document.querySelector('p');
    expect(window.getComputedStyle(p).lineHeight).toBe('1.8');
  });

  test('paragraph color is #334155', () => {
    const p = document.querySelector('p');
    expect(window.getComputedStyle(p).color).toBe('rgb(51, 65, 85)');
  });

  test('paragraph text align is justify', () => {
    const p = document.querySelector('p');
    expect(window.getComputedStyle(p).textAlign).toBe('justify');
  });

  test('caption letter spacing is 1px', () => {
    const cap = document.querySelector('.caption');
    expect(window.getComputedStyle(cap).letterSpacing).toBe('1px');
  });
});`,
    defaultFiles: {
      html: '<!-- HTML is fixed for this question. Write CSS only. -->',
      css: '/* Write your CSS here */\n',
      js: ''
    },
    allowedFiles: ['css'],
    difficulty: 'easy',
    tags: ['CSS', 'Typography', 'Text', 'CSS_TOPIC_PACK_V1']
  },
  {
    title: 'CSS Pseudo Classes and Pseudo Elements',
    problemStatement: 'Style links with :hover and create decorative content using ::before and ::after.',
    requirements: [
      'Set a.cta color to #6a0dad',
      'Set a.cta text-decoration to none',
      'Add a.cta:hover color #570b8c',
      'Create .title::before content "["',
      'Create .title::after content "]"',
      'Set .title::before color to #16a34a',
      'Set .title::after color to #16a34a'
    ],
    acceptanceCriteria: [
      'CTA link base style is applied',
      'Underline removed from base state',
      'Hover selector is present',
      'Before pseudo-element content exists',
      'After pseudo-element content exists',
      'Before pseudo-element color is set',
      'After pseudo-element color is set'
    ],
    jestTestFile: `describe('CSS Pseudo Classes and Pseudo Elements', () => {
  beforeEach(() => {
    document.body.innerHTML = \`
      <h2 class="title">Modules</h2>
      <a class="cta" href="#">Open</a>
    \`;
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
  });

  test('cta base color applied', () => {
    const cta = document.querySelector('a.cta');
    expect(window.getComputedStyle(cta).color).toBe('rgb(106, 13, 173)');
  });

  test('cta underline removed', () => {
    const cta = document.querySelector('a.cta');
    expect(window.getComputedStyle(cta).textDecorationLine).toBe('none');
  });

  test('hover rule exists in css text', () => {
    expect(window.__CSS__.includes('a.cta:hover')).toBe(true);
  });

  test('title before content rule exists', () => {
    expect(window.__CSS__.includes('.title::before')).toBe(true);
  });

  test('title after content rule exists', () => {
    expect(window.__CSS__.includes('.title::after')).toBe(true);
  });

  test('before content includes bracket', () => {
    expect(window.__CSS__.includes('content: "["')).toBe(true);
  });

  test('after content includes bracket', () => {
    expect(window.__CSS__.includes('content: "]"')).toBe(true);
  });
});`,
    defaultFiles: {
      html: '<!-- HTML is fixed for this question. Write CSS only. -->',
      css: '/* Write your CSS here */\n',
      js: ''
    },
    allowedFiles: ['css'],
    difficulty: 'medium',
    tags: ['CSS', 'Pseudo Classes', 'Pseudo Elements', 'CSS_TOPIC_PACK_V1']
  },
  {
    title: 'CSS Transitions and Hover Effects',
    problemStatement: 'Add smooth hover transitions and transform effects to a button card.',
    requirements: [
      'Set .action-btn transition to all 0.3s ease',
      'Set .action-btn background-color to #6a0dad',
      'Set .action-btn color to #ffffff',
      'Set .action-btn:hover background-color to #570b8c',
      'Set .action-btn:hover transform to translateY(-2px)',
      'Set .card transition to all 0.3s ease',
      'Set .card:hover box-shadow to stronger depth'
    ],
    acceptanceCriteria: [
      'Button has transition defined',
      'Button base colors are set',
      'Hover selector for button exists',
      'Hover transform is configured',
      'Card transition is defined',
      'Card hover state exists',
      'Interaction feels smooth'
    ],
    jestTestFile: `describe('CSS Transitions and Hover Effects', () => {
  beforeEach(() => {
    document.body.innerHTML = \`
      <div class="card"><button class="action-btn">Save</button></div>
    \`;
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
  });

  test('button transition exists', () => {
    const btn = document.querySelector('.action-btn');
    expect(window.getComputedStyle(btn).transitionProperty.includes('all')).toBe(true);
  });

  test('button base background color', () => {
    const btn = document.querySelector('.action-btn');
    expect(window.getComputedStyle(btn).backgroundColor).toBe('rgb(106, 13, 173)');
  });

  test('button base text color', () => {
    const btn = document.querySelector('.action-btn');
    expect(window.getComputedStyle(btn).color).toBe('rgb(255, 255, 255)');
  });

  test('button hover selector is present', () => {
    expect(window.__CSS__.includes('.action-btn:hover')).toBe(true);
  });

  test('button hover transform is configured', () => {
    expect(window.__CSS__.includes('translateY(-2px)')).toBe(true);
  });

  test('card transition exists', () => {
    const card = document.querySelector('.card');
    expect(window.getComputedStyle(card).transitionProperty.includes('all')).toBe(true);
  });

  test('card hover rule exists', () => {
    expect(window.__CSS__.includes('.card:hover')).toBe(true);
  });
});`,
    defaultFiles: {
      html: '<!-- HTML is fixed for this question. Write CSS only. -->',
      css: '/* Write your CSS here */\n',
      js: ''
    },
    allowedFiles: ['css'],
    difficulty: 'medium',
    tags: ['CSS', 'Transitions', 'Hover', 'CSS_TOPIC_PACK_V1']
  },
  {
    title: 'CSS Keyframe Animation Loader',
    problemStatement: 'Create a rotating loader animation using keyframes and animation properties.',
    requirements: [
      'Set .loader width and height to 48px',
      'Set .loader border to 4px solid #e5e7eb',
      'Set .loader border-top-color to #6a0dad',
      'Set .loader border-radius to 50%',
      'Define @keyframes spin from 0deg to 360deg',
      'Set .loader animation name to spin',
      'Set animation duration to 1s and iteration-count to infinite'
    ],
    acceptanceCriteria: [
      'Loader size is correct',
      'Base border style is visible',
      'Top border color creates spinner effect',
      'Circle shape is applied',
      'Spin keyframes are declared',
      'Animation is attached to loader',
      'Animation repeats infinitely'
    ],
    jestTestFile: `describe('CSS Keyframe Animation Loader', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div class="loader"></div>';
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
  });

  test('loader width is 48px', () => {
    const loader = document.querySelector('.loader');
    expect(window.getComputedStyle(loader).width).toBe('48px');
  });

  test('loader height is 48px', () => {
    const loader = document.querySelector('.loader');
    expect(window.getComputedStyle(loader).height).toBe('48px');
  });

  test('loader border top width is 4px', () => {
    const loader = document.querySelector('.loader');
    expect(window.getComputedStyle(loader).borderTopWidth).toBe('4px');
  });

  test('loader top border color is brand purple', () => {
    const loader = document.querySelector('.loader');
    expect(window.getComputedStyle(loader).borderTopColor).toBe('rgb(106, 13, 173)');
  });

  test('loader is circular', () => {
    const loader = document.querySelector('.loader');
    expect(window.getComputedStyle(loader).borderRadius).toBe('50%');
  });

  test('keyframes spin exists in CSS text', () => {
    expect(window.__CSS__.includes('@keyframes spin')).toBe(true);
  });

  test('animation uses infinite iteration', () => {
    const loader = document.querySelector('.loader');
    expect(window.getComputedStyle(loader).animationIterationCount).toBe('infinite');
  });
});`,
    defaultFiles: {
      html: '<!-- HTML is fixed for this question. Write CSS only. -->',
      css: '/* Write your CSS here */\n',
      js: ''
    },
    allowedFiles: ['css'],
    difficulty: 'medium',
    tags: ['CSS', 'Animation', 'Keyframes', 'CSS_TOPIC_PACK_V1']
  },
  {
    title: 'Responsive CSS with Media Queries and Variables',
    problemStatement: 'Use CSS variables and media queries to adapt card layout and spacing.',
    requirements: [
      'Define :root variable --brand as #6a0dad',
      'Set .card border-color using var(--brand)',
      'Set .layout display to grid',
      'Set .layout grid-template-columns to repeat(3, 1fr) by default',
      'Add media query for max-width: 900px with 2 columns',
      'Add media query for max-width: 600px with 1 column',
      'Set .card padding to 20px'
    ],
    acceptanceCriteria: [
      'Root variable is defined',
      'Variable is used in component styling',
      'Base layout uses grid',
      'Desktop columns are set to 3',
      'Tablet breakpoint exists',
      'Mobile breakpoint exists',
      'Card spacing remains consistent'
    ],
    jestTestFile: `describe('Responsive CSS with Media Queries and Variables', () => {
  beforeEach(() => {
    document.body.innerHTML = \`
      <section class="layout">
        <article class="card">1</article>
        <article class="card">2</article>
        <article class="card">3</article>
      </section>
    \`;
    const style = document.createElement('style');
    style.textContent = window.__CSS__;
    document.head.appendChild(style);
  });

  test('root brand variable exists', () => {
    expect(window.__CSS__.includes('--brand')).toBe(true);
  });

  test('card uses var brand color', () => {
    expect(window.__CSS__.includes('var(--brand)')).toBe(true);
  });

  test('layout uses grid', () => {
    const layout = document.querySelector('.layout');
    expect(window.getComputedStyle(layout).display).toBe('grid');
  });

  test('default layout has 3 columns', () => {
    const layout = document.querySelector('.layout');
    expect(window.getComputedStyle(layout).gridTemplateColumns).toBe('repeat(3, 1fr)');
  });

  test('has media query for 900px', () => {
    expect(window.__CSS__.includes('max-width: 900px')).toBe(true);
  });

  test('has media query for 600px', () => {
    expect(window.__CSS__.includes('max-width: 600px')).toBe(true);
  });

  test('card padding is 20px', () => {
    const card = document.querySelector('.card');
    expect(window.getComputedStyle(card).paddingTop).toBe('20px');
  });
});`,
    defaultFiles: {
      html: '<!-- HTML is fixed for this question. Write CSS only. -->',
      css: '/* Write your CSS here */\n',
      js: ''
    },
    allowedFiles: ['css'],
    difficulty: 'hard',
    tags: ['CSS', 'Responsive', 'Media Queries', 'Variables', 'CSS_TOPIC_PACK_V1']
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

    await FrontendQuestion.deleteMany({ tags: { $in: ['CSS_TOPIC_PACK_V1'] } });
    console.log('Removed existing CSS topic pack questions');

    const questionsWithRefs = questions.map((question) => ({
      ...question,
      tenant: tenant._id,
      createdBy: instructor._id
    }));

    const inserted = await FrontendQuestion.insertMany(questionsWithRefs);
    console.log(`Inserted ${inserted.length} CSS questions successfully`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding CSS questions:', error);
    process.exit(1);
  }
}

seedCSSQuestions();
