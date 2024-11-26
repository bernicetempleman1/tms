/**
 * Author: Bernice Templeman
 * Date: 11 November 2024
 * File: sample-data.js
 * Description: Sample data for Project and Task collections
 *
 * db connection:
 * mongodb+srv://<db_username>:<db_password>@bellevueuniversity.lftytpq.mongodb.net/?retryWrites=true&w=majority&appName=BellevueUniversity
 */

// require statements
const mongoose = require("mongoose");
const { Project, Counter } = require("../models/project");
const { Task } = require("../models/task");

// Connection to MongoDB
const connectionString =
  "mongodb+srv://tms_user:s3cret@bellevueuniversity.lftytpq.mongodb.net/?retryWrites=true&w=majority&appName=BellevueUniversity";

// database name
const dbName = "tms";

// function  to Connect to the database
async function connectToDatabase() {
  try {
    await mongoose.connect(connectionString, {
      dbName: dbName,
    });
    // log success
    console.log("Connection to the database instance was successful");
    //log error
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`);
  }
}

connectToDatabase(); // Call the function to connect to the database

// Sample data for Project
const sampleProjects = [
  {
    _id: "650c1f1e1c9d440000a1b1c1",
    name: "Project Alpha",
    description: "Initial phase of the project",
    startDate: "2021-01-01T00:00:00.000Z",
    endDate: "2021-06-01T00:00:00.000Z",
    dateCreated: "2021-01-01T00:00:00.000Z",
    dateModified: "2021-01-05T00:00:00.000Z",
    projectId: "1",
  },
];

// Sample data for Task
const sampleTasks = [
  {
    _id: "650c1f1e1c9d440000a1b1c1",
    title: "Complete project documentation",
    description: "Write the documentation for the project",
    status: "In Progress",
    priority: "High",
    dueDate: "2021-01-10T00:00:00.000Z",
    dateCreated: "2021-01-01T00:00:00.000Z",
    dateModified: "2021-01-05T00:00:00.000Z",
    projectId: "1",
  },
  {
    _id: "650c1f1e1c9d440000a1b1c2",
    title: "Complete github repository setup",
    description: "Setup the Github repository with the base code",
    status: "In Progress",
    priority: "High",
    dueDate: "2021-01-10T00:00:00.000Z",
    dateCreated: "2021-01-01T00:00:00.000Z",
    dateModified: "2021-01-05T00:00:00.000Z",
    projectId: "1",
  },
];

// Function to create sample data
async function createSampleData() {
  try {
    // Clear existing data
    await Task.deleteMany({});
    await Project.deleteMany({});
    await Counter.deleteMany({});

    // Insert sample projects and store their IDs
    const projectIdMap = {};
    for (const projectData of sampleProjects) {
      const project = new Project(projectData);
      await project.save();
      projectIdMap[project.projectId] = project.projectId;
      console.log("Sample project created:", project);
    }

    // Update sampleTasks with the correct projectId values
    const updatedSampleTasks = sampleTasks.map((task) => ({
      ...task,
      projectId: projectIdMap[task.projectId],
    }));

    // lof sample data
    console.log("Updated sample tasks:", updatedSampleTasks);

    // Insert updated sample tasks
    const tasks = await Task.insertMany(updatedSampleTasks);

    // log tasks created
    console.log("Sample tasks created:", tasks);

    // Close the connection
    mongoose.connection.close();

    //log error
  } catch (err) {
    console.error("Error creating sample data", err);
  }
}

// Run the function to create sample data
createSampleData();
