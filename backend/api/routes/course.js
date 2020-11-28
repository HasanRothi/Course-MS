const express = require("express");
const router = express.Router();
// const checkFacultyAuth = require("../middleware/checkFacultyAuth");

//Route Controller -- Course
const RouteController = require("../routeController/course");

//course list
// router.get("/all", checkFacultyAuth, RouteController.get_all_student);
router.get("/all", RouteController.get_all_student);

//course by dept
router.get("/dept/:deptCode", RouteController.get_course_by_dept);

//Single course
router.get("/:courseCode", RouteController.course_by_code);

//course by faculty
router.get("/all/faculty/:facultyId", RouteController.course_by_faculty);

//Add new course
router.post("/", RouteController.insert_course);

//update single course
router.patch("/:courseCode", RouteController.update_course);

//Delete single course
router.delete("/remove/:courseId", RouteController.delete_course);

//Delete all courses
router.delete("/remove/all", RouteController.delete_all_course);

module.exports = router;