require('dotenv').config();
const mongoose = require('mongoose');
const FrontendQuestion = require('../models/FrontendQuestion');
const Tenant = require('../models/Tenant');
const Instructor = require('../models/Instructor');

const tableQuestions = [
  // 1. Table with Caption
  {
    title: "HTML Tables - Table with Caption",
    problemStatement: "Create a table with a caption and basic structure.",
    requirements: [
      "Create a table element",
      "Add a caption with text 'Student Grades'",
      "Add thead with tr containing th: 'Name', 'Subject', 'Grade'",
      "Add tbody with one tr containing td: 'Alice', 'Math', 'A'"
    ],
    acceptanceCriteria: [
      "Table exists with caption",
      "Caption text is correct",
      "Header row has 3 columns",
      "Data row exists with correct content"
    ],
    jestTestFile: `describe('HTML Table with Caption', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });

  test('table exists', () => {
    const table = document.querySelector('table');
    expect(table).toBeTruthy();
  });

  test('caption exists', () => {
    const caption = document.querySelector('caption');
    expect(caption).toBeTruthy();
    expect(caption.textContent).toBe('Student Grades');
  });

  test('header row exists', () => {
    const headers = document.querySelectorAll('th');
    expect(headers.length).toBe(3);
    expect(headers[0].textContent).toBe('Name');
    expect(headers[1].textContent).toBe('Subject');
    expect(headers[2].textContent).toBe('Grade');
  });

  test('data row exists', () => {
    const tbody = document.querySelector('tbody');
    expect(tbody).toBeTruthy();
    const cells = tbody.querySelectorAll('td');
    expect(cells[0].textContent).toBe('Alice');
    expect(cells[1].textContent).toBe('Math');
    expect(cells[2].textContent).toBe('A');
  });
});`,
    allowedFiles: ['html'],
    difficulty: 'easy',
    tags: ['HTML', 'Tables', 'Caption']
  },

  // 2. Table with Colspan
  {
    title: "HTML Tables - Colspan",
    problemStatement: "Create a table demonstrating colspan attribute.",
    requirements: [
      "Create a table element",
      "Add thead with tr containing th with colspan='3' and text 'Product Information'",
      "Add second tr in thead with th: 'Name', 'Price', 'Stock'",
      "Add tbody with tr containing td: 'Laptop', '$999', 'In Stock'"
    ],
    acceptanceCriteria: [
      "First header cell spans 3 columns",
      "Second header row has 3 separate columns",
      "Data row exists with correct content"
    ],
    jestTestFile: `describe('HTML Table Colspan', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });

  test('table exists', () => {
    const table = document.querySelector('table');
    expect(table).toBeTruthy();
  });

  test('colspan header exists', () => {
    const thead = document.querySelector('thead');
    const rows = thead.querySelectorAll('tr');
    expect(rows.length).toBe(2);
    const firstHeader = rows[0].querySelector('th');
    expect(firstHeader.getAttribute('colspan')).toBe('3');
    expect(firstHeader.textContent).toBe('Product Information');
  });

  test('second header row exists', () => {
    const thead = document.querySelector('thead');
    const rows = thead.querySelectorAll('tr');
    const headers = rows[1].querySelectorAll('th');
    expect(headers.length).toBe(3);
    expect(headers[0].textContent).toBe('Name');
    expect(headers[1].textContent).toBe('Price');
    expect(headers[2].textContent).toBe('Stock');
  });

  test('data row exists', () => {
    const tbody = document.querySelector('tbody');
    const cells = tbody.querySelectorAll('td');
    expect(cells[0].textContent).toBe('Laptop');
    expect(cells[1].textContent).toBe('$999');
    expect(cells[2].textContent).toBe('In Stock');
  });
});`,
    allowedFiles: ['html'],
    difficulty: 'medium',
    tags: ['HTML', 'Tables', 'Colspan']
  },

  // 3. Table with Rowspan
  {
    title: "HTML Tables - Rowspan",
    problemStatement: "Create a table demonstrating rowspan attribute.",
    requirements: [
      "Create a table with thead containing th: 'Department', 'Employee', 'Role'",
      "Add tbody with first tr: td with rowspan='2' text 'Sales', td 'John', td 'Manager'",
      "Add second tr (without Department cell): td 'Jane', td 'Executive'"
    ],
    acceptanceCriteria: [
      "First data cell spans 2 rows",
      "Second row has only 2 cells",
      "All content is correct"
    ],
    jestTestFile: `describe('HTML Table Rowspan', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });

  test('table exists with headers', () => {
    const table = document.querySelector('table');
    expect(table).toBeTruthy();
    const headers = document.querySelectorAll('th');
    expect(headers.length).toBe(3);
    expect(headers[0].textContent).toBe('Department');
    expect(headers[1].textContent).toBe('Employee');
    expect(headers[2].textContent).toBe('Role');
  });

  test('rowspan cell exists', () => {
    const tbody = document.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    expect(rows.length).toBe(2);
    const firstRowCells = rows[0].querySelectorAll('td');
    expect(firstRowCells[0].getAttribute('rowspan')).toBe('2');
    expect(firstRowCells[0].textContent).toBe('Sales');
    expect(firstRowCells[1].textContent).toBe('John');
    expect(firstRowCells[2].textContent).toBe('Manager');
  });

  test('second row has correct cells', () => {
    const tbody = document.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    const secondRowCells = rows[1].querySelectorAll('td');
    expect(secondRowCells.length).toBe(2);
    expect(secondRowCells[0].textContent).toBe('Jane');
    expect(secondRowCells[1].textContent).toBe('Executive');
  });
});`,
    allowedFiles: ['html'],
    difficulty: 'medium',
    tags: ['HTML', 'Tables', 'Rowspan']
  },

  // 4. Table with Both Rowspan and Colspan
  {
    title: "HTML Tables - Rowspan and Colspan Combined",
    problemStatement: "Create a complex table using both rowspan and colspan.",
    requirements: [
      "Create a table element",
      "Add thead with tr: th colspan='2' text 'Schedule', th rowspan='2' text 'Room'",
      "Add second tr in thead: th 'Time', th 'Subject'",
      "Add tbody with tr: td '9 AM', td 'Math', td rowspan='2' text 'A101'",
      "Add second tr: td '10 AM', td 'Science'"
    ],
    acceptanceCriteria: [
      "Header uses both colspan and rowspan",
      "Data rows properly aligned with spanning cells",
      "All content is correct"
    ],
    jestTestFile: `describe('HTML Table Rowspan and Colspan', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });

  test('table exists', () => {
    const table = document.querySelector('table');
    expect(table).toBeTruthy();
  });

  test('header has colspan and rowspan', () => {
    const thead = document.querySelector('thead');
    const rows = thead.querySelectorAll('tr');
    expect(rows.length).toBe(2);
    const firstRowHeaders = rows[0].querySelectorAll('th');
    expect(firstRowHeaders[0].getAttribute('colspan')).toBe('2');
    expect(firstRowHeaders[0].textContent).toBe('Schedule');
    expect(firstRowHeaders[1].getAttribute('rowspan')).toBe('2');
    expect(firstRowHeaders[1].textContent).toBe('Room');
  });

  test('second header row exists', () => {
    const thead = document.querySelector('thead');
    const rows = thead.querySelectorAll('tr');
    const secondRowHeaders = rows[1].querySelectorAll('th');
    expect(secondRowHeaders.length).toBe(2);
    expect(secondRowHeaders[0].textContent).toBe('Time');
    expect(secondRowHeaders[1].textContent).toBe('Subject');
  });

  test('data rows with rowspan exist', () => {
    const tbody = document.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    expect(rows.length).toBe(2);
    const firstRowCells = rows[0].querySelectorAll('td');
    expect(firstRowCells[0].textContent).toBe('9 AM');
    expect(firstRowCells[1].textContent).toBe('Math');
    expect(firstRowCells[2].getAttribute('rowspan')).toBe('2');
    expect(firstRowCells[2].textContent).toBe('A101');
  });
});`,
    allowedFiles: ['html'],
    difficulty: 'hard',
    tags: ['HTML', 'Tables', 'Rowspan', 'Colspan', 'Complex']
  },

  // 5. Table with TFoot
  {
    title: "HTML Tables - Table with TFoot",
    problemStatement: "Create a table with thead, tbody, and tfoot sections.",
    requirements: [
      "Create a table element",
      "Add thead with tr containing th: 'Item', 'Quantity', 'Price'",
      "Add tbody with two tr: first row td 'Apple', '5', '$10', second row td 'Orange', '3', '$6'",
      "Add tfoot with tr: td colspan='2' text 'Total', td '$16'"
    ],
    acceptanceCriteria: [
      "Table has thead, tbody, and tfoot",
      "TFoot uses colspan for total row",
      "All sections have correct content"
    ],
    jestTestFile: `describe('HTML Table with TFoot', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });

  test('table structure exists', () => {
    const table = document.querySelector('table');
    expect(table).toBeTruthy();
    const thead = table.querySelector('thead');
    expect(thead).toBeTruthy();
    const tbody = table.querySelector('tbody');
    expect(tbody).toBeTruthy();
    const tfoot = table.querySelector('tfoot');
    expect(tfoot).toBeTruthy();
  });

  test('header row exists', () => {
    const headers = document.querySelectorAll('th');
    expect(headers.length).toBe(3);
    expect(headers[0].textContent).toBe('Item');
    expect(headers[1].textContent).toBe('Quantity');
    expect(headers[2].textContent).toBe('Price');
  });

  test('data rows exist', () => {
    const tbody = document.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    expect(rows.length).toBe(2);
  });

  test('footer row exists with colspan', () => {
    const tfoot = document.querySelector('tfoot');
    const cells = tfoot.querySelectorAll('td');
    expect(cells[0].getAttribute('colspan')).toBe('2');
    expect(cells[0].textContent).toBe('Total');
    expect(cells[1].textContent).toBe('$16');
  });
});`,
    allowedFiles: ['html'],
    difficulty: 'medium',
    tags: ['HTML', 'Tables', 'TFoot', 'Structure']
  },

  // 6. Nested Table
  {
    title: "HTML Tables - Nested Table",
    problemStatement: "Create a table with another table nested inside a cell.",
    requirements: [
      "Create outer table with thead: th 'Category', th 'Details'",
      "Add tbody with tr: td 'Products', td containing nested table",
      "Nested table should have tr with td 'Item 1' and td 'Item 2'"
    ],
    acceptanceCriteria: [
      "Outer table exists with correct structure",
      "Nested table exists inside a cell",
      "Nested table has correct content"
    ],
    jestTestFile: `describe('HTML Nested Table', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__HTML__;
  });

  test('outer table exists', () => {
    const tables = document.querySelectorAll('table');
    expect(tables.length).toBe(2);
  });

  test('outer table headers exist', () => {
    const headers = document.querySelectorAll('th');
    expect(headers[0].textContent).toBe('Category');
    expect(headers[1].textContent).toBe('Details');
  });

  test('nested table exists', () => {
    const tables = document.querySelectorAll('table');
    const outerTable = tables[0];
    const nestedTable = outerTable.querySelector('table');
    expect(nestedTable).toBeTruthy();
  });

  test('nested table has content', () => {
    const tables = document.querySelectorAll('table');
    const nestedTable = tables[1];
    const cells = nestedTable.querySelectorAll('td');
    expect(cells.length).toBe(2);
    expect(cells[0].textContent).toBe('Item 1');
    expect(cells[1].textContent).toBe('Item 2');
  });
});`,
    allowedFiles: ['html'],
    difficulty: 'hard',
    tags: ['HTML', 'Tables', 'Nested', 'Advanced']
  }
];

async function seedTableQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const tenant = await Tenant.findOne();
    const instructor = await Instructor.findOne();

    if (!tenant || !instructor) {
      console.error('Tenant or Instructor not found');
      process.exit(1);
    }

    for (const questionData of tableQuestions) {
      const question = await FrontendQuestion.create({
        ...questionData,
        defaultFiles: {
          html: `<!DOCTYPE html>
<html>
<head>
  <title>${questionData.title}</title>
</head>
<body>
  <!-- Create your table here -->
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

    console.log('\nAll table questions created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedTableQuestions();
