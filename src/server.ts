import express, { Express } from "express";
import "dotenv/config";
import mongoose from "mongoose";
import colors from "colors.ts";
import projectRouter from "./routes/projectRoutes";
import { connectDB } from "./config/db";
import { errorHandler } from "./middleware/errorMiddleware";

const PORT: string | number = process.env.PORT || 5000;

connectDB();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/projects", projectRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
