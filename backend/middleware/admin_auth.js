const jwt = require('jsonwebtoken')
require('dotenv').config()



const admingu = async (req, res, next) => {
    const token = req.cookies.amogu
    
    if(!token){
        return res.json({msg : "cookie not in broswer"})
    }
    try {
        const decoded = jwt.verify(token, process.env.ADMINJWTOTPKEY)
        req.admingu = decoded
        next()
    
        
    } catch (error) {
        res.json("soming wrong")
    }
}

const adminif = async (req, res, next) => {
    const token = req.cookies.amif
    
    if(!token){
        return res.json({msg : "cookie not in broswer"})
    }
    try {
        const decoded = jwt.verify(token, process.env.ADMINJWTOTPKEY)
        req.adminif = decoded
        next()
    
        
    } catch (error) {
        res.json("soming wrong")
    }
}

const admintoa = async (req, res, next) => {
    const token = req.cookies.toa
    
    if(!token){
        return res.json({msg : "cookie not in broswer"})
    }
    try {
        const decoded = jwt.verify(token, process.env.ADMINJWTOTPKEY)
        req.admintoa = decoded
        next()
    
        
    } catch (error) {
        res.json("soming wrong")
    }
}

//admin categorys
const admincat = async (req, res, next) => {
    const token = req.cookies.cat

    if(!token){
        return res.json({msg : "cookie not in broswer"})
    }

    try {
        
        const decoded = jwt.verify(token, process.env.ADMINJWTOTPKEY)
        req.cat = decoded
        next()
    
        
    } catch (error) {
        res.json("soming wrong")
    }
    
}



module.exports = {admingu, adminif, admintoa, admincat}