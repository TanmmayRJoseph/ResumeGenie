import express from "express";
import {createResumeController} from "../controllers/resume.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";
const router = express.Router();


router.post("/api/resume",authMiddleware,createResumeController );

export default router;