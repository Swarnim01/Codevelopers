const express = require('express');
const mongoose = require('mongoose');
const Posts = require('../models/posts');
const protected = require('../middleware/protected');
const Users = require('../models/user');

const UserProfileRouter = express.Router();

UserProfileRouter.get('/profile/:userId',protected, (req, res) => {
  const { userId } = req.params;
  Users.findById(userId)
  .select('-password')
  .then((user)=>{
      Posts.find({ postedBy: userId })
      .populate('postedBy','_id username')
      .then((post) => {
          res.json({ user, post });
        })
        .catch((err) => {
          return res.status(422).json({error:err})
        });

  })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});

UserProfileRouter.put('/follow', protected, (req, res) => {
  const { followId } = req.body;
  Users.findByIdAndUpdate(req.user._id ,
    { $push : { following : followId }},
    {new : true})
    .select('-password')
    .then((result1) => {
      Users.findByIdAndUpdate(followId ,{
      $push : { followers : req.user._id}},
       {new : true})
      .select('-password')
        .then((result2) => {
          res.json({result1,result2});
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});
UserProfileRouter.put('/unfollow', protected, (req, res) => {
  const { followId } = req.body;
  Users.findByIdAndUpdate(req.user._id ,
    { $pull : { following : followId }},
    {new : true})
    .select('-password')
    .then((result1) => {
      Users.findByIdAndUpdate(followId ,{
      $pull : { followers : req.user._id}},
       {new : true})
      .select('-password')
        .then((result2) => {
          res.json({result1,result2});
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});
module.exports = UserProfileRouter;
