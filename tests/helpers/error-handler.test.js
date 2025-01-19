describe('Error Handler Middleware', function () {

    it('should return 401 for UnauthorizedError', async function () {
      const { expect } = await import('chai');
      const sinon = await import('sinon');
      const errorHandler = require('../../helpers/error-handler'); // Update this path accordingly
  
      const err = new Error('Unauthorized');
      err.name = 'UnauthorizedError';
      
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };
      const next = sinon.spy();
  
      errorHandler(err, req, res, next);
  
      expect(res.status.calledWith(401)).to.be.true; // Status should be 401
      expect(res.json.calledWith({ message: "The user is not authorized" })).to.be.true; // Correct message
    });
  
    it('should return 401 for ValidationError', async function () {
      const { expect } = await import('chai');
      const sinon = await import('sinon');
      const errorHandler = require('../../helpers/error-handler'); // Update this path accordingly
  
      const err = new Error('Validation failed');
      err.name = 'ValidationError';
      
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };
      const next = sinon.spy();
  
      errorHandler(err, req, res, next);
  
      expect(res.status.calledWith(401)).to.be.true; // Status should be 401
      expect(res.json.calledWith({ message: err })).to.be.true; // Validation error message
    });
  
    it('should return 500 for generic errors', async function () {
      const { expect } = await import('chai');
      const sinon = await import('sinon');
      const errorHandler = require('../../helpers/error-handler'); // Update this path accordingly
  
      const err = new Error('Server Error');
      
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };
      const next = sinon.spy();
  
      errorHandler(err, req, res, next);
  
      expect(res.status.calledWith(500)).to.be.true; // Status should be 500
      expect(res.json.calledWith(err)).to.be.true; // The generic error message
    });
  
  });
  