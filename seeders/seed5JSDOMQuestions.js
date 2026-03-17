require('dotenv').config();
const mongoose = require('mongoose');
const FrontendQuestion = require('../models/FrontendQuestion');
const Tenant = require('../models/Tenant');
const Instructor = require('../models/Instructor');

const jsQuestions = [
  {
    title: 'DOM Manipulation - Render User List',
    problemStatement: 'Fetch user data from data.js and dynamically render a user list in the DOM. Implement features to display user information, filter users, and handle user interactions like viewing details and deleting users.',
    requirements: [
      'Import user data from data.js file',
      'Create a function to render users as HTML elements',
      'Display user name, email, and phone in a list format',
      'Create a container div with id="userContainer"',
      'Add each user as a card/item with class="user-card"',
      'Include a delete button for each user with class="delete-btn"',
      'Implement delete functionality to remove user from DOM',
      'Add a filter input to search users by name',
      'Implement real-time filtering as user types',
      'Display total user count'
    ],
    acceptanceCriteria: [
      'User data is imported correctly',
      'Users are rendered in DOM',
      'User information is displayed',
      'Container exists with correct id',
      'User cards have correct class',
      'Delete buttons exist',
      'Delete functionality works',
      'Filter input exists',
      'Filtering works in real-time',
      'User count is displayed'
    ],
    jestTestFile: `test('user container exists', () => {
    const container = document.getElementById('userContainer');
    expect(container).toBeTruthy();
  });

  test('users are rendered in DOM', () => {
    const userCards = document.querySelectorAll('.user-card');
    expect(userCards.length).toBeGreaterThan(0);
  });

  test('user information is displayed', () => {
    const userCards = document.querySelectorAll('.user-card');
    let contentCount = 0;
    userCards.forEach(card => {
      if (card.textContent.trim().length > 0) {
        contentCount++;
      }
    });
    expect(contentCount).toBeGreaterThan(0);
  });

  test('delete buttons exist for each user', () => {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    expect(deleteButtons.length).toBeGreaterThan(0);
  });

  test('delete functionality removes user', () => {
    const initialCount = document.querySelectorAll('.user-card').length;
    const deleteBtn = document.querySelector('.delete-btn');
    if (deleteBtn) {
      deleteBtn.click();
      const finalCount = document.querySelectorAll('.user-card').length;
      expect(finalCount).toBeLessThanOrEqual(initialCount);
    }
  });

  test('filter input exists', () => {
    const filterInput = document.getElementById('filterInput');
    expect(filterInput).toBeTruthy();
  });

  test('filtering works by name', () => {
    const filterInput = document.getElementById('filterInput');
    const initialCards = document.querySelectorAll('.user-card').length;
    filterInput.value = 'John';
    filterInput.dispatchEvent(new Event('input'));
    const filteredCards = document.querySelectorAll('.user-card').length;
    expect(filteredCards).toBeLessThanOrEqual(initialCards);
  });

  test('user count is displayed', () => {
    const userCount = document.getElementById('userCount');
    expect(userCount.textContent).toContain('Total Users');
  });

  test('data structure is correct', () => {
    const renderedUsers = document.querySelectorAll('.user-card');
    expect(renderedUsers.length).toBeGreaterThan(0);
    expect(typeof users).toBe('object');
    expect(Array.isArray(users)).toBe(true);
    if (users.length > 0) {
      expect(users[0].name).toBeTruthy();
      expect(users[0].email).toBeTruthy();
    }
  });

  test('users array has data', () => {
    expect(users.length).toBeGreaterThan(0);
  });`,
    defaultFiles: {
      html: '',
      css: '',
      js: '',
      dataJs: `const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '555-0101' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '555-0102' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '555-0103' },
  { id: 4, name: 'Alice Williams', email: 'alice@example.com', phone: '555-0104' },
  { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', phone: '555-0105' },
  { id: 6, name: 'Diana Prince', email: 'diana@example.com', phone: '555-0106' },
  { id: 7, name: 'Eve Davis', email: 'eve@example.com', phone: '555-0107' },
  { id: 8, name: 'Frank Miller', email: 'frank@example.com', phone: '555-0108' }
];`
    },
    allowedFiles: ['html', 'css', 'js', 'data.js'],
    expectedOutput: 'A dynamic user list rendered from data.js with filtering, deletion, and user count display functionality.',
    difficulty: 'medium',
    tags: ['JavaScript', 'DOM', 'Data Rendering', 'Event Handling', 'Filtering', 'Users'],
    tenant: null,
    createdBy: null,
    isActive: true
  },
  {
    title: 'DOM Manipulation - Product Catalog with Cart',
    problemStatement: 'Create a product catalog from data.js and implement shopping cart functionality. Display products with images, prices, and descriptions. Allow users to add/remove items from cart and calculate total price.',
    requirements: [
      'Import product data from data.js file',
      'Create product grid/list display with class="product-item"',
      'Display product name, price, description, and image',
      'Add "Add to Cart" button for each product',
      'Create shopping cart section with id="cartContainer"',
      'Display cart items with quantity controls',
      'Implement add to cart functionality',
      'Implement remove from cart functionality',
      'Calculate and display total price',
      'Update cart count badge'
    ],
    acceptanceCriteria: [
      'Product data is imported',
      'Products are displayed',
      'Product information is visible',
      'Add to cart buttons exist',
      'Cart container exists',
      'Cart items are displayed',
      'Add to cart works',
      'Remove from cart works',
      'Total price is calculated',
      'Cart count updates'
    ],
    jestTestFile: `test('product container exists', () => {
    const container = document.getElementById('productContainer');
    expect(container).toBeTruthy();
  });

  test('products are displayed', () => {
    const products = document.querySelectorAll('.product-item');
    expect(products.length).toBeGreaterThan(0);
  });

  test('product information is visible', () => {
    const products = document.querySelectorAll('.product-item');
    let contentCount = 0;
    products.forEach(product => {
      if (product.textContent.trim().length > 0) {
        contentCount++;
      }
    });
    expect(contentCount).toBeGreaterThan(0);
  });

  test('add to cart buttons exist', () => {
    const addButtons = document.querySelectorAll('.add-to-cart-btn');
    expect(addButtons.length).toBeGreaterThan(0);
  });

  test('add to cart functionality works', () => {
    const addButton = document.querySelector('.add-to-cart-btn');
    if (addButton) {
      addButton.click();
      const cartItems = document.querySelectorAll('#cartItems > *');
      expect(cartItems.length).toBeGreaterThanOrEqual(0);
    }
  });

  test('cart total is calculated', () => {
    const cartTotal = document.getElementById('cartTotal');
    expect(cartTotal).toBeTruthy();
    expect(cartTotal.textContent).toContain('$');
  });

  test('cart count updates', () => {
    const cartCount = document.getElementById('cartCount');
    expect(cartCount).toBeTruthy();
    expect(cartCount.textContent).toContain('Items');
  });

  test('remove from cart button exists', () => {
    const removeButtons = document.querySelectorAll('.remove-from-cart-btn');
    expect(removeButtons.length).toBeGreaterThan(0);
  });

  test('product data structure is correct', () => {
    const renderedProducts = document.querySelectorAll('.product-item');
    expect(renderedProducts.length).toBeGreaterThan(0);
    expect(typeof products).toBe('object');
    expect(Array.isArray(products)).toBe(true);
    if (products.length > 0) {
      expect(products[0].name).toBeTruthy();
      expect(products[0].price).toBeTruthy();
    }
  });

  test('cart functionality is implemented', () => {
    expect(document.getElementById('cartContainer')).toBeTruthy();
    expect(document.getElementById('cartItems')).toBeTruthy();
    expect(document.getElementById('cartTotal')).toBeTruthy();
  });`,
    defaultFiles: {
      html: '',
      css: '',
      js: '',
      dataJs: `const products = [
  { id: 1, name: 'Laptop', price: 999.99, description: 'High-performance laptop', image: 'laptop.jpg' },
  { id: 2, name: 'Mouse', price: 29.99, description: 'Wireless mouse', image: 'mouse.jpg' },
  { id: 3, name: 'Keyboard', price: 79.99, description: 'Mechanical keyboard', image: 'keyboard.jpg' },
  { id: 4, name: 'Monitor', price: 299.99, description: '4K Monitor', image: 'monitor.jpg' },
  { id: 5, name: 'Headphones', price: 149.99, description: 'Noise-cancelling headphones', image: 'headphones.jpg' },
  { id: 6, name: 'Webcam', price: 89.99, description: '1080p Webcam', image: 'webcam.jpg' },
  { id: 7, name: 'USB Hub', price: 39.99, description: '7-port USB hub', image: 'usb-hub.jpg' },
  { id: 8, name: 'Desk Lamp', price: 49.99, description: 'LED desk lamp', image: 'lamp.jpg' }
];`
    },
    allowedFiles: ['html', 'css', 'js', 'data.js'],
    expectedOutput: 'A product catalog with shopping cart functionality including add/remove items, quantity controls, and total price calculation.',
    difficulty: 'hard',
    tags: ['JavaScript', 'DOM', 'E-commerce', 'Cart', 'Event Handling', 'Products'],
    tenant: null,
    createdBy: null,
    isActive: true
  },
  {
    title: 'DOM Manipulation - Todo List with Local Storage',
    problemStatement: 'Build an interactive todo list application using data.js. Implement add, edit, delete, and mark complete functionality. Persist data to localStorage and load on page refresh.',
    requirements: [
      'Import todo data from data.js file',
      'Create todo list display with class="todo-item"',
      'Display todo text, due date, and priority',
      'Add input field to create new todos',
      'Implement add todo functionality',
      'Add delete button for each todo',
      'Implement delete functionality',
      'Add checkbox to mark todos as complete',
      'Implement complete/incomplete toggle',
      'Save todos to localStorage',
      'Load todos from localStorage on page load',
      'Filter todos by status (all, active, completed)'
    ],
    acceptanceCriteria: [
      'Todo data is imported',
      'Todos are displayed',
      'Todo information is visible',
      'Add todo input exists',
      'Add todo works',
      'Delete buttons exist',
      'Delete works',
      'Checkboxes exist',
      'Complete toggle works',
      'localStorage is used'
    ],
    jestTestFile: `test('todo container exists', () => {
    const container = document.getElementById('todoContainer');
    expect(container).toBeTruthy();
  });

  test('todos are displayed', () => {
    const todos = document.querySelectorAll('.todo-item');
    expect(todos.length).toBeGreaterThanOrEqual(0);
  });

  test('add todo input exists', () => {
    const input = document.getElementById('todoInput');
    expect(input).toBeTruthy();
  });

  test('add todo button exists', () => {
    const button = document.getElementById('addTodoBtn');
    expect(button).toBeTruthy();
  });

  test('add todo functionality works', () => {
    const input = document.getElementById('todoInput');
    const button = document.getElementById('addTodoBtn');
    const initialCount = document.querySelectorAll('.todo-item').length;
    input.value = 'New Todo';
    button.click();
    const finalCount = document.querySelectorAll('.todo-item').length;
    expect(finalCount).toBeGreaterThanOrEqual(initialCount);
  });

  test('delete buttons exist', () => {
    const deleteButtons = document.querySelectorAll('.delete-todo-btn');
    expect(deleteButtons.length).toBeGreaterThan(0);
  });

  test('complete checkbox exists', () => {
    const checkboxes = document.querySelectorAll('.todo-checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);
  });

  test('todo stats are displayed', () => {
    const totalTodos = document.getElementById('totalTodos');
    const completedTodos = document.getElementById('completedTodos');
    expect(totalTodos).toBeTruthy();
    expect(completedTodos).toBeTruthy();
  });

  test('todo data structure is correct', () => {
    const renderedTodos = document.querySelectorAll('.todo-item');
    expect(renderedTodos.length).toBeGreaterThan(0);
    expect(typeof todos).toBe('object');
    expect(Array.isArray(todos)).toBe(true);
    if (todos.length > 0) {
      expect(todos[0].text).toBeTruthy();
    }
  });

  test('todos array has data', () => {
    expect(todos.length).toBeGreaterThan(0);
  });`,
    defaultFiles: {
      html: '',
      css: '',
      js: '',
      dataJs: `const todos = [
  { id: 1, text: 'Learn JavaScript', completed: false, dueDate: '2024-03-15', priority: 'high' },
  { id: 2, text: 'Build a project', completed: false, dueDate: '2024-03-20', priority: 'high' },
  { id: 3, text: 'Review CSS', completed: true, dueDate: '2024-03-10', priority: 'medium' },
  { id: 4, text: 'Practice DOM manipulation', completed: false, dueDate: '2024-03-18', priority: 'high' },
  { id: 5, text: 'Read documentation', completed: false, dueDate: '2024-03-25', priority: 'low' },
  { id: 6, text: 'Complete assignment', completed: true, dueDate: '2024-03-12', priority: 'high' },
  { id: 7, text: 'Debug code', completed: false, dueDate: '2024-03-17', priority: 'medium' },
  { id: 8, text: 'Deploy application', completed: false, dueDate: '2024-03-30', priority: 'high' }
];`
    },
    allowedFiles: ['html', 'css', 'js', 'data.js'],
    expectedOutput: 'An interactive todo list with add, delete, complete/incomplete toggle, filtering, and localStorage persistence.',
    difficulty: 'hard',
    tags: ['JavaScript', 'DOM', 'Todo List', 'localStorage', 'Event Handling', 'Data Persistence'],
    tenant: null,
    createdBy: null,
    isActive: true
  },
  {
    title: 'DOM Manipulation - Student Grade Dashboard',
    problemStatement: 'Create a student grade dashboard from data.js displaying student information, grades, and statistics. Implement sorting, filtering, and grade calculation features with dynamic DOM updates.',
    requirements: [
      'Import student data from data.js file',
      'Create student table/grid with class="student-row"',
      'Display student name, ID, grades, and average',
      'Calculate average grade for each student',
      'Implement sorting by name, ID, or average grade',
      'Add filter by grade range (A, B, C, D, F)',
      'Display class statistics (average, highest, lowest)',
      'Highlight students with grades below threshold',
      'Add search functionality by student name',
      'Update DOM dynamically on filter/sort changes'
    ],
    acceptanceCriteria: [
      'Student data is imported',
      'Students are displayed',
      'Student information is visible',
      'Average grade is calculated',
      'Sorting works',
      'Filtering works',
      'Statistics are displayed',
      'Search works',
      'DOM updates dynamically',
      'Highlighting works'
    ],
    jestTestFile: `test('dashboard container exists', () => {
    const container = document.getElementById('dashboardContainer');
    expect(container).toBeTruthy();
  });

  test('students are displayed', () => {
    const students = document.querySelectorAll('.student-row');
    expect(students.length).toBeGreaterThan(0);
  });

  test('student information is visible', () => {
    const students = document.querySelectorAll('.student-row');
    let contentCount = 0;
    students.forEach(student => {
      if (student.textContent.trim().length > 0) {
        contentCount++;
      }
    });
    expect(contentCount).toBeGreaterThan(0);
  });

  test('search input exists', () => {
    const searchInput = document.getElementById('searchInput');
    expect(searchInput).toBeTruthy();
  });

  test('search functionality works', () => {
    const searchInput = document.getElementById('searchInput');
    const initialCount = document.querySelectorAll('.student-row').length;
    searchInput.value = 'John';
    searchInput.dispatchEvent(new Event('input'));
    const filteredCount = document.querySelectorAll('.student-row').length;
    expect(filteredCount).toBeLessThanOrEqual(initialCount);
  });

  test('filter dropdown exists', () => {
    const filterSelect = document.getElementById('filterGrade');
    expect(filterSelect).toBeTruthy();
  });

  test('sort button exists', () => {
    const sortBtn = document.getElementById('sortBtn');
    expect(sortBtn).toBeTruthy();
  });

  test('statistics container exists', () => {
    const statistics = document.getElementById('statistics');
    expect(statistics).toBeTruthy();
  });

  test('student data structure is correct', () => {
    const renderedStudents = document.querySelectorAll('.student-row');
    expect(renderedStudents.length).toBeGreaterThan(0);
    expect(typeof students).toBe('object');
    expect(Array.isArray(students)).toBe(true);
    if (students.length > 0) {
      expect(students[0].name).toBeTruthy();
      expect(students[0].grades).toBeTruthy();
    }
  });

  test('students array has data', () => {
    expect(students.length).toBeGreaterThan(0);
  });`,
    defaultFiles: {
      html: '',
      css: '',
      js: '',
      dataJs: `const students = [
  { id: 1, name: 'John Smith', grades: [85, 90, 88, 92], email: 'john@school.com' },
  { id: 2, name: 'Jane Doe', grades: [95, 92, 94, 96], email: 'jane@school.com' },
  { id: 3, name: 'Bob Johnson', grades: [78, 82, 80, 85], email: 'bob@school.com' },
  { id: 4, name: 'Alice Williams', grades: [88, 91, 89, 90], email: 'alice@school.com' },
  { id: 5, name: 'Charlie Brown', grades: [72, 75, 78, 80], email: 'charlie@school.com' },
  { id: 6, name: 'Diana Prince', grades: [92, 94, 93, 95], email: 'diana@school.com' },
  { id: 7, name: 'Eve Davis', grades: [85, 87, 86, 88], email: 'eve@school.com' },
  { id: 8, name: 'Frank Miller', grades: [80, 83, 82, 85], email: 'frank@school.com' }
];`
    },
    allowedFiles: ['html', 'css', 'js', 'data.js'],
    expectedOutput: 'A student grade dashboard with sorting, filtering, search, statistics calculation, and dynamic DOM updates.',
    difficulty: 'hard',
    tags: ['JavaScript', 'DOM', 'Data Analysis', 'Sorting', 'Filtering', 'Students', 'Grades'],
    tenant: null,
    createdBy: null,
    isActive: true
  },
  {
    title: 'DOM Manipulation - Employee Management System',
    problemStatement: 'Build an employee management system from data.js with features to display, add, edit, and delete employee records. Implement department filtering, salary calculations, and employee status management.',
    requirements: [
      'Import employee data from data.js file',
      'Create employee list display with class="employee-card"',
      'Display employee name, ID, department, salary, and status',
      'Add form to create new employees',
      'Implement add employee functionality',
      'Add edit button for each employee',
      'Implement edit functionality',
      'Add delete button for each employee',
      'Implement delete functionality',
      'Filter employees by department',
      'Calculate total payroll',
      'Display employee count by department'
    ],
    acceptanceCriteria: [
      'Employee data is imported',
      'Employees are displayed',
      'Employee information is visible',
      'Add form exists',
      'Add employee works',
      'Edit buttons exist',
      'Edit functionality works',
      'Delete buttons exist',
      'Delete works',
      'Filtering works'
    ],
    jestTestFile: `test('employee container exists', () => {
    const container = document.getElementById('employeeContainer');
    expect(container).toBeTruthy();
  });

  test('employees are displayed', () => {
    const employees = document.querySelectorAll('.employee-card');
    expect(employees.length).toBeGreaterThan(0);
  });

  test('employee information is visible', () => {
    const employees = document.querySelectorAll('.employee-card');
    let contentCount = 0;
    employees.forEach(emp => {
      if (emp.textContent.trim().length > 0) {
        contentCount++;
      }
    });
    expect(contentCount).toBeGreaterThan(0);
  });

  test('add employee form exists', () => {
    const form = document.getElementById('addEmployeeForm');
    expect(form).toBeTruthy();
  });

  test('edit buttons exist', () => {
    const editButtons = document.querySelectorAll('.edit-emp-btn');
    expect(editButtons.length).toBeGreaterThan(0);
  });

  test('delete buttons exist', () => {
    const deleteButtons = document.querySelectorAll('.delete-emp-btn');
    expect(deleteButtons.length).toBeGreaterThan(0);
  });

  test('department filter exists', () => {
    const filter = document.getElementById('deptFilter');
    expect(filter).toBeTruthy();
  });

  test('payroll statistics are displayed', () => {
    const stats = document.getElementById('payrollStats');
    expect(stats).toBeTruthy();
    expect(stats.textContent).toContain('Payroll');
  });

  test('employee data structure is correct', () => {
    const renderedEmployees = document.querySelectorAll('.employee-card');
    expect(renderedEmployees.length).toBeGreaterThan(0);
    expect(typeof employees).toBe('object');
    expect(Array.isArray(employees)).toBe(true);
    if (employees.length > 0) {
      expect(employees[0].name).toBeTruthy();
      expect(employees[0].department).toBeTruthy();
    }
  });

  test('employees array has data', () => {
    expect(employees.length).toBeGreaterThan(0);
  });`,
    defaultFiles: {
      html: '',
      css: '',
      js: '',
      dataJs: `const employees = [
  { id: 1, name: 'John Smith', department: 'IT', salary: 75000, status: 'active', email: 'john@company.com' },
  { id: 2, name: 'Jane Doe', department: 'HR', salary: 65000, status: 'active', email: 'jane@company.com' },
  { id: 3, name: 'Bob Johnson', department: 'Sales', salary: 70000, status: 'active', email: 'bob@company.com' },
  { id: 4, name: 'Alice Williams', department: 'IT', salary: 80000, status: 'active', email: 'alice@company.com' },
  { id: 5, name: 'Charlie Brown', department: 'Finance', salary: 72000, status: 'inactive', email: 'charlie@company.com' },
  { id: 6, name: 'Diana Prince', department: 'HR', salary: 68000, status: 'active', email: 'diana@company.com' },
  { id: 7, name: 'Eve Davis', department: 'IT', salary: 78000, status: 'active', email: 'eve@company.com' },
  { id: 8, name: 'Frank Miller', department: 'Sales', salary: 71000, status: 'active', email: 'frank@company.com' }
];`
    },
    allowedFiles: ['html', 'css', 'js', 'data.js'],
    expectedOutput: 'An employee management system with add, edit, delete functionality, department filtering, and payroll calculations.',
    difficulty: 'hard',
    tags: ['JavaScript', 'DOM', 'Employee Management', 'CRUD', 'Filtering', 'Data Management'],
    tenant: null,
    createdBy: null,
    isActive: true
  }
];

async function seed5JSQuestions() {
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
    await FrontendQuestion.deleteMany({ title: { $in: jsQuestions.map(q => q.title) } });
    console.log('Deleted existing JavaScript questions');

    for (const question of jsQuestions) {
      await FrontendQuestion.create({
        ...question,
        tenant: tenant._id,
        createdBy: instructor._id
      });
      console.log(`✓ Created: ${question.title}`);
    }

    console.log(`\n✓ All ${jsQuestions.length} JavaScript DOM questions created successfully!`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seed5JSQuestions();
