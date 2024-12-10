// Developer: Meher Salim
// File: project-create.spec.js
// Description: Unit testing for creating a new project

const request = require('supertest');
const app = require('../../../src/app/app');
const { Project } = require('../../../src/models/project');

jest.mock('../../../src/models/project');

// Create Project API Tests
describe('POST /api/projects', () => {
  beforeAll(() => {
    Project.prototype.save.mockResolvedValue({ projectId: "1" });
  })

  it('should create a project successfully', async () => {
    const response = await request(app).post('/api/projects').send({
      "name": "Project Alpha",
      "description": "Initial phase of the project",
      "startDate": "2024-12-01T00:00:00.000Z",
    });

    console.log("Response Status:", response.status);
    console.log("Response Body:", response.body);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Project created successfully');
  });

  it('should return validation errors for invalid data', async () => {
    const response = await request(app).post('/api/projects').send({
      "name": "Hi",
      "description": "Test description",
      "startDate": "2024-12-01T00:00:00.000Z"
    });

    console.log("Response Status:", response.status);
    console.log("Response Body:", response.body);
    expect(response.status).toBe(400);
    expect(response.body.message).toContain('must NOT have fewer than 3 characters');
  });
})