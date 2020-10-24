"use strict";

let mongoose = require("mongoose");

let uri = "";
if (typeof process.env.MONGODB_URI == 'undefined') {
	uri = "mongodb+srv://chatapp:chatapp@julianprojects.zcnwj.mongodb.net/ChatApp?retryWrites=true&w=majority";
} else {
	uri = process.env.MONGODB_URI;
}

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});