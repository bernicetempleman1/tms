const mongoose = require('mongoose');
const request = require("supertest");
const express = require("express");
const router = require("../../../src/routes/task"); // Adjust the path as necessary
const { Task } = require("../../../src/models/task");

jest.mock("../../../src/models/task"); // Mock Task model

const app = express();
app.use(express.json());
app.use("/api", router); // Ensure "/api" is part of the setup

describe("GET /api/:taskId - Get Task by ID", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  test("should return a task when a valid ID is provided", async () => {
    const mockTask = { _id: "12345", title: "Sample Task", description: "This is a test task" };
    Task.findOne.mockResolvedValue(mockTask);

    const res = await request(app).get("/api/12345");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockTask);
    expect(Task.findOne).toHaveBeenCalledWith({ _id: "12345" });
  });

  test("should return 404 if task is not found", async () => {
    Task.findOne.mockResolvedValue(null);

    const res = await request(app).get("/api/12345");

    expect(res.status).toBe(404); // Expect 404 for missing task
    expect(res.body).toEqual({ error: "Task not found" }); // Ensure correct error response
    expect(Task.findOne).toHaveBeenCalledWith({ _id: "12345" });
  });

  test("should return 500 if an error occurs in the database query", async () => {
    Task.findOne.mockRejectedValue(new Error("Database error"));

    const res = await request(app).get("/api/12345");

    expect(res.status).toBe(500); // Expect 500 for server error
    expect(res.body).toEqual({ error: "Internal Server Error" }); // Ensure meaningful error message
    expect(Task.findOne).toHaveBeenCalledWith({ _id: "12345" });
  });
});