const express = require("express");
const router = express.Router();
const CourseController = require('../controllers/courseController');

router.get("/", CourseController.myCourses);
router.get("/removeCourse/:id", CourseController.removeCourse);

module.exports = router;