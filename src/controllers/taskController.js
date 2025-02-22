import taskModel from "../models/TaskModel.js";

// Add a new task
export const createNewTask = async (req, res) => {
  try {
    const { uid, title, description, dueDate, email } = req.body;
    const lastTask = await taskModel
      .findOne({ category: "To-Do" })
      .sort("-order");
    const order = lastTask ? lastTask.order + 1 : 0;
    const newTask = new taskModel({
      uid,
      title,
      description,
      dueDate,
      order,
      email,
    });
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
      .find({ email: req.params.email })
      .sort("order");
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
      { _id: taskId },
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
    await taskModel.findByIdAndDelete({ _id: taskId });
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};

// Reorder tasks
export const updateTaskOrder = async (req, res) => {
  try {
    const { taskId, newCategory, oldCategory, newIndex, oldIndex } = req.body;

    const task = await taskModel.findById(taskId);

    if (!task) {
      res.status(404).json({ message: "Task not found" });
    }

    if (task.category !== newCategory) {
      await taskModel.updateMany(
        { category: oldCategory, order: { $gt: oldIndex } },
        { $inc: { order: -1 } }
      );

      await taskModel.updateMany(
        { category: newCategory, order: { $gte: newIndex } },
        { $inc: { order: 1 } }
      );

      task.category = newCategory;
    } else {
      if (newIndex > oldIndex) {
        await taskModel.updateMany(
          { category: task.category, order: { $gt: oldIndex, $lte: newIndex } },
          { $inc: { order: -1 } }
        );
      } else {
        await taskModel.updateMany(
          { category: task.category, order: { $gte: newIndex, $lt: oldIndex } },
          { $inc: { order: 1 } }
        );
      }
    }

    task.order = newIndex;

    await task.save();

    res.status(200).json({ message: "Task position updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating task order", error });
  }
};
