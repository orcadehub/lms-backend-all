const { validationResult } = require('express-validator');
const Assessment = require('../models/Assessment');
const AssessmentQuestion = require('../models/AssessmentQuestion');
const ExcelJS = require('exceljs');

// Create assessment
const createAssessment = async (req, res) => {
  try {
    console.log('Create assessment request body:', req.body);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Assessment validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, type, duration, difficulty, questions, batches } = req.body;
    const tenantId = req.user.tenantId || req.user.assignedTenants?.[0];

    // Handle 'all' batches case
    let batchIds = [];
    if (batches === 'all') {
      const Batch = require('../models/Batch');
      const allBatches = await Batch.find({ tenant: tenantId });
      batchIds = allBatches.map(batch => batch._id);
    } else {
      batchIds = batches;
    }
    
    const assessment = new Assessment({
      title,
      description,
      type,
      duration,
      difficulty,
      questions,
      batches: batchIds,
      createdBy: req.user.id,
      tenantId,
      status: 'draft',
      maxTabSwitches: req.body.maxTabSwitches || 3
    });

    await assessment.save();
    await assessment.populate('questions');
    
    res.status(201).json({ message: 'Assessment created successfully', assessment });
  } catch (error) {
    console.error('Error creating assessment:', error);
    res.status(500).json({ message: 'Error creating assessment', error: error.message });
  }
};

// Get all assessments
const getAssessments = async (req, res) => {
  try {
    const { tenantId } = req.query;
    const assessments = await Assessment.find({})
      .populate('questions', 'title difficulty')
      .populate('createdBy', 'name')
      .select('+startTime')
      .sort({ createdAt: -1 });
    
    res.json(assessments);
  } catch (error) {
    console.error('Error fetching assessments:', error);
    res.status(500).json({ message: 'Error fetching assessments', error: error.message });
  }
};

// Get assessment by ID
const getAssessmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const assessment = await Assessment.findById(id)
      .populate('questions')
      .populate('quizQuestions')
      .populate('createdBy', 'name')
      .select('+startTime +showKeyInsights +showAlgorithmSteps');
    
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }
    
    res.json(assessment);
  } catch (error) {
    console.error('Error fetching assessment:', error);
    res.status(500).json({ message: 'Error fetching assessment', error: error.message });
  }
};

// Update assessment
const updateAssessment = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, duration, questions, batches, status } = req.body;

    const assessment = await Assessment.findByIdAndUpdate(
      id,
      { title, description, duration, questions, batches, status },
      { new: true, runValidators: true }
    ).populate('questions');
    
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }
    
    res.json({ message: 'Assessment updated successfully', assessment });
  } catch (error) {
    console.error('Error updating assessment:', error);
    res.status(500).json({ message: 'Error updating assessment', error: error.message });
  }
};

// Delete assessment
const deleteAssessment = async (req, res) => {
  try {
    const { id } = req.params;
    
    const assessment = await Assessment.findByIdAndDelete(id);
    
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }
    
    res.json({ message: 'Assessment deleted successfully' });
  } catch (error) {
    console.error('Error deleting assessment:', error);
    res.status(500).json({ message: 'Error deleting assessment', error: error.message });
  }
};

