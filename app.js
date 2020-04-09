"use strict";

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let bodyParser = require("body-parser");
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session')
let passport = require('passport');
let favicon = require('serve-favicon');
let Strategy = require('passport-local').Strategy;
let User = require("./services/databaseService").User;
let bcryptService = require("./services/bcryptService");

let loginRouter = require('./routes/login');
let chatRouter = require('./routes/chat');
let registerRouter = require('./routes/register');

let app = express();

// User authentication validation
passport.use(new Strategy(
	function(username, password, done) {
		User.findOne({ username: username }, async function(err, user) {
			if (err) { 
				return done(err);
			}

			// User does not exist
			if (!user) {
				return done(null, false, { message: 'Incorrect username.' });
			}

			// Returns true if password matches encrypted password
			if (await bcryptService.compare(password, user.password)) {
				return done(null, user);
			}

			// Wrong password
			return done(null, false, { message: 'Incorrect password.' });
		});
	}
));

// Serializing/deserializing for persistant user sessions
passport.serializeUser(function(user, cb) {
	cb(null, user.username);
});
  
passport.deserializeUser(function(username, cb) {
	User.findOne({ username: username }, function (err, user) {
		if (err) { return cb(err); }
		cb(null, user);
	});
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Favicon
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));

// User authentication using Passport
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({ secret: 'chufan', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', loginRouter);
app.use('/chat', chatRouter);
app.use('/register', registerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;