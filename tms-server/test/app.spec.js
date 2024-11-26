/**
 * Author: Professor Krasso
 * Date: 7 August 2024
 * File: app.spec.js
 * Description: Test file for the Express application setup.
 * 
 * 26 November 2024 Updated by Bernice Templeman: TMS database connection string
 *
 */

// Require statements
const mongoose = require("mongoose");
const request = require('supertest');
const express = require('express');
const app = require('../src/app/app');
const { errorHandler } = require('../src/error-handler');

// Connect to a test database
beforeAll(async () => {
  const connectionString =
    "mongodb+srv://tms_user:s3cret@bellevueuniversity.lftytpq.mongodb.net/?retryWrites=true&w=majority&appName=BellevueUniversity";
  try {
    await mongoose.connect(connectionString, {
      dbName: "tms",
    });
    console.log("task.spec.js Connection to the database instance was successful");
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`);
  }
});

// Close the database connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
  console.log("Database connection closed");
});

// Test cases
describe('app.js', () => {
  // Test the CORS configuration
  it('should set CORS headers', async () => {
    const response = await request(app).get('/api');
    expect(response.headers['access-control-allow-origin']).toBe('*');
    expect(response.headers['access-control-allow-methods']).toBe('GET, POST, PUT, PATCH, DELETE, OPTIONS');
    expect(response.headers['access-control-allow-headers']).toBe('Origin, X-Requested-With, Content-Type, Accept');
  });

  // Test the 500 error handler
  it('should handle 500 errors and return appropriate response', async () => {
    // Create a new instance of the app for testing
    const testApp = express();

    // Define a route that throws an error
    testApp.get('/error', (req, res, next) => {
      const error = new Error('Test error');
      error.status = 500;
      next(error);
    });

    // Use the error handling middleware directly
    testApp.use(errorHandler);

    const response = await request(testApp).get('/error');
    expect(response.status).toBe(500);
    expect(response.body).toEqual(expect.objectContaining({
      type: 'error',
      status: 500,
      message: 'Test error'
    }));
  });

  // Test the 404 error handler
  it('should return 404 for undefined routes', async () => {
    const response = await request(app).get('/undefined-route');
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expect.objectContaining({
      type: 'error',
      status: 404,
      message: 'Not Found'
    }));
  });
});