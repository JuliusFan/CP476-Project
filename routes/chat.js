"use strict";

var express = require('express');
var router = express.Router();
let passport = require('passport');
let connected = require('connect-ensure-login')

/* GET users listing. */
router.get('/',  (req, res, next) => {
	if (req.isAuthenticated()) {
		res.render('chat', { title: 'Chat', chatroom: "Cook Rice", username: req.user.username});
	} else {
		res.redirect("/");
	}	
});
	
router.post('/', function(req, res, next) {
	res.render('chat', { title: 'Chat' });
});

module.exports = router;