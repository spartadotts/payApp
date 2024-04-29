const express = require("express")
const zod = require("zod");
const router = express.Router();
const mongoose = require("mongoose");
const { User, Accounts } = require("../db");
const jwt  = require("jsonwebtoken");
const { jwt_secret } = require("../config");
const { authMiddleware } = require("../middleware");

const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string()
});

router.post("/signup", async (req,res)=>{
    const {sucess} = signupBody.safeParse(req.body)
    console.log(sucess)
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
//assigning random balance
    await Accounts.create({
        userid,
        balance: 1+Math.random()*1000
    })

    const token = jwt.sign({userid},jwt_secret);

    res.json({
        msg: "User created successfully",
        token: token
    })
});

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signin", async (req,res)=>{
    const success = signinBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            msg: 'Error in inputs'
        })
    }

    const user =  await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if(user){
        const token = jwt.sign({
            userid:user._id
        },jwt_secret)

        res.json({
            token: token
        })
        return
    }
})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional()
})

router.put("/",authMiddleware,async (req,res)=>{
    const {success} = updateBody.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            msg: "Error while updating"
        })
    }

    await User.updateOne({
        _id: req.userid
    },req.body)

    res.json({
        msg: "User updated successfully"
    })




})

router.get("/bulk", async (req,res)=>{
    const filter = req.query.filter || " ";

    const users = await User.find({
        $or:[{
            firstname:{
                "$regex":filter
            }
        },{
            lastname:{
                "$regex": filter
            }
        }]
    })


    res.json({
        user: users.map(user=>({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            id: user._id
        }))
    })
})

module.exports= router



