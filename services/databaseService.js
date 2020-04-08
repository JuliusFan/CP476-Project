"use strict";

let mongoose = require("mongoose");

let uri = "";
if (typeof process.env.MONGODB_URI == 'undefined') {
	uri = "mongodb://heroku_99z78930:68jv9r8i7neovka9e2htsricfc@ds059115.mlab.com:59115/heroku_99z78930";
} else {
	uri = process.env.MONGODB_URI;
}

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

let userSchema = new mongoose.Schema({
	username: {type: String, required: true},
	password: {type: String, required: true}
});

let messageSchema = new  mongoose.Schema({
    message: {type: String, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    time: {type: String, required: true}
});

let User = mongoose.model("User", userSchema, "Users");
let Message = mongoose.model("Message", messageSchema, "Messages");

module.exports = {Message, User};