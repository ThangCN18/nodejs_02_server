const express = require("express")
const Router = express.Router()
const {authStaffAndAdmin} = require("../middlewares/auth")
const {
    createTourTrip,
    deleteTourTripById,
    getTourTripsById,
    getTourTripsByIdTour,
    updateTourTripById
} = require("../controllers/tourTripController")

Router.post("/:id_tour", authStaffAndAdmin, createTourTrip)
      .get("/:id_tourtrip", getTourTripsById)
      .get("/:id_tour", getTourTripsByIdTour)
      .patch("/:id_tourtrip", authStaffAndAdmin, updateTourTripById)
      .delete("/:id_tourtrip", authStaffAndAdmin, deleteTourTripById)

module.exports = Router