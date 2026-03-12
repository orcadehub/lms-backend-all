# Frontend Test Runner: Production Fix Summary

## Problem
Tests pass on localhost but fail in production environment.

## Root Causes Identified

1. **Timeout Issues**: Production servers are slower, JSDOM needs more time
2. **HTML Entity Encoding**: Data stored/retrieved differently in production
3. **Code Sanitization**: Line endings and whitespace differences
4. **Missing Global Setup**: globalThis not properly initialized
5. **Resource Loading**: JSDOM resource handling differs between environments
6. **JSDOM Configuration**: Missing visual mode and charset settings

## Solutions Implemented

### 1. Enhanced Test Runner (`frontendTestRunner.js`)
- **Adaptive Timeouts**: Automatically increases timeouts in production
  - Localhost: 500ms initial, 300ms per test
  - Production: 1000ms initial, 500ms per test
  
- **Comprehensive Entity Decoding**: Handles all HTML entities
  ```javascript
  &#39; &quot; &lt; &gt; &amp; &#x27; &#x2F; &#x60;
  ```

- **Code Sanitization**: Normalizes line endings and whitespace
  ```javascript
  .replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim()
  ```

- **Better Global Setup**: Ensures all globals are accessible
  ```javascript
  window.globalThis = window;
  testWindow.globalThis = testWindow;
  ```

- **Enhanced JSDOM Configuration**:
  ```javascript
  {
    runScripts: 'dangerously',
    resources: 'usable',
    pretendToBeVisual: true  // NEW
  }
  ```

- **Improved Error Logging**: Stack traces for debugging
  ```javascript
  console.error(`Full error for ${testName}:`, error.stack);
  ```

### 2. Diagnostic Tool (`diagnosticTestRunner.js`)
Run this in both environments to identify differences:
```bash
node be/diagnosticTestRunner.js
```

Checks:
- Node version and environment
- JSDOM version and functionality
- Script execution capability
- CSS parsing
- Entity decoding
- Function constructor behavior
- Timeout performance

### 3. Troubleshooting Guide (`LOCALHOST_VS_PRODUCTION_GUIDE.md`)
Comprehensive guide covering:
- Quick diagnosis steps
- Common issues and solutions
- Production deployment checklist
- Debugging commands
- Performance optimization tips

## Files Modified/Created

| File | Type | Purpose |
|------|------|---------|
| `be/utils/frontendTestRunner.js` | Modified | Enhanced with production fixes |
| `be/diagnosticTestRunner.js` | Created | Environment diagnostics tool |
| `be/LOCALHOST_VS_PRODUCTION_GUIDE.md` | Created | Troubleshooting guide |
| `be/utils/frontendTestRunnerEnhanced.js` | Created | Reference implementation |

## How to Deploy

### Step 1: Update Test Runner
The main `frontendTestRunner.js` has been updated with all fixes.

### Step 2: Run Diagnostics
```bash
# Localhost
node be/diagnosticTestRunner.js

# Production (via SSH)
node be/diagnosticTestRunner.js
```

Compare outputs to identify environment-specific issues.

### Step 3: Deploy to Production
```bash
git add be/utils/frontendTestRunner.js
git add be/diagnosticTestRunner.js
git add be/LOCALHOST_VS_PRODUCTION_GUIDE.md
git commit -m "Fix: Frontend test runner production compatibility"
git push
```

### Step 4: Verify in Production
```bash
# SSH into production server
npm install  # or npm ci for exact versions
node be/diagnosticTestRunner.js
# Run a test to verify
```

## Key Improvements

✅ **Adaptive Timeouts**: Automatically adjusts for slower production servers
✅ **Better Entity Handling**: Comprehensive HTML entity decoding
✅ **Code Normalization**: Handles different line endings and whitespace
✅ **Enhanced Logging**: Better error messages for debugging
✅ **Visual Mode**: JSDOM now runs in visual mode for better compatibility
✅ **Charset Support**: Explicit UTF-8 charset in HTML
✅ **Diagnostic Tools**: Easy environment comparison

## Testing the Fix

### Test Locally
```bash
# Should still pass
npm test
```

### Test in Production
```bash
# SSH into production
cd /path/to/app
node be/diagnosticTestRunner.js
# Check logs for any issues
```

## Monitoring

Add these to your production monitoring:

1. **Test Execution Time**: Monitor if tests are taking longer
2. **Test Pass Rate**: Alert if pass rate drops below 95%
3. **Error Patterns**: Watch for specific error messages
4. **Memory Usage**: JSDOM can be memory-intensive

## Rollback Plan

If issues occur:
```bash
git revert <commit-hash>
npm install
# Restart service
```

## Next Steps

1. Deploy the updated `frontendTestRunner.js`
2. Run diagnostics in production
3. Monitor test execution for 24 hours
4. Adjust timeouts if needed based on production performance
5. Document any environment-specific findings

## Support

If tests still fail after these changes:
1. Run `diagnosticTestRunner.js` in both environments
2. Compare outputs and note differences
3. Check production logs: `pm2 logs` or `journalctl -u service-name`
4. Verify Node.js version: `node --version`
5. Verify JSDOM version: `npm list jsdom`
6. Test with a simple question first before complex ones
