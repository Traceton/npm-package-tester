const mongoose = require("mongoose");


const postSFileschema = new mongoose.Schema({
    length: { type: Number, required: true },
    chunkSize: { type: Number, required: true },
    uploadDate: { type: Date, required: true },
    filename: { type: String, required: true },
    md5: { type: String, required: true },
    contentType: {
        type: String,
        required: true,
    },

});


module.exports = mongoose.model("postFiles.file", postSFileschema);

