
/*
 * res.renders from the app/views directory
 */

exports.index = function(req, res){
  // renders app/views/home/index.jade and passes the title variable
  res.render('home/index', { title: 'Starter App' });
};

exports.about = function(req, res){
  res.render('home/about', { title: 'Starter App - about' });
};

exports.test = function(req, res){
  res.render('home/test', { title: 'Starter App - test' });
};

exports.headers = function(req, res){
	res.json(req.headers);
};

exports.mirror = function(req, res){
	if (req.xhr) {
		console.log('this was an xhr request')
	} else {
		console.log('Not an xhr request')
	}
	res.json(req.body);
};

