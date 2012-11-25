
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , nib = require('nib')
  , stylus = require('stylus');

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

// grab controllers first, then use it in routes
var homeController = require('./app/controllers');
// routes
app.get('/', homeController.index);
app.get('/about', homeController.about);
app.get('/test', homeController.test);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server running at http://localhost:" + app.get('port'));
});
