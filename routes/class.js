var express = require('express');
var router = express.Router();

var classes = {1:'Algorithms', 2:'Data Structures', 3:'Databases', 4:'Operating Systems'};

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  if(classes[id] === undefined) { res.send(404); }
  else {
    res.render('class', {'className': classes[id], 'id': id});
  }
});

module.exports = router;