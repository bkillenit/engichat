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

var model = require('./model/model.js');

var io = require('socket.io')(http);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
// app.use('/model', express.static(__dirname + '/bower_components'));

app.use('/', routes);
app.use('/users', users);
app.use('/classes/', classes);
app.use('/class/', oneClass);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

var clients = {};

io.on('connection', function(socket){
  clients[socket.id] = socket.id;
  console.log(clients);

  socket.on('chat message', function(msg, className){
    model.createMessage(msg, className).then(function() {
      io.emit(className + ' message', msg);
    });
  });

  socket.on('chat canvas', function(path, className, canvas){
    oneClass.whiteboardStates[className] = canvas;
    // socket.to(className + ' canvas').emit(className + ' canvas', path);
    //io.emit(className + ' canvas', path);
    // socket.broadcast.to(className + ' canvas').emit(path);
    // for(socketID in clients) {
    //   var sock = clients[socketID];
    //   if(socket.id != sock) {
    //     console.log(sock);
    //     socket.broadcast.emit('', path);
    //   }
    // }
    socket.broadcast.emit(className + ' canvas', path);
  })

  socket.on('chat image', function(img, className) {
    io.emit(className + ' image', img);
  })

  socket.on('disconnect', function() {
    console.log('Got disconnect!');

    delete clients[socket.id];
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
