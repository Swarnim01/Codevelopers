const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const MessageSchema = new mongoose.Schema({
  conversationId:{
    type: String,
  },
  sender:{
    type: String,
  },
  text:{
    type:String,
  }
},{timestamps:true});

var Messages =  mongoose.model('Message',MessageSchema);
module.exports = Messages;