//Leah Harris
//Test file for task read by id API


const app = require('../../../src/app/app');
const { Task } = require('../../../src/models/task');
const request = require('supertest');


//Mock the task model
jest.mock('../../../src/models/task');

//Test suite for task-read-by-id API
describe('Read Task By Id API', () => {
  describe('GET /api/tasks/:taskId', () => {

    it('should get a task by Id', async () => {
      //Mock the findOne method
      Task.findOne.mockResolvedValue({ title: 'Complete github repository setup' });
      console.log(Task.findOne.mockResolvedValue);

      //Make request and assign response
      const response = await request(app).get('/api/tasks/650c1f1e1c9d440000a1b1c2');

      //Expected results
      expect(response.status).toBe(200);
      expect(response.body.title).toBe('Complete github repository setup');
    });
  });

  it('should handle errors', async () => {
    //Mock an error
    Task.findOne.mockRejectedValue(new Error('Database error'));

    //Make request to route and assign to variable
    const response = await request(app).get('/api/tasks/650c1f1e1c9d440000a1b1c2');
    //Expected results
    expect(response.status).toBe(500);
  });

  it('should return a 404 error for incorrect route', async () => {
    Task.findOne.mockResolvedValue(null);

    const response = await request(app).get('/api/taasks/650c1f1e1c9d440000a1b1c2');
    expect(response.status).toBe(404);
  });
});