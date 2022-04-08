const express = require("express")
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const DB = require("./config/connectDB")
const Router = require("./routes")
const cors = require("cors")
const path = require("path")
dotenv.config()
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static(path.join(__dirname, "public")))


// connectDB
DB.connect()

Router(app)

const port = process.env.PORT
app.listen(port, ()=> console.log("Server is running port: ", port))