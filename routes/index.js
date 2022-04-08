const userRoute = require("./userRoute")
const userInformationRoute = require("./userInformationRoute")
const tourRoute = require("./tourRoute")
const tourTripRoute = require("./tourTripRoute")

const Router = (app)=>{
    app.use("/user", userRoute)
    app.use("/information", userInformationRoute)
    app.use("/tour", tourRoute)
    app.use("/tourtrip", tourTripRoute)
}

module.exports = Router