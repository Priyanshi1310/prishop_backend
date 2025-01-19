const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('OrderItem Model', function () {
    let expect;
  
    before(async () => {
      const chai = await import('chai');
      expect = chai.expect; // Dynamically import chai
    });
  
    it('should be invalid if required fields are missing', async function () {
      const { OrderItem } = require('../../models/order-item'); // Import the OrderItem model
      const orderItem = new OrderItem(); // Missing all required fields
  
      try {
        await orderItem.validate();
        throw new Error('Validation should fail when required fields are missing');
      } catch (err) {
      //  console.log('Validation Error Details:', err.errors); // Debugging
  
        expect(err).to.have.property('errors'); // Ensure errors exist
  
        const requiredFields = ['quantity']; // Only 'quantity' is required
  
        requiredFields.forEach((field) => {
          const fieldError = err.errors?.[field];
         // console.log(`Error for field '${field}':`, fieldError); // Debug log
  
          expect(fieldError).to.not.be.undefined; // Field error must exist
          expect(fieldError.message).to.contain(`Path \`${field}\` is required.`);
        });
      }
    });
  
    it('should save successfully when all required fields are provided', async function () {
      const { OrderItem } = require('../../models/order-item'); // Import the OrderItem model
  
      // Using ObjectId directly, instead of a string
      const productId = new mongoose.Types.ObjectId('60b8d6e3f8f6e5b0e8e24f88'); // Generate ObjectId
  
      const orderItem = new OrderItem({
        quantity: 2,
        product: productId, // Use ObjectId here
      });
  
      try {
        const savedOrderItem = await orderItem.save();
       // console.log('Saved OrderItem:', savedOrderItem); // Debugging
  
        expect(savedOrderItem).to.have.property('quantity').that.equals(2);
        // Compare ObjectId properly
        expect(savedOrderItem.product.toString()).to.equal(productId.toString()); // Use .toString() for comparison
      } catch (err) {
        throw new Error('OrderItem saving failed: ' + err.message);
      }
    });
  });
  