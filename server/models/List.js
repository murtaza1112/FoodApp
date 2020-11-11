const mongoose = require("mongoose");
const ListSchema = require("./ListSchema");

const currentListSchema = new mongoose.Schema({
  list: [ListSchema],
});

const List = mongoose.model("List", currentListSchema);
module.exports = List;
