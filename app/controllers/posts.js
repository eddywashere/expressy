
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
 var mongoose = require('mongoose'),
 Post = mongoose.model('Post');

exports.index = function(req, res){
  Post.find({}, function(err, posts){
    if (err || !posts) {
      res.status(500);
      return res.render('500', { err : err});
    }
    res.render('posts/index', { posts: posts });
  });
  // res.json(Post.find());
};

exports.show = function(req, res){
  Post.findOne({ _id : req.params.id }, function(err, post){
    if (err || !post) {
      res.status(500);
      return res.render('500');
    }
    res.render('posts/show', { post: post });
  });
};

exports.new = function(req, res){
  res.render('posts/new', {
    post: new Post({})
  });
};

exports.edit = function(req, res){
  Post.findOne({ _id : req.params.id }, function(err, post){
    if (err || !post) {
      res.status(500);
      return res.render('500', { err : err});
    }
    res.render('posts/edit', { isEdit: true, post: post});
  });
};

// redirect to show
exports.create = function(req, res){
  var post = new Post(req.body);

  post.save(function(err){
    if (err) {
      res.render('posts/new', { post: post });
    } else {
      res.redirect('/posts/' + post._id)
    }
  });
};

// redirect to show
exports.update = function(req, res){
  Post.findOne({ _id : req.params.id }, function(err, post){
    if (err || !post) {
      res.status(500);
      return res.render('500', { err : err});
    }
    post.title = req.body.title;
    
    post.save(function(err){
      console.log(err);
      if (err) {
        res.render('posts/' + req.params.id + '/edit', { post: post });
      } else {
        res.redirect('/posts/' + post._id);
      }
    });
  });
};

// redirect to index
exports.destroy = function(req, res){
  Post.findOne({ _id : req.params.id }, function(err, post){
    if (err || !post) {
      res.status(500);
      return res.render('500', { err : err});
    }
    post.remove(function(err){
      res.redirect('/posts');
    });
  });
};