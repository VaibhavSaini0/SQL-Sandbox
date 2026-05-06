const express = require("express");
const router = express.Router();

const Submission = require("../models/Submission");
const Draft = require("../models/Draft");
const ProblemStatus = require("../models/ProblemStatus");


// ==========================
// SAVE DRAFT (autosave)
// ==========================
router.post("/draft", async (req, res) => {
  try {
    const { clerkUserId, assignmentId, draftQuery } = req.body;

    const saved = await Draft.findOneAndUpdate(
      { clerkUserId, assignmentId },
      { draftQuery },
      { upsert: true, returnDocument: "after" }
    );

    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ==========================
// GET DRAFT
// ==========================
router.get("/draft/:clerkUserId/:assignmentId", async (req, res) => {
  try {
    const data = await Draft.findOne({
      clerkUserId: req.params.clerkUserId,
      assignmentId: req.params.assignmentId,
    });

    res.json(data || null);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ==========================
// SAVE SUBMISSION
// ==========================
router.post("/submission", async (req, res) => {
  try {
    const {
      clerkUserId,
      assignmentId,
      query,
      status,
      errorMessage,
      output,
    } = req.body;

    const submission = await Submission.create({
      clerkUserId,
      assignmentId,
      query,
      status,
      errorMessage,
      output,
    });

    await ProblemStatus.findOneAndUpdate(
      { clerkUserId, assignmentId },
      {
        status: status === "solved" ? "solved" : "attempted",
      },
      { upsert: true, returnDocument: "after" }
    );

    res.json(submission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ==========================
// GET USER ALL STATUS
// ==========================
router.get("/status/:clerkUserId", async (req, res) => {
  try {
    const all = await ProblemStatus.find({
      clerkUserId: req.params.clerkUserId,
    });

    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ==========================
// GET USER SUBMISSIONS OF ONE QUESTION
// ==========================
router.get("/submission/:clerkUserId/:assignmentId", async (req, res) => {
  try {
    const data = await Submission.find({
      clerkUserId: req.params.clerkUserId,
      assignmentId: req.params.assignmentId,
    }).sort({ createdAt: -1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;