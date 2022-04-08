const mongoose = require("mongoose")
const UserInformations = require("./userInformationModel")

const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    information: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserInformations
    },
    level: {
        type: String,
        enum: ["customer", "staff", "admin"],
        default: "customer"
    },

},
{
    timestamps: true
}
)

module.exports = mongoose.model("Users", userSchema)