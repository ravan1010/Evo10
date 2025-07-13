const mongoose = require('mongoose');

const imageSchema =  mongoose.Schema({
   
    image: { type: [String], required: true },
    link:{
        type: String
    }
},{timestamps: true})

module.exports = new mongoose.model("image", imageSchema)