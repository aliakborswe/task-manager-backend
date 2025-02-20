const taskModel = require('../models/TaskModel');

// Add a new task
export const createNewTask = async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
}

// Get tasks for a user
export const getTasksForUser = async (req, res) => {
  try {
    const tasks = await taskModel
      .find({ userId: req.params.userId })
      .sort("timestamp");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error getting tasks", error });
  }
}