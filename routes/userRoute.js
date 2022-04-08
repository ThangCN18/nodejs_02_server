const express = require("express")
const {
    register, 
    login, 
    getAllUsers, 
    getUserById,
    loginWithAdminAndStaff,
    updateUserById,
    deleteUserById,
    addStaff,
    removeStaff
} = require("../controllers/userController")
const {
    authAdmin,
    authStaffAndAdmin,
    authUserAndAdmin
} = require("../middlewares/auth")

const Router = express.Router()

Router.post("/register", register)
      .post("/login", login)
      .post("/loginwithadminandstaff", loginWithAdminAndStaff)
      .get("/:id_user", authStaffAndAdmin, getUserById)
      .patch("/:id_user", authUserAndAdmin, updateUserById)
      .delete("/:id_user", authAdmin, deleteUserById)
      .patch("/addstaff/:id_user", authAdmin, addStaff)
      .patch("/removestaff/:id_user", authAdmin, removeStaff)
      .get("/", authStaffAndAdmin, getAllUsers)
module.exports = Router
