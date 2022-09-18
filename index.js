const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const apiRoutes = require("./src/api-routes");

const app = express();

// Configure bodyparser to handle post requests
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

const DB_URI = process.env.DATABASE_URI || "mongodb://localhost/contacts";

const DB_CONNECTION_STRING = !!process.env.DATABASE_URI
  ? "(remote)"
  : "(local)";

// Connect to Mongoose and set connection variable
mongoose.connect(DB_URI, { useNewUrlParser: true });
var db = mongoose.connection;

// Added check for DB connection
if (!db) console.log("Error connecting db " + DB_CONNECTION_STRING);
else console.log("Db connected successfully " + DB_CONNECTION_STRING);

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get("/", (_, res) => res.send("Hello World with Express"));

// Use Api routes in the App
app.use("/api", apiRoutes);

// Return 404 otherwise
app.use("*", (_, res) => {
  res.status(404).json({
    status: "error",
    message: "invalid api route!",
  });
});

// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running OTOT-task B1-B2 on port " + port);
});
