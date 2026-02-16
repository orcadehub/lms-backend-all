const { JSDOM } = require('jsdom');

async function runFrontendTests(html, css, js, testFile) {
  try {
    if (!html || html.trim() === '' || !testFile || testFile.trim() === '') {
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
      </body>
      </html>
    `;

    const dom = new JSDOM(fullHtml);
    const { window } = dom;
    window.__HTML__ = html;
    window.__CSS__ = css;

    // Execute student's JavaScript
    if (js && js.trim() !== '') {
      const scriptEl = window.document.createElement('script');
      scriptEl.textContent = js;
      window.document.body.appendChild(scriptEl);
    }

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
      
      try {
        // Run beforeEach
        if (beforeEachCode) {
          const beforeFunc = new Function('document', 'window', beforeEachCode);
          beforeFunc(window.document, window);
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
          }
        });

        // Run test
        const testFunc = new Function('document', 'window', 'expect', testBody);
        testFunc(window.document, window, expect);
        
        testResults.push({ name: testName, status: 'passed' });
      } catch (error) {
        testResults.push({ name: testName, status: 'failed', error: error.message });
      }
    }

    const passed = testResults.filter(t => t.status === 'passed').length;
    const total = testResults.length;

    dom.window.close();

    return {
      passed,
      failed: total - passed,
      total,
      tests: testResults
    };
  } catch (error) {
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
