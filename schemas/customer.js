const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = Schema({
  first_name: Schema.Types.String,
  last_name: Schema.Types.String,
  email: Schema.Types.String
});
module.exports = customerSchema;
