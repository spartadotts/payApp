const jwt = require("jsonwebtoken")
const jwt_secret = require("./config")

const authMiddleware = (req,res,next) =>{

    const authHeader = req.header.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({
            msg: "Authentication error"
        })
    }

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token,jwt_secret)

        req.userid = decoded.userid;
        next();
    } catch(err){

        return res.status(411).json({})

    }
};

module.exports = {
    authMiddleware
}