const mongoose = require("mongoose");

const ProblemStatusSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
    },

    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },

    status: {
      type: String,
      enum: ["attempted", "solved"],
      default: "attempted",
    },
  },
  { timestamps: true }
);

ProblemStatusSchema.index({ clerkUserId: 1, assignmentId: 1 }, { unique: true });

module.exports = mongoose.model("ProblemStatus", ProblemStatusSchema);