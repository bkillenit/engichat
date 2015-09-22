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
      classID: id
    }
  });
}

var createMessage = function(msg, className) {
  return db.Classes.findOne({name: className}).then(function(result){
    return db.Messages.create({message: msg, classID: result.id});
  })
}

var getClass = function(id) {
  return db.Classes.findOne({id: id});
}

module.exports.createClass = createClass;
module.exports.getClasses = getClasses;
module.exports.getMessages = getMessages;
module.exports.createMessage = createMessage;
module.exports.getClass = getClass;