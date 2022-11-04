const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:String,
    email:String
})

exports.userModel = new mongoose.model("User",userSchema);
exports.userSchema = userSchema