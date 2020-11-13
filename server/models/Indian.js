const mongoose = require("mongoose");
const ListSchema = require("./ListSchema");

const Italian = mongoose.model("Indian", ListSchema);
module.exports = Italian;
