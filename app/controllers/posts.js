
/*
 * res.renders from the app/views directory
 */

 // Resourceful Routes

 // GET     /posts					 index			display a list of all posts
 // GET			/posts/new			 new        return an HTML form for creating a new post
 // POST		/posts					 create		  create a new post
 // GET			/posts/:id			 show			  display a specific post
 // GET			/posts/:id/edit	 edit		    return an HTML form for editing a post
 // PUT			/posts/:id			 update		  update a specific post
 // DELETE	/posts/:id			 destroy		delete a specific post

exports.index = function(req, res){
  res.render('posts/index', { posts: ['foo', 'bar'] });
};

exports.show = function(req, res){
  res.render('posts/show', { id: req.params.id });
};

exports.new = function(req, res){
  res.render('posts/new', {});
};

exports.edit = function(req, res){
  res.render('posts/edit', { isEdit: true, id: req.params.id});
};

// redirect to show
exports.create = function(req, res){
  res.redirect('posts/1'); // replace with id
};

// redirect to show
exports.update = function(req, res){
  res.redirect('posts/1'); // replace with id
};

// redirect to index
exports.destroy = function(req, res){
  res.redirect('posts/');
};