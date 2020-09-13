const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Faculty = require("../database/model/faculty");
const jwt = require("jsonwebtoken");
const checkFacultyAuth = require("../middleware/checkFacultyAuth");

//login Auth
router.post("/login", (req, res, next) => {
  const facultyId = req.body.facultyId;
  const facultyPassword = req.body.facultyPassword;
  Faculty.findOne({ userId: facultyId })
    .exec()
    .then((result) => {
      if (result.password == facultyPassword) {
        const token = jwt.sign(
          {
            email: result.mail,
            userId: result.userId,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "30s",
          }
        );
        console.log("Login success");
        return res.json({ message: "Auth Success", token: token });
      } else {
        console.log("Wrong Password");
      }
    })
    .catch((error) => {
      console.log("Invalid Faculty Id");
    });
});

//Logout
router.post("/logout", (req, res, next) => {});
module.exports = router;
