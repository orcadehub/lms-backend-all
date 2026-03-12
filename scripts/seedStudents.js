const mongoose = require('mongoose');
require('dotenv').config();
const { getPlaygroundDb } = require('../config/playgroundDb');

const studentsData = [
  {
    "name": "Aarav Sharma",
    "roll": "CSE001",
    "maths": 85,
    "physics": 78,
    "chemistry": 92,
    "gender": "Male",
    "branch": "CSE",
    "city": "Bhubaneswar",
    "attendance": 95
  },
  {
    "name": "Priya Patel",
    "roll": "CSE002",
    "maths": 92,
    "physics": 88,
    "chemistry": 85,
    "gender": "Female",
    "branch": "CSE",
    "city": "Cuttack",
    "attendance": 98
  },
  {
    "name": "Rahul Kumar",
    "roll": "CSE003",
    "maths": 76,
    "physics": 82,
    "chemistry": 79,
    "gender": "Male",
    "branch": "CSE",
    "city": "Puri",
    "attendance": 90
  },
  {
    "name": "Sneha Mishra",
    "roll": "CSE004",
    "maths": 89,
    "physics": 91,
    "chemistry": 87,
    "gender": "Female",
    "branch": "CSE",
    "city": "Bhubaneswar",
    "attendance": 96
  },
  {
    "name": "Vikram Singh",
    "roll": "CSE005",
    "maths": 94,
    "physics": 86,
    "chemistry": 90,
    "gender": "Male",
    "branch": "CSE",
    "city": "Rourkela",
    "attendance": 92
  },
  {
    "name": "Ananya Das",
    "roll": "IT001",
    "maths": 81,
    "physics": 84,
    "chemistry": 88,
    "gender": "Female",
    "branch": "IT",
    "city": "Bhubaneswar",
    "attendance": 97
  },
  {
    "name": "Karan Reddy",
    "roll": "IT002",
    "maths": 87,
    "physics": 79,
    "chemistry": 93,
    "gender": "Male",
    "branch": "IT",
    "city": "Bhubaneswar",
    "attendance": 89
  },
  {
    "name": "Divya Nair",
    "roll": "IT003",
    "maths": 90,
    "physics": 95,
    "chemistry": 82,
    "gender": "Female",
    "branch": "IT",
    "city": "Sambalpur",
    "attendance": 94
  },
  {
    "name": "Arjun Mehta",
    "roll": "IT004",
    "maths": 78,
    "physics": 85,
    "chemistry": 80,
    "gender": "Male",
    "branch": "IT",
    "city": "Berhampur",
    "attendance": 91
  },
  {
    "name": "Riya Gupta",
    "roll": "IT005",
    "maths": 96,
    "physics": 89,
    "chemistry": 91,
    "gender": "Female",
    "branch": "IT",
    "city": "Bhubaneswar",
    "attendance": 99
  },
  {
    "name": "Siddharth Bose",
    "roll": "ECE001",
    "maths": 83,
    "physics": 92,
    "chemistry": 86,
    "gender": "Male",
    "branch": "ECE",
    "city": "Bhubaneswar",
    "attendance": 93
  },
  {
    "name": "Meera Joshi",
    "roll": "ECE002",
    "maths": 88,
    "physics": 87,
    "chemistry": 94,
    "gender": "Female",
    "branch": "ECE",
    "city": "Cuttack",
    "attendance": 96
  },
  {
    "name": "Nikhil Yadav",
    "roll": "ECE003",
    "maths": 79,
    "physics": 81,
    "chemistry": 77,
    "gender": "Male",
    "branch": "ECE",
    "city": "Puri",
    "attendance": 88
  },
  {
    "name": "Pooja Rao",
    "roll": "ECE004",
    "maths": 91,
    "physics": 90,
    "chemistry": 89,
    "gender": "Female",
    "branch": "ECE",
    "city": "Rourkela",
    "attendance": 95
  },
  {
    "name": "Aditya Verma",
    "roll": "ECE005",
    "maths": 85,
    "physics": 83,
    "chemistry": 92,
    "gender": "Male",
    "branch": "ECE",
    "city": "Bhubaneswar",
    "attendance": 97
  },
  {
    "name": "Swati Khan",
    "roll": "ME001",
    "maths": 82,
    "physics": 76,
    "chemistry": 84,
    "gender": "Female",
    "branch": "ME",
    "city": "Sambalpur",
    "attendance": 90
  },
  {
    "name": "Rohan Agarwal",
    "roll": "ME002",
    "maths": 93,
    "physics": 94,
    "chemistry": 85,
    "gender": "Male",
    "branch": "ME",
    "city": "Berhampur",
    "attendance": 92
  },
  {
    "name": "Neha Iyer",
    "roll": "ME003",
    "maths": 77,
    "physics": 80,
    "chemistry": 81,
    "gender": "Female",
    "branch": "ME",
    "city": "Bhubaneswar",
    "attendance": 86
  },
  {
    "name": "Gautam Roy",
    "roll": "ME004",
    "maths": 89,
    "physics": 88,
    "chemistry": 90,
    "gender": "Male",
    "branch": "ME",
    "city": "Cuttack",
    "attendance": 94
  },
  {
    "name": "Lakshmi Sen",
    "roll": "ME005",
    "maths": 86,
    "physics": 91,
    "chemistry": 87,
    "gender": "Female",
    "branch": "ME",
    "city": "Puri",
    "attendance": 98
  },
  {
    "name": "Ishaan Kapoor",
    "roll": "CSE006",
    "maths": 84,
    "physics": 79,
    "chemistry": 93,
    "gender": "Male",
    "branch": "CSE",
    "city": "Bhubaneswar",
    "attendance": 91
  },
  {
    "name": "Tanya Saxena",
    "roll": "CSE007",
    "maths": 95,
    "physics": 86,
    "chemistry": 88,
    "gender": "Female",
    "branch": "CSE",
    "city": "Rourkela",
    "attendance": 96
  },
  {
    "name": "Devansh Jain",
    "roll": "IT006",
    "maths": 80,
    "physics": 93,
    "chemistry": 82,
    "gender": "Male",
    "branch": "IT",
    "city": "Sambalpur",
    "attendance": 89
  },
  {
    "name": "Kavya Malhotra",
    "roll": "IT007",
    "maths": 90,
    "physics": 84,
    "chemistry": 91,
    "gender": "Female",
    "branch": "IT",
    "city": "Berhampur",
    "attendance": 97
  },
  {
    "name": "Yash Parekh",
    "roll": "ECE006",
    "maths": 87,
    "physics": 89,
    "chemistry": 85,
    "gender": "Male",
    "branch": "ECE",
    "city": "Bhubaneswar",
    "attendance": 93
  },
  {
    "name": "Shreya Pillai",
    "roll": "ECE007",
    "maths": 92,
    "physics": 87,
    "chemistry": 94,
    "gender": "Female",
    "branch": "ECE",
    "city": "Cuttack",
    "attendance": 95
  },
  {
    "name": "Omkar Desai",
    "roll": "ME006",
    "maths": 78,
    "physics": 82,
    "chemistry": 79,
    "gender": "Male",
    "branch": "ME",
    "city": "Puri",
    "attendance": 88
  },
  {
    "name": "Aishwarya Bhat",
    "roll": "ME007",
    "maths": 94,
    "physics": 90,
    "chemistry": 86,
    "gender": "Female",
    "branch": "ME",
    "city": "Bhubaneswar",
    "attendance": 99
  },
  {
    "name": "Harsh Wardhan",
    "roll": "CSE008",
    "maths": 81,
    "physics": 85,
    "chemistry": 89,
    "gender": "Male",
    "branch": "CSE",
    "city": "Rourkela",
    "attendance": 92
  },
  {
    "name": "Simran Kaur",
    "roll": "IT008",
    "maths": 88,
    "physics": 91,
    "chemistry": 83,
    "gender": "Female",
    "branch": "IT",
    "city": "Bhubaneswar",
    "attendance": 94
  }
]
;

const seedStudents = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const playgroundDb = getPlaygroundDb();
    const studentsCollection = playgroundDb.collection('students');

    await studentsCollection.insertMany(studentsData);
    console.log('Seeded students collection with 30 records');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding students:', error);
    process.exit(1);
  }
};

seedStudents();
