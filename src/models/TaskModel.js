import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
  },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
