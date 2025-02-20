import User from "../models/UserModel.js";

// create a new user
export const createNewUser = async (req, res) => {
  const newUser = req.body;
  const existingUser = await User.findOne({ email: newUser.email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  try {
    const user = await User.create(newUser);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get user by email
export const getUserByEmail = async (req, res) => {
  const email = req.params.email;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
