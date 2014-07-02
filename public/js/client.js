// var socket = io('/crew');
var socket = io();
var stress_ui = $("#ui");

// Add a username
$(".username-form").on("submit", function(){

  // Tell the server about it
  var username = $(this).children("input").val();
  socket.emit("add-user", {"username": username});

  // Remove the login form and show UI
  $(this).remove();
  $("#username").text(username);
  stress_ui.show();
  return false;
});

// Receive stress signals
socket.on('no stress', function() {
  $('.js-stress-indicator').text("Everything's OK");
  $('.js-client').attr('data-stress', 'ok');
  slickLowStress(); // Call Slick's stress method
});
socket.on('moderate stress', function() {
  $('.js-stress-indicator').text('Alright, calm down a bit there mate');
  $('.js-client').attr('data-stress', 'ok');
  slickModerateStress(); // Call Slick's stress method
});
socket.on('severe stress', function() {
  $('.js-stress-indicator').text('STRESSED! STRESSED!');
  $('.js-client').attr('data-stress', 'ok');
  slickSevereStress(); // Call Slick's stress method
});