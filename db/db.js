require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/userModel");

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("MongoDB is up and running");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

const disconnect = async () => {
  await mongoose.connection.close();
};

const findUser = async (obj) => {
  return User.findOne(obj).exec();
};

const saveUser = async (newUser) => {
  return await newUser.save();
};
module.exports = { connect, disconnect, findUser, saveUser };
