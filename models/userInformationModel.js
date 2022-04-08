const mongoose = require("mongoose")

const userInformationSchema = mongoose.Schema({
    address: {
        type: String,
        required: true,
        trim: true
    },
    CCCD: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    urlimage: {
        type: String,
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model("UserInformations", userInformationSchema)