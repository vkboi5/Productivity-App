// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
