const mongoose = require('mongoose');

const connectDB = async (url) => {
  try {
    const connection = await mongoose.connect(url);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
