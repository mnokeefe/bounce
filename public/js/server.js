var socket = io();

// ADD CREW
////////////////////////////////////////////////////////////////////////////////

socket.on('add crewmember', function(data) {
  // $('.js-crew-member').text(data.name);
  $("#crewmembers").find('tbody')
    .append($('<tr>')
      .append($('<td class="js-crew-member">')
        .text(data.name)
      )
      .append($('<td>')
        .text('OK')
      )
      .append($('<td><div class="btn-group"><button type="button" data-stress="none" class="btn btn-default">None</button><button type="button" data-stress="moderate" class="btn btn-default">Moderate</button><button type="button" data-stress="severe" class="btn btn-default">Severe</button></div></td>')
      )
    );
});




// REMOVE CREW
////////////////////////////////////////////////////////////////////////////////

socket.on('delete crewmember', function(data) {
  $('.js-crew-member').text(data.name + ' gone');
});

// STRESS! STRESS!
////////////////////////////////////////////////////////////////////////////////

$('button[data-stress="none"]').click(function() {
  socket.emit('no stress');
});

$('button[data-stress="moderate"]').click(function() {
  socket.emit('moderate stress');
});

$('button[data-stress="severe"]').click(function() {
  socket.emit('severe stress');
});