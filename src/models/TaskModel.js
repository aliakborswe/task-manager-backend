import mongoose from "mongoose";
import { type } from "os";

const taskSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      ref: "User",
    },
    email: { type: String, required: true },
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
    order: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
