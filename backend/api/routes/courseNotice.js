const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const CourseNotice = require("../database/model/courseNotice");

const jwt = require("jsonwebtoken");

const basePath = "http://localhost:3000/";
const coursePath = "course";
const facultyPath = "faculty";
//notice list
router.get("/", (req, res, next) => {
  CourseNotice.find()
    .sort({ date: -1 })
    .select("noticeTitle noticeDetails courseCode facultyId date")
    .exec()
    .then((allNotice) => {
      const response = {
        "Number of notice": allNotice.length,
        Notice: allNotice.map((notice) => {
          return {
            NoticeTitle: notice.noticeTitle,
            NoticeDetails: notice.noticeDetails,
            CourseCode: notice.courseCode,
            Faculty: notice.facultyId,
            Date: notice.date,
            more: {
              Course: basePath + coursePath + "/" + notice.courseCode,
              Faculty: basePath + facultyPath + "/" + notice.facultyId,
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

//recent notice
router.get("/recent", (req, res, next) => {
  CourseNotice.find()
    .sort({ date: -1 })
    .limit(5)
    .select("noticeTitle noticeDetails courseCode facultyId date")
    .exec()
    .then((allNotice) => {
      const response = {
        Notice: allNotice.map((notice) => {
          return {
            NoticeTitle: notice.noticeTitle,
            NoticeDetails: notice.noticeDetails,
            CourseCode: notice.courseCode,
            Faculty: notice.facultyId,
            Date: notice.date,
            more: {
              Course: basePath + coursePath + "/" + notice.courseCode,
              Faculty: basePath + facultyPath + "/" + notice.facultyId,
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

// All notice by course
router.get("/:courseCode", (req, res, next) => {
  const code = req.params.courseCode;
  CourseNotice.find({ courseCode: code })
    .select("noticeTitle noticeDetails courseCode facultyId date")
    .exec()
    .then((info) => {
      console.log(info);
      const respone = {
        "Number of Notice": info.length,
        Notices: info,
      };
      res.status(200).json(respone);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ Result: "No search found", error: err });
    });
});

//single notice
router.get("/:cousreCode/:title", (req, res, next) => {
  const title = req.params.title;
  CourseNotice.find({ noticeTitle: title })
    .select("noticeTitle noticeDetails courseCode facultyId date")
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

//Add new notice
router.post("/", (req, res, next) => {
  // Using Date() method
  var d = Date();
  // Converting the number value to string
  now = d.toString();
  const singleNotice = {
    NoticeTitle: req.body.noticeTitle,
    NoticeDetails: req.body.noticeDetails,
    CourseCode: req.body.courseCode,
    FacultyId: req.body.facultyId,
    Date: now,
  };
  //noticedata object
  const notice = new CourseNotice({
    _id: new mongoose.Types.ObjectId(),
    noticeTitle: req.body.noticeTitle,
    noticeDetails: req.body.noticeDetails,
    courseCode: req.body.courseCode,
    facultyId: req.body.facultyId,
    date: now,
  });

  //insert query
  notice
    .save()
    .then((result) => {
      console.log("Success\n" + result);
      //send mail
      global.noticeForCourse = req.body.courseCode;
      global.noticeTitleForStudent = req.body.noticeTitle;
      global.noticePostBy = req.body.facultyId;
      global.noticeDescriptionForStudent = req.body.noticeDetails;
      //4 global variable for send mail subject,body
      const sendMail = require("../../mailSender/notifyStudentByNotice");
      //End send mail
      res.status(200).json({
        message: "Notice post uploaded",
        noticeInfo: singleNotice,
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
  const updateInfo = {};
  for (const info of req.body) {
    updateInfo[info.propName] = info.value;
  }
  console.log("Update " + updateInfo);
  Faculty.updateOne({ _id: id }, { $set: updateInfo })
    .exec()
    .then((result) => {
      console.log("Update successfully");
      res.status(200).json({
        message: "faculty info updated",
        update: updateInfo,
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
  Faculty.remove({ _id: id })
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
