const { Category } = require('../../models/category');  

describe('Category Model', function () {
    it('should be invalid if required fields are missing', async function () {
      const { expect } = await import('chai'); // Dynamically import chai
  
      const category = new Category(); // Missing required fields
  
      try {
        await category.validate(); // Validate the category model
        throw new Error('Validation should fail when required fields are missing');
      } catch (err) {
        //console.log('Validation Error Details:', err.errors); // Debugging
        expect(err).to.have.property('errors'); // Ensure errors exist
  
        // Check for required fields
        const requiredFields = ['name']; // 'name' is required for Category
  
        requiredFields.forEach((field) => {
          const fieldError = err.errors?.[field];
          //console.log(`Error for field '${field}':`, fieldError); // Debug log
  
          expect(fieldError).to.not.be.undefined; // Field error must exist
          expect(fieldError.message).to.contain(`Path \`${field}\` is required.`);
        });
      }
    });
  
    it('should save successfully when all required fields are provided', async function () {
      const { expect } = await import('chai'); // Dynamically import chai
  
      const category = new Category({
        name: 'Test Category',
        icon: 'test_icon.png',
        color: 'blue',
      });
  
      try {
        const savedCategory = await category.save();
        //console.log('Saved Category:', savedCategory); // Debugging
  
        expect(savedCategory).to.have.property('name').that.equals('Test Category');
        expect(savedCategory).to.have.property('icon').that.equals('test_icon.png');
        expect(savedCategory).to.have.property('color').that.equals('blue');
      } catch (err) {
        throw new Error('Category saving failed: ' + err.message);
      }
    });
  });
  