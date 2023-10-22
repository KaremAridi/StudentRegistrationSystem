const mongoose = require("mongoose");

const {Schema} = mongoose;

const UserSchema = new Schema({
    userName: String,
    password: String,
    registeredCourses:{type: [mongoose.Types.ObjectId], default: []},
});

const User = mongoose.model("user",UserSchema);
module.exports = User;