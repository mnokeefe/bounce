// Create client list
var clients = {};

module.exports = function(socket) {

  // CLIENT CONNECT
  // Add connections to the clients list
  //////////////////////////////////////////////////////////////////////////////

  socket.on('add a bouncer', function(data) {
    clients[data.username] = {
      'socket': socket.id
    };

    socket.emit('add bouncer', data.username);

    console.log(data.username + ' connected');
    console.log(clients);
  });

  // SERVER CONNECT
  // TODO: separate the score board (server) in to its own socket.io namespace
  //////////////////////////////////////////////////////////////////////////////

  var keys = Object.keys(clients);
  socket.emit('add all live bouncers', keys);

  // DISCONNECT
  // Remove disconnected sockets from the clients list
  //////////////////////////////////////////////////////////////////////////////

  socket.on('disconnect', function() {
    for(var name in clients) {
      if(clients[name].socket === socket.id) {
        console.log(name + ' disconnected');

        // Delete from Stress Faker UI
        socket.emit('delete bouncer', { name: name });

        delete clients[name];
        break;
      }
    }
  });

  // KICK OFF!
  // TODO: Start sending out the ball
  //////////////////////////////////////////////////////////////////////////////

  socket.on('drop the bomb', function() {
    console.log('We\'re off!');
    // TODO: send ball to random client
    socket.emit('get bomb');
  });
};