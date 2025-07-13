const mongoose = require('mongoose');

const adminotpSchema =  mongoose.Schema({

    otp:{
        type: Number,
        require: true
    },
   
    createdAt :{
        type: Date,
        default: Date.now,
        expires: 60
    }

})

module.exports = new mongoose.model("adminotp", adminotpSchema)