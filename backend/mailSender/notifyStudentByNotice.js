const mongoose = require("mongoose");
const Student = require("../api/database/model/testStudent");
const nodemailer = require("nodemailer");

//Get value from api
const notice = require("../api/routes/testThing");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASS,
  },
});

var studentList = new Array();
Student.find()
  .select("mail")
  .exec()
  .then((list) => {
    list.map((l) => {
      studentList.push(l); // listing all students mail address
    });
    //message sender layout
    console.log(studentList)
    var msg = {
      from: "hasanrothi99@gmail.com",
      to: studentList,
      subject: noticeTitleForStudent + " (" + noticeForCourse + ")",
      //   text: noticeDescriptionForStudent,
      html:
        "<i>Dear student,</i>" +
        "<p>" +
        noticeDescriptionForStudent +
        "</p>" +
        "<b>" +
        "Informed by - " +
        noticePostBy +
        "</b>",
    };
    console.log('mail send hoise..')
    //send mail function
    transporter.sendMail(msg, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Send mail success " + info);
        res.status(200).json({
          message: "Notice post uploaded"
      });
      }
    });
  })
  .catch((err) => {
    console.log("Error to listup students" + err);
  });
