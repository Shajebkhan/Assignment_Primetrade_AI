const mongoose = require('mongoose');

const DB_URL = process.env.MONGO_URI;
const connectDB = async() => {
    try {
      await mongoose.connect(DB_URL)
       .then(()=>{
           console.log(`MongoDB Connected: ${conn.connection.host}`);
       })

    } catch (error) {
        console.log('MongoDB connection failed', error);
    }
}

module.exports = connectDB;