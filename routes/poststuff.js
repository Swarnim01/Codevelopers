const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Posts = require('../models/posts');
const protected = require('../middleware/protected');

const PostStuffRouter = express.Router();

PostStuffRouter.put('/like',protected, (req, res) => {
  const { postId } = req.body;
  Posts.findByIdAndUpdate(
    postId,
    { $push: { likes: req.user._id } },
    { new: true }
  )
    .populate('postedBy', '_id username')
    .populate('comments.postedBy', '_id username')
    .exec((err, result) => {
      if (err) return res.status(422).json({ error: err });
      else res.json(result);
    });
});

PostStuffRouter.put('/unlike',protected, (req, res) => {
  const { postId } = req.body;
  Posts.findByIdAndUpdate(
    postId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .populate('postedBy', '_id username')
    .populate('comments.postedBy', '_id username')
    .exec((err, result) => {
      if (err) return res.status(422).json({ error: err });
      else res.json(result);
    });
});

PostStuffRouter.put('/comment', protected, (req, res) => {
  const { postId , comment } = req.body;
  Posts.findByIdAndUpdate(
    postId,
    { $push: { comments: { comment, postedBy: req.user._id } } },
    { new: true }
  )
    .populate('postedBy', '_id username')
    .populate('comments.postedBy', '_id username')
    .exec((err, result) => {
      if (err) return res.status(422).json({ error: err });
      else res.json(result);
    });
});

PostStuffRouter.delete('/delete/:commentId',protected,(req,res)=>{
  const { commentId } = req.params;
  const { postId } = req.body;
    Posts.findByIdAndUpdate(
      postId,
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    )
      .populate('postedBy', '_id username')
      .populate('comments.postedBy', '_id username')
      .exec((err, result) => {
        if (err) return res.status(422).json({ error: err });
        else res.json(result);
      });
})
module.exports = PostStuffRouter;
