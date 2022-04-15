const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// CORS
app.use(cors());
app.options("*", cors());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

// ROUTES
const apiController = require("./controller/apiController");
app.post("/bfhl", apiController.bfhlController);

app.all("*", (req, res, next) => {
  return res.status(400).json({
    is_success: false,
    message: `Url not found`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.log(err);
  const status = err.status || 500;

  if (err.type === "entity.parse.failed") {
    err.message = "Invalid data";
  }

  return res.status(status).json({
    is_success: false,
    error: err,
  });
});

module.exports = app;
