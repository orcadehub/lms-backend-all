const cron = require('node-cron');
const Assessment = require('../models/Assessment');
const Tenant = require('../models/Tenant');
const Batch = require('../models/Batch');
const Instructor = require('../models/Instructor');

const generateUniqueTitle = async (prefix) => {
  try {
    const latestAssessment = await Assessment.findOne({ title: { $regex: `^${prefix}` } })
      .sort({ title: -1 })
      .exec();

    if (!latestAssessment) {
      return `${prefix}0001`;
    }

    const latestNumberStr = latestAssessment.title.replace(prefix, '');
    const latestNumber = parseInt(latestNumberStr, 10);
    
    if (isNaN(latestNumber)) {
      return `${prefix}0001`;
    }

    const nextNumber = latestNumber + 1;
    return `${prefix}${nextNumber.toString().padStart(4, '0')}`;
  } catch (error) {
    console.error(`Error generating unique title for prefix ${prefix}:`, error);
    return `${prefix}${Date.now().toString().slice(-4)}`; // fallback
  }
};

const getSystemInstructorId = async (tenantId) => {
  // Find any active instructor for this tenant to use as 'createdBy'
  const instructor = await Instructor.findOne({ 
    assignedTenants: tenantId,
    isActive: true 
  });
  return instructor ? instructor._id : null;
};

const createGlobalContest = async (type, title, scheduleTime, targetDate = null) => {
  try {
    const Assessment = require('../models/Assessment');

    // Parse schedule time
    const [hours, minutes] = scheduleTime.split(':').map(Number);
    let startTime;
    
    if (targetDate) {
      startTime = new Date(targetDate);
      startTime.setHours(hours, minutes, 0, 0);
    } else {
      startTime = new Date();
      startTime.setHours(hours, minutes, 0, 0);
      // If it's already past the start time today, set it for tomorrow
      if (startTime < new Date()) {
        startTime.setDate(startTime.getDate() + 1);
      }
    }

    const newAssessment = new Assessment({
      title: title,
      description: `Automated ${type} contest for ${startTime.toLocaleDateString('en-GB')}`,
      type: 'Programming',
      duration: 60,
      difficulty: 'Medium',
      // No batches, no tenantId -> completely public across all tenants
      batches: [],
      // Use an admin or system instructor ID if necessary, or just omit if createdBy is optional
      // createdBy: null, 
      status: 'active',
      contestType: type,
      isPublic: true,
      startTime: startTime,
      earlyStartBuffer: 30,
      maxTabSwitches: 3,
      allowedLanguages: ['c', 'cpp', 'java', 'python'],
      isActive: true
    });

    await newAssessment.save();
    console.log(`Successfully created global ${type} contest ${title} scheduled for ${startTime.toLocaleString()}`);
  } catch (error) {
    console.error(`Error creating global ${type} contest:`, error);
  }
};

const startCronJobs = () => {
  console.log('Initializing scheduled contest cron jobs...');

  // Daily Contest (Monday - Saturday at 12:20 AM)
  cron.schedule('20 0 * * 1-6', async () => {
    console.log('Running daily contest creation job...');
    try {
      const uniqueTitle = await generateUniqueTitle('ORCA_D');
      await createGlobalContest('daily', uniqueTitle, '21:00');
    } catch (error) {
      console.error('Error in daily contest cron job:', error);
    }
  }, {
    timezone: "Asia/Kolkata"
  });

  // Weekly Contest (Runs Monday at 12:20 AM, scheduled for 6 days later on Sunday)
  cron.schedule('20 0 * * 1', async () => {
    console.log('Running weekly contest creation job...');
    try {
      const uniqueTitle = await generateUniqueTitle('ORCA_W');
      
      // Target date is 6 days from now (Sunday)
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 6);
      
      await createGlobalContest('weekly', uniqueTitle, '09:00', targetDate);
    } catch (error) {
      console.error('Error in weekly contest cron job:', error);
    }
  }, {
    timezone: "Asia/Kolkata"
  });

  console.log('Contest cron jobs scheduled successfully.');
};

// Exporting methods for testing purposes
module.exports = {
  startCronJobs,
  generateUniqueTitle,
  createGlobalContest
};
