require('dotenv').config();
const mongoose = require('mongoose');
const FrontendQuestion = require('../models/FrontendQuestion');
const Tenant = require('../models/Tenant');
const Instructor = require('../models/Instructor');

const attributeQuestions = [
  // 1. Class and ID Attributes
  {
    title: "HTML Attributes - Class and ID",
    problemStatement: "Create elements using class and id attributes for identification.",
    requirements: [
      "Create a div with id='header' and class='container'",
      "Create a paragraph with class='text-primary'",
      "Create a span with id='username' and class='bold highlight'",
      "Create a div with class='footer container'"
    ],
    acceptanceCriteria: [
      "Elements have correct id attributes",
      "Elements have correct class attributes",
      "Multiple classes are properly assigned"
    ],
    jestTestFile: `describe('HTML Class and ID', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });

  test('header div exists', () => {
    const header = document.getElementById('header');
    expect(header).toBeTruthy();
    expect(header.classList.contains('container')).toBe(true);
  });

  test('paragraph with class exists', () => {
    const p = document.querySelector('.text-primary');
    expect(p).toBeTruthy();
    expect(p.tagName).toBe('P');
  });

  test('span with id and multiple classes exists', () => {
    const span = document.getElementById('username');
    expect(span).toBeTruthy();
    expect(span.classList.contains('bold')).toBe(true);
    expect(span.classList.contains('highlight')).toBe(true);
  });

  test('footer div with multiple classes exists', () => {
    const footer = document.querySelector('.footer');
    expect(footer).toBeTruthy();
    expect(footer.classList.contains('container')).toBe(true);
  });
});`,
    allowedFiles: ['html'],
    difficulty: 'easy',
    tags: ['HTML', 'Attributes', 'Class', 'ID']
  },

  // 2. Data Attributes
  {
    title: "HTML Attributes - Data Attributes",
    problemStatement: "Create elements using custom data attributes.",
    requirements: [
      "Create a div with data-user-id='123' and data-role='admin'",
      "Create a button with data-action='submit' and data-target='form1'",
      "Create a span with data-price='99.99' and data-currency='USD'"
    ],
    acceptanceCriteria: [
      "All data attributes are correctly set",
      "Data attributes follow naming convention",
      "Values are properly assigned"
    ],
    jestTestFile: `describe('HTML Data Attributes', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });

  test('div with data attributes exists', () => {
    const div = document.querySelector('[data-user-id]');
    expect(div).toBeTruthy();
    expect(div.getAttribute('data-user-id')).toBe('123');
    expect(div.getAttribute('data-role')).toBe('admin');
  });

  test('button with data attributes exists', () => {
    const button = document.querySelector('[data-action]');
    expect(button).toBeTruthy();
    expect(button.getAttribute('data-action')).toBe('submit');
    expect(button.getAttribute('data-target')).toBe('form1');
  });

  test('span with data attributes exists', () => {
    const span = document.querySelector('[data-price]');
    expect(span).toBeTruthy();
    expect(span.getAttribute('data-price')).toBe('99.99');
    expect(span.getAttribute('data-currency')).toBe('USD');
  });
});`,
    allowedFiles: ['html'],
    difficulty: 'medium',
    tags: ['HTML', 'Attributes', 'Data Attributes', 'Custom']
  },

  // 3. Title and Alt Attributes
  {
    title: "HTML Attributes - Title and Alt",
    problemStatement: "Create elements with title and alt attributes for accessibility.",
    requirements: [
      "Create an img with src='logo.png', alt='Company Logo', title='Our Brand'",
      "Create an anchor with href='#' and title='Click to learn more'",
      "Create an abbr tag with title='HyperText Markup Language' containing text 'HTML'"
    ],
    acceptanceCriteria: [
      "Image has both alt and title attributes",
      "Anchor has title attribute",
      "Abbreviation has title attribute"
    ],
    jestTestFile: `describe('HTML Title and Alt', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });

  test('image with alt and title exists', () => {
    const img = document.querySelector('img');
    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBe('logo.png');
    expect(img.getAttribute('alt')).toBe('Company Logo');
    expect(img.getAttribute('title')).toBe('Our Brand');
  });

  test('anchor with title exists', () => {
    const a = document.querySelector('a');
    expect(a).toBeTruthy();
    expect(a.getAttribute('title')).toBe('Click to learn more');
  });

  test('abbr with title exists', () => {
    const abbr = document.querySelector('abbr');
    expect(abbr).toBeTruthy();
    expect(abbr.getAttribute('title')).toBe('HyperText Markup Language');
    expect(abbr.textContent).toBe('HTML');
  });
});`,
    allowedFiles: ['html'],
    difficulty: 'easy',
    tags: ['HTML', 'Attributes', 'Title', 'Alt', 'Accessibility']
  },

  // 4. Target and Rel Attributes
  {
    title: "HTML Attributes - Target and Rel for Links",
    problemStatement: "Create links with target and rel attributes.",
    requirements: [
      "Create an anchor with href='https://example.com', target='_blank', rel='noopener noreferrer'",
      "Create an anchor with href='page.html', target='_self'",
      "Create an anchor with href='https://external.com', target='_blank', rel='nofollow'"
    ],
    acceptanceCriteria: [
      "Links have correct target attributes",
      "External links have proper rel attributes",
      "All href values are correct"
    ],
    jestTestFile: `describe('HTML Target and Rel', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });

  test('external link with noopener exists', () => {
    const links = document.querySelectorAll('a');
    const externalLink = Array.from(links).find(a => a.href.includes('example.com'));
    expect(externalLink).toBeTruthy();
    expect(externalLink.getAttribute('target')).toBe('_blank');
    expect(externalLink.getAttribute('rel')).toBe('noopener noreferrer');
  });

  test('internal link with target self exists', () => {
    const links = document.querySelectorAll('a');
    const internalLink = Array.from(links).find(a => a.getAttribute('href') === 'page.html');
    expect(internalLink).toBeTruthy();
    expect(internalLink.getAttribute('target')).toBe('_self');
  });

  test('external link with nofollow exists', () => {
    const links = document.querySelectorAll('a');
    const nofollowLink = Array.from(links).find(a => a.href.includes('external.com'));
    expect(nofollowLink).toBeTruthy();
    expect(nofollowLink.getAttribute('target')).toBe('_blank');
    expect(nofollowLink.getAttribute('rel')).toBe('nofollow');
  });
});`,
    allowedFiles: ['html'],
    difficulty: 'medium',
    tags: ['HTML', 'Attributes', 'Target', 'Rel', 'Links']
  },

  // 5. Style and Hidden Attributes
  {
    title: "HTML Attributes - Style and Hidden",
    problemStatement: "Create elements using inline style and hidden attributes.",
    requirements: [
      "Create a div with style='color: red; font-size: 20px;'",
      "Create a paragraph with style='background-color: yellow;'",
      "Create a span with hidden attribute",
      "Create a div with style='display: none;'"
    ],
    acceptanceCriteria: [
      "Elements have correct inline styles",
      "Hidden attribute is properly set",
      "Style values are correct"
    ],
    jestTestFile: `describe('HTML Style and Hidden', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });

  test('div with style exists', () => {
    const divs = document.querySelectorAll('div');
    const styledDiv = Array.from(divs).find(d => d.style.color === 'red');
    expect(styledDiv).toBeTruthy();
    expect(styledDiv.style.fontSize).toBe('20px');
  });

  test('paragraph with background color exists', () => {
    const p = document.querySelector('p');
    expect(p).toBeTruthy();
    expect(p.style.backgroundColor).toBe('yellow');
  });

  test('span with hidden attribute exists', () => {
    const span = document.querySelector('span');
    expect(span).toBeTruthy();
    expect(span.hasAttribute('hidden')).toBe(true);
  });

  test('div with display none exists', () => {
    const divs = document.querySelectorAll('div');
    const hiddenDiv = Array.from(divs).find(d => d.style.display === 'none');
    expect(hiddenDiv).toBeTruthy();
  });
});`,
    allowedFiles: ['html'],
    difficulty: 'easy',
    tags: ['HTML', 'Attributes', 'Style', 'Hidden', 'Inline']
  },

  // 6. Aria and Accessibility Attributes
  {
    title: "HTML Attributes - ARIA and Accessibility",
    problemStatement: "Create accessible elements using ARIA attributes.",
    requirements: [
      "Create a button with aria-label='Close dialog'",
      "Create a div with role='alert' and aria-live='polite'",
      "Create an input with aria-required='true' and aria-describedby='help-text'",
      "Create a span with id='help-text' containing 'Enter your name'"
    ],
    acceptanceCriteria: [
      "ARIA attributes are correctly set",
      "Role attribute is properly used",
      "Aria-describedby references correct element"
    ],
    jestTestFile: `describe('HTML ARIA Attributes', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });

  test('button with aria-label exists', () => {
    const button = document.querySelector('button');
    expect(button).toBeTruthy();
    expect(button.getAttribute('aria-label')).toBe('Close dialog');
  });

  test('div with role and aria-live exists', () => {
    const div = document.querySelector('[role="alert"]');
    expect(div).toBeTruthy();
    expect(div.getAttribute('aria-live')).toBe('polite');
  });

  test('input with aria attributes exists', () => {
    const input = document.querySelector('input');
    expect(input).toBeTruthy();
    expect(input.getAttribute('aria-required')).toBe('true');
    expect(input.getAttribute('aria-describedby')).toBe('help-text');
  });

  test('help text span exists', () => {
    const helpText = document.getElementById('help-text');
    expect(helpText).toBeTruthy();
    expect(helpText.textContent).toBe('Enter your name');
  });
});`,
    allowedFiles: ['html'],
    difficulty: 'medium',
    tags: ['HTML', 'Attributes', 'ARIA', 'Accessibility', 'A11y']
  }
];

async function seedAttributeQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const tenant = await Tenant.findOne();
    const instructor = await Instructor.findOne();

    if (!tenant || !instructor) {
      console.error('Tenant or Instructor not found');
      process.exit(1);
    }

    for (const questionData of attributeQuestions) {
      const question = await FrontendQuestion.create({
        ...questionData,
        defaultFiles: {
          html: `<!DOCTYPE html>
<html>
<head>
  <title>${questionData.title}</title>
</head>
<body>
  <!-- Create your elements with attributes here -->
</body>
</html>`,
          css: '',
          js: ''
        },
        tenant: tenant._id,
        createdBy: instructor._id
      });
      console.log('Created:', question.title);
    }

    console.log('\nAll attribute questions created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedAttributeQuestions();
