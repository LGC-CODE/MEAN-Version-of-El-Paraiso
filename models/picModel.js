var mongoose = require('mongoose');

var picSchema = new mongoose.Schema({
	url: String,
	description: String
});

mongoose.model('picModel', picSchema);