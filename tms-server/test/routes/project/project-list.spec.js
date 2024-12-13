//Leah Harris
//File: project-list.spec.js
//Description: Test file for the API to list all projects

const request = require('supertest');
const app = require('../../../src/app/app');
const { Project } = require('../../../src/models/project');

//Mock the Project model
jest.mock('../../../src/models/project');

describe('GET /api/projects', () => {
  it('should get all projects', async () => {
    //Create mock projects
    testProjects = [
      {
        projectId: 1,
        name: 'Test project 1',
        description: 'Description for the first test project',
        startDate: '2023-09-04T21:39:36.605Z',
        endDate: '2023-09-04T21:39:36.605Z'
      },
      {
        projectId: 2,
        name: 'Test project 2',
        description: 'Description for the second test project',
        startDate: '2023-09-04T21:39:36.605Z',
        endDate: '2023-09-04T21:39:36.605Z'
      }
    ];

    //Mock the find method with mock projects array
    Project.find.mockResolvedValue(testProjects);

    //Make call to route
    const response = await request(app).get('/api/projects');

    //Compare the expected response status, array and title
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].name).toBe('Test project 1');
  });

  it('should return 404 error for an incorrect route', async () => {
    //Make call to incorrect route
    const response = await request(app).get('/api/projjects');

    //Compare expected response status and body message
    expect(response.status).toBe(404);
    expect(response.body.message).toContain('Not Found');

  });

  it('should return an empty array if no projects are found', async () => {
    //Mock the model
    Project.find.mockResolvedValue([]);

    //Call the route
    const emptyArray = await request(app).get('/api/projects');

    //Compare expected results status and body
    expect(emptyArray.status).toBe(200);
    expect(emptyArray.body).toEqual([]);
  });
});