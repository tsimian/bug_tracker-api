import express, { Express } from "express";
import "dotenv/config";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes";
import projectRouter from "./routes/projectRoutes";
import bugRouter from "./routes/bugRoutes";
import { connectDB } from "./config/db";
import { errorHandler } from "./middleware/errorMiddleware";
import { auth } from "./middleware/authMiddleware";

const PORT: string | number = process.env.PORT || 5000;

connectDB();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/projects", auth, projectRouter);
app.use("/api/bugs", auth, bugRouter);
app.use("/api/user", userRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
