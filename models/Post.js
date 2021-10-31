const mongoose = require("mongoose");


const postSchema = new mongoose.Schema({

  title: { type: String, required: true },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now(),
  },

});


module.exports = mongoose.model("post", postSchema);