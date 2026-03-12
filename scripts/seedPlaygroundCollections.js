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
  { _id: 8, name: 'Henry Wilson', age: 33, city: 'Austin', email: 'henry@example.com', salary: 82000 }
];

const productsData = [
  { _id: 1, name: 'Laptop', category: 'Electronics', price: 1200, stock: 50, brand: 'Dell' },
  { _id: 2, name: 'Mouse', category: 'Electronics', price: 25, stock: 200, brand: 'Logitech' },
  { _id: 3, name: 'Keyboard', category: 'Electronics', price: 75, stock: 150, brand: 'Corsair' },
  { _id: 4, name: 'Monitor', category: 'Electronics', price: 300, stock: 80, brand: 'Samsung' },
  { _id: 5, name: 'Desk Chair', category: 'Furniture', price: 250, stock: 40, brand: 'Herman Miller' },
  { _id: 6, name: 'Desk', category: 'Furniture', price: 400, stock: 30, brand: 'IKEA' },
  { _id: 7, name: 'Headphones', category: 'Electronics', price: 150, stock: 100, brand: 'Sony' },
  { _id: 8, name: 'Webcam', category: 'Electronics', price: 80, stock: 60, brand: 'Logitech' }
];

const seedPlaygroundCollections = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const playgroundDb = getPlaygroundDb();

    // Drop existing collections
    const collections = await playgroundDb.db.listCollections().toArray();
    for (const collection of collections) {
      await playgroundDb.db.dropCollection(collection.name);
      console.log(`Dropped collection: ${collection.name}`);
    }

    // Create and seed users collection
    const usersCollection = playgroundDb.collection('users');
    await usersCollection.insertMany(usersData);
    console.log('Seeded users collection');

    // Create and seed products collection
    const productsCollection = playgroundDb.collection('products');
    await productsCollection.insertMany(productsData);
    console.log('Seeded products collection');

    console.log('Playground database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding playground database:', error);
    process.exit(1);
  }
};

seedPlaygroundCollections();
