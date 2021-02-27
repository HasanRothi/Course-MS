const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Student = require("../database/model/testStudent");
const nodemailer = require("nodemailer");
// upload file (img)
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
//cloud storage
var cloudinary = require('cloudinary').v2;
//access file system
const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)
//cloudinary apk
cloudinary.config({ 
    cloud_name: 'innweb', 
    api_key: '469944758647419', 
    api_secret: 'gERk5boSpadDRZAsbyouv8kDxso' 
  });
//Send mail to students

const basePath = "https://ucam-it.herokuapp.com/";
// const x = require("../");
const facultyPath = "student";
//student list
router.get("/", (req, res, next) => {
    Student.find()
        .select()
        .populate("courseList.courseInfo")
        .exec()
        .then((allStudent) => {
            const response = {
                "Number of student": allStudent.length,
                Students: allStudent.map((student) => {
                    return {
                        id: student.userId,
                        Name: student.name,
                        Dept: student.dept,
                        password: student.password,
                        Phone: student.phone,
                        Mail: student.mail,
                        TotalCourse: student.courseList.length,
                        CourseList: student.courseList,
                    };
                }),
            };
            res.status(200).json(response);
        })
        .catch((err) => {
            console.log(err);
        });
});
// list by dept
router.get("/dept/:deptCode", (req, res, next) => {
    // global.noticeTitleForStudent = "Variable from api";
    // const sendMail = require("../../mailSender/notifyStudentByNotice");
    var dept = req.params.deptCode
    Student.find({ dept: dept })
        .select()
        .populate("courseList.courseInfo")
        .exec()
        .then((allStudent) => {
            const response = {
                "Number of student": allStudent.length,
                Students: allStudent.map((student) => {
                    return {
                        id: student.userId,
                        Name: student.name,
                        Dept: student.dept,
                        password: student.password,
                        Phone: student.phone,
                        Mail: student.mail,
                        TotalCourse: student.courseList.length,
                        CourseList: student.courseList,
                    };
                }),
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
        .populate("courseList.courseInfo")
        .exec()
        .then((info) => {
            res.status(200).json(info);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ Result: "student not found", error: err });
        });
});

//add new student
router.post("/",upload.single('avatar'),(req, res, next) => {
    console.log(req.file)
    cloudinary.uploader.upload(req.file.path)
    .then(async (result)=>{
        // console.log(result)
        await unlinkAsync(req.file.path) // remove file from local
         //student data object
    const student = new Student({
        _id: new mongoose.Types.ObjectId(),
        userId: req.body.userId,
        name: req.body.name,
        password: req.body.password,
        phone: req.body.phone,
        mail: req.body.mail,
        dept: req.body.dept,
        avatar: result.url
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
    })
    .catch((err)=>{
        console.log(err)
        res.json(err)
    })
   
});
//add course
router.post("/addcourse", (req, res, next) => {
    const studentid = req.body.studentId;
    const studentCourse = req.body.courseList;
    var queryAddCourse = new Array("");
    var l = -1;
    studentCourse.forEach((element) => {
        l++;
        queryAddCourse[l] = { courseInfo: studentCourse[l] };
    });

    Student.updateOne({ userId: studentid }, {
            $addToSet: {
                courseList: {
                    $each: [
                        queryAddCourse[0]
                    ],
                },
            },
        })
        .exec()
        .then((msg) => {
            res.json(msg);

        })
        .catch((errMsg) => {
            res.json("Error in add course" + errMsg);
        });
});

//update student info
router.patch("/:studentId", (req, res, next) => {
    const id = req.params.studentId;
    console.log(id)
    Student.updateOne({ userId: id }, { $set: req.body })
        .exec()
        .then((result) => {
            console.log("Student Update successfully");
            res.status(200).json({
                message: 'Student Update successfully'
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.patch ('/lol',(req,res)=>{
    console.log('lol')
})
// payment
router.patch("/payment/:studentId", (req, res, next) => {
    // const id = req.params.studentId;
    console.log('payment')
    // Student.findByIdAndUpdate({ userId: id }, { $inc: paid + req.body.payment })
    //     .exec()
    //     .then((result) => {
    //         console.log("Payment successfully");
    //         res.status(200).json({
    //             message: "Payment successfully"
    //         });
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         res.status(500).json(err);
    //     });
});
//Delete course
router.delete("/removecourse/:studentId", (req, res, next) => {
    const studentid = req.params.studentid;
    const course = req.body.course;
    Student.updateOne({ userId: studentid }, { $pullAll: { courseList: [{ _id: course }] } })
        .exec()
        .then((nMsg) => {
            res.json(nMsg);
        })
        .catch((nErr) => {
            res.json(nErr);
        });
});
//Delete student
router.delete("/:studentid", (req, res, next) => {
    const studentid = req.params.studentid;
    // console.log(studentid);
    Student.deleteOne({ userId: studentid })
        .exec()
        .then((msg) => {
            res.json("Student removed");
        })
        .catch((msgErr) => {
            res.json(msgErr);
        });
});
module.exports = router;