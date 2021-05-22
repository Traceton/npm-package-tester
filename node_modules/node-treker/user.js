const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  dropBoxId: { type: String, required: true },
  dropBoxAnswer: { type: String, required: true },
});

module.exports = mongoose.model("user", userSchema);
