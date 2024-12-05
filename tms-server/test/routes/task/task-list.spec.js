// Developer: Meher Salim
// File: task-list.spec.js
// Description: API tests to list all tasks

const request = require('supertest');
const app = require('../../../src/app/app');
const mongoose = require('mongoose');
const { Task } = require('../../../src/models/task');

jest.mock('../../../src/models/task');

describe("Task API Test: List All", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should list all tasks successfully", async () => {
    const mockTasks = [
      { title: "Task 1", status: "Pending", priority: "High", dueDate: "2024-12-10", projectId: "1" },
      { title: "Task 2", status: "Completed", priority: "Low", dueDate: "2024-12-15", projectId: "2" },
    ];
    Task.find.mockResolvedValue(mockTasks); // Mock `find` to return an array

    const response = await request(app).get("/api/tasks");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should return an empty array if no tasks are found", async () => {
    Task.find.mockResolvedValue([]); // Mock `find` to return an empty array

    const response = await request(app).get("/api/tasks");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]); // Empty array if no tasks in DB
  });

  it("should return error if the route is incorrect", async () => {
    const response = await request(app).get("/api/undefined-route");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Not Found");
    expect(response.body).toHaveProperty("status", 404);
    expect(response.body).toHaveProperty("type", "error");
  });
});