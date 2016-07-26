var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
	name: String,
	city: String,
	comment: String
});

mongoose.model('commentModel', commentSchema);