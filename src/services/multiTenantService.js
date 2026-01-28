const axios = require('axios');
const Tenant = require('../models/Tenant');

class MultiTenantService {
  // Get all tenants for an instructor
  async getInstructorTenants(instructorId) {
    return await Tenant.find({ instructors: instructorId, isActive: true });
  }

  // Make API call to tenant domain
  async callTenantAPI(tenantId, endpoint, method = 'GET', data = null) {
    try {
      const tenant = await Tenant.findById(tenantId);
      if (!tenant) throw new Error('Tenant not found');

      const config = {
        method,
        url: `${tenant.apiEndpoint}${endpoint}`,
        headers: {
          'Authorization': `Bearer ${tenant.apiKey}`,
          'Content-Type': 'application/json',
          'X-Tenant-Domain': tenant.domain
        }
      };

      if (data) config.data = data;

      const response = await axios(config);
      return response.data;
    } catch (error) {
      throw new Error(`Tenant API call failed: ${error.message}`);
    }
  }

  // Get students from all tenant domains
  async getAllTenantStudents(instructorId) {
    const tenants = await this.getInstructorTenants(instructorId);
    const allStudents = [];

    for (const tenant of tenants) {
      try {
        const students = await this.callTenantAPI(tenant._id, '/api/students');
        allStudents.push({
          tenantName: tenant.name,
          tenantDomain: tenant.domain,
          students: students
        });
      } catch (error) {
        console.error(`Failed to fetch students from ${tenant.domain}:`, error.message);
      }
    }

    return allStudents;
  }

  // Create quiz across multiple tenants
  async createQuizForTenants(instructorId, quizData, tenantIds) {
    const results = [];
    
    for (const tenantId of tenantIds) {
      try {
        const result = await this.callTenantAPI(tenantId, '/api/quizzes', 'POST', quizData);
        const tenant = await Tenant.findById(tenantId);
        results.push({
          tenantName: tenant.name,
          success: true,
          quizId: result.id
        });
      } catch (error) {
        const tenant = await Tenant.findById(tenantId);
        results.push({
          tenantName: tenant.name,
          success: false,
          error: error.message
        });
      }
    }

    return results;
  }
}

module.exports = new MultiTenantService();