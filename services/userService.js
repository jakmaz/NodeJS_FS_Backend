const { findUser, saveUser } = require("../db/db");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const errorTemplate = require("../templates/errorTemplate");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.registerUser = async (req, res) => {
  try {
    const existingUser = await findUser({ email: req.body.email });
    if (existingUser) {
      throw new Error("User already exists");
    } else {
      const user = new User();
      user._id = new mongoose.Types.ObjectId();
      const newUser = Object.assign(user, req.body);
      const hashedPassword = await bcrypt.hash(newUser.password, 10);
      newUser.password = hashedPassword;
      const savedUser = await saveUser(newUser);
      return res.status(201).json({
        message: "Successful Registration",
        user: savedUser,
      });
    }
  } catch (e) {
    return errorTemplate(res, e, e.message);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const loggedUser = await findUser({ email: req.body.email });
    if (!loggedUser) {
      throw new Error("Authentication Failed: Unable to find user");
    } else {
      const result = await bcrypt.compare(
        req.body.password,
        loggedUser.password,
      );
      if (result) {
        const token = jwt.sign({ user: loggedUser }, process.env.JWT);
        return res.status(201).json({
          user: loggedUser,
          logged: true,
          token: token,
          message: "Login Successful",
        });
      } else {
        throw new Error(
          "Authentication failed: Email or password does not match",
        );
      }
    }
  } catch (e) {
    return errorTemplate(res, e, e.message);
  }
};
