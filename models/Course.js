const mongoose = require("mongoose");

const {Schema} = mongoose;

const CourseSchema = new Schema({
    title: String,
    image: String,
    longDescription: String,
    shortDescription: String,
    videoLink: String,
});

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;