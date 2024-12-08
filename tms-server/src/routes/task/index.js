/**
 * Author: Bernice Templeman
 * Date: 11 November 2024
 * File: routes/task/index.js
 * Description: Task routes
 *
 */

// require statements
const express = require("express");
const Ajv = require("ajv");
const createError = require("http-errors");
const { Task } = require("../../models/task");
const { addTaskSchema, updateTaskSchema } = require("../../schemas");
const router = express.Router();
const ajv = new Ajv();
const validateAddTask = ajv.compile(addTaskSchema);
const validateUpdateTask = ajv.compile(updateTaskSchema);

// get lists of tasks : BT, MS, LH
router.get("/", async (req, res, next) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (err) {
    console.error(`Error while getting tasks: ${err}`);
    next(err);
  }
});

// get task by id : BT, LH
// edited by MS
router.get("/:taskId", async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.taskId });

    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }

    res.send(task);
  } catch (err) {
    console.error(`Error while getting task: ${err}`);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// create task : BT
router.post("/:projectId", async (req, res, next) => {
  try {
    const valid = validateAddTask(req.body);
    if (!valid) {
      return next(createError(400, ajv.errorsText(validateAddTask.errors)));
    }
    const payload = {
      ...req.body,
      projectId: req.params.projectId,
    };
    const task = new Task(payload);
    await task.save();

    res.send({
      message: "Task created successfully",
      id: task._id,
    });
  } catch (err) {
    console.error(`Error while creating task: ${err}`);
    next(err);
  }
});

// update task : BT
router.patch("/:taskId", async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.taskId });
    console.log('Task from the request params:', task);
    const valid = validateUpdateTask(req.body);
    if (!valid) {
      return next(createError(400, ajv.errorsText(validateUpdateTask.errors)));
    }
    task.set(req.body);
    await task.save();
    res.send({
      message: "Task updated successfully",
      id: task._id
    });
  } catch (err) {
    console.error(`Error while updating task: ${err}`);
    next(err);
  }
});

//Delete task API: LH
router.delete('/:taskId', async (req, res, next) => {
  try {
    await Task.deleteOne({ _id: req.params.taskId});

    res.send({
      message: 'Task deleted successfully',
      id: req.params.taskId
    });
  } catch(err) {
    console.error(`Error while deleting task: ${err}`);
    next(err);
  }
});

module.exports = router;
