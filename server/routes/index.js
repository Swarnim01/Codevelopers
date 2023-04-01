var express = require('express');
const mongoose = require('mongoose');
const _protected = require('../middleware/protected');
var router = express.Router();
const Posts = require('../models/posts');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
