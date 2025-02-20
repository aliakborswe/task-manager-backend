import mongoose from "mongoose";

const ActivityLogSchema = new mongoose.Schema({
  uid: { type: String, required: true }, 
  taskId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Task" }, 
  message: { type: String, required: true },
},{ timestamps: true, versionKey: false });

export default mongoose.model("ActivityLog", ActivityLogSchema);
