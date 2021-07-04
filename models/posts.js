const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const PostSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true,
  },
  imageuri: {
    type: String,
    default: 'no phote',
  },
  likes: [
    {
      type: ObjectId,
      ref: 'User',
    },
  ],
  comments: [
    {
      comment: { type: String },
      postedBy: {
        type: ObjectId,
        ref: 'User',
      },
    },
  ],
  postedBy: {
    type: ObjectId,
    ref: 'User',
  },
});

var Posts =  mongoose.model('Post',PostSchema);
module.exports = Posts;