const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Users = require("../models/userModel")
const UserInformations = require("../models/userInformationModel")


const register = async (req, res) =>{
    const salt = 10
    const hash = await bcrypt.hash(req.body.password, salt)
    const newUser = new Users({
        email: req.body.email,
        fullname: req.body.fullname,
        password: hash,
        phone: req.body.phone
    })
    await newUser.save().then((result =>{
        if(result){
            const {password, ...other} = result._doc
            res.status(200).json({user: other})
        }else{
            res.status(404).json({message: "Register Fail"})
        }
    }))
}

const login = async (req, res) =>{
    const user = await Users.findOne({email: req.body.email}).populate("information")
    if(user){
        const checkPassword = await bcrypt.compare(req.body.password, user.password)
        if(checkPassword){
            const token = jwt.sign({
                id: user._id,
                email: user.email,
                password: user.password,
                level: user.level
            }, process.env.ACCESS_TOKEN_KEY, {expiresIn: "2h"})
            const {password, ...other} = user._doc
            res.status(200).json({user: other, token: token})
        }else{
            res.status(404).json({message: "Wrong Password"})
        }
    }else{
        res.status(404).json({message: "Wrong Email"})
    }
}

const getAllUsers = async (req, res)=>{
    const users = await Users.find().populate("information").select().select("-password")
    if(users){
        
        res.status(200).json({users: users})
    }else{
        res.status(404).json({message: "Not Fount User"})
    }
}

const getUserById = async (req, res)=>{
    const user = await Users.findById(req.params.id_user).populate("information")
    if(user){
        const {password, ...other} = user._doc
        res.status(200).json({user: other})
    }else{
        res.status(404).json({message: "Not Fount User"})
    }
}

const updateUserById = async (req, res)=>{
    const user = await Users.findById(req.params.id_user)
    user.email = req.body.email ? req.body.email: user.email
    user.fullname = req.body.fullname ? req.body.fullname: user.fullname
    user.phone = req.body.phone ? req.body.phone: user.phone
    
    if(req.body.password){
        const salt = 10
        const hash = await bcrypt.hash(req.body.password, salt)
        user.password = hash
    }

    await user.save().then(result => {
        if(result){
            res.status(200).json({message: "Update User Success"})
        }else{
            res.status(404).json({message: "Update User Fail"})
        }
    })

}
const deleteUserById = async (req, res)=>{
    await Users.findByIdAndDelete(req.params.id_user).then(result =>{
        if(result){
            async (result)=>{
                await UserInformations.findByIdAndDelete(result._id)
                res.status(200).json({message: "Delete User Success"})
            }
            
        }else{
            res.status(404).json({message: "Delete User Fail"})
        }
    })
    
}

const loginWithAdminAndStaff = async (req, res) =>{
    const user = await Users.findOne({email: req.body.email}).populate("information")
    if(user){
        const checkPassword = await bcrypt.compare(req.body.password, user.password)
        if(checkPassword){
            if(user.level === "Admin" || "Staff"){
                const token = jwt.sign({
                    id: user._id,
                    email: user.email,
                    password: user.password,
                    level: user.level
                }, process.env.ACCESS_TOKEN_KEY, {expiresIn: "2h"})
                const {password, ...other} = user._doc
                res.status(200).json({user: other, token: token})
            }else{
                res.status(404).json({message: "You can't login"})
            }
        }else{
            res.status(404).json({message: "Wrong Password"})
        }
    }else{
        res.status(404).json({message: "Wrong Email"})
    }
}

const addStaff = async (req, res) =>{
    const staff = await Users.findById(req.params.id_user)
    staff.level = "staff"
    await staff.save().then(result =>{
        if(result){
            res.status(200).json({message: "Add Staff Success"})
        }else{
            res.status(404).json({message: "Add Staff Fail"})
        }
    })
}
const removeStaff = async (req, res) =>{
    const staff = await Users.findById(req.params.id_user)
    staff.level = "customer"
    await staff.save().then(result =>{
        if(result){
            res.status(200).json({message: "Remove Staff Success"})
        }else{
            res.status(404).json({message: "Remove Staff Fail"})
        }
    })
}

module.exports = {
    register,
    login,
    getAllUsers,
    getUserById,
    loginWithAdminAndStaff,
    updateUserById,
    deleteUserById,
    addStaff,
    removeStaff
}