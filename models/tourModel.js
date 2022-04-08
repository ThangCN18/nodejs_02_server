const mongoose = require("mongoose")

const tourSchema = mongoose.Schema({
    nametour: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    schedule: {
        type: Array,
        required: true
    },
    departure: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    priceforadults: {
        type: Number,
        required: true
    },
    priceforchildren: {
        type: Number,
        required: true
    },
    urlimage: {
        type: String,
        required: true
    }

},
{
    timestamps: true
})

module.exports = mongoose.model("Tours", tourSchema)