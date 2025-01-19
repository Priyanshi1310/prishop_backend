const request = require('supertest');
const express = require('express');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const authJwt = require('../../helpers/jwt'); // Path to your authJwt middleware

const app = express();
app.use(express.json());

// Set mock environment variables for secret and API URL
process.env.secret = 'mocked_secret_key';  // Ensure this is set
process.env.API_URL = 'http://localhost:5000';

// Add a public route and a protected route

app.get('/api/v1/open', (req, res) => {
    res.status(200).send('Open API route');
  });
  
app.get('/api/v1/public', (req, res) => {
  res.status(200).send('Public route');
});

app.get('/api/v1/protected', authJwt(), (req, res) => {
  res.status(200).send('Protected route');
});

describe('authJwt Middleware', function () {
  let validToken;
  let invalidToken;

  beforeEach(() => {
    // Create a valid token (with `isAdmin: true`) and an invalid token (with `isAdmin: false`)
    validToken = jwt.sign({ isAdmin: true }, process.env.secret, { expiresIn: '1h' });
    invalidToken = jwt.sign({ isAdmin: false }, process.env.secret, { expiresIn: '1h' });
  });

  it('should allow access to public routes', async function () {
    const { expect } = await import('chai');
    const res = await request(app).get('/api/v1/public');
    expect(res.status).to.equal(200);  // Public route should return 200
  });

  it('should allow access to open API routes', async function () {
    const { expect } = await import('chai');
    const res = await request(app)
    .get('/api/v1/open') // Ensure this matches the route defined in your app
    .set('Authorization', `Bearer ${validToken}`);
    expect(res.status).to.equal(200); // Expecting 200 for valid access
  });

  it('should allow access to protected routes with a valid token', async function () {
    const { expect } = await import('chai');
    const res = await request(app)
      .get('/api/v1/protected')
      .set('Authorization', `Bearer ${validToken}`);  // Use valid token

    expect(res.status).to.equal(200);  // Protected route should return 200 for valid token
  });

  it('should revoke access if the user is not admin', async function () {
    const { expect } = await import('chai');
    const res = await request(app)
      .get('/api/v1/protected')
      .set('Authorization', `Bearer ${invalidToken}`);  // Use invalid token

    expect(res.status).to.equal(401);  // Should return 401 for non-admin user
  });

  it('should return 401 for missing or invalid token', async function () {
    const { expect } = await import('chai');
    const res = await request(app).get('/api/v1/protected');  // No token provided

    expect(res.status).to.equal(401);  // Should return 401 for missing or invalid token
  });
  it('should return 401 for invalid token', async function () {
    const { expect } = await import('chai');
    const res = await request(app)
      .get('/api/v1/protected')
      .set('Authorization', 'Bearer invalidtoken');  // Invalid token passed
    expect(res.status).to.equal(401);  // Expecting 401 for invalid token
  });
});
