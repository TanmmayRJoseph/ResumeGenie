import User from "../models/user.model.js";


// register a user
export const registerUserService = async (name, email, password) => {
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const user = User.create({ name, email, password });
    return user;
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};
