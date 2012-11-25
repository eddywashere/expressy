
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