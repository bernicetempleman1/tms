/**
 * Author: Bernice Templeman
 * Date: 26 November 2024
 * File: models/task.js
 * Description: Task model
 *
 */

// require statements
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Task schema
let taskSchema = new Schema({
  title: {
    type: String,
    required: [true, "Task title is required"],
    minlength: [3, "Task title must be at least 3 characters"],
    maxlength: [100, "Task title cannot exceed 100 characters"],
    unique: true,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    required: [true, "Task status is required"],
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    required: [true, "Task type is required"],
  },
  dueDate: {
    type: Date,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateModified: {
    type: Date,
  },
  projectId: {
    type: Number,
    required: [true, "Project ID is required"],
  },
});

// if update, change the dateModified
taskSchema.pre("save", function (next) {
  if (!this.isNew) {
    this.dateModified = new Date();
  }
  next();
});

module.exports = {
  Task: mongoose.model("Task", taskSchema),
};

