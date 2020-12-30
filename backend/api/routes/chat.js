const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Chat = require("../database/model/chat");
const moment = require('moment')


const basePath = "https://ucam-it.herokuapp.com/";
//chat all
router.get("/", (req, res, next) => {
    // console.log('log check ',req.connection.remoteAddress)
    Chat.find().select()
        .then((result) => {
            res.json(result)
        })
        .catch((error) => {
            res.json(error)
        })
});

//chat list
router.get("/:courseCode", (req, res, next) => {
    var courseCode = req.params.courseCode;
    Chat.find({ courseCode: courseCode }).select()
        .then((result) => {
            res.json(result)
        })
        .catch((error) => {
            res.json(error)
        })
});
//course code entry for chat
router.post("/:courseCode", (req, res, next) => {
    var courseCode = req.params.courseCode;
    const chat = new Chat({
        _id: new mongoose.Types.ObjectId(),
        courseCode: courseCode
    });
    chat.save()
        .then((result => {
            res.json(result)
        })).catch((error) => {
            res.json(error)
        })
});
//add message
router.post("/message/:courseCode", (req, res, next) => {
    console.log("here")
    var code = req.params.courseCode;
    var userId = req.body.userId;
    var message = req.body.message;
    var currentDateMoment = moment().format("LLLL");
    var date = currentDateMoment
    console.log(code + userId + message + date)
    Chat.updateOne({ courseCode: code }, {
        $push: {
            chatList: {
                userId: userId,
                message: message,
                date: date
            }
        }
    }).then((result) => {
        res.json(result)
    }).catch((error) => {
        res.json(error)
    })
});



module.exports = router;