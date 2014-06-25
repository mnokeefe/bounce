// var socket = io();
var socket = io.connect();


// // Add a username
// $(".username-form").on("submit", function(){

//   // Tell the server about it
//   var username = $(this).children("input").val();
//   socket.emit("add-user", {"username": username});

//   // Remove the login form and show UI
//   $(this).remove();
//   $("#username").text(username + ': ');
//   stress_ui.show();
//   return false;
// });

// var stress_ui = $("#ui");



// Receive stress signals
socket.on('no stress', function() {
  $('.js-stress-indicator').text("Everything's OK");
  $('#weather').attr('data-stress', 'ok');
});
socket.on('moderate stress', function() {
  $('.js-stress-indicator').text('Alright, calm down a bit there mate');
  $('#weather').attr('data-stress', 'moderate');
});
socket.on('severe stress', function() {
  $('.js-stress-indicator').text('STRESSED! STRESSED!');
  $('#weather').attr('data-stress', 'severe');
});