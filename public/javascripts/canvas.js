var initializeCanvas = function(className){
  var canvas = new fabric.Canvas('whiteboardCanvas');

  $.get("../class/canvas/" + className, function( data ) {
    if(data !== 'OK') {
      canvas.loadFromJSON(data, canvas.renderAll.bind(canvas));
    }
  });

  var dataStructureSelected = false;

  canvas.isDrawingMode = true;
  canvas.backgroundColor = "white";
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

    socket.emit('chat image', dataURL, $('form').data('room'));
  });

  $('#clearSketch').on('click', function(){
    canvas.clear();
  })

  canvas.setDimensions({
    width: 850,
    height: 500
  })

  canvas.on('path:created', function(ev){
    socket.emit('chat canvas', ev.path, $('form').data('room'), JSON.stringify(canvas.toDatalessJSON()));
    return false;
  })

  canvas.on('object:modified', function(ev){

  });

  $('#colorSelect').val('black');
  $('#structureSelect').val('');

  $('#colorSelect').on('change', function(){
    console.log(canvas);
    canvas.freeDrawingBrush.color = $(this).val();
  });

  $('#structureSelect').on('change', function(){
    dataStructureSelected = true;
  });

  canvas.on('mouse:down', function(ev){
    if(dataStructureSelected) {
      console.log(ev.e);
      var y = ev.e.layerY;
      var x = ev.e.layerX;

      var ds = $('#structureSelect').val();

      if(ds === 'bst') {
        var circle = new fabric.Circle({
          radius: 30,
          stroke: 2,
          borderColor: 'black',
          fill: '',
          left: x - 30,
          top: y - 30
        })

        canvas.add(circle);
      } else if(ds === 'll') {
        var rect = new fabric.Rect({
          borderColor: 'black',
          fill: 'white',
          stroke: 1,
          left: x,
          top: y,
          width: 50,
          height: 50
        });

        var rect1 = new fabric.Rect({
          borderColor: 'black',
          fill: 'white',
          stroke: 1,
          left: x + 50,
          top: y,
          width: 50,
          height: 50
        });

        canvas.add(rect);
        canvas.add(rect1);
      } else if(ds === 'array') {
        var rect = new fabric.Rect({
          borderColor: 'black',
          fill: 'white',
          stroke: 1,
          left: x,
          top: y,
          width: 50,
          height: 50
        });

        canvas.add(rect);
      }

      var ds = $('#structureSelect').val('');
      dataStructureSelected = false;
    }
  })

  socket.on($('form').data('room') + ' image', function(image){
    canvas.clear();
  });

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
    newPath.stroke = path.stroke;
    newPath.strokeWidth = 1
    newPath.strokeLineCap = "round";
    newPath.strokeLineJoin = "round";

    canvas.add(newPath);
  });
}