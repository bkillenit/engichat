$(document).ready(function() {
  // Attach the mousemove event handler
  var canvas = new fabric.Canvas('whiteboardCanvas');
  canvas.isDrawingMode = true;
  var socket = io();

  $('#freeformModeButton').addClass('selected');

  $('#freeformModeButton').on('click', function(){
    $('.button').removeClass('selected');
    $(this).addClass('selected');
    canvas.isDrawingMode = true;
  })

  $('#selectModeButton').on('click', function(){
    $('.button').removeClass('selected');
    $(this).addClass('selected');
    canvas.isDrawingMode = false;
  })

  $('#uploadSketch').on('click', function(event) {
    var dataURL = canvas.toDataURL({
      format: 'png'
    });

    var $messages = $('#messages');
    $messages.append($('<img>').attr('src', dataURL).addClass('upload'));
    $messages.scrollTop($messages[0].scrollHeight);
    $('#freeformModeButton').click();
    canvas.clear();
  });

  canvas.setDimensions({
    width: 600,
    height: 400
  })

  canvas.on('path:created', function(ev){
    socket.emit('chat canvas', ev.path, $('form').data('room'));
    return false;
  })

  socket.on($('form').data('room') + ' canvas', function(path){
    var pathDescripts = path.path;

    var buffer = [];
    for(var i = 0; i < pathDescripts.length; i++) {
      var subPath = pathDescripts[i];

      for(var j = 0; j < subPath.length; j++) {
        buffer.push(subPath[j]);
      }
    }

    buffer = buffer.join(' ');

    var newPath = new fabric.Path(buffer);
    newPath.fill = null;
    newPath.stroke = "rgb(0, 0, 0)";
    newPath.strokeWidth = 1
    newPath.strokeLineCap = "round";
    newPath.strokeLineJoin = "round";

    canvas.add(newPath);
  });
});