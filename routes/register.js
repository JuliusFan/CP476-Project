"use strict";

var express = require('express');
var router = express.Router();
let passport = require('passport');
let User = require("../services/databaseService").User;

/* GET users listing. */
router.get('/', function(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/chat');
    } else {
        res.render('register', { title: 'Register' });
    }
});

router.post('/', async function(req, res, next) {
	// Check if user exists in database
	let exists = await User.find({ username: req.body.username });
	let errorUserName = "";
	let errorPassword = "";
	if (exists == "") {
		if (req.body.username === "") {
            errorUserName = "You must enter a username."
            res.render("register", { title: 'Login', errorUsername: errorUserName, errorPassword: errorPassword });
		} else if (req.body.password === "") {
            errorPassword = "You must enter a password."
            res.render("register", { title: 'Login', errorUsername: errorUserName, errorPassword: errorPassword });
		} else {
			let user = new User({
				username: req.body.username,
				password: req.body.password
			});
            await user.save();
            res.redirect("/login");
		}
    } else {
        res.redirect("/login");
    }
    
});

// router.post('/', function(req, res, next) {
// 	res.render('login', { title: 'Chat' });
// });

module.exports = router;