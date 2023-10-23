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

module.exports = {index};