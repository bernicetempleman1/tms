/**
 * Author: Bernice Templeman
 * Date: 4 December 2024
 * File: project-read.spec.js
 * Description: Test the index route.
 */

const app = require('../../../src/app/app');
const { Project } = require('../../../src/models/project');
const request = require('supertest');

//Mock the project model
jest.mock('../../../src/models/project');

//Test suite for project-read-by-id API
describe('Read Project By Id API', () => {
  describe('GET /api/projects/:projectId', () => {

    it('should get a project by Id', async () => {
      //Mock the findOne method
      Project.findOne.mockResolvedValue({ name: 'Complete project documentation' });
      console.log(Project.findOne.mockResolvedValue);

      //Make request and assign response
      const response = await request(app).get('/api/projects/1');

      //Expected results
      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Complete project documentation');
    });
  });

  it('should handle errors', async () => {
    //Mock an error
    Project.findOne.mockRejectedValue(new Error('Database error'));

    //Make request to route and assign to variable
    const response = await request(app).get('/api/projects/1');
    //Expected results
    expect(response.status).toBe(500);
  });

  it('should return a 404 error for incorrect route', async () => {
    Project.findOne.mockResolvedValue(null);

    const response = await request(app).get('/api/proojects/badId');
    expect(response.status).toBe(404);
  });
});