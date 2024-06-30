require("dotenv").config();
const mongoose = require("mongoose");

const connect = async () => {
  console.log("Mocked DB Connection");
};

const disconnect = async () => {
  console.log("Mocked DB Disconnection");
};

const findUser = async (obj) => {
  return Promise.resolve({
    firstName: "Eric",
    lastName: "Clarke",
    address: "123 Main St",
    city: "Orlando",
    state: "FL",
    zipCode: "34256",
    email: "eric@eric.com",
    password: "123",
  });
};

const saveUser = async (newUser) => {
  return Promise.resolve({
    _id: new mongoose.Types.ObjectId(),
    firstName: "Eric",
    lastName: "Clarke",
    address: "123 Main St",
    city: "Orlando",
    state: "FL",
    zipCode: "34256",
    email: "eric@eric.com",
    password: "123",
  });
};
module.exports = { connect, disconnect, findUser, saveUser };
