var socket = io();

// ADD CREW ON CONNECTION
////////////////////////////////////////////////////////////////////////////////

socket.on('add crewmember', function(data) {
  $("#crewmembers").find('tbody')
    .append($('<tr>')
      .data('name', data.name)
      .append($('<td>')
        .text(data.name)
      )
      .append($('<td>')
        .text('OK')
      )
      .append($('<td>')
        .append($('<div class="btn-group">')
        )
        .append($('<button type="button" class="btn btn-default">')
          .attr({
            'data-stress': 'none'
          })
          .text('None')
        )
        .append($('<button type="button" class="btn btn-default">')
          .attr({
            'data-stress': 'moderate'
          })
          .text('Moderate')
        )
        .append($('<button type="button" class="btn btn-default">')
          .attr({
            'data-stress': 'severe'
          })
          .text('Severe')
        )
      )
    );
});

// REMOVE CREW ON DISCONNECT
////////////////////////////////////////////////////////////////////////////////

socket.on('delete crewmember', function(data) {
  $('#crewmembers tr').filter(function(){
    return $(this).data('name') === data.name
  }).remove();
});

// STRESS! STRESS!
////////////////////////////////////////////////////////////////////////////////

$('body').on('click', 'button[data-stress="none"]', function () {
  socket.emit('no stress', { name: $(this).closest('tr').data('name') });
});

$('body').on('click', 'button[data-stress="moderate"]', function () {
  socket.emit('moderate stress', { name: $(this).closest('tr').data('name') });
});

$('body').on('click', 'button[data-stress="severe"]', function () {
  socket.emit('severe stress', { name: $(this).closest('tr').data('name') });
});