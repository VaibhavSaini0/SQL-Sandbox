const mongoose = require("mongoose");

const DraftSchema = new mongoose.Schema(
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

    draftQuery: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

DraftSchema.index({ clerkUserId: 1, assignmentId: 1 }, { unique: true });

module.exports = mongoose.model("Draft", DraftSchema);