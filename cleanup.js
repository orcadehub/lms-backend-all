const mongoose = require('mongoose');
const CompanySpecificQuestion = require('./models/CompanySpecificQuestion');

mongoose.connect('mongodb://127.0.0.1:27017/orcadehub', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('Connected to DB');
  const result = await CompanySpecificQuestion.deleteMany({ assessmentType: 'aptitude' });
  console.log('Deleted aptitude company questions:', result.deletedCount);
  mongoose.disconnect();
}).catch(err => {
  console.error(err);
  process.exit(1);
});
