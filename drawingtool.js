//Problem: No user interacyion causes no change to application
//Solution: User interaction causes changes appropriately

var color = $(".selected").css("background-color");
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;

//When clicking on control list items
$(".controls").on("click", "li", function() {
  //Deselect sibling elements
  $(this).siblings().removeClass("selected");
  //Select clicked element
  $(this).addClass("selected");
  //cache current color
  color = $(this).css("background-color");
});

//When "New Color" is pressed
$("#revealColorSelect").click(function() {
  //Show color select or hide the color select
  changeColor();
  $("#colorSelect").toggle();
});

//update the new color span
function changeColor() {
  var r = $("#red").val();
  var g = $("#green").val();
  var b = $("#blue").val();
  $("#newColor").css("background-color", "rgb(" + r + "," + g + ", " + b + ")");
}

//When color sliders change
$("input[type=range]").change(changeColor);

//When "Add Color" is pressed
$("#addNewColor").click(function() {
  //Append the color to the controls ul
  var $newColor = $("<li></li>");
  $newColor.css("background-color", $("#newColor").css("background-color"));
  $(".controls ul").append($newColor);
  //Select the new color
  $newColor.click();
});

//On mouse events on the canvas
$canvas.mousedown(function(e) {
  lastEvent = e;
  mouseDown = true;
}).mousemove(function(e) {
  //Draw lines
  if (mouseDown) {
    context.beginPath();
    context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
    context.lineTo(e.offsetX, e.offsetY);
    context.strokeStyle = color;
    context.lineWidth = 4;
    context.stroke();
    lastEvent = e;
  }
}).mouseup(function() {
  mouseDown = false;
}).mouseleave(function() {
  $canvas.mouseup();
});





var prev_onload_drawingboard = window.onload;
window.onload = onload_drawingboard;
function onload_drawingboard()
{
    if (prev_onload_drawingboard) {
	prev_onload_drawingboard();
    }

    var devicePixelRatio = window.devicePixelRatio || 1;
    var vw10 = Math.round(document.getElementById('ten-vwh').offsetWidth * devicePixelRatio);
    var vh10 = Math.round(document.getElementById('ten-vwh').offsetHeight * devicePixelRatio);

    var canvasWidthPixels = Math.floor((vw10*92.0)/10.0);
    var canvasHeightPixels = Math.floor((vh10*64.0)/10.0);

    var element = document.getElementById("drawing-canvas");
    if (element) {
        element.setAttribute("width",""+canvasWidthPixels);
        element.setAttribute("height",""+canvasHeightPixels);
    } 
}

