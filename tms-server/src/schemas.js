/**
 * Author: Bernice Templeman
 * Date: 11 November 2024
 * File: schema.js
 * Description: Schema for Project and Task
 *
 * db connection:
 * mongodb+srv://<db_username>:<db_password>@bellevueuniversity.lftytpq.mongodb.net/?retryWrites=true&w=majority&appName=BellevueUniversity
 */

const addProjectSchema = {
    type: "object",
    properties: {
      name: { type: "string", minLength: 3, maxLength: 100 },
      description: { type: "string", maxLength: 500 },

      //The startDate of a project must be a valid date
      startDate: {
        type: "string",
       // pattern: "^(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z)?$",
      },
      // verify valid endate
      endDate: {
        type: "string",
       // pattern: "^(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z)?$",
      },
      dateCreated: {
        type: "string",
       // pattern: "^(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z)?$",
      },
      dateModified: {
        type: "string",
        //pattern: "^(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z)?$",
      },
      projectId : {
        type: "string",
      }
    },
    //A project must have a name and a start date
    required: ["name", "startDate"],
    additionalProperties: false,
  };

  const updateProjectSchema = {
    type: "object",
    properties: {
      name: { type: "string", minLength: 3, maxLength: 100 },
      description: { type: "string", maxLength: 500 },

    },
    //A project must have a name and a start date
    required: ["name", "description"],
    additionalProperties: false,
  };

  const addTaskSchema = {
    type: "object",
    properties: {
      title: { type: "string", minLength: 3, maxLength: 100 },
      // The status of a task can only be one of the following: “Pending”, “In Progress”, “Completed”
      description: { type: "string", minLength: 3, maxLength: 100 },
      status: { type: "string", enum: ["Pending", "In Progress", "Completed"] },
      //The priority of a task can only be one of the following: “Low”, “Medium”, “High”
      priority: { type: "string", enum: ["Low", "Medium", "High"] },
      dueDate: {
        type: "string",
       // pattern: "^(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z)?$",
      },
    },
    //A task must have a title, status, and priority
    required: ["title", "status", "priority"],
    additionalProperties: false,
  };

  const updateTaskSchema = {
    type: "object",
    properties: {
      title: { type: "string", minLength: 3, maxLength: 100 },
      status: { type: "string", enum: ["Pending", "In Progress", "Completed"] },
      priority: { type: "string", enum: ["Low", "Medium", "High"] },
    },
    required: ["title", "priority", "status"],
    additionalProperties: false,
  };

  module.exports = {
    addProjectSchema,
    updateProjectSchema,
    addTaskSchema,
    updateTaskSchema,
  };


