const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const bcrypt = require("bcryptjs");

//Login route
router.post("/login", async (req, res) => {
  userModel.findOne({ email: req.body.email }, (err, data) => {
    if (!data) {
      res.status(401).json({
        message: "Email doesn't exist.",
      });
    } else {
      //validate password
      bcrypt.compare(req.body.password, data.password, (err, isValid) => {
        if (err) {
          res.status(500).json({
            message: "An error occured. Please try again.",
          });
          return;
        }
        if (!isValid) {
          res.status(401).json({
            message: "Wrong email/password.",
          });
          return;
        } else {
          res.status(200).json({
            message: "Auth OK",
            firstName: data.firstName,
            lastName: data.lastName,
            privilege: data.privilege,
            email: req.body.email,
          });
        }
      });
    }
  });
});

//Register route
router.post("/register", async (req, res) => {
  console.log(req.body);

  var exists = false;

  await userModel.find({ email: req.body.email }, function (err, docs) {
    //console.log("Checking if email exists...");
    if (docs.length) {
      exists = true;

      res.status(409).json({
        message: "Email already exists.",
      });
    }
  });

  if (!exists) {
    //console.log("Saving new user...");

    let newUser = new userModel({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
    });

    newUser.save((err, data) => {
      if (err) {
        res.status(500).json({
          message: err.message,
        });
        return;
      }
      res.status(200).json({
        message: "Auth OK",
      });
    });
  }
});

module.exports = router;
