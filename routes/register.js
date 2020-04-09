"use strict";

let express = require('express');
let router = express.Router();
let bcryptService = require("../services/bcryptService")
let User = require("../services/databaseService").User;

router.get('/', function(req, res, next) {
	// If user is already logged in, redirect to chat page
	if (req.isAuthenticated()) {
		res.redirect('/chat');
	} else {
		res.render('register', { title: 'Register' });
	}
});

// Server-sided registration logic
router.post('/', async function(req, res, next) {
	// Check if user exists in database
	let exists = await User.find({ username: req.body.username });
	if (exists == "") {
		// Empty username or password checking
		if (req.body.username === "") {
			res.render("register", { title: 'Login', errorUsername: "You must enter a username."});
		} else if (req.body.password === "") {
			res.render("register", { title: 'Login', errorPassword: "You must enter a password." });

		// Non-empty username and password
		} else {
			// Hashing password and creating new user
			let password = await bcryptService.encrypt(req.body.password);
			
			// Creating new user with hashed password
			let user = new User({
				username: req.body.username,
				password: password
			});
			await user.save();
			res.redirect("/login");
		}

	// User exists already, cannot overwrite username
	} else {
		res.render("register", { title: 'Login', errorUsername: "Username already exists."});
	}
});

module.exports = router;