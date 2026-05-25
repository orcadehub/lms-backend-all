const mongoose = require('mongoose');
const Batch = require('../models/Batch');
const Instructor = require('../models/Instructor');
const Student = require('../models/Student');
const Tenant = require('../models/Tenant');

const getInstitutionFromEmail = (email = '') => {
  const parts = String(email).toLowerCase().trim().split('@');
  return parts.length === 2 ? parts[1] : '';
};

const escapeRegex = (value = '') => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const institutionFilter = (institutions = []) => ({
  $or: [
    { institution: { $in: institutions } },
    ...institutions.map((institution) => ({ email: new RegExp(`@${escapeRegex(institution)}$`, 'i') }))
  ]
});

const objectIdEquals = (a, b) => String(a || '') === String(b || '');

const getInstructorTenantGrant = (instructor, tenantId) => {
  return (instructor.tenantPermissions || []).find((grant) => objectIdEquals(grant.tenant, tenantId));
};

const ensureInstructorTenantAccess = async (user, tenantId, institution) => {
  if (!tenantId) {
    const error = new Error('Tenant is required');
    error.statusCode = 400;
    throw error;
  }

  if (user.role === 'admin') return null;

  const instructor = await Instructor.findById(user._id || user.id).lean();
  if (!instructor) {
    const error = new Error('Instructor not found');
    error.statusCode = 404;
    throw error;
  }

  const hasTenant = (instructor.assignedTenants || []).some((id) => objectIdEquals(id, tenantId));
  if (!hasTenant) {
    const error = new Error('Instructor is not assigned to this tenant');
    error.statusCode = 403;
    throw error;
  }

  const grant = getInstructorTenantGrant(instructor, tenantId);
  const allowedInstitutions = (grant?.institutions || []).map((item) => String(item).toLowerCase());
  if (institution && allowedInstitutions.length > 0 && !allowedInstitutions.includes(String(institution).toLowerCase())) {
    const error = new Error('Instructor is not allowed to manage this institution');
    error.statusCode = 403;
    throw error;
  }

  return { instructor, grant, allowedInstitutions };
};

const buildStudentScope = async (user, tenantId, institution) => {
  const scope = { tenant: tenantId };
  if (user.role === 'admin') {
    if (institution) {
      scope.$or = institutionFilter([institution]).$or;
    }
    return scope;
  }

  const access = await ensureInstructorTenantAccess(user, tenantId, institution);
  if (institution) {
    scope.$or = institutionFilter([institution]).$or;
  } else if (access.allowedInstitutions.length > 0) {
    scope.$or = institutionFilter(access.allowedInstitutions).$or;
  }
  return scope;
};

const getScopedStudentIds = async (user, tenantId, institution) => {
  const scope = await buildStudentScope(user, tenantId, institution);
  return Student.find(scope).distinct('_id');
};

const assertStudentCapacity = async ({ tenantId, instructorId, grant, requestedCount = 1 }) => {
  const tenant = await Tenant.findById(tenantId).lean();
  if (!tenant) {
    const error = new Error('Tenant not found');
    error.statusCode = 404;
    throw error;
  }

  if (tenant.maxStudents > 0) {
    const tenantStudents = await Student.countDocuments({ tenant: tenantId });
    if (tenantStudents + requestedCount > tenant.maxStudents) {
      const error = new Error(`Tenant student limit exceeded. Limit: ${tenant.maxStudents}, current: ${tenantStudents}.`);
      error.statusCode = 400;
      throw error;
    }
  }

  if (instructorId && grant?.maxStudents > 0) {
    const instructorStudents = await Student.countDocuments({ tenant: tenantId, createdByInstructor: instructorId });
    if (instructorStudents + requestedCount > grant.maxStudents) {
      const error = new Error(`Instructor student limit exceeded. Limit: ${grant.maxStudents}, current: ${instructorStudents}.`);
      error.statusCode = 400;
      throw error;
    }
  }

  return tenant;
};

const assertStudentCanLogin = async (student, tenant) => {
  const institution = student.institution || getInstitutionFromEmail(student.email);
  if ((tenant.blockedInstitutions || []).includes(institution)) {
    const error = new Error('Institution access is blocked');
    error.statusCode = 403;
    throw error;
  }

  const blockedBatch = await Batch.findOne({
    tenant: tenant._id,
    students: student._id,
    $or: [{ accessBlocked: true }, { isActive: false }]
  }).select('_id name').lean();

  if (blockedBatch) {
    const error = new Error('Batch access is blocked');
    error.statusCode = 403;
    throw error;
  }
};

const normalizeTenantPermissions = (tenantPermissions = [], assignedTenants = []) => {
  return (tenantPermissions || [])
    .filter((grant) => grant?.tenant)
    .map((grant) => ({
      tenant: grant.tenant,
      institutions: Array.isArray(grant.institutions)
        ? grant.institutions.map((item) => String(item).toLowerCase().trim()).filter(Boolean)
        : [],
      maxStudents: Number(grant.maxStudents || 0)
    }))
    .filter((grant) => assignedTenants.some((tenantId) => objectIdEquals(tenantId, grant.tenant)));
};

const toObjectIds = (ids = []) => ids.map((id) => new mongoose.Types.ObjectId(id));

module.exports = {
  assertStudentCanLogin,
  assertStudentCapacity,
  buildStudentScope,
  ensureInstructorTenantAccess,
  getScopedStudentIds,
  getInstitutionFromEmail,
  institutionFilter,
  normalizeTenantPermissions,
  toObjectIds
};
