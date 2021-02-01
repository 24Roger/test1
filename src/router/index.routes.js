// importing module
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { cyan } = require("chalk");

// import routes
const home = require("./home");
const register = require("./register");
const login = require("./login");
const verifyToken = require("../middleware/verifyToken");

// statement app
const app = express();

// HTTP request logger
app.use(
     morgan(cyan(":method :url :status :res[content-length] - :response-time ms"))
);

// capture body
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// public routes
app.use("/user", register, login);

// route middlewares
app.use("/home", verifyToken, home);

module.exports = app;