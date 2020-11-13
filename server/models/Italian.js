const mongoose = require("mongoose");
const ListSchema = require("./ListSchema");

const Italian = mongoose.model("Italian", ListSchema);
module.exports = Italian;
