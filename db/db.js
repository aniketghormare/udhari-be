const mongoose = require("mongoose")


const connection = mongoose.connect("mongodb+srv://aniket:ghormare@cluster0.qr4dpak.mongodb.net/udhari").then((res) => {
    console.log("Database connected")
}).catch((err) => {
    console.log(err)
})


module.exports = connection