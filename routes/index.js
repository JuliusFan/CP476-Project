"use strict";

let express = require('express');
let router = express.Router();
let passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.redirect("/login");
});

router.get('/login', function(req, res, next) {
	if (req.isAuthenticated()) {
		res.redirect('/chat');
	} else {
		res.render('index', { title: 'Login' });
	}
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', successRedirect: "/chat" }), function(req, res, next) {
	res.render("chat", { title: 'Login' });
});

router.post('/logout', function(req, res, next) {
	req.logout();
	res.redirect('/login');
});

module.exports = router;
