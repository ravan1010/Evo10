const admin_model = require('../model/admin_model.js')
const post_model = require('../model/event_post_model.js')
const usermodel = require('../model/user_model.js')
const book_model = require('../model/book_model.js')
const address_model = require('../model/address_model.js')
const nodemailer = require("nodemailer");

require('dotenv').config()


const home = async(req, res, next) => {
    try {
        const category = req.query.category || "";
        const productdata = await post_model.find({Eventcategory:category})

        if(productdata.length === 0){
            const productdata1 = await post_model.find({category: category})
            // console.log(productdata1)
            res.json({post: productdata1})
        }else{
            // console.log(productdata)
            res.json({post: productdata})
        }
       

    } catch (error) {
        
    }
}

const search = async(req, res) => {
    try {
        
         const q = req.query.q?.trim();
         console.log(q)
         const products = await post_model.find({
              $or: [
                { companyName :{ $regex: q, $options: "i" }},
                { cityTown :{ $regex: q, $options: "i" }},
                { name:{ $regex: q, $options: "i" }},
                { Eventcategory:{ $regex: q, $options: "i"  }} // case-insensitive search
              ]
         });
         console.log(products.length );
         res.json(products);
     
    } catch (error) {
        
    }
}

const searchResult = async(req, res) => {
    try {
        const name = req.query.name?.trim();
         console.log(name,'name')
         const productsbyname = await post_model.find({
              $or: [
                { companyName :{ $regex: name, $options: "i" }},
                { cityTown :{ $regex: name, $options: "i" }},
                { name:{ $regex: name, $options: "i" }},
                { Eventcategory:{ $regex: name, $options: "i"  }} // case-insensitive search
              ]
         });
        //  console.log(productsbyname);
         res.json({post: productsbyname});
        
     
    } catch (error) {
        
    }
}

const eventpostbyid = async (req, res, next) => {
      const id = req.query.id || "";
    //   const number = req.Atoken.number

    try {
         const eventpost = await post_model.findOne( {_id:id});
        //  const userId = await usermodel.findOne({number: number})

         const calculateDiscountPercentage = (originalPrice, salePrice) => {
            if (originalPrice <= 0) return 0;
            const discount = ((originalPrice - salePrice) / originalPrice) * 100;
            return Math.round(discount); // Rounded to nearest integer
         };

            const originalPrice = eventpost.compareprice;
            const withplatformfee = eventpost.price / 10
            const salePrice = eventpost.price + withplatformfee
            const discount = calculateDiscountPercentage(originalPrice, salePrice);
            const platfee = 10

            // console.log(discount, originalPrice, salePrice, withplatformfee)

         res.status(200).json({post: eventpost, 
                            //    userId: userId._id, 
                               discount: discount,
                               price: salePrice,
                               platfee: platfee,
                               compare: originalPrice,
                            });
    } catch (error) {
        res.status(404).json(error)
    }
} 

const eventpostdataforbook = async (req, res, next) => {
      const id = req.query.id || "";
      const number = req.Atoken.number

    try {
         const eventpost = await post_model.findOne( {_id:id});
         const userId = await usermodel.findOne({number: number})

         const calculateDiscountPercentage = (originalPrice, salePrice) => {
            if (originalPrice <= 0) return 0;
            const discount = ((originalPrice - salePrice) / originalPrice) * 100;
            return Math.round(discount); // Rounded to nearest integer
         };

            const originalPrice = eventpost.compareprice;
            const withplatformfee = eventpost.price / 10
            const salePrice = eventpost.price + withplatformfee
            const discount = calculateDiscountPercentage(originalPrice, salePrice);
            const platfee = 10

            // console.log(discount, originalPrice, salePrice, withplatformfee)

         res.status(200).json({post: eventpost, 
                               userId: userId._id, 
                               discount: discount,
                               price: salePrice,
                               platfee: platfee,
                               compare: originalPrice,
                            });
    } catch (error) {
        res.status(404).json(error)
    }
} 

const eventAvailabledates = async (req, res, next) => {
        const id = req.query.id
        // const number = req.Atoken.number
       
    try {
        //post owner id
        const eventpost = await post_model.findOne( {_id:id})
        const user = await admin_model.findById({_id: eventpost.author})

        //account awner id
        // const userId = await usermodel.findOne({number: number})
        //account address
        // const address = await address_model.find({authorID:userId._id})

        console.log(eventpost.category ,id)
        if(eventpost){
            res.status(200).json({
                                  day: user.opendates, 
                                //   address: address, 
                                //   category: eventpost.category ,
                                })
        }else{
            res.status(200).json({
                day: user.opendates, 
                                //   address: address,
                                })
        }

    } catch (error) {
        res.json(error)
    }

}

