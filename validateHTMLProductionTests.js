const axios = require('axios');

const PRODUCTION_URL = 'https://backend.orcode.in';
const API_ENDPOINT = '/api/frontend-questions/run-tests-public';

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
    expectedTests: 10
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
    expectedTests: 12
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
    expectedTests: 9
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
    expectedTests: 9
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
    expectedTests: 9
  }
];

async function testHTMLQuestion(testCase, index) {
  try {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`Test ${index + 1}: ${testCase.title}`);
    console.log(`${'='.repeat(80)}`);

    const payload = {
      html: testCase.html,
      css: testCase.css,
      js: testCase.js,
      testFile: `describe('${testCase.title}', () => {
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
});`,
      dataJs: testCase.dataJs
    };

    console.log('Sending request to:', PRODUCTION_URL + API_ENDPOINT);
    console.log('Using public endpoint (no auth required)');
    console.log('Payload size:', JSON.stringify(payload).length, 'bytes');

    const response = await axios.post(PRODUCTION_URL + API_ENDPOINT, payload, {
      timeout: 60000,
      headers: {
        'Content-Type': 'application/json'
      },
      maxRedirects: 5
    });

    const result = response.data;
    console.log('\n✓ Response received');
    console.log('Status:', result.passed === result.total ? '✓ PASSED' : '✗ FAILED');
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
      error: null
    };
  } catch (error) {
    console.error('\n✗ Error testing question:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else if (error.request) {
      console.error('No response received');
      console.error('Request error:', error.message);
    } else {
      console.error('Error:', error.message);
    }

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
  console.log('║         PRODUCTION HTML QUESTIONS VALIDATION - backend.orcode.in              ║');
  console.log('╚════════════════════════════════════════════════════════════════════════════════╝');
  console.log(`\nProduction URL: ${PRODUCTION_URL}`);
  console.log(`Total HTML Questions: ${htmlTestCases.length}`);
  console.log(`Timestamp: ${new Date().toISOString()}`);

  const results = [];

  for (let i = 0; i < htmlTestCases.length; i++) {
    const result = await testHTMLQuestion(htmlTestCases[i], i);
    results.push(result);
    
    // Add delay between requests
    if (i < htmlTestCases.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
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
    console.log('\n✓ ALL HTML QUESTIONS PASSED IN PRODUCTION!');
  } else {
    console.log('\n✗ Some tests failed. Review the details above.');
  }

  console.log('\n');
}

// Run the tests
runAllHTMLTests().catch(console.error);
