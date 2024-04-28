const express = require("express")
import { userRouter } from "./user"
const app = express();

const router = new express.Router();

app.use("/user",userRouter)

module.exports={
    router
}