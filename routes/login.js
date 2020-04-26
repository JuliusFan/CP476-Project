"use strict";

let express = require('express');
let router = express.Router();
let passport = require('passport');

// If no URL parameters, redirect to login route
router.get('/', function(req, res, next) {
	res.redirect("/login");
});

// Default page: login page
router.get('/login', function(req, res, next) {
	// If user is already logged in, redirect to chat page
	if (req.isAuthenticated()) {
		res.redirect('/chat');
	} else {
		res.render('login', { title: 'Login' });
	}
});

// Login logic, validates credentials with database using Passport.js
router.post('/login', passport.authenticate('local', { failureRedirect: '/login'}), function(req, res, next) { // , successRedirect: "/chat" 
	res.redirect("/chat");
});

// If user tries to go to /logout page, it'll redirect to /login
router.post('/logout', function(req, res, next) {
	req.logout();
	res.redirect('/login');
});

module.exports = router;
