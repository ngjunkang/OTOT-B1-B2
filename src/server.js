const express = require("express");
const bodyParser = require("body-parser");
const apiRoutes = require("./api-routes");

exports.createExpressServer = () => {
  const app = express();
  // Configure bodyparser to handle post requests
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());

  // Send message for default URL
  app.get("/", (_, res) => res.send("Hello World with Express (CD activated)"));

  // Use Api routes in the App
  app.use("/api", apiRoutes);

  // Return 404 otherwise
  app.use("*", (_, res) => {
    res.status(404).json({
      status: "error",
      message: "invalid api route!",
    });
  });
  return app;
};
