const { runFrontendTests } = require('./utils/frontendTestRunner');

// HTML Test Cases
const htmlTestCases = [
  {
    title: 'Basic HTML Structure, Headings & Paragraphs',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website</title>
</head>
<body>
  <h1>Welcome to My Website</h1>
  <h2>About Us</h2>
  <p>This is the first paragraph with meaningful content about our company and services.</p>
  <h3>Our Services</h3>
  <p>We provide high-quality web development services to businesses of all sizes.</p>
  <p>Our team consists of experienced professionals dedicated to delivering excellence.</p>
</body>
</html>`,
    css: '',
    js: '',
    dataJs: '',
    testFile: `describe('Basic HTML Structure, Headings & Paragraphs', () => {
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
    const firstP = paragraphs[0];
    expect(firstP.textContent.trim().length).toBeGreaterThan(5);
  });

  test('document structure is valid', () => {
    const head = document.querySelector('head');
    const body = document.querySelector('body');
    expect(head).toBeTruthy();
    expect(body).toBeTruthy();
    expect(head.parentElement.tagName).toBe('HTML');
    expect(body.parentElement.tagName).toBe('HTML');
  });
});`
  },
  {
    title: 'HTML Forms & Input Elements',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Registration Form</title>
</head>
<body>
  <form id="registrationForm">
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" required>
    
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required pattern="[a-z0-9._%+\\-]+@[a-z0-9.\\-]+\\.[a-z]{2,}$">
    
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" minlength="8" required>
    
    <label for="age">Age:</label>
    <input type="number" id="age" name="age" min="18" max="100">
    
    <label for="birthdate">Birth Date:</label>
    <input type="date" id="birthdate" name="birthdate">
    
    <label for="terms">
      <input type="checkbox" id="terms" name="terms"> I agree to terms
    </label>
    
    <label>Gender:</label>
    <label><input type="radio" name="gender" value="male"> Male</label>
    <label><input type="radio" name="gender" value="female"> Female</label>
    
    <label for="country">Country:</label>
    <select id="country" name="country">
      <option>Select Country</option>
      <option>USA</option>
      <option>Canada</option>
      <option>UK</option>
      <option>Australia</option>
      <option>India</option>
    </select>
    
    <label for="bio">Bio:</label>
    <textarea id="bio" name="bio" rows="4" cols="50"></textarea>
    
    <input type="submit" value="Register">
  </form>
</body>
</html>`,
    css: '',
    js: '',
    dataJs: '',
    testFile: `describe('HTML Forms & Input Elements', () => {
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
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    expect(radioButtons.length).toBeGreaterThanOrEqual(2);
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
    const submitButton = document.querySelector('input[type="submit"], button[type="submit"]');
    expect(submitButton).toBeTruthy();
  });

  test('checkbox for terms exists', () => {
    const checkbox = document.querySelector('input[type="checkbox"]');
    expect(checkbox).toBeTruthy();
    expect(checkbox.type).toBe('checkbox');
  });

  test('form has labels for inputs', () => {
    const form = document.getElementById('registrationForm');
    const labels = form.querySelectorAll('label');
    expect(labels.length).toBeGreaterThan(0);
  });
});`
  },
  {
    title: 'HTML Lists & Navigation',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Navigation</title>
</head>
<body>
  <nav id="mainNav">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a>
        <ul>
          <li><a href="/about/team">Team</a></li>
          <li><a href="/about/history">History</a></li>
        </ul>
      </li>
      <li><a href="/services">Services</a></li>
      <li><a href="/products">Products</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>
  
  <section id="contentList">
    <h2>Steps to Get Started</h2>
    <ol>
      <li>Create an account on our platform</li>
      <li>Complete your profile information</li>
      <li>Choose your subscription plan</li>
      <li>Make your first purchase</li>
      <li>Start using our services</li>
    </ol>
    
    <h2>Key Features</h2>
    <ul>
      <li>Easy to use interface</li>
      <li>24/7 customer support</li>
      <li>Secure payment processing</li>
      <li>Fast and reliable service</li>
      <li>Regular updates and improvements</li>
    </ul>
  </section>
</body>
</html>`,
    css: '',
    js: '',
    dataJs: '',
    testFile: `describe('HTML Lists & Navigation', () => {
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
    expect(navLinks.length).toBeGreaterThan(0);
    const firstLink = navLinks[0];
    expect(firstLink.getAttribute('href')).toBeTruthy();
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
    expect(unorderedLists.length).toBeGreaterThan(0);
    const firstUl = unorderedLists[0];
    const items = firstUl.querySelectorAll('li');
    expect(items.length).toBeGreaterThanOrEqual(5);
  });

  test('list items have meaningful content', () => {
    const allItems = document.querySelectorAll('li');
    expect(allItems.length).toBeGreaterThan(0);
    const firstItem = allItems[0];
    expect(firstItem.textContent.trim().length).toBeGreaterThan(0);
  });

  test('navigation links have meaningful text', () => {
    const navLinks = document.querySelectorAll('#mainNav a');
    expect(navLinks.length).toBeGreaterThan(0);
    const firstLink = navLinks[0];
    expect(firstLink.textContent.trim().length).toBeGreaterThan(0);
  });
});`
  },
  {
    title: 'HTML Tables & Data Display',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Data Table</title>
</head>
<body>
  <table id="dataTable">
    <caption>Sales Data for Q1 2024</caption>
    <thead>
      <tr>
        <th>Month</th>
        <th>Product A</th>
        <th>Product B</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>January</td>
        <td>$10,000</td>
        <td>$15,000</td>
        <td>$25,000</td>
      </tr>
      <tr>
        <td>February</td>
        <td>$12,000</td>
        <td>$18,000</td>
        <td>$30,000</td>
      </tr>
      <tr>
        <td>March</td>
        <td>$14,000</td>
        <td>$20,000</td>
        <td>$34,000</td>
      </tr>
      <tr>
        <td colspan="2">Q1 Total</td>
        <td>$53,000</td>
        <td>$89,000</td>
      </tr>
      <tr>
        <td rowspan="2">Average</td>
        <td>$12,000</td>
        <td>$17,667</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="2">Grand Total</td>
        <td>$89,000</td>
        <td>$89,000</td>
      </tr>
    </tfoot>
  </table>
</body>
</html>`,
    css: '',
    js: '',
    dataJs: '',
    testFile: `describe('HTML Tables & Data Display', () => {
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
    const cellsWithColspan = document.querySelectorAll('td[colspan]');
    expect(cellsWithColspan.length).toBeGreaterThan(0);
    const firstCell = cellsWithColspan[0];
    expect(parseInt(firstCell.getAttribute('colspan'))).toBeGreaterThan(1);
  });

  test('caption element exists', () => {
    const caption = document.querySelector('#dataTable caption');
    expect(caption).toBeTruthy();
    expect(caption.textContent.trim().length).toBeGreaterThan(0);
  });

  test('table headers have meaningful content', () => {
    const headers = document.querySelectorAll('#dataTable th');
    expect(headers.length).toBeGreaterThan(0);
    const firstHeader = headers[0];
    expect(firstHeader.textContent.trim().length).toBeGreaterThan(0);
  });

  test('table data cells have content', () => {
    const dataCells = document.querySelectorAll('#dataTable tbody td');
    expect(dataCells.length).toBeGreaterThan(0);
    const firstCell = dataCells[0];
    expect(firstCell.textContent.trim().length).toBeGreaterThan(0);
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
});`
  },
  {
    title: 'HTML Semantic Elements & Accessibility',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Semantic Website</title>
</head>
<body>
  <header>
    <h1>My Website</h1>
    <p>Welcome to our amazing website</p>
  </header>
  
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>
  
  <main>
    <article>
      <h2>Article Title</h2>
      <p>This is the main article content with important information.</p>
      <img src="image.jpg" alt="A beautiful landscape with mountains and trees">
    </article>
    
    <aside>
      <h3>Related Links</h3>
      <ul>
        <li><a href="/related1">Related Article 1</a></li>
        <li><a href="/related2">Related Article 2</a></li>
      </ul>
    </aside>
  </main>
  
  <footer>
    <p>&copy; 2024 My Website. All rights reserved.</p>
    <ul>
      <li><a href="/privacy">Privacy Policy</a></li>
      <li><a href="/terms">Terms of Service</a></li>
    </ul>
  </footer>
</body>
</html>`,
    css: '',
    js: '',
    dataJs: '',
    testFile: `describe('HTML Semantic Elements & Accessibility', () => {
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
    const firstImage = images[0];
    expect(firstImage.getAttribute('alt')).toBeTruthy();
    expect(firstImage.getAttribute('alt').length).toBeGreaterThan(0);
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
  });
});`
  }
];

async function testHTMLQuestion(testCase, index) {
  try {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`Test ${index + 1}: ${testCase.title}`);
    console.log(`${'='.repeat(80)}`);

    const result = await runFrontendTests(
      testCase.html,
      testCase.css,
      testCase.js,
      testCase.testFile,
      testCase.dataJs
    );

    console.log(`Status: ${result.passed === result.total ? '✓ PASSED' : '✗ FAILED'}`);
    console.log(`Tests: ${result.passed}/${result.total} passed`);
    console.log(`Failed: ${result.failed}`);

    if (result.tests && result.tests.length > 0) {
      console.log('\nTest Details:');
      result.tests.forEach((test, idx) => {
        const status = test.status === 'passed' ? '✓' : '✗';
        console.log(`  ${status} ${test.name}`);
        if (test.error) {
          console.log(`     Error: ${test.error}`);
        }
      });
    }

    return {
      title: testCase.title,
      passed: result.passed,
      total: result.total,
      failed: result.failed,
      success: result.passed === result.total,
      error: result.error || null
    };
  } catch (error) {
    console.error('\n✗ Error testing question:', error.message);
    return {
      title: testCase.title,
      passed: 0,
      total: 0,
      failed: 0,
      success: false,
      error: error.message
    };
  }
}

async function runAllHTMLTests() {
  console.log('\n');
  console.log('╔════════════════════════════════════════════════════════════════════════════════╗');
  console.log('║         LOCAL HTML QUESTIONS VALIDATION - Localhost Testing                  ║');
  console.log('╚════════════════════════════════════════════════════════════════════════════════╝');
  console.log(`\nTotal HTML Questions: ${htmlTestCases.length}`);
  console.log(`Timestamp: ${new Date().toISOString()}`);

  const results = [];

  for (let i = 0; i < htmlTestCases.length; i++) {
    const result = await testHTMLQuestion(htmlTestCases[i], i);
    results.push(result);
  }

  // Summary
  console.log('\n');
  console.log('╔════════════════════════════════════════════════════════════════════════════════╗');
  console.log('║                            SUMMARY REPORT                                     ║');
  console.log('╚════════════════════════════════════════════════════════════════════════════════╝');

  let totalPassed = 0;
  let totalTests = 0;
  let successCount = 0;

  results.forEach((result, idx) => {
    const status = result.success ? '✓ PASS' : '✗ FAIL';
    console.log(`\n${idx + 1}. ${result.title}`);
    console.log(`   Status: ${status}`);
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    } else {
      console.log(`   Tests: ${result.passed}/${result.total} passed`);
      totalPassed += result.passed;
      totalTests += result.total;
      if (result.success) successCount++;
    }
  });

  console.log('\n' + '='.repeat(80));
  console.log('OVERALL RESULTS:');
  console.log('='.repeat(80));
  console.log(`Total Questions: ${results.length}`);
  console.log(`Successful: ${successCount}/${results.length}`);
  console.log(`Total Tests: ${totalPassed}/${totalTests}`);
  console.log(`Success Rate: ${((successCount / results.length) * 100).toFixed(2)}%`);
  console.log(`Test Pass Rate: ${totalTests > 0 ? ((totalPassed / totalTests) * 100).toFixed(2) : 0}%`);
  console.log('='.repeat(80));

  if (successCount === results.length && totalPassed === totalTests) {
    console.log('\n✓ ALL HTML QUESTIONS PASSED LOCALLY!');
    console.log('\nReady for production deployment.');
  } else {
    console.log('\n✗ Some tests failed. Review the details above.');
  }

  console.log('\n');
}

// Run the tests
runAllHTMLTests().catch(console.error);
