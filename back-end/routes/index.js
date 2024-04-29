const express = require("express")
import { userRouter } from "./user"
import { accountRouter } from "./account"
const app = express();

const router = new express.Router();

app.use("/user",userRouter);

app.use("/account",accountRouter)

module.exports={
    router
}