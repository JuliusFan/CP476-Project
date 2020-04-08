"use strict";

let express = require('express');
let router = express.Router();

let User = require("../services/databaseService").User;

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Login' });
});

router.post('/', async function(req, res, next) {
	// Check if user exists in database
	let exists = await User.find({ username: req.body.username });
	let errorUserName = "";
	let errorPassword = "";
	let page = "chat";
	if (exists == "") {
		if (req.body.username === "") {
			errorUserName = "You must enter a username."
		} else if (req.body.password === "") {
			errorPassword = "You must enter a password."
		} else {
			let user = new User({
				username: req.body.username,
				password: req.body.password
			});
			await user.save();
		}
		page = "index"
	}
	res.render(page, { title: 'Login', errorUsername: errorUserName, errorPassword: errorPassword });
});

module.exports = router;
