var express = require('express');
var router = express.Router();
var model = require('../model/model.js');

// store the whiteboard states in RAM for fast lookup
var whiteboardStates = {};

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

router.get('/canvas/:name', function(req, res, next){
  var name = req.params.name;
  var board = whiteboardStates[name];
  if(board === undefined) {
    res.send(200);
  } else {
    res.send(whiteboardStates[name]);
  }
})

module.exports = router;
module.exports.whiteboardStates = whiteboardStates;