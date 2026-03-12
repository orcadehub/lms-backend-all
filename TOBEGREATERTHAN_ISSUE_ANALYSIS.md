# toBeGreaterThan Test Failure - Root Cause Analysis
**Date**: March 12, 2024  
**Issue**: Only `toBeGreaterThan` tests failing in production  
**Status**: DIAGNOSED

---

## Problem

Test cases like this fail ONLY in production:
```javascript
test('title tag exists and has content', () => {
  expect(document.title).toBeTruthy();  // ✅ PASSES
  expect(document.title.length).toBeGreaterThan(0);  // ❌ FAILS in production
});
```

---

## Root Cause Analysis

### Possible Cause 1: HTML Entity Encoding in Test File ⚠️
**Likelihood**: HIGH

In production, the test file might be HTML-encoded:
```
toBeGreaterThan becomes: toBeGreaterThan
```

**Evidence**:
- Test extraction uses `indexOf('test(')` to find tests
- If test file is encoded, the extraction might fail
- The matcher name `toBeGreaterThan` might be encoded as `toBeGreaterThan`

**Solution**: Decode test file before extraction

### Possible Cause 2: Type Mismatch in Production ⚠️
**Likelihood**: MEDIUM

In production, `document.title.length` might return:
- String: `"5"` instead of number `5`
- Float: `5.0` instead of `5`
- With whitespace: `" 5 "`

**Current Code**:
```javascript
const numValue = Number(value);  // Converts "5" to 5 ✓
if (numValue <= numExpected) throw new Error(...);
```

This should work, but if `Number()` conversion fails silently, it becomes `NaN`.

**Solution**: Add better type checking and logging

### Possible Cause 3: JSDOM Version Difference ⚠️
**Likelihood**: LOW

Production might have different JSDOM version:
- Localhost: `jsdom@28.0.0`
- Production: Different version?

Different versions might return different types for DOM properties.

**Solution**: Verify JSDOM version in production

### Possible Cause 4: Comparison Logic Bug ⚠️
**Likelihood**: VERY LOW

The condition `numValue <= numExpected` is correct:
- `5 <= 0` = false ✓ (should pass)
- `0 <= 0` = true ✓ (should fail)

But there might be edge cases:
- `NaN <= 0` = false (always false, might cause issues)
- `Infinity <= 0` = false

---

## Recommended Fix

### Step 1: Decode Test File Before Extraction

```javascript
function extractTests(testFile) {
  // Decode test file first
  testFile = decodeHtmlEntities(testFile);
  
  const tests = [];
  let currentPos = 0;
  
  while (true) {
    const testStart = testFile.indexOf('test(', currentPos);
    if (testStart === -1) break;
    // ... rest of extraction
  }
  
  return tests;
}
```

### Step 2: Add Better Type Checking

```javascript
toBeGreaterThan: (expected) => {
  let numValue = Number(value);
  let numExpected = Number(expected);
  
  // Handle edge cases
  if (isNaN(numValue)) {
    console.log(`WARNING: Value ${value} converted to NaN`);
    throw new Error(`Cannot convert value to number: ${value}`);
  }
  if (isNaN(numExpected)) {
    console.log(`WARNING: Expected ${expected} converted to NaN`);
    throw new Error(`Cannot convert expected to number: ${expected}`);
  }
  
  // Actual comparison
  if (numValue <= numExpected) {
    throw new Error(`Expected ${value} > ${expected}`);
  }
}
```

### Step 3: Add Logging for Debugging

```javascript
toBeGreaterThan: (expected) => {
  const numValue = Number(value);
  const numExpected = Number(expected);
  
  console.log(`[toBeGreaterThan] value=${value} (${typeof value}) -> ${numValue}`);
  console.log(`[toBeGreaterThan] expected=${expected} (${typeof expected}) -> ${numExpected}`);
  console.log(`[toBeGreaterThan] ${numValue} > ${numExpected} = ${numValue > numExpected}`);
  
  if (isNaN(numValue) || isNaN(numExpected)) {
    throw new Error(`Cannot compare: ${value} > ${expected}`);
  }
  if (numValue <= numExpected) {
    throw new Error(`Expected > ${expected}, got ${value}`);
  }
}
```

---

## Most Likely Cause

**The test file is HTML-encoded in production**, and the matcher name `toBeGreaterThan` is being encoded as `toBeGreaterThan`, causing the test extraction to fail.

**Evidence**:
1. Only `toBeGreaterThan` tests fail (not other matchers)
2. Tests pass on localhost (where encoding might not happen)
3. The matcher name contains `>` which is commonly HTML-encoded

---

## Quick Fix

Add this line at the start of `extractTests()`:

```javascript
function extractTests(testFile) {
  // Decode HTML entities in test file
  testFile = decodeHtmlEntities(testFile);
  
  // ... rest of function
}
```

This will decode `toBeGreaterThan` back to `toBeGreaterThan` before extraction.

---

## Testing the Fix

After applying the fix, test with:
```javascript
test('title tag length', () => {
  expect(document.title.length).toBeGreaterThan(0);
});
```

Expected: ✅ PASS in both localhost and production

---

**Recommendation**: Apply the test file decoding fix immediately, as it's the most likely cause.
