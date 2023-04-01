const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Users = require('../models/user')
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');
const { SENDGRID_API_KEY } = require('../config/key');

const SignUpRouter = express.Router();
const transport = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey:SENDGRID_API_KEY,
  })
);

SignUpRouter.route('/')
.post((req,res)=>{
    const {email ,username , password} = req.body; 
    if(!email||!username||!password){
        return res.status(422).json({error:'Fill each Detail'});
    }
    Users.findOne({email:email})
    .then((savedperson)=>{
        if(savedperson)
        return res.status(422).json({error:'User Already Exists!'});
        bcrypt.hash(password,12).then((hasedpass)=>{
        const user = new Users({
            email,username,
            password:hasedpass
        });
        user.save()
        .then((user)=>{
            transport.sendMail({
              from: 'codevsharma127@gmail.com',
              to: user.email,
              subject: 'Successfully Signed Up',
              html: '<h1>Welcome to Codevelopers Community</h1>',
            });
            res.status(200).json({message:'Saved Successfully , Now Login to Continue'});
        })
        .catch((err)=>{
            console.log('Error in Saving the Details, Please try again',err)
            res
              .status(400)
              .json({ error: 'Error in Saving the Details, Please try again' });
        })
        })
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports = SignUpRouter;