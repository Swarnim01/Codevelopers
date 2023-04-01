const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/key');
const Users = require('../models/user');

const ProtectedRouter = express.Router();

ProtectedRouter.route('/').get((req, res) => {
    const {token} = req.cookies;
    if(token)
   {   
        jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err)
        return res.status(401).json(null);
        
        const {_id} = payload;
        Users.findById(_id).then(userdata =>{
        res.json({token,userdata});})
        })
    }
    else
    res.json(null);
});

module.exports = ProtectedRouter;