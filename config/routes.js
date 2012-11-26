module.exports = function(app) {
	// grab controllers first, then use it in routes
	var home = require('../app/controllers');

	// routes
	app.get('/about', home.about);
	app.get('/test', home.test);


	// default route
	app.get('/', home.index);
};