const adminmodel = require('../model/admin_model.js')
const adminotpmodel = require('../model/admin_otp.js')
const post_model = require('../model/event_post_model.js')
const bookmodel = require('../model/book_model.js')
const otpGenerate = require('otp-generator')
const jwt = require('jsonwebtoken')
const usermodel = require('../model/user_model.js')
const nodemailer = require("nodemailer");

 
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

const adminsignup = async (req, res, next) => {

    const {number} = req.body;
    const num = req.Atoken.number

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
      text: `Your Evo10 OTP is here ${otp} verify it` ,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email error:", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

     const adminNumber = number
     const token = jwt.sign({ adminNumber , iat: Math.floor(Date.now() / 1000) - 30 }
         ,process.env.ADMINJWTOTPKEY , { expiresIn: '8m' });


      res.cookie("amogu", token, {
          httpOnly: true,
          secure: true,         // true in production with HTTPS
          sameSite: 'none',
          maxAge: 8 * 60 * 1000
          })  

          res.status(201).json({message: "otp sent"})
        
    } catch(error) {
      res.status(401).json({error:error.message})
    }

}

const adminsignupOTPverify = async (req, res, next) => { 

      const number = req.admingu.adminNumber
      console.log(number)

      try {

        const numExistinAdmin = await adminmodel.findOne({number})
        console.log(numExistinAdmin)

        if(numExistinAdmin){
          
          const {otp} = req.body
          console.log(otp)

          const findotp = await adminotpmodel.findOne({ otp })
          console.log(findotp)

          if(findotp){

          const adminNumber = number
          const token = jwt.sign({ adminNumber , iat: Math.floor(Date.now() / 1000) - 30 }
                 ,process.env.ADMINJWTOTPKEY , { expiresIn: '40d' });

          res.cookie('toa', token, {
              httpOnly: true,
              secure: true, // true in production
              sameSite: 'Strict',
              maxAge:  60 * 60 * 1000 * 1000
            });

            const categoryid = numExistinAdmin.category
            const categorytoken = jwt.sign({ categoryid , iat: Math.floor(Date.now() / 1000) - 30 }
                 ,process.env.ADMINJWTOTPKEY , { expiresIn: '40d' });

            res.cookie('cat', categorytoken, {
              httpOnly: true,
              secure: true, // true in production
              sameSite: 'Strict',
              maxAge: 60 * 60 * 1000 * 1000
            });
              await findotp.deleteOne({otp})
              res.clearCookie('amogu');

              res.status(201).json({message: "main", category: categoryid})

          }else{
            res.status(401).json({message: "invalid otp" })
          }

        }else if(!numExistinAdmin){

          const {otp} = req.body
          console.log(otp)

          const findotp = await adminotpmodel.findOne({ otp })
          console.log(findotp)

          if(findotp){
            
          const adminNumber = number
          const token = jwt.sign({ adminNumber , iat: Math.floor(Date.now() / 1000) - 30 }
                 ,process.env.ADMINJWTOTPKEY , { expiresIn: '5m' });

          res.cookie('amif', token, {
              httpOnly: true,
              secure: true, // true in production
              sameSite: 'none',
              maxAge: 5 * 60 * 1000
            });
              await findotp.deleteOne({otp})
              res.clearCookie('amogu');

              res.status(201).json({message: "otp verified"})

          }else{
            res.status(401).json({message:"invalid otp"})
          }
        }else{
          res.status(401).json({menubar:"sorry"})
        }    
      } catch (error) {
        res.status(401).json({message: error})
      }
}  

const admininfo = async (req, res, next) => {

        const number = req.adminif.adminNumber
        const { companyName, 
                category, 
                image,
                FHBCA, 
                ASSV, 
                Landmark, 
                pincode, 
                cityTown, 
                state, 
              } = req.body;
console.log("suhas")
      
  try{
      const admininfo = await adminmodel.create({
        number: number,
        companyName:companyName,
        category: category,
        image: image,
        address:{ FHBCA: FHBCA, 
                  ASSV: ASSV,
                  Landmark: Landmark,
                  pincode: pincode,
                  cityTown: cityTown,
                  state: state,
                }
      })

      await admininfo.save()

        const user = await usermodel.findOne({number})
        console.log(user)

        const adminNumber = number
        const token = jwt.sign({ adminNumber , iat: Math.floor(Date.now() / 1000) - 30 }
                 ,process.env.ADMINJWTOTPKEY , { expiresIn: '40d' });

          res.cookie('toa', token, {
              httpOnly: true,
              secure: true, // true in production
              sameSite: 'Strict',
              maxAge: 60 * 60 * 1000 * 1000
            });

            const categoryid = category
            const categorytoken = jwt.sign({ categoryid , iat: Math.floor(Date.now() / 1000) - 30 }
                 ,process.env.ADMINJWTOTPKEY , { expiresIn: '40d' });

            res.cookie('cat', categorytoken, {
              httpOnly: true,
              secure: true, // true in production
              sameSite: 'Strict',
              maxAge: 60 * 60 * 1000 * 1000
            });

            // console.log(user)
            user.role = "admin";
            user.adminID = admininfo._id;
            await user.save()

            res.clearCookie('amif');
            res.status(201).json({message:"ok",category: category})

        } catch (error) {
          res.json(error)
      }

}

