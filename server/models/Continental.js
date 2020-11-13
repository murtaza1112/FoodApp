const mongoose = require("mongoose");
const ListSchema = require("./ListSchema");

const Continental = mongoose.model("Continental", ListSchema);
module.exports = Continental;
