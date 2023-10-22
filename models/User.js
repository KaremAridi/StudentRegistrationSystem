const mongoose = require("mongoose");

const {Schema} = mongoose;

const UserSchema = new Schema({
    admin: Boolean,
    userName: String,
    password: String,
    registeredCourses:{type: [mongoose.Schema.Types.ObjectId], ref:'Course', default: []},
});

const User = mongoose.model("User",UserSchema);
module.exports = User;