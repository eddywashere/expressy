// Include the cluster module
var cluster = require('cluster');

// Code to run if we're in the master process
if (cluster.isMaster) {
  var cpuCount = 1;
  // Count the machine's CPUs
  if (process.env.NODE_ENV != "development") {
    cpuCount = require('os').cpus().length;
  }
  // Create a worker for each CPU
  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }
  // Listen for dying workers
  cluster.on('exit', function (worker) {
    // Replace the dead worker, we're not sentimental
    console.log('Worker ' + worker.id + ' died :(');
    cluster.fork();
  });

// Code to run if we're in a worker process
} else {

  var express = require('express')
    , http = require('http')
    , fs = require('fs')
    , path = require('path')
    , ConnectMincer = require('connect-mincer')
    , env = process.env.NODE_ENV || 'development'
    , config = require('./config/environments')[env];

  // init the db stuff
  require('./config/db')(config.db);

  // create the express app
  var app = express();

  var connectMincer = new ConnectMincer({
    root: __dirname,
    production: env === 'production' || env === 'staging',
    mountPoint: '/assets',
    manifestFile: __dirname + '/public/assets/manifest.json',
    paths: [
      'app/assets/css',
      'app/assets/js',
      'app/assets/img'
    ]
  });

  app.use(connectMincer.assets());

  app.configure('development', function(){
    app.use(express.errorHandler());
    app.locals.pretty = true;
    app.use('/assets', connectMincer.createServer());
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
    console.log("CLUSTER-" + cluster.worker.id + ": Express server listening on port " + app.get('port'));
  });
}