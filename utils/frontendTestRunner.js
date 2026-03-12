const { JSDOM } = require('jsdom');

function decodeHtmlEntities(text) {
  if (!text) return text;
  const entities = {
    '&#39;': "'",
    '&quot;': '"',
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&',
    '&#x27;': "'",
    '&#x2F;': '/',
    '&#x60;': '`'
  };
  return text.replace(/&#\d+;|&#x[0-9a-f]+;|&[a-z]+;/gi, match => entities[match] || match);
}

function sanitizeCode(code) {
  if (!code) return code;
  return code
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim();
}

function extractTests(testFile) {
  // Decode HTML entities in test file first
  testFile = decodeHtmlEntities(testFile);
  
  const tests = [];
  let currentPos = 0;
  
  while (true) {
    const testStart = testFile.indexOf('test(', currentPos);
    if (testStart === -1) break;
    
    const quoteStart = testFile.indexOf("'", testStart);
    const quoteEnd = testFile.indexOf("'", quoteStart + 1);
    const testName = testFile.substring(quoteStart + 1, quoteEnd);
    
    const arrowStart = testFile.indexOf('=>', quoteEnd);
    const braceStart = testFile.indexOf('{', arrowStart);
    
    let braceCount = 1;
    let bodyEnd = braceStart + 1;
    while (braceCount > 0 && bodyEnd < testFile.length) {
      if (testFile[bodyEnd] === '{') braceCount++;
      if (testFile[bodyEnd] === '}') braceCount--;
      bodyEnd++;
    }
    
    const testBody = testFile.substring(braceStart + 1, bodyEnd - 1);
    tests.push({ name: testName, body: testBody });
    
    currentPos = bodyEnd;
  }
  
  return tests;
}

async function runFrontendTests(html, css, js, testFile, dataJs = '') {
  try {
    const isProduction = process.env.NODE_ENV === 'production';
    const INITIAL_TIMEOUT = isProduction ? 1000 : 500;
    const TEST_TIMEOUT = isProduction ? 500 : 300;
    
    console.log('=== Frontend Test Runner ===');
    console.log('Environment:', process.env.NODE_ENV || 'development');
    console.log('Initial timeout:', INITIAL_TIMEOUT + 'ms');
    console.log('Test timeout:', TEST_TIMEOUT + 'ms');
    console.log('HTML length:', html?.length || 0);
    console.log('CSS length:', css?.length || 0);
    console.log('JS length:', js?.length || 0);
    console.log('DataJS length:', dataJs?.length || 0);
    console.log('Test file length:', testFile?.length || 0);
    
    // Decode and sanitize all inputs
    html = sanitizeCode(decodeHtmlEntities(html || ''));
    css = sanitizeCode(decodeHtmlEntities(css || ''));
    js = sanitizeCode(decodeHtmlEntities(js || ''));
    dataJs = sanitizeCode(decodeHtmlEntities(dataJs || ''));
    
    if (!testFile || testFile.trim() === '') {
      console.log('Missing test file');
      return {
        passed: 0,
        failed: 0,
        total: 0,
        tests: [],
        error: 'Test file is required'
      };
    }

    const fullHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>${css || ''}</style>
      </head>
      <body>
        ${html}
        <script>${dataJs || ''}</script>
        <script>${js || ''}</script>
      </body>
      </html>
    `;

    // Create initial DOM for setup
    const dom = new JSDOM(fullHtml, { 
      runScripts: 'dangerously', 
      resources: 'usable',
      pretendToBeVisual: true
    });
    const { window } = dom;
    const { document } = window;
    
    // Set up global variables
    window.__HTML__ = html;
    window.__CSS__ = css;
    window.__JS__ = js;
    window.__DATA_JS__ = dataJs;
    window.globalThis = window;

    // Wait for scripts to execute
    await new Promise(resolve => setTimeout(resolve, INITIAL_TIMEOUT));

    const testResults = [];
    const tests = extractTests(testFile);

    console.log(`Found ${tests.length} tests to run`);

    for (const test of tests) {
      const testName = test.name;
      const testBody = test.body;
      console.log(`Running test: ${testName}`);
      
      try {
        // Create fresh DOM for each test
        const testDom = new JSDOM(fullHtml, { 
          runScripts: 'dangerously', 
          resources: 'usable',
          pretendToBeVisual: true
        });
        const testWindow = testDom.window;
        const testDocument = testWindow.document;
        
        // Set up globals for test
        testWindow.__HTML__ = html;
        testWindow.__CSS__ = css;
        testWindow.__JS__ = js;
        testWindow.__DATA_JS__ = dataJs;
        testWindow.globalThis = testWindow;

        // Wait for DOM to be ready
        await new Promise(resolve => setTimeout(resolve, TEST_TIMEOUT));

        // Create expect function with all matchers
        const expect = (value) => ({
          toBeTruthy: () => {
            if (!value) throw new Error(`Expected truthy but got ${value}`);
          },
          toBe: (expected) => {
            if (value !== expected) throw new Error(`Expected ${expected}, got ${value}`);
          },
          toBeGreaterThan: (expected) => {
            const numValue = Number(value);
            const numExpected = Number(expected);
            if (isNaN(numValue) || isNaN(numExpected)) {
              throw new Error(`Cannot compare non-numeric values: ${value} > ${expected}`);
            }
            if (numValue <= numExpected) throw new Error(`Expected > ${expected}, got ${value}`);
          },
          toBeGreaterThanOrEqual: (expected) => {
            const numValue = Number(value);
            const numExpected = Number(expected);
            if (isNaN(numValue) || isNaN(numExpected)) {
              throw new Error(`Cannot compare non-numeric values: ${value} >= ${expected}`);
            }
            if (numValue < numExpected) throw new Error(`Expected >= ${expected}, got ${value}`);
          },
          toBeLessThan: (expected) => {
            const numValue = Number(value);
            const numExpected = Number(expected);
            if (isNaN(numValue) || isNaN(numExpected)) {
              throw new Error(`Cannot compare non-numeric values: ${value} < ${expected}`);
            }
            if (numValue >= numExpected) throw new Error(`Expected < ${expected}, got ${value}`);
          },
          toBeLessThanOrEqual: (expected) => {
            const numValue = Number(value);
            const numExpected = Number(expected);
            if (isNaN(numValue) || isNaN(numExpected)) {
              throw new Error(`Cannot compare non-numeric values: ${value} <= ${expected}`);
            }
            if (numValue > numExpected) throw new Error(`Expected <= ${expected}, got ${value}`);
          },
          toEqual: (expected) => {
            if (JSON.stringify(value) !== JSON.stringify(expected)) {
              throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(value)}`);
            }
          },
          toContain: (expected) => {
            if (Array.isArray(value)) {
              if (!value.includes(expected)) throw new Error(`Expected array to contain ${expected}`);
            } else if (typeof value === 'string') {
              if (!value.includes(expected)) throw new Error(`Expected string to contain "${expected}"`);
            } else {
              throw new Error(`Cannot check containment on ${typeof value}`);
            }
          },
          toMatch: (regex) => {
            if (!regex.test(value)) throw new Error(`Expected to match ${regex}`);
          },
          toBeFalsy: () => {
            if (value) throw new Error(`Expected falsy but got ${value}`);
          },
          toHaveLength: (expected) => {
            if (value.length !== expected) throw new Error(`Expected length ${expected}, got ${value.length}`);
          }
        });

        try {
          const testFunc = new Function('document', 'window', 'expect', `
            const globalThis = window;
            ${testBody}
          `);
          testFunc(testDocument, testWindow, expect);
        } catch (e) {
          console.error(`Test execution error for ${testName}:`, e.message);
          throw e;
        }
        
        console.log(`✓ Test passed: ${testName}`);
        testResults.push({ name: testName, status: 'passed' });
        testDom.window.close();
      } catch (error) {
        console.log(`✗ Test failed: ${testName} - ${error.message}`);
        console.error(`Full error for ${testName}:`, error.stack);
        testResults.push({ name: testName, status: 'failed', error: error.message });
      }
    }

    const passed = testResults.filter(t => t.status === 'passed').length;
    const total = testResults.length;

    console.log(`Test Results: ${passed}/${total} passed`);
    dom.window.close();

    return {
      passed,
      failed: total - passed,
      total,
      tests: testResults
    };
  } catch (error) {
    console.error('Frontend test runner error:', error);
    return {
      passed: 0,
      failed: 0,
      total: 0,
      tests: [],
      error: error.message
    };
  }
}

module.exports = { runFrontendTests };
