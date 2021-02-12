const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Student = require("../database/model/testStudent");
// const Course = require("../database/model/course");

const basePath = process.env.API_BASE_PATH;
const facultyPath = "student";
//course list
router.get("/", (req, res, next) => {
    Student.find()
        .select()
        .populate("courseList.courseId")
        .exec()
        .then((allStudent) => {
            const response = {
                "Number of student": allStudent.length,
                Students: allStudent,
            };
            res.status(200).json(response);
        })
        .catch((err) => {
            console.log(err);
        });
});

//Single student
router.get("/:studentId", (req, res, next) => {
    const id = req.params.studentId;
    console.log(id);
    if (id.length < 15) quryMethod = Student.find({ userId: id });
    else quryMethod = Student.find({ _id: id });
    quryMethod
        .select()
        .exec()
        .then((info) => {
            console.log(info);
            res.status(200).json(info);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ Result: "student not found", error: err });
        });
});

//add new student
router.post("/", (req, res, next) => {
    //student data object
    const student = new Student({
        _id: new mongoose.Types.ObjectId(),
        userId: req.body.userId,
        name: req.body.name,
        password: req.body.password,
        phone: req.body.phone,
        mail: req.body.mail,
    });

    //insert query
    student
        .save()
        .then((result) => {
            console.log("Success\n" + result);
            res.status(200).json({
                message: "Student Inserted Successfully",
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//add course
router.post("/addcourse", (req, res, next) => {
    const student = req.body.studentId;
    const studentCourse = req.body.courseList;
});
module.exports = router;