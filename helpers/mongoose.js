const mongoose = require("mongoose");
const env = require(`${process.cwd()}/helpers/env`);
mongoose.connect(env.mongoUri);
