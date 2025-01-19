describe('User Model', function () {
    let expect;
  
    before(async () => {
      const chai = await import('chai');
      expect = chai.expect; // Dynamically import chai and set up `expect`
    });
  
    it('should be invalid if required fields are missing', async function () {
      const { User } = require('../../models/user'); // Import the User model
      const user = new User(); // Missing all required fields
  
      try {
        await user.validate();
        throw new Error('Validation should fail when required fields are missing');
      } catch (err) {
  
        expect(err).to.have.property('errors'); // Ensure errors exist
  
        const requiredFields = ['name', 'email', 'passwordHash', 'phone'];
  
        requiredFields.forEach((field) => {
          const fieldError = err.errors?.[field];
  
          expect(fieldError).to.not.be.undefined; // Field error must exist
          expect(fieldError.message).to.contain(`Path \`${field}\` is required.`);
        });
      }
    });
  
    it('should save successfully when all required fields are provided', async function () {
      const { User } = require('../../models/user'); // Import the User model
  
      const user = new User({
        name: 'John Doe',
        email: 'johndoe@example.com',
        passwordHash: 'hashedpassword123',
        phone: '1234567890',
      });
  
      try {
        const savedUser = await user.save();  
        expect(savedUser).to.have.property('name').that.equals('John Doe');
        expect(savedUser).to.have.property('email').that.equals('johndoe@example.com');
        expect(savedUser).to.have.property('phone').that.equals('1234567890');
      } catch (err) {
        throw new Error('User saving failed: ' + err.message);
      }
    });
  });
  