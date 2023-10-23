const Course = require("../models/Course");
const User = require("../models/User");
const mongoose = require("mongoose");

const index = async (_,res) =>{
    try{
    const courses = await Course.find({});

    res.render("../views/index.ejs", { courses: courses});
    }
    catch(error) {
        console.log(error);
      }
}

const course = async (req,res) =>{
    const id = req.params.id;

    try{
    const course = await Course.findById(id);

    res.render("../views/course.ejs", { course: course});
    }
    catch(error) {
        console.log(error);
      }
}

module.exports = {index,course};