var socket = io();

// Stress functions
$('button[data-stress="none"]').click(function() {
  socket.emit('no stress');
});

$('button[data-stress="moderate"]').click(function() {
  socket.emit('moderate stress');
});

$('button[data-stress="severe"]').click(function() {
  socket.emit('severe stress');
});



// TODO: Build the user list automatically
socket.on('add-user', function(data) {
  $('.js-crew-member').text(data.username);
  console.log('received: ' + data.username);
});