module.exports = function(url) {
	var fs = require('fs')
	  , mongoose = require('mongoose');
	
	// connect to db
	mongoose.connect(url);

	// Bootstrap models
	var models_path = './app/models',
	model_files = fs.readdirSync(models_path);

	model_files.forEach(function (file) {
	  require('.' + models_path + '/' +file);
	});

	// log any db errors
	mongoose.connection.on('error', function(err) {
	  console.log(":::::::: WARNING: MONGODB ERRROR ::::::");
	  console.log(err);
	  console.log(":::::::::::::::::::::::::::::::::::::::");
	});

};