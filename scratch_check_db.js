const mongoose = require('mongoose');
const Tenant = require('./models/Tenant');

mongoose.connect('mongodb://utho1:pX2yM9sK4cR8@157.20.215.31:27017/admin?authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  const tenants = await Tenant.find({});
  console.log(tenants.map(t => ({ name: t.name, domain: t.domain, apiEndpoint: t.apiEndpoint })));
  process.exit();
}).catch(console.error);
