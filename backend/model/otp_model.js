const mongoose = require('mongoose');

const otpSchema =  mongoose.Schema({
    email:{
        type: String,
        require: true,
        },
    MOBnumber:{
            type: Number,
            require: true
        },
    password : {
        type : String,
        require: true,
        },
    otp:{
        type: Number,
        require: true
    },
    resetotp :{
        type: Number,
        require: true,
    },
    createdAt :{
        type: Date,
        default: Date.now,
        expires: 60
    }

})

module.exports = new mongoose.model("otp", otpSchema)