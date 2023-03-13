const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const ConversationSchema = new mongoose.Schema({
    members:{
        type:Array
    }
},{timestamps:true});

var Conversations =  mongoose.model('Conversation',ConversationSchema);
module.exports = Conversations;