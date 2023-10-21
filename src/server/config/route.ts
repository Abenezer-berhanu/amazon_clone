import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected");
    });
    connection.on("error", (err) => {
      console.log("Mongodb connection error." + err);
      process.exit();
    });
  } catch (error) {
    throw new Error("Error in connecting mongodb");
  }
};

export default connectDB