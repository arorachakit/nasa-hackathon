var mongoose = require('mongoose');
var newsSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
});

module.exports = mongoose.model('News', newsSchema);