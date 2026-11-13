
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


 // GET one product by ID (Lab 12 Part 1)
router.get('/products/:id', async function(req, res) {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                error: "Product not found"
            });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({
            error: "Product for ID " + req.params.id + " not found"
        });
    }
});


 // PUT update one product by ID (Lab 12 Part 2)
router.put('/products/:id', async function(req, res) {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                error: "Product not found"
            });
        }

        if (req.body.name !== undefined) {
            product.name = req.body.name;
        }

        if (req.body.price !== undefined) {
            product.price = req.body.price;
        }

        if (req.body.category !== undefined) {
            product.category = req.body.category;
        }

        const updatedProduct = await product.save();

        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});



module.exports = router;
