const express = require('express');
const router = express.Router();

const Product = require('../models/Product');
const auth = require('../middleware/auth');

// GET /api/products - list all
router.get('/', auth, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// POST /api/products - create
router.post('/', auth, async (req, res) => {
  try {
    const { name, sku, description, quantity, price } = req.body;
    let existing = await Product.findOne({ sku });
    if (existing) return res.status(400).json({ message: 'SKU already exists' });

    const product = new Product({ name, sku, description, quantity, price });
    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// GET /api/products/:id - single
router.get('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// PUT /api/products/:id - update
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, sku, description, quantity, price } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.name = name ?? product.name;
    product.sku = sku ?? product.sku;
    product.description = description ?? product.description;
    product.quantity = quantity ?? product.quantity;
    product.price = price ?? product.price;

    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// DELETE /api/products/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    await product.remove();
    res.json({ message: 'Product removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
