const uuid = require("uuid")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cd(null, "public/")
    },
    filename: function(req, file, cb){
        const newfilename = uuid.v4+"-"+file.originalname.split(" ").join("-")
        cd(null, newfilename)
    },
})

const uploadImage = multer({
    storage: storage
})

module.exports = uploadImage