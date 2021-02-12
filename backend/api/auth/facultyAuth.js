const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Faculty = require("../database/model/faculty");
const jwt = require("jsonwebtoken");

//login Auth
router.post("/login", (req, res, next) => {
    const facultyId = req.body.facultyId;
    const facultyPassword = req.body.facultyPassword;
    Faculty.findOne({ userId: facultyId })
        .exec()
        .then((result) => {
            if (result.password == facultyPassword) {
                const token = jwt.sign({
                        email: result.mail,
                        userId: result.userId,
                    },
                    process.env.JWT_SECRET, {
                        expiresIn: "1h",
                    }
                );
                console.log("Login success");
                return res.json({ message: "Auth Success", token: token });
            } else {
                // console.log("Wrong Password");
                return res.json({message: 'Wrong Password'});
            }
        })
        .catch((error) => {
            // console.log("Invalid Faculty Id");
            return res.json(error);
        });
});

//Logout
router.post("/logout", (req, res, next) => {
    
});
module.exports = router;