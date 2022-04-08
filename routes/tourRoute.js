const express = require("express")
const Router = express.Router()
const {
    createTour,
    deleteTourById,
    getAllTour,
    getTourById,
    updateTourById
} = require("../controllers/tourController")
const {authStaffAndAdmin} = require("../middlewares/auth")
const uploadImage = require("../config/upload")


Router.post("/", authStaffAndAdmin, uploadImage.single("fileimage"), createTour)
      .get("/:id_tour", getTourById)
      .patch("/:id_tour", authStaffAndAdmin, uploadImage.single("fileimage"), updateTourById)
      .delete("/:id_tour", authStaffAndAdmin, deleteTourById)
      .get("/", getAllTour)

module.exports = Router