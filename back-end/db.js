const { request } = require("express");
const mongoose = require("mongoose")

const url = process.env.conn_url;
mongoose.connect(url);

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