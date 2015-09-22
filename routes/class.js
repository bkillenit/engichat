var express = require('express');
var router = express.Router();
var model = require('../model/model.js');

/* GET messages for the room */
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