const mongoose = require('mongoose');

const DB_URL = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("MongoDB Connected to Atlas");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // VERY IMPORTANT
  }
};

module.exports = connectDB;
