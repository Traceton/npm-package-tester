const mongoose = require("mongoose"); 


  const vehicleSchema = new mongoose.Schema({

  year:{type:String,required:true},make:{type:String,required:true},model:{type:String,required:true},price:{type:String,required:true},sellerid:{type:String,required:true},createdOn: {
    type: Date,
    required: true,
    default: Date.now(),
  },

  }); 


  module.exports = mongoose.model("vehicle", vehicleSchema);