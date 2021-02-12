const Course = require("../database/model/course");
const basePath = "https://ucam-it.herokuapp.com/";
const facultyPath = "faculty";
const coursePath = "course";
const mongoose = require("mongoose");
const Sentry = require("@sentry/node");
//get all students
exports.get_all_student = (req, res, next) => {

    Course.find()
        .select()
        .exec()
        .then((allCourse) => {
            const response = {
                "Number of course": allCourse.length,
                Courses: allCourse.map((course) => {
                    return {
                        id: course.id,
                        CourseCode: course.courseCode,
                        CourseName: course.courseName,
                        CourseCredit: course.courseCredit,
                        Faculty: course.facultyId,
                        FacultyInfo: {
                            url: basePath + facultyPath + "/" + course.facultyId,
                        },
                    };
                }),
            };
            res.status(200).json(response);
        })
        .catch((err) => {
            console.log("Error" + err);
        });
};

//get list of course by faculty
exports.course_by_faculty = (req, res, next) => {
    const fid = req.params.facultyId;
    Course.find({ facultyId: fid })
        .select("_id courseCode courseName courseCredit")
        .exec()
        .then((info) => {
            console.log(info);
            res.status(200).json(info);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ Result: "No Course found", error: err });
        });
};
//get course y dept
exports.get_course_by_dept = (req, res, next) => {
    var dept = req.params.deptCode
    Course.find({ dept: dept })
        .select()
        .exec()
        .then((allCourse) => {
            const response = {
                "Number of course": allCourse.length,
                Courses: allCourse.map((course) => {
                    return {
                        id: course.id,
                        CourseCode: course.courseCode,
                        CourseName: course.courseName,
                        CourseCredit: course.courseCredit,
                        Faculty: course.facultyId,
                        FacultyInfo: {
                            url: basePath + facultyPath + "/" + course.facultyId,
                        },
                    };
                }),
            };
            res.status(200).json(response);
        })
        .catch((err) => {
            console.log("Error" + err);
        });
};

//get single course by course code
exports.course_by_code = (req, res, next) => {
    const code = req.params.courseCode;
    Course.find({ courseCode: code })
        .select()
        .exec()
        .then((info) => {
            console.log(info);
            res.status(200).json(info);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ Result: "No Course found", error: err });
        });
};

//add new course
exports.insert_course = (req, res, next) => {
    const singleCourse = {
        code: req.body.courseCode,
        name: req.body.courseName,
        credit: req.body.courseCredit,
        faculty: req.body.facultyId,
        dept: req.body.dept, 
    };
    console.log(singleCourse);
    //course data object
    const course = new Course({
        _id: new mongoose.Types.ObjectId(),
        courseCode: req.body.courseCode,
        courseName: req.body.courseName,
        courseCredit: req.body.courseCredit,
        facultyId: req.body.facultyId,
        dept: req.body.dept
    });

    //insert query
    course
        .save()
        .then((result) => {
            console.log("Success\n" + result);
            res.status(200).json({
                message: "Course info inserted",
                courseInfo: singleCourse,
            });
        })
        .catch((err) => {
            // console.log(err);
            console.log('Error')
            const transaction = Sentry.startTransaction({
                op: "Add Student",
                name: "My First Error Transaction",
              });
              Sentry.captureException(err);
              transaction.finish();
            res.status(500).json(err);
        });
};

//Update course info
exports.update_course = (req, res, next) => {
    const code = req.params.courseCode;
    // const updateInfo = {};
    // for (const info of req.body) {
    //     updateInfo[info.propName] = info.value;
    // }
    // console.log("Update " + updateInfo);
    Course.updateOne({ courseCode: code }, { $set: req.body })
        .exec()
        .then((result) => {
            console.log("Update successfully");
            res.status(200).json({
                message: "course info updated",
                update: req.body,
                resultInfo: result,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
};

//delete course
exports.delete_course = (req, res, next) => {
    const id = req.params.courseId;
    // console.log("GOing to delete" + id)
    Course.deleteOne({ _id: id })
        .exec()
        .then((result) => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log("Error" + err);
            res.status(500).json(err);
        });
};

//delete all course
exports.delete_all_course = (req, res, next) => {
    Course.deleteMany()
        .exec()
        .then((result) => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log("Error" + err);
            res.status(500).json(err);
        });
};