const mongoose = require("mongoose");
const customerSchema = require(`${process.cwd()}/schemas/customer`);

const model = mongoose.model("Customer", customerSchema);
module.exports = model;
