var db = require('./db.js');

var createClass = function(newClass) {
  return db.Classes.create({'name': newClass});
}

var getClasses = function() {
  return db.Classes.findAll();
}

var getMessages = function(id) {
  return db.Messages.findAll({
    where: {
      id: id
    }
  });
}

var createMessage = function(msg, className) {
  return db.Classes.findOne({name: className}).then(function(results){
    return db.Messages.insert({message: msg, classID: results.id});
  })
}

module.exports.createClass = createClass;
module.exports.getClasses = getClasses;
module.exports.getMessages = getMessages;
module.exports.createMessage = createMessage;