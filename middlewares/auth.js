const jwt = require("jsonwebtoken")


const authStaffAndAdmin = async (req, res, next) =>{
    const token = req.headers.token.split(" ")[1]
    if(!token){
        return res.status(403).json({message: "Pleace Login"})
    }else{
        try {
            const user = jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
            if(user.level !== "customer"){
                next()
            }else{
                return res.status(401).json({message: "You do not have this right"});
            }
        } catch (error) {
            return res.status(401).json({message: "Invalid Token"});
        }
    }
} 

const authUserAndAdmin = async (req, res, next) =>{
    const token = req.headers.token.split(" ")[1]
    if(!token){
        return res.status(403).json({message: "Pleace Login"})
    }else{
        try {
            const user = jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
            if(user.level === "admin" || user._id === req.params.id_user){
                next()
            }else{
                return res.status(401).json({message: "You do not have this right"});
            }
        } catch (error) {
            return res.status(401).json({message: "Invalid Token"});
        }
    }
}

const authAdmin = async (req, res, next) =>{
    const token = req.headers.token.split(" ")[1]
    if(!token){
        return res.status(403).json({message: "Pleace Login"})
    }else{
        try {
            const user = jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
            if(user.level === "admin"){
                next()
            }else{
                return res.status(401).json({message: "You do not have this right"});
            }
        } catch (error) {
            return res.status(401).json({message: "Invalid Token"});
        }
    }
}

module.exports = {
    authAdmin,
    authStaffAndAdmin,
    authUserAndAdmin
}