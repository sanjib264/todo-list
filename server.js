const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
const mongoURI =
  "mongodb+srv://sanjib264:S%40inik99@cluster0.vjcbf2h.mongodb.net/todo_db";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", (error) => {
  console.error("Connection error:", error);
});
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Logger middleware to log requests
app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  next();
});

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the To-Do List API");
});

// Todos route
const todosRoute = require("./routes/todos");
app.use("/todos", todosRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
