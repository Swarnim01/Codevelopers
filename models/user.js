const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    following:[{type:ObjectId , ref : 'User'}],
    followers:[{type:ObjectId , ref : 'User'}]
});

var Users =  mongoose.model('User',UserSchema);
module.exports = Users;