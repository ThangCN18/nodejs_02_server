const mongoose = require("mongoose")
const Tours = require("./tourModel")

const tourTripSchema = mongoose.Schema({
    departureday: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    promotion:{
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },
    tour: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Tours
    }
})

module.exports = mongoose.model("TourTrips", tourTripSchema)