const eventAvailabledatesandcategory = async (req, res, next) => {
        const id = req.query.id
        const number = req.Atoken.number
       
    try {
        //post owner id
        const eventpost = await post_model.findOne( {_id:id})
        const user = await admin_model.findById({_id: eventpost.author})

        // account awner id
        const userId = await usermodel.findOne({number: number})
        // account address
        const address = await address_model.find({authorID:userId._id})

        console.log(eventpost.category ,id)
        if(eventpost){
            res.status(200).json({
                                  day: user.opendates, 
                                  address: address, 
                                  category: eventpost.category ,
                                })
        }else{
            res.status(200).json({
                                  day: user.opendates, 
                                  address: address,
                                })
        }

    } catch (error) {
        res.json(error)
    }

}

const address = async (req, res, next) => {

    const number = req.Atoken.number 
    try {
        const user = await usermodel.findOne({number: number})
        const address = await address_model.find({ authorID: user._id})
        console.log(address,'suhas')
        res.json({address: address})

    } catch (error) {
        
    }
}

const transporter = nodemailer.createTransport({

    service: 'gmail',
    port: 587,
    starttls: {
        enable: true
    },
    secureConnection: true,
    auth: {
      user: 'ravanten3@gmail.com',
      pass: process.env.emailpass
    }
  });

const booking = async(req, res, next) => {

    const {date, time, saveAddress, mobileNo} = req.body
    const number = req.Atoken.number
    const id = req.query.id

    try {

        //post id
        const landmark = await post_model.findById(id)
        //admin id
        const admin = await admin_model.findById({_id: landmark.author})
        //user id
        const userId = await usermodel.findOne({number: number})

        console.log(landmark.category, userId.number, admin)
        if(landmark.category === "adminlandmark"){
            const book = await book_model.create({
                userId: userId._id,
                username: userId.number,
                event: id,
                time: time,
                date: date,
                mobileNo: mobileNo,
                paymentMethod: "on hand"
            })
            //booked id
            await book.save()
            // console.log(book._id)
            res.status(200).json({id: book._id})
            const mailOptions = {

            from: "ravanten3@gmail.com",
            to: "suhasnayaj@gmail.com",
            subject: "User, admin and booking details",
            text: `user details : ${userId} - booking details : ${book} -
                    admin details : ${admin} - event post details : ${landmark}  ` 
            };

            transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Email error:", error);
            } else {
                console.log("Email sent: " + info.response);
            } 
            });

        }else if(landmark.category === "clientslandmark"){
            const book = await book_model.create({
                userId: userId._id,
                username: userId.number,
                event: id,
                address: saveAddress,
                time: time,
                date: date,
                mobileNo: mobileNo,
                paymentMethod: "on hand"

            })
            await book.save()
            // console.log(book._id)
            res.status(200).json({id: book._id})
            const mailOptions = {

            from: "ravanten3@gmail.com",
            to: "suhasnayaj@gmail.com",
            subject: "User, admin and booking details",
            text: `user details : ${userId} - booking details : ${book} -
                    admin details : ${admin} - event post details : ${landmark}  ` 
            };

            transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Email error:", error);
            } else {
                console.log("Email sent: " + info.response);
            } 
            });

        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const success = async(req, res, next) => {
    const id = req.query.id

    try {
        const success = await book_model.findById({_id: id})
        const eventimage = await post_model.findById({_id: success.event})

        res.json({image: eventimage.image[0], name: eventimage.name})
    } catch (error) {
        res.json(error)
    }
}

const booked = async(req, res) => {
    const number = req.Atoken.number
    try {

        const userid = await usermodel.findOne({number: number})
        const booked = await book_model.find({ userId: userid })

        const eventIds = booked.map((b) => b.event); 

        const posts = await post_model.find({ _id: { $in: eventIds } });

        res.json({booked: booked, post: posts})
    } catch (error) {
        res.json(error);
    }
}


const setting = async (req, res, next) => {
    
    const number = req.Atoken.number
    // const number = req.admintoa.adminNumber

    try {
        const name = await usermodel.findOne({ number : number })
        console.log(name.number)
        res.json({number: name.number})
    } catch (error) {
        res.json(error)
    }
}
////

const addtoCart = async(req, res, next) => {
    try {
        const number = req.Atoken.number
        const {productId} = req.body;
        const user = await usermodel.findOne({number: number})

        if(user){
            user.cartItem.push(productId)
            await user.save()
        }
    } catch (error) {
        
    }
}

const productQuaryname = async(req, res, next) => {

    try {
        const name = req.query.name?.trim(); // ?search=phone
        // const street = req.query.street;     // ?page=2
        console.log(name)
        
        if(!data){
            return res.status(404).json({message:"category not found"})
        }
        console.log(data)
        res.json(data)

    } catch (error) {
        
    }
}

module.exports = {productQuaryname, 
                  home, 
                  search, 
                  searchResult, 
                  addtoCart, 
                  eventpostbyid,
                  eventAvailabledates,
                  booking,
                  setting,
                  address,
                  success,
                  booked,
                  eventpostdataforbook,
                  eventAvailabledatesandcategory,
                }



