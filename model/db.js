var Sequelize = require('sequelize');
var sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  // SQLite only
  storage: './model/database.sqlite'
});

var Messages = sequelize.define('Messages', {
  message: Sequelize.STRING,
  classID: Sequelize.INTEGER
});

var Classes = sequelize.define('Classes', {
  name: { type: Sequelize.STRING, unique: true }
});

sequelize.sync().then(function() {

});

module.exports.Messages = Messages;
module.exports.Classes = Classes;