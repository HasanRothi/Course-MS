const mongoose = require("mongoose");
const Student = require("../api/database/model/testStudent");
const nodemailer = require("nodemailer");

//Get value from api
const notice = require("../api/routes/testStudent");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "forrukh@gmail.com",
    pass: "kemonaso999",
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

    var msg = {
      from: "forrukh@gmail.com",
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

    //send mail function
    transporter.sendMail(msg, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Send mail success " + info);
      }
    });
  })
  .catch((err) => {
    console.log("Error to listup students" + err);
  });
