const mongoose = require('mongoose');

const connect_DB = async () => {
  const connectionString = process.env.DB_URI;
  
  if (!connectionString) {
    throw new Error("No MongoDB connection string found in environment variables");
  }

  try {
    await mongoose.connect(connectionString);
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connect_DB;