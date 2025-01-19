const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { Order } = require('../../models/order');
const {OrderItem} = require('../../models/order-item');

let mongoServer;

before(async function () {
  this.timeout(15000); // Increase timeout for this hook
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.disconnect(); // Ensure no active connections
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

after(async function () {
  this.timeout(15000);
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Order Model', () => {
  it('should save successfully when all required fields are provided', async () => {
    const chai = await import('chai');
    const { expect } = chai;

    const order = new Order({
      orderItems: [new mongoose.Types.ObjectId()],
      shippingAddress1: '123 Test Street',
      city: 'Test City',
      zip: '12345',
      country: 'Test Country',
      phone: '1234567890',
      status: 'Pending',
      totalPrice: 100.0,
      user: new mongoose.Types.ObjectId(),
    });

    const savedOrder = await order.save();
    expect(savedOrder).to.exist;
    expect(savedOrder).to.have.property('orderItems').with.lengthOf(1);
    expect(savedOrder).to.have.property('shippingAddress1', '123 Test Street');
  });


  it('should be invalid if required fields are missing', async () => {
    const chai = await import('chai');
    const { expect } = chai;
  
    const order = new Order(); // Missing all required fields
  
    try {
      await order.validate();
      throw new Error('Validation should fail when required fields are missing');
    } catch (err) {
  
      expect(err).to.have.property('errors'); // Ensure errors exist
  
      const requiredFields = ['orderItems', 'shippingAddress1', 'city', 'zip', 'country', 'phone'];
  
      requiredFields.forEach((field) => {
        const fieldError = err.errors?.[field];
  
        expect(fieldError).to.not.be.undefined; // Field error must exist
  
        if (field === 'orderItems') {
          // Custom validation message for orderItems
          expect(fieldError.message).to.equal('Path `orderItems` must contain at least one item.');
        } else {
          // Default required message for other fields
          expect(fieldError.message).to.contain(`Path \`${field}\` is required.`);
        }
      });
    }
  });  
});
