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

async function runFrontendTests(html, css, js, testFile) {
  try {
    console.log('=== Frontend Test Runner ===');
    console.log('HTML length:', html?.length || 0);
    console.log('CSS length:', css?.length || 0);
    console.log('JS length:', js?.length || 0);
    
    // Decode HTML entities
    html = decodeHtmlEntities(html || '');
    css = decodeHtmlEntities(css || '');
    js = decodeHtmlEntities(js || '');
    
    console.log('JS content after decode:', js);
    
    if (!html || html.trim() === '' || !testFile || testFile.trim() === '') {
      console.log('Missing required fields');
      return {
        passed: 0,
        failed: 0,
        total: 0,
        tests: [],
        error: 'HTML and test file are required'
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

    // Wait for scripts to execute
    await new Promise(resolve => setTimeout(resolve, 100));

    // Extract beforeEach
    let beforeEachCode = '';
    const beforeEachMatch = testFile.match(/beforeEach\(\(\)\s*=>\s*\{([\s\S]*?)\n\s*\}\);/);
    if (beforeEachMatch) {
      beforeEachCode = beforeEachMatch[1];
    }

    // Parse tests
    const testResults = [];
    const testRegex = /test\(['"](.+?)['"],\s*\(\)\s*=>\s*\{([\s\S]*?)\n\s*\}\);/g;
    let match;

    while ((match = testRegex.exec(testFile)) !== null) {
      const testName = match[1];
      const testBody = match[2];
      console.log(`Running test: ${testName}`);
      
      try {
        // Run beforeEach
        if (beforeEachCode) {
          const beforeFunc = new Function('document', 'window', beforeEachCode);
          beforeFunc(document, window);
        }

        // Mock expect with all methods
        const expect = (value) => ({
          toBeTruthy: () => {
            if (!value) throw new Error('Expected truthy');
          },
          toBe: (expected) => {
            if (value !== expected) throw new Error(`Expected ${expected}, got ${value}`);
          },
          toBeGreaterThanOrEqual: (expected) => {
            if (value < expected) throw new Error(`Expected >= ${expected}, got ${value}`);
          },
          toContain: (expected) => {
            if (!value || !value.toString().includes(expected)) throw new Error(`Expected to contain ${expected}`);
          }
        });

        // Run test
        const testFunc = new Function('document', 'window', 'expect', testBody);
        testFunc(document, window, expect);
        
        console.log(`✓ Test passed: ${testName}`);
        testResults.push({ name: testName, status: 'passed' });
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
