
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_CON);
    console.log('Connected to MongoDB Atlas');

    const products = [
      {
        name: 'Laptop',
        price: 799,
        category: 'Electronics'
      },
      {
        name: 'Headphones',
        price: 99,
        category: 'Accessories'
      },
      {
        name: 'Keyboard',
        price: 49,
        category: 'Computer Accessories'
      }
    ];

    await Product.insertMany(products);

    console.log('3 products added successfully!');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

seedProducts();
