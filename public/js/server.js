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


// Target specific crew members
$('body').on('click', 'button[data-stress="none"]', function () {
  socket.emit('no stress', { name: $(this).closest('tr').data('name') });

  console.log('No stress to: ' + $(this).closest('tr').data('name'));
});


// Working on the generic buttons
// $('button[data-stress="none"]').click(function() {
//   socket.emit('no stress');
// });

$('button[data-stress="moderate"]').click(function() {
  socket.emit('moderate stress');
});

$('button[data-stress="severe"]').click(function() {
  socket.emit('severe stress');
});