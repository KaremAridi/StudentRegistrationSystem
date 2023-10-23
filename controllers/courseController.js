const Course = require("../models/Course");
const User = require("../models/User");
const mongoose = require("mongoose");

const index = async (_,res) =>{
    const courses = await Course.find({});
    const isLoggedIn = session.getSession().loggedIn;
    
    if (isLoggedIn) user = await User.findById(isLoggedIn);

    res.render("../views/index.ejs", { courses: courses, loggedIn: isLoggedIn, user:user});

}