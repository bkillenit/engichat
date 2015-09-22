var express = require('express');
var router = express.Router();
var model = require('../model/model.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  model.getClasses().then(function(results){
    res.render('classes', {'classes': results});
  });
});

router.post('/', function(req, res, next){
  var newClass = req.body.class;

  model.createMessage(newClass).then(function(data){
    res.status(201).send(data.dataValues);
  })
})

module.exports = router;