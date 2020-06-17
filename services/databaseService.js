"use strict";

let mongoose = require("mongoose");

let uri = process.env.MONGODB_URI;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});