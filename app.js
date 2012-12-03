
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , nib = require('nib')
  , stylus = require('stylus')
  , mongoose = require('mongoose')
  , fs = require('fs');

mongoose.connect(process.env.MDB || 'mongodb://localhost/test');

// Bootstrap models
var models_path = __dirname + '/app/models',
model_files = fs.readdirSync(models_path);

model_files.forEach(function (file) {
  require(models_path+'/'+file);
});

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/app/views');
  app.set('view engine', 'jade');
  app.use(express.favicon(__dirname + '/public/favicon.ico'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('woot woot woot'));
  app.use(express.session());
  app.use(express.csrf());
  app.use(function(req, res, next){
    res.locals.token = req.session._csrf;
    next();
  });
  app.use(app.router);
  app.use(stylus.middleware({
    src: __dirname + '/app/assets',
    dest: __dirname + '/public',
    debug: true,
    compile: function(str, path) { // optional, but recommended
      return stylus(str)
      .set('filename', path)
      .set('warn', true)
      .set('compress', true)
      .use(nib());
    }  
  }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
  app.locals.pretty = true;
});

// routes
require('./config/routes')(app);

// log any db errors
mongoose.connection.on('error', function(err) {
  console.log(":::::::: WARNING: MONGODB ERRROR ::::::");
  console.log(err);
  console.log(":::::::::::::::::::::::::::::::::::::::");
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
