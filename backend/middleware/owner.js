const jwt = require('jsonwebtoken')
require('dotenv').config()


const ownertoken = async (req, res, next) => {
    const token = req.cookies.owner
    
    if(!token){
        return res.status(400).json({message : "cookie not in broswer"})
    }

    try {

        const decoded = jwt.verify(token, process.env.ADMINJWTOTPKEY)
        req.owner = decoded
        next()
        

    } catch (error) {
        res.status(400).json("soming wrong")
    }
}

module.exports = {
                ownertoken
}