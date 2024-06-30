const express = require("express");
const { saveUser, findUser } = require("../db/db");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const mongoose = require("mongoose");

const router = express.Router();

router.post("/register", (req, res, next) => {
  findUser({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.status(409).json({ message: "User exists, try logging in" });
      } else {
        const user = new User();
        user._id = new mongoose.Types.ObjectId();
        const newUser = Object.assign(user, req.body);

        // Extract the password
        const password = newUser.password;

        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            return res.status(501).json({ message: "Error: " + err.message });
          } else {
            // Replace the plain text password with the hash
            newUser.password = hash;

            // Save the user to the database
            saveUser(newUser)
              .then((dbUser) => {
                return res
                  .status(201)
                  .json({ message: "Successful Registration", user: dbUser });
              })
              .catch((err) => {
                return res
                  .status(500)
                  .json({ message: "Error: " + err.message });
              });
          }
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
});

module.exports = router;
