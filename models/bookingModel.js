const mongoose = require("mongoose")
const Users = require("./userModel")
const TourTrips = require("./tourTripModel")

const bookingSchema = mongoose.Schema({
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: Users
    },
    id_tourtrip: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: TourTrips
    },
    amount_adults:{
        type: Number,
        required: true,
        min: 1,
        default: 1
    },
    amount_children:{
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
},
{
    timestamps: true
})

module.exports = mongoose.model("Bookings", bookingSchema)