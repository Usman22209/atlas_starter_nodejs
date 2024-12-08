const express = require("express");
const { ObjectId } = require("mongodb");
const todoSchema = require("./modal/schema");

const router = express.Router();

module.exports = (todoCollection) => {
  // Create a new to-do
  router.post("/", async (req, res) => {
    try {
      const { error, value } = todoSchema.validate(req.body);
      if (error) return res.status(400).json({ message: error.details[0].message });

      const result = await todoCollection.insertOne(value);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ message: "Error creating todo", error: err.message });
    }
  });

  // Get all to-dos
  router.get("/", async (req, res) => {
    try {
      const todos = await todoCollection.find().toArray();
      res.status(200).json(todos);
    } catch (err) {
      res.status(500).json({ message: "Error fetching todos", error: err.message });
    }
  });

  // Update a to-do
  router.put("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const { error, value } = todoSchema.validate(req.body);
      if (error) return res.status(400).json({ message: error.details[0].message });

      const result = await todoCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: value }
      );
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: "Error updating todo", error: err.message });
    }
  });

  // Delete a to-do
  router.delete("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const result = await todoCollection.deleteOne({ _id: new ObjectId(id) });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: "Error deleting todo", error: err.message });
    }
  });

  return router;
};
