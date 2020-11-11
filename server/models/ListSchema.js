const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  reviews: [
    {
      rating: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
  name: {
    type: String,
    required: true,
  },
  uploadedFile: {
    path: String,
    type: String,
    size: Number,
    folder: String,
    filename: String,
  },
});


module.exports = ListSchema;
