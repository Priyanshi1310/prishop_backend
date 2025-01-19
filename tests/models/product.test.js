const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { Product } = require('../../models/product'); // Adjust the path if needed

let mongoServer;

before(async function () {
  this.timeout(15000);
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.disconnect(); // Ensure no active connections
  await mongoose.connect(uri);
});

after(async function () {
  this.timeout(15000);
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Product Model', () => {
  it('should save successfully when all required fields are provided', async () => {
    const product = new Product({
      name: 'Test Product',
      description: 'This is a test product',
      price: 100,
      countInStock: 10,
      category: new mongoose.Types.ObjectId(), // Mock category ID
    });

    const savedProduct = await product.save();
    if (!savedProduct) throw new Error('Product not saved');
  });

  it('should be invalid if required fields are missing', async () => {
    const product = new Product(); // No fields provided
  
    try {
      await product.validate();
      throw new Error('Validation should fail when required fields are missing');
    } catch (err) {
      // Validation failed as expected, so the test passes
      if (!err.errors.name || !err.errors.description || !err.errors.countInStock) {
        throw new Error('Expected validation errors for missing required fields');
      }
    }
  });
  
});
