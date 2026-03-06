require('dotenv').config();
const mongoose = require('mongoose');
const FrontendQuestion = require('../models/FrontendQuestion');
const Tenant = require('../models/Tenant');
const Instructor = require('../models/Instructor');

const htmlQuestions = [
  {
    title: 'Create a Basic HTML Page Structure',
    problemStatement: 'Build a complete HTML5 document with proper DOCTYPE, head section with meta tags, and body with a heading and paragraph.',
    requirements: [
      'Add <!DOCTYPE html> declaration',
      'Create <html> with lang="en" attribute',
      'Add <head> section with <meta charset="UTF-8">',
      'Add <title> tag with text "My First Page"',
      'Create <body> with <h1> containing "Welcome"',
      'Add <p> tag with any descriptive text'
    ],
    acceptanceCriteria: [
      'DOCTYPE is declared correctly',
      'HTML tag has lang attribute',
      'Meta charset is UTF-8',
      'Title exists and contains text',
      'H1 heading exists in body',
      'Paragraph exists with content'
    ],
    jestTestFile: `describe('Basic HTML Structure', () => {
  test('DOCTYPE exists', () => {
    expect(document.doctype).toBeTruthy();
    expect(document.doctype.name).toBe('html');
  });
  test('html has lang attribute', () => {
    expect(document.documentElement.getAttribute('lang')).toBe('en');
  });
  test('meta charset exists', () => {
    const meta = document.querySelector('meta[charset]');
    expect(meta).toBeTruthy();
    expect(meta.getAttribute('charset')).toBe('UTF-8');
  });
  test('title exists', () => {
    expect(document.title).toBe('My First Page');
  });
  test('h1 exists', () => {
    const h1 = document.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1.textContent).toContain('Welcome');
  });
  test('paragraph exists', () => {
    const p = document.querySelector('p');
    expect(p).toBeTruthy();
    expect(p.textContent.length).toBeGreaterThan(0);
  });
});`,
    defaultFiles: {
      html: '<!-- Write your complete HTML structure here -->',
      css: '/* Add your CSS styles here */',
      js: '// Write your JavaScript code here'
    },
    allowedFiles: ['html', 'css', 'js'],
    difficulty: 'easy',
    tags: ['HTML', 'Structure', 'Basics']
  },
  {
    title: 'Create a Navigation Menu with Links',
    problemStatement: 'Build a navigation bar with an unordered list containing 4 links (Home, About, Services, Contact) using semantic HTML.',
    requirements: [
      'Create <nav> element with id="mainNav"',
      'Add <ul> inside nav',
      'Create 4 <li> items',
      'Each li contains an <a> tag with href="#home", "#about", "#services", "#contact"',
      'Link text should be "Home", "About", "Services", "Contact"'
    ],
    acceptanceCriteria: [
      'Nav element exists with correct id',
      'Unordered list is inside nav',
      'Exactly 4 list items exist',
      'All links have proper href attributes',
      'Link text matches requirements'
    ],
    jestTestFile: `describe('Navigation Menu', () => {
  test('nav element exists', () => {
    const nav = document.getElementById('mainNav');
    expect(nav).toBeTruthy();
    expect(nav.tagName).toBe('NAV');
  });
  test('ul exists inside nav', () => {
    const ul = document.querySelector('#mainNav ul');
    expect(ul).toBeTruthy();
  });
  test('has 4 list items', () => {
    const items = document.querySelectorAll('#mainNav li');
    expect(items.length).toBe(4);
  });
  test('all links have href', () => {
    const links = document.querySelectorAll('#mainNav a');
    expect(links.length).toBe(4);
    links.forEach(link => {
      expect(link.getAttribute('href')).toBeTruthy();
    });
  });
  test('link text is correct', () => {
    const links = document.querySelectorAll('#mainNav a');
    expect(links[0].textContent).toBe('Home');
    expect(links[1].textContent).toBe('About');
    expect(links[2].textContent).toBe('Services');
    expect(links[3].textContent).toBe('Contact');
  });
});`,
    defaultFiles: {
      html: '<!-- Create your navigation menu here -->',
      css: '/* Add your CSS styles here */',
      js: '// Write your JavaScript code here'
    },
    allowedFiles: ['html', 'css', 'js'],
    difficulty: 'easy',
    tags: ['HTML', 'Navigation', 'Links']
  },
  {
    title: 'Build a Contact Form',
    problemStatement: 'Create a contact form with name, email, message fields and a submit button using proper form elements and attributes.',
    requirements: [
      'Create <form> with id="contactForm"',
      'Add text input with name="name" and placeholder="Your Name"',
      'Add email input with type="email", name="email", required attribute',
      'Add <textarea> with name="message", rows="5"',
      'Add submit button with text "Send Message"',
      'All inputs should have proper labels'
    ],
    acceptanceCriteria: [
      'Form element exists with correct id',
      'Name input exists with placeholder',
      'Email input has correct type and required',
      'Textarea exists with proper attributes',
      'Submit button exists',
      'Labels are associated with inputs'
    ],
    jestTestFile: `describe('Contact Form', () => {
  test('form exists', () => {
    const form = document.getElementById('contactForm');
    expect(form).toBeTruthy();
    expect(form.tagName).toBe('FORM');
  });
  test('name input exists', () => {
    const input = document.querySelector('input[name="name"]');
    expect(input).toBeTruthy();
    expect(input.getAttribute('placeholder')).toBe('Your Name');
  });
  test('email input is correct', () => {
    const input = document.querySelector('input[name="email"]');
    expect(input).toBeTruthy();
    expect(input.type).toBe('email');
    expect(input.required).toBe(true);
  });
  test('textarea exists', () => {
    const textarea = document.querySelector('textarea[name="message"]');
    expect(textarea).toBeTruthy();
    expect(textarea.rows).toBe(5);
  });
  test('submit button exists', () => {
    const button = document.querySelector('button[type="submit"]');
    expect(button).toBeTruthy();
    expect(button.textContent).toContain('Send Message');
  });
  test('labels exist', () => {
    const labels = document.querySelectorAll('label');
    expect(labels.length).toBeGreaterThanOrEqual(3);
  });
});`,
    defaultFiles: {
      html: '<!-- Create your contact form here -->',
      css: '/* Add your CSS styles here */',
      js: '// Write your JavaScript code here'
    },
    allowedFiles: ['html', 'css', 'js'],
    difficulty: 'medium',
    tags: ['HTML', 'Forms', 'Input']
  },
  {
    title: 'Create a Product Card with Image',
    problemStatement: 'Build a product card displaying an image, product name, price, and a buy button using semantic HTML.',
    requirements: [
      'Create <article> with class="product-card"',
      'Add <img> with src="product.jpg", alt="Product Image"',
      'Add <h2> with text "Wireless Headphones"',
      'Add <p> with class="price" containing "$99.99"',
      'Add <button> with text "Add to Cart"'
    ],
    acceptanceCriteria: [
      'Article element exists with correct class',
      'Image has proper src and alt attributes',
      'Heading exists with product name',
      'Price paragraph has correct class and text',
      'Button exists with correct text'
    ],
    jestTestFile: `describe('Product Card', () => {
  test('article exists', () => {
    const article = document.querySelector('.product-card');
    expect(article).toBeTruthy();
    expect(article.tagName).toBe('ARTICLE');
  });
  test('image exists with attributes', () => {
    const img = document.querySelector('.product-card img');
    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBe('product.jpg');
    expect(img.getAttribute('alt')).toBe('Product Image');
  });
  test('heading exists', () => {
    const h2 = document.querySelector('.product-card h2');
    expect(h2).toBeTruthy();
    expect(h2.textContent).toBe('Wireless Headphones');
  });
  test('price exists', () => {
    const price = document.querySelector('.price');
    expect(price).toBeTruthy();
    expect(price.textContent).toContain('$99.99');
  });
  test('button exists', () => {
    const button = document.querySelector('.product-card button');
    expect(button).toBeTruthy();
    expect(button.textContent).toBe('Add to Cart');
  });
});`,
    defaultFiles: {
      html: '<!-- Create your product card here -->',
      css: '/* Add your CSS styles here */',
      js: '// Write your JavaScript code here'
    },
    allowedFiles: ['html', 'css', 'js'],
    difficulty: 'medium',
    tags: ['HTML', 'Semantic', 'Card']
  },
  {
    title: 'Build a Data Table',
    problemStatement: 'Create a table displaying student information with headers and 3 rows of data including name, age, and grade.',
    requirements: [
      'Create <table> with id="studentTable"',
      'Add <thead> with <tr> containing 3 <th>: "Name", "Age", "Grade"',
      'Add <tbody> with 3 <tr> rows',
      'Each row has 3 <td> cells with student data',
      'Use proper table structure'
    ],
    acceptanceCriteria: [
      'Table exists with correct id',
      'Thead section exists with headers',
      'Three header cells exist',
      'Tbody section exists',
      'Three data rows exist',
      'Each row has three cells'
    ],
    jestTestFile: `describe('Student Table', () => {
  test('table exists', () => {
    const table = document.getElementById('studentTable');
    expect(table).toBeTruthy();
    expect(table.tagName).toBe('TABLE');
  });
  test('thead exists with headers', () => {
    const thead = document.querySelector('#studentTable thead');
    expect(thead).toBeTruthy();
    const headers = thead.querySelectorAll('th');
    expect(headers.length).toBe(3);
  });
  test('header text is correct', () => {
    const headers = document.querySelectorAll('#studentTable th');
    expect(headers[0].textContent).toBe('Name');
    expect(headers[1].textContent).toBe('Age');
    expect(headers[2].textContent).toBe('Grade');
  });
  test('tbody exists with rows', () => {
    const tbody = document.querySelector('#studentTable tbody');
    expect(tbody).toBeTruthy();
    const rows = tbody.querySelectorAll('tr');
    expect(rows.length).toBe(3);
  });
  test('each row has 3 cells', () => {
    const rows = document.querySelectorAll('#studentTable tbody tr');
    rows.forEach(row => {
      const cells = row.querySelectorAll('td');
      expect(cells.length).toBe(3);
    });
  });
});`,
    defaultFiles: {
      html: '<!-- Create your student table here -->',
      css: '/* Add your CSS styles here */',
      js: '// Write your JavaScript code here'
    },
    allowedFiles: ['html', 'css', 'js'],
    difficulty: 'medium',
    tags: ['HTML', 'Tables', 'Data']
  },
  {
    title: 'Create an Ordered and Unordered List',
    problemStatement: 'Build a page with both ordered list of steps and unordered list of features using proper list elements.',
    requirements: [
      'Create <h3> with text "Steps to Success"',
      'Add <ol> with 3 <li> items describing steps',
      'Create <h3> with text "Key Features"',
      'Add <ul> with 4 <li> items describing features'
    ],
    acceptanceCriteria: [
      'First heading exists',
      'Ordered list has 3 items',
      'Second heading exists',
      'Unordered list has 4 items',
      'All list items have content'
    ],
    jestTestFile: `describe('Lists', () => {
  test('headings exist', () => {
    const headings = document.querySelectorAll('h3');
    expect(headings.length).toBeGreaterThanOrEqual(2);
    expect(headings[0].textContent).toBe('Steps to Success');
    expect(headings[1].textContent).toBe('Key Features');
  });
  test('ordered list has 3 items', () => {
    const ol = document.querySelector('ol');
    expect(ol).toBeTruthy();
    const items = ol.querySelectorAll('li');
    expect(items.length).toBe(3);
  });
  test('unordered list has 4 items', () => {
    const ul = document.querySelector('ul');
    expect(ul).toBeTruthy();
    const items = ul.querySelectorAll('li');
    expect(items.length).toBe(4);
  });
  test('list items have content', () => {
    const allItems = document.querySelectorAll('li');
    allItems.forEach(item => {
      expect(item.textContent.length).toBeGreaterThan(0);
    });
  });
});`,
    defaultFiles: {
      html: '<!-- Create your lists here -->',
      css: '/* Add your CSS styles here */',
      js: '// Write your JavaScript code here'
    },
    allowedFiles: ['html', 'css', 'js'],
    difficulty: 'easy',
    tags: ['HTML', 'Lists']
  },
  {
    title: 'Build a Registration Form with Multiple Input Types',
    problemStatement: 'Create a registration form with various input types including text, email, password, date, and radio buttons.',
    requirements: [
      'Create <form> with id="registrationForm"',
      'Add text input for username with name="username"',
      'Add email input with name="email" and required',
      'Add password input with name="password" and minlength="8"',
      'Add date input with name="birthdate"',
      'Add 2 radio buttons for gender with name="gender"',
      'Add submit button'
    ],
    acceptanceCriteria: [
      'Form exists with correct id',
      'Username input exists',
      'Email input is required',
      'Password has minlength attribute',
      'Date input exists',
      'Two radio buttons with same name',
      'Submit button exists'
    ],
    jestTestFile: `describe('Registration Form', () => {
  test('form exists', () => {
    const form = document.getElementById('registrationForm');
    expect(form).toBeTruthy();
  });
  test('username input exists', () => {
    const input = document.querySelector('input[name="username"]');
    expect(input).toBeTruthy();
    expect(input.type).toBe('text');
  });
  test('email is required', () => {
    const input = document.querySelector('input[name="email"]');
    expect(input).toBeTruthy();
    expect(input.type).toBe('email');
    expect(input.required).toBe(true);
  });
  test('password has minlength', () => {
    const input = document.querySelector('input[name="password"]');
    expect(input).toBeTruthy();
    expect(input.type).toBe('password');
    expect(input.minLength).toBe(8);
  });
  test('date input exists', () => {
    const input = document.querySelector('input[name="birthdate"]');
    expect(input).toBeTruthy();
    expect(input.type).toBe('date');
  });
  test('radio buttons exist', () => {
    const radios = document.querySelectorAll('input[name="gender"]');
    expect(radios.length).toBe(2);
    radios.forEach(radio => {
      expect(radio.type).toBe('radio');
    });
  });
});`,
    defaultFiles: {
      html: '<!-- Create your registration form here -->',
      css: '/* Add your CSS styles here */',
      js: '// Write your JavaScript code here'
    },
    allowedFiles: ['html', 'css', 'js'],
    difficulty: 'medium',
    tags: ['HTML', 'Forms', 'Input Types']
  },
  {
    title: 'Create a Semantic Article with Header and Footer',
    problemStatement: 'Build a blog article using semantic HTML5 elements including header, main, article, and footer sections.',
    requirements: [
      'Create <header> with <h1> "My Blog Post"',
      'Add <main> element',
      'Inside main, create <article> with id="blogPost"',
      'Article contains <h2> "Article Title" and <p> with content',
      'Create <footer> with copyright text',
      'Use proper semantic structure'
    ],
    acceptanceCriteria: [
      'Header element exists with h1',
      'Main element exists',
      'Article exists inside main',
      'Article has heading and paragraph',
      'Footer exists with text',
      'Semantic structure is correct'
    ],
    jestTestFile: `describe('Semantic Article', () => {
  test('header exists', () => {
    const header = document.querySelector('header');
    expect(header).toBeTruthy();
    const h1 = header.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1.textContent).toBe('My Blog Post');
  });
  test('main element exists', () => {
    const main = document.querySelector('main');
    expect(main).toBeTruthy();
  });
  test('article exists in main', () => {
    const article = document.querySelector('main article');
    expect(article).toBeTruthy();
    expect(article.id).toBe('blogPost');
  });
  test('article has content', () => {
    const h2 = document.querySelector('article h2');
    const p = document.querySelector('article p');
    expect(h2).toBeTruthy();
    expect(h2.textContent).toBe('Article Title');
    expect(p).toBeTruthy();
  });
  test('footer exists', () => {
    const footer = document.querySelector('footer');
    expect(footer).toBeTruthy();
    expect(footer.textContent.length).toBeGreaterThan(0);
  });
});`,
    defaultFiles: {
      html: '<!-- Create your semantic article here -->',
      css: '/* Add your CSS styles here */',
      js: '// Write your JavaScript code here'
    },
    allowedFiles: ['html', 'css', 'js'],
    difficulty: 'medium',
    tags: ['HTML', 'Semantic', 'HTML5']
  },
  {
    title: 'Build a Video and Audio Player',
    problemStatement: 'Create a page with HTML5 video and audio elements with proper controls and attributes.',
    requirements: [
      'Add <video> with src="video.mp4", controls attribute, width="640", height="360"',
      'Video should have poster="thumbnail.jpg"',
      'Add <audio> with src="audio.mp3" and controls',
      'Both elements should have fallback text',
      'Add headings before each media element'
    ],
    acceptanceCriteria: [
      'Video element exists with controls',
      'Video has correct dimensions',
      'Video has poster attribute',
      'Audio element exists with controls',
      'Fallback text exists for both',
      'Headings describe the media'
    ],
    jestTestFile: `describe('Media Elements', () => {
  test('video exists with controls', () => {
    const video = document.querySelector('video');
    expect(video).toBeTruthy();
    expect(video.controls).toBe(true);
    expect(video.getAttribute('src')).toBe('video.mp4');
  });
  test('video dimensions are correct', () => {
    const video = document.querySelector('video');
    expect(video.width).toBe(640);
    expect(video.height).toBe(360);
  });
  test('video has poster', () => {
    const video = document.querySelector('video');
    expect(video.getAttribute('poster')).toBe('thumbnail.jpg');
  });
  test('audio exists with controls', () => {
    const audio = document.querySelector('audio');
    expect(audio).toBeTruthy();
    expect(audio.controls).toBe(true);
    expect(audio.getAttribute('src')).toBe('audio.mp3');
  });
  test('fallback text exists', () => {
    const video = document.querySelector('video');
    const audio = document.querySelector('audio');
    expect(video.textContent.length).toBeGreaterThan(0);
    expect(audio.textContent.length).toBeGreaterThan(0);
  });
});`,
    defaultFiles: {
      html: '<!-- Create your media elements here -->',
      css: '/* Add your CSS styles here */',
      js: '// Write your JavaScript code here'
    },
    allowedFiles: ['html', 'css', 'js'],
    difficulty: 'medium',
    tags: ['HTML', 'Media', 'HTML5']
  },
  {
    title: 'Create a Dropdown Select Menu',
    problemStatement: 'Build a form with a dropdown select menu for choosing a country with multiple options.',
    requirements: [
      'Create <form> with id="countryForm"',
      'Add <label> with text "Select Country:"',
      'Create <select> with name="country" and id="countrySelect"',
      'Add 5 <option> elements with different countries',
      'First option should have value="" and text "Choose a country"',
      'Add submit button'
    ],
    acceptanceCriteria: [
      'Form exists with correct id',
      'Label exists and describes select',
      'Select element has correct attributes',
      'Five options exist',
      'First option is placeholder',
      'Submit button exists'
    ],
    jestTestFile: `describe('Dropdown Menu', () => {
  test('form exists', () => {
    const form = document.getElementById('countryForm');
    expect(form).toBeTruthy();
  });
  test('label exists', () => {
    const label = document.querySelector('label');
    expect(label).toBeTruthy();
    expect(label.textContent).toBe('Select Country:');
  });
  test('select exists', () => {
    const select = document.getElementById('countrySelect');
    expect(select).toBeTruthy();
    expect(select.name).toBe('country');
  });
  test('has 5 options', () => {
    const options = document.querySelectorAll('#countrySelect option');
    expect(options.length).toBe(5);
  });
  test('first option is placeholder', () => {
    const firstOption = document.querySelector('#countrySelect option');
    expect(firstOption.value).toBe('');
    expect(firstOption.textContent).toBe('Choose a country');
  });
  test('submit button exists', () => {
    const button = document.querySelector('button[type="submit"]');
    expect(button).toBeTruthy();
  });
});`,
    defaultFiles: {
      html: '<!-- Create your dropdown form here -->',
      css: '/* Add your CSS styles here */',
      js: '// Write your JavaScript code here'
    },
    allowedFiles: ['html', 'css', 'js'],
    difficulty: 'easy',
    tags: ['HTML', 'Forms', 'Select']
  }
];

async function seed10HTMLQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const tenant = await Tenant.findOne();
    const instructor = await Instructor.findOne();

    if (!tenant || !instructor) {
      console.error('Tenant or Instructor not found');
      process.exit(1);
    }

    for (const question of htmlQuestions) {
      await FrontendQuestion.create({
        ...question,
        tenant: tenant._id,
        createdBy: instructor._id
      });
      console.log(`Created: ${question.title}`);
    }

    console.log(`\nAll ${htmlQuestions.length} HTML questions created successfully!`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seed10HTMLQuestions();
