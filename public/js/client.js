// var socket = io();
var socket = io.connect();

// Add a username
$(".username-form").on("submit", function(){

  // Tell the server about it
  var username = $(this).children("input").val();
  socket.emit("add-user", {"username": username});

  // Remove the login form and show UI
  $(this).remove();
  $("#username").text(username + ': ');
  stress_ui.show();
  return false;
});

var stress_ui = $("#ui");

// Receive stress signals
socket.on('no stress', function() {
  $('.js-stress-indicator').text("Everything's OK");
  $('#no-stress').show();
  $('#moderate-stress').hide();
  $('#severe-stress').hide();
});
socket.on('moderate stress', function() {
  $('.js-stress-indicator').text('Alright, calm down a bit there mate');
  $('#no-stress').hide();
  $('#moderate-stress').show();
  $('#severe-stress').hide();
});
socket.on('severe stress', function() {
  $('.js-stress-indicator').text('STRESSED! STRESSED!');
  $('#no-stress').hide();
  $('#moderate-stress').hide();
  $('#severe-stress').show();
});