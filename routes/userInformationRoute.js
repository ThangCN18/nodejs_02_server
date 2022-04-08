const express = require("express")
const {addUserInformation, updateUserInformation} = require("../controllers/userInformationController")
const {
      authUserAndAdmin
} = require("../middlewares/auth")
const uploadImage = require("../config/upload")

const Router = express.Router()

Router.post("/add/:id_user", authUserAndAdmin, uploadImage.single("fileImage"), addUserInformation)
      .post("/update/:id_user", authUserAndAdmin, uploadImage.single("fileImage"), updateUserInformation)

module.exports = Router