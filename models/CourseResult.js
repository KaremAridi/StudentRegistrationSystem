const mongoose = require("mongoose");

const {Schema} = mongoose;

const CourseResultSchema = new Schema({
    title: String,
    registered: Number,
    finished: Number
});

const CourseResult = mongoose.model("CourseResult", CourseResultSchema);

module.exports = CourseResult;