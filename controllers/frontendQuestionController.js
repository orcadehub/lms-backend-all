const FrontendQuestion = require('../models/FrontendQuestion');

// Create frontend question
const createFrontendQuestion = async (req, res) => {
  try {
    const { title, problemStatement, requirements, acceptanceCriteria, jestTestFile, defaultFiles, difficulty, tags, tenantId } = req.body;
    
    const finalTenantId = tenantId || req.user.tenantId || req.user.assignedTenants?.[0];
    
    const question = new FrontendQuestion({
      title,
      problemStatement,
      requirements,
      acceptanceCriteria,
      jestTestFile,
      defaultFiles,
      difficulty,
      tags,
      tenant: finalTenantId,
      createdBy: req.user.id
    });
    
    await question.save();
    res.status(201).json({ message: 'Frontend question created successfully', question });
  } catch (error) {
    console.error('Error creating frontend question:', error);
    res.status(500).json({ message: 'Error creating frontend question', error: error.message });
  }
};

// Get all frontend questions
const getFrontendQuestions = async (req, res) => {
  try {
    const { tenantId } = req.query;
    const filter = tenantId ? { tenant: tenantId, isActive: true } : { isActive: true };
    
    const questions = await FrontendQuestion.find(filter)
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 });
    
    res.json(questions);
  } catch (error) {
    console.error('Error fetching frontend questions:', error);
    res.status(500).json({ message: 'Error fetching frontend questions', error: error.message });
  }
};

// Get frontend question by ID
const getFrontendQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const question = await FrontendQuestion.findById(id)
      .populate('createdBy', 'name');
    
    if (!question) {
      return res.status(404).json({ message: 'Frontend question not found' });
    }
    
    res.json(question);
  } catch (error) {
    console.error('Error fetching frontend question:', error);
    res.status(500).json({ message: 'Error fetching frontend question', error: error.message });
  }
};

// Update frontend question
const updateFrontendQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const question = await FrontendQuestion.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!question) {
      return res.status(404).json({ message: 'Frontend question not found' });
    }
    
    res.json({ message: 'Frontend question updated successfully', question });
  } catch (error) {
    console.error('Error updating frontend question:', error);
    res.status(500).json({ message: 'Error updating frontend question', error: error.message });
  }
};

// Delete frontend question
const deleteFrontendQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    
    const question = await FrontendQuestion.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    
    if (!question) {
      return res.status(404).json({ message: 'Frontend question not found' });
    }
    
    res.json({ message: 'Frontend question deleted successfully' });
  } catch (error) {
    console.error('Error deleting frontend question:', error);
    res.status(500).json({ message: 'Error deleting frontend question', error: error.message });
  }
};

module.exports = {
  createFrontendQuestion,
  getFrontendQuestions,
  getFrontendQuestionById,
  updateFrontendQuestion,
  deleteFrontendQuestion
};
