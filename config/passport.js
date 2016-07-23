var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var admin = mongoose.model('adminModel');

passport.use(new LocalStrategy(
	function(username, password, done){
		admin.findOne({ username: username }, function(err, admin){			
			if( err ){ return done(err); }

			if(!admin){
				return done(null, false, { message: 'Incorrect username.' });
			}

			if(!admin.validPassword(password)){
				return done(null, false, { message: 'Incorrect password.' });
			}

			return done(null, admin);
		});
	}
));