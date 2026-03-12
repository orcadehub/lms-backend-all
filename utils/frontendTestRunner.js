const { JSDOM } = require('jsdom');

function decodeHtmlEntities(text) {
  const entities = {
    '&#39;': "'",
    '&quot;': '"',
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&'
  };
  return text.replace(/&#39;|&quot;|&lt;|&gt;|&amp;/g, match => entities[match]);
}

async function runFrontendTests(html, css, js, testFile, dataJs = '') {
  try {
    console.log('=== Frontend Test Runner ===');
    console.log('HTML length:', html?.length || 0);
    console.log('CSS length:', css?.length || 0);
    console.log('JS length:', js?.length || 0);
    console.log('DataJS length:', dataJs?.length || 0);
    
    // Decode HTML entities
    html = decodeHtmlEntities(html || '');
    css = decodeHtmlEntities(css || '');
    js = decodeHtmlEntities(js || '');
    dataJs = decodeHtmlEntities(dataJs || '');
    
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
        <style>${css || ''}</style>
      </head>
      <body>
        ${html}
        <script>${dataJs || ''}</script>
        <script>${js || ''}</script>
      </body>
      </html>
    `;

    const dom = new JSDOM(fullHtml, { runScripts: 'dangerously', resources: 'usable' });
    const { window } = dom;
    const { document } = window;
    
    window.__HTML__ = html;
    window.__CSS__ = css;
    window.__JS__ = js;
    window.__DATA_JS__ = dataJs;

    // Wait for scripts to execute
    await new Promise(resolve => setTimeout(resolve, 200));

    // Extract beforeEach code
    let beforeEachCode = '';
    const beforeEachMatch = testFile.match(/beforeEach\s*\(\s*\(\s*\)\s*=>\s*\{([\s\S]*?)\n\s*\}\s*\);/);
    if (beforeEachMatch) {
      beforeEachCode = beforeEachMatch[1];
    }

    // Extract afterEach code if exists
    let afterEachCode = '';
    const afterEachMatch = testFile.match(/afterEach\s*\(\s*\(\s*\)\s*=>\s*\{([\s\S]*?)\n\s*\}\s*\);/);
    if (afterEachMatch) {
      afterEachCode = afterEachMatch[1];
    }

    // Parse tests
    const testResults = [];
    const testRegex = /test\s*\(\s*['\"](.+?)['\"]\s*,\s*\(\s*\)\s*=>\s*\{([\s\S]*?)\n\s*\}\s*\);/g;
    let match;

    while ((match = testRegex.exec(testFile)) !== null) {
      const testName = match[1];
      const testBody = match[2];
      console.log(`Running test: ${testName}`);
      
      try {
        // Create fresh DOM for each test
        const testDom = new JSDOM(fullHtml, { runScripts: 'dangerously', resources: 'usable' });
        const testWindow = testDom.window;
        const testDocument = testWindow.document;
        
        testWindow.__HTML__ = html;
        testWindow.__CSS__ = css;
        testWindow.__JS__ = js;
        testWindow.__DATA_JS__ = dataJs;

        // Wait for scripts in test DOM
        await new Promise(resolve => setTimeout(resolve, 100));

        // Mock expect with all Jest methods
        const expect = (value) => ({
          toBeTruthy: () => {
            if (!value) throw new Error(`Expected truthy but got ${value}`);
          },
          toBe: (expected) => {
            if (value !== expected) throw new Error(`Expected ${expected}, got ${value}`);
          },
          toBeGreaterThan: (expected) => {
            if (value <= expected) throw new Error(`Expected > ${expected}, got ${value}`);
          },
          toBeGreaterThanOrEqual: (expected) => {
            if (value < expected) throw new Error(`Expected >= ${expected}, got ${value}`);
          },
          toBeLessThan: (expected) => {
            if (value >= expected) throw new Error(`Expected < ${expected}, got ${value}`);
          },
          toBeLessThanOrEqual: (expected) => {
            if (value > expected) throw new Error(`Expected <= ${expected}, got ${value}`);
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

        // Run beforeEach
        if (beforeEachCode) {
          try {
            const beforeFunc = new Function('document', 'window', 'expect', beforeEachCode);
            beforeFunc(testDocument, testWindow, expect);
          } catch (e) {
            console.log(`beforeEach error: ${e.message}`);
            throw new Error(`beforeEach failed: ${e.message}`);
          }
        }

        // Run test
        try {
          const testFunc = new Function('document', 'window', 'expect', testBody);
          testFunc(testDocument, testWindow, expect);
        } catch (e) {
          throw e;
        }

        // Run afterEach
        if (afterEachCode) {
          try {
            const afterFunc = new Function('document', 'window', 'expect', afterEachCode);
            afterFunc(testDocument, testWindow, expect);
          } catch (e) {
            console.log(`afterEach error: ${e.message}`);
          }
        }
        
        console.log(`✓ Test passed: ${testName}`);
        testResults.push({ name: testName, status: 'passed' });
        testDom.window.close();
      } catch (error) {
        console.log(`✗ Test failed: ${testName} - ${error.message}`);
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
