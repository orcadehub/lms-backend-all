const { JSDOM } = require('jsdom');

/**
 * Diagnostic script to identify differences between localhost and production
 * Run this in both environments to compare outputs
 */

async function runDiagnostics() {
  console.log('\n========== FRONTEND TEST RUNNER DIAGNOSTICS ==========\n');
  
  // 1. Environment Info
  console.log('1. ENVIRONMENT INFO:');
  console.log('   Node Version:', process.version);
  console.log('   NODE_ENV:', process.env.NODE_ENV || 'not set');
  console.log('   Platform:', process.platform);
  console.log('   Architecture:', process.arch);
  console.log('   Memory:', Math.round(require('os').totalmem() / 1024 / 1024), 'MB');
  
  // 2. JSDOM Version
  console.log('\n2. JSDOM INFO:');
  try {
    const jsdomVersion = require('jsdom/package.json').version;
    console.log('   JSDOM Version:', jsdomVersion);
  } catch (e) {
    console.log('   JSDOM Version: Unable to determine');
  }
  
  // 3. Test basic JSDOM functionality
  console.log('\n3. JSDOM FUNCTIONALITY TEST:');
  try {
    const html = '<div id="test">Hello World</div>';
    const dom = new JSDOM(html, { runScripts: 'dangerously' });
    const { window } = dom;
    const element = window.document.getElementById('test');
    console.log('   ✓ Basic DOM query works');
    console.log('   ✓ Element found:', element?.textContent);
    dom.window.close();
  } catch (e) {
    console.log('   ✗ JSDOM error:', e.message);
  }
  
  // 4. Test script execution
  console.log('\n4. SCRIPT EXECUTION TEST:');
  try {
    const html = '<div id="result"></div>';
    const js = 'document.getElementById("result").textContent = "Script executed";';
    const dom = new JSDOM(html + `<script>${js}</script>`, { runScripts: 'dangerously' });
    const { window } = dom;
    await new Promise(resolve => setTimeout(resolve, 100));
    const result = window.document.getElementById('result')?.textContent;
    console.log('   ✓ Script execution works');
    console.log('   ✓ Result:', result);
    dom.window.close();
  } catch (e) {
    console.log('   ✗ Script execution error:', e.message);
  }
  
  // 5. Test CSS parsing
  console.log('\n5. CSS PARSING TEST:');
  try {
    const html = '<div id="styled" style="color: red;">Styled</div>';
    const css = '#styled { font-size: 20px; }';
    const dom = new JSDOM(`<style>${css}</style>${html}`, { runScripts: 'dangerously' });
    const { window } = dom;
    const element = window.document.getElementById('styled');
    const styles = window.getComputedStyle(element);
    console.log('   ✓ CSS parsing works');
    console.log('   ✓ Computed color:', styles.color);
    dom.window.close();
  } catch (e) {
    console.log('   ✗ CSS parsing error:', e.message);
  }
  
  // 6. Test HTML entity decoding
  console.log('\n6. HTML ENTITY DECODING TEST:');
  const entities = {
    '&#39;': "'",
    '&quot;': '"',
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&'
  };
  const testString = 'Test &#39;quote&#39; and &quot;double&quot; and &lt;tag&gt;';
  const decoded = testString.replace(/&#39;|&quot;|&lt;|&gt;|&amp;/g, match => entities[match]);
  console.log('   Original:', testString);
  console.log('   Decoded:', decoded);
  console.log('   ✓ Entity decoding works');
  
  // 7. Test Function constructor
  console.log('\n7. FUNCTION CONSTRUCTOR TEST:');
  try {
    const testFunc = new Function('document', 'window', 'expect', `
      const result = document.getElementById('test');
      expect(result).toBeTruthy();
    `);
    const html = '<div id="test">Test</div>';
    const dom = new JSDOM(html);
    const { window } = dom;
    const expect = (value) => ({
      toBeTruthy: () => {
        if (!value) throw new Error('Expected truthy');
      }
    });
    testFunc(window.document, window, expect);
    console.log('   ✓ Function constructor works');
    dom.window.close();
  } catch (e) {
    console.log('   ✗ Function constructor error:', e.message);
  }
  
  // 8. Test timeout behavior
  console.log('\n8. TIMEOUT BEHAVIOR TEST:');
  const startTime = Date.now();
  await new Promise(resolve => setTimeout(resolve, 100));
  const elapsed = Date.now() - startTime;
  console.log('   Expected: ~100ms, Actual:', elapsed + 'ms');
  if (elapsed > 150) {
    console.log('   ⚠ WARNING: Timeouts are slower than expected (possible production issue)');
  } else {
    console.log('   ✓ Timeout behavior normal');
  }
  
  console.log('\n========== END DIAGNOSTICS ==========\n');
}

// Run diagnostics
runDiagnostics().catch(console.error);
