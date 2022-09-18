const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const apiRoutes = require("./src/api-routes");

const app = express();

// Configure bodyparser to handle post requests
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect("mongodb://localhost/contacts", { useNewUrlParser: true });
var db = mongoose.connection;

// Added check for DB connection
if (!db) console.log("Error connecting db");
else console.log("Db connected successfully");

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get("/", (req, res) => res.send("Hello World with Express"));

// Use Api routes in the App
app.use("/api", apiRoutes);

// Return 404 otherwise
app.use("*", (_, res) => {
  res.status(404).json({
    status: "error",
    message: "invalid api route",
  });
});

// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running OTOT-task B1-B2 on port " + port);
});
