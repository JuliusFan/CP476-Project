"use strict";
let mongoose = require("mongoose");

let roomSchema = new mongoose.Schema({
	name: {type: String, required: true},
	messages: [messageSchema]
})

let Room = mongoose.model("Room", roomSchema, "Rooms");

module.exports = Message;