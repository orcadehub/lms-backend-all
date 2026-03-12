# Frontend Test Runner: Localhost vs Production Troubleshooting

## Quick Diagnosis Steps

### Step 1: Run Diagnostics in Both Environments
```bash
# Localhost
node be/diagnosticTestRunner.js

# Production (SSH into server)
node be/diagnosticTestRunner.js
```
Compare the outputs and note any differences.

---

## Common Issues & Solutions

### Issue 1: Timeout Problems
**Symptoms**: Tests pass locally but timeout in production

**Causes**:
- Production server is slower
- JSDOM needs more time to initialize
- Network latency affecting script loading

**Solutions**:
1. Increase timeout values in `frontendTestRunner.js`:
   - Change `setTimeout(resolve, 500)` to `setTimeout(resolve, 1000)`
   - Change `setTimeout(resolve, 300)` to `setTimeout(resolve, 500)`

2. Add retry logic:
```javascript
async function runTestWithRetry(testFunc, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await testFunc();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(r => setTimeout(r, 500 * (i + 1)));
    }
  }
}
```

---

### Issue 2: HTML Entity Encoding Mismatch
**Symptoms**: Tests fail with "Expected X, got Y" where values look identical

**Causes**:
- Database stores entities differently in production
- MongoDB encoding settings differ
- Frontend sends encoded data differently

**Solutions**:
1. Add comprehensive entity decoding:
```javascript
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
```

2. Verify data before tests:
```javascript
console.log('HTML before decode:', JSON.stringify(html));
html = decodeHtmlEntities(html);
console.log('HTML after decode:', JSON.stringify(html));
```

---

### Issue 3: JSDOM Version Incompatibility
**Symptoms**: Tests fail with "Cannot read property X of undefined"

**Causes**:
- Different JSDOM versions between environments
- Production has older/newer version
- API changes between versions

**Solutions**:
1. Lock JSDOM version in `package.json`:
```json
"jsdom": "^28.0.0"
```

2. Run `npm ci` instead of `npm install` in production (uses exact versions)

3. Check JSDOM compatibility:
```bash
npm list jsdom
```

---

### Issue 4: Missing Global Variables
**Symptoms**: Tests fail with "X is not defined"

**Causes**:
- `globalThis` not properly set
- Window object not accessible
- Scope issues with Function constructor

**Solutions**:
1. Ensure globals are properly exposed:
```javascript
testWindow.__HTML__ = html;
testWindow.__CSS__ = css;
testWindow.__JS__ = js;
testWindow.__DATA_JS__ = dataJs;
testWindow.globalThis = testWindow;
```

2. Add explicit global assignments:
```javascript
const testFunc = new Function('document', 'window', 'expect', `
  const globalThis = window;
  const document = window.document;
  ${testBody}
`);
```

---

### Issue 5: Resource Loading Issues
**Symptoms**: Tests fail intermittently or with "Resource not found"

**Causes**:
- External resources not loading in JSDOM
- Network timeouts
- Production firewall blocking resources

**Solutions**:
1. Disable resource loading:
```javascript
const dom = new JSDOM(fullHtml, { 
  runScripts: 'dangerously', 
  resources: 'usable',
  beforeParse(window) {
    window.fetch = () => Promise.reject(new Error('Fetch disabled in tests'));
  }
});
```

2. Mock external resources:
```javascript
testWindow.fetch = async (url) => ({
  json: async () => ({}),
  text: async () => '',
  ok: true
});
```

---

### Issue 6: Database Data Differences
**Symptoms**: Same test passes with one question but fails with another

**Causes**:
- Data stored differently in production database
- Character encoding issues
- Special characters not properly escaped

**Solutions**:
1. Add data validation before tests:
```javascript
console.log('Question data:', {
  htmlLength: html?.length,
  cssLength: css?.length,
  jsLength: js?.length,
  htmlPreview: html?.substring(0, 100),
  cssPreview: css?.substring(0, 100),
  jsPreview: js?.substring(0, 100)
});
```

2. Sanitize data:
```javascript
function sanitizeCode(code) {
  return code
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim();
}
```

---

## Production Deployment Checklist

- [ ] Run diagnostics in production environment
- [ ] Verify Node.js version matches: `node --version`
- [ ] Verify JSDOM version: `npm list jsdom`
- [ ] Check environment variables: `echo $NODE_ENV`
- [ ] Verify database connectivity
- [ ] Check server memory and CPU usage
- [ ] Review production logs for errors
- [ ] Test with sample questions before going live
- [ ] Monitor test execution times
- [ ] Set up alerts for test failures

---

## Debugging Commands

### View Production Logs
```bash
# If using PM2
pm2 logs

# If using systemd
journalctl -u your-service -f

# If using Docker
docker logs container-name -f
```

### Test Specific Question
```bash
curl -X POST http://localhost:4000/api/frontend-questions/run-tests \
  -H "Content-Type: application/json" \
  -d '{
    "html": "<div>Test</div>",
    "css": "div { color: red; }",
    "js": "console.log(\"test\");",
    "testFile": "test(\"sample\", () => { expect(true).toBeTruthy(); })"
  }'
```

### Enable Debug Logging
```bash
# Add to .env
DEBUG=*
NODE_DEBUG=*
```

---

## Performance Optimization

If tests are slow in production:

1. **Reduce timeout delays** (if server is fast):
```javascript
const TIMEOUT = process.env.NODE_ENV === 'production' ? 200 : 500;
await new Promise(resolve => setTimeout(resolve, TIMEOUT));
```

2. **Reuse JSDOM instances** (if memory allows):
```javascript
// Cache DOM instances
const domCache = new Map();
```

3. **Parallel test execution** (if CPU allows):
```javascript
// Run tests in parallel instead of sequential
await Promise.all(tests.map(test => runTest(test)));
```

---

## Contact Support

If issues persist:
1. Provide output from `diagnosticTestRunner.js` from both environments
2. Share production logs with error messages
3. Provide specific test case that fails
4. Include Node.js and JSDOM versions
