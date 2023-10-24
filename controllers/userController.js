const User = require("../models/User");
const bcrypt = require("bcrypt");
const session= require("../session");
const saltRounds = 8;

const login =  (_,res) => {
    res.render("../views/login.ejs",{loggedIn: session.getSession().loggedIn});
};
const signin = (_,res) => {
    res.render("../views/signin.ejs", {loggedIn: session.getSession().loggedIn});
};

const createUser = async (req,res) => {
    const extractedData = req.body;
    if(extractedData.password != extractedData.password2){
        console.log("Passwords Not Matching");
        res.redirect("/user/signin");
        return;
    }
    const userToInsert = new User({
        userName: extractedData.userName,
        password: extractedData.password,
        admin:false
    });
    bcrypt.hash(req.body.password, saltRounds, (err, hashedPass) => {
        if(err) {
            console.log("error in hashing. ERR"+err);
            return;
        }
        userToInsert.password = hashedPass;
        userToInsert.save()
                    .then( () => {
                        console.log("successful insertion");
                        res.redirect("/user/login");
                    }).catch(err => {
                        res.redirect("/user/signin");
                        console.log("An error occured during signing up");
                    });
                });
};

const authenticatUser = async (req,res) => {
   const credentialsInfo = req.body;
   try{
   const isAccountValid = await User.findOne({ userName: credentialsInfo.userName},'userName password');
   if(isAccountValid) {
    const pass = isAccountValid.password;
    bcrypt.compare(credentialsInfo.password,pass,(err,result) => {
        if(err) {
            console.log(err);
            return;
        }
        if(result) {
            req.session.loggedIn = isAccountValid._id;
            session.setSession(req.session);
            console.log("password correct");
            res.redirect("/");
        }else{
            console.log("password incorrect");
            res.redirect("/user/login");
        }
    })
   }else {
       res.redirect("/user/login");
       console.log("the username is incorrect");
   }
}catch(err) {
       console.log("an error has occured. ERR:" + err);
}
};

const signout = (req,res) => {
    req.session.loggedIn = undefined;
    session.setSession(req.session);
    res.redirect("/user/login");
}
module.exports = {login, signin, createUser, authenticatUser, signout};