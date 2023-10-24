const express = require('express');
const session = require("express-session");
var bodyParser = require('body-parser')
const path = require('path');

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://karem:1oYPZ9ksKDBed6k9@studentregistration.kz3uftj.mongodb.net/StudentRegistration")
    .then(() => {
        console.log("connected to the db.");

    }).catch(err => {
        console.log("error in connecting. ERR: " + err);
});


const homeRouter = require("./routes/home");
const courseRouter = require("./routes/course");
const mycoursesRouter = require("./routes/mycourses");
const userRouter = require("./routes/user");
const registerRouter = require("./routes/register");

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views','views');
app.use(express.static('public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true, maxAge: 60000 } 
}));


app.use("/",homeRouter);
app.use("/register",registerRouter);
app.use("/course",courseRouter);
app.use("/mycourses",mycoursesRouter);
app.use("/user",userRouter);


app.use((_, res) => {
  const absolutePath = path.join(__dirname, '/frontend/html/404page.html');
  res.status(404).sendFile(absolutePath);
});



app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

