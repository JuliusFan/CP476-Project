"use strict";

let express = require('express');
let router = express.Router();
let passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.isAuthenticated()) {
		res.redirect('/chat');
	} else {
		res.render('index', { title: 'Login' });
	}
});

router.post('/', passport.authenticate('local', { failureRedirect: '/', successRedirect: "/chat" }), function(req, res, next) {
	// // Check if user exists in database
	// let exists = await User.find({ username: req.body.username });
	// let errorUserName = "";
	// let errorPassword = "";
	// let page = "chat";
	// if (exists == "") {
	// 	if (req.body.username === "") {
	// 		errorUserName = "You must enter a username."
	// 	} else if (req.body.password === "") {
	// 		errorPassword = "You must enter a password."
	// 	} else {
	// 		let user = new User({
	// 			username: req.body.username,
	// 			password: req.body.password
	// 		});
	// 		await user.save();
	// 	}
	// 	page = "index"
	// }
	
	res.render("chat", { title: 'Login' });
});

router.post('/logout', function(req, res, next) {
	req.logout();
	res.redirect('/');
});

module.exports = router;
