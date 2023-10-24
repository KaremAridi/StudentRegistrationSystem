const express = require("express");
const router = express.Router();
const CourseController = require('../controllers/courseController');

router.get("/removeCourse/:id", CourseController.removeCourse);
router.get("/:id", CourseController.register);

module.exports = router;