require('dotenv').config();
const mongoose = require('mongoose');

async function getIds() {
  await mongoose.connect(process.env.MONGODB_URI);
  const tenant = await mongoose.connection.db.collection('tenants').findOne({});
  const instructor = await mongoose.connection.db.collection('instructors').findOne({});
  console.log('Tenant:', tenant._id);
  console.log('Instructor:', instructor._id);
  process.exit(0);
}
getIds();
