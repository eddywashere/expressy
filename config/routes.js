module.exports = function(app) {
	// Grab controllers first, then use it in routes
	var home = require('../app/controllers/home'),
	posts = require('../app/controllers/posts');

	// Resourceful Routes (thanks rails!)

	// GET		/posts				index		display a list of all posts
	// GET		/posts/new			new			return an HTML form for creating a new post
	// POST		/posts				create		create a new post
	// GET		/posts/:id			show		display a specific post
	// GET		/posts/:id/edit		edit		return an HTML form for editing a post
	// PUT		/posts/:id			update		update a specific post
	// DELETE	/posts/:id			destroy		delete a specific post

	// Home routes
	app.get('/about', home.about);
	app.get('/test', home.test);
	app.get('/headers', home.headers);
	app.post('/mirror', home.mirror);

	// Post routes
	app.get('/posts', posts.index);
	app.get('/posts/new', posts.new);
	app.post('/posts', posts.create);
	app.get('/posts/:id.:format?', posts.show);
	app.get('/posts/:id/edit', posts.edit);
	app.put('/posts/:id', posts.update);
	app.del('/posts/:id', posts.destroy);

	// default route
	app.get('/', home.index);
};