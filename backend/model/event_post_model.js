const mongoose = require('mongoose');
// const image_model = require('./image_model');

const postSchema = new mongoose.Schema({

    author : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true
  },
    name:{
        type:String,
        require:true,
        default:"event",
    },
    category: {
        type: String,
    },
    Eventcategory:{
        type: String
    },
    description:{
        type:String,
        require:true,
    },
    cityTown:{
        type:String,
    },
    Landmark:{
        type:String,
    },

    image:[String],

    companyName:{
        type: String,
    },
    
    price:{
        type:Number,
        min:0,
        require:true,
    },

   compareprice:{
    type: String,
    require: true,
   },

    platformFee:{
        type:Number,
        require:true
    },

    discount:{
        type:Number,
        require:true
    },
  
    totalPrice:{
        type:Number,
        require:true,
    },

    rate:{
        type:Number,
        require:true,
    },

},{timestamps: true})


module.exports = new mongoose.model("posts", postSchema);

