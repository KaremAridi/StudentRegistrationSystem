const express = require("express");
const router = express.Router();
const CourseController = require('../controllers/courseController');

router.get("/", CourseController.index);
router.get("/register/:id", CourseController.register);

module.exports = router;