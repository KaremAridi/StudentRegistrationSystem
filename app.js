const express = require('express');
const homeRouter = require("./routes/home");


const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/Louvre")
    .then(() => {
        console.log("connected to the db.");
    }).catch(err => {
        console.log("error in connecting. ERR: " + err);
    });


const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views','views');
app.use(express.static('public'));


app.use("/",homeRouter);


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

