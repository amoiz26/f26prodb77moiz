
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const productController = require('../controllers/products');

// GET all products as JSON
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Display all products on a webpage
router.get('/view', async (req, res) => {
  try {
    const products = await Product.find();
    res.render('products', {
      title: 'Products from MongoDB',
      products: products
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Display all products using the controller
router.get('/all', productController.product_view_all_Page);
router.get('/products', productController.product_view_all_Page);


 // POST - Create a new product in MongoDB
router.post('/', async (req, res) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;
