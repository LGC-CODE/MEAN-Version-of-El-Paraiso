var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var admin = mongoose.model('adminModel');
var picModel = mongoose.model('picModel');
var jwt = require('express-jwt');
var passport = require('passport');
var auth =  jwt({ secret: 'SECRET', userProperty: 'payload' });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/adminUp', function(req, res, next){
	var adminUser = new admin();

	adminUser.username = req.body.username;
	adminUser.setPassword(req.body.password);
	adminUser.save(function(err){
		if(err){ return next(err); }
		return res.json({ token: adminUser.generateJWT() });
	});
});

router.post('/login', function(req, res, next){
	if(!req.body.username || !req.body.password ){
		console.log('no username or password');
		return res.status(400).json({ message: 'Please fill out all fields' })
	}

	passport.authenticate('local', function(err, admin, info){

		if(err){ return next(err); }

		if(admin){
			return res.json({ token: admin.generateJWT() });
		} else {
			return res.status(401).json(info);
		}
	})(req, res, next);
	
});

// router.get('/name', function(req, res, next){
// 	admin.find(function(err, users){
// 		if(err){ return next(err); }
// 		res.json(users);
// 	})
// });

router.get('/allPictures', function( req, res){
	picModel.find(function(err, pictures){
		
		if(err){ return next(err); }

		res.json(pictures);

	});
});

router.post('/savePictures', function(req, res, next){
	var model = new picModel();

	model.url = req.body.url;
	model.description = req.body.description;

	model.save(function(err){
		if(err){ return next(err); }
		res.status(200).json({ message: 'success' });
	});
});

module.exports = router;
