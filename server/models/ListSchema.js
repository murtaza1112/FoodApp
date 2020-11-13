const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  image: String,
  description: String,
  name: String,
  price: Number,
  reviews: [
    {
      name: String,
      rating: Number,
      description: String,
    },
  ],
  type : String
});

module.exports = ListSchema;
