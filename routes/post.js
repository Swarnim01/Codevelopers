const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Posts = require('../models/posts');
const protected = require('../middleware/protected');

const PostRouter = express.Router();

PostRouter.route('/')
.post(protected,(req,res) =>{
    const {caption, imageuri} = req.body; 
    if(!caption||!imageuri){
        return res.status(422).json({error:'Fill each Detail'});
    }
    req.user.password = undefined;
    const post = new Posts({
        caption,
        imageuri,
        postedBy:req.user
    })
    post.save().then((post)=>{
        res.json({post});
    })
    .catch((err)=>{
        console.log(err,{error:"Issue in Creating Post"});
    })
})

module.exports = PostRouter;