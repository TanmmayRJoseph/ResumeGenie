import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./db/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";
dotenv.config();

connectDB();

const app = express();
app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true,
  }
));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "Server is running successfully🏃🏃",
    progress: "doing work",
    status: 200,
  });
});

app.use("/user", userRoutes);

export default app;