// Go live assessment
const goLiveAssessment = async (req, res) => {
  try {
    const { id } = req.params;
    const { startTime } = req.body;
    
    const assessment = await Assessment.findByIdAndUpdate(
      id,
      { 
        status: 'active',
        startTime: startTime ? new Date(startTime) : new Date()
      },
      { new: true }
    );
    
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }

    res.json({ message: 'Assessment is now live', assessment });
  } catch (error) {
    console.error('Error going live with assessment:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update assessment settings
const updateAssessmentTime = async (req, res) => {
  try {
    console.log('Update assessment request body:', req.body);
    const { id } = req.params;
    const { startTime, earlyStartBuffer, maxTabSwitches, status, allowedIPs, allowedLanguages, duration, showKeyInsights, showAlgorithmSteps } = req.body;
    
    const updateData = {
      earlyStartBuffer: earlyStartBuffer || 0
    };
    
    if (startTime) {
      updateData.startTime = new Date(startTime);
    }
    
    if (maxTabSwitches !== undefined) {
      updateData.maxTabSwitches = maxTabSwitches;
    }
    
    if (status) {
      updateData.status = status;
    }
    
    if (duration !== undefined && duration >= 30 && duration <= 300) {
      updateData.duration = duration;
    }
    
    if (allowedIPs !== undefined) {
      updateData.allowedIPs = Array.isArray(allowedIPs) ? allowedIPs : [allowedIPs];
      console.log('Setting allowedIPs to:', updateData.allowedIPs);
    }
    
    if (allowedLanguages !== undefined) {
      updateData.allowedLanguages = Array.isArray(allowedLanguages) ? allowedLanguages : [allowedLanguages];
      console.log('Setting allowedLanguages to:', updateData.allowedLanguages);
    }
    
    if (showKeyInsights !== undefined) {
      updateData.showKeyInsights = showKeyInsights;
    }
    
    if (showAlgorithmSteps !== undefined) {
      updateData.showAlgorithmSteps = showAlgorithmSteps;
    }
    
    console.log('Final update data:', updateData);
    const assessment = await Assessment.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }
    
    // Save again to ensure allowedIPs and allowedLanguages are persisted
    if (allowedIPs !== undefined) {
      assessment.allowedIPs = allowedIPs;
    }
    if (allowedLanguages !== undefined) {
      assessment.allowedLanguages = allowedLanguages;
    }
    if (allowedIPs !== undefined || allowedLanguages !== undefined) {
      await assessment.save();
    }
    
    // Emit real-time update to all connected clients
    const io = req.app.get('io');
    if (io) {
      console.log('Emitting assessment-updated event for assessment:', id);
      io.emit('assessment-updated', { assessmentId: id, assessment });
    }
    
    console.log('Updated assessment allowedIPs:', assessment.allowedIPs);
    res.json({ message: 'Assessment updated successfully', assessment });
  } catch (error) {
    console.error('Error updating assessment:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get assessment attempts for instructor monitoring
const getAssessmentAttempts = async (req, res) => {
  try {
    const { id } = req.params;
    const AssessmentAttempt = require('../models/AssessmentAttempt');
    const Student = require('../models/Student');
    
    const attempts = await AssessmentAttempt.find({ assessment: id })
      .populate('student', 'name email')
      .sort({ startedAt: -1 });
    
    const formattedAttempts = attempts.map(attempt => ({
      _id: attempt._id,
      studentId: attempt.student?._id,
      studentName: attempt.student?.name,
      studentEmail: attempt.student?.email,
      attemptStatus: attempt.attemptStatus,
      startedAt: attempt.startedAt,
      completedAt: attempt.completedAt,
      timeUsedSeconds: attempt.timeUsedSeconds,
      tabSwitchCount: attempt.tabSwitchCount || 0,
      fullscreenExitCount: attempt.fullscreenExitCount || 0,
      submissionReason: attempt.submissionReason
    }));
    
    res.json(formattedAttempts);
  } catch (error) {
    console.error('Error fetching assessment attempts:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Handle student actions (resume, retake, terminate)
const handleStudentAction = async (req, res) => {
  try {
    const { attemptId, action } = req.params;
    const AssessmentAttempt = require('../models/AssessmentAttempt');
    
    const attempt = await AssessmentAttempt.findById(attemptId);
    if (!attempt) {
      return res.status(404).json({ message: 'Attempt not found' });
    }
    
    switch (action) {
      case 'resume':
        attempt.attemptStatus = 'RESUME_ALLOWED';
        break;
      case 'retake':
        attempt.attemptStatus = 'RETAKE_ALLOWED';
        attempt.lastExecutedCode = {}; // Clear last executed code
        attempt.successfulCodes = {}; // Clear successful codes
        break;
      case 'terminate':
        attempt.attemptStatus = 'TERMINATED';
        attempt.completedAt = new Date();
        attempt.submissionReason = 'INSTRUCTOR_TERMINATED';
        break;
      default:
        return res.status(400).json({ message: 'Invalid action' });
    }
    
    await attempt.save();
    res.json({ message: `${action} successful`, attempt });
  } catch (error) {
    console.error(`Error with ${action}:`, error);
    res.status(500).json({ message: `Failed to ${action}`, error: error.message });
  }
};

// Export assessment results to Excel
const exportAssessmentResults = async (req, res) => {
  try {
    const { id } = req.params;
    const AssessmentAttempt = require('../models/AssessmentAttempt');
    
    const assessment = await Assessment.findById(id).populate('questions');
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }
    
    const attempts = await AssessmentAttempt.find({ assessment: id })
      .populate('student', 'name email')
      .sort({ createdAt: -1 });
    
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Assessment Results');
    
    // Define base columns
    const baseColumns = [
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Email', key: 'email', width: 25 },
      { header: 'Total Questions', key: 'totalQuestions', width: 15 },
      { header: 'Attempted', key: 'attempted', width: 12 },
      { header: 'Unattempted', key: 'unattempted', width: 12 },
      { header: 'Overall Percentage', key: 'overallPercentage', width: 15 }
    ];
    
    // Add columns for each question
    const questionColumns = assessment.questions.map((question, index) => ({
      header: `Q${index + 1}: ${question.title}`,
      key: `question_${question._id}`,
      width: 15
    }));
    
    const endColumns = [
      { header: 'Tab Switches', key: 'tabSwitches', width: 12 },
      { header: 'Fullscreen Exits', key: 'fullscreenExits', width: 15 },
      { header: 'Start IP', key: 'startIP', width: 15 },
      { header: 'End IP', key: 'endIP', width: 15 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Started At', key: 'startedAt', width: 20 },
      { header: 'Completed At', key: 'completedAt', width: 20 },
      { header: 'Time Used', key: 'timeUsed', width: 12 },
      { header: 'Remaining Time', key: 'remainingTime', width: 15 },
      { header: 'Resume Count', key: 'resumeCount', width: 12 },
      { header: 'Retake Count', key: 'retakeCount', width: 12 },
      { header: 'Session Data', key: 'sessionData', width: 50 }
    ];
    
    worksheet.columns = [...baseColumns, ...questionColumns, ...endColumns];
    
    // Style header row
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE0E0E0' }
    };
    
    // Sort attempts by overall percentage in descending order
    attempts.sort((a, b) => {
      const percentageA = a.overallPercentage || 0;
      const percentageB = b.overallPercentage || 0;
      return percentageB - percentageA;
    });
    
    // Add data rows
    attempts.forEach(attempt => {
      const totalQuestions = assessment.questions.length;
      const attempted = Object.keys(attempt.successfulCodes || {}).length;
      const unattempted = totalQuestions - attempted;
      const overallPercentage = attempt.overallPercentage || 0;
      
      const rowData = {
        name: attempt.student?.name || 'Unknown',
        email: attempt.student?.email || 'N/A',
        totalQuestions,
        attempted,
        unattempted,
        overallPercentage: overallPercentage.toFixed(2) + '%',
        tabSwitches: attempt.tabSwitchCount || 0,
        fullscreenExits: attempt.fullscreenExitCount || 0,
        startIP: attempt.sessionData?.startIP || 'N/A',
        endIP: attempt.sessionData?.endIP || attempt.sessionData?.startIP || 'N/A',
        status: attempt.attemptStatus || 'N/A',
        startedAt: attempt.startedAt ? new Date(attempt.startedAt).toLocaleString() : 'N/A',
        completedAt: attempt.completedAt ? new Date(attempt.completedAt).toLocaleString() : 'N/A',
        timeUsed: attempt.timeUsedSeconds ? Math.floor(attempt.timeUsedSeconds / 60) + 'm ' + (attempt.timeUsedSeconds % 60) + 's' : '0m 0s',
        remainingTime: attempt.remainingTimeSeconds ? Math.floor(attempt.remainingTimeSeconds / 60) + 'm ' + (attempt.remainingTimeSeconds % 60) + 's' : '0m 0s',
        resumeCount: attempt.resumeCount || 0,
        retakeCount: attempt.retakeCount || 0,
        sessionData: [
          attempt.sessionData?.systemInfo?.map((info, index) => 
            `Session ${index + 1}: Browser: ${info.userAgent} | Platform: ${info.platform} | Screen: ${info.screenResolution} | Timezone: ${info.timezone} | Timestamp: ${new Date(info.timestamp).toLocaleString()}`
          ).join(' || ') || '',
          attempt.sessionData?.sessionStartTime ? `Session Start: ${new Date(attempt.sessionData.sessionStartTime).toLocaleString()}` : '',
          attempt.sessionData?.sessionEndTime ? `Session End: ${new Date(attempt.sessionData.sessionEndTime).toLocaleString()}` : ''
        ].filter(info => info).join(' | ')
      };
      
      // Add question-wise percentages
      assessment.questions.forEach(question => {
        const questionPercentage = attempt.questionPercentages?.[question._id] || 0;
        rowData[`question_${question._id}`] = questionPercentage.toFixed(2) + '%';
      });
      
      worksheet.addRow(rowData);
    });
    
    // Set response headers
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${assessment.title}_results.xlsx"`);
    
    // Write to response
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error exporting assessment results:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Expire assessment timer - mark all IN_PROGRESS attempts as COMPLETED
const expireAssessmentTimer = async (req, res) => {
  try {
    const { id } = req.params;
    const AssessmentAttempt = require('../models/AssessmentAttempt');
    
    // Find all IN_PROGRESS attempts for this assessment
    const inProgressAttempts = await AssessmentAttempt.find({ 
      assessment: id, 
      attemptStatus: 'IN_PROGRESS' 
    });
    
    if (inProgressAttempts.length === 0) {
      return res.json({ message: 'No in-progress attempts found', updatedCount: 0 });
    }
    
    // Update each attempt individually to ensure proper time calculation
    let updatedCount = 0;
    for (const attempt of inProgressAttempts) {
      const timeUsed = Math.floor((new Date() - new Date(attempt.startedAt)) / 1000);
      await AssessmentAttempt.findByIdAndUpdate(attempt._id, {
        attemptStatus: 'COMPLETED',
        submissionReason: 'TIME_UP',
        completedAt: new Date(),
        timeUsedSeconds: timeUsed
      });
      updatedCount++;
    }
    
    res.json({ 
      message: 'Assessment timer expired successfully', 
      updatedCount: updatedCount,
      attemptIds: inProgressAttempts.map(a => a._id)
    });
  } catch (error) {
    console.error('Error expiring assessment timer:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add quiz question to assessment
const addQuizQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { questionId } = req.body;
    
    const assessment = await Assessment.findById(id);
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }
    
    if (!assessment.quizQuestions) {
      assessment.quizQuestions = [];
    }
    
    if (!assessment.quizQuestions.includes(questionId)) {
      assessment.quizQuestions.push(questionId);
      await assessment.save();
    }
    
    await assessment.populate('quizQuestions');
    res.json({ message: 'Quiz question added successfully', assessment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Remove quiz question from assessment
const removeQuizQuestion = async (req, res) => {
  try {
    const { id, questionId } = req.params;
    
    const assessment = await Assessment.findById(id);
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }
    
    if (assessment.quizQuestions) {
      assessment.quizQuestions = assessment.quizQuestions.filter(q => q.toString() !== questionId);
      await assessment.save();
    }
    
    await assessment.populate('quizQuestions');
    res.json({ message: 'Quiz question removed successfully', assessment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createAssessment,
  getAssessments,
  getAssessmentById,
  updateAssessment,
  deleteAssessment,
  goLiveAssessment,
  updateAssessmentTime,
  getAssessmentAttempts,
  handleStudentAction,
  exportAssessmentResults,
  expireAssessmentTimer,
  addQuizQuestion,
  removeQuizQuestion
};