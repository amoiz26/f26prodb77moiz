
var express = require('express');
var router = express.Router();

var api_controller = require('../controllers/api');
const Product = require('../models/Product');

// API resource information (SS5)
router.get('/', api_controller.api);

// Return all products from MongoDB (SS6)
router.get('/products', async function(req, res) {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;
