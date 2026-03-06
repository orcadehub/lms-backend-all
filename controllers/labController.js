const Lab = require('../models/Lab');
const LabSubmission = require('../models/LabSubmission');
const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const os = require('os');

exports.getAllLabs = async (req, res) => {
  try {
    const labs = await Lab.find().select('-testCases.expectedOutput');
    res.json(labs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLabById = async (req, res) => {
  try {
    const lab = await Lab.findById(req.params.id);
    if (!lab) return res.status(404).json({ error: 'Lab not found' });
    
    const labData = lab.toObject();
    labData.testCases = labData.testCases.map(tc => ({
      ...tc,
      expectedOutput: tc.isPublic ? tc.expectedOutput : undefined
    }));
    
    res.json(labData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createLab = async (req, res) => {
  try {
    const lab = new Lab(req.body);
    await lab.save();
    res.status(201).json(lab);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateLab = async (req, res) => {
  try {
    const lab = await Lab.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lab) return res.status(404).json({ error: 'Lab not found' });
    res.json(lab);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteLab = async (req, res) => {
  try {
    const lab = await Lab.findByIdAndDelete(req.params.id);
    if (!lab) return res.status(404).json({ error: 'Lab not found' });
    res.json({ message: 'Lab deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.saveProgress = async (req, res) => {
  try {
    const { labId, files } = req.body;
    const studentId = req.user.id;

    let submission = await LabSubmission.findOne({ labId, studentId, status: 'in-progress' });
    
    if (!submission) {
      submission = new LabSubmission({ labId, studentId, files });
    } else {
      submission.files = files;
    }
    
    await submission.save();
    res.json({ message: 'Progress saved', submission });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.submitLab = async (req, res) => {
  try {
    const { labId, files } = req.body;
    const studentId = req.user.id;

    const lab = await Lab.findById(labId);
    if (!lab) return res.status(404).json({ error: 'Lab not found' });

    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'lab-'));
    
    try {
      for (const file of files) {
        const filePath = path.join(tempDir, file.path);
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        await fs.writeFile(filePath, file.content);
      }

      const testResults = [];
      for (let i = 0; i < lab.testCases.length; i++) {
        const testCase = lab.testCases[i];
        const result = await executeTest(tempDir, testCase, lab.category);
        testResults.push({ testCaseIndex: i, ...result });
      }

      const passedTests = testResults.filter(r => r.passed).length;
      const score = Math.round((passedTests / lab.testCases.length) * lab.points);
      const status = passedTests === lab.testCases.length ? 'passed' : 'failed';

      const submission = await LabSubmission.findOneAndUpdate(
        { labId, studentId, status: 'in-progress' },
        { files, testResults, score, status, submittedAt: new Date() },
        { new: true, upsert: true }
      );

      res.json({ submission, testResults, score, status });
    } finally {
      await fs.rm(tempDir, { recursive: true, force: true });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function executeTest(workDir, testCase, category) {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      resolve({ passed: false, error: 'Timeout' });
    }, 5000);

    let command = '';
    if (category === 'nodejs') command = `cd ${workDir} && echo "${testCase.input}" | node index.js`;
    else if (category === 'python') command = `cd ${workDir} && echo "${testCase.input}" | python3 main.py`;
    else if (category === 'bash') command = `cd ${workDir} && bash script.sh`;

    exec(command, (error, stdout, stderr) => {
      clearTimeout(timeout);
      if (error) {
        resolve({ passed: false, actualOutput: stdout, error: stderr || error.message });
      } else {
        const actualOutput = stdout.trim();
        const passed = actualOutput === testCase.expectedOutput.trim();
        resolve({ passed, actualOutput, error: stderr || null });
      }
    });
  });
}

exports.getSubmission = async (req, res) => {
  try {
    const { labId } = req.params;
    const studentId = req.user.id;
    
    const submission = await LabSubmission.findOne({ labId, studentId }).sort({ createdAt: -1 });
    res.json(submission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.executeCommand = async (req, res) => {
  try {
    const { labId, command, files = [], currentDir = '' } = req.body;
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'lab-cmd-'));
    
    const hasNodeModules = files.some(f => f.path === 'node_modules' && f.isFolder);
    
    for (const file of files) {
      if (!file.isFolder) {
        const filePath = path.join(tempDir, file.path);
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        await fs.writeFile(filePath, file.content || '');
      } else if (file.path !== 'node_modules') {
        const dirPath = path.join(tempDir, file.path);
        await fs.mkdir(dirPath, { recursive: true });
      }
    }
    
    if (hasNodeModules && command.includes('npm') && !command.includes('install')) {
      res.json({ 
        output: 'Error: node_modules cannot be transferred. Please run "npm install" in this session first.', 
        files 
      });
      await fs.rm(tempDir, { recursive: true, force: true });
      return;
    }
    
    const workDir = currentDir ? path.join(tempDir, currentDir) : tempDir;
    
    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        fs.rm(tempDir, { recursive: true, force: true });
        res.status(408).json({ error: 'Command timeout' });
        resolve();
      }, 120000);

      exec(command, { 
        cwd: workDir, 
        maxBuffer: 1024 * 1024 * 10,
        env: { ...process.env, PATH: process.env.PATH }
      }, async (error, stdout, stderr) => {
        clearTimeout(timeout);
        
        try {
          const resultFiles = await readDirectoryRecursive(tempDir);
          await fs.rm(tempDir, { recursive: true, force: true });
          
          if (error) {
            res.json({ output: stderr || stdout || error.message, files: resultFiles });
          } else {
            res.json({ output: stdout || 'Command executed successfully', files: resultFiles });
          }
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
        resolve();
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function readDirectoryRecursive(dir, baseDir = dir) {
  const files = [];
  const items = await fs.readdir(dir, { withFileTypes: true });
  
  for (const item of items) {
    if (item.name === '.git' || item.name === '.DS_Store') continue;
    
    const fullPath = path.join(dir, item.name);
    const relativePath = path.relative(baseDir, fullPath);
    
    if (item.isDirectory()) {
      if (item.name === 'node_modules') {
        files.push({ path: relativePath, isFolder: true, readOnly: false });
        continue;
      }
      files.push({ path: relativePath, isFolder: true, readOnly: false });
      const subFiles = await readDirectoryRecursive(fullPath, baseDir);
      files.push(...subFiles);
    } else {
      const content = await fs.readFile(fullPath, 'utf-8').catch(() => '');
      files.push({ path: relativePath, content, isFolder: false, readOnly: false });
    }
  }
  
  return files;
}
