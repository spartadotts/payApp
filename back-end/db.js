const { request } = require("express");
const mongoose = require("mongoose");
const { Schema, number } = require("zod");

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

const accountSchema = new mongoose.Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance:{
        type: number,
        required: true
    }
})

const Accounts = mongoose.model("Accounts",accountSchema);

module.exports = {
    User,
    Accounts
}