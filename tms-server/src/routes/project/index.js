/**
 * Author: Bernice Templeman
 * Date: 11 November 2024
 * File: routes/project/index.js
 * Description: Project routes
 *
 */

// require statements
const express = require("express");
const Ajv = require("ajv");
const createError = require("http-errors");
const router = express.Router();
const { Project } = require("../../models/project");
const ajv = new Ajv();
const { addProjectSchema, updateProjectSchema } = require("../../schemas");
const validateAddProject = ajv.compile(addProjectSchema);
const validateUpdateProject = ajv.compile(updateProjectSchema);

// get list of projects : BT
router.get("/", async (req, res, next) => {
  try {
    const projects = await Project.find({});
    res.send(projects);
  } catch (err) {
    console.error(`Error while getting projects: ${err}`);
    next(err);
  }
});

//read a project by id : BT
router.get("/:projectId", async (req, res, next) => {
  try {
    const project = await Project.findOne({ projectId: req.params.projectId });
    res.send(project);
  } catch (err) {
    console.error(`Error while getting project: ${err}`);
    next(err);
  }
});

// delete a project : BT
router.delete("/:projectId", async (req, res, next) => {
  try {
    await Project.deleteOne({ projectId: req.params.projectId });
    res.send({
      message: "Project deleted successfully",
      projectId: req.params.projectId,
    });
  } catch (err) {
    console.error(`Error while deleting project: ${err}`);
    next(err);
  }
});

module.exports = router;
