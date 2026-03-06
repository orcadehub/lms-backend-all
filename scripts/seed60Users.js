const mongoose = require('mongoose');
require('dotenv').config();
const { getPlaygroundDb } = require('../config/playgroundDb');

const usersData = [
  { _id: 1, name: 'Alice Johnson', age: 28, city: 'New York', email: 'alice@example.com', salary: 75000 },
  { _id: 2, name: 'Bob Smith', age: 35, city: 'Los Angeles', email: 'bob@example.com', salary: 85000 },
  { _id: 3, name: 'Charlie Brown', age: 22, city: 'Chicago', email: 'charlie@example.com', salary: 55000 },
  { _id: 4, name: 'Diana Prince', age: 30, city: 'New York', email: 'diana@example.com', salary: 95000 },
  { _id: 5, name: 'Eve Davis', age: 26, city: 'San Francisco', email: 'eve@example.com', salary: 80000 },
  { _id: 6, name: 'Frank Miller', age: 40, city: 'Boston', email: 'frank@example.com', salary: 100000 },
  { _id: 7, name: 'Grace Lee', age: 29, city: 'Seattle', email: 'grace@example.com', salary: 78000 },
  { _id: 8, name: 'Henry Wilson', age: 33, city: 'Austin', email: 'henry@example.com', salary: 82000 },
  { _id: 9, name: 'Ivy Chen', age: 27, city: 'San Francisco', email: 'ivy@example.com', salary: 88000 },
  { _id: 10, name: 'Jack Thompson', age: 31, city: 'Chicago', email: 'jack@example.com', salary: 72000 },
  { _id: 11, name: 'Kate Martinez', age: 24, city: 'Miami', email: 'kate@example.com', salary: 65000 },
  { _id: 12, name: 'Liam Anderson', age: 38, city: 'Denver', email: 'liam@example.com', salary: 92000 },
  { _id: 13, name: 'Maya Patel', age: 25, city: 'New York', email: 'maya@example.com', salary: 70000 },
  { _id: 14, name: 'Noah Garcia', age: 32, city: 'Los Angeles', email: 'noah@example.com', salary: 86000 },
  { _id: 15, name: 'Olivia White', age: 29, city: 'Boston', email: 'olivia@example.com', salary: 79000 },
  { _id: 16, name: 'Peter Kim', age: 36, city: 'Seattle', email: 'peter@example.com', salary: 94000 },
  { _id: 17, name: 'Quinn Roberts', age: 23, city: 'Austin', email: 'quinn@example.com', salary: 58000 },
  { _id: 18, name: 'Rachel Green', age: 28, city: 'Chicago', email: 'rachel@example.com', salary: 76000 },
  { _id: 19, name: 'Sam Taylor', age: 34, city: 'San Francisco', email: 'sam@example.com', salary: 98000 },
  { _id: 20, name: 'Tina Moore', age: 26, city: 'Miami', email: 'tina@example.com', salary: 68000 },
  { _id: 21, name: 'Uma Singh', age: 30, city: 'Denver', email: 'uma@example.com', salary: 83000 },
  { _id: 22, name: 'Victor Cruz', age: 41, city: 'New York', email: 'victor@example.com', salary: 105000 },
  { _id: 23, name: 'Wendy Liu', age: 27, city: 'Los Angeles', email: 'wendy@example.com', salary: 74000 },
  { _id: 24, name: 'Xavier Brown', age: 33, city: 'Boston', email: 'xavier@example.com', salary: 87000 },
  { _id: 25, name: 'Yara Ahmed', age: 25, city: 'Seattle', email: 'yara@example.com', salary: 71000 },
  { _id: 26, name: 'Zack Cooper', age: 37, city: 'Austin', email: 'zack@example.com', salary: 91000 },
  { _id: 27, name: 'Amy Foster', age: 24, city: 'Chicago', email: 'amy@example.com', salary: 62000 },
  { _id: 28, name: 'Brian Hall', age: 39, city: 'San Francisco', email: 'brian@example.com', salary: 96000 },
  { _id: 29, name: 'Chloe Ward', age: 28, city: 'Miami', email: 'chloe@example.com', salary: 77000 },
  { _id: 30, name: 'David Ross', age: 35, city: 'Denver', email: 'david@example.com', salary: 89000 },
  { _id: 31, name: 'Emma Bell', age: 26, city: 'New York', email: 'emma@example.com', salary: 73000 },
  { _id: 32, name: 'Felix Murphy', age: 31, city: 'Los Angeles', email: 'felix@example.com', salary: 84000 },
  { _id: 33, name: 'Gina Rivera', age: 29, city: 'Boston', email: 'gina@example.com', salary: 81000 },
  { _id: 34, name: 'Harry Coleman', age: 42, city: 'Seattle', email: 'harry@example.com', salary: 108000 },
  { _id: 35, name: 'Iris Jenkins', age: 23, city: 'Austin', email: 'iris@example.com', salary: 59000 },
  { _id: 36, name: 'James Perry', age: 34, city: 'Chicago', email: 'james@example.com', salary: 85000 },
  { _id: 37, name: 'Kelly Powell', age: 27, city: 'San Francisco', email: 'kelly@example.com', salary: 78000 },
  { _id: 38, name: 'Leo Barnes', age: 36, city: 'Miami', email: 'leo@example.com', salary: 93000 },
  { _id: 39, name: 'Mia Russell', age: 25, city: 'Denver', email: 'mia@example.com', salary: 69000 },
  { _id: 40, name: 'Nick Griffin', age: 32, city: 'New York', email: 'nick@example.com', salary: 88000 },
  { _id: 41, name: 'Oscar Hayes', age: 38, city: 'Los Angeles', email: 'oscar@example.com', salary: 97000 },
  { _id: 42, name: 'Paula Fisher', age: 24, city: 'Boston', email: 'paula@example.com', salary: 64000 },
  { _id: 43, name: 'Quincy Butler', age: 30, city: 'Seattle', email: 'quincy@example.com', salary: 82000 },
  { _id: 44, name: 'Rita Simmons', age: 28, city: 'Austin', email: 'rita@example.com', salary: 75000 },
  { _id: 45, name: 'Steve Foster', age: 40, city: 'Chicago', email: 'steve@example.com', salary: 102000 },
  { _id: 46, name: 'Tracy Hughes', age: 26, city: 'San Francisco', email: 'tracy@example.com', salary: 76000 },
  { _id: 47, name: 'Ulysses Price', age: 33, city: 'Miami', email: 'ulysses@example.com', salary: 86000 },
  { _id: 48, name: 'Vera Long', age: 29, city: 'Denver', email: 'vera@example.com', salary: 80000 },
  { _id: 49, name: 'Wade Patterson', age: 37, city: 'New York', email: 'wade@example.com', salary: 95000 },
  { _id: 50, name: 'Xena Brooks', age: 25, city: 'Los Angeles', email: 'xena@example.com', salary: 67000 },
  { _id: 51, name: 'Yale Sanders', age: 31, city: 'Boston', email: 'yale@example.com', salary: 83000 },
  { _id: 52, name: 'Zoe Bennett', age: 27, city: 'Seattle', email: 'zoe@example.com', salary: 77000 },
  { _id: 53, name: 'Aaron Wood', age: 35, city: 'Austin', email: 'aaron@example.com', salary: 90000 },
  { _id: 54, name: 'Bella Gray', age: 24, city: 'Chicago', email: 'bella@example.com', salary: 63000 },
  { _id: 55, name: 'Carl James', age: 39, city: 'San Francisco', email: 'carl@example.com', salary: 99000 },
  { _id: 56, name: 'Dana Watson', age: 28, city: 'Miami', email: 'dana@example.com', salary: 74000 },
  { _id: 57, name: 'Ethan Brooks', age: 32, city: 'Denver', email: 'ethan@example.com', salary: 87000 },
  { _id: 58, name: 'Fiona Kelly', age: 26, city: 'New York', email: 'fiona@example.com', salary: 72000 },
  { _id: 59, name: 'George Sanders', age: 41, city: 'Los Angeles', email: 'george@example.com', salary: 106000 },
  { _id: 60, name: 'Hannah Reed', age: 23, city: 'Boston', email: 'hannah@example.com', salary: 60000 }
];

const seed60Users = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const playgroundDb = getPlaygroundDb();
    const usersCollection = playgroundDb.collection('users');

    await usersCollection.deleteMany({});
    console.log('Cleared existing users collection');

    await usersCollection.insertMany(usersData);
    console.log('Seeded users collection with 60 records');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
};

seed60Users();
