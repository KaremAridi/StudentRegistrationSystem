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
     
    res.render("../views/index.ejs", { courses: courses, user: user });
  } catch (error) {
    console.log(error);
  }
};

const course = async (req, res) => {
  const id = req.params.id;
  if (session.getSession().loggedIn == undefined) {
    res.redirect("/user/login");
    return;
  }

  try {
    const course = await Course.findById(id);
    const user = await User.findById(session.getSession().loggedIn);
    const reg = user.registeredCourses;
    course.registered=false;

    for (let i = 0; i<reg.length; i++){
      if(reg[i].equals(course._id)){
        course.registered=true;
        break;
      }
    }
    res.render("../views/course.ejs", { course: course });
  } catch (error) {
    console.log(error);
  }
};

const myCourses = async (_, res) => {
  if (session.getSession().loggedIn == undefined) {
    res.redirect("/user/login");
    return;
  }
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
    const course = await Course.findById(cousreid);

    user.registeredCourses= registeredCourses
    user.save()
    res.redirect(`/course/${cousreid}`,{course: course});
  } catch (error) {
    console.log(error);
  }
};

const removeCourse = async (req,res) => {
  const Id = req.params.id;
  try{
  const user = await User.findById(session.getSession().loggedIn);
  const registered = user.registeredCourses;
  const updatedRegister = registered.filter((elem) => !elem.equals(Id) );
  await User.findByIdAndUpdate(session.getSession().loggedIn,{ registeredCourses: updatedRegister});
  }catch(error) {
    console.log(error);
  }
  res.redirect("/mycourses");
};

module.exports = { index, course, myCourses, register,removeCourse };
