import express from "express";
import {
  createResumeController,
  getResumeController,
} from "../controllers/resume.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/api/resume", authMiddleware, createResumeController);
router.get("/api/getResumeById", authMiddleware, getResumeController);

export default router;