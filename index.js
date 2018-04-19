const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require(`${process.cwd()}/helpers/mongoose`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", require(`${process.cwd()}/routes`));

app.listen(3000);
