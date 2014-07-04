var socket = io();

// ADD CONNECTIONS
////////////////////////////////////////////////////////////////////////////////

// TODO: Add current connections
socket.on('stress fake connection', function(crewmember) {
  crewmember.forEach(function(crewmember) {
      addCrewMember(crewmember);
  });
});

// Add new connections
socket.on('add crewmember', function(crewmember) {
  addCrewMember(crewmember);
});

// REMOVE CREW ON DISCONNECT
////////////////////////////////////////////////////////////////////////////////

socket.on('delete crewmember', function(data) {
  $('#crewmembers tr').filter(function(){
    return $(this).data('name') === data.name
  }).remove();
});

// Add crewmembers to DOM
////////////////////////////////////////////////////////////////////////////////

function addCrewMember(data) {
  $("#crewmembers").find('tbody')
  .append($('<tr class="bg-success">')
    .data('name', data)
    .append($('<td>')
      .text(data)
    )
    .append($('<td class="js-status">')
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
}

// STRESS! STRESS!
////////////////////////////////////////////////////////////////////////////////

$('body').on('click', 'button[data-stress="none"]', function () {
  socket.emit('no stress', {name: $(this).closest('tr').data('name')});
  $(this).closest('tr').attr('class', 'bg-success')
    .find('.js-status').text('OK');
});

$('body').on('click', 'button[data-stress="moderate"]', function () {
  socket.emit('moderate stress', {name: $(this).closest('tr').data('name')});
  $(this).closest('tr').attr('class', 'bg-warning')
    .find('.js-status').text('Moderate');
});

$('body').on('click', 'button[data-stress="severe"]', function () {
  socket.emit('severe stress', {name: $(this).closest('tr').data('name')});
  $(this).closest('tr').attr('class', 'bg-danger')
    .find('.js-status').text('SEVERE');
});