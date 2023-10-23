const express = require("express");
const router = express.Router();
const UserController = require('../controllers/userController');


router.get("/",(_,res) => {
    res.redirect("/user/login");
});

router.get("/signup", UserController.signUp);

router.get("/login",UserController.login);

router.post("/create",UserController.createUser);

router.post("/authenticate", UserController.authenticatUser);

router.get('/signout',UserController.signout);

module.exports = router;