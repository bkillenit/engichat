$(document).ready(function() {
  // Attach the mousemove event handler
  var canvas = new fabric.Canvas('whiteboardCanvas');
  canvas.isDrawingMode = true;
  canvas.setDimensions({
    width: 600,
    height: 400
  })
});