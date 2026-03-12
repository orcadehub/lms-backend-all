const mongoose = require('mongoose');
const MongoDBPlaygroundQuestion = require('../models/MongoDBPlaygroundQuestion');
require('dotenv').config();

const instructorId = '697a3c92903954e2291a2d89';
const tenantId = '697a3c92903954e2291a2d88';

const mongoDBProductsQuestions = [
  {
    title: "Find Products with Price Greater Than 200",
    problemStatement: "Write a MongoDB query to find all products whose price is greater than 200.",
    collectionName: "products",
    starterCode: "",
    testCases: [
      {
        description: "Should return products with price > 200",
        expectedQuery: "db.products.find({ price: { $gt: 200 } })",
        isPublic: true
      }
    ],
    difficulty: "easy",
    tags: ["find", "comparison operators", "$gt"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Find Electronics Products with Price Between 100 and 500",
    problemStatement: "Write a MongoDB query to find all Electronics products whose price is between 100 and 500 (inclusive).",
    collectionName: "products",
    starterCode: "",
    testCases: [
      {
        description: "Should return Electronics products with price between 100-500",
        expectedQuery: "db.products.find({ category: 'Electronics', price: { $gte: 100, $lte: 500 } })",
        isPublic: true
      }
    ],
    difficulty: "medium",
    tags: ["find", "comparison operators", "$gte", "$lte"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Find Products with Discount Greater Than 10 or Rating Greater Than 4.5",
    problemStatement: "Write a MongoDB query to find all products that have either discount greater than 10 OR rating greater than 4.5.",
    collectionName: "products",
    starterCode: "",
    testCases: [
      {
        description: "Should return products with discount > 10 or rating > 4.5",
        expectedQuery: "db.products.find({ $or: [{ discount: { $gt: 10 } }, { rating: { $gt: 4.5 } }] })",
        isPublic: true
      }
    ],
    difficulty: "medium",
    tags: ["find", "logical operators", "$or", "$gt"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Find Products from Samsung or Apple Brand",
    problemStatement: "Write a MongoDB query to find all products that are from either Samsung or Apple brand.",
    collectionName: "products",
    starterCode: "",
    testCases: [
      {
        description: "Should return products from Samsung or Apple",
        expectedQuery: "db.products.find({ brand: { $in: ['Samsung', 'Apple'] } })",
        isPublic: true
      }
    ],
    difficulty: "medium",
    tags: ["find", "logical operators", "$in"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Find In-Stock Electronics Products with Projection",
    problemStatement: "Write a MongoDB query to find all in-stock Electronics products. Return only name, brand, and price fields.",
    collectionName: "products",
    starterCode: "",
    testCases: [
      {
        description: "Should return in-stock Electronics products with projection",
        expectedQuery: "db.products.find({ category: 'Electronics', inStock: true }, { name: 1, brand: 1, price: 1, _id: 0 })",
        isPublic: true
      }
    ],
    difficulty: "medium",
    tags: ["find", "logical operators", "projection"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Find Top 5 Products by Rating",
    problemStatement: "Write a MongoDB query to find the top 5 products with the highest rating. Sort by rating in descending order.",
    collectionName: "products",
    starterCode: "",
    testCases: [
      {
        description: "Should return top 5 products by rating",
        expectedQuery: "db.products.find().sort({ rating: -1 }).limit(5)",
        isPublic: true
      }
    ],
    difficulty: "medium",
    tags: ["find", "sort", "limit"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Count Products by Category",
    problemStatement: "Write a MongoDB aggregation query to count the number of products in each category.",
    collectionName: "products",
    starterCode: "",
    testCases: [
      {
        description: "Should return count of products grouped by category",
        expectedQuery: "db.products.aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }])",
        isPublic: true
      }
    ],
    difficulty: "hard",
    tags: ["aggregation", "$group", "$sum"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Find Average Price by Brand",
    problemStatement: "Write a MongoDB aggregation query to find the average price for each brand. Round the average to 2 decimal places.",
    collectionName: "products",
    starterCode: "",
    testCases: [
      {
        description: "Should return average price grouped by brand with 2 decimals",
        expectedQuery: "db.products.aggregate([{ $group: { _id: '$brand', avgPrice: { $avg: '$price' } } }, { $project: { _id: 1, avgPrice: { $round: ['$avgPrice', 2] } } }])",
        isPublic: true
      }
    ],
    difficulty: "hard",
    tags: ["aggregation", "$group", "$avg", "$round", "$project"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Find Maximum and Minimum Price by Category",
    problemStatement: "Write a MongoDB aggregation query to find the maximum and minimum price for each category.",
    collectionName: "products",
    starterCode: "",
    testCases: [
      {
        description: "Should return max and min price by category",
        expectedQuery: "db.products.aggregate([{ $group: { _id: '$category', maxPrice: { $max: '$price' }, minPrice: { $min: '$price' } } }])",
        isPublic: true
      }
    ],
    difficulty: "hard",
    tags: ["aggregation", "$group", "$max", "$min"],
    createdBy: instructorId,
    tenant: tenantId
  },
  {
    title: "Find Average Rating by Category for Products with Stock Greater Than 50",
    problemStatement: "Write a MongoDB aggregation query to match only products with stock > 50, then calculate average rating for each category. Round the average to 2 decimal places.",
    collectionName: "products",
    starterCode: "",
    testCases: [
      {
        description: "Should return average rating by category for stock > 50 with 2 decimals",
        expectedQuery: "db.products.aggregate([{ $match: { stock: { $gt: 50 } } }, { $group: { _id: '$category', avgRating: { $avg: '$rating' } } }, { $project: { _id: 1, avgRating: { $round: ['$avgRating', 2] } } }])",
        isPublic: true
      }
    ],
    difficulty: "hard",
    tags: ["aggregation", "$match", "$group", "$avg", "$round", "$project"],
    createdBy: instructorId,
    tenant: tenantId
  }
];

async function seedMongoDBProductsQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const insertedQuestions = await MongoDBPlaygroundQuestion.insertMany(mongoDBProductsQuestions);
    console.log(`Inserted ${insertedQuestions.length} MongoDB products questions`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding MongoDB products questions:', error);
    process.exit(1);
  }
}

seedMongoDBProductsQuestions();
