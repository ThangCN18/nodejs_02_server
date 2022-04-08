const Tours = require("../models/tourModel")

const createTour = async(req, res)=>{
    const newTour = new Tours({
        nametour: req.body.nametour,
        description: req.body.description,
        duration: req.body.duration,
        schedule: req.body.schedule,
        departure: req.body.departure,
        destination: req.body.destination,
        category: req.body.category,
        priceforadults: req.body.priceforadults,
        priceforchildren: req.body.priceforchildren,
        urlimage: "http://localhost:8000/public/"+req.file.filename
    })
    await newTour.save().then((result)=>{
        if(result){
            res.status(200).json({tour: result})
        }else{
            res.status(404).json({message: "Create New Tour Fail"})
        }
    })
}

const updateTourById = async(req, res)=>{
    const tour = await Tours.findById(req.params.id_tour)
        tour.nametour = req.body.nametour? req.body.nametour: tour.nametour
        tour.description = req.body.description? req.body.description: tour.description
        tour.duration = req.body.duration? req.body.duration: tour.duration
        tour.schedule = req.body.schedule? req.body.schedule: tour.schedule
        tour.departure = req.body.departure? req.body.departure: tour.departure
        tour.destination = req.body.destination? req.body.destination: tour.destination
        tour.category = req.body.category? req.body.category: tour.category
        tour.priceforadults = req.body.priceforadults? req.body.priceforadults: tour.priceforadults
        tour.priceforchildren = req.body.priceforchildren? req.body.priceforchildren: tour.priceforchildren

        tour.urlimage = req.file.filename?"http://localhost:8000/public/"+req.file.filename:tour.urlimage

    await tour.save().then((result)=>{
        if(result){
            res.status(200).json({tour: result})
        }else{
            res.status(404).json({message: "Update Tour Fail"})
        }
    })
}

const deleteTourById = async(req, res)=>{
    await Tours.findByIdAndDelete(req.params.id_tour).then((result)=>{
        if(result){
            res.status(200).json({message: "Delete Tour Success"})
        }else{
            res.status(404).json({message: "Delete Tour Fail"})
        }
    })
}

const getTourById = async (req, res) =>{
    const tour = await Tours.findById(req.params.id_tour)
    if(tour){
        res.status(200).json({tour: tour})
    }else{
        res.status(404).json({message: "Not found this tour"})
    }
}

const getAllTour = async (req, res) =>{
    const tours = await Tours.find()
    if(tours){
        res.status(200).json({tours: tours})
    }else{
        res.status(404).json({message: "Not found this tours"})
    }
}

module.exports = {
    createTour,
    deleteTourById,
    updateTourById,
    getAllTour,
    getTourById
}

