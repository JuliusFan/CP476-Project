"use strict";

let mongoose = require("mongoose");
let Message = require("../models/Message");

let uri = process.env.MONGODB_URI;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});