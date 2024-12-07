const mongoose = require("mongoose");
const request = require('supertest');

const { Project, Counter } = require("../../src/models/project");
const dbName = "tms";

// Connect to MongoDB
const connectionString =
  "mongodb+srv://tms_user:s3cret@bellevueuniversity.lftytpq.mongodb.net/?retryWrites=true&w=majority&appName=BellevueUniversity";

  // Connect to database
  beforeAll(async () => {
    const connectionString =
      "mongodb+srv://tms_user:s3cret@bellevueuniversity.lftytpq.mongodb.net/?retryWrites=true&w=majority&appName=BellevueUniversity";

    try {
      await mongoose.connect(connectionString, {
        dbName: "tms",
      });
      console.log("project.spec.js Connection to the database instance was successful");
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

// Tests for Project
describe("Project Model Test", () => {
  it("should create a project successfully", async () => {
    const projectData = {
      name: "Project Alpha",
      description: "Initial phase of the project",
      startDate: "2021-01-01T00:00:00.000Z",
      endDate: "2021-06-01T00:00:00.000Z",
      dateCreated: "2021-01-01T00:00:00.000Z",
      dateModified: "2021-01-05T00:00:00.000Z",
    };
    const project = new Project(projectData);
    const savedProject = await project.save();
    expect(savedProject._id).toBeDefined();
    expect(savedProject.name).toBe(projectData.name);
    expect(savedProject.description).toBe(projectData.description);
  });

  it("should validate project name correctly", async () => {
    const projectData = {
        projectId: 1000,
        name: "1Project Alpha",
        description: "Initial phase of the project",
        startDate: "2021-01-01T00:00:00.000Z",
        endDate: "2021-06-01T00:00:00.000Z",
        dateCreated: "2021-01-01T00:00:00.000Z",
        dateModified: "2021-01-05T00:00:00.000Z",
    };
    const project = new Project(projectData);
    let err;
    try {
      await project.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
    expect(err.errors["name"]).toBeDefined();
    expect(err.errors["name"].message).toBe(
      "Project name can only contain letters and spaces"
    );
  });

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


  it("should fail to create a project with a name shorter than 3 characters", async () => {
    const projectData = {
      name: "Pr",
      description: "Initial phase of the project",
      startDate: "2021-01-01T00:00:00.000Z",
      endDate: "2021-06-01T00:00:00.000Z",
      dateCreated: "2021-01-01T00:00:00.000Z",
      dateModified: "2021-01-05T00:00:00.000Z",
    };
    const project = new Project(projectData);
    let err;
    try {
      await project.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
    expect(err.errors["name"]).toBeDefined();
    expect(err.errors["name"].message).toBe(
      "Project name must be at least 3 characters"
    );
  });

  it("should fail to create a project with a name longer than 100 characters", async () => {
    const projectData = {
      name: "R".repeat(101),
      projectId: 1000,
      description: "Initial phase of the project",
      startDate: "2021-01-01T00:00:00.000Z",
      endDate: "2021-06-01T00:00:00.000Z",
      dateCreated: "2021-01-01T00:00:00.000Z",
      dateModified: "2021-01-05T00:00:00.000Z",
    };
    const project = new Project(projectData);
    let err;

    try {
      await project.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
    expect(err.errors["name"]).toBeDefined();
    expect(err.errors["name"].message).toBe(
      "Project name cannot exceed 100 characters"
    );
  });

  it("should fail to create a project with a description longer than 500 characters", async () => {
    const projectData = {
        name: "Project Alpha",
        description: "D".repeat(501),
        startDate: "2021-01-01T00:00:00.000Z",
        endDate: "2021-06-01T00:00:00.000Z",
        dateCreated: "2021-01-01T00:00:00.000Z",
        dateModified: "2021-01-05T00:00:00.000Z",

    };
    const project = new Project(projectData);
    let err;
    try {
      await project.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
    expect(err.errors["description"]).toBeDefined();
    expect(err.errors["description"].message).toBe(
      "Description cannot exceed 500 characters"
    );
  });

  it("should fail to create a project with a start date after the end date", async () => {
    const projectData = {
      name: "Project Start and End",
      projectId: 1000,
      description: "Initial phase of the project",
      startDate: "2021-06-01T00:00:00.000Z",
      endDate: "2021-01-01T00:00:00.000Z",
      dateCreated: "2021-01-01T00:00:00.000Z",
      dateModified: "2021-01-05T00:00:00.000Z",
    };
    const project = new Project(projectData);
    let err;

    try {
      await project.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
    expect(err.message).toBe(
      "End Date must be greater than Start Date"
    );
  });
});