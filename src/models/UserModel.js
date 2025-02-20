import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.model("User", userSchema);
export default User;
