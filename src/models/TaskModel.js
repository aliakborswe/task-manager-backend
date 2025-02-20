const { mongoose, Schema } = require("mongoose");

const taskSchema = new Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true, max: 50 },
    description: { type: String, max: 200 },
    category: {
      type: String,
      enum: ["To-Do", "In-Progress", "Done"],
      default: "To-Do",
    },
    dueDate: { type: Date, required: true },
  },
  { timestamp: { type: Date, default: Date.now }, versionKey: false }
);

const task = mongoose.model("tasks", taskSchema);
module.exports = task;
