var mongoose = require('mongoose');

var adminSchema = new mongoose.Schema({
	name: {type: String, lowercase: true, unique: true},
	token: {type: String, unique: true}
});

adminSchema.methods.generateJWT =  function(){
	var today =  new Date();
	var exp = new Date(today);
	exp.setDate(today.getDate() + 60);
	console.log('this is age in jwt', this.displayName);
	return jwt.sign({
		_id: this._id,
		username: this.username,
		age: this.age,
		pictureUrl: this.pictureUrl,
		displayName: this.displayName,
		exp: parseInt(exp.getTime() / 1000)
	}, 'SECRET');
};

mongoose.model('adminModel', adminSchema);