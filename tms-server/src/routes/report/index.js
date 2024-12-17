

const express = require('express');
const createError = require('http-errors');
const { Task } = require("../../models/task");
const router = express.Router();




/**
 * @description
 *
 * GET /priorities
 *
 * Fetches a list of distinct sales regions.
 *
 * Example:
 * fetch('/priorities')
 *  .then(response => response.json())
 *  .then(data => console.log(data));
 */
router.get('/priorities',async (req, res, next) => {
  try {
      const priorities = await Task.distinct('priority');
      res.send(priorities);

  } catch (err) {
    console.error('Error getting priorities: ', err);
    next(err);
  }
});





module.exports = router;