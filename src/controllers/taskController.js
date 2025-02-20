import taskModel from "../models/TaskModel.js";

// Add a new task
export const createNewTask = async (req, res) => {
  try {
    const newTask = new taskModel(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};

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
};

// Update a task
export const updateTask = async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const updatedTask = await taskModel.findByIdAndUpdate(
      { id: taskId },
      req.body,
      { new: true }
    );
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  const taskId = req.params.taskId;
  try {
    await taskModel.findByIdAndDelete({ id: taskId });
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};
