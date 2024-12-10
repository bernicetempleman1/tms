/**
 * Author: Bernice Templeman

 * Date: 3 December 2024
 * File: index.spec.js
 * Description: Test the index route.
 */
const request = require("supertest");
const express = require("express");
const router = require("../../../src/app");
const app = require('../../../src/app/app');
const { Project } = require('../../../src/models/project');


// Create an instance of the Express app

app.use("/", router);

//Mock the project model
jest.mock('../../../src/models/project');

describe("GET /api", () => {
  it("should return status 200", async () => {
    const response = await request(app).get("/api");
    expect(response.status).toBe(200);
  });

  it("should return a JSON response", async () => {
    const response = await request(app).get("/api");
    expect(response.headers["content-type"]).toMatch(/json/);
  });

  it("should return the correct message", async () => {
    const response = await request(app).get("/api");
    expect(response.body).toHaveProperty(
      "message",
      "Hello from the Task Management System server!"
    );
  });
});



//Test suite for project-create API
describe("Create Project API", () => {
  //Mock the project model
jest.mock('../../../src/models/project');
  describe("GET /api/projects/:projectId", () => {
    it("should get a project by Id", async () => {
      //Mock the findOne method
      Project.findOne.mockResolvedValue({
        name: "Complete project documentation",
      });
      console.log(Project.findOne.mockResolvedValue);

      //Make request and assign response
      const response = await request(app).get("/api/projects/1");

      //Expected results
      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Complete project documentation");
    });

    it("should handle errors", async () => {
      //Mock an error
      Project.findOne.mockRejectedValue(new Error("Database error"));

      //Make request to route and assign to variable
      const response = await request(app).get("/api/projects/1");
      //Expected results
      expect(response.status).toBe(500);
    });

    it("should return a 404 error for incorrect route", async () => {
      Project.findOne.mockResolvedValue(null);

      const response = await request(app).get("/api/propjects/badId");
      expect(response.status).toBe(404);
    });
  });
});

//Test suite for project-update API
  describe("GET /api/projects/:projectId", () => {
    it("should get a project by Id", async () => {
      //Mock the findOne method
      Project.findOne.mockResolvedValue({
        name: "Complete project documentation",
      });
      console.log(Project.findOne.mockResolvedValue);

      //Make request and assign response
      const response = await request(app).get("/api/projects/1");

      //Expected results
      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Complete project documentation");
    });

    it("should handle errors", async () => {
      //Mock an error
      Project.findOne.mockRejectedValue(new Error("Database error"));

      //Make request to route and assign to variable
      const response = await request(app).get("/api/projects/1");
      //Expected results
      expect(response.status).toBe(500);
    });

    it("should return a 404 error for incorrect route", async () => {
      Project.findOne.mockResolvedValue(null);

      const response = await request(app).get("/api/propjects/badId");
      expect(response.status).toBe(404);
    });
  });

//Test suite for project-list API
describe("Create Project API", () => {
  //Mock the project model
jest.mock('../../../src/models/project');
  describe("GET /api/projects/:projectId", () => {
    it("should get a project by Id", async () => {
      //Mock the findOne method
      Project.findOne.mockResolvedValue({
        name: "Complete project documentation",
      });
      console.log(Project.findOne.mockResolvedValue);

      //Make request and assign response
      const response = await request(app).get("/api/projects/1");

      //Expected results
      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Complete project documentation");
    });

    it("should handle errors", async () => {
      //Mock an error
      Project.findOne.mockRejectedValue(new Error("Database error"));

      //Make request to route and assign to variable
      const response = await request(app).get("/api/projects/1");
      //Expected results
      expect(response.status).toBe(500);
    });

    it("should return a 404 error for incorrect route", async () => {
      Project.findOne.mockResolvedValue(null);

      const response = await request(app).get("/api/propjects/badId");
      expect(response.status).toBe(404);
    });
  });
});

//Test suite for project-search API
  describe("GET /api/projects/:projectId", () => {
    it("should get a project by Id", async () => {
      //Mock the findOne method
      Project.findOne.mockResolvedValue({
        name: "Complete project documentation",
      });
      console.log(Project.findOne.mockResolvedValue);

      //Make request and assign response
      const response = await request(app).get("/api/projects/1");

      //Expected results
      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Complete project documentation");
    });

    it("should handle errors", async () => {
      //Mock an error
      Project.findOne.mockRejectedValue(new Error("Database error"));

      //Make request to route and assign to variable
      const response = await request(app).get("/api/projects/1");
      //Expected results
      expect(response.status).toBe(500);
    });

    it("should return a 404 error for incorrect route", async () => {
      Project.findOne.mockResolvedValue(null);

      const response = await request(app).get("/api/propjects/badId");
      expect(response.status).toBe(404);
    });
  });

