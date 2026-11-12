
const Product = require('../models/Product');

// Display all products from MongoDB
exports.product_view_all_Page = async function(req, res) {
  try {
    const products = await Product.find();

    res.render('products', {
      title: 'Product Search Results',
      products: products
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
