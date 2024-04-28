const express = require("express")
const router = new express.Router();
const app = express();
const zod = require("zod");
const mongoose = require("mongoose");
const { User } = require("../db");
const jwt  = require("jsonwebtoken");
const { jwt_secret } = require("../config");

const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string()
});

app.post("/signup", async (req,res)=>{
    const {sucess} = signupBody.safeParse(req.body);
    if(!sucess){
        return res.status(411).json({
            msg: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if(existingUser){
        return res.status(411).json({
            msg: "Email already taken"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname

    })

    const userid = user._id;

    const token = jwt.sign({userid},jwt_secret);

    res.json({
        msg: "User created successfully"
    })
});




module.exports={
    router
}



