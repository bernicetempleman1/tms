//Leah Harris
//Test file for delete-task API

const app = require('../../../src/app/app');
const { Task } = require('../../../src/models/task');
const request = require('supertest');

jest.mock('../../../src/models/task');

//Test suite for delete task API
describe('Delete a task API', () => {

  it('should handle errors', async () => {
    //Mock the deleteOne method
    Task.deleteOne.mockRejectedValue(new Error('Database error'));

    //Make request
    const response = await request(app).delete('/api/tasks/650c1f1e1c9d440000a1b1c2');

    //Expected results
    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Database error');
  });

  it('should successfully delete a task', async () => {
    //Mock the deleteOne method
    Task.deleteOne.mockResolvedValue({ deletedCount: 1 });

    //Make request to API
    const response = await request(app).delete('/api/tasks/650c1f1e1c9d440000a1b1c2');

    //Expected response
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Task deleted successfully');
    expect(response.body.id).toBe('650c1f1e1c9d440000a1b1c2');
  });

  it('should return 404 status for incorrect route', async () => {
    //Mock deleteOne method
    Task.deleteOne.mockResolvedValue({ deletedCount: 1 });

    //Make request to invalid route
    const response = await request(app).delete('/api/tassks/650c1f1e1c9d440000a1b1c2');

    //Expected response
    expect(response.status).toBe(404);
  });
});
