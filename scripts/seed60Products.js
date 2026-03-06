const mongoose = require('mongoose');
require('dotenv').config();
const { getPlaygroundDb } = require('../config/playgroundDb');

const productsData = [
  { _id: 1, name: 'Laptop', category: 'Electronics', price: 1200, stock: 50, brand: 'Dell', rating: 4.5, inStock: true, discount: 10, warranty: 24 },
  { _id: 2, name: 'Mouse', category: 'Electronics', price: 25, stock: 200, brand: 'Logitech', rating: 4.2, inStock: true, discount: 5, warranty: 12 },
  { _id: 3, name: 'Keyboard', category: 'Electronics', price: 75, stock: 150, brand: 'Corsair', rating: 4.7, inStock: true, discount: 15, warranty: 12 },
  { _id: 4, name: 'Monitor', category: 'Electronics', price: 300, stock: 80, brand: 'Samsung', rating: 4.6, inStock: true, discount: 12, warranty: 36 },
  { _id: 5, name: 'Desk Chair', category: 'Furniture', price: 250, stock: 40, brand: 'Herman Miller', rating: 4.8, inStock: true, discount: 0, warranty: 60 },
  { _id: 6, name: 'Desk', category: 'Furniture', price: 400, stock: 30, brand: 'IKEA', rating: 4.3, inStock: true, discount: 8, warranty: 24 },
  { _id: 7, name: 'Headphones', category: 'Electronics', price: 150, stock: 100, brand: 'Sony', rating: 4.4, inStock: true, discount: 20, warranty: 12 },
  { _id: 8, name: 'Webcam', category: 'Electronics', price: 80, stock: 60, brand: 'Logitech', rating: 4.1, inStock: true, discount: 10, warranty: 12 },
  { _id: 9, name: 'USB Cable', category: 'Accessories', price: 10, stock: 500, brand: 'AmazonBasics', rating: 4.0, inStock: true, discount: 0, warranty: 6 },
  { _id: 10, name: 'Phone', category: 'Electronics', price: 800, stock: 120, brand: 'Apple', rating: 4.9, inStock: true, discount: 5, warranty: 12 },
  { _id: 11, name: 'Tablet', category: 'Electronics', price: 450, stock: 90, brand: 'Samsung', rating: 4.5, inStock: true, discount: 10, warranty: 12 },
  { _id: 12, name: 'Smartwatch', category: 'Electronics', price: 250, stock: 75, brand: 'Apple', rating: 4.7, inStock: true, discount: 8, warranty: 12 },
  { _id: 13, name: 'Speaker', category: 'Electronics', price: 120, stock: 110, brand: 'JBL', rating: 4.3, inStock: true, discount: 15, warranty: 12 },
  { _id: 14, name: 'Router', category: 'Electronics', price: 90, stock: 85, brand: 'TP-Link', rating: 4.2, inStock: true, discount: 12, warranty: 24 },
  { _id: 15, name: 'Printer', category: 'Electronics', price: 200, stock: 45, brand: 'HP', rating: 4.0, inStock: true, discount: 18, warranty: 12 },
  { _id: 16, name: 'Scanner', category: 'Electronics', price: 150, stock: 35, brand: 'Canon', rating: 4.1, inStock: true, discount: 10, warranty: 12 },
  { _id: 17, name: 'External HDD', category: 'Storage', price: 100, stock: 200, brand: 'Seagate', rating: 4.4, inStock: true, discount: 5, warranty: 36 },
  { _id: 18, name: 'SSD', category: 'Storage', price: 180, stock: 150, brand: 'Samsung', rating: 4.8, inStock: true, discount: 10, warranty: 60 },
  { _id: 19, name: 'USB Flash Drive', category: 'Storage', price: 20, stock: 400, brand: 'SanDisk', rating: 4.3, inStock: true, discount: 0, warranty: 12 },
  { _id: 20, name: 'Memory Card', category: 'Storage', price: 25, stock: 350, brand: 'SanDisk', rating: 4.5, inStock: true, discount: 5, warranty: 12 },
  { _id: 21, name: 'Gaming Console', category: 'Gaming', price: 500, stock: 60, brand: 'Sony', rating: 4.9, inStock: true, discount: 0, warranty: 12 },
  { _id: 22, name: 'Gaming Controller', category: 'Gaming', price: 60, stock: 180, brand: 'Microsoft', rating: 4.6, inStock: true, discount: 10, warranty: 12 },
  { _id: 23, name: 'VR Headset', category: 'Gaming', price: 400, stock: 40, brand: 'Meta', rating: 4.4, inStock: true, discount: 15, warranty: 12 },
  { _id: 24, name: 'Microphone', category: 'Electronics', price: 100, stock: 95, brand: 'Blue', rating: 4.7, inStock: true, discount: 12, warranty: 24 },
  { _id: 25, name: 'Lamp', category: 'Furniture', price: 45, stock: 120, brand: 'Philips', rating: 4.2, inStock: true, discount: 8, warranty: 12 },
  { _id: 26, name: 'Bookshelf', category: 'Furniture', price: 180, stock: 50, brand: 'IKEA', rating: 4.3, inStock: true, discount: 10, warranty: 24 },
  { _id: 27, name: 'Office Chair', category: 'Furniture', price: 200, stock: 65, brand: 'Steelcase', rating: 4.6, inStock: true, discount: 5, warranty: 48 },
  { _id: 28, name: 'Standing Desk', category: 'Furniture', price: 600, stock: 25, brand: 'Uplift', rating: 4.8, inStock: true, discount: 0, warranty: 60 },
  { _id: 29, name: 'Monitor Stand', category: 'Accessories', price: 35, stock: 140, brand: 'AmazonBasics', rating: 4.1, inStock: true, discount: 10, warranty: 12 },
  { _id: 30, name: 'Laptop Stand', category: 'Accessories', price: 40, stock: 130, brand: 'Rain Design', rating: 4.4, inStock: true, discount: 8, warranty: 12 },
  { _id: 31, name: 'Cable Organizer', category: 'Accessories', price: 15, stock: 250, brand: 'Anker', rating: 4.0, inStock: true, discount: 0, warranty: 6 },
  { _id: 32, name: 'Power Bank', category: 'Accessories', price: 50, stock: 180, brand: 'Anker', rating: 4.5, inStock: true, discount: 15, warranty: 18 },
  { _id: 33, name: 'Phone Case', category: 'Accessories', price: 20, stock: 300, brand: 'Spigen', rating: 4.3, inStock: true, discount: 5, warranty: 6 },
  { _id: 34, name: 'Screen Protector', category: 'Accessories', price: 12, stock: 400, brand: 'Spigen', rating: 4.2, inStock: true, discount: 0, warranty: 6 },
  { _id: 35, name: 'Charging Cable', category: 'Accessories', price: 18, stock: 350, brand: 'Anker', rating: 4.4, inStock: true, discount: 10, warranty: 12 },
  { _id: 36, name: 'Wireless Charger', category: 'Accessories', price: 30, stock: 160, brand: 'Belkin', rating: 4.3, inStock: true, discount: 12, warranty: 12 },
  { _id: 37, name: 'Bluetooth Adapter', category: 'Accessories', price: 25, stock: 200, brand: 'TP-Link', rating: 4.1, inStock: true, discount: 8, warranty: 12 },
  { _id: 38, name: 'HDMI Cable', category: 'Accessories', price: 15, stock: 280, brand: 'AmazonBasics', rating: 4.2, inStock: true, discount: 0, warranty: 12 },
  { _id: 39, name: 'Ethernet Cable', category: 'Accessories', price: 12, stock: 320, brand: 'AmazonBasics', rating: 4.0, inStock: true, discount: 0, warranty: 12 },
  { _id: 40, name: 'Surge Protector', category: 'Accessories', price: 28, stock: 150, brand: 'Belkin', rating: 4.5, inStock: true, discount: 10, warranty: 24 },
  { _id: 41, name: 'Graphics Card', category: 'Components', price: 800, stock: 30, brand: 'NVIDIA', rating: 4.9, inStock: false, discount: 0, warranty: 36 },
  { _id: 42, name: 'Motherboard', category: 'Components', price: 250, stock: 45, brand: 'ASUS', rating: 4.6, inStock: true, discount: 8, warranty: 36 },
  { _id: 43, name: 'RAM 16GB', category: 'Components', price: 120, stock: 100, brand: 'Corsair', rating: 4.7, inStock: true, discount: 10, warranty: 60 },
  { _id: 44, name: 'CPU', category: 'Components', price: 400, stock: 55, brand: 'Intel', rating: 4.8, inStock: true, discount: 5, warranty: 36 },
  { _id: 45, name: 'CPU Cooler', category: 'Components', price: 80, stock: 90, brand: 'Cooler Master', rating: 4.4, inStock: true, discount: 12, warranty: 24 },
  { _id: 46, name: 'Power Supply', category: 'Components', price: 150, stock: 70, brand: 'Corsair', rating: 4.7, inStock: true, discount: 10, warranty: 60 },
  { _id: 47, name: 'PC Case', category: 'Components', price: 100, stock: 60, brand: 'NZXT', rating: 4.5, inStock: true, discount: 15, warranty: 24 },
  { _id: 48, name: 'Thermal Paste', category: 'Components', price: 10, stock: 200, brand: 'Arctic', rating: 4.3, inStock: true, discount: 0, warranty: 12 },
  { _id: 49, name: 'Fan', category: 'Components', price: 20, stock: 150, brand: 'Noctua', rating: 4.6, inStock: true, discount: 5, warranty: 72 },
  { _id: 50, name: 'RGB Strips', category: 'Components', price: 25, stock: 180, brand: 'Corsair', rating: 4.2, inStock: true, discount: 10, warranty: 12 },
  { _id: 51, name: 'Projector', category: 'Electronics', price: 500, stock: 35, brand: 'Epson', rating: 4.5, inStock: true, discount: 12, warranty: 24 },
  { _id: 52, name: 'Smart TV', category: 'Electronics', price: 700, stock: 40, brand: 'LG', rating: 4.7, inStock: true, discount: 10, warranty: 24 },
  { _id: 53, name: 'Soundbar', category: 'Electronics', price: 180, stock: 75, brand: 'Sony', rating: 4.4, inStock: true, discount: 15, warranty: 12 },
  { _id: 54, name: 'Camera', category: 'Electronics', price: 900, stock: 25, brand: 'Canon', rating: 4.8, inStock: true, discount: 5, warranty: 12 },
  { _id: 55, name: 'Tripod', category: 'Accessories', price: 50, stock: 110, brand: 'Manfrotto', rating: 4.5, inStock: true, discount: 8, warranty: 24 },
  { _id: 56, name: 'Drone', category: 'Electronics', price: 600, stock: 20, brand: 'DJI', rating: 4.9, inStock: true, discount: 0, warranty: 12 },
  { _id: 57, name: 'Action Camera', category: 'Electronics', price: 300, stock: 50, brand: 'GoPro', rating: 4.6, inStock: true, discount: 10, warranty: 12 },
  { _id: 58, name: 'E-Reader', category: 'Electronics', price: 130, stock: 80, brand: 'Amazon', rating: 4.7, inStock: true, discount: 12, warranty: 12 },
  { _id: 59, name: 'Fitness Tracker', category: 'Electronics', price: 100, stock: 140, brand: 'Fitbit', rating: 4.3, inStock: true, discount: 15, warranty: 12 },
  { _id: 60, name: 'Smart Doorbell', category: 'Electronics', price: 150, stock: 65, brand: 'Ring', rating: 4.5, inStock: true, discount: 10, warranty: 24 }
];

const seed60Products = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const playgroundDb = getPlaygroundDb();
    const productsCollection = playgroundDb.collection('products');

    await productsCollection.deleteMany({});
    console.log('Cleared existing products collection');

    await productsCollection.insertMany(productsData);
    console.log('Seeded products collection with 60 records');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seed60Products();
