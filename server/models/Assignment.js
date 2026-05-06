const mongoose = require("mongoose");
const AssignmentSchema = new mongoose.Schema({

  title: String,
  description: String,
  question: String,
  difficulty: String,

  sampleTables: [
    {
      tableName: String,

      columns: [
        {
          columnName: String,
          dataType: String
        }
      ],

      rows: [mongoose.Schema.Types.Mixed]
    }
  ],

  expectedOutput: {
    type: {
      type: String
    },
    value: mongoose.Schema.Types.Mixed
  }

}, { timestamps: true });

module.exports = mongoose.model(
  "Assignment",
  AssignmentSchema
);