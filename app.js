var express = require('express')
  , http = require('http')
  , fs = require('fs')
  , nib = require('nib')
  , stylus = require('stylus')
  , path = require('path')
  , env = process.env.NODE_ENV || 'development'
  , config = require('./config/environments')[env];

// init the db stuff
require('./config/db')(config.db);

// create the express app
var app = express();

// configure express
app.configure(function(){
  app.disable('x-powered-by');
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/app/views');
  app.set('cdn', config.cdn);
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
      .set('compress', false)
      .use(nib());
    }  
  }));
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
  app.locals.pretty = true;
});

// configure app routes
require('./config/routes')(app);

// run that server
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
