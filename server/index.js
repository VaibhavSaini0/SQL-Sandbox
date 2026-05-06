const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectMongo = require("./db/mongodb");

const assignmentRoutes = require("./routes/assignments");
const executeQueryRoutes = require("./routes/executeQuery");
const trackerRoutes = require("./routes/tracker");
const app = express();

app.use(cors());
app.use(express.json());

connectMongo();


app.get("/", async (req, res) => {

  res.json({
    staus:200,
    message:"Server is running"
  });

});app.use("/api/assignments", assignmentRoutes);
app.use("/api/execute-query", executeQueryRoutes);
app.use("/api/tracker", trackerRoutes);

app.listen(3001, () => {
  console.log("Server running on port 3001");
});