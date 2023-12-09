const mongoose = require("mongoose");

module.exports = async()=>{
  try {
    const {connection} =  await  mongoose.connect("mongodb+srv://farrukhadeel:pps993icp956@cluster0.ysuiv.mongodb.net/MongoDbClass");
    console.log("db connected succesfully", connection.host);
  } catch (error) {
    console.log(error)
  }
}