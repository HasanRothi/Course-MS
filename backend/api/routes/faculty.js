const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Faculty = require("../database/model/faculty");

const basePath = "http://localhost:3000/";
const facultyPath = "faculty";
//faculty list
router.get("/", (req, res, next) => {
  Faculty.find()
    .select("userId name phone mail")
    .exec()
    .then((allFaculy) => {
      const response = {
        "Number of faculty": allFaculy.length,
        Facultys: allFaculy.map((faculty) => {
          return {
            userId: faculty.userId,
            name: faculty.name,
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
    .select("userId name password phone mail")
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
  const { userId, name, password, phone, mail } = req.body;
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
