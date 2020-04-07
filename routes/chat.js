var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render('chat', { title: 'Express' });
});
	
router.post('/', function(req, res, next) {
	
	console.log(req.body.message)
	res.render('chat', { title: 'Express' });
});


module.exports = router;
