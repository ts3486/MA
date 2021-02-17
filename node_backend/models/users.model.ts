export{}
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true, unique: true, minlength: 3, trim: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 5},
    description: {type: String},
    filename: {type: String}
},

{timestamps: true,})

const User = mongoose.model("User", userSchema);

module.exports = User
