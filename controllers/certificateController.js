const Certificate = require('../models/Certificate');
const Student = require('../models/Student');

exports.createCertificates = async (req, res) => {
  try {
    const { title, type, duration, startDate, issueDate, description, skills, studentIds, tenantId, signatureName, signatureDesignation } = req.body;
    
    // Iterate and create
    const createdCertificates = [];
    
    for (const studentId of studentIds) {
      // Create new certificate instance
      // The PRE-VALIDATE hook will automatically mint the OH-DDMMYYYY-XXXXX format!
      const cert = new Certificate({
        student: studentId,
        issuedBy: req.user._id,
        tenantId: tenantId,
        title,
        type: type || 'Course',
        duration,
        startDate,
        issueDate,
        description,
        skills,
        signatureName,
        signatureDesignation
      });
      
      await cert.save();
      createdCertificates.push(cert);
    }
    
    res.status(201).json({ 
      message: `${createdCertificates.length} certificates generated successfully`,
      certificates: createdCertificates
    });
  } catch (error) {
    console.error('Error generating certificates:', error);
    res.status(500).json({ message: 'Error generating certificates', error: error.message });
  }
};

exports.getMyCertificates = async (req, res) => {
  try {
    // Auth middleware attaches student to req.user
    const studentId = req.user._id;

    const certificates = await Certificate.find({ 
      student: studentId, 
      status: 'active' 
    })
    .populate('issuedBy', 'name')
    .populate('tenantId', 'name logoUrl')
    .sort({ issueDate: -1 });

    res.status(200).json(certificates);
  } catch (error) {
    console.error('Error fetching student certificates:', error);
    res.status(500).json({ message: 'Error fetching certificates', error: error.message });
  }
};

exports.getCertificateByStringId = async (req, res) => {
  try {
    const { certificateId } = req.params;
    
    // Find by the custom string OH-DDMMYYYY-XXXXX
    const certificate = await Certificate.findOne({ certificateId })
      .populate('student', 'name email profilePic')
      .populate('issuedBy', 'name email profile')
      .populate('tenantId', 'name logoUrl'); // Fixed to use proper schema property logoUrl
      
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    
    res.status(200).json(certificate);
  } catch (error) {
    console.error('Error fetching certificate by ID:', error);
    res.status(500).json({ message: 'Error fetching verifiable certificate', error: error.message });
  }
};
