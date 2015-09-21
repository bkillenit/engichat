var express = require('express');
var router = express.Router();

var classes = {1:'algorithms', 2:'data structures', 3:'databases', 4:'operating systems'};

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('classes', {'classes': classes});
});

module.exports = router;