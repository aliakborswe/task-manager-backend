const userModel = require("../models/UserModel");

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

