const Course = require("../models/Course");
const User = require("../models/User");
const mongoose = require("mongoose");

const index = async (_,res) =>{
    try{
        const courses = await Course.find({});
   // const isLoggedIn = session.getSession().loggedIn;
    
    //if (isLoggedIn) user = await User.findById(isLoggedIn);
//loggedIn: isLoggedIn, user:user
    res.render("../views/index.ejs", { courses: courses});
    }
    catch(error) {
        console.log(error);
      }
}

module.exports = {index};