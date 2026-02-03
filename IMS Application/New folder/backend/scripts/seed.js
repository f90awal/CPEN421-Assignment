require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Product = require('../models/Product');

async function main() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ims';
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to', uri);

  // create default user
  const email = 'admin@example.com';
  let user = await User.findOne({ email });
  if (!user) {
    const pwd = 'password123';
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pwd, salt);
    user = new User({ name: 'Admin', email, password: hash, role: 'admin' });
    await user.save();
    console.log('Created user', email, 'password:', pwd);
  } else console.log('User exists', email);

  // create sample products
  const samples = [
    { name: 'Widget A', sku: 'WIDGET-A', description: 'Small widget', quantity: 10, price: 4.99 },
    { name: 'Widget B', sku: 'WIDGET-B', description: 'Large widget', quantity: 5, price: 9.99 }
  ];

  for (const s of samples) {
    let p = await Product.findOne({ sku: s.sku });
    if (!p) {
      p = new Product(s);
      await p.save();
      console.log('Inserted product', s.sku);
    } else console.log('Product exists', s.sku);
  }

  await mongoose.disconnect();
  console.log('Seed complete');
}

main().catch(err => { console.error(err); process.exit(1); });
