$(document).ready(function() {
  // Attach the mousemove event handler
  var canvas = new fabric.Canvas('whiteboardCanvas');
  canvas.isDrawingMode = true;
  var socket = io();

  canvas.setDimensions({
    width: 600,
    height: 400
  })

  canvas.on('path:created', function(ev){
    socket.emit('chat canvas', ev.path, $('form').data('room'));
    return false;
  })

  socket.on($('form').data('room') + ' canvas', function(path){
    path.render(canvas, true);
  });
});