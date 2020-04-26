"use strict";

let mongoose = require("mongoose");
let Message = require("../models/Message");

let uri = "";
if (typeof process.env.MONGODB_URI == 'undefined') {
	uri = "mongodb://heroku_99z78930:68jv9r8i7neovka9e2htsricfc@ds059115.mlab.com:59115/heroku_99z78930";
} else {
	uri = process.env.MONGODB_URI;
}

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});