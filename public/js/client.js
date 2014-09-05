var socket = io();

// Add a username
$(".username-form").on("submit", function(){

  // Tell the server about it
  var username = $(this).children("input").val();
  socket.emit("add a bouncer", {"username": username});

  // Remove the login form and show UI
  $(this).remove();
  $("#ui").show();
  return false;
});

// Receive the bomb
socket.on('get bomb', function() {
  addBomb();
});

// Pass the bomb
function passTheBomb() {
  socket.emit('pass the bomb');
}

// Blow up
function explode() {
  socket.emit('KABOOM');
}