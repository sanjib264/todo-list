const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// Create a new to-do
router.post("/", async (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title,
      description: req.body.description,
    });
    const savedTodo = await todo.save();
    res.json(savedTodo);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get all to-dos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get a specific to-do
router.get("/:todoId", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.todoId);
    res.json(todo);
  } catch (err) {
    res.json({ message: err });
  }
});

// Update a to-do
router.patch("/:todoId", async (req, res) => {
  try {
    const updatedTodo = await Todo.updateOne(
      { _id: req.params.todoId },
      { $set: req.body }
    );
    res.json(updatedTodo);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete a to-do
router.delete("/:todoId", async (req, res) => {
  try {
    const removedTodo = await Todo.remove({ _id: req.params.todoId });
    res.json(removedTodo);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
