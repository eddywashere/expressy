var express = require('express')
  , http = require('http')
  , fs = require('fs')
  , path = require('path')
  , lessMiddleware = require('less-middleware')
  , env = process.env.NODE_ENV || 'development'
  , config = require('./config/environments')[env];

// init the db stuff
require('./config/db')(config.db);

// create the express app
var app = express();

app.configure('development', function(){
  app.use(express.errorHandler());
  app.locals.pretty = true;
  app.use(lessMiddleware({
      dest: __dirname + '/public',
      src: __dirname + '/app/assets',
      optimization: 2,
      compress: true
  }));
});

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
  app.use(express.compress());
  app.use(express.responseTime());
  app.use(express.cookieParser('woot woot woot'));
  app.use(express.session());
  app.use(express.csrf());
  app.use(function(req, res, next){
    res.locals.token = req.session._csrf;
    next();
  });
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// configure app routes
require('./config/routes')(app);

// run that server
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
