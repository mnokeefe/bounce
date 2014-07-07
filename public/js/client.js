// var socket = io('/crew');
var socket = io();
var stress_ui = $("#ui");

// Add a username
$(".username-form").on("submit", function(){

  // Tell the server about it
  var username = $(this).children("input").val();
  socket.emit("add a bouncer", {"username": username});

  // Remove the login form and show UI
  $(this).remove();
  $("#username").text(username);
  stress_ui.show();
  return false;
});

// Receive the bomb
socket.on('get bomb', function() {
  $('.js-bomb').show();
});