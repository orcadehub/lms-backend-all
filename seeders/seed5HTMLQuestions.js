require('dotenv').config();
const mongoose = require('mongoose');
const FrontendQuestion = require('../models/FrontendQuestion');
const Tenant = require('../models/Tenant');
const Instructor = require('../models/Instructor');

const htmlQuestions = [
  {
    title: 'Basic HTML Structure, Headings & Paragraphs',
    problemStatement: 'Create a proper HTML5 document with correct DOCTYPE declaration, html tag with lang attribute, head section with meta tags and title, and body section containing headings (h1-h6) and paragraphs with meaningful content.',
    requirements: [
      'Add <!DOCTYPE html> declaration at the beginning',
      'Create <html> tag with lang="en" attribute',
      'Add <head> section with <meta charset="UTF-8">',
      'Include <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      'Add <title> tag with descriptive text',
      'Create <body> section with at least one <h1> heading',
      'Add <h2>, <h3> headings for subsections',
      'Include at least 3 <p> tags with meaningful content',
      'Ensure proper nesting and indentation',
      'All text content should be meaningful and descriptive'
    ],
    acceptanceCriteria: [
      'DOCTYPE is correctly declared',
      'HTML tag has lang attribute set to "en"',
      'Meta charset is UTF-8',
      'Viewport meta tag is present',
      'Title tag contains text',
      'H1 heading exists in body',
      'Multiple heading levels are used',
      'Paragraphs contain substantial content',
      'Document structure is valid',
      'All required elements are present'
    ],
    jestTestFile: `describe('Basic HTML Structure, Headings & Paragraphs', () => {
  test('DOCTYPE is declared correctly', () => {
    expect(document.doctype).toBeTruthy();
    expect(document.doctype.name).toBe('html');
  });

  test('html tag has lang attribute', () => {
    const htmlTag = document.documentElement;
    expect(htmlTag.getAttribute('lang')).toBe('en');
  });

  test('meta charset is UTF-8', () => {
    const metaCharset = document.querySelector('meta[charset]');
    expect(metaCharset).toBeTruthy();
    expect(metaCharset.getAttribute('charset')).toBe('UTF-8');
  });

  test('viewport meta tag is present', () => {
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    expect(viewportMeta).toBeTruthy();
    expect(viewportMeta.getAttribute('content')).toContain('width=device-width');
  });

  test('title tag exists and has content', () => {
    expect(document.title).toBeTruthy();
    expect(document.title.length).toBeGreaterThan(0);
  });

  test('h1 heading exists in body', () => {
    const h1 = document.querySelector('body h1');
    expect(h1).toBeTruthy();
    expect(h1.textContent.trim().length).toBeGreaterThan(0);
  });

  test('h2 and h3 headings exist', () => {
    const h2 = document.querySelector('h2');
    const h3 = document.querySelector('h3');
    expect(h2).toBeTruthy();
    expect(h3).toBeTruthy();
  });

  test('at least 3 paragraphs exist', () => {
    const paragraphs = document.querySelectorAll('p');
    expect(paragraphs.length).toBeGreaterThanOrEqual(3);
  });

  test('paragraphs contain meaningful content', () => {
    const paragraphs = document.querySelectorAll('p');
    expect(paragraphs.length).toBeGreaterThanOrEqual(3);
    
    let meaningfulParagraphs = 0;
    paragraphs.forEach(p => {
      const text = p.textContent.trim();
      // Check if paragraph has at least 5 words or 20 characters
      const wordCount = text.split(/\\s+/).filter(word => word.length > 0).length;
      if (text.length >= 20 || wordCount >= 5) {
        meaningfulParagraphs++;
      }
    });
    
    // At least 2 out of 3 paragraphs should have meaningful content
    expect(meaningfulParagraphs).toBeGreaterThanOrEqual(2);
  });

  test('document structure is valid', () => {
    const head = document.querySelector('head');
    const body = document.querySelector('body');
    expect(head).toBeTruthy();
    expect(body).toBeTruthy();
    expect(head.parentElement.tagName).toBe('HTML');
    expect(body.parentElement.tagName).toBe('HTML');
  });
});`,
    defaultFiles: {
      html: '',
      css: '',
      js: '',
      dataJs: ''
    },
    allowedFiles: ['html', 'css', 'js', 'data.js'],
    expectedOutput: 'A valid HTML5 document with proper structure, multiple heading levels, and descriptive paragraphs.',
    difficulty: 'easy',
    tags: ['HTML', 'Structure', 'Headings', 'Paragraphs', 'Semantic HTML'],
    tenant: null,
    createdBy: null,
    isActive: true
  },
  {
    title: 'HTML Forms & Input Elements',
    problemStatement: 'Build a complete registration form with various input types including text, email, password, number, date, checkbox, radio buttons, select dropdown, and textarea. Include proper labels, form validation attributes, and a submit button.',
    requirements: [
      'Create <form> element with id="registrationForm"',
      'Add text input for username with name="username" and required attribute',
      'Add email input with type="email", name="email", required and pattern attributes',
      'Add password input with type="password", name="password", minlength="8", required',
      'Add number input for age with type="number", min="18", max="100"',
      'Add date input with type="date", name="birthdate"',
      'Add checkbox inputs for terms acceptance with name="terms"',
      'Add radio buttons for gender selection with name="gender" (at least 2 options)',
      'Add select dropdown for country with at least 5 options',
      'Add textarea for bio with name="bio", rows="4", cols="50"',
      'Include submit button with type="submit"',
      'All inputs should have associated <label> elements'
    ],
    acceptanceCriteria: [
      'Form element exists with correct id',
      'Username input has required attribute',
      'Email input has correct type and validation',
      'Password has minlength attribute',
      'Age input has min and max constraints',
      'Date input exists',
      'Checkbox for terms exists',
      'Radio buttons for gender exist',
      'Select dropdown has multiple options',
      'Textarea exists with proper attributes'
    ],
    jestTestFile: `describe('HTML Forms & Input Elements', () => {
  test('form element exists with correct id', () => {
    const form = document.getElementById('registrationForm');
    expect(form).toBeTruthy();
    expect(form.tagName).toBe('FORM');
  });

  test('username input has required attribute', () => {
    const usernameInput = document.querySelector('input[name="username"]');
    expect(usernameInput).toBeTruthy();
    expect(usernameInput.required).toBe(true);
  });

  test('email input has correct type and validation', () => {
    const emailInput = document.querySelector('input[name="email"]');
    expect(emailInput).toBeTruthy();
    expect(emailInput.type).toBe('email');
    expect(emailInput.required).toBe(true);
  });

  test('password input has minlength attribute', () => {
    const passwordInput = document.querySelector('input[name="password"]');
    expect(passwordInput).toBeTruthy();
    expect(passwordInput.type).toBe('password');
    expect(passwordInput.minLength).toBe(8);
  });

  test('age input has min and max constraints', () => {
    const ageInput = document.querySelector('input[name="age"]');
    expect(ageInput).toBeTruthy();
    expect(ageInput.type).toBe('number');
    expect(ageInput.min).toBe('18');
    expect(ageInput.max).toBe('100');
  });

  test('date input exists', () => {
    const dateInput = document.querySelector('input[name="birthdate"]');
    expect(dateInput).toBeTruthy();
    expect(dateInput.type).toBe('date');
  });

  test('radio buttons for gender exist', () => {
    const radioButtons = document.querySelectorAll('input[name="gender"]');
    expect(radioButtons.length).toBeGreaterThanOrEqual(2);
    radioButtons.forEach(radio => {
      expect(radio.type).toBe('radio');
    });
  });

  test('select dropdown has multiple options', () => {
    const select = document.querySelector('select[name="country"]');
    expect(select).toBeTruthy();
    const options = select.querySelectorAll('option');
    expect(options.length).toBeGreaterThanOrEqual(5);
  });

  test('textarea exists with proper attributes', () => {
    const textarea = document.querySelector('textarea[name="bio"]');
    expect(textarea).toBeTruthy();
    expect(textarea.rows).toBe(4);
    expect(textarea.cols).toBe(50);
  });

  test('submit button exists', () => {
    const submitButton = document.querySelector('button[type="submit"]');
    expect(submitButton).toBeTruthy();
    expect(submitButton.textContent.length).toBeGreaterThan(0);
  });
});`,
    defaultFiles: {
      html: '',
      css: '',
      js: '',
      dataJs: ''
    },
    allowedFiles: ['html', 'css', 'js', 'data.js'],
    expectedOutput: 'A complete registration form with all input types, proper validation attributes, labels, and a submit button.',
    difficulty: 'medium',
    tags: ['HTML', 'Forms', 'Input Elements', 'Validation', 'User Input'],
    tenant: null,
    createdBy: null,
    isActive: true
  },
  {
    title: 'HTML Lists & Navigation',
    problemStatement: 'Create a semantic navigation structure with ordered and unordered lists. Build a main navigation menu using <nav> element with links, and include both ordered and unordered lists with proper nesting and semantic markup.',
    requirements: [
      'Create <nav> element with id="mainNav"',
      'Add unordered list <ul> inside nav for main menu items',
      'Create at least 5 navigation links with href attributes',
      'Add nested unordered list for submenu items under at least one main item',
      'Create a separate <section> with id="contentList"',
      'Add ordered list <ol> with at least 5 items for step-by-step instructions',
      'Add unordered list <ul> with at least 5 items for features or benefits',
      'All list items should have meaningful text content',
      'Use proper semantic HTML structure',
      'Include proper indentation and formatting'
    ],
    acceptanceCriteria: [
      'Nav element exists with correct id',
      'Main navigation list exists',
      'At least 5 navigation links present',
      'Nested submenu list exists',
      'Ordered list with 5+ items exists',
      'Unordered list with 5+ items exists',
      'All links have href attributes',
      'Semantic structure is correct',
      'Content is meaningful',
      'Proper nesting is maintained'
    ],
    jestTestFile: `describe('HTML Lists & Navigation', () => {
  test('nav element exists with correct id', () => {
    const nav = document.getElementById('mainNav');
    expect(nav).toBeTruthy();
    expect(nav.tagName).toBe('NAV');
  });

  test('main navigation list exists', () => {
    const navList = document.querySelector('#mainNav ul');
    expect(navList).toBeTruthy();
    expect(navList.tagName).toBe('UL');
  });

  test('at least 5 navigation links present', () => {
    const navLinks = document.querySelectorAll('#mainNav a');
    expect(navLinks.length).toBeGreaterThanOrEqual(5);
  });

  test('all navigation links have href attributes', () => {
    const navLinks = document.querySelectorAll('#mainNav a');
    navLinks.forEach(link => {
      expect(link.getAttribute('href')).toBeTruthy();
    });
  });

  test('nested submenu list exists', () => {
    const nestedList = document.querySelector('#mainNav ul ul');
    expect(nestedList).toBeTruthy();
    expect(nestedList.tagName).toBe('UL');
  });

  test('ordered list with 5+ items exists', () => {
    const orderedList = document.querySelector('ol');
    expect(orderedList).toBeTruthy();
    const items = orderedList.querySelectorAll('li');
    expect(items.length).toBeGreaterThanOrEqual(5);
  });

  test('unordered list with 5+ items exists', () => {
    const unorderedLists = document.querySelectorAll('ul');
    let foundList = false;
    unorderedLists.forEach(ul => {
      const items = ul.querySelectorAll('li');
      if (items.length >= 5) {
        foundList = true;
      }
    });
    expect(foundList).toBe(true);
  });

  test('list items have meaningful content', () => {
    const allItems = document.querySelectorAll('li');
    let meaningfulCount = 0;
    allItems.forEach(item => {
      if (item.textContent.trim().length > 0) {
        meaningfulCount++;
      }
    });
    expect(meaningfulCount).toBeGreaterThan(0);
  });

  test('navigation links have meaningful text', () => {
    const navLinks = document.querySelectorAll('#mainNav a');
    navLinks.forEach(link => {
      expect(link.textContent.trim().length).toBeGreaterThan(0);
    });
  });

  test('proper semantic structure is maintained', () => {
    const nav = document.getElementById('mainNav');
    const navUl = nav.querySelector('ul');
    const navLis = navUl.querySelectorAll('> li');
    expect(navLis.length).toBeGreaterThanOrEqual(5);
  });
});`,
    defaultFiles: {
      html: '',
      css: '',
      js: '',
      dataJs: ''
    },
    allowedFiles: ['html', 'css', 'js', 'data.js'],
    expectedOutput: 'A semantic navigation structure with main menu, nested submenu, ordered list for steps, and unordered list for features.',
    difficulty: 'medium',
    tags: ['HTML', 'Lists', 'Navigation', 'Semantic HTML', 'Nesting'],
    tenant: null,
    createdBy: null,
    isActive: true
  },
  {
    title: 'HTML Tables & Data Display',
    problemStatement: 'Create a comprehensive data table with proper structure including thead, tbody, tfoot sections, table headers, data cells, and advanced features like colspan and rowspan for complex data representation.',
    requirements: [
      'Create <table> element with id="dataTable"',
      'Add <thead> section with header row containing <th> elements',
      'Add <tbody> section with at least 5 data rows',
      'Add <tfoot> section with summary or total row',
      'Include at least one cell with colspan attribute',
      'Include at least one cell with rowspan attribute',
      'Add table caption with <caption> element',
      'Use proper semantic table structure',
      'Include meaningful data in all cells',
      'Add table summary or description'
    ],
    acceptanceCriteria: [
      'Table element exists with correct id',
      'Thead section with headers exists',
      'Tbody section with 5+ rows exists',
      'Tfoot section exists',
      'Colspan is used correctly',
      'Rowspan is used correctly',
      'Caption element exists',
      'Semantic structure is proper',
      'Data is meaningful and organized',
      'Table is well-formatted'
    ],
    jestTestFile: `describe('HTML Tables & Data Display', () => {
  test('table element exists with correct id', () => {
    const table = document.getElementById('dataTable');
    expect(table).toBeTruthy();
    expect(table.tagName).toBe('TABLE');
  });

  test('thead section with headers exists', () => {
    const thead = document.querySelector('#dataTable thead');
    expect(thead).toBeTruthy();
    const headers = thead.querySelectorAll('th');
    expect(headers.length).toBeGreaterThan(0);
  });

  test('tbody section with 5+ rows exists', () => {
    const tbody = document.querySelector('#dataTable tbody');
    expect(tbody).toBeTruthy();
    const rows = tbody.querySelectorAll('tr');
    expect(rows.length).toBeGreaterThanOrEqual(5);
  });

  test('tfoot section exists', () => {
    const tfoot = document.querySelector('#dataTable tfoot');
    expect(tfoot).toBeTruthy();
    const footerRow = tfoot.querySelector('tr');
    expect(footerRow).toBeTruthy();
  });

  test('colspan is used correctly', () => {
    const cellsWithColspan = document.querySelectorAll('[colspan]');
    expect(cellsWithColspan.length).toBeGreaterThan(0);
    cellsWithColspan.forEach(cell => {
      expect(parseInt(cell.getAttribute('colspan'))).toBeGreaterThan(1);
    });
  });

  test('rowspan is used correctly', () => {
    const cellsWithRowspan = document.querySelectorAll('[rowspan]');
    expect(cellsWithRowspan.length).toBeGreaterThan(0);
    cellsWithRowspan.forEach(cell => {
      expect(parseInt(cell.getAttribute('rowspan'))).toBeGreaterThan(1);
    });
  });

  test('caption element exists', () => {
    const caption = document.querySelector('#dataTable caption');
    expect(caption).toBeTruthy();
    expect(caption.textContent.trim().length).toBeGreaterThan(0);
  });

  test('table headers have meaningful content', () => {
    const headers = document.querySelectorAll('#dataTable th');
    headers.forEach(header => {
      expect(header.textContent.trim().length).toBeGreaterThan(0);
    });
  });

  test('table data cells have content', () => {
    const dataCells = document.querySelectorAll('#dataTable tbody td');
    expect(dataCells.length).toBeGreaterThan(0);
    let contentCount = 0;
    dataCells.forEach(cell => {
      if (cell.textContent.trim().length > 0) {
        contentCount++;
      }
    });
    expect(contentCount).toBeGreaterThan(0);
  });

  test('table structure is semantically correct', () => {
    const table = document.getElementById('dataTable');
    const thead = table.querySelector('thead');
    const tbody = table.querySelector('tbody');
    const tfoot = table.querySelector('tfoot');
    expect(thead.parentElement).toBe(table);
    expect(tbody.parentElement).toBe(table);
    expect(tfoot.parentElement).toBe(table);
  });
});`,
    defaultFiles: {
      html: '',
      css: '',
      js: '',
      dataJs: ''
    },
    allowedFiles: ['html', 'css', 'js', 'data.js'],
    expectedOutput: 'A well-structured data table with thead, tbody, tfoot, caption, colspan, rowspan, and meaningful data organized in rows and columns.',
    difficulty: 'hard',
    tags: ['HTML', 'Tables', 'Data Display', 'Colspan', 'Rowspan', 'Semantic HTML'],
    tenant: null,
    createdBy: null,
    isActive: true
  },
  {
    title: 'HTML Semantic Elements & Accessibility',
    problemStatement: 'Build a complete webpage using semantic HTML5 elements (header, nav, main, article, aside, footer) with proper ARIA attributes for accessibility. Include proper heading hierarchy, alt text for images, and semantic structure for screen readers.',
    requirements: [
      'Create <header> element with site title and tagline',
      'Add <nav> element with navigation links',
      'Create <main> element containing primary content',
      'Add <article> element with heading and content',
      'Include <aside> element with supplementary content',
      'Add <footer> element with copyright and links',
      'Include at least one <img> with alt attribute',
      'Add ARIA labels to interactive elements',
      'Use proper heading hierarchy (h1, h2, h3)',
      'Include role attributes where appropriate'
    ],
    acceptanceCriteria: [
      'Header element exists',
      'Nav element exists',
      'Main element exists',
      'Article element exists',
      'Aside element exists',
      'Footer element exists',
      'Images have alt attributes',
      'ARIA attributes are present',
      'Heading hierarchy is correct',
      'Semantic structure is proper'
    ],
    jestTestFile: `describe('HTML Semantic Elements & Accessibility', () => {
  test('header element exists', () => {
    const header = document.querySelector('header');
    expect(header).toBeTruthy();
    expect(header.tagName).toBe('HEADER');
  });

  test('nav element exists', () => {
    const nav = document.querySelector('nav');
    expect(nav).toBeTruthy();
    expect(nav.tagName).toBe('NAV');
  });

  test('main element exists', () => {
    const main = document.querySelector('main');
    expect(main).toBeTruthy();
    expect(main.tagName).toBe('MAIN');
  });

  test('article element exists', () => {
    const article = document.querySelector('article');
    expect(article).toBeTruthy();
    expect(article.tagName).toBe('ARTICLE');
  });

  test('aside element exists', () => {
    const aside = document.querySelector('aside');
    expect(aside).toBeTruthy();
    expect(aside.tagName).toBe('ASIDE');
  });

  test('footer element exists', () => {
    const footer = document.querySelector('footer');
    expect(footer).toBeTruthy();
    expect(footer.tagName).toBe('FOOTER');
  });

  test('images have alt attributes', () => {
    const images = document.querySelectorAll('img');
    expect(images.length).toBeGreaterThan(0);
    images.forEach(img => {
      expect(img.getAttribute('alt')).toBeTruthy();
      expect(img.getAttribute('alt').length).toBeGreaterThan(0);
    });
  });

  test('ARIA attributes are present', () => {
    const elementsWithAria = document.querySelectorAll('[aria-label], [aria-describedby], [role]');
    expect(elementsWithAria.length).toBeGreaterThan(0);
  });

  test('heading hierarchy is correct', () => {
    const h1 = document.querySelector('h1');
    const h2 = document.querySelectorAll('h2');
    expect(h1).toBeTruthy();
    expect(h2.length).toBeGreaterThan(0);
  });

  test('semantic structure is proper', () => {
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');
    expect(header).toBeTruthy();
    expect(main).toBeTruthy();
    expect(footer).toBeTruthy();
    const body = document.querySelector('body');
    expect(header.parentElement).toBe(body);
    expect(main.parentElement).toBe(body);
    expect(footer.parentElement).toBe(body);
  });
});`,
    defaultFiles: {
      html: '',
      css: '',
      js: '',
      dataJs: ''
    },
    allowedFiles: ['html', 'css', 'js', 'data.js'],
    expectedOutput: 'A complete semantic webpage with header, nav, main, article, aside, footer elements, proper ARIA attributes, alt text for images, and correct heading hierarchy.',
    difficulty: 'hard',
    tags: ['HTML', 'Semantic HTML', 'Accessibility', 'ARIA', 'Screen Readers', 'HTML5'],
    tenant: null,
    createdBy: null,
    isActive: true
  }
];

async function seed5HTMLQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const tenant = await Tenant.findOne();
    const instructor = await Instructor.findOne();

    if (!tenant || !instructor) {
      console.error('Tenant or Instructor not found');
      process.exit(1);
    }

    // Delete existing questions first
    await FrontendQuestion.deleteMany({ title: { $in: htmlQuestions.map(q => q.title) } });
    console.log('Deleted existing HTML questions');

    for (const question of htmlQuestions) {
      await FrontendQuestion.create({
        ...question,
        tenant: tenant._id,
        createdBy: instructor._id
      });
      console.log(`✓ Created: ${question.title}`);
    }

    console.log(`\n✓ All ${htmlQuestions.length} HTML questions created successfully!`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seed5HTMLQuestions();
