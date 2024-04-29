const express = require("express");
const { Accounts } = require("../db");
const { authMiddleware } = require("../middleware");
const app = express();
const router = new express.Router();



router.get("/balance",authMiddleware, async (req,res)=>{
    const account = await Accounts.findOne({
        userid: req.userid
    })

    res.json({
        balance: account.balance
    })


});


router.post("/transfer", authMiddleware,async (req,res)=>{
    const session = await mongoose.startSession();

    session.startTransaction();
    const {amount,to} = req.body;

    const account =  await Accounts.findOne({userid:req.userid}).session(session);

    if(!account|| account.balance<amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const toAccount = await Accounts.findOne({userid:to}).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    //Perform the transaction

    await Accounts.updateOne({userid:req.userid},{$inc: {balance:-amount}}).session(session);
    await Accounts.updateOne({userid:to},{$inc:{balance:amount}}).session(session);

    await session.commitTransaction();
    res.json({
        message: "Transfer succesful"
    });
});

module.exports = {
    router
}