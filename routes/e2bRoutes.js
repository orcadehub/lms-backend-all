const express = require('express');
const router = express.Router();
const { Sandbox } = require('@e2b/code-interpreter');

const E2B_API_KEY = process.env.E2B_API_KEY;

// In-memory sandbox pool keyed by sessionId
const sandboxPool = new Map();

const getSandbox = async (sessionId) => {
  if (sandboxPool.has(sessionId)) {
    const entry = sandboxPool.get(sessionId);
    try {
      // Verify sandbox is still alive
      await entry.sandbox.isRunning();
      clearTimeout(entry.timer);
      entry.timer = setTimeout(() => killEntry(sessionId), 2 * 60 * 1000);
      return entry.sandbox;
    } catch {
      // Sandbox expired on E2B side, remove stale entry
      sandboxPool.delete(sessionId);
    }
  }

  const sandbox = await Sandbox.create({
    apiKey: E2B_API_KEY,
    timeoutMs: 3 * 60 * 1000,
  });

  const timer = setTimeout(() => killEntry(sessionId), 2 * 60 * 1000);
  sandboxPool.set(sessionId, { sandbox, timer });
  return sandbox;
};

const killEntry = async (sessionId) => {
  if (sandboxPool.has(sessionId)) {
    const entry = sandboxPool.get(sessionId);
    clearTimeout(entry.timer);
    await entry.sandbox.kill().catch(() => {});
    sandboxPool.delete(sessionId);
  }
};

// POST /api/e2b/run
router.post('/run', async (req, res) => {
  const { code, sessionId, envVars = {} } = req.body;

  if (!code || !sessionId) {
    return res.status(400).json({ error: 'code and sessionId are required' });
  }

  if (!E2B_API_KEY) {
    return res.status(500).json({ stdout: '', stderr: 'E2B_API_KEY not configured on server', success: false });
  }

  try {
    const sandbox = await getSandbox(sessionId);

    const lines = code.split('\n');
    const shellLines = lines.filter(l => l.trim().startsWith('!'));
    const codeLines = lines.filter(l => !l.trim().startsWith('!')).join('\n');

    let stdout = '';
    let stderr = '';
    let success = true;

    // Run shell/pip commands
    for (const shellLine of shellLines) {
      const cmd = shellLine.trim().slice(1).trim();
      try {
        const proc = await sandbox.commands.run(cmd);
        stdout += (proc.stdout || '') + '\n';
        if (proc.stderr) stderr += proc.stderr + '\n';
      } catch (cmdErr) {
        stderr += cmdErr.message + '\n';
      }
    }

    // Run Python code — prepend env var injection so they're always in scope
    if (codeLines.trim()) {
      const envSetup = Object.entries(envVars)
        .filter(([, v]) => v)
        .map(([k, v]) => `import os; os.environ['${k}'] = '${v.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}' `)
        .join('\n');
      const finalCode = envSetup ? `${envSetup}\n${codeLines}` : codeLines;
      const result = await sandbox.runCode(finalCode);
      stdout += (result.logs?.stdout || []).join('');
      const errOut = (result.logs?.stderr || []).join('');
      if (errOut) stderr += errOut;
      if (result.error) {
        stderr += result.error.value || result.error.toString();
        success = false;
      }
    }

    return res.json({
      stdout: stdout.trim(),
      stderr: stderr.trim(),
      success
    });

  } catch (err) {
    console.error('[E2B] run error:', err.message);
    return res.status(500).json({ stdout: '', stderr: err.message, success: false });
  }
});

// POST /api/e2b/evaluate — run student code + hidden test cases
router.post('/evaluate', async (req, res) => {
  const { code, questionId, sessionId, envVars = {} } = req.body;
  if (!code || !questionId || !sessionId) {
    return res.status(400).json({ error: 'code, questionId and sessionId are required' });
  }
  if (!E2B_API_KEY) {
    return res.status(500).json({ stderr: 'E2B_API_KEY not configured on server', success: false });
  }
  try {
    const GenAIQuestion = require('../models/GenAIQuestion');
    const question = await GenAIQuestion.findById(questionId);
    if (!question) return res.status(404).json({ error: 'Question not found' });

    const sandbox = await getSandbox(sessionId);

    // pip install required libraries
    let stdout = '';
    let stderr = '';
    for (const lib of (question.requiredLibraries || [])) {
      try {
        const proc = await sandbox.commands.run(`pip install -q "${lib}"`);
        if (proc.stderr) stderr += proc.stderr + '\n';
      } catch (e) { stderr += e.message + '\n'; }
    }

    // Build final code: env vars + student code + hidden test cases — all in ONE runCode call
    const envSetup = Object.entries(envVars)
      .filter(([, v]) => v)
      .map(([k, v]) => `import os; os.environ['${k}'] = '${v.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}' `)
      .join('\n');

    const finalCode = [envSetup, code.trim(), question.testCode.trim()].filter(Boolean).join('\n\n');
    console.log('[E2B] evaluate finalCode preview:', finalCode.substring(0, 200));
    const result = await sandbox.runCode(finalCode);

    stdout += (result.logs?.stdout || []).join('');
    const errOut = (result.logs?.stderr || []).join('');
    if (errOut) stderr += errOut;
    const success = !result.error;  // only fail on actual Python error, not pip stderr
    if (result.error) stderr += result.error.value || result.error.toString();

    return res.json({ stdout: stdout.trim(), stderr: stderr.trim(), success });
  } catch (err) {
    console.error('[E2B] evaluate error:', err.message);
    return res.status(500).json({ stdout: '', stderr: err.message, success: false });
  }
});

// POST /api/e2b/kill
router.post('/kill', async (req, res) => {
  const { sessionId } = req.body;
  if (sessionId) await killEntry(sessionId);
  return res.json({ killed: true });
});

// POST /api/e2b/kill-all — kill ALL running sandboxes on the E2B account
router.post('/kill-all', async (req, res) => {
  try {
    // Kill all locally tracked sandboxes
    for (const [sid] of sandboxPool) {
      await killEntry(sid);
    }

    // Also kill any orphaned sandboxes via E2B SDK
    const runningSandboxes = await Sandbox.list({ apiKey: E2B_API_KEY });
    let killed = 0;
    for (const info of runningSandboxes) {
      try {
        const sb = await Sandbox.connect(info.sandboxId, { apiKey: E2B_API_KEY });
        await sb.kill();
        killed++;
      } catch {}
    }

    console.log(`[E2B] kill-all: killed ${killed} orphaned sandboxes`);
    return res.json({ killed, message: `Killed ${killed} sandboxes` });
  } catch (err) {
    console.error('[E2B] kill-all error:', err.message);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
