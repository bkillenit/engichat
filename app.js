var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser')

var routes = require('./routes/index');
var users = require('./routes/users');
var classes = require('./routes/classes');
var oneClass = require('./routes/class');

var io = require('socket.io')(http);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.use('/', routes);
app.use('/users', users);
app.use('/classes', classes);
app.use('/class/', oneClass);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg, className){
    io.emit(className + ' message', msg);
  });

  socket.on('chat canvas', function(path, className){
    socket.broadcast.to(className + ' canvas').emit(path);
  })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
