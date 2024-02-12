// connected to database
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://amit917480:ahpncfZrYSFHdrff@cluster0.y1ccky3.mongodb.net/subcribe');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error in connecting db"));

db.once('open', function(){
    console.log("Connected to database:: Mongodb")
});

module.exports = db;