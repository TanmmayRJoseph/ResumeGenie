import express from "express";
import {
  registerUserController,
  loginUserController,
} from "../controllers/user.controller.js";
import {
  validateRegisterUser,
  validateLoginUser,
} from "../middlewares/validateUser.js";
const router = express.Router();

//route for register
router.post("/api/register", validateRegisterUser, registerUserController);
//route for login
router.post("/api/login", validateLoginUser, loginUserController);

export default router;
