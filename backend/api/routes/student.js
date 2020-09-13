// const express = require("express");
// const router = express.Router();
// const mongoose = require("mongoose");
// const Student = require("../database/model/student");

// const basePath = "http://localhost:3000/";
// const facultyPath = "student";
// //course list
// router.get("/", (req, res, next) => {
//   Student.find()
//     .select("userId name phone mail")
//     .exec()
//     .then((allFaculy) => {
//       const response = {
//         "Number of faculty": allFaculy.length,
//         Facultys: allFaculy.map((faculty) => {
//           return {
//             userId: faculty.userId,
//             name: faculty.name,
//             more: {
//               url: basePath + facultyPath + "/" + faculty._id,
//             },
//           };
//         }),
//       };
//       res.status(200).json(response);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// //Single course
// router.get("/:courseid", (req, res, next) => {
//   const id = req.params.facultyid;
//   if (id.length == 3) quryMethod = Faculty.find({ userId: id });
//   else quryMethod = Faculty.find({ _id: id });
//   quryMethod
//     .select("userId name phone mail")
//     .exec()
//     .then((info) => {
//       console.log(info);
//       res.status(200).json(info);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ Result: "No search found", error: err });
//     });
// });

// //add new student
// router.post("/", (req, res, next) => {
//   //student data object
//   const student = new Student({
//     _id: new mongoose.Types.ObjectId(),
//     userId: req.body.userId,
//     name: req.body.name,
//     password: req.body.password,
//     phone: req.body.phone,
//     mail: req.body.mail,
//     courseList: req.body.courseList,
//   });

//   //insert query
//   student
//     .save()
//     .then((result) => {
//       console.log("Success\n" + result);
//       res.status(200).json({
//         message: "Student Inserted Successfully",
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });
// module.exports = router;
