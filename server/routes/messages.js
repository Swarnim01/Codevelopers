const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Messages = require('../models/message');
const protected = require('../middleware/protected');

const MessageRouter = express.Router();

MessageRouter.route('/')
.post(async (req,res) =>{
    const message = new Messages(req.body)
    try{
        const newMessage = await message.save();
        res.status(200).json(newMessage);
    }
    catch{(err)=>{
        res.status(500).json(err);
        console.log(err,{error:"Error while saving message"});
    }}
})
MessageRouter.route('/:conversationId')
.get(async (req,res) =>{
    try{
        const message = await Messages.find({conversationId:req.params.conversationId});
        res.status(200).json(message);
    }
    catch{(err)=>{
        res.status(500).json(err);
        console.log(err,{error:"Error in finding message"});
    }}
})
module.exports = MessageRouter;