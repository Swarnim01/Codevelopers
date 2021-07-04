const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Posts = require('../models/posts');
const protected = require('../middleware/protected');
const Users = require('../models/user');

const MyProfileRouter = express.Router();

MyProfileRouter.route('/')
.get(protected,(req,res) => {
    Users.findById(req.user._id)
    .select('-password')
    .then((user)=>{
      Posts.find({ postedBy: req.user._id })
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

})
module.exports = MyProfileRouter;