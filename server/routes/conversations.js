const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Conversation = require('../models/conversation');
const protected = require('../middleware/protected');

const ConversationRouter = express.Router();

ConversationRouter.route('/')
.post(async (req,res) =>{
    const {senderId, receiverId} = req.body; 
    const conversation = new Conversation({
        members:[senderId, receiverId]
    })
    try{
        const newConversation = await conversation.save();
        res.status(200).json(newConversation);
    }
    catch{(err)=>{
        res.status(500).json(err);
        console.log(err,{error:"Error while saving conversationa"});
    }}
})
ConversationRouter.route('/:userId').get(async(req,res) => {
    try{
        const conversation = await Conversation.find({
            members:{$in:[req.params.userId]}
        })
        res.status(200).json(conversation);
    }
    catch{(err)=>{
        res.status(500).json(err);
        console.log(err,{error:"Error while getting conversationa"});
    }
}
})
module.exports = ConversationRouter;