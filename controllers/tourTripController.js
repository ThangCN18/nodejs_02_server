const TourTrips = require("../models/tourTripModel")
const Tours = require("../models/tourModel")

const createTourTrip = async (req, res)=>{
    const tourTrip = new TourTrips({
        departureday: req.body.departureday,
        amount: req.body.amount,
        promotion: req.body.promotion,
        tour: req.params.id_tour
    })
    await tourTrip.save().then(result =>{
        if(result){
            res.status(200).json({tourTrip: tourTrip})
        }else{
            res.status(404).json({message: "Create Tour Trip Fail"})
        }
    })
}

const updateTourTripById = async (req, res) =>{
    const tourTrip = await TourTrips.findById(req.params.id_tourtrip)
    tourTrip.departureday = req.body.departureday? req.body.departureday: tourTrip.departureday
    tourTrip.amount = req.body.amount? req.body.amount: tourTrip.amount
    tourTrip.promotion = req.body.promotion? req.body.promotion: tourTrip.promotion

    await tourTrip.save().then(result =>{
        if(result){
            res.status(200).json({tourTrip: tourTrip})
        }else{
            res.status(404).json({message: "Update Tour Trip Fail"})
        }
    })
}

const deleteTourTripById = async (req, res) =>{
    const tourTrip = await TourTrips.findByIdAndDelete(req.params.id_tourtrip)
        if(tourTrip){
            res.status(200).json({message: "Delete Tour Trip Success"})
        }else{
            res.status(404).json({message: "Delete Tour Trip Fail"})
        }

}

const getTourTripsByIdTour = async(req, res)=>{
    const tourTrips = await TourTrips.find({tour: req.params.id_tour})
    if(tourTrips){
        res.status(200).json({tourTrips: tourTrips})
    }else{
        res.status(404).json({message: "Not Found this tour trip"})
    }
}


const getTourTripsById = async(req, res)=>{
    const tourTrip = await TourTrips.findById(req.params.id_tourtrip)
    if(tourTrip){
        res.status(200).json({tourTrip: tourTrip})
    }else{
        res.status(404).json({message: "Not Found this tour trip"})
    }
}

module.exports = {
    createTourTrip,
    getTourTripsById,
    deleteTourTripById,
    getTourTripsByIdTour,
    updateTourTripById
}