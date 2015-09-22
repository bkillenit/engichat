var db = require('./db.js');

var createClass = function(newClass) {
  return db.Classes.create({'name': newClass});
}

var getClasses = function() {
  return db.Classes.findAll();
}

module.exports.createMessage = createClass;
module.exports.getClasses = getClasses;