const dateupdate = async (req, res, next) => {

  const number = req.admintoa.adminNumber
  const adminuser = await adminmodel.findOne({number})

  const { date } = req.body;

    adminuser.opendates = date; // directly assign array
    await adminuser.save();     // save the updated document

    res.status(200).json({category: adminuser.category})   

}

const getdates = async (req, res, next) => {
  const number = req.admintoa.adminNumber
  const adminuser = await adminmodel.findOne({number})
  res.status(200).json(adminuser.opendates)
}

//posts
const EVENTCreate = async (req, res, next) => {

try {

  const number = req.admintoa.adminNumber
  const adminuser = await adminmodel.findOne({number})

    console.log('Eventcategory')
  const {name, 
         price, 
         compareprice, 
         description, 
         image, 
         discount, 
         Eventcategory,
         Landmark,
        } = req.body

        const cityTown = adminuser.address.cityTown
        const companyName = adminuser.companyName
        console.log(cityTown)
   
  if(!image){
    return res.status(404).json({ message: "select images" })
  }

  const postData = await post_model.create({ author: adminuser._id,
                                             name:name,
                                             description: description,
                                             price:price,
                                             image: image,
                                             Eventcategory: Eventcategory,
                                             category: adminuser.category,
                                             Landmark: Landmark,
                                             cityTown: cityTown,
                                             discount: discount,
                                             compareprice : compareprice,
                                             companyName: companyName
                                            })
  await postData.save()

  if(postData){
    adminuser.posts.push(postData._id);
    await adminuser.save();
  }
  
  res.status(201).json({message:`post created`, id:`${postData._id}`})
 
} catch (error) {
  res.json(error)
}
  
}

const dashboard = async (req, res, next) => {
  try {
    const id = req.admintoa.adminNumber
    const author = await adminmodel.findOne({number:id})
    const post = await post_model.find({author: author._id})
    res.status(201).json({post:post, 
                          productlist: post.length,
                        })

  } catch (error) {
    
  }
}

const EVENTDelete = async (req, res, next) => {

  const number = req.admintoa.adminNumber
  const adminuser = await adminmodel.findOne({number})
  const id = req.params.id
  try {
    const product = await post_model.findById(id);
    console.log(product)
    if(!product){
      return res.status(404).json({ message: "product not found" });
    }

    if(adminuser){
      adminuser.posts.pull(id);
      await adminuser.save();
    }

     const deletedProduct = await post_model.findByIdAndDelete(id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });

  } catch (error) {
    res.status(500).json({message: "server error",error: error.message  })
  }

}

///getallAdminpost for dashboard

const getallAdminpost = async (req, res, next) => {
       console.log("suhas")

  try {
      const id = req.admintoa.adminNumber

      const author = await adminmodel.findOne({number:id})

      const post = await post_model.find({author: author._id})
      res.json(post)
    
  } catch (error) {
    res.json({error:error.message})
  }
}

const Toadmin = async (req, res, next) => {

  const number = req.admintoa.adminNumber

  try {
  
    const admin = await adminmodel.findOne({number: number})

    if(admin.category === "adminlandmark"){
      res.json(admin.category)
    }else if(admin.category === "clientslandmark"){
      res.json(admin.category)
    }
    
  } catch (error) {
    res.json(error)
  }
}

const bookedlisttoadmin = async(req, res) => {
    const number = req.admintoa.adminNumber

    try {

        const admin = await adminmodel.findOne({number : number})
        const adminpost = admin.posts
        
        const bookedlist = await bookmodel.find({event: adminpost})
        const postlist = await post_model.find({_id: adminpost})

        res.json({bookedlist: bookedlist, postlist: postlist})

    } catch (error) {
        res.json(error)
    }
}

    
module.exports = {adminsignup,
                  adminsignupOTPverify,
                  admininfo,
                  EVENTCreate,
                  dashboard,
                  EVENTDelete,
                  getallAdminpost,
                  dateupdate,
                  getdates,
                  Toadmin,
                  bookedlisttoadmin,

}
