const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema(
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

    query: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["solved", "wrong_answer", "runtime_error"],
      required: true,
    },

    errorMessage: {
      type: String,
      default: "",
    },

    output: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Submission", SubmissionSchema);