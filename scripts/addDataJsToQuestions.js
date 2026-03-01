const mongoose = require('mongoose');
require('dotenv').config();
const FrontendQuestion = require('../models/FrontendQuestion');

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const result = await FrontendQuestion.updateMany(
    {
      title: { $in: ['Filter and Display Student Cards', 'Display Student Data in Table'] }
    },
    {
      $set: { allowedFiles: ['html', 'css', 'js', 'data.js'] }
    }
  );
  
  console.log(`Updated ${result.modifiedCount} questions to include data.js`);
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
