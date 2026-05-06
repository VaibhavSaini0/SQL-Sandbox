const express = require("express");
const Assignment = require("../models/Assignment");
const executeSandboxQuery = require("../services/postgresSandbox");

const router = express.Router();

// Deep comparison helper
const normalize = (rows) => {
  return rows.map(row => {
    const sortedKeys = Object.keys(row).sort();
    const newRow = {};

    for (let key of sortedKeys) {
      newRow[key] = row[key];
    }

    return newRow;
  }).sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
};

const isEqual = (a, b) => {
  if (!Array.isArray(a) || !Array.isArray(b)) return false;
  if (a.length !== b.length) return false;

  const normA = normalize(a);
  const normB = normalize(b);

  return JSON.stringify(normA) === JSON.stringify(normB);
};
router.post("/", async (req, res) => {
  const { query, assignmentId } = req.body;

  if (!query || !query.trim().toLowerCase().startsWith("select")) {
    return res.status(400).json({
      error: "Only SELECT queries allowed",
    });
  }

  const assignment = await Assignment.findById(assignmentId);

  if (!assignment) {
    return res.status(404).json({
      error: "Assignment not found",
    });
  }

  try {
    const result = await executeSandboxQuery(
      query,
      assignment.sampleTables
    );

const iscorrect = isEqual(result.rows, assignment.expectedOutput.value);
    res.json({
      rows: result.rows,
      iscorrect,
    });

  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});

module.exports = router;