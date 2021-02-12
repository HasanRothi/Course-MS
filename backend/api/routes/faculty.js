const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Faculty = require("../database/model/faculty");
const checkAuth = require('../middleware/checkAuth')

const basePath = process.env.API_BASE_PATH;
const facultyPath = "faculty";
//faculty list
router.get("/",checkAuth , (req, res, next) => {
    Faculty.find()
        .select("userId name phone mail password dept")
        .exec()
        .then((allFaculy) => {
            const response = {
                "Number of faculty": allFaculy.length,
                Facultys: allFaculy.map((faculty) => {
                    return {
                        userId: faculty.userId,
                        name: faculty.name,
                        password: faculty.password,
                        phone: faculty.phone,
                        mail: faculty.mail,
                        dept: faculty.dept,
                        more: {
                            url: basePath + facultyPath + "/" + faculty._id,
                        },
                    };
                }),
            };
            res.status(200).json(response);
        })
        .catch((err) => {
            console.log(err);
        });
});
//faculty list by dept
router.get("/dept/:deptCode", (req, res, next) => {
    var dept = req.params.deptCode
    Faculty.find({ dept: dept })
        .select("userId name phone mail password dept")
        .exec()
        .then((allFaculy) => {
            const response = {
                "Number of faculty": allFaculy.length,
                Facultys: allFaculy.map((faculty) => {
                    return {
                        userId: faculty.userId,
                        name: faculty.name,
                        password: faculty.password,
                        phone: faculty.phone,
                        mail: faculty.mail,
                        dept: faculty.dept,
                        more: {
                            url: basePath + facultyPath + "/" + faculty._id,
                        },
                    };
                }),
            };
            res.status(200).json(response);
        })
        .catch((err) => {
            console.log(err);
        });
});

//Single faculty
router.get("/:facultyid", (req, res, next) => {
    const id = req.params.facultyid;
    if (id.length == 3) quryMethod = Faculty.find({ userId: id });
    else quryMethod = Faculty.find({ _id: id });
    quryMethod
        .select("userId name password phone mail dept")
        .exec()
        .then((info) => {
            console.log(info);
            res.status(200).json(info);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ Result: "No search found", error: err });
        });
});

//Add new Faculty
router.post("/", (req, res, next) => {
    const { userId, name, password, phone, mail, dept } = req.body;
    const singleFaculty = {
        id: userId,
        name: name,
        password: password,
    };
    console.log(singleFaculty);
    //faculty data object
    const faculty = new Faculty({
        _id: new mongoose.Types.ObjectId(),
        userId: userId,
        name: name,
        password: password,
        phone: phone,
        mail: mail,
        dept: dept
    });

    //insert query
    faculty
        .save()
        .then((result) => {
            console.log("Success\n" + result);
            res.status(200).json({
                message: "faculty info inserted",
                facultyInfo: singleFaculty,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//update single faculty
router.patch("/:facultyId", (req, res, next) => {
    const id = req.params.facultyId;
    // const updateInfo = {};
    // for (const info of req.body) {
    //     updateInfo[info.propName] = info.value;
    // }
    // console.log("Update " + updateInfo);
    Faculty.updateOne({ userId: id }, { $set: req.body })
        .exec()
        .then((result) => {
            console.log("Update successfully");
            res.status(200).json({
                message: "faculty info updated",
                update: req.body,
                resultInfo: result,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
//Delete single faculty
router.delete("/:facultyId", (req, res, next) => {
    const id = req.params.facultyId;
    console.log(id)
    Faculty.deleteOne({ userId: id })
        .exec()
        .then((result) => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log("Error" + err);
            res.status(500).json(err);
        });
});

module.exports = router;