module.exports = function(url) {
  var fs = require('fs'),
  mongoose = require('mongoose'),
  connected = false;

  // connect to db
  mongoose.connect(url);

  // Bootstrap models
  var models_path = './app/models',
  model_files = fs.readdirSync(models_path);

  model_files.forEach(function (file) {
    require('.' + models_path + '/' +file);
  });

  mongoose.connection.on('open', function() {
    console.log(":::::::: Express connection to mongodb opened :::::::: ");
    connected = true;
  });

  mongoose.connection.on('connected', function () {
    if (connected) {
      console.log(":::::::: Express has reconnected to mongodb :::::::: ");
    };
  });

  mongoose.connection.db.on('close', function() {
    console.log(":::::::: Express connection to mongodb disconnected :::::::: ");
  });

  // log any db errors
  mongoose.connection.on('error', function(err) {
    console.log(":::::::: WARNING: MONGODB ERRROR ::::::");
    console.log(err);
    console.log(":::::::::::::::::::::::::::::::::::::::");
  });

};