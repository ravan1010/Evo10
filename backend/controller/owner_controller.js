const adminmodel = require('../model/admin_model.js')
const adminotpmodel = require('../model/admin_otp.js')
const otpGenerate = require('otp-generator')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");
const imagemodel = require('../model/image.js')

 
require('dotenv').config()


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

const ownersignup = async (req, res, next) => {

    const {number} = req.body;
    try { 

      // if(){
      //   return res.status(404).json('invalid name')
      // }
      
    const otp = otpGenerate.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false })

    const otpnumber = await adminotpmodel.create({ otp: otp})
    await otpnumber.save()

    const mailOptions = {
      from: "ravanten3@gmail.com",
      to: "suhasnayaj@gmail.com",
      subject: "Evo10 OTP Confirmation",
      text: `Your Evo10 OTP is here ${otp} to this number ${number} verify it` ,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email error:", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });


          res.status(201).json({message: "otp sent"})
        
    } catch(error) {
      res.status(401).json({error:error.message})
    }

}

const ownersignupOTPverify = async (req, res, next) => { 

          
          const {otp} = req.body

          const findotp = await adminotpmodel.findOne({ otp })

          if(findotp){

          const adminNumber = 'foundersuhascofoundersuhas'
          const token = jwt.sign({ adminNumber , iat: Math.floor(Date.now() / 1000) - 30 }
                 ,process.env.ADMINJWTOTPKEY , { expiresIn: '400d' });

          res.cookie('owner', token, {
              httpOnly: true,
              secure: true, // true in production
              sameSite: 'Strict',
              maxAge: 400 * 24 * 60 * 60 * 1000
            });
        }

        res.json({message: "verified"})

}  

const imageCreate = async (req, res, next) => {

try {
    const { image, link } = req.body
   
  // if(!image){
  //   return res.status(404).json({ message: "select images" })
  // }

  const imagedb = await imagemodel.create({  image: image, link : link})
  await imagedb.save()

  res.status(201).json({message: 'ok'})
 
} catch (error) {
  res.json(error)
  console.log(error)
}
  
}

const getdata = async (req, res, next) => {
  
  const data = await imagemodel.find()
  
  // const images = data.map(item => item.image);
    // Send the full array as JSON
  // console.log(images)
  res.json(data);

}

const imagedelete = async(req, res, next) => {

  const id = req.params.id
  try {
    const image = await imagemodel.findById(id);
    console.log(image)

    if(!image){
      return res.status(404).json({ message: "product not found" });
    }

    const deletedProduct = await imagemodel.findByIdAndDelete(id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });

  } catch (error) {
    res.status(500).json({message: "server error",error: error.message  })
  }


}


module.exports = {ownersignup,
    ownersignupOTPverify,
    imageCreate,
    getdata,
    imagedelete,
}