const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Posts = require('../models/posts');
const protected = require('../middleware/protected');

const ShowPostRouter = express.Router();

ShowPostRouter.use(bodyParser.json());

ShowPostRouter.route('/')
.get(protected,(req,res) => {
  // console.log(req.user);
    Posts.find({$or :[{postedBy:{$in : req.user.following}},{postedBy:req.user._id}]})
      .populate('postedBy', '_id username')
      .populate('comments.postedBy', '_id username')
      .sort('-createdAt')
      .then((posts) => {
        res.json(posts);
      })
      .catch((err) => {
        console.log(err);
      });

})

module.exports = ShowPostRouter;