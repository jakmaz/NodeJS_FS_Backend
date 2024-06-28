require("dotenv").config();
const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(process.env.mongo);
    console.log("MongoDB is up and running");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = { connect };
