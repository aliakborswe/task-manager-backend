const userModel = require("../models/UserModel");

// get all users
exports.getAllUser = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get user by email
exports.getUserByEmail = async (req, res) => {
  const email = req.params.email;
  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// update user by id
exports.updateUserById = async (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;
  try {
    const user = await userModel.findByIdAndUpdate(id, updatedUser, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// create a new user
exports.createNewUser = async(req,res)=>{
  const newUser = req.body;
  const existingUser = await userModel.findOne({email: newUser.email});
  if(existingUser){
    return res.status(400).json({message: "User already exists"})
  }
  try {
    const user = await userModel.create(newUser);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

