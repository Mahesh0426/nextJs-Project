import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("⚠️ Please define the MONGODB_URI environment variable");
}

export const connectToDb = async () => {
  try {
    await mongoose.connect(MONGODB_URI);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to MongoDB successfully!!");
    });
    connection.on("error", (err) => {
      console.error("Error connecting to MongoDB:", err);
      process.exit(1);
    });
  } catch (error) {
    console.error("some thing went wrong:", error);
  }
};
