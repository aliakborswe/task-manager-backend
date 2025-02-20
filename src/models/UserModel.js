const { mongoose, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: "string", required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const user = mongoose.model("users", userSchema);
module.exports = user;
