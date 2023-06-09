// Package imports
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const httpStatus = require("http-status");
const path = require("path");

// Custom imports
const config = require("./Controller/Common/config");
const authFunctions = require("./Controller/Common/passport");
const routes = require("./routes/v1");
const ApiError = require("./utils/ApiError");

// Initializing app and setting up middlewares
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

app.use("/", express.static(path.join(__dirname, "/images")));

authFunctions.auth();

// v1 api routes
app.use("/v1", routes);

// 404 handler for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

module.exports = app;
