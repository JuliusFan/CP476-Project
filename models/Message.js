"use strict";
let mongoose = require("mongoose");

let messageSchema = new mongoose.Schema({
	message: {type: String, required: true},
	username: {type: String, required: true},
	// userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
	time: {type: String, required: true}
});

let Message = mongoose.model("Message", messageSchema, "Messages");

module.exports = Message;