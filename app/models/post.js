var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    title: String
});

mongoose.model('Post', postSchema);