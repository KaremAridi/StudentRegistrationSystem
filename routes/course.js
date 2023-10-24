const express = require("express");
const router = express.Router();
const CourseController = require('../controllers/courseController');

router.get("/:id", CourseController.course);
router.get("/removeCourse/:id", CourseController.removeCourse);

module.exports = router;