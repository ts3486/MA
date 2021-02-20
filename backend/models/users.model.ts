export{}
const mongoose = require("mongoose");
//mongoose is an Object Data Modeling (ODM) library, which makes MongoDB and node work more smoothly.
//Ex. Schema Validation is much simpler with mongoose.

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
