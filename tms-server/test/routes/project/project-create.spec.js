// Developer: Meher Salim
// File: project-create.spec.js
// Description: Unit testing for creating a new project
// Credits: Lean, Mean, and Pragmatic - A Guide to Full-Stack JavaScript Development

// Dependencies
const request = require('supertest');
const app = require('../../../src/app/app');
const { Project } = require('../../../src/models/project');
// Mock database model
jest.mock('../../../src/models/project');

// Create Project API Tests
describe('POST /api/projects', () => {
  // Mock the save method to resolve with a project object
  beforeAll(() => {
    Project.prototype.save.mockResolvedValue({ projectId: "1" });
  })
  // Clear mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  })

  // Test creating a project with valid data
  it('should create a project successfully', async () => {
    const response = await request(app).post('/api/projects').send({
      "name": "Project Alpha",
      "description": "Initial phase of the project",
      "startDate": "2024-12-01T00:00:00.000Z",
    });

    // Assert successful creation
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Project created successfully');
  });

  // Test creating a project with invalid required data
  it('should return validation errors for invalid data', async () => {
    const response = await request(app).post('/api/projects').send({
      "name": "Hi",
      "description": "Test description",
      "startDate": "2024-12-01T00:00:00.000Z"
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('must NOT have fewer than 3 characters');
  });

  // Test handling invalid data types
  it('should return validation errors for invalid data types', async () => {
    const response = await request(app).post('/api/projects').send({
      "name": 12345,
      "description": true,
      "startDate": "Invalid Date"
    });

    // Assert invalid data types return appropriate error
    expect(response.status).toBe(400);
    expect(response.body.message).toContain('must be string');
  });

  // Test simulating database save failures
  it('should handle database save errors gracefully', async () => {
    Project.prototype.save.mockRejectedValue(new Error('Database save failed'));

    const response = await request(app).post('/api/projects').send({
      "name": "Project Beta",
      "description": "Database error test",
      "startDate": "2024-12-02T00:00:00.000Z",
    });

    // Server error response when database save fails
    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Internal Server Error');
  });

  // Test handling duplicate project names
  it('should return error for duplicate project names', async () => {
    Project.prototype.save.mockRejectedValue({ code: 11000 }); // Simulate MongoDB duplicate key error

    const response = await request(app).post('/api/projects').send({
      "name": "Project Alpha",
      "description": "Duplicate name test",
      "startDate": "2024-12-01T00:00:00.000Z",
    });

    // 400 error for duplicate entry
    expect(response.status).toBe(400);
    expect(response.body.message).toContain('Duplicate project name');
  });

  // Test missing required fields validation errors
  it('should return validation errors for missing required fields', async () => {
    const response = await request(app).post('/api/projects').send({
      "description": "Missing name field",
      "startDate": "2024-12-01T00:00:00.000Z"
    });

    // 400 error with validation for missing required fields
    expect(response.status).toBe(400);
    expect(response.body.message).toContain("data must have required property 'name'");
  });
})