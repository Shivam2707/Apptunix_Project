const mongoose = require("mongoose");
const config = require("config")

const connectDB = async() => {
 try {
     await mongoose.connect(config.get("mongo_uri"),{useUnifiedTopology: true, useNewUrlParser: true});
     console.log("Mongo db connected !!");
 } catch (error) {
        return console.log(error.message)
 }
}
module.exports = connectDB;