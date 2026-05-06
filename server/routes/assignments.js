const express = require("express");
const Assignment = require("../models/Assignment");

const router = express.Router();


router.get("/", async (req, res) => {

  const assignments = await Assignment.find();

  res.json(assignments);

});


router.get("/:id", async (req, res) => {

  const assignment = await Assignment.findById(req.params.id);

  if (!assignment) {
    return res.status(404).json({
      error: "Assignment not found"
    });
  }

  res.json(assignment);

});


module.exports = router;