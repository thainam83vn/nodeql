const mongoose = require("mongoose");
const orderSchema = require(`${process.cwd()}/schemas/order`);

const model = mongoose.model("Order", orderSchema);
module.exports = model;
