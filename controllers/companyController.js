const Company = require('../models/Company');
const CompanySpecificQuestion = require('../models/CompanySpecificQuestion');

// Company Controllers
exports.createCompany = async (req, res) => {
  try {
    const { name, description, order, allowedTenants } = req.body;
    
    const company = new Company({
      name,
      description,
      order,
      allowedTenants
    });
    
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: 'Error creating company', error: error.message });
  }
};

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find({ isActive: true })
      .populate('allowedTenants', 'name domain')
      .sort({ order: 1 });
    
    const companiesWithCount = await Promise.all(
      companies.map(async (company) => {
        const questionCount = await CompanySpecificQuestion.countDocuments({
          company: company._id,
          isActive: true
        });
        return {
          ...company.toObject(),
          questionCount
        };
      })
    );
    
    res.json(companiesWithCount);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching companies', error: error.message });
  }
};

exports.getCompaniesByTenant = async (req, res) => {
  try {
    const tenantId = req.user.tenant;
    const companies = await Company.find({ 
      isActive: true,
      $or: [
        { allowedTenants: tenantId },
        { allowedTenants: { $size: 0 } }
      ]
    }).sort({ order: 1 });
    
    const companiesWithCount = await Promise.all(
      companies.map(async (company) => {
        const questionCount = await CompanySpecificQuestion.countDocuments({
          company: company._id,
          isActive: true
        });
        return {
          ...company.toObject(),
          questionCount
        };
      })
    );
    
    res.json(companiesWithCount);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching companies', error: error.message });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, order, allowedTenants } = req.body;
    
    const company = await Company.findByIdAndUpdate(
      id,
      { name, description, order, allowedTenants },
      { new: true }
    );
    
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: 'Error updating company', error: error.message });
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    await Company.findByIdAndUpdate(id, { isActive: false });
    res.json({ message: 'Company deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting company', error: error.message });
  }
};

// Company Specific Question Controllers
exports.createQuestion = async (req, res) => {
  try {
    const question = new CompanySpecificQuestion({
      ...req.body,
      createdBy: req.user._id
    });
    
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: 'Error creating question', error: error.message });
  }
};

exports.getQuestionsByCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const questions = await CompanySpecificQuestion.find({ 
      company: companyId,
      isActive: true
    }).populate('company', 'name');
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions', error: error.message });
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await CompanySpecificQuestion.findById(id)
      .populate('company', 'name')
      .populate('createdBy', 'name email');
    
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching question', error: error.message });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await CompanySpecificQuestion.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: 'Error updating question', error: error.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    await CompanySpecificQuestion.findByIdAndUpdate(id, { isActive: false });
    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting question', error: error.message });
  }
};
