import mongoose from "mongoose";
import Colors = require("colors.ts");

const MONG_URI: string = process.env.MONGO_URI ?? "";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(MONG_URI);

    console.log(
      Colors.colors(
        ["cyan", "underline"],
        `MongoDB Connected: ${conn.connection.host}`
      )
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export { connectDB };
