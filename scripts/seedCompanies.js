require('dotenv').config();
const mongoose = require('mongoose');
const Company = require('../models/Company');

const companies = [
  {
    name: 'TCS',
    description: 'TCS NQT and Digital coding questions for placement preparation',
    order: 1
  },
  {
    name: 'Accenture',
    description: 'Accenture coding questions and aptitude tests for campus placement preparation',
    order: 2
  },
  {
    name: 'Tech Mahindra',
    description: 'Tech Mahindra coding and technical questions for recruitment preparation',
    order: 3
  },
  {
    name: 'Cognizant',
    description: 'Cognizant GenC and technical assessment questions for placement preparation',
    order: 4
  },
  {
    name: 'Capgemini',
    description: 'Capgemini coding and pseudocode questions for campus recruitment preparation',
    order: 5
  },
  {
    name: 'Infosys',
    description: 'Infosys InfyTQ and HackWithInfy coding questions for placement preparation',
    order: 6
  },
  {
    name: 'Wipro',
    description: 'Wipro NLTH and Elite coding questions for campus placement preparation',
    order: 7
  }
];

mongoose.connect(process.env.MONGODB_URI)
.then(async () => {
  console.log('Connected to MongoDB');
  
  for (const company of companies) {
    const existing = await Company.findOne({ name: company.name });
    if (!existing) {
      await Company.create(company);
      console.log(`Created: ${company.name}`);
    } else {
      console.log(`Already exists: ${company.name}`);
    }
  }
  
  console.log('Seeding completed');
  process.exit(0);
})
.catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
