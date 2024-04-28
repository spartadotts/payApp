const { request } = require("express");
const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://kmax1:keshaviscool06@cluster1.51eaeh2.mongodb.net/payApp");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        maxLength: 50,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        minLength: 3
    },
    password:{
        type: String,
        required:true,
        minLength:8 
    },
    firstname:{
        type: String,
        required: true,
        trim: true,
        maxLength:50
    },
    lastname:{
        type: String,
        required: true,
        trim: true,
        maxLength:50
    }

});

const User = mongoose.model("User",UserSchema);

module.exports = {
    User
}