import mongoose from "mongoose";

const MONG_URI: string = process.env.MONGO_URI ?? "";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(MONG_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export { connectDB };
