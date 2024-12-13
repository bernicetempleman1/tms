//Leah Harris
//Tests for API used in project-search component


const app = require('../../../src/app/app');
const { Project } = require('../../../src/models/project');
const request = require('supertest');

//Mock the project model
jest.mock('../../../src/models/project');


describe('GET /api/projects search', () => {
  it('should return an empty array if no data is available', async () => {
    Project.find.mockResolvedValue([]);

    const response = await request(app).get('/api/projects');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
    expect(response.body).toEqual([]);
  });

  it('should return a 500 error if there is a database connection issue', async () => {
    Project.find.mockRejectedValue(new Error('Database error'));

    const response = await request(app).get('/api/projects');
// Expect 500 status code for server error
    expect(response.status).toBe(500);
  });

  it('should return expected properties', async () => {
    const mockProjects = [
      { projectId: 2, name: "Project 2", description: "Description of project 2", startDate: "2024-12-01T00:00:00.000Z", dueDate: "2025-12-01T00:00:00.000Z"}
    ];

    Project.find.mockResolvedValue(mockProjects);

    const response = await request(app).get('/api/projects');

    expect(response.status).toBe(200);
    response.body.forEach(project => {
      expect(project).toHaveProperty('projectId');
      expect(project).toHaveProperty('name');
      expect(project).toHaveProperty('description');
      expect(project).toHaveProperty('startDate');
      expect(project).toHaveProperty('dueDate');
    });
  });
});