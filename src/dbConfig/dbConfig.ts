import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to MongoDB successfully!!");
    });
    connection.on("error", (err) => {
      console.error("Error connecting to MongoDB:", err);
      process.exit(1);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
