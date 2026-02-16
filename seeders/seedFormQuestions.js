require('dotenv').config();
const mongoose = require('mongoose');
const FrontendQuestion = require('../models/FrontendQuestion');
const Tenant = require('../models/Tenant');
const Instructor = require('../models/Instructor');

const formQuestions = [
  // 1. Checkbox and Labels
  {
    title: "HTML Forms - Checkboxes with Labels",
    problemStatement: "Create a form with checkboxes and proper labels.",
    requirements: [
      "Create a form with id='preferences'",
      "Add a label with text 'Select your interests:'",
      "Add a checkbox input with name='interests' and value='sports' with label 'Sports'",
      "Add a checkbox input with name='interests' and value='music' with label 'Music'",
      "Add a checkbox input with name='interests' and value='reading' with label 'Reading'"
    ],
    acceptanceCriteria: [
      "Form exists with correct id",
      "Three checkboxes exist with same name",
      "Each checkbox has correct value",
      "Labels are properly associated"
    ],
    jestTestFile: `describe('HTML Checkboxes', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });

  test('form exists', () => {
    const form = document.getElementById('preferences');
    expect(form).toBeTruthy();
  });

  test('checkboxes exist with correct attributes', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    expect(checkboxes.length).toBe(3);
    expect(checkboxes[0].getAttribute('name')).toBe('interests');
    expect(checkboxes[0].getAttribute('value')).toBe('sports');
    expect(checkboxes[1].getAttribute('value')).toBe('music');
    expect(checkboxes[2].getAttribute('value')).toBe('reading');
  });

  test('labels exist', () => {
    const labels = document.querySelectorAll('label');
    expect(labels.length).toBeGreaterThanOrEqual(3);
  });
});`,
    allowedFiles: ['html'],
    difficulty: 'medium',
    tags: ['HTML', 'Forms', 'Checkbox', 'Labels']
  },

  // 2. Number, Date, and Time Inputs
  {
    title: "HTML Forms - Number, Date, and Time Inputs",
    problemStatement: "Create a form with number, date, and time input types.",
    requirements: [
      "Create an input with type='number', name='age', min='1', max='100'",
      "Create an input with type='date', name='birthdate'",
      "Create an input with type='time', name='appointment'",
      "Create an input with type='datetime-local', name='meeting'"
    ],
    acceptanceCriteria: [
      "Number input exists with min and max attributes",
      "Date input exists",
      "Time input exists",
      "Datetime-local input exists"
    ],
    jestTestFile: `describe('HTML Number Date Time Inputs', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });

  test('number input exists', () => {
    const numberInput = document.querySelector('input[type="number"]');
    expect(numberInput).toBeTruthy();
    expect(numberInput.getAttribute('name')).toBe('age');
    expect(numberInput.getAttribute('min')).toBe('1');
    expect(numberInput.getAttribute('max')).toBe('100');
  });

  test('date input exists', () => {
    const dateInput = document.querySelector('input[type="date"]');
    expect(dateInput).toBeTruthy();
    expect(dateInput.getAttribute('name')).toBe('birthdate');
  });

  test('time input exists', () => {
    const timeInput = document.querySelector('input[type="time"]');
    expect(timeInput).toBeTruthy();
    expect(timeInput.getAttribute('name')).toBe('appointment');
  });

  test('datetime-local input exists', () => {
    const datetimeInput = document.querySelector('input[type="datetime-local"]');
    expect(datetimeInput).toBeTruthy();
    expect(datetimeInput.getAttribute('name')).toBe('meeting');
  });
});`,
    allowedFiles: ['html'],
    difficulty: 'medium',
    tags: ['HTML', 'Forms', 'Number', 'Date', 'Time']
  },

  // 3. File Upload and Color Picker
  {
    title: "HTML Forms - File Upload and Color Picker",
    problemStatement: "Create a form with file upload and color picker inputs.",
    requirements: [
      "Create an input with type='file', name='document', accept='.pdf,.doc'",
      "Create an input with type='file', name='photo', accept='image/*', multiple",
      "Create an input with type='color', name='themeColor', value='#ff0000'",
      "Create a button with type='submit' and text 'Upload'"
    ],
    acceptanceCriteria: [
      "File input for documents exists with accept attribute",
      "File input for images exists with multiple attribute",
      "Color input exists with default value",
      "Submit button exists"
    ],
    jestTestFile: `describe('HTML File and Color Inputs', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });

  test('document file input exists', () => {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    const docInput = Array.from(fileInputs).find(input => input.getAttribute('name') === 'document');
    expect(docInput).toBeTruthy();
    expect(docInput.getAttribute('accept')).toBe('.pdf,.doc');
  });

  test('photo file input exists with multiple', () => {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    const photoInput = Array.from(fileInputs).find(input => input.getAttribute('name') === 'photo');
    expect(photoInput).toBeTruthy();
    expect(photoInput.hasAttribute('multiple')).toBe(true);
  });

  test('color input exists', () => {
    const colorInput = document.querySelector('input[type="color"]');
    expect(colorInput).toBeTruthy();
    expect(colorInput.getAttribute('name')).toBe('themeColor');
    expect(colorInput.getAttribute('value')).toBe('#ff0000');
  });

  test('submit button exists', () => {
    const button = document.querySelector('button[type="submit"]');
    expect(button).toBeTruthy();
    expect(button.textContent).toBe('Upload');
  });
});`,
    allowedFiles: ['html'],
    difficulty: 'medium',
    tags: ['HTML', 'Forms', 'File', 'Color']
  },

  // 4. Range and Search Inputs
  {
    title: "HTML Forms - Range and Search Inputs",
    problemStatement: "Create a form with range slider and search input.",
    requirements: [
      "Create an input with type='range', name='volume', min='0', max='100', value='50'",
      "Create a label for the range input with text 'Volume'",
      "Create an input with type='search', name='query', placeholder='Search...'",
      "Create an input with type='url', name='website', placeholder='https://example.com'"
    ],
    acceptanceCriteria: [
      "Range input exists with min, max, and value",
      "Search input exists with placeholder",
      "URL input exists with placeholder",
      "Label for range exists"
    ],
    jestTestFile: `describe('HTML Range and Search Inputs', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });

  test('range input exists', () => {
    const rangeInput = document.querySelector('input[type="range"]');
    expect(rangeInput).toBeTruthy();
    expect(rangeInput.getAttribute('name')).toBe('volume');
    expect(rangeInput.getAttribute('min')).toBe('0');
    expect(rangeInput.getAttribute('max')).toBe('100');
    expect(rangeInput.getAttribute('value')).toBe('50');
  });

  test('search input exists', () => {
    const searchInput = document.querySelector('input[type="search"]');
    expect(searchInput).toBeTruthy();
    expect(searchInput.getAttribute('name')).toBe('query');
    expect(searchInput.getAttribute('placeholder')).toBe('Search...');
  });

  test('url input exists', () => {
    const urlInput = document.querySelector('input[type="url"]');
    expect(urlInput).toBeTruthy();
    expect(urlInput.getAttribute('name')).toBe('website');
  });

  test('label exists', () => {
    const labels = document.querySelectorAll('label');
    const volumeLabel = Array.from(labels).find(label => label.textContent === 'Volume');
    expect(volumeLabel).toBeTruthy();
  });
});`,
    allowedFiles: ['html'],
    difficulty: 'medium',
    tags: ['HTML', 'Forms', 'Range', 'Search', 'URL']
  },

  // 5. Required and Disabled Attributes
  {
    title: "HTML Forms - Required and Disabled Attributes",
    problemStatement: "Create a form demonstrating required and disabled attributes.",
    requirements: [
      "Create an input with type='text', name='fullname', required",
      "Create an input with type='email', name='email', required",
      "Create an input with type='text', name='username', value='admin', disabled",
      "Create a button with type='submit' and text 'Register'"
    ],
    acceptanceCriteria: [
      "Required inputs have required attribute",
      "Disabled input has disabled attribute and value",
      "Submit button exists"
    ],
    jestTestFile: `describe('HTML Required and Disabled', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });

  test('required text input exists', () => {
    const textInput = document.querySelector('input[name="fullname"]');
    expect(textInput).toBeTruthy();
    expect(textInput.hasAttribute('required')).toBe(true);
  });

  test('required email input exists', () => {
    const emailInput = document.querySelector('input[type="email"]');
    expect(emailInput).toBeTruthy();
    expect(emailInput.hasAttribute('required')).toBe(true);
  });

  test('disabled input exists', () => {
    const disabledInput = document.querySelector('input[name="username"]');
    expect(disabledInput).toBeTruthy();
    expect(disabledInput.hasAttribute('disabled')).toBe(true);
    expect(disabledInput.getAttribute('value')).toBe('admin');
  });

  test('submit button exists', () => {
    const button = document.querySelector('button[type="submit"]');
    expect(button).toBeTruthy();
    expect(button.textContent).toBe('Register');
  });
});`,
    allowedFiles: ['html'],
    difficulty: 'medium',
    tags: ['HTML', 'Forms', 'Required', 'Disabled', 'Validation']
  },

  // 6. Fieldset and Legend
  {
    title: "HTML Forms - Fieldset and Legend",
    problemStatement: "Create a form using fieldset and legend for grouping.",
    requirements: [
      "Create a form with id='userInfo'",
      "Add a fieldset with legend 'Personal Information'",
      "Inside fieldset, add input with type='text', name='firstname', placeholder='First Name'",
      "Add input with type='text', name='lastname', placeholder='Last Name'",
      "Add another fieldset with legend 'Contact Details'",
      "Inside second fieldset, add input with type='tel', name='phone', placeholder='Phone Number'"
    ],
    acceptanceCriteria: [
      "Two fieldsets exist with legends",
      "Inputs are properly grouped inside fieldsets",
      "Phone input has correct type"
    ],
    jestTestFile: `describe('HTML Fieldset and Legend', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });

  test('form exists', () => {
    const form = document.getElementById('userInfo');
    expect(form).toBeTruthy();
  });

  test('first fieldset exists', () => {
    const fieldsets = document.querySelectorAll('fieldset');
    expect(fieldsets.length).toBe(2);
    const legend1 = fieldsets[0].querySelector('legend');
    expect(legend1).toBeTruthy();
    expect(legend1.textContent).toBe('Personal Information');
  });

  test('personal info inputs exist', () => {
    const firstname = document.querySelector('input[name="firstname"]');
    expect(firstname).toBeTruthy();
    const lastname = document.querySelector('input[name="lastname"]');
    expect(lastname).toBeTruthy();
  });

  test('second fieldset exists', () => {
    const fieldsets = document.querySelectorAll('fieldset');
    const legend2 = fieldsets[1].querySelector('legend');
    expect(legend2).toBeTruthy();
    expect(legend2.textContent).toBe('Contact Details');
  });

  test('phone input exists', () => {
    const phone = document.querySelector('input[type="tel"]');
    expect(phone).toBeTruthy();
    expect(phone.getAttribute('name')).toBe('phone');
  });
});`,
    allowedFiles: ['html'],
    difficulty: 'medium',
    tags: ['HTML', 'Forms', 'Fieldset', 'Legend', 'Grouping']
  },

  // 7. Complete Registration Form
  {
    title: "HTML Forms - Complete Registration Form",
    problemStatement: "Create a comprehensive registration form with various input types.",
    requirements: [
      "Create a form with id='registration'",
      "Add input type='text' name='username' required",
      "Add input type='email' name='email' required",
      "Add input type='password' name='password' required",
      "Add select name='country' with options 'USA', 'UK', 'India'",
      "Add textarea name='bio' placeholder='Tell us about yourself'",
      "Add checkbox input name='terms' required with label 'I agree to terms'",
      "Add button type='submit' text 'Sign Up'"
    ],
    acceptanceCriteria: [
      "All input types exist with correct attributes",
      "Required fields have required attribute",
      "Select has 3 options",
      "Terms checkbox is required"
    ],
    jestTestFile: `describe('HTML Complete Registration Form', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });

  test('form exists', () => {
    const form = document.getElementById('registration');
    expect(form).toBeTruthy();
  });

  test('required inputs exist', () => {
    const username = document.querySelector('input[name="username"]');
    expect(username).toBeTruthy();
    expect(username.hasAttribute('required')).toBe(true);
    
    const email = document.querySelector('input[type="email"]');
    expect(email).toBeTruthy();
    expect(email.hasAttribute('required')).toBe(true);
    
    const password = document.querySelector('input[type="password"]');
    expect(password).toBeTruthy();
    expect(password.hasAttribute('required')).toBe(true);
  });

  test('select exists with options', () => {
    const select = document.querySelector('select[name="country"]');
    expect(select).toBeTruthy();
    const options = select.querySelectorAll('option');
    expect(options.length).toBe(3);
  });

  test('textarea exists', () => {
    const textarea = document.querySelector('textarea[name="bio"]');
    expect(textarea).toBeTruthy();
  });

  test('terms checkbox exists', () => {
    const terms = document.querySelector('input[name="terms"]');
    expect(terms).toBeTruthy();
    expect(terms.getAttribute('type')).toBe('checkbox');
    expect(terms.hasAttribute('required')).toBe(true);
  });

  test('submit button exists', () => {
    const button = document.querySelector('button[type="submit"]');
    expect(button).toBeTruthy();
    expect(button.textContent).toBe('Sign Up');
  });
});`,
    allowedFiles: ['html'],
    difficulty: 'hard',
    tags: ['HTML', 'Forms', 'Complete', 'Registration']
  }
];

async function seedFormQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const tenant = await Tenant.findOne();
    const instructor = await Instructor.findOne();

    if (!tenant || !instructor) {
      console.error('Tenant or Instructor not found');
      process.exit(1);
    }

    for (const questionData of formQuestions) {
      const question = await FrontendQuestion.create({
        ...questionData,
        defaultFiles: {
          html: `<!DOCTYPE html>
<html>
<head>
  <title>${questionData.title}</title>
</head>
<body>
  <!-- Create your form here -->
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

    console.log('\nAll form questions created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedFormQuestions();
