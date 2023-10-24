const Course = require("../models/Course");
const CourseResult = require("../models/CourseResult");
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
    const reg = user.registeredCourses ?? [];
    const finished = user.finishedCourses ?? [];
    course.registered=false;
    course.finished=false;

    for (let i = 0; i<reg.length; i++){
      if(reg[i].equals(course._id)){
        course.registered=true;
        break;
      }
    }
    for (let i = 0; i<finished.length; i++){
      if(finished[i].equals(course._id)){
        course.finished=true;
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
    const user = await User.findById(session.getSession().loggedIn);

    const courses = await Course.find({
      _id: user.registeredCourses.map((course) => course._id),
    });

    const finishedCourses = user.finishedCourses?? [];
    for(let i =0;i<finishedCourses.length;i++){
      courses.forEach((course) => {if(course._id.equals(finishedCourses[i])){
        course.finished = true
      }
    });
    }
    let results = {};
    //table
    if(user.admin){
      results = await CourseResult.find({});
    }

    res.render("../views/mycourses.ejs", { courses: courses, admin:user.admin,results:results });
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  if (session.getSession().loggedIn == undefined) {
    res.redirect("/user/login");
    return;
  }
  try {
    if(mongoose.Types.ObjectId.isValid(req.params.id)){
   
    const cousreid = req.params.id;

    const userID = session.getSession().loggedIn;
    const user = await User.findById(userID);

    const registeredCourses = user.registeredCourses ?? [];
   
    if (registeredCourses.indexOf(cousreid) === -1) {
      registeredCourses.push(cousreid);
    }    
    user.registeredCourses= registeredCourses
    user.save()
    const course = await Course.findById(cousreid);
    course.registered = true
    const temp = await CourseResult.findById(cousreid);
    temp.registered = temp.registered +1
    temp.save()
    res.render("../views/course.ejs", { course: course });
  }
  } catch (error) {
    console.log(error);
  }
};

const removeCourse = async (req,res) => {
  if (session.getSession().loggedIn == undefined) {
    res.redirect("/user/login");
    return;
  }
  const Id = req.params.id;
  try{
  const user = await User.findById(session.getSession().loggedIn);
  const registered = user.registeredCourses;
  const updatedRegister = registered.filter((elem) => !elem.equals(Id) );
  await User.findByIdAndUpdate(session.getSession().loggedIn,{ registeredCourses: updatedRegister});
  const temp = await CourseResult.findById(Id);
    temp.registered = temp.registered -1
    temp.save()
  }catch(error) {
    console.log(error);
  }
  res.redirect("/mycourses");
};

const finishCourse = async(req,res) =>{
  if (session.getSession().loggedIn == undefined) {
    res.redirect("/user/login");
    return;
  }
  const cousreid = req.params.id;
  try{
    const userID = session.getSession().loggedIn;
    const user = await User.findById(userID);

    const finishedCourses = user.finishedCourses ?? [];
   
    if (finishedCourses.indexOf(cousreid) === -1) {
      finishedCourses.push(cousreid);
    }    
    user.finishedCourses= finishedCourses
    user.save()
    const course = await Course.findById(cousreid);
    course.registered=true
    course.finished = true
    const temp = await CourseResult.findById(cousreid);
    temp.finished = temp.finished +1
    temp.save()
    res.render("../views/course.ejs", { course: course });

  }catch(error) {
    console.log(error);
  }
}

module.exports = { index, course, myCourses, register,removeCourse,finishCourse };
