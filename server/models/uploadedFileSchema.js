const mongoose = require("mongoose");

const uploadedFileSchema = new mongoose.Schema({
    path: String,
    type: String,
    size: Number,
    folder: String,
    filename: String,
});

module.exports = uploadedFileSchema;
