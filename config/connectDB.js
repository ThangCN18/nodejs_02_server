const mongoose = require("mongoose")

const connect = async () =>{
    try {
        await mongoose.connect(process.env.URL_MONGODB)
        console.log("Connect MongoDB Success")
    } catch (error) {
        console.log("Connect MongoDB Fail")
        console.log(error)
    }
}
module.exports = { connect }