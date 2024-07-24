//////////////////////////////////////////////////////
// INCLUDES
//////////////////////////////////////////////////////
//Import the required module
const express = require("express");

//////////////////////////////////////////////////////
// CREATE APP
//////////////////////////////////////////////////////
//Create an instance of the express application
const app = express();

//////////////////////////////////////////////////////
// USES
//////////////////////////////////////////////////////
//Set up middleware functions:
app.use(express.json()); //This line of code adds a middleware to the Express application (app) that parses incoming requests with a JSON payload. It enables the application to handle JSON data sent in the body of a request. When a request comes in with a JSON payload, this middleware will parse it and make it available in req.body for further processing in your application
app.use(express.urlencoded({ extended: false })); //This line of code adds another middleware to the Express application that parses incoming requests with URL-encoded payloads. This is typically used when data is submitted through HTML forms. The extended: false option indicates that the parser should use the classic encoding and not parse extended syntax (e.g., nested objects). The parsed data will be available in req.body

//////////////////////////////////////////////////////
// SETUP ROUTES
//////////////////////////////////////////////////////

const mainRoutes = require("./routes/mainRoutes");
app.use("/api", mainRoutes);
app.use("/", express.static("public"));
//////////////////////////////////////////////////////
// EXPORT APP
//////////////////////////////////////////////////////

module.exports = app;
