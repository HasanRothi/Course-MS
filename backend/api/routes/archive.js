const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Archive = require("../database/model/archive");

const basePath = process.env.API_BASE_PATH;
//chat all
router.get("/", (req, res, next) => {
    // console.log('log check ',req.connection.remoteAddress)
    Archive.find().select()
        .then((result) => {
            res.json(result)
        })
        .catch((error) => {
            res.json(error)
        })
});
//dept wise archive
router.get("/:dept", (req, res, next) => {
    // console.log('log check ',req.connection.remoteAddress)
    const dept = req.params.dept
    console.log(dept)
    Archive.find({dept:dept}).select()
        .then((result) => {
            res.json(result)
        })
        .catch((error) => {
            res.json(error)
        })
});
//dept wise archive
router.get("/:dept/:type", (req, res, next) => {
    // console.log('log check ',req.connection.remoteAddress)
    const dept = req.params.dept
    const type = req.params.type
    Archive.find({dept:dept,type:type}).select()
        .then((result) => {
            res.json(result)
        })
        .catch((error) => {
            res.json(error)
        })
});

//add archive
router.post("/", (req, res, next) => {
    console.log('eikhane')
    const { title, description, dept, link,type, supervisor, students } = req.body;

    console.log( title, description, dept, link,type, supervisor, students);
    //faculty data object
    const archive = new Archive({
        _id: new mongoose.Types.ObjectId(),
        title: title,
        description:description,
        supervisor: supervisor,
        link: link,
        type: type,
        dept: dept,
        students :students
    });

    //insert query
    archive
        .save()
        .then((result) => {
            console.log("Success\n" + result);
            res.status(200).json({
                message: "Archive info inserted",
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});



module.exports = router;