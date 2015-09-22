var express = require('express');
var router = express.Router();
var model = require('../model/model.js');

var classes = {1:'Algorithms', 2:'Data Structures', 3:'Databases', 4:'Operating Systems'};

/* GET users listing. */

router.get('/:id', function(req, res, next) {
  var id = req.params.id;

  model.getMessages(id).then(function(data){
    model.getClass(id).then(function(result){
      res.render('class', {'className': result.name,
                           'id': id,
                           'messages': data});
    })
  })
});

module.exports = router;