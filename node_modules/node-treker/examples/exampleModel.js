const mongoose = require("mongoose");

const dropBoxAnswerSchema = new mongoose.Schema({
  dropBoxId: {
    type: String,
    required: true,
  },
  dropBoxAnswer: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model("dropBoxAnswer", dropBoxAnswerSchema);

// example command to create a mongoose model.
// g m user dropBoxId:String dropBoxAnswer:String
