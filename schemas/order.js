const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = Schema({
  date: Schema.Types.Date,
  address: Schema.Types.String,
  customer: { type: Schema.Types.ObjectId, ref: "Customer" }
});
orderSchema.static("blacklist", () => ["_id", "customer"]);

module.exports = orderSchema;
