import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("connected successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "mongodb connection error. please make sure monogdb is running." + err
      );
      process.exit();
    });
  } catch (error: any) {
    throw new Error("Error in connecting mongodb", error);
  }
};

export default connectDB;
