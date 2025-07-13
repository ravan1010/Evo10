const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const UserSchema =  mongoose.Schema({
   
    number:{
        type: String,
        require: true,
        },

    // email:{
    //     type: String,
    //     require: true,
    // },

    password:{
        type: String,
        require: true,
    },
    
    addressID:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address',
    }],
    CorT:{
        type: String
    },
    booked: [{
        event:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'posts'
        },
 }],
        // eventBooking: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'User',
        // },

    review : {
        user_id : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        comment : {
            type: String,
            default: " ",
        },
        date : {
            type : Date,
            default : Date.now
        }
    },
    role:{
        type: String,
        enum: ['admin','user'],
        default:"user",
    },
    adminID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
   
    resetPasswordToken: String,
    resetPasswordExpareAt: Date,
    verificationToken: String,
    verificationTokenExpareAt: Date,

},{timestamps : true})

// UserSchema.pre()

 UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
})

//user password compare 
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};



module.exports = new mongoose.model("user", UserSchema);

