const mongoose = require('mongoose')

const URL = "mongodb://localhost:27017/Evo10"


const dbconnection = async () => {

    try {
    await mongoose.connect(URL);
    console.log("database connected successfully");  
    } catch (error) {
        console.error("database not connect");
        process.exit(0)
    }
}

module.exports = dbconnection;