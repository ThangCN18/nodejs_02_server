const UserInformations = require("../models/userInformationModel")
const Users = require("../models/userModel")


const addUserInformation = async (req, res)=>{
    const newUserInformation = new UserInformations({
        address: req.body.address,
        CCCD: req.body.CCCD,
        gender: req.body.gender,
        age: req.body.age,
        urlimage: req.file.filename?"http://localhost:8000/public/"+req.file.filename:""
    })
    const userInformation = await newUserInformation.save()
    if(userInformation){
        const user = await Users.findById(req.params.id_user)
        user.information = userInformation._id
        user.save()
        res.status(200).json({message: "Add User Information Success"})

    }else{
        res.status(404).json({message: "Add User Information Fail"})
    }
}

const updateUserInformation = async (req, res)=>{
    const user = await Users.findById(req.params.id_user)
    const userInformation = await UserInformations.findById(user.information)
    userInformation.address = req.body.address ? req.body.address: userInformation.address
    userInformation.CCCD = req.body.CCCD ? req.body.CCCD: userInformation.CCCD
    userInformation.gender = req.body.gender ? req.body.gender: userInformation.gender
    userInformation.age = req.body.age ? req.body.age: userInformation.age
    if(req.file.filename){
        userInformation.urlimage="http://localhost:8000/public/"+req.file.filename
    }
    
    await userInformation.save().then(result => {
        if(result){
            res.status(200).json({message: "Update User Information Success"}) 
        }else{
            res.status(404).json({message: "Update User Information Fail"})
        }
    })
    
}

module.exports = {
    addUserInformation, 
    updateUserInformation
}