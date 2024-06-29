require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/userModel");

const connect = async () => {
  try {
    await mongoose.connect(process.env.mongo);
    console.log("MongoDB is up and running");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

const disconnect = async () => {
  await mongoose.connection.close();
};

const findUser = async (obj) => {
  User.findOne(obj);
};

const saveUser = async (newUser) => {
  return await newUser.save();
};
module.exports = { connect, disconnect, findUser, saveUser };
