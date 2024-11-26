/**
 * Author: Bernice Templeman
 * Date: 26 November 2024
 * File: project.spec.js
 * Description: Test file for the Express application setup: Project.
 *
 */

// Require statements
const mongoose = require("mongoose");
const request = require("supertest");
const { Project, Counter } = require("../../src/models/project");
const dbName = "tms";

// Connect to MongoDB
const connectionString =
  "mongodb+srv://tms_user:s3cret@bellevueuniversity.lftytpq.mongodb.net/?retryWrites=true&w=majority&appName=BellevueUniversity";

// Connect to a test database
beforeAll(async () => {
  const connectionString =
    "mongodb+srv://tms_user:s3cret@bellevueuniversity.lftytpq.mongodb.net/?retryWrites=true&w=majority&appName=BellevueUniversity";

  try {
    await mongoose.connect(connectionString, {
      dbName: "tms",
    });
    console.log(
      "project.spec.js Connection to the database instance was successful"
    );
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`);
  }
});

// Clear the database before each test
beforeEach(async () => {
  await Project.deleteMany({});
  await Counter.deleteMany({});
});

// Close the database connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
  console.log("Database connection closed");
});

// Create Project Tests
describe("Project Model Test: Create", () => {
  // test to auto-increment projectId
  it("should auto-increment projectId correctly", async () => {
    const projectData1 = {
      name: "Project Alpha",
      description: "Initial phase of the project",
      startDate: "2021-01-01T00:00:00.000Z",
      endDate: "2021-06-01T00:00:00.000Z",
      dateCreated: "2021-01-01T00:00:00.000Z",
      dateModified: "2021-01-05T00:00:00.000Z",
    };
    const projectData2 = {
      name: "Project Beta",
      description: "Initial phase of the project",
      startDate: "2021-01-01T00:00:00.000Z",
      endDate: "2021-06-01T00:00:00.000Z",
      dateCreated: "2021-01-01T00:00:00.000Z",
      dateModified: "2021-01-05T00:00:00.000Z",
    };
    const project1 = new Project(projectData1);
    const savedProject1 = await project1.save();
    const project2 = new Project(projectData2);
    const savedProject2 = await project2.save();
    expect(savedProject1.projectId).toBe(1);
    expect(savedProject2.projectId).toBe(2);
  });
});

// Read a Project by id Tests

// Update Project Tests

// Delete a Project Tests

// List all Projects Tests

// Search Projects Tests
