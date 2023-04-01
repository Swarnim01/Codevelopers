var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/yo', function (req, res, next) {
  res.send('respond with a 2 resource');
});

module.exports = router;
