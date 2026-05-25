const AIMockInterview = require('../models/AIMockInterview');
const Assessment = require('../models/Assessment');
const AssessmentAttempt = require('../models/AssessmentAttempt');
const Batch = require('../models/Batch');
const Certificate = require('../models/Certificate');
const Enrollment = require('../models/Enrollment');
const GamifiedAttempt = require('../models/GamifiedAttempt');
const LabSubmission = require('../models/LabSubmission');
const MCQAttempt = require('../models/MCQAttempt');
const PracticeSubmission = require('../models/PracticeSubmission');
const Student = require('../models/Student');

const deleteStudentsAndRelatedData = async (studentIds) => {
  const ids = studentIds.map((id) => id.toString());

  const result = {
    students: ids.length,
    assessmentAttempts: 0,
    practiceSubmissions: 0,
    gamifiedAttempts: 0,
    mcqAttempts: 0,
    labSubmissions: 0,
    aiMockInterviews: 0,
    certificates: 0,
    enrollments: 0
  };

  const [
    assessmentAttempts,
    practiceSubmissions,
    gamifiedAttempts,
    mcqAttempts,
    labSubmissions,
    aiMockInterviews,
    certificates,
    enrollments
  ] = await Promise.all([
    AssessmentAttempt.deleteMany({ student: { $in: ids } }),
    PracticeSubmission.deleteMany({ userId: { $in: ids } }),
    GamifiedAttempt.deleteMany({ userId: { $in: ids } }),
    MCQAttempt.deleteMany({ studentId: { $in: ids } }),
    LabSubmission.deleteMany({ studentId: { $in: ids } }),
    AIMockInterview.deleteMany({ studentId: { $in: ids } }),
    Certificate.deleteMany({ student: { $in: ids } }),
    Enrollment.deleteMany({ student: { $in: ids } })
  ]);

  result.assessmentAttempts = assessmentAttempts.deletedCount || 0;
  result.practiceSubmissions = practiceSubmissions.deletedCount || 0;
  result.gamifiedAttempts = gamifiedAttempts.deletedCount || 0;
  result.mcqAttempts = mcqAttempts.deletedCount || 0;
  result.labSubmissions = labSubmissions.deletedCount || 0;
  result.aiMockInterviews = aiMockInterviews.deletedCount || 0;
  result.certificates = certificates.deletedCount || 0;
  result.enrollments = enrollments.deletedCount || 0;

  await Promise.all([
    Batch.updateMany({ students: { $in: ids } }, { $pull: { students: { $in: ids } } }),
    Assessment.updateMany({ students: { $in: ids } }, { $pull: { students: { $in: ids } } }),
    Student.deleteMany({ _id: { $in: ids } })
  ]);

  return result;
};

module.exports = { deleteStudentsAndRelatedData };
