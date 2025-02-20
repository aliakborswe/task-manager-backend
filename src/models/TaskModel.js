import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
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
    category: {
      type: String,
      enum: ["To-Do", "In Progress", "Done"],
      default: "To-Do",
    },
    dueDate: {
      type: Date,
    },
  },
  { timestamps: true, versionKey: false }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
