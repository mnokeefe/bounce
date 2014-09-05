var socket = io();

// CONNECTIONS
////////////////////////////////////////////////////////////////////////////////

// Add current connections
socket.on('add all live bouncers', function(bouncer) {
  bouncer.forEach(function(bouncer) {
      addBouncerLine(bouncer);
  });
});

// Add new connections
socket.on('add bouncer', function(bouncer) {
  addBouncerLine(bouncer);
});

// Remove bouncers on disconnect
socket.on('delete bouncer', function(data) {
  $('#bouncers tr').filter(function(){
    return $(this).data('name') === data.name
  }).remove();
});

// Add bouncers to the table
function addBouncerLine(data) {
  $("#bouncers").find('tbody')
  .append($('<tr>')
    .data('name', data)
    .append($('<td>')
      .text(data)
    )
    .append($('<td>')
      .addClass('js-bomb-active')
    )
  );
}

// WESTWOOD, WESTSIDE.
////////////////////////////////////////////////////////////////////////////////

$('body').on('click', 'button', function () {
  socket.emit('drop the bomb');
});

// Messages from client
////////////////////////////////////////////////////////////////////////////////

// Receive the bomb
socket.on('pass the bomb', function() {
  console.log('client passed the bomb');
});

// Receive the bomb
socket.on('pass the bomb', function() {
  console.log('client blew up');
});