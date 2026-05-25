const mongoose = require('mongoose');
const Message = require('../models/Message');
const Batch = require('../models/Batch');
require('dotenv').config({ path: '.env' });

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');

    // 1. Delete the previous short message
    const deleteResult = await Message.deleteMany({ title: 'Welcome to the MERN Stack Anniversary Edition!' });
    console.log(`Deleted ${deleteResult.deletedCount} previous short messages.`);

    // 2. Find the MERN Batch
    const mernBatch = await Batch.findOne({ name: 'MERN-ANNIVERSARY-BATCH' });
    if (!mernBatch) {
      console.log('MERN batch not found');
      return;
    }

    // 3. Prepare the new detailed announcement
    const title = 'Congratulations on Enrolling in the MERN Stack Course!';
    const content = `Congratulations for enrolling in the course! We are absolutely thrilled to support you on your software engineering journey.

Please review the key details for the upcoming classes:

📅 SCHEDULE:
• Class Start Date: 1st June
• Timing: 7:00 PM to 8:00 PM IST daily
• Weekdays (Monday to Friday): Daily classes and interactive lectures
• Weekends (Saturday and Sunday): Structured assessments and practical projects to apply your knowledge

⚠️ MANDATORY ATTENDANCE:
• Attendance is strictly mandatory to be eligible to receive your certificate of completion.

🎓 TOTAL CERTIFICATIONS:
By successfully completing all modules, projects, and assessments in this course, you will earn a total of 5 valuable certifications:
1. Frontend Developer
2. Backend Developer
3. Database Operations related
4. Full Stack Web Developer
5. CI/CD using GitHub and AWS/Render

Make sure to mark your calendar and clear your schedule for 1st June at 7:00 PM. Let's work hard and build your path to becoming an expert Full Stack developer!

Best regards,
Orca Learning Team`;

    // 4. Create single message targeting the batch (using our new schema)
    const newMessage = new Message({
      batches: [mernBatch._id],
      tenant: mernBatch.tenant,
      title,
      content,
      readBy: [],
      createdAt: new Date()
    });

    await newMessage.save();
    console.log('Successfully added the detailed congratulatory message for MERN students!');

  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected');
  }
}

run();
