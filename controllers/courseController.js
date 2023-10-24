const Course = require("../models/Course");
const User = require("../models/User");
const mongoose = require("mongoose");
const session = require("../session");

const index = async (_, res) => {
  try {
    if (session.getSession().loggedIn == undefined) {
      res.redirect("/user/login");
      return;
    }
    const courses = await Course.find({});

    const user = await User.findById(session.getSession().loggedIn);
    const registeredCourses = user.registeredCourses ?? [];
    const myCourses = await Course.find({
      _id: { $in: registeredCourses.map(id => new mongoose.Types.ObjectId(id)) }
    });

    courses.forEach(course => {
      if (myCourses.includes(course._id.toString())) {
console.log("yes")
          course.registered = true;
        }else{
          course.registered = false;
        }
      });
      
    res.render("../views/index.ejs", { courses: courses, user: user });
  } catch (error) {
    console.log(error);
  }
};

const course = async (req, res) => {
  const id = req.params.id;

  try {
    const course = await Course.findById(id);

    res.render("../views/course.ejs", { course: course });
  } catch (error) {
    console.log(error);
  }
};

const myCourses = async (_, res) => {
  try {
    if (session.getSession().loggedIn == undefined) {
      res.redirect("/user/login");
      return;
    }
    const user = await User.findById(session.getSession().loggedIn);

    const courses = await Course.find({
      _id: user.registeredCourses.map((course) => course._id),
    });

    res.render("../views/mycourses.ejs", { courses: courses });
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    const cousreid = req.params.id;

    const userID = session.getSession().loggedIn;
    const user = await User.findById(userID);

    const registeredCourses = user.registeredCourses ?? [];
   
    if (registeredCourses.indexOf(cousreid) === -1) {
      registeredCourses.push(cousreid);
    }    

    user.registeredCourses= registeredCourses
    user.save()
    for (temp in user.registeredCourses){
    console.log(temp)
    }
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { index, course, myCourses, register };
