const express = require("express");
const router = express.Router();
const CourseController = require('../controllers/courseController');



//if requesting /unregister/Exhibition/ then any form of data.
//execute unregister method
//router.get("/unregisterExhibition/:id", ExhibitionController.unregister);

router.get("/", CourseController.index);

module.exports = router;