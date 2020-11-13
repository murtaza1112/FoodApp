const mongoose = require("mongoose");
const ListSchema = require("./ListSchema");

const Chinese = mongoose.model("Chinese", ListSchema);
module.exports = Chinese;
