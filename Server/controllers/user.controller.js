import { registerUserService } from "../services/user.service.js";
import { validationResult } from "express-validator";
import User from "../models/user.model.js";

// * Register Route controller
export const registerUserController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array().map((err) => err.msg) });
  }
  const { name, email, password } = req.body;
  const user = await registerUserService(name, email, password);
  // const token = await user.generateAuthToken();// ? should token be generated on registration ?
  res.status(200).json({ message: "User registered successfully", user });
};

//* Login Route controller
export const loginUserController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array().map((err) => err.msg) });
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ error: "Incorrect password" });
  }
  const token = await user.generateAuthToken();
  const loggedInUser = { ...user.toObject(), token };
  res.cookie("token", token, { httpOnly: true });
  res
    .status(200)
    .json({ message: "Login successful", user, token, loggedInUser });
